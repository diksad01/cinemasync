import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useStore } from '@/store'
import { useSocket, getSocket } from '@/hooks/useSocket'
import { useFileShare } from '@/hooks/useFileShare'
import VideoPlayer from '@/components/VideoPlayer'
import ChatSidebar from '@/components/ChatSidebar'
import CountdownOverlay from '@/components/CountdownOverlay'
import FileShareButton from '@/components/FileShareButton'
import IncomingFileModal from '@/components/IncomingFileModal'
import SyncToast from '@/components/SyncToast'
import EmojiReaction from '@/components/EmojiReaction'
import WaitingOverlay from '@/components/WaitingOverlay'

export default function WatchRoom() {
  const { roomId } = useParams<{ roomId: string }>()
  const navigate = useNavigate()
  const { userName, userColor, videoUrl, setVideoUrl, users, isConnected, isChatOpen, toggleChat, setRoom, setUserName, addMessage } = useStore()
  const pendingUrl = useRef(localStorage.getItem('sw_pending_url') || '')
  const [receivingProgress, setReceivingProgress] = useState(0)

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

  // P2P file sharing
  const socket = getSocket()
  const {
    offerFile,
    acceptFile,
    rejectFile,
    isTransferring,
    sendProgress,
    incomingFile,
    handleFileOffer,
    handleFileAccepted,
    handleWebRTCOffer,
    handleWebRTCAnswer,
    handleWebRTCIce,
  } = useFileShare({
    socket,
    roomId: roomId || '',
    onFileReady: (url, fileName) => {
      setVideoUrl(url, 'direct')
      addMessage({ id: crypto.randomUUID(), userId: 'system', name: 'System', text: `🎬 ${fileName} is ready — enjoy!`, timestamp: Date.now(), isSystem: true })
    },
    onProgress: setReceivingProgress,
  })

  // Wire file sharing socket events
  useEffect(() => {
    if (!socket) return
    socket.on('file_offer', handleFileOffer)
    socket.on('file_accepted', handleFileAccepted)
    socket.on('webrtc_offer', handleWebRTCOffer)
    socket.on('webrtc_answer', handleWebRTCAnswer)
    socket.on('webrtc_ice', handleWebRTCIce)
    socket.on('file_transfer_progress', ({ progress }: { progress: number }) => setReceivingProgress(progress))

    return () => {
      socket.off('file_offer', handleFileOffer)
      socket.off('file_accepted', handleFileAccepted)
      socket.off('webrtc_offer', handleWebRTCOffer)
      socket.off('webrtc_answer', handleWebRTCAnswer)
      socket.off('webrtc_ice', handleWebRTCIce)
      socket.off('file_transfer_progress')
    }
  }, [socket, handleFileOffer, handleFileAccepted, handleWebRTCOffer, handleWebRTCAnswer, handleWebRTCIce])

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
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Top bar */}
      <header
        className="flex items-center justify-between px-4 py-2 shrink-0 z-10 glass anim-fade-up"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-3">
          <span className="text-sw-gold font-bold text-sm">SomniWatch</span>
          {roomId && <span className="room-code">{roomId}</span>}
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: isConnected ? 'var(--green)' : 'var(--red)',
              boxShadow: isConnected ? '0 0 6px rgba(74,222,128,0.4)' : 'none',
            }}
          />
          <span className="text-xs" style={{ color: 'var(--muted)' }}>{users.length} watching</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={copyLink} className="text-xs interactive" style={{ color: 'var(--cyan)' }}>Copy Link</button>
          <button onClick={toggleChat} className="text-xs interactive hover:text-sw-text" style={{ color: 'var(--muted)' }}>
            {isChatOpen ? 'Hide Chat' : 'Show Chat'}
          </button>
          <button onClick={leave} className="text-xs interactive" style={{ color: 'var(--red)' }}>Leave</button>
        </div>
      </header>

      {/* Incoming file modal */}
      {incomingFile && (
        <IncomingFileModal
          fileName={incomingFile.fileName}
          fileSize={incomingFile.fileSize}
          fromName={users.find(u => u.id === incomingFile.fromId)?.name ?? 'Partner'}
          progress={receivingProgress}
          isReceiving={receivingProgress > 0}
          onAccept={() => acceptFile(incomingFile.fromId)}
          onReject={() => rejectFile(incomingFile.fromId)}
        />
      )}

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video area */}
        <div className="flex-1 relative">
          <VideoPlayer />
          {users.length < 2 && isConnected && !videoUrl && (
            <WaitingOverlay onCopyLink={copyLink} />
          )}
          <CountdownOverlay />
          <SyncToast />
          <EmojiReaction />

          {/* File share button — bottom left of video area */}
          <div className="absolute bottom-4 left-4 z-10">
            <FileShareButton
              onFileSelected={(file) => offerFile(file)}
              isTransferring={isTransferring}
              progress={sendProgress}
            />
          </div>
        </div>

        {/* Chat sidebar */}
        {isChatOpen && (
          <div className="w-[340px] shrink-0 hidden md:flex">
            <ChatSidebar />
          </div>
        )}
      </div>

      {/* Mobile chat drawer */}
      {isChatOpen && (
        <div className="md:hidden fixed inset-x-0 bottom-0 h-[50vh] z-20 glass-strong anim-slide-up" style={{ borderTop: '1px solid var(--border)' }}>
          {/* Drawer handle */}
          <div className="flex justify-center py-2">
            <div className="w-10 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
          </div>
          <ChatSidebar />
        </div>
      )}
    </div>
  )
}

function isYouTube(url: string) {
  return /youtube\.com|youtu\.be/i.test(url)
}
