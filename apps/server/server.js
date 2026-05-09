require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
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

// ── Firebase Admin ───────────────────────────────────────────────
let db = null;
try {
  let sa = null;
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    sa = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    sa = { type: 'service_account', project_id: process.env.FIREBASE_PROJECT_ID, client_email: process.env.FIREBASE_CLIENT_EMAIL, private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') };
  }
  if (sa) { admin.initializeApp({ credential: admin.credential.cert(sa) }); db = admin.firestore(); console.log('[Firestore] Connected'); }
  else { console.warn('[Firestore] No credentials — persistence disabled'); }
} catch (e) { console.warn('[Firestore] Init failed:', e.message); }

async function persistRoom(code, room) {
  if (!db) return;
  try { await db.collection('rooms').doc(code).set({ videoUrl: room.videoUrl || null, videoType: room.videoType || null, currentTime: room.currentTime || 0, isPlaying: room.isPlaying || false, lastUpdate: Date.now() }, { merge: true }); } catch (e) { console.warn('[Firestore] persist error:', e.message); }
}
async function loadRoom(code) {
  if (!db) return null;
  try { const doc = await db.collection('rooms').doc(code).get(); if (doc.exists) return doc.data(); } catch (e) { console.warn('[Firestore] load error:', e.message); }
  return null;
}
async function deleteRoom(code) { if (!db) return; try { await db.collection('rooms').doc(code).delete(); } catch {} }

// ── Setup ────────────────────────────────────────────────────────
const roomFiles = {};
const upload = multer({ dest: os.tmpdir(), limits: { fileSize: 4 * 1024 * 1024 * 1024 } });
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });

app.use(cors());
const webDistPath = path.join(__dirname, '..', 'web', 'dist');
app.use(express.static(webDistPath));
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());

const paymentRoutes = require('./payments');
app.use('/api/payment', paymentRoutes);

// ── Launch gate ──────────────────────────────────────────────────
const LAUNCH_DATE = process.env.LAUNCH_DATE ? new Date(process.env.LAUNCH_DATE) : new Date('2026-05-20T00:00:00Z');
const APP_LIVE = process.env.APP_LIVE === 'true';
function isLaunched() { if (APP_LIVE) return true; return new Date() >= LAUNCH_DATE; }

const rooms = {};
const permanentRooms = {}; // slug → roomId (permanent rooms never expire)
const FOUNDERS = ['saddiq', 'diksad', 'musaadamsaddiq']; // add names/emails as people pay

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function isFounder(userName) {
  if (!userName) return false;
  const lower = userName.toLowerCase();
  return FOUNDERS.some(f => lower.includes(f));
}

// ── API routes ───────────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok', rooms: Object.keys(rooms).length }));

const waitlistEmails = new Set();
app.post('/api/waitlist', (req, res) => {
  const { email, source } = req.body || {};
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Invalid email' });
  const n = email.toLowerCase().trim();
  if (waitlistEmails.has(n)) return res.json({ ok: true, duplicate: true });
  waitlistEmails.add(n);
  console.log(`[Waitlist] ${n} (${source || 'unknown'})`);
  res.json({ ok: true, duplicate: false });
});

app.get('/api/proxy', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send('url param required');
  try {
    const headers = { 'User-Agent': 'Mozilla/5.0', 'Referer': new URL(url).origin };
    if (req.headers.range) headers['Range'] = req.headers.range;
    const upstream = await axios.get(url, { responseType: 'stream', timeout: 30000, headers });
    ['content-type', 'content-length', 'content-range', 'accept-ranges'].forEach(h => { if (upstream.headers[h]) res.setHeader(h, upstream.headers[h]); });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(upstream.status);
    upstream.data.pipe(res);
    upstream.data.on('error', () => res.end());
  } catch (err) { res.status(500).send('Proxy error: ' + err.message); }
});

app.post('/api/upload/:roomCode', upload.single('video'), (req, res) => {
  const code = req.params.roomCode.toUpperCase();
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  if (roomFiles[code]) fs.unlink(roomFiles[code].filePath, () => {});
  roomFiles[code] = { filePath: req.file.path, fileName: req.file.originalname, mimeType: req.file.mimetype || 'video/mp4', size: req.file.size };
  io.to(code).emit('sync_url', { url: `/api/stream/${code}`, videoType: 'direct' });
  io.to(code).emit('room_upload', { fileName: req.file.originalname });
  res.json({ url: `/api/stream/${code}`, fileName: req.file.originalname });
});

