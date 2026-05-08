require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const os = require('os');
const admin = require('firebase-admin');

// ── Firebase Admin (room persistence) ────────────────────────────
let db = null;
try {
  let serviceAccount = null;
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // Single JSON string (preferred)
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    // Legacy separate vars
    serviceAccount = {
      type: 'service_account',
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    };
  }
  if (serviceAccount) {
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    db = admin.firestore();
    console.log('[Firestore] Connected — room persistence enabled');
  } else {
    console.warn('[Firestore] No Firebase credentials set — room persistence disabled');
  }
} catch (e) {
  console.warn('[Firestore] Init failed:', e.message);
}

async function persistRoom(code, room) {
  if (!db) return;
  try {
    await db.collection('rooms').doc(code).set({
      videoUrl: room.videoUrl || null,
      videoType: room.videoType || null,
      currentTime: room.currentTime || 0,
      isPlaying: room.isPlaying || false,
      lastUpdate: Date.now()
    }, { merge: true });
  } catch (e) { console.warn('[Firestore] persistRoom error:', e.message); }
}

async function loadRoom(code) {
  if (!db) return null;
  try {
    const doc = await db.collection('rooms').doc(code).get();
    if (doc.exists) return doc.data();
  } catch (e) { console.warn('[Firestore] loadRoom error:', e.message); }
  return null;
}

async function deleteRoom(code) {
  if (!db) return;
  try { await db.collection('rooms').doc(code).delete(); } catch {}
}

// Store uploaded files per room: roomCode -> { filePath, fileName, mimeType }
const roomFiles = {};
const upload = multer({
  dest: os.tmpdir(),
  limits: { fileSize: 4 * 1024 * 1024 * 1024 } // 4GB max
});

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Raw body parser for Paystack webhook signature verification only
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));

// JSON body parser for all other routes
app.use(express.json());

// Payment routes
const paymentRoutes = require('./payments');
app.use('/api/payment', paymentRoutes);

// ── Launch gate ───────────────────────────────────────────────────
// Set LAUNCH_DATE env var on Railway when you go live (e.g. 2026-05-20T00:00:00Z)
// Until then, / redirects to /coming-soon.html
const LAUNCH_DATE = process.env.LAUNCH_DATE ? new Date(process.env.LAUNCH_DATE) : new Date('2026-05-20T00:00:00Z');
const APP_LIVE = process.env.APP_LIVE === 'true';

function isLaunched() {
  if (APP_LIVE) return true;         // flip APP_LIVE=true on Railway to go live instantly
  return new Date() >= LAUNCH_DATE;  // or wait for the date
}

// Serve coming-soon for root only if not launched
app.get('/', (req, res, next) => {
  if (!isLaunched()) {
    return res.sendFile(path.join(__dirname, 'public', 'coming-soon.html'));
  }
  next();
});

// Allow direct access to coming-soon page always
app.get('/coming-soon', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'coming-soon.html'));
});

// Payment result pages
app.get('/payment/cancel', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'payment-cancel.html'));
});
app.get('/payment/success', (req, res) => {
  res.redirect('/?upgraded=1');
});

// ── Waitlist API ──────────────────────────────────────────────────
// In-memory for now — replace with Firestore/Supabase later
const waitlistEmails = new Set();

app.post('/api/waitlist', (req, res) => {
  const { email, source } = req.body || {};
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  const normalised = email.toLowerCase().trim();
  if (waitlistEmails.has(normalised)) {
    return res.json({ ok: true, duplicate: true });
  }
  waitlistEmails.add(normalised);
  console.log(`[Waitlist] ${normalised} (${source || 'unknown'})`);
  res.json({ ok: true, duplicate: false });
});

// In-memory room state
const rooms = {};

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

// API: Video proxy — streams remote video through server to bypass CORS
app.get('/api/proxy', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send('url param required');

  try {
    const range = req.headers.range;
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Referer': new URL(url).origin
    };
    if (range) headers['Range'] = range;

    const upstream = await axios.get(url, {
      responseType: 'stream',
      timeout: 30000,
      headers
    });

    // Forward relevant headers
    const forward = ['content-type', 'content-length', 'content-range', 'accept-ranges'];
    forward.forEach(h => { if (upstream.headers[h]) res.setHeader(h, upstream.headers[h]); });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(upstream.status);
    upstream.data.pipe(res);

    upstream.data.on('error', () => res.end());
  } catch (err) {
    res.status(500).send('Proxy error: ' + err.message);
  }
});

