import { io, Socket } from 'socket.io-client'
import { CONFIG } from '../lib/config'

let socket: Socket | null = null
let currentRoom: string | null = null
let currentUser: string | null = null
let currentColor: string = '#f0c060'

// Clear stale sessions on install/update
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.clear()
})

function getSocket(): Socket {
  if (socket && socket.connected) return socket

  // Destroy stale socket before creating new one
  if (socket) {
    socket.removeAllListeners()
    socket.disconnect()
    socket = null
  }

  socket = io(CONFIG.SERVER_URL, {
    transports: ['websocket', 'polling'],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 10000,
  })

  socket.on('connect', () => {
    console.log('[SomniWatch BG] Socket connected:', socket?.id)
    broadcastStatus(true)
    // Rejoin room after reconnect
    if (currentRoom && currentUser) {
      console.log('[SomniWatch BG] Rejoining room after reconnect:', currentRoom)
      socket!.emit('join', { roomCode: currentRoom, userName: currentUser, userColor: currentColor })
    }
    broadcastToContentScripts({ type: 'STATE', roomId: currentRoom, users: [] })
  })

  socket.on('disconnect', (reason) => {
    console.log('[SomniWatch BG] Disconnected:', reason)
    broadcastStatus(false)
    broadcastToContentScripts({ type: 'STATE', roomId: null, users: [] })
  })

  socket.on('connect_error', (err) => {
    console.error('[SomniWatch BG] Connection error:', err.message)
    broadcastStatus(false)
  })

  // Relay events to content scripts
  socket.on('sync_play', (data) => broadcastToContentScripts({ type: 'SYNC_PLAY', time: data.currentTime }))
  socket.on('sync_pause', (data) => broadcastToContentScripts({ type: 'SYNC_PAUSE', time: data.currentTime }))
  socket.on('sync_seek', (data) => broadcastToContentScripts({ type: 'SYNC_SEEK', time: data.currentTime }))
  socket.on('chat_msg', (data) => broadcastToContentScripts({ type: 'CHAT_MSG', name: data.userName, text: data.message }))
  socket.on('user_joined', (data) => broadcastToContentScripts({ type: 'USER_JOINED', user: { id: data.id, name: data.name } }))
  socket.on('user_left', (data) => broadcastToContentScripts({ type: 'USER_LEFT', name: data.name }))
  socket.on('room_users', (users) => broadcastToContentScripts({ type: 'ROOM_USERS', users }))
  socket.on('room_state', (data) => {
    broadcastToContentScripts({ type: 'ROOM_USERS', users: data.users || [] })
    if (data.currentTime) {
      if (data.isPlaying) broadcastToContentScripts({ type: 'SYNC_PLAY', time: data.currentTime })
      else broadcastToContentScripts({ type: 'SYNC_SEEK', time: data.currentTime })
    }
  })

  // When a new user joins and server asks for current state, re-broadcast URL
  socket.on('request_state_sync', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id && tabs[0]?.url && !tabs[0].url.startsWith('chrome')) {
        const cleanUrl = tabs[0].url.replace(/[?&]sw_room=[^&]+/, '')
        socket!.emit('sync_url', { url: cleanUrl, videoType: 'iframe' })
      }
    })
  })

  return socket
}

function broadcastStatus(connected: boolean) {
  chrome.runtime.sendMessage({ type: 'CONNECTION_STATUS', connected }).catch(() => {})
}

function connectAndJoin(roomCode: string, userName: string, userColor: string) {
  currentRoom = roomCode
  currentUser = userName
  currentColor = userColor
  const sock = getSocket()
  if (sock.connected) {
    sock.emit('join', { roomCode, userName, userColor })
  }
  // If not connected yet, the 'connect' handler above will auto-rejoin
}

function broadcastToContentScripts(message: any) {
  chrome.tabs.query({}, (tabs) => {
    (tabs || []).forEach(tab => {
      if (!tab.id || !tab.url || tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://')) return
      chrome.tabs.sendMessage(tab.id, message, () => { void chrome.runtime.lastError })
    })
  })
}

// Listen for messages from popup and content scripts
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === 'CREATE_ROOM' || msg.type === 'JOIN_ROOM') {
    const roomId = msg.roomId || msg.roomCode || generateRoomCode()
    const userName = msg.userName || 'Guest'
    const userColor = msg.userColor || '#f0c060'
    chrome.storage.local.set({ roomCode: roomId, userName, userColor })
    connectAndJoin(roomId, userName, userColor)
    sendResponse({ roomId })
    return true
  }

  if (msg.type === 'GET_STATE') {
    const sock = socket
    sendResponse({ roomId: currentRoom, isConnected: !!sock?.connected, users: [] })
    return true
  }

  if (msg.type === 'GET_SESSION') {
    chrome.storage.local.get(['roomCode', 'userName', 'userColor'], (data) => {
      sendResponse(data || {})
    })
    return true
  }

  if (msg.type === 'SEND_CHAT' && socket?.connected) {
    socket.emit('chat_msg', { message: msg.text, userName: msg.name || currentUser })
  }

  if (msg.type === 'SYNC_PLAY' && socket?.connected) socket.emit('sync_play', { currentTime: msg.time })
  if (msg.type === 'SYNC_PAUSE' && socket?.connected) socket.emit('sync_pause', { currentTime: msg.time })
  if (msg.type === 'SYNC_SEEK' && socket?.connected) socket.emit('sync_seek', { currentTime: msg.time })
  if (msg.type === 'SYNC_URL' && socket?.connected) socket.emit('sync_url', { url: msg.url, videoType: msg.videoType || 'iframe' })
  if (msg.type === 'SEND_REACTION' && socket?.connected) socket.emit('reaction', { emoji: msg.emoji })

  if (msg.type === 'DISCONNECT') {
    if (socket) { socket.removeAllListeners(); socket.disconnect(); socket = null }
    currentRoom = null
    currentUser = null
    chrome.storage.local.remove(['roomCode', 'userName', 'userColor'])
    broadcastToContentScripts({ type: 'STATE', roomId: null, users: [] })
    broadcastStatus(false)
  }

  return false
})

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}
