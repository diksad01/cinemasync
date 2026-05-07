// SomniWatch Content Script
// Injected into YouTube, Dailymotion, Vimeo, Twitch
// Hooks the video element and syncs with the SomniWatch server via Socket.io

(function () {
  'use strict';

  const SERVER_URL = 'https://web-production-0cbba.up.railway.app';
  const SEEK_THRESHOLD = 2.5; // seconds difference before forcing a seek
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

  // ── Overlay UI ───────────────────────────────────────────────────
  function createOverlay() {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.id = 'somniwatch-overlay';
    overlay.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 20px;
      z-index: 999999;
      background: rgba(6,8,15,0.92);
      border: 1px solid rgba(240,192,96,0.3);
      border-radius: 12px;
      padding: 10px 14px;
      font-family: 'DM Sans', system-ui, sans-serif;
      font-size: 13px;
      color: #e8eaf0;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5);
      min-width: 220px;
      backdrop-filter: blur(10px);
      transition: opacity 0.3s;
    `;
    overlay.innerHTML = `
      <div id="sw-dot" style="width:8px;height:8px;border-radius:50%;background:#f0c060;flex-shrink:0;animation:swPulse 2s infinite"></div>
      <div>
        <div id="sw-status" style="font-weight:600;color:#f0c060">SomniWatch</div>
        <div id="sw-sub" style="font-size:11px;color:#7a8199">Connecting…</div>
      </div>
      <button id="sw-close" style="margin-left:auto;background:none;border:none;color:#7a8199;cursor:pointer;font-size:16px;padding:0 2px;line-height:1">✕</button>
      <style>
        @keyframes swPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      </style>
    `;
    document.body.appendChild(overlay);
    document.getElementById('sw-close').onclick = () => {
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 300);
      overlay = null;
    };
  }

  function setOverlayStatus(status, sub, color) {
    if (!overlay) return;
    const dot = document.getElementById('sw-dot');
    const st = document.getElementById('sw-status');
    const sb = document.getElementById('sw-sub');
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

    if (socket) socket.disconnect();

    // io is injected via socket.io.min.js
    socket = io(serverUrl, { transports: ['websocket'], reconnectionDelay: 2000 });

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

    socket.on('must_knock', () => {
      setOverlayStatus('Must knock first', 'Host needs to accept you', '#f0c060');
      chrome.runtime.sendMessage({ type: 'SYNC_STATUS', status: 'must_knock' });
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
      if (!videoEl) return;
      isSyncing = true;
      // For YouTube: check if current video matches
      const currentPageUrl = location.href;
      if (videoUrl && videoUrl !== currentPageUrl) {
        setOverlayStatus('SomniWatch 🟡', 'Partner watching different video', '#f0c060');
      }
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
      setOverlayStatus('SomniWatch 🟢', `${count} watching · Room: ${roomCode}`, '#4ade80');
    });

    socket.on('user_joined', ({ name }) => {
      setOverlayStatus('SomniWatch 🟢', `${name} joined · Room: ${roomCode}`, '#4ade80');
    });

    socket.on('user_left', ({ name }) => {
      setOverlayStatus('SomniWatch 🟢', `${name} left · Room: ${roomCode}`, '#4ade80');
    });

    socket.on('room_users', (users) => {
      const count = users ? users.length : '?';
      setOverlayStatus('SomniWatch 🟢', `${count} watching · Room: ${roomCode}`, '#4ade80');
    });

    socket.on('request_state_sync', () => {
      if (!videoEl) return;
      const url = location.href;
      socket.emit('sync_url', { url, videoType: 'iframe' });
      socket.emit('sync_seek', { currentTime: videoEl.currentTime });
      if (!videoEl.paused) socket.emit('sync_play', { currentTime: videoEl.currentTime });
      else socket.emit('sync_pause', { currentTime: videoEl.currentTime });
    });

    socket.on('incoming_knock', ({ name, color, id }) => {
      showKnockAlert(name, color, id);
    });
  }

  // ── Knock alert UI ───────────────────────────────────────────────
  function showKnockAlert(name, color, knockerId) {
    const existing = document.getElementById('sw-knock-' + knockerId);
    if (existing) return;

    const alert = document.createElement('div');
    alert.id = 'sw-knock-' + knockerId;
    alert.style.cssText = `
      position: fixed;
      bottom: 140px;
      right: 20px;
      z-index: 9999999;
      background: rgba(6,8,15,0.96);
      border: 1px solid rgba(240,192,96,0.4);
      border-radius: 14px;
      padding: 14px 16px;
      font-family: 'DM Sans', system-ui, sans-serif;
      font-size: 13px;
      color: #e8eaf0;
      box-shadow: 0 8px 32px rgba(0,0,0,0.6);
      min-width: 240px;
      backdrop-filter: blur(12px);
      animation: swSlideIn 0.3s ease;
    `;
    alert.innerHTML = `
      <style>
        @keyframes swSlideIn { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
      </style>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
        <div style="width:28px;height:28px;border-radius:50%;background:${color || '#f0c060'};display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;color:#06080f;flex-shrink:0">
          ${(name || '?')[0].toUpperCase()}
        </div>
        <div>
          <div style="font-weight:700;color:#f0c060">🔔 ${name} wants to join</div>
          <div style="font-size:11px;color:#7a8199">Accept to let them in</div>
        </div>
      </div>
      <div style="display:flex;gap:8px">
        <button id="sw-accept-${knockerId}" style="flex:1;background:linear-gradient(135deg,#f0c060,#f0a03c);border:none;border-radius:8px;color:#06080f;font-weight:700;font-size:12px;padding:8px;cursor:pointer">
          Accept
        </button>
        <button id="sw-decline-${knockerId}" style="flex:1;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:8px;color:#e8eaf0;font-size:12px;padding:8px;cursor:pointer">
          Decline
        </button>
      </div>
    `;

    document.body.appendChild(alert);

    document.getElementById('sw-accept-' + knockerId).onclick = () => {
      socket.emit('knock_response', { knockerId, accepted: true });
      alert.remove();
      setOverlayStatus('SomniWatch 🟢', `${name} accepted · Room: ${roomCode}`, '#4ade80');
    };
    document.getElementById('sw-decline-' + knockerId).onclick = () => {
      socket.emit('knock_response', { knockerId, accepted: false });
      alert.remove();
    };

    // Auto-dismiss after 30 seconds
    setTimeout(() => {
      if (document.getElementById('sw-knock-' + knockerId)) {
        socket.emit('knock_response', { knockerId, accepted: false });
        alert.remove();
      }
    }, 30000);
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

  // ── Init ─────────────────────────────────────────────────────────
  chrome.runtime.sendMessage({ type: 'GET_SESSION' }, (data) => {
    if (!data || !data.roomCode) return; // not in a session

    createOverlay();
    setOverlayStatus('SomniWatch', 'Finding video…', '#f0c060');

    connect(data);

    waitForVideo((vid) => {
      attachVideoListeners(vid);
      setOverlayStatus('SomniWatch 🟢', `Syncing · Room: ${roomCode}`, '#4ade80');
      // Broadcast current page URL as the room video
      if (socket && connected) {
        socket.emit('sync_url', { url: location.href, videoType: 'iframe' });
      }
    });
  });

  // Listen for connect/disconnect commands from popup
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'SW_CONNECT') {
      createOverlay();
      connect(msg.data);
      waitForVideo((vid) => {
        attachVideoListeners(vid);
        if (socket) socket.emit('sync_url', { url: location.href, videoType: 'iframe' });
      });
    }
    if (msg.type === 'SW_DISCONNECT') {
      if (socket) socket.disconnect();
      if (overlay) { overlay.remove(); overlay = null; }
      connected = false;
    }
  });

})();
