import React from 'react'
import ReactDOM from 'react-dom/client'
import Sidebar from './Sidebar'

const SEEK_THRESHOLD = 2.5
const DEBOUNCE_MS = 800
let videoEl: HTMLVideoElement | null = null
let isSyncing = false
let debounceTimer: ReturnType<typeof setTimeout>

function findVideo(): HTMLVideoElement | null {
  const yt = document.querySelector('video.html5-main-video') as HTMLVideoElement
  if (yt) return yt
  const all = Array.from(document.querySelectorAll('video'))
  return all.find(v => v.duration > 0) || all[0] || null
}

function waitForVideo(cb: (v: HTMLVideoElement) => void) {
  const v = findVideo()
  if (v) { cb(v); return }
  const obs = new MutationObserver(() => {
    const found = findVideo()
    if (found) { obs.disconnect(); cb(found) }
  })
  obs.observe(document.body, { childList: true, subtree: true })
}

function attachVideoListeners(vid: HTMLVideoElement) {
  videoEl = vid

  vid.addEventListener('play', () => {
    if (isSyncing) return
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      chrome.runtime.sendMessage({ type: 'SYNC_PLAY', time: vid.currentTime })
    }, DEBOUNCE_MS)
  })

  vid.addEventListener('pause', () => {
    if (isSyncing) return
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      chrome.runtime.sendMessage({ type: 'SYNC_PAUSE', time: vid.currentTime })
    }, DEBOUNCE_MS)
  })

  vid.addEventListener('seeked', () => {
    if (isSyncing) return
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      chrome.runtime.sendMessage({ type: 'SYNC_SEEK', time: vid.currentTime })
    }, DEBOUNCE_MS)
  })
}

// Listen for sync commands from background
chrome.runtime.onMessage.addListener((msg) => {
  if (!videoEl) return

  if (msg.type === 'SYNC_PLAY') {
    isSyncing = true
    if (Math.abs(videoEl.currentTime - msg.time) > SEEK_THRESHOLD) videoEl.currentTime = msg.time
    videoEl.play().catch(() => {}).finally(() => setTimeout(() => { isSyncing = false }, 300))
  }

  if (msg.type === 'SYNC_PAUSE') {
    isSyncing = true
    videoEl.pause()
    if (Math.abs(videoEl.currentTime - msg.time) > SEEK_THRESHOLD) videoEl.currentTime = msg.time
    setTimeout(() => { isSyncing = false }, 300)
  }

  if (msg.type === 'SYNC_SEEK') {
    isSyncing = true
    videoEl.currentTime = msg.time
    setTimeout(() => { isSyncing = false }, 300)
  }
})

// Auto-join from URL param
const urlParams = new URLSearchParams(location.search)
const swRoom = urlParams.get('sw_room')

function init(roomCode: string) {
  // Inject sidebar via Shadow DOM
  const host = document.createElement('div')
  host.id = 'somniwatch-sidebar-host'
  host.style.cssText = 'position:fixed;top:0;right:0;z-index:99999999;width:0;height:0;'
  document.body.appendChild(host)

  const shadow = host.attachShadow({ mode: 'open' })
  const container = document.createElement('div')
  shadow.appendChild(container)

  // Inject styles into shadow DOM
  const style = document.createElement('style')
  style.textContent = getSidebarStyles()
  shadow.appendChild(style)

  ReactDOM.createRoot(container).render(<Sidebar roomCode={roomCode} />)

  // Hook video
  waitForVideo((vid) => {
    attachVideoListeners(vid)
    // Broadcast URL to room
    const cleanUrl = location.href.replace(/[?&]sw_room=[^&]+/, '')
    chrome.runtime.sendMessage({ type: 'SYNC_URL', url: cleanUrl, videoType: 'iframe' })
  })
}

