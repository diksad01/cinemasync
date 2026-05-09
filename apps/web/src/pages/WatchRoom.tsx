import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useStore } from '@/store'
import { useSocket, getSocket } from '@/hooks/useSocket'
import { useFileShare } from '@/hooks/useFileShare'
import { usePlan } from '@/hooks/usePlan'
import { useUsername } from '@/hooks/useUsername'
import { useSessionTimer } from '@/hooks/useSessionTimer'
import VideoPlayer from '@/components/VideoPlayer'
import ChatSidebar from '@/components/ChatSidebar'
import CountdownOverlay from '@/components/CountdownOverlay'
import FileShareButton from '@/components/FileShareButton'
import IncomingFileModal from '@/components/IncomingFileModal'
import SyncToast from '@/components/SyncToast'
import EmojiReaction from '@/components/EmojiReaction'
import WaitingOverlay from '@/components/WaitingOverlay'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import VideoQueue from '@/components/VideoQueue'
import FaceCamBar from '@/components/FaceCamBar'
import MovieBrowser from '@/components/MovieBrowser'
import PinnedMoments from '@/components/PinnedMoments'
import { KnockNotification } from '@/components/KnockOverlay'
import { UpgradeWarningBanner, SessionEndedOverlay } from '@/components/UpgradeBanner'

export default function WatchRoom() {
  const { roomId } = useParams<{ roomId: string }>()
  const navigate = useNavigate()
  const { userName, userColor, videoUrl, setVideoUrl, users, isConnected, isChatOpen, toggleChat, setRoom, setUserName, addMessage, hostId } = useStore()
  const pendingUrl = useRef(localStorage.getItem('sw_pending_url') || '')
  const [receivingProgress, setReceivingProgress] = useState(0)
  const [copied, setCopied] = useState(false)
  const [showBrowser, setShowBrowser] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const drawerTouchStart = useRef(0)
  const plan = usePlan()
  const { name: storedName, saveName } = useUsername()
  const isPaid = plan.tier !== 'free'
  const { showWarning, sessionEnded, dismissWarning } = useSessionTimer(isPaid)

  // Ensure user has a name — use stored username first
  useEffect(() => {
    if (!userName) {
      const saved = storedName || localStorage.getItem('sw_name') || ''
      if (saved) {
        setUserName(saved)
      } else {
        const name = prompt('Enter your name to join:')
        if (name) {
          saveName(name.trim())
          setUserName(name.trim())
        } else {
          navigate('/')
        }
      }
    }
  }, [userName])

  // Connect socket
  useSocket(roomId || null, userName, userColor, plan.maxViewers)

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
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isHost = hostId === getSocket()?.id

  const leave = () => {
    getSocket()?.disconnect()
    setRoom(null)
    navigate('/')
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Top bar */}
      <header
        className="flex items-center justify-between px-3 py-2 shrink-0 z-10 glass anim-fade-up"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-sw-gold font-bold text-sm hidden sm:inline">SomniWatch</span>
          {roomId && <span className="room-code">{roomId}</span>}
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{
              background: isConnected ? 'var(--green)' : 'var(--red)',
              boxShadow: isConnected ? '0 0 6px rgba(74,222,128,0.4)' : 'none',
            }}
          />
          <span className="text-xs hidden sm:inline" style={{ color: 'var(--muted)' }}>{users.length} watching</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={copyLink}
            className="text-xs interactive px-2.5 py-1.5 rounded-lg font-medium transition-all"
            style={copied ? { color: 'var(--green)', border: '1px solid rgba(74,222,128,0.3)', background: 'rgba(74,222,128,0.08)' } : { color: 'var(--cyan)', border: '1px solid var(--border)' }}
          >
            {copied ? 'Copied ✓' : '🔗 Invite'}
          </button>
          <button
            onClick={() => setShowBrowser(true)}
            className="text-xs interactive px-2.5 py-1.5 rounded-lg"
            style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
          >
            🎬
          </button>
          <PinnedMoments
            roomId={roomId || ''}
            getCurrentTime={() => (document.querySelector('video') as HTMLVideoElement)?.currentTime ?? 0}
            onSeek={(t) => { const v = document.querySelector('video') as HTMLVideoElement; if (v) v.currentTime = t }}
          />
          <VideoQueue />
          <ThemeSwitcher userPlan={plan.tier} />
          <button
            onClick={() => { toggleChat(); setDrawerOpen(o => !o) }}
            className="text-xs interactive px-2.5 py-1.5 rounded-lg md:hidden"
            style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
          >
            💬
          </button>
          <button onClick={toggleChat} className="text-xs interactive hidden md:block" style={{ color: 'var(--muted)' }}>
            {isChatOpen ? 'Hide Chat' : 'Chat'}
          </button>
          <button onClick={leave} className="text-xs interactive px-2.5 py-1.5 rounded-lg" style={{ color: 'var(--red)', border: '1px solid rgba(255,96,96,0.2)' }}>Leave</button>
        </div>
      </header>

      {/* Knock notifications for host */}
      <KnockNotification roomId={roomId || ''} isHost={isHost} />

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

          {/* Face cam + file share — bottom bar */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end gap-2">
            <FaceCamBar
              roomId={roomId || ''}
              userName={userName}
              canFaceCam={plan.canFaceCam}
            />
            <div className="ml-auto">
              <FileShareButton
                onFileSelected={(file) => offerFile(file)}
                isTransferring={isTransferring}
                progress={sendProgress}
              />
            </div>
          </div>
        </div>

        {/* Desktop chat sidebar */}
        {isChatOpen && (
          <div className="w-[340px] shrink-0 hidden md:flex">
            <ChatSidebar />
          </div>
        )}
      </div>

      {/* Mobile chat drawer — swipe-enabled */}
      <div
        className="md:hidden fixed inset-x-0 bottom-0 z-30 flex flex-col"
        style={{
          background: 'rgba(14,17,23,0.96)',
          backdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(240,192,96,0.15)',
          borderRadius: '20px 20px 0 0',
          maxHeight: '80vh',
          transform: drawerOpen ? 'translateY(0)' : 'translateY(calc(100% - 52px))',
          transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
        onTouchStart={e => { drawerTouchStart.current = e.touches[0].clientY }}
        onTouchEnd={e => {
          const delta = e.changedTouches[0].clientY - drawerTouchStart.current
          if (delta > 60) setDrawerOpen(false)
          else if (delta < -30) setDrawerOpen(true)
        }}
      >
        {/* Drawer handle */}
        <div className="flex justify-center py-3 shrink-0 cursor-pointer" onClick={() => setDrawerOpen(o => !o)}>
          <div className="w-10 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
        </div>
        <div className="flex-1 overflow-hidden">
          <ChatSidebar />
        </div>
      </div>

      {/* Movie browser modal */}
      {showBrowser && <MovieBrowser onClose={() => setShowBrowser(false)} />}

      {/* Session warning banner */}
      {showWarning && !sessionEnded && <UpgradeWarningBanner onDismiss={dismissWarning} />}

      {/* Session ended overlay */}
      {sessionEnded && <SessionEndedOverlay />}
    </div>
  )
}

function isYouTube(url: string) {
  return /youtube\.com|youtu\.be/i.test(url)
}
