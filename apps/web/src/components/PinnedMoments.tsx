import { useState, useEffect } from 'react'
import { getSocket } from '@/hooks/useSocket'
import { useStore } from '@/store'

interface PinnedMoment {
  id: string
  userId: string
  name: string
  time: number
  note: string
  pinnedAt: number
}

interface PinnedMomentsProps {
  roomId: string
  getCurrentTime: () => number
  onSeek: (time: number) => void
}

function formatTime(secs: number) {
  const h = Math.floor(secs / 3600)
  const m = Math.floor((secs % 3600) / 60)
  const s = Math.floor(secs % 60)
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function PinnedMoments({ roomId, getCurrentTime, onSeek }: PinnedMomentsProps) {
  const [open, setOpen] = useState(false)
  const [pinning, setPinning] = useState(false)
  const [note, setNote] = useState('')
  const [moments, setMoments] = useState<PinnedMoment[]>([])
  const { addMessage } = useStore()

  const socket = getSocket()

  useEffect(() => {
    if (!socket) return

    socket.on('moment_pinned', (pin: PinnedMoment) => {
      setMoments(prev => [...prev, pin])
      addMessage({ id: crypto.randomUUID(), userId: 'system', name: 'System', text: `📌 ${pin.name} pinned a moment${pin.note ? `: "${pin.note}"` : ''} at ${formatTime(pin.time)}`, timestamp: Date.now(), isSystem: true })
    })

    socket.on('pins_list', ({ pins }: { pins: PinnedMoment[] }) => {
      setMoments(pins)
    })

    return () => {
      socket.off('moment_pinned')
      socket.off('pins_list')
    }
  }, [socket])

  useEffect(() => {
    if (open && socket) socket.emit('get_pins', { roomId })
  }, [open, socket, roomId])

  const submitPin = () => {
    const time = getCurrentTime()
    if (!socket) return
    socket.emit('pin_moment', { roomId, time, note: note.trim() })
    setNote('')
    setPinning(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-xs interactive flex items-center gap-1.5 px-2 py-1 rounded-lg"
        style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
        title="Pinned moments"
      >
        📌
        {moments.length > 0 && (
          <span className="w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center" style={{ background: 'var(--gold)', color: 'var(--bg)' }}>{moments.length}</span>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-72 rounded-xl z-50 overflow-hidden anim-scale-in"
          style={{ background: 'var(--surface)', border: '1px solid var(--border-medium)', boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}
        >
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
            <p className="text-xs font-bold" style={{ color: 'var(--gold)' }}>📌 Moments</p>
            <button
              onClick={() => { setPinning(true); setOpen(false) }}
              className="text-xs px-2.5 py-1 rounded-lg interactive"
              style={{ background: 'var(--gold-glow)', color: 'var(--gold)', border: '1px solid var(--gold-border)' }}
            >
              + Pin
            </button>
          </div>

          <div className="max-h-56 overflow-y-auto">
            {moments.length === 0 ? (
              <p className="text-xs text-center py-8" style={{ color: 'var(--faint)' }}>No moments pinned yet</p>
            ) : (
              moments.map(m => (
                <div key={m.id} className="flex items-start gap-3 px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                  <button
                    onClick={() => { onSeek(m.time); setOpen(false) }}
                    className="shrink-0 px-2 py-0.5 rounded text-[10px] font-mono font-bold interactive"
                    style={{ background: 'var(--gold-glow)', color: 'var(--gold)', border: '1px solid var(--gold-border)' }}
                  >
                    {formatTime(m.time)}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs truncate" style={{ color: 'var(--text)' }}>{m.note || <span style={{ color: 'var(--faint)' }}>No note</span>}</p>
                    <p className="text-[10px]" style={{ color: 'var(--faint)' }}>{m.name}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Pin input popup */}
      {pinning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(6,8,15,0.7)' }} onClick={e => { if (e.target === e.currentTarget) setPinning(false) }}>
          <div className="w-80 rounded-2xl p-5 anim-scale-in" style={{ background: 'var(--surface)', border: '1px solid var(--border-medium)', boxShadow: '0 16px 48px rgba(0,0,0,0.5)' }}>
            <p className="font-bold text-sm mb-1" style={{ color: 'var(--gold)' }}>📌 Pin this moment</p>
            <p className="text-xs mb-4" style={{ color: 'var(--muted)' }}>At {formatTime(getCurrentTime())}</p>
            <input
              className="sw-input mb-3 w-full"
              placeholder="Add a note (optional)"
              value={note}
              onChange={e => setNote(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submitPin()}
              style={{ fontSize: 16 }}
              autoFocus
            />
            <div className="flex gap-2">
              <button onClick={() => setPinning(false)} className="flex-1 py-2 rounded-lg text-sm interactive" style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}>Cancel</button>
              <button onClick={submitPin} className="flex-1 py-2 rounded-lg text-sm font-medium" style={{ background: 'var(--gold-glow)', color: 'var(--gold)', border: '1px solid var(--gold-border)' }}>Pin it</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