if (swRoom && swRoom.length === 6) {
  chrome.storage.local.get(['userName', 'userColor'], (stored) => {
    const name = stored.userName || 'Guest'
    const color = stored.userColor || '#f0c060'
    chrome.storage.local.set({ roomCode: swRoom.toUpperCase(), userName: name, userColor: color })
    chrome.runtime.sendMessage({ type: 'JOIN_ROOM', roomId: swRoom.toUpperCase(), userName: name, userColor: color })
    init(swRoom.toUpperCase())
  })
} else {
  chrome.runtime.sendMessage({ type: 'GET_SESSION' }, (data) => {
    if (!data?.roomCode) return
    init(data.roomCode)
  })
}

function getSidebarStyles() {
  return `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    .sw-sidebar { position:fixed; top:0; right:0; width:340px; height:100vh;
      background:rgba(6,8,15,0.97); border-left:1px solid rgba(240,192,96,0.2);
      font-family:'DM Sans',system-ui,sans-serif; display:flex; flex-direction:column;
      transition:transform 0.3s; backdrop-filter:blur(16px); color:#e8eaf0; font-size:13px; }
    .sw-sidebar.collapsed { transform:translateX(340px); }
    .sw-header { padding:12px 14px; border-bottom:1px solid rgba(255,255,255,0.07);
      display:flex; align-items:center; gap:10px; }
    .sw-title { font-weight:700; font-size:14px; color:#f0c060; }
    .sw-sub { font-size:11px; color:#7a8199; }
    .sw-close { margin-left:auto; background:none; border:none; color:#7a8199; cursor:pointer; font-size:18px; }
    .sw-users { padding:8px 14px; border-bottom:1px solid rgba(255,255,255,0.05);
      display:flex; gap:6px; flex-wrap:wrap; }
    .sw-pill { background:rgba(240,192,96,0.12); border:1px solid rgba(240,192,96,0.2);
      border-radius:100px; padding:2px 10px; font-size:11px; color:#e8eaf0; }
    .sw-messages { flex:1; overflow-y:auto; padding:10px 14px; display:flex; flex-direction:column; gap:6px; }
    .sw-msg-system { color:#7a8199; font-size:11px; text-align:center; font-style:italic; }
    .sw-msg-own { align-self:flex-end; background:rgba(240,192,96,0.18); padding:6px 10px; border-radius:10px 10px 2px 10px; max-width:85%; }
    .sw-msg-other { align-self:flex-start; background:rgba(255,255,255,0.06); padding:6px 10px; border-radius:10px 10px 10px 2px; max-width:85%; }
    .sw-msg-name { font-size:10px; font-weight:600; color:#f0c060; margin-bottom:2px; }
    .sw-input-row { padding:10px 14px; border-top:1px solid rgba(255,255,255,0.07); display:flex; gap:8px; }
    .sw-input { flex:1; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1);
      border-radius:8px; color:#e8eaf0; font-family:inherit; font-size:13px; padding:8px 12px; outline:none; }
    .sw-input:focus { border-color:rgba(240,192,96,0.4); }
    .sw-send { background:linear-gradient(135deg,#f0c060,#f0a03c); border:none; border-radius:8px;
      color:#06080f; font-weight:700; font-size:13px; padding:8px 14px; cursor:pointer; }
    .sw-tab { position:fixed; top:50%; right:0; transform:translateY(-50%);
      background:rgba(6,8,15,0.95); border:1px solid rgba(240,192,96,0.3); border-right:none;
      border-radius:8px 0 0 8px; padding:10px 6px; cursor:pointer; color:#f0c060;
      font-family:'DM Sans',system-ui,sans-serif; font-size:12px; font-weight:700;
      writing-mode:vertical-lr; display:none; }
    .sw-tab.visible { display:block; }
    .sw-emoji-row { display:flex; justify-content:center; gap:6px; padding:6px 14px; border-top:1px solid rgba(255,255,255,0.05); }
    .sw-emoji-btn { background:none; border:none; font-size:16px; cursor:pointer; transition:0.15s; }
    .sw-emoji-btn:hover { transform:scale(1.25); }
  `
}
