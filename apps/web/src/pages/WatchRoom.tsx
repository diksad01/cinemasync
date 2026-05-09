import { useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useStore } from '@/store'
import { useSocket, getSocket } from '@/hooks/useSocket'
import VideoPlayer from '@/components/VideoPlayer'
import ChatSidebar from '@/components/ChatSidebar'
import CountdownOverlay from '@/components/CountdownOverlay'

export default function WatchRoom() {
  const { roomId } = useParams<{ roomId: string }>()
  const navigate = useNavigate()
  const { userName, userColor, videoUrl, setVideoUrl, users, isConnected, isChatOpen, toggleChat, setRoom, setUserName } = useStore()
  const pendingUrl = useRef(localStorage.getItem('sw_pending_url') || '')

  // Ensure user has a name
  useEffect(() => {
    if (!userName) {
      const name = prompt('Enter your name to join:')
      if (name) {
        setUserName(name.trim())
        localStorage.setItem('sw_name', name.trim())
      } else {
        navigate('/')
      }
    }
  }, [userName])

  // Connect socket
  useSocket(roomId || null, userName, userColor)

  // Send pending URL once connected
  useEffect(() => {
    if (isConnected && pendingUrl.current && roomId) {
      const socket = getSocket()
      if (socket) {
        setVideoUrl(pendingUrl.current, isYouTube(pendingUrl.current) ? 'iframe' : 'direct')
        socket.emit('sync_url', { url: pendingUrl.current, videoType: isYouTube(pendingUrl.current) ? 'iframe' : 'direct' })
      }
      localStorage.removeItem('sw_pending_url')
      pendingUrl.current = ''
    }
  }, [isConnected, roomId])

  useEffect(() => { if (roomId) setRoom(roomId) }, [roomId])

  const copyLink = () => {
    const url = `${window.location.origin}/join/${roomId}`
    navigator.clipboard.writeText(url).catch(() => {})
    // Visual feedback handled by button text
  }

  const leave = () => {
    getSocket()?.disconnect()
    setRoom(null)
    navigate('/')
  }

  return (
    <div className="h-screen bg-sw-bg flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-sw-light shrink-0 z-10">
        <div className="flex items-center gap-3">
          <span className="text-sw-gold font-bold text-sm">SomniWatch</span>
          {roomId && <span className="room-code">{roomId}</span>}
          <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-sw-green' : 'bg-sw-red'}`} />
          <span className="text-sw-muted text-xs">{users.length} watching</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={copyLink} className="text-xs text-sw-cyan hover:underline transition">Copy Link</button>
          <button onClick={toggleChat} className="text-xs text-sw-muted hover:text-sw-text transition">
            {isChatOpen ? 'Hide Chat' : 'Show Chat'}
          </button>
          <button onClick={leave} className="text-xs text-sw-red hover:underline transition">Leave</button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video area */}
        <div className={`flex-1 relative ${isChatOpen ? '' : ''}`}>
          <VideoPlayer />
          {users.length < 2 && isConnected && (
            <div className="absolute inset-0 flex items-center justify-center bg-sw-backdrop/80 z-10">
              <div className="text-center">
                <div className="text-4xl mb-4">⏳</div>
                <p className="text-sw-text font-semibold text-lg">Waiting for partner...</p>
                <p className="text-sw-muted text-sm mt-2">Share the room link to invite someone</p>
                <button onClick={copyLink} className="btn-primary mt-4 px-6 py-2 text-sm">
                  Copy Invite Link
                </button>
              </div>
            </div>
          )}
          <CountdownOverlay />
        </div>

        {/* Chat sidebar */}
        {isChatOpen && (
          <div className="w-[340px] shrink-0 border-l border-sw-light hidden md:flex">
            <ChatSidebar />
          </div>
        )}
      </div>

      {/* Mobile chat drawer */}
      {isChatOpen && (
        <div className="md:hidden fixed inset-x-0 bottom-0 h-[50vh] z-20 border-t border-sw-light">
          <ChatSidebar />
        </div>
      )}
    </div>
  )
}

function isYouTube(url: string) {
  return /youtube\.com|youtu\.be/i.test(url)
}
