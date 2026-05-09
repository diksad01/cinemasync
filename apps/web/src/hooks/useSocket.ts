import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { useStore } from '@/store'

let globalSocket: Socket | null = null

export function getSocket() {
  return globalSocket
}

export function useSocket(roomId: string | null, userName: string, userColor: string, maxViewers?: number) {
  const socketRef = useRef<Socket | null>(null)
  const {
    setConnected, setUsers, setHostId, setVideoUrl,
    addMessage, setRoom, setIsSyncing,
  } = useStore()

  useEffect(() => {
    if (!roomId || !userName) return

    const serverUrl = import.meta.env.PROD ? window.location.origin : 'http://localhost:3001'
    const socket = io(serverUrl, { transports: ['websocket'], reconnectionDelay: 2000, timeout: 8000 })
    socketRef.current = socket
    globalSocket = socket

    socket.on('connect', () => {
      setConnected(true)
      socket.emit('join', { roomCode: roomId, userName, userColor, maxViewers: maxViewers || 2 })
    })

    socket.on('disconnect', () => setConnected(false))

    socket.on('room_state', ({ videoUrl, videoType, currentTime, isPlaying, users }) => {
      setUsers(users || [])
      if (videoUrl) setVideoUrl(videoUrl, videoType)
    })

    socket.on('room_users', (users) => setUsers(users || []))
    socket.on('host_info', ({ hostSocketId }) => setHostId(hostSocketId))

    socket.on('user_joined', ({ name }) => {
      addMessage({ id: crypto.randomUUID(), userId: 'system', name: 'System', text: `${name} joined`, timestamp: Date.now(), isSystem: true })
    })

    socket.on('user_left', ({ name }) => {
      addMessage({ id: crypto.randomUUID(), userId: 'system', name: 'System', text: `${name} left`, timestamp: Date.now(), isSystem: true })
    })

    socket.on('chat_msg', ({ message, userName: name, color, timestamp, id }) => {
      addMessage({ id: crypto.randomUUID(), userId: id, name, text: message, color, timestamp })
    })

    socket.on('sync_url', ({ url, videoType: vt }) => {
      setVideoUrl(url, vt)
      addMessage({ id: crypto.randomUUID(), userId: 'system', name: 'System', text: 'Video changed', timestamp: Date.now(), isSystem: true })
    })

    socket.on('kicked', () => {
      addMessage({ id: crypto.randomUUID(), userId: 'system', name: 'System', text: 'You were removed from the room', timestamp: Date.now(), isSystem: true })
      socket.disconnect()
      setRoom(null)
    })

    socket.on('room_full', ({ maxViewers: limit }) => {
      addMessage({ id: crypto.randomUUID(), userId: 'system', name: 'System', text: `Room is full (${limit} viewer limit). Upgrade your plan for more viewers.`, timestamp: Date.now(), isSystem: true })
      socket.disconnect()
      setConnected(false)
    })

    socket.on('reaction', ({ emoji, from }) => {
      addMessage({ id: crypto.randomUUID(), userId: 'system', name: from, text: emoji, timestamp: Date.now(), isReaction: true })
    })

    socket.on('countdown_start', ({ from }) => {
      addMessage({ id: crypto.randomUUID(), userId: 'system', name: 'System', text: `${from} started a countdown`, timestamp: Date.now(), isSystem: true })
    })

    return () => {
      socket.disconnect()
      socketRef.current = null
      globalSocket = null
      setConnected(false)
    }
  }, [roomId, userName])

  return socketRef
}
