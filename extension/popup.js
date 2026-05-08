// SomniWatch Popup JS

const COLORS = ['#f0c060','#00d4ff','#ff6b9d','#7c6cf0','#4ade80','#fb923c','#e879f9','#34d399','#f87171','#60a5fa'];
const SERVER_URL = 'https://web-production-0cbba.up.railway.app';

let selectedColor = COLORS[0];
let currentTab = 'create';
let sessionActive = false;

// ── Init ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildColorPickers();
  generateCode();

  // Check if already in a session
  chrome.storage.local.get(['roomCode', 'userName', 'userColor'], (data) => {
    if (data.roomCode) {
      showSessionView(data.roomCode, data.userName, data.userColor);
    }
  });

  // Listen for status updates from content script
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'SYNC_STATUS') handleSyncStatus(msg);
  });

  document.getElementById('c-name').addEventListener('keydown', e => { if (e.key === 'Enter') createRoom(); });
  document.getElementById('j-code').addEventListener('input', e => {
    e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
  });
  document.getElementById('j-code').addEventListener('keydown', e => { if (e.key === 'Enter') knockRoom(); });

  // Wire buttons — replaces inline onclick handlers (CSP compliance)
  document.getElementById('tab-btn-create').addEventListener('click', () => switchTab('create'));
  document.getElementById('tab-btn-join').addEventListener('click',   () => switchTab('join'));
  document.getElementById('btn-create').addEventListener('click', createRoom);
  document.getElementById('btn-knock').addEventListener('click',  knockRoom);
  document.getElementById('btn-copy').addEventListener('click',   copyRoomLink);
  document.getElementById('btn-leave').addEventListener('click',  leaveRoom);
});

// ── Color pickers ─────────────────────────────────────────────────
function buildColorPickers() {
  const row = document.getElementById('c-colors');
  COLORS.forEach((c, i) => {
    const sw = document.createElement('div');
    sw.className = 'swatch' + (i === 0 ? ' sel' : '');
    sw.style.background = c;
    sw.onclick = () => {
      selectedColor = c;
      row.querySelectorAll('.swatch').forEach(s => s.classList.remove('sel'));
      sw.classList.add('sel');
    };
    row.appendChild(sw);
  });
}

// ── Room code generator ───────────────────────────────────────────
function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  document.getElementById('c-code').textContent = code;
  return code;
}

// ── Tab switcher ──────────────────────────────────────────────────
function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab').forEach((b, i) => {
    b.classList.toggle('active', (i === 0 && tab === 'create') || (i === 1 && tab === 'join'));
  });
  document.getElementById('tab-create').style.display = tab === 'create' ? 'flex' : 'none';
  document.getElementById('tab-create').style.flexDirection = 'column';
  document.getElementById('tab-create').style.gap = '10px';
  document.getElementById('tab-join').style.display = tab === 'join' ? 'flex' : 'none';
}

// ── Create Room ────────────────────────────────────────────
function createRoom() {
  const name = document.getElementById('c-name').value.trim();
  const code = document.getElementById('c-code').textContent;

  if (!name) { showToast('Enter your name first', true); return; }

  const sessionData = { roomCode: code, userName: name, userColor: selectedColor, serverUrl: SERVER_URL };
  saveAndConnect(sessionData);
}

// ── Join Room ────────────────────────────────────────────
function knockRoom() {
  const name = document.getElementById('j-name').value.trim();
  const code = document.getElementById('j-code').value.trim().toUpperCase();

  if (!name) { showToast('Enter your name first', true); return; }
  if (code.length !== 6) { showToast('Enter a valid 6-character room code', true); return; }

  const sessionData = { roomCode: code, userName: name, userColor: selectedColor, serverUrl: SERVER_URL };
  saveAndConnect(sessionData);
}

// ── Save session & inject into active tab ─────────────────────────
function saveAndConnect(data) {
  chrome.storage.local.set(data, () => {
    // Inject into the current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]) { showToast('No active tab found', true); return; }
      chrome.tabs.sendMessage(tabs[0].id, { type: 'SW_CONNECT', data }, (resp) => {
        if (chrome.runtime.lastError) {
          // Content script not injected yet — inject it now
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['socket.io.min.js', 'content.js']
          }, () => {
            setTimeout(() => {
              chrome.tabs.sendMessage(tabs[0].id, { type: 'SW_CONNECT', data });
            }, 800);
          });
        }
      });
      showSessionView(data.roomCode, data.userName, data.userColor);
    });
  });
}

// ── Leave Room ────────────────────────────────────────────
function leaveRoom() {
  // Clear storage immediately so popup never gets stuck
  chrome.storage.local.remove(['roomCode', 'userName', 'userColor', 'password', 'serverUrl']);
  showConnectView();
  // Disconnect ALL tabs that might have the content script running
  chrome.tabs.query({}, (tabs) => {
    (tabs || []).forEach(tab => {
      if (!tab.url || tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://')) return;
      chrome.tabs.sendMessage(tab.id, { type: 'SW_DISCONNECT' }, () => {
        void chrome.runtime.lastError;
      });
    });
  });
}

// ── Copy room link ────────────────────────────────────────────────
function copyRoomLink() {
  const code = document.getElementById('s-room').textContent;
  const url = `https://watch.somniread.com/join?room=${code}`;
  try {
    const ta = document.createElement('textarea');
    ta.value = url;
    ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    document.execCommand('copy');
    ta.remove();
    showToast('Room link copied!');
  } catch (e) {
    showToast('Code: ' + code);
  }
}

// ── Views ─────────────────────────────────────────────────────────
function showSessionView(roomCode, userName, userColor) {
  sessionActive = true;
  document.getElementById('view-connect').style.display = 'none';
  document.getElementById('view-session').style.display = 'flex';
  document.getElementById('view-session').style.flexDirection = 'column';
  document.getElementById('view-session').style.gap = '10px';
  document.getElementById('view-session').style.padding = '16px';
  document.getElementById('s-room').textContent = roomCode;
  document.getElementById('s-name').textContent = userName;
  const dot = document.getElementById('status-dot');
  dot.className = 'status-dot connected';
  document.getElementById('status-text').textContent = `Connected · ${roomCode}`;
}

function showConnectView() {
  sessionActive = false;
  document.getElementById('view-connect').style.display = 'flex';
  document.getElementById('view-session').style.display = 'none';
  const dot = document.getElementById('status-dot');
  dot.className = 'status-dot';
  document.getElementById('status-text').textContent = 'Not connected';
  generateCode();
}

// ── Sync status handler ───────────────────────────────────────────
function handleSyncStatus(msg) {
  const dot = document.getElementById('status-dot');
  const statusText = document.getElementById('status-text');
  const sessionMsg = document.getElementById('s-status-msg');

  if (msg.status === 'connected') {
    dot.className = 'status-dot connected';
    statusText.textContent = `Syncing · ${msg.roomCode}`;
    if (sessionMsg) sessionMsg.textContent = 'Syncing video ✓';
  } else if (msg.status === 'wrong_password') {
    dot.className = 'status-dot error';
    statusText.textContent = 'Wrong password';
    showToast('Wrong room password', true);
    leaveRoom();
  }
}

// ── Toast ─────────────────────────────────────────────────────────
function showToast(msg, isErr) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast show' + (isErr ? ' err' : '');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.className = 'toast'; }, 3000);
}