// API: Upload video file for a room
app.post('/api/upload/:roomCode', upload.single('video'), (req, res) => {
  const code = req.params.roomCode.toUpperCase();
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  // Clean up previous file for this room
  if (roomFiles[code]) {
    fs.unlink(roomFiles[code].filePath, () => {});
  }

  roomFiles[code] = {
    filePath: req.file.path,
    fileName: req.file.originalname,
    mimeType: req.file.mimetype || 'video/mp4',
    size: req.file.size
  };

  // Notify room that a new video is ready
  io.to(code).emit('sync_url', { url: `/api/stream/${code}`, videoType: 'direct' });
  io.to(code).emit('room_upload', { fileName: req.file.originalname });

  res.json({ url: `/api/stream/${code}`, fileName: req.file.originalname });
});

// API: Stream uploaded video with range support (for seeking)
app.get('/api/stream/:roomCode', (req, res) => {
  const code = req.params.roomCode.toUpperCase();
  const file = roomFiles[code];
  if (!file) return res.status(404).send('No video uploaded for this room');

  const stat = fs.statSync(file.filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  res.setHeader('Content-Type', file.mimeType);
  res.setHeader('Accept-Ranges', 'bytes');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Disposition', `inline; filename="${file.fileName}"`);

  if (range) {
    const [startStr, endStr] = range.replace(/bytes=/, '').split('-');
    const start = parseInt(startStr, 10);
    const end = endStr ? parseInt(endStr, 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    const fileStream = fs.createReadStream(file.filePath, { start, end });
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Content-Length': chunkSize
    });
    fileStream.pipe(res);
  } else {
    res.setHeader('Content-Length', fileSize);
    fs.createReadStream(file.filePath).pipe(res);
  }
});

// Helper: resolve a potentially relative URL against a base
function resolveUrl(src, base) {
  if (!src) return null;
  src = src.trim();
  if (src.startsWith('//')) return 'https:' + src;
  if (src.startsWith('/')) {
    try { return new URL(base).origin + src; } catch { return src; }
  }
  if (!src.startsWith('http')) {
    try { return new URL(src, base).href; } catch { return src; }
  }
  return src;
}

