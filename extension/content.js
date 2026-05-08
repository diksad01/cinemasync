// SomniWatch Content Script — Teleparty-style sync + chat sidebar
// Injected into YouTube, Dailymotion, Vimeo, Twitch, Netflix, etc.

(function () {
  'use strict';

  const SERVER_URL = 'https://web-production-0cbba.up.railway.app';
  const SEEK_THRESHOLD = 2.5;
  const DEBOUNCE_MS = 800;

  let socket = null;
  let roomCode = null;
  let userName = null;
  let userColor = null;
  let isSyncing = false;
  let connected = false;
  let videoEl = null;
  let debounceTimer = null;
  let bufferEmitTimer = null;
  let overlay = null;
  let sidebar = null;
  let reconnectTimer = null;

  // ── Find video element ───────────────────────────────────────────
  function findVideo() {
    // YouTube player
    const yt = document.querySelector('video.html5-main-video');
    if (yt) return yt;
    // Generic fallback
    const all = Array.from(document.querySelectorAll('video'));
    return all.find(v => v.duration > 0) || all[0] || null;
  }

  function waitForVideo(cb) {
    const v = findVideo();
    if (v) { cb(v); return; }
    const obs = new MutationObserver(() => {
      const found = findVideo();
      if (found) { obs.disconnect(); cb(found); }
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  // ── Chat Sidebar UI ─────────────────────────────────────────────
  function createSidebar() {
    if (sidebar) return;
    sidebar = document.createElement('div');
    sidebar.id = 'sw-sidebar';
    sidebar.innerHTML = `
      <style>
        #sw-sidebar { position:fixed; top:0; right:0; width:340px; height:100vh; z-index:9999999;
          background:rgba(6,8,15,0.97); border-left:1px solid rgba(240,192,96,0.2);
          font-family:'DM Sans',system-ui,sans-serif; display:flex; flex-direction:column;
          transition:transform 0.3s cubic-bezier(0.4,0,0.2,1); backdrop-filter:blur(16px); }
        #sw-sidebar.collapsed { transform:translateX(340px); }
        #sw-tab { position:fixed; top:50%; right:0; z-index:99999999; transform:translateY(-50%);
          background:rgba(6,8,15,0.95); border:1px solid rgba(240,192,96,0.3); border-right:none;
          border-radius:8px 0 0 8px; padding:10px 6px; cursor:pointer; color:#f0c060;
          font-family:'DM Sans',system-ui,sans-serif; font-size:14px; font-weight:700;
          writing-mode:vertical-lr; text-orientation:mixed; display:none;
          box-shadow:-4px 0 16px rgba(0,0,0,0.4); transition:0.2s; }
        #sw-tab:hover { background:rgba(240,192,96,0.15); }
        #sw-tab.visible { display:block; }
        #sw-header { padding:12px 14px; border-bottom:1px solid rgba(255,255,255,0.07);
          display:flex; align-items:center; gap:10px; flex-shrink:0; }
        #sw-header-dot { width:8px; height:8px; border-radius:50%; background:#f0c060; }
        #sw-header-title { font-weight:700; font-size:14px; color:#f0c060; }
        #sw-header-sub { font-size:11px; color:#7a8199; }
        #sw-toggle { margin-left:auto; background:none; border:none; color:#7a8199; cursor:pointer;
          font-size:18px; padding:4px 6px; transition:0.2s; }
        #sw-toggle:hover { color:#e8eaf0; }
        #sw-users { padding:8px 14px; border-bottom:1px solid rgba(255,255,255,0.05);
          font-size:11px; color:#7a8199; display:flex; gap:6px; flex-wrap:wrap; flex-shrink:0; }
        .sw-user-pill { background:rgba(240,192,96,0.12); border:1px solid rgba(240,192,96,0.2);
          border-radius:100px; padding:2px 10px; font-size:11px; color:#e8eaf0; white-space:nowrap; }
        #sw-messages { flex:1; overflow-y:auto; padding:10px 14px; display:flex; flex-direction:column; gap:6px; }
        .sw-msg { max-width:85%; padding:6px 10px; border-radius:10px; font-size:12.5px; line-height:1.4; word-break:break-word; }
        .sw-msg-other { background:rgba(255,255,255,0.06); color:#e8eaf0; align-self:flex-start; border-bottom-left-radius:2px; }
        .sw-msg-own { background:rgba(240,192,96,0.18); color:#e8eaf0; align-self:flex-end; border-bottom-right-radius:2px; }
        .sw-msg-system { background:none; color:#7a8199; font-size:11px; align-self:center; font-style:italic; }
        .sw-msg-name { font-size:10px; font-weight:600; margin-bottom:2px; }
        #sw-input-row { padding:10px 14px; border-top:1px solid rgba(255,255,255,0.07);
          display:flex; gap:8px; flex-shrink:0; }
        #sw-chat-input { flex:1; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1);
          border-radius:8px; color:#e8eaf0; font-family:inherit; font-size:13px; padding:8px 12px;
          outline:none; transition:0.2s; }
        #sw-chat-input:focus { border-color:rgba(240,192,96,0.4); }
        #sw-chat-input::placeholder { color:#555; }
        #sw-send-btn { background:linear-gradient(135deg,#f0c060,#f0a03c); border:none; border-radius:8px;
          color:#06080f; font-weight:700; font-size:13px; padding:8px 14px; cursor:pointer; transition:0.2s; }
        #sw-send-btn:hover { opacity:0.85; }
        #sw-sidebar::-webkit-scrollbar { width:4px; }
        #sw-sidebar::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.1); border-radius:4px; }
        #sw-messages::-webkit-scrollbar { width:4px; }
        #sw-messages::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.1); border-radius:4px; }
      </style>
      <div id="sw-header">
        <div id="sw-header-dot"></div>
        <div>
          <div id="sw-header-title">SomniWatch</div>
          <div id="sw-header-sub">Connecting…</div>
        </div>
        <button id="sw-toggle" title="Hide sidebar">✕</button>
      </div>
      <div id="sw-users"></div>
      <div id="sw-messages"></div>
      <div id="sw-input-row">
        <input id="sw-chat-input" type="text" placeholder="Type a message…" maxlength="300" autocomplete="off" />
        <button id="sw-send-btn">Send</button>
      </div>
    `;
    // Floating tab to re-open sidebar
    let tab = document.getElementById('sw-tab');
    if (!tab) {
      tab = document.createElement('div');
      tab.id = 'sw-tab';
      tab.textContent = 'SW Chat';
      document.body.appendChild(tab);
    }
    document.body.appendChild(sidebar);

    // Close sidebar → show tab
    document.getElementById('sw-toggle').onclick = () => {
      sidebar.classList.add('collapsed');
      tab.classList.add('visible');
    };
    // Click tab → reopen sidebar
    tab.onclick = () => {
      sidebar.classList.remove('collapsed');
      tab.classList.remove('visible');
    };

    // Send chat
    const input = document.getElementById('sw-chat-input');
    const send = () => {
      const msg = input.value.trim();
      if (!msg || !socket || !connected) return;
      socket.emit('chat_msg', { message: msg, userName });
      input.value = '';
    };
    document.getElementById('sw-send-btn').onclick = send;
    input.addEventListener('keydown', e => { if (e.key === 'Enter') send(); e.stopPropagation(); });
    input.addEventListener('keyup', e => e.stopPropagation());
    input.addEventListener('keypress', e => e.stopPropagation());
  }

  function addChatMessage(name, text, color, isOwn, isSystem) {
    const container = document.getElementById('sw-messages');
    if (!container) return;
    const div = document.createElement('div');
    if (isSystem) {
      div.className = 'sw-msg sw-msg-system';
      div.textContent = text;
    } else {
      div.className = 'sw-msg ' + (isOwn ? 'sw-msg-own' : 'sw-msg-other');
      div.innerHTML = `<div class="sw-msg-name" style="color:${color || '#f0c060'}">${name}</div>${text}`;
    }
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  function updateUsersUI(users) {
    const el = document.getElementById('sw-users');
    if (!el || !users) return;
    el.innerHTML = users.map(u =>
      `<span class="sw-user-pill" style="border-color:${u.color || '#f0c060'}30">${u.name}</span>`
    ).join('');
  }

  function setOverlayStatus(status, sub, color) {
    const dot = document.getElementById('sw-header-dot');
    const st = document.getElementById('sw-header-title');
    const sb = document.getElementById('sw-header-sub');
    if (dot) dot.style.background = color || '#f0c060';
    if (st) st.textContent = status;
    if (sb) sb.textContent = sub || '';
  }

  // ── Socket connection ────────────────────────────────────────────
  function connect(data) {
    roomCode = data.roomCode;
    userName = data.userName || 'Guest';
    userColor = data.userColor || '#f0c060';
    const serverUrl = data.serverUrl || SERVER_URL;

    if (socket) { try { socket.disconnect(); } catch(e) {} socket = null; }

    if (typeof io === 'undefined') {
      setOverlayStatus('Error', 'Socket.io not loaded', '#ff6060');
      return;
    }

    try {
    // io is injected via socket.io.min.js
    socket = io(serverUrl, { transports: ['websocket'], reconnectionDelay: 2000, timeout: 8000 });

    socket.on('connect', () => {
      connected = true;
      socket.emit('join', { roomCode, userName, userColor, password: data.password || '' });
      setOverlayStatus('SomniWatch 🟢', `Room: ${roomCode}`, '#4ade80');
      chrome.runtime.sendMessage({ type: 'SYNC_STATUS', status: 'connected', roomCode });
    });

    socket.on('disconnect', () => {
      connected = false;
      setOverlayStatus('SomniWatch', 'Disconnected', '#ff6060');
    });

    socket.on('wrong_password', () => {
      setOverlayStatus('Wrong password', 'Check room password', '#ff6060');
      chrome.runtime.sendMessage({ type: 'SYNC_STATUS', status: 'wrong_password' });
    });

    socket.on('kicked', () => {
      setOverlayStatus('Removed', 'Host removed you from room', '#ff6060');
      socket.disconnect();
    });

    socket.on('muted', ({ mute }) => {
      if (videoEl) {
        videoEl.muted = mute;
      }
      setOverlayStatus('SomniWatch 🟢', mute ? 'You were muted 🔇' : 'You were unmuted 🔊', '#4ade80');
    });

    // ── Incoming sync events ─────────────────────────────────────
    socket.on('sync_play', ({ currentTime }) => {
      if (!videoEl) return;
      isSyncing = true;
      if (Math.abs(videoEl.currentTime - currentTime) > SEEK_THRESHOLD) {
        videoEl.currentTime = currentTime;
      }
      videoEl.play().catch(() => {}).finally(() => {
        setTimeout(() => { isSyncing = false; }, 300);
      });
    });

    socket.on('sync_pause', ({ currentTime }) => {
      if (!videoEl) return;
      isSyncing = true;
      videoEl.pause();
      if (Math.abs(videoEl.currentTime - currentTime) > SEEK_THRESHOLD) {
        videoEl.currentTime = currentTime;
      }
      setTimeout(() => { isSyncing = false; }, 300);
    });

    socket.on('sync_seek', ({ currentTime }) => {
      if (!videoEl) return;
      isSyncing = true;
      videoEl.currentTime = currentTime;
      setTimeout(() => { isSyncing = false; }, 300);
    });

    socket.on('sync_buffer', ({ buffering }) => {
      if (buffering) {
        setOverlayStatus('SomniWatch 🟡', 'Partner buffering…', '#f0c060');
        if (videoEl && !videoEl.paused) videoEl.pause();
      } else {
        setOverlayStatus('SomniWatch 🟢', `Room: ${roomCode}`, '#4ade80');
        if (videoEl && videoEl.paused) videoEl.play().catch(() => {});
      }
    });

    socket.on('room_state', ({ videoUrl, currentTime, isPlaying, users }) => {
      updateUsersUI(users);
      // If room has a different video URL, redirect to it
      if (videoUrl && !videoUrl.startsWith('/')) {
        const cleanRoomUrl = videoUrl.replace(/[?&]sw_room=[^&]+/, '');
        const cleanPageUrl = location.href.replace(/[?&]sw_room=[^&]+/, '');
        if (cleanRoomUrl !== cleanPageUrl && !cleanPageUrl.includes(cleanRoomUrl)) {
          addChatMessage(null, 'Redirecting to room video…', null, false, true);
          const sep = videoUrl.includes('?') ? '&' : '?';
          window.location.href = cleanRoomUrl + sep + 'sw_room=' + roomCode;
          return;
        }
      }
      if (!videoEl) return;
      isSyncing = true;
      if (currentTime && Math.abs(videoEl.currentTime - currentTime) > SEEK_THRESHOLD) {
        videoEl.currentTime = currentTime;
      }
      if (isPlaying && videoEl.paused) {
        videoEl.play().catch(() => {}).finally(() => setTimeout(() => { isSyncing = false; }, 300));
      } else if (!isPlaying && !videoEl.paused) {
        videoEl.pause();
        setTimeout(() => { isSyncing = false; }, 300);
      } else {
        setTimeout(() => { isSyncing = false; }, 300);
      }
      const count = users ? users.length : '?';
      setOverlayStatus('SomniWatch', `${count} watching · Room: ${roomCode}`, '#4ade80');
    });

    // Chat messages
    socket.on('chat_msg', ({ message, userName: name, color }) => {
      const isOwn = name === userName;
      addChatMessage(name, message, color, isOwn);
    });

    socket.on('user_joined', ({ name }) => {
      addChatMessage(null, `${name} joined`, null, false, true);
      setOverlayStatus('SomniWatch', `${name} joined · Room: ${roomCode}`, '#4ade80');
    });

    socket.on('user_left', ({ name }) => {
      addChatMessage(null, `${name} left`, null, false, true);
    });

    socket.on('room_users', (users) => {
      updateUsersUI(users);
      const count = users ? users.length : '?';
      setOverlayStatus('SomniWatch', `${count} watching · Room: ${roomCode}`, '#4ade80');
    });

    // When host changes video, redirect to new URL
    socket.on('sync_url', ({ url }) => {
      if (!url || url.startsWith('/')) return;
      const cleanUrl = url.replace(/[?&]sw_room=[^&]+/, '');
      const cleanPage = location.href.replace(/[?&]sw_room=[^&]+/, '');
      if (cleanUrl !== cleanPage && !cleanPage.includes(cleanUrl)) {
        addChatMessage(null, 'Host changed video — redirecting…', null, false, true);
        const sep = cleanUrl.includes('?') ? '&' : '?';
        window.location.href = cleanUrl + sep + 'sw_room=' + roomCode;
      }
    });

    socket.on('request_state_sync', () => {
      if (!videoEl) return;
      const url = location.href.replace(/[?&]sw_room=[^&]+/, '');
      socket.emit('sync_url', { url, videoType: 'iframe' });
      socket.emit('sync_seek', { currentTime: videoEl.currentTime });
      if (!videoEl.paused) socket.emit('sync_play', { currentTime: videoEl.currentTime });
      else socket.emit('sync_pause', { currentTime: videoEl.currentTime });
    });

    } catch(e) {
      setOverlayStatus('Error', 'Failed to connect: ' + e.message, '#ff6060');
    }
  }

  // ── Attach video listeners ───────────────────────────────────────
  function attachVideoListeners(vid) {
    videoEl = vid;

    vid.addEventListener('play', () => {
      if (isSyncing || !connected) return;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        socket.emit('sync_play', { currentTime: vid.currentTime });
      }, DEBOUNCE_MS);
    });

    vid.addEventListener('pause', () => {
      if (isSyncing || !connected) return;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        socket.emit('sync_pause', { currentTime: vid.currentTime });
      }, DEBOUNCE_MS);
    });

    vid.addEventListener('seeked', () => {
      if (isSyncing || !connected) return;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        socket.emit('sync_seek', { currentTime: vid.currentTime });
      }, DEBOUNCE_MS);
    });

    vid.addEventListener('waiting', () => {
      if (!connected) return;
      clearTimeout(bufferEmitTimer);
      bufferEmitTimer = setTimeout(() => {
        socket.emit('sync_buffer', { buffering: true });
      }, 1500);
    });

    vid.addEventListener('playing', () => {
      clearTimeout(bufferEmitTimer);
      if (connected) socket.emit('sync_buffer', { buffering: false });
    });

    vid.addEventListener('canplay', () => {
      clearTimeout(bufferEmitTimer);
      if (connected) socket.emit('sync_buffer', { buffering: false });
    });
  }

  // ── Start session ──────────────────────────────────────────────
  function startSession(data) {
    createSidebar();
    setOverlayStatus('SomniWatch', 'Finding video…', '#f0c060');
    connect(data);
    waitForVideo((vid) => {
      attachVideoListeners(vid);
      setOverlayStatus('SomniWatch', `Syncing · Room: ${roomCode}`, '#4ade80');
      // Broadcast current page URL as the room video (strip sw_room param)
      const cleanUrl = location.href.replace(/[?&]sw_room=[^&]+/, '');
      if (socket && connected) {
        socket.emit('sync_url', { url: cleanUrl, videoType: 'iframe' });
      }
    });
  }

  // ── Auto-join from URL param ?sw_room=CODE ─────────────────────
  const urlParams = new URLSearchParams(location.search);
  const swRoom = urlParams.get('sw_room');
  if (swRoom && swRoom.length === 6) {
    // Auto-join: get user name from storage or prompt
    chrome.storage.local.get(['userName', 'userColor'], (stored) => {
      const name = stored.userName || 'Guest';
      const color = stored.userColor || '#f0c060';
      const data = { roomCode: swRoom.toUpperCase(), userName: name, userColor: color, serverUrl: SERVER_URL };
      // Save session so popup shows connected state
      chrome.storage.local.set({ roomCode: data.roomCode, userName: name, userColor: color, serverUrl: SERVER_URL });
      startSession(data);
    });
  } else {
    // ── Normal init: check for existing session ────────────────────
    chrome.runtime.sendMessage({ type: 'GET_SESSION' }, (data) => {
      if (!data || !data.roomCode) return;
      startSession(data);
    });
  }

  // Listen for connect/disconnect commands from popup
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'SW_CONNECT') {
      startSession(msg.data);
    }
    if (msg.type === 'SW_DISCONNECT') {
      try { if (socket) { socket.disconnect(); socket = null; } } catch(e) {}
      if (sidebar) { try { sidebar.remove(); } catch(e) {} sidebar = null; }
      const tab = document.getElementById('sw-tab');
      if (tab) tab.remove();
      connected = false;
      roomCode = null;
    }
  });

})();
