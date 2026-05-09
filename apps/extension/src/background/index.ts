import { io, Socket } from 'socket.io-client'

const SERVER_URL = 'https://web-production-0cbba.up.railway.app'

let socket: Socket | null = null
let currentRoom: string | null = null
let currentUser: string | null = null

// Clear stale sessions on install/update
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.clear()
})

function connectSocket(roomCode: string, userName: string, userColor: string) {
  if (socket) { try { socket.disconnect() } catch {} }

  socket = io(SERVER_URL, { transports: ['websocket'], reconnectionDelay: 2000 })
  currentRoom = roomCode
  currentUser = userName

  socket.on('connect', () => {
    socket!.emit('join', { roomCode, userName, userColor })
    broadcastToContentScripts({ type: 'STATE', roomId: currentRoom, users: [] })
  })

  socket.on('disconnect', () => {
    broadcastToContentScripts({ type: 'STATE', roomId: null, users: [] })
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
    connectSocket(roomId, userName, userColor)
    sendResponse({ roomId })
    return true
  }

  if (msg.type === 'GET_STATE') {
    sendResponse({ roomId: currentRoom, connected: !!socket?.connected, users: [] })
    return true
  }

  if (msg.type === 'GET_SESSION') {
    chrome.storage.local.get(['roomCode', 'userName', 'userColor'], (data) => {
      sendResponse(data || {})
    })
    return true
  }

  if (msg.type === 'SEND_CHAT' && socket) {
    socket.emit('chat_msg', { message: msg.text, userName: msg.name || currentUser })
  }

  if (msg.type === 'SYNC_PLAY' && socket) socket.emit('sync_play', { currentTime: msg.time })
  if (msg.type === 'SYNC_PAUSE' && socket) socket.emit('sync_pause', { currentTime: msg.time })
  if (msg.type === 'SYNC_SEEK' && socket) socket.emit('sync_seek', { currentTime: msg.time })
  if (msg.type === 'SYNC_URL' && socket) socket.emit('sync_url', { url: msg.url, videoType: msg.videoType || 'iframe' })
  if (msg.type === 'SEND_REACTION' && socket) socket.emit('reaction', { emoji: msg.emoji })

  if (msg.type === 'DISCONNECT') {
    if (socket) { socket.disconnect(); socket = null }
    currentRoom = null
    chrome.storage.local.remove(['roomCode', 'userName', 'userColor'])
    broadcastToContentScripts({ type: 'STATE', roomId: null, users: [] })
  }

  return false
})

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}