// Helper: check if a URL looks like a direct video
function looksLikeVideo(u) {
  return /\.(mp4|webm|mkv|ogv|ogg|m3u8|mov|flv)([\?#]|$)/i.test(u);
}

// Helper: check if a URL is a known embeddable iframe player
function looksLikeEmbed(u) {
  return /(youtube\.com\/embed|youtu\.be|youtube-nocookie\.com|vimeo\.com\/video|dailymotion\.com\/embed|streamtape\.com\/e\/|doodstream\.com\/e\/|mixdrop\.co\/e\/|filemoon\.sx\/e\/|streamlare\.com\/e\/|upstream\.to\/embed|ok\.ru\/videoembed|mail\.ru\/video\/embed|mp4upload\.com\/embed|mycloud\.to\/e\/|fembed\.com\/v\/|vidcloud\.co\/embedding|4anime\.to\/e\/|gogoanime|animeheaven|kwik\.cx|plyr\.io|embed\.su|rapid-cloud\.co\/e\/|megacloud\.tv\/embed|allanime|bilibili\.com\/blackboard\/embed)/i.test(u);
}

// API: Extract video src from a webpage
app.get('/api/extract', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'url param required' });

  try {
    const response = await axios.get(url, {
      timeout: 12000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Referer': url
      }
    });

    const html = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
    const $ = cheerio.load(html);

    let videoUrl = null;
    let videoType = 'direct';
    let candidates = [];

    // 1. <video src> or <video> <source src>
    $('video[src]').each((_, el) => { const s = $(el).attr('src'); if (s) candidates.push({ u: s, t: 'direct' }); });
    $('video source[src]').each((_, el) => { const s = $(el).attr('src'); if (s) candidates.push({ u: s, t: 'direct' }); });
    $('source[src]').each((_, el) => { const s = $(el).attr('src'); if (s) candidates.push({ u: s, t: 'direct' }); });

    // 2. data-* video attributes (JWPlayer, Plyr, etc.)
    const dataAttrs = ['data-src', 'data-video', 'data-file', 'data-url', 'data-source', 'data-stream', 'data-hls', 'data-mp4'];
    dataAttrs.forEach(attr => {
      $(`[${attr}]`).each((_, el) => { const s = $(el).attr(attr); if (s && (looksLikeVideo(s) || s.startsWith('http'))) candidates.push({ u: s, t: 'direct' }); });
    });

    // 3. og:video / twitter:player meta tags
    ['og:video', 'og:video:url', 'og:video:secure_url', 'twitter:player'].forEach(prop => {
      const v = $(`meta[property="${prop}"], meta[name="${prop}"]`).attr('content');
      if (v) candidates.push({ u: v, t: looksLikeVideo(v) ? 'direct' : 'iframe' });
    });

    // 4. iframes that are known video players/embeds
    $('iframe[src]').each((_, el) => {
      const s = $(el).attr('src');
      if (s && s !== 'about:blank' && s.length > 10) candidates.push({ u: s, t: 'iframe' });
    });

    // 5. Mine raw JS/HTML for video URLs via regex
    const videoRegexes = [
      /['"](https?:\/\/[^'"]+\.(?:mp4|webm|m3u8|mkv)(?:\?[^'"]*)?)['"]/gi,
      /file\s*:\s*['"]([^'"]+\.(?:mp4|webm|m3u8)(?:\?[^'"]*)?)['"]/gi,
      /source\s*:\s*['"]([^'"]+\.(?:mp4|webm|m3u8)(?:\?[^'"]*)?)['"]/gi,
      /['"](https?:\/\/[^'"]*\/(?:hls|video|stream|media|embed|play)[^'"]*\.m3u8(?:\?[^'"]*)?)['"]/gi,
      /kwik\.cx\/[a-z]\/[A-Za-z0-9]+/gi,
    ];
    videoRegexes.forEach(re => {
      let m;
      while ((m = re.exec(html)) !== null) {
        const u = m[1] || m[0];
        if (u && u.length < 500) candidates.push({ u, t: 'direct' });
      }
    });

    // 6. Look for iframe src in inline JS — only genuine video embed URLs
    // Must contain a known embed path segment AND be a cross-origin player
    const iframeJsRegex = /['"]((https?:\/\/(?!(?:twitter|facebook|instagram|tiktok|reddit|discord|telegram|whatsapp|linkedin|youtube\.com\/watch|youtu\.be\/(?!embed))[^'"]*))(?:[^'"]*\/(?:embed|e|v|player|stream)\/)(?:[A-Za-z0-9_\-]{4,})[^'"]{0,100})['"]/gi;
    let m2;
    while ((m2 = iframeJsRegex.exec(html)) !== null) {
      const u = m2[1];
      if (u && u.length < 400 && !/\.(jpg|jpeg|png|gif|webp|svg|css|js|ico)(\?|$)/i.test(u)) {
        candidates.push({ u, t: 'iframe' });
      }
    }

    // Resolve all candidates and score them
    const resolved = candidates.map(c => ({ ...c, u: resolveUrl(c.u, url) })).filter(c => c.u && c.u.startsWith('http'));

    // Prefer direct video URLs first, then known embed iframes, then any iframe
    const directVideo = resolved.find(c => c.t === 'direct' && looksLikeVideo(c.u));
    const knownEmbed = resolved.find(c => c.t === 'iframe' && looksLikeEmbed(c.u));
    const anyDirect = resolved.find(c => c.t === 'direct');
    let originHost = '';
    try { originHost = new URL(url).hostname; } catch {}
    const anyIframe = resolved.find(c => {
      if (c.t !== 'iframe' || c.u === url) return false;
      try { return new URL(c.u).hostname !== originHost; } catch { return false; }
    });

    const best = directVideo || knownEmbed || anyDirect || anyIframe;

    if (!best) {
      return res.status(404).json({
        error: 'No video found. This site likely loads video via JavaScript after page load — try pasting the embed/player URL directly instead.',
        hint: 'Right-click the video player on the page → "Copy frame URL" or inspect the network tab for .mp4/.m3u8 requests.'
      });
    }

    res.json({ url: best.u, videoType: best.t });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch page: ' + err.message });
  }
});

