import { useState, useEffect } from 'react'
import { getSocket } from '@/hooks/useSocket'

interface KnockRequest {
  fromId: string
  fromName: string
}

interface KnockOverlayProps {
  roomId: string
  isHost: boolean
}

export function KnockNotification({ roomId, isHost }: KnockOverlayProps) {
  const [requests, setRequests] = useState<KnockRequest[]>([])
  const socket = getSocket()

  useEffect(() => {
    if (!socket || !isHost) return

    const handler = (req: KnockRequest) => {
      setRequests(prev => [...prev, req])
      // Auto-remove after 60s
      setTimeout(() => setRequests(prev => prev.filter(r => r.fromId !== req.fromId)), 60000)
    }

    socket.on('knock_request', handler)
    return () => { socket.off('knock_request', handler) }
  }, [socket, isHost])

  const respond = (toId: string, accepted: boolean) => {
    const socket = getSocket()
    if (socket) socket.emit('knock_respond', { toId, accepted })
    setRequests(prev => prev.filter(r => r.fromId !== toId))
  }

  if (!isHost || requests.length === 0) return null

  return (
    <div className="fixed top-16 right-4 z-50 space-y-2">
      {requests.map(req => (
        <div
          key={req.fromId}
          className="w-72 rounded-2xl p-4 anim-scale-in"
          style={{ background: 'var(--surface)', border: '1px solid var(--gold-border)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0" style={{ background: 'var(--gold-glow)', color: 'var(--gold)', border: '1px solid var(--gold-border)' }}>
              {req.fromName[0]?.toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text)' }}><span style={{ color: 'var(--gold)' }}>{req.fromName}</span> wants to join</p>
              <p className="text-[10px]" style={{ color: 'var(--faint)' }}>Knock request</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => respond(req.fromId, false)}
              className="flex-1 py-2 rounded-lg text-xs interactive"
              style={{ color: 'var(--red)', border: '1px solid rgba(255,96,96,0.3)' }}
            >
              Decline
            </button>
            <button
              onClick={() => respond(req.fromId, true)}
              className="flex-1 py-2 rounded-lg text-xs font-medium"
              style={{ background: 'var(--gold-glow)', color: 'var(--gold)', border: '1px solid var(--gold-border)' }}
            >
              Let In ✓
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

interface WaitingScreenProps {
  roomId: string
  userName: string
  onAccepted: () => void
  onDeclined: () => void
}

export function KnockWaitingScreen({ roomId, userName, onAccepted, onDeclined }: WaitingScreenProps) {
  const [status, setStatus] = useState<'waiting' | 'declined' | 'expired'>('waiting')
  const socket = getSocket()

  useEffect(() => {
    if (!socket) return

    socket.emit('knock', { roomId, userName })

    socket.on('knock_accepted', () => onAccepted())
    socket.on('knock_declined', () => setStatus('declined'))
    socket.on('knock_expired', () => setStatus('expired'))

    return () => {
      socket.off('knock_accepted')
      socket.off('knock_declined')
      socket.off('knock_expired')
    }
  }, [socket])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="text-center max-w-sm px-6">
        {status === 'waiting' ? (
          <>
            {/* Pulsing gold ring */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full animate-ping" style={{ background: 'var(--gold-glow)', border: '2px solid var(--gold-border)' }} />
              <div className="absolute inset-2 rounded-full flex items-center justify-center" style={{ background: 'var(--surface)', border: '2px solid var(--gold-border)' }}>
                <span className="text-2xl">🚪</span>
              </div>
            </div>
            <p className="font-bold text-lg mb-2" style={{ color: 'var(--text)' }}>Knocking to join…</p>
            <p className="text-sm mb-1" style={{ color: 'var(--muted)' }}>Room <span className="room-code">{roomId}</span></p>
            <p className="text-xs" style={{ color: 'var(--faint)' }}>Waiting for the host to let you in</p>
          </>
        ) : status === 'declined' ? (
          <>
            <p className="text-3xl mb-4">🚫</p>
            <p className="font-bold text-lg mb-2" style={{ color: 'var(--text)' }}>Request declined</p>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>The host declined your request to join</p>
            <a href="/" className="btn-primary px-6 py-2.5 text-sm">Go Home</a>
          </>
        ) : (
          <>
            <p className="text-3xl mb-4">⏱</p>
            <p className="font-bold text-lg mb-2" style={{ color: 'var(--text)' }}>Request expired</p>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>No response from the host</p>
            <a href="/" className="btn-primary px-6 py-2.5 text-sm">Go Home</a>
          </>
        )}
      </div>
    </div>
  )
}
