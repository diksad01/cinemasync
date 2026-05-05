const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory room state
const rooms = {};

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

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

  socket.on('join', ({ roomCode, userName }) => {
    const code = roomCode.toUpperCase().trim();
    currentRoom = code;
    currentUser = userName;

    socket.join(code);

    if (!rooms[code]) {
      rooms[code] = {
        users: {},
        videoUrl: null,
        videoType: null,
        currentTime: 0,
        isPlaying: false,
        lastUpdate: Date.now()
      };
    }

    rooms[code].users[socket.id] = { name: userName, id: socket.id };

    // Send current room state to joining user
    socket.emit('room_state', {
      videoUrl: rooms[code].videoUrl,
      videoType: rooms[code].videoType,
      currentTime: rooms[code].currentTime,
      isPlaying: rooms[code].isPlaying,
      users: Object.values(rooms[code].users)
    });

    // Notify others
    socket.to(code).emit('user_joined', { name: userName, id: socket.id });

    // Broadcast updated user list
    io.to(code).emit('room_users', Object.values(rooms[code].users));
  });

  socket.on('chat_msg', ({ message, userName }) => {
    if (!currentRoom) return;
    io.to(currentRoom).emit('chat_msg', {
      message,
      userName,
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
  });

  socket.on('sync_pause', ({ currentTime }) => {
    if (!currentRoom || !rooms[currentRoom]) return;
    rooms[currentRoom].isPlaying = false;
    rooms[currentRoom].currentTime = currentTime;
    rooms[currentRoom].lastUpdate = Date.now();
    socket.to(currentRoom).emit('sync_pause', { currentTime, from: socket.id });
  });

  socket.on('sync_seek', ({ currentTime }) => {
    if (!currentRoom || !rooms[currentRoom]) return;
    rooms[currentRoom].currentTime = currentTime;
    rooms[currentRoom].lastUpdate = Date.now();
    socket.to(currentRoom).emit('sync_seek', { currentTime, from: socket.id });
  });

  socket.on('sync_url', ({ url, videoType }) => {
    if (!currentRoom || !rooms[currentRoom]) return;
    rooms[currentRoom].videoUrl = url;
    rooms[currentRoom].videoType = videoType;
    rooms[currentRoom].currentTime = 0;
    rooms[currentRoom].isPlaying = false;
    socket.to(currentRoom).emit('sync_url', { url, videoType, from: socket.id });
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

  socket.on('disconnect', () => {
    if (!currentRoom || !rooms[currentRoom]) return;
    delete rooms[currentRoom].users[socket.id];

    io.to(currentRoom).emit('user_left', { name: currentUser, id: socket.id });
    io.to(currentRoom).emit('room_users', Object.values(rooms[currentRoom].users));

    // Clean up empty rooms
    if (Object.keys(rooms[currentRoom].users).length === 0) {
      delete rooms[currentRoom];
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`CinemaSync server running on port ${PORT}`);
});