// API: Search archive.org
app.get('/api/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'q param required' });

  try {
    const response = await axios.get('https://archive.org/advancedsearch.php', {
      params: {
        q: `${q} AND mediatype:movies`,
        fl: 'identifier,title,description,thumb',
        rows: 24,
        output: 'json',
        'sort[]': 'downloads desc'
      },
      timeout: 10000
    });

    const docs = response.data?.response?.docs || [];
    const results = docs.map(doc => ({
      title: doc.title || doc.identifier,
      identifier: doc.identifier,
      url: `https://archive.org/details/${doc.identifier}`,
      thumbnail: doc.thumb || `https://archive.org/services/img/${doc.identifier}`,
      directUrl: `https://archive.org/download/${doc.identifier}/${doc.identifier}.mp4`
    }));

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Search failed: ' + err.message });
  }
});

// Serve frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.io logic
io.on('connection', (socket) => {
  let currentRoom = null;
  let currentUser = null;
  let currentColor = '#f0c060';

  socket.on('join', async ({ roomCode, userName, userColor, password }) => {
    const code = roomCode.toUpperCase().trim();
    currentUser = userName;
    currentColor = userColor || '#f0c060';

    // Create room if new — first user becomes the host
    if (!rooms[code]) {
      // Try to restore from Firestore
      const saved = await loadRoom(code);
      rooms[code] = {
        users: {},
        host: socket.id,
        videoUrl: saved?.videoUrl || null,
        videoType: saved?.videoType || null,
        currentTime: saved?.currentTime || 0,
        isPlaying: false,
        lastUpdate: Date.now()
      };
      if (saved?.videoUrl) console.log(`[Firestore] Restored room ${code} — ${saved.videoUrl}`);
    }

    currentRoom = code;
    socket.join(code);

    rooms[code].users[socket.id] = { name: userName, id: socket.id, color: userColor };
    console.log(`[JOIN] ${userName} joined room ${code} (${Object.keys(rooms[code].users).length} users now)`);

    // Send current room state to joining user
    // Calculate live position if video is currently playing
    const room = rooms[code];
    let liveTime = room.currentTime;
    if (room.isPlaying && room.lastUpdate) {
      liveTime = room.currentTime + (Date.now() - room.lastUpdate) / 1000;
    }
    socket.emit('room_state', {
      videoUrl: room.videoUrl,
      videoType: room.videoType,
      currentTime: liveTime,
      isPlaying: room.isPlaying,
      users: Object.values(room.users)
    });

    // Notify others
    socket.to(code).emit('user_joined', { name: userName, id: socket.id });

    // If room has no video URL (e.g. after server restart), ask existing users to re-sync
    if (!room.videoUrl) {
      socket.to(code).emit('request_state_sync');
    }

    // Broadcast updated user list
    io.to(code).emit('room_users', Object.values(rooms[code].users));

    // Tell everyone (including joiner) who the host is
    io.to(code).emit('host_info', { hostSocketId: rooms[code].host });
  });

  socket.on('host_kick', ({ targetId }) => {
    if (!currentRoom || !rooms[currentRoom]) return;
    if (rooms[currentRoom].host !== socket.id) return; // only host
    io.to(targetId).emit('kicked');
  });

  socket.on('host_mute', ({ targetId, mute }) => {
    if (!currentRoom || !rooms[currentRoom]) return;
    if (rooms[currentRoom].host !== socket.id) return; // only host
    io.to(targetId).emit('muted', { mute });
  });

  socket.on('chat_msg', ({ message, userName }) => {
    if (!currentRoom) return;
    io.to(currentRoom).emit('chat_msg', {
      message,
      userName,
      color: currentColor,
      timestamp: Date.now(),
      id: socket.id
    });
  });

  socket.on('sync_play', ({ currentTime }) => {
    if (!currentRoom || !rooms[currentRoom]) return;
    rooms[currentRoom].isPlaying = true;
    rooms[currentRoom].currentTime = currentTime;
    rooms[currentRoom].lastUpdate = Date.now();
    socket.to(currentRoom).emit('sync_play', { currentTime, from: socket.id });
    persistRoom(currentRoom, rooms[currentRoom]);
  });

  socket.on('sync_pause', ({ currentTime }) => {
    if (!currentRoom || !rooms[currentRoom]) return;
    rooms[currentRoom].isPlaying = false;
    rooms[currentRoom].currentTime = currentTime;
    rooms[currentRoom].lastUpdate = Date.now();
    socket.to(currentRoom).emit('sync_pause', { currentTime, from: socket.id });
    persistRoom(currentRoom, rooms[currentRoom]);
  });

  socket.on('sync_seek', ({ currentTime }) => {
    if (!currentRoom || !rooms[currentRoom]) return;
    rooms[currentRoom].currentTime = currentTime;
    rooms[currentRoom].lastUpdate = Date.now();
    socket.to(currentRoom).emit('sync_seek', { currentTime, from: socket.id });
    persistRoom(currentRoom, rooms[currentRoom]);
  });

  socket.on('sync_url', ({ url, videoType }) => {
    if (!currentRoom || !rooms[currentRoom]) return;
    rooms[currentRoom].videoUrl = url;
    rooms[currentRoom].videoType = videoType;
    rooms[currentRoom].currentTime = 0;
    rooms[currentRoom].isPlaying = false;
    socket.to(currentRoom).emit('sync_url', { url, videoType, from: socket.id });
    persistRoom(currentRoom, rooms[currentRoom]);
  });

  socket.on('sync_buffer', ({ buffering }) => {
    if (!currentRoom) return;
    socket.to(currentRoom).emit('sync_buffer', { buffering, from: socket.id });
  });

  socket.on('reaction', ({ emoji }) => {
    if (!currentRoom) return;
    io.to(currentRoom).emit('reaction', { emoji, from: currentUser, id: socket.id });
  });

  socket.on('typing', ({ isTyping }) => {
    if (!currentRoom) return;
    socket.to(currentRoom).emit('typing', { userName: currentUser, isTyping, id: socket.id });
  });

  socket.on('countdown_start', () => {
    if (!currentRoom) return;
    io.to(currentRoom).emit('countdown_start', { from: currentUser });
  });


  // WebRTC signaling relay
  socket.on('webrtc_offer', ({ offer }) => {
    if (!currentRoom) return;
    socket.to(currentRoom).emit('webrtc_offer', { offer, from: socket.id });
  });

  socket.on('webrtc_answer', ({ answer }) => {
    if (!currentRoom) return;
    socket.to(currentRoom).emit('webrtc_answer', { answer, from: socket.id });
  });

  socket.on('webrtc_ice', ({ candidate }) => {
    if (!currentRoom) return;
    socket.to(currentRoom).emit('webrtc_ice', { candidate, from: socket.id });
  });

  socket.on('webrtc_stop', () => {
    if (!currentRoom) return;
    socket.to(currentRoom).emit('webrtc_stop', { from: socket.id });
  });

  socket.on('queue_add', ({ url }) => {
    if (!currentRoom) return;
    socket.to(currentRoom).emit('queue_add', { url });
  });


  socket.on('disconnect', () => {
    if (!currentRoom || !rooms[currentRoom]) return;
    delete rooms[currentRoom].users[socket.id];

    io.to(currentRoom).emit('user_left', { name: currentUser, id: socket.id });
    io.to(currentRoom).emit('room_users', Object.values(rooms[currentRoom].users));

    // Reassign host if host left
    if (rooms[currentRoom].host === socket.id) {
      const remaining = Object.keys(rooms[currentRoom].users);
      if (remaining.length > 0) {
        rooms[currentRoom].host = remaining[0];
        io.to(currentRoom).emit('host_info', { hostSocketId: remaining[0] });
      }
    }

    // Clean up empty rooms
    if (Object.keys(rooms[currentRoom].users).length === 0) {
      deleteRoom(currentRoom);
      delete rooms[currentRoom];
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`SomniWatch server running on port ${PORT}`);
});