app.get('/api/stream/:roomCode', (req, res) => {
  const code = req.params.roomCode.toUpperCase();
  const file = roomFiles[code];
  if (!file) return res.status(404).send('No video for this room');
  const stat = fs.statSync(file.filePath);
  const fileSize = stat.size;
  const range = req.headers.range;
  res.setHeader('Content-Type', file.mimeType);
  res.setHeader('Accept-Ranges', 'bytes');
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (range) {
    const [s, e] = range.replace(/bytes=/, '').split('-');
    const start = parseInt(s, 10), end = e ? parseInt(e, 10) : fileSize - 1;
    res.writeHead(206, { 'Content-Range': `bytes ${start}-${end}/${fileSize}`, 'Content-Length': end - start + 1 });
    fs.createReadStream(file.filePath, { start, end }).pipe(res);
  } else {
    res.setHeader('Content-Length', fileSize);
    fs.createReadStream(file.filePath).pipe(res);
  }
});

function resolveUrl(src, base) {
  if (!src) return null;
  src = src.trim();
  if (src.startsWith('//')) return 'https:' + src;
  if (src.startsWith('/')) { try { return new URL(base).origin + src; } catch { return src; } }
  if (!src.startsWith('http')) { try { return new URL(src, base).href; } catch { return src; } }
  return src;
}
function looksLikeVideo(u) { return /\.(mp4|webm|mkv|ogv|ogg|m3u8|mov|flv)([\?#]|$)/i.test(u); }
function looksLikeEmbed(u) { return /(youtube\.com\/embed|youtu\.be|vimeo\.com\/video|dailymotion\.com\/embed|streamtape\.com\/e\/|doodstream\.com\/e\/|mixdrop\.co\/e\/|filemoon\.sx\/e\/|embed\.su|rapid-cloud\.co\/e\/|megacloud\.tv\/embed)/i.test(u); }

app.get('/api/extract', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'url param required' });
  try {
    const response = await axios.get(url, { timeout: 12000, headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Accept': 'text/html,application/xhtml+xml', 'Referer': url } });
    const html = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
    const $ = cheerio.load(html);
    let candidates = [];
    $('video[src]').each((_, el) => { const s = $(el).attr('src'); if (s) candidates.push({ u: s, t: 'direct' }); });
    $('video source[src]').each((_, el) => { const s = $(el).attr('src'); if (s) candidates.push({ u: s, t: 'direct' }); });
    $('source[src]').each((_, el) => { const s = $(el).attr('src'); if (s) candidates.push({ u: s, t: 'direct' }); });
    ['data-src','data-video','data-file','data-url','data-source','data-stream','data-hls','data-mp4'].forEach(attr => {
      $(`[${attr}]`).each((_, el) => { const s = $(el).attr(attr); if (s && (looksLikeVideo(s) || s.startsWith('http'))) candidates.push({ u: s, t: 'direct' }); });
    });
    ['og:video','og:video:url','og:video:secure_url','twitter:player'].forEach(prop => {
      const v = $(`meta[property="${prop}"],meta[name="${prop}"]`).attr('content');
      if (v) candidates.push({ u: v, t: looksLikeVideo(v) ? 'direct' : 'iframe' });
    });
    $('iframe[src]').each((_, el) => { const s = $(el).attr('src'); if (s && s !== 'about:blank' && s.length > 10) candidates.push({ u: s, t: 'iframe' }); });
    [/['"](https?:\/\/[^'"]+\.(?:mp4|webm|m3u8|mkv)(?:\?[^'"]*)?)['"]/gi, /file\s*:\s*['"]([^'"]+\.(?:mp4|webm|m3u8))['"]/gi].forEach(re => { let m; while ((m = re.exec(html)) !== null) { const u = m[1] || m[0]; if (u && u.length < 500) candidates.push({ u, t: 'direct' }); } });
    const resolved = candidates.map(c => ({ ...c, u: resolveUrl(c.u, url) })).filter(c => c.u && c.u.startsWith('http'));
    const best = resolved.find(c => c.t === 'direct' && looksLikeVideo(c.u)) || resolved.find(c => c.t === 'iframe' && looksLikeEmbed(c.u)) || resolved.find(c => c.t === 'direct') || resolved.find(c => c.t === 'iframe');
    if (!best) return res.status(404).json({ error: 'No video found on this page.' });
    res.json({ url: best.u, videoType: best.t });
  } catch (err) { res.status(500).json({ error: 'Failed: ' + err.message }); }
});

app.get('/api/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'q param required' });
  try {
    const response = await axios.get('https://archive.org/advancedsearch.php', { params: { q: `${q} AND mediatype:movies`, fl: 'identifier,title,description,thumb', rows: 24, output: 'json', 'sort[]': 'downloads desc' }, timeout: 10000 });
    const docs = response.data?.response?.docs || [];
    res.json(docs.map(doc => ({ title: doc.title || doc.identifier, identifier: doc.identifier, url: `https://archive.org/details/${doc.identifier}`, thumbnail: doc.thumb || `https://archive.org/services/img/${doc.identifier}`, directUrl: `https://archive.org/download/${doc.identifier}/${doc.identifier}.mp4` })));
  } catch (err) { res.status(500).json({ error: 'Search failed: ' + err.message }); }
});

// ── TMDB + OMDb proxy endpoints ───────────────────────────────────
const TMDB_KEY = process.env.TMDB_API_KEY;
const OMDB_KEY = process.env.OMDB_API_KEY;
const TMDB_BASE = 'https://api.themoviedb.org/3';
const TMDB_IMG  = 'https://image.tmdb.org/t/p/w500';
const TMDB_IMG_ORIG = 'https://image.tmdb.org/t/p/original';

function tmdbMovie(m) {
  return {
    id: m.id,
    tmdbId: m.id,
    title: m.title || m.name || 'Untitled',
    year: (m.release_date || m.first_air_date || '').slice(0, 4),
    rating: m.vote_average ? m.vote_average.toFixed(1) : null,
    votes: m.vote_count || 0,
    overview: m.overview || '',
    poster: m.poster_path ? `${TMDB_IMG}${m.poster_path}` : null,
    backdrop: m.backdrop_path ? `${TMDB_IMG_ORIG}${m.backdrop_path}` : null,
    genres: m.genre_ids || [],
    source: 'tmdb',
  };
}

// Genre map (TMDB genre IDs → names)
const TMDB_GENRES = { 28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',53:'Thriller',10752:'War',37:'Western' };

// ── OMDb helpers ──────────────────────────────────────────────────
function omdbToMovie(m) {
  return {
    id: m.imdbID,
    tmdbId: null,
    imdbId: m.imdbID,
    title: m.Title || 'Untitled',
    year: m.Year ? m.Year.slice(0, 4) : '',
    rating: m.imdbRating && m.imdbRating !== 'N/A' ? m.imdbRating : null,
    votes: 0,
    overview: m.Plot && m.Plot !== 'N/A' ? m.Plot : '',
    poster: m.Poster && m.Poster !== 'N/A' ? m.Poster : null,
    backdrop: null,
    genres: m.Genre ? m.Genre.split(', ') : [],
    runtime: m.Runtime && m.Runtime !== 'N/A' ? m.Runtime : null,
    rated: m.Rated && m.Rated !== 'N/A' ? m.Rated : null,
    director: m.Director && m.Director !== 'N/A' ? m.Director : null,
    actors: m.Actors && m.Actors !== 'N/A' ? m.Actors : null,
    source: 'omdb',
  };
}

// OMDb search endpoint
app.get('/api/omdb/search', async (req, res) => {
  if (!OMDB_KEY) return res.status(503).json({ error: 'OMDB_API_KEY not set' });
  const { q, page = 1 } = req.query;
  if (!q) return res.status(400).json({ error: 'q required' });
  try {
    const r = await axios.get('https://www.omdbapi.com/', { params: { apikey: OMDB_KEY, s: q, type: 'movie', page }, timeout: 8000 });
    if (r.data.Response === 'False') return res.json({ results: [], total: 0 });
    // Fetch brief details for each to get posters
    const ids = (r.data.Search || []).map(m => m.imdbID);
    const details = await Promise.allSettled(ids.slice(0, 10).map(id => axios.get('https://www.omdbapi.com/', { params: { apikey: OMDB_KEY, i: id }, timeout: 6000 })));
    const results = details.filter(d => d.status === 'fulfilled' && d.value.data.Response === 'True').map(d => omdbToMovie(d.value.data));
    res.json({ results, total: parseInt(r.data.totalResults || '0') });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// OMDb single movie by IMDb ID
app.get('/api/omdb/movie/:imdbId', async (req, res) => {
  if (!OMDB_KEY) return res.status(503).json({ error: 'OMDB_API_KEY not set' });
  try {
    const r = await axios.get('https://www.omdbapi.com/', { params: { apikey: OMDB_KEY, i: req.params.imdbId, plot: 'full' }, timeout: 8000 });
    if (r.data.Response === 'False') return res.status(404).json({ error: 'Not found' });
    res.json(omdbToMovie(r.data));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ── TMDB endpoints (fall back to OMDb search if TMDB unavailable) ─
app.get('/api/tmdb/popular', async (req, res) => {
  if (!TMDB_KEY) return res.status(503).json({ error: 'TMDB_API_KEY not set' });
  const { page = 1 } = req.query;
  try {
    const r = await axios.get(`${TMDB_BASE}/movie/popular`, { params: { api_key: TMDB_KEY, page }, timeout: 8000 });
    res.json({ results: (r.data.results || []).map(tmdbMovie), total_pages: r.data.total_pages });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/tmdb/trending', async (req, res) => {
  if (!TMDB_KEY) return res.status(503).json({ error: 'TMDB_API_KEY not set' });
  try {
    const r = await axios.get(`${TMDB_BASE}/trending/movie/week`, { params: { api_key: TMDB_KEY }, timeout: 8000 });
    res.json({ results: (r.data.results || []).map(tmdbMovie) });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/tmdb/search', async (req, res) => {
  const { q, page = 1 } = req.query;
  if (!q) return res.status(400).json({ error: 'q required' });
  // Try TMDB first, fall back to OMDb
  if (TMDB_KEY) {
    try {
      const r = await axios.get(`${TMDB_BASE}/search/movie`, { params: { api_key: TMDB_KEY, query: q, page }, timeout: 8000 });
      return res.json({ results: (r.data.results || []).map(tmdbMovie), total_pages: r.data.total_pages, source: 'tmdb' });
    } catch { /* fall through to OMDb */ }
  }
  if (OMDB_KEY) {
    try {
      const r = await axios.get('https://www.omdbapi.com/', { params: { apikey: OMDB_KEY, s: q, type: 'movie', page }, timeout: 8000 });
      if (r.data.Response === 'False') return res.json({ results: [], total: 0, source: 'omdb' });
      const ids = (r.data.Search || []).map(m => m.imdbID);
      const details = await Promise.allSettled(ids.slice(0, 10).map(id => axios.get('https://www.omdbapi.com/', { params: { apikey: OMDB_KEY, i: id }, timeout: 6000 })));
      const results = details.filter(d => d.status === 'fulfilled' && d.value.data.Response === 'True').map(d => omdbToMovie(d.value.data));
      return res.json({ results, total: parseInt(r.data.totalResults || '0'), source: 'omdb' });
    } catch (err) { return res.status(500).json({ error: err.message }); }
  }
  res.status(503).json({ error: 'No movie API keys configured' });
});

app.get('/api/tmdb/genre/:genreId', async (req, res) => {
  if (!TMDB_KEY) return res.status(503).json({ error: 'TMDB_API_KEY not set' });
  const { page = 1 } = req.query;
  try {
    const r = await axios.get(`${TMDB_BASE}/discover/movie`, { params: { api_key: TMDB_KEY, with_genres: req.params.genreId, sort_by: 'popularity.desc', page }, timeout: 8000 });
    res.json({ results: (r.data.results || []).map(tmdbMovie), total_pages: r.data.total_pages });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/tmdb/movie/:id', async (req, res) => {
  if (!TMDB_KEY) return res.status(503).json({ error: 'TMDB_API_KEY not set' });
  try {
    const [details, videos] = await Promise.all([
      axios.get(`${TMDB_BASE}/movie/${req.params.id}`, { params: { api_key: TMDB_KEY }, timeout: 8000 }),
      axios.get(`${TMDB_BASE}/movie/${req.params.id}/videos`, { params: { api_key: TMDB_KEY }, timeout: 8000 }),
    ]);
    const m = details.data;
    const trailer = (videos.data.results || []).find(v => v.type === 'Trailer' && v.site === 'YouTube');
    res.json({
      ...tmdbMovie(m),
      runtime: m.runtime,
      tagline: m.tagline,
      genres: (m.genres || []).map(g => g.name),
      trailerKey: trailer?.key || null,
      imdbId: m.imdb_id,
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Unified movie detail — tries TMDB then OMDb by imdbId
app.get('/api/movie/detail', async (req, res) => {
  const { tmdbId, imdbId, title, year } = req.query;
  // Try TMDB by tmdbId
  if (TMDB_KEY && tmdbId) {
    try {
      const [details, videos] = await Promise.all([
        axios.get(`${TMDB_BASE}/movie/${tmdbId}`, { params: { api_key: TMDB_KEY }, timeout: 8000 }),
        axios.get(`${TMDB_BASE}/movie/${tmdbId}/videos`, { params: { api_key: TMDB_KEY }, timeout: 8000 }),
      ]);
      const m = details.data;
      const trailer = (videos.data.results || []).find(v => v.type === 'Trailer' && v.site === 'YouTube');
      return res.json({ ...tmdbMovie(m), runtime: m.runtime, tagline: m.tagline, genres: (m.genres || []).map(g => g.name), trailerKey: trailer?.key || null, imdbId: m.imdb_id, source: 'tmdb' });
    } catch { /* fall through */ }
  }
  // Try OMDb by imdbId or title
  if (OMDB_KEY) {
    try {
      const params = imdbId ? { apikey: OMDB_KEY, i: imdbId, plot: 'full' } : { apikey: OMDB_KEY, t: title, y: year, plot: 'full' };
      const r = await axios.get('https://www.omdbapi.com/', { params, timeout: 8000 });
      if (r.data.Response === 'True') return res.json({ ...omdbToMovie(r.data), source: 'omdb' });
    } catch { /* fall through */ }
  }
  res.status(404).json({ error: 'Movie not found' });
});

// Archive.org search by movie title (used for finding playable source)
app.get('/api/archive/find', async (req, res) => {
  const { title, year } = req.query;
  if (!title) return res.status(400).json({ error: 'title required' });
  try {
    const q = `title:(${title}) AND mediatype:movies${year ? ` AND year:${year}` : ''}`;
    const r = await axios.get('https://archive.org/advancedsearch.php', { params: { q, fl: 'identifier,title', rows: 5, output: 'json' }, timeout: 8000 });
    const docs = r.data?.response?.docs || [];
    if (!docs.length) return res.json({ found: false });
    const id = docs[0].identifier;
    res.json({ found: true, identifier: id, archiveUrl: `https://archive.org/embed/${id}`, directUrl: `https://archive.org/download/${id}/${id}.mp4` });
  } catch { res.json({ found: false }); }
});

app.get('/api/room/:code', (req, res) => {
  const code = req.params.code.toUpperCase().trim();
  const room = rooms[code];
  if (!room) return res.status(404).json({ error: 'Room not found' });
  res.json({ roomId: code, videoUrl: room.videoUrl, videoType: room.videoType, users: Object.values(room.users), userCount: Object.keys(room.users).length });
});

// ── Permanent room endpoints ──────────────────────────────────────
app.get('/api/check-slug/:slug', (req, res) => {
  const slug = req.params.slug.toLowerCase().trim();
  res.json({ taken: !!permanentRooms[slug] });
});

app.post('/api/create-permanent-room', (req, res) => {
  const { slug, videoUrl, userName } = req.body || {};
  if (!slug || !/^[a-z0-9-]{3,30}$/.test(slug)) return res.status(400).json({ error: 'Invalid slug' });
  if (permanentRooms[slug]) return res.status(409).json({ error: 'Already taken' });
  if (!rooms[slug]) {
    rooms[slug] = { users: {}, host: null, maxViewers: 10, videoUrl: videoUrl || null, videoType: null, currentTime: 0, isPlaying: false, lastUpdate: Date.now(), pins: [], queue: [], isPermanent: true };
  }
  permanentRooms[slug] = slug;
  console.log(`[Room] Permanent room created: ${slug} by ${userName}`);
  res.json({ roomId: slug });
});

// SPA fallback with launch gate
app.get('*', (req, res) => {
  if (req.path === '/' && !isLaunched()) {
    const cs = path.join(webDistPath, 'coming-soon.html');
    if (fs.existsSync(cs)) return res.sendFile(cs);
  }
  const idx = path.join(webDistPath, 'index.html');
  if (fs.existsSync(idx)) res.sendFile(idx);
  else res.status(404).send('Web app not built. Run: npm run build:web');
});

// ── Socket.io ────────────────────────────────────────────────────
io.on('connection', (socket) => {
  let currentRoom = null;
  let currentUser = null;
  let currentColor = '#f0c060';

  socket.on('join', async ({ roomCode, userName, userColor, maxViewers }) => {
    const code = roomCode.toUpperCase().trim();
    currentUser = userName;
    currentColor = userColor || '#f0c060';

    if (!rooms[code]) {
      const saved = await loadRoom(code);
      rooms[code] = { users: {}, host: socket.id, maxViewers: maxViewers || 2, videoUrl: saved?.videoUrl || null, videoType: saved?.videoType || null, currentTime: saved?.currentTime || 0, isPlaying: false, lastUpdate: Date.now() };
    }

    // Enforce viewer limit (host sets the limit on room creation)
    const limit = rooms[code].maxViewers || 10;
    if (Object.keys(rooms[code].users).length >= limit) {
      socket.emit('room_full', { maxViewers: limit });
      return;
    }

    currentRoom = code;
    socket.join(code);
    rooms[code].users[socket.id] = { name: userName, id: socket.id, color: userColor, isFounder: isFounder(userName) };
    console.log(`[JOIN] ${userName} joined ${code} (${Object.keys(rooms[code].users).length} users)`);

    const room = rooms[code];
    let liveTime = room.currentTime;
    if (room.isPlaying && room.lastUpdate) liveTime += (Date.now() - room.lastUpdate) / 1000;

    socket.emit('room_state', { videoUrl: room.videoUrl, videoType: room.videoType, currentTime: liveTime, isPlaying: room.isPlaying, users: Object.values(room.users) });
    socket.to(code).emit('user_joined', { name: userName, id: socket.id });
    if (!room.videoUrl) socket.to(code).emit('request_state_sync');
    io.to(code).emit('room_users', Object.values(rooms[code].users));
    io.to(code).emit('host_info', { hostSocketId: rooms[code].host });
  });

  socket.on('host_kick', ({ targetId }) => {
    if (!currentRoom || !rooms[currentRoom] || rooms[currentRoom].host !== socket.id) return;
    io.to(targetId).emit('kicked');
  });

  socket.on('host_mute', ({ targetId, mute }) => {
    if (!currentRoom || !rooms[currentRoom] || rooms[currentRoom].host !== socket.id) return;
    io.to(targetId).emit('muted', { mute });
  });

  socket.on('chat_msg', ({ message, userName }) => {
    if (!currentRoom) return;
    io.to(currentRoom).emit('chat_msg', { message, userName, color: currentColor, timestamp: Date.now(), id: socket.id });
  });

  socket.on('sync_play', ({ currentTime }) => {
    if (!currentRoom || !rooms[currentRoom]) return;
    rooms[currentRoom].isPlaying = true; rooms[currentRoom].currentTime = currentTime; rooms[currentRoom].lastUpdate = Date.now();
    socket.to(currentRoom).emit('sync_play', { currentTime, from: socket.id });
    persistRoom(currentRoom, rooms[currentRoom]);
  });

  socket.on('sync_pause', ({ currentTime }) => {
    if (!currentRoom || !rooms[currentRoom]) return;
    rooms[currentRoom].isPlaying = false; rooms[currentRoom].currentTime = currentTime; rooms[currentRoom].lastUpdate = Date.now();
    socket.to(currentRoom).emit('sync_pause', { currentTime, from: socket.id });
    persistRoom(currentRoom, rooms[currentRoom]);
  });

  socket.on('sync_seek', ({ currentTime }) => {
    if (!currentRoom || !rooms[currentRoom]) return;
    rooms[currentRoom].currentTime = currentTime; rooms[currentRoom].lastUpdate = Date.now();
    socket.to(currentRoom).emit('sync_seek', { currentTime, from: socket.id });
    persistRoom(currentRoom, rooms[currentRoom]);
  });

  socket.on('sync_url', ({ url, videoType }) => {
    if (!currentRoom || !rooms[currentRoom]) return;
    rooms[currentRoom].videoUrl = url; rooms[currentRoom].videoType = videoType;
    rooms[currentRoom].currentTime = 0; rooms[currentRoom].isPlaying = false;
    socket.to(currentRoom).emit('sync_url', { url, videoType, from: socket.id });
    persistRoom(currentRoom, rooms[currentRoom]);
  });

  socket.on('sync_buffer', ({ buffering }) => { if (currentRoom) socket.to(currentRoom).emit('sync_buffer', { buffering, from: socket.id }); });
  socket.on('reaction', ({ emoji }) => { if (currentRoom) io.to(currentRoom).emit('reaction', { emoji, from: currentUser, id: socket.id }); });
  socket.on('typing', ({ isTyping }) => { if (currentRoom) socket.to(currentRoom).emit('typing', { userName: currentUser, isTyping, id: socket.id }); });
  socket.on('countdown_start', () => { if (currentRoom) io.to(currentRoom).emit('countdown_start', { from: currentUser }); });
  socket.on('queue_add', ({ url, title, type }) => { if (currentRoom) socket.to(currentRoom).emit('queue_add', { url, title, type }); });
  socket.on('queue_sync', ({ queue }) => { if (currentRoom) socket.to(currentRoom).emit('queue_sync', { queue }); });

  // ── Pinned moments ────────────────────────────────────────────
  socket.on('pin_moment', ({ roomId: rid, time, note }) => {
    const code = rid || currentRoom;
    if (!code || !rooms[code]) return;
    if (!rooms[code].pins) rooms[code].pins = [];
    const pin = { id: crypto.randomUUID(), userId: socket.id, name: currentUser, time, note: note || '', pinnedAt: Date.now() };
    rooms[code].pins.push(pin);
    io.to(code).emit('moment_pinned', pin);
  });

  socket.on('get_pins', ({ roomId: rid }) => {
    const code = rid || currentRoom;
    socket.emit('pins_list', { pins: rooms[code]?.pins ?? [] });
  });

  // ── Knock-to-join ─────────────────────────────────────────────
  socket.on('knock', ({ roomId: rid, userName: uName }) => {
    const code = (rid || '').toUpperCase().trim();
    if (!rooms[code] || Object.keys(rooms[code].users).length === 0) {
      socket.emit('knock_accepted');
      return;
    }
    const hostId = rooms[code].host;
    if (hostId) {
      io.to(hostId).emit('knock_request', { fromId: socket.id, fromName: uName });
    } else {
      socket.emit('knock_accepted');
    }
    setTimeout(() => socket.emit('knock_expired'), 60000);
  });

  socket.on('knock_respond', ({ toId, accepted }) => {
    io.to(toId).emit(accepted ? 'knock_accepted' : 'knock_declined');
  });

  // ── Face Cam / Voice — WebRTC signaling relay ──────────────────
  if (!rooms._camUsers) rooms._camUsers = {};

  socket.on('cam_join', ({ roomId: rid, userName: uName }) => {
    const code = rid || currentRoom;
    if (!code || !rooms[code]) return;
    if (!rooms[code].camUsers) rooms[code].camUsers = {};
    rooms[code].camUsers[socket.id] = uName || currentUser;
    // Tell the joining peer about existing cam users
    const existing = Object.entries(rooms[code].camUsers)
      .filter(([id]) => id !== socket.id)
      .map(([id, name]) => ({ id, name }));
    socket.emit('cam_peers', { peers: existing });
    // Tell existing users a new cam peer joined
    socket.to(code).emit('cam_join', { fromId: socket.id, fromName: uName || currentUser });
  });

  socket.on('cam_offer', ({ toId, offer, roomId: rid }) => {
    io.to(toId).emit('cam_offer', { fromId: socket.id, fromName: currentUser, offer });
  });

  socket.on('cam_answer', ({ toId, answer, roomId: rid }) => {
    io.to(toId).emit('cam_answer', { fromId: socket.id, answer });
  });

  socket.on('cam_ice', ({ toId, candidate, roomId: rid }) => {
    io.to(toId).emit('cam_ice', { fromId: socket.id, candidate });
  });

  socket.on('cam_leave', ({ roomId: rid }) => {
    const code = rid || currentRoom;
    if (code && rooms[code]?.camUsers) delete rooms[code].camUsers[socket.id];
    socket.to(code || currentRoom || '').emit('cam_leave', { fromId: socket.id });
  });

  // ── P2P File sharing — WebRTC signaling (no file data touches the server) ──
  socket.on('file_offer', ({ roomId, fileName, fileSize, fileType }) => {
    const code = roomId || currentRoom;
    if (!code || !rooms[code]) return;
    rooms[code].pendingFile = { fileName, fileSize, fileType, fromId: socket.id };
    socket.to(code).emit('file_offer', { fileName, fileSize, fileType, fromId: socket.id });
    console.log(`[Room ${code}] File offer: ${fileName} (${(fileSize / 1024 / 1024).toFixed(1)} MB)`);
  });

  socket.on('file_accepted', ({ roomId, fromId }) => {
    io.to(fromId).emit('file_accepted', { byId: socket.id });
  });

  socket.on('file_rejected', ({ roomId, fromId }) => {
    io.to(fromId).emit('file_rejected', { byId: socket.id });
  });

  // WebRTC signaling relay — targeted by toId, never inspect payload
  socket.on('webrtc_offer', ({ toId, offer }) => {
    if (toId) io.to(toId).emit('webrtc_offer', { fromId: socket.id, offer });
    else if (currentRoom) socket.to(currentRoom).emit('webrtc_offer', { fromId: socket.id, offer });
  });

  socket.on('webrtc_answer', ({ toId, answer }) => {
    if (toId) io.to(toId).emit('webrtc_answer', { fromId: socket.id, answer });
    else if (currentRoom) socket.to(currentRoom).emit('webrtc_answer', { fromId: socket.id, answer });
  });

  socket.on('webrtc_ice', ({ toId, candidate }) => {
    if (toId) io.to(toId).emit('webrtc_ice', { fromId: socket.id, candidate });
    else if (currentRoom) socket.to(currentRoom).emit('webrtc_ice', { fromId: socket.id, candidate });
  });

  socket.on('webrtc_stop', () => { if (currentRoom) socket.to(currentRoom).emit('webrtc_stop', { from: socket.id }); });

  socket.on('file_transfer_complete', ({ roomId }) => {
    const code = roomId || currentRoom;
    if (code) {
      socket.to(code).emit('file_transfer_complete');
      if (rooms[code]) delete rooms[code].pendingFile;
      console.log(`[Room ${code}] File transfer complete`);
    }
  });

  socket.on('file_transfer_progress', ({ toId, progress }) => {
    if (toId) io.to(toId).emit('file_transfer_progress', { progress });
  });

  socket.on('disconnect', () => {
    if (!currentRoom || !rooms[currentRoom]) return;
    if (rooms[currentRoom].camUsers) {
      delete rooms[currentRoom].camUsers[socket.id];
      socket.to(currentRoom).emit('cam_leave', { fromId: socket.id });
    }
    delete rooms[currentRoom].users[socket.id];
    io.to(currentRoom).emit('user_left', { name: currentUser, id: socket.id });
    io.to(currentRoom).emit('room_users', Object.values(rooms[currentRoom].users));
    if (rooms[currentRoom].host === socket.id) {
      const remaining = Object.keys(rooms[currentRoom].users);
      if (remaining.length > 0) { rooms[currentRoom].host = remaining[0]; io.to(currentRoom).emit('host_info', { hostSocketId: remaining[0] }); }
    }
    if (Object.keys(rooms[currentRoom].users).length === 0) { deleteRoom(currentRoom); delete rooms[currentRoom]; }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`SomniWatch server on port ${PORT}`));
