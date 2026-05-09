import { useState, useEffect } from 'react'
import { getSocket } from '@/hooks/useSocket'

export default function CountdownOverlay() {
  const [count, setCount] = useState<number | null>(null)
  const [key, setKey] = useState(0)

  useEffect(() => {
    const socket = getSocket()
    if (!socket) return

    const handle = () => {
      setCount(3)
      setKey(k => k + 1)
    }

    socket.on('countdown_start', handle)
    return () => { socket.off('countdown_start', handle) }
  }, [])

  useEffect(() => {
    if (count === null) return
    if (count <= 0) {
      setTimeout(() => setCount(null), 600)
      return
    }
    const t = setTimeout(() => { setCount(count - 1); setKey(k => k + 1) }, 1000)
    return () => clearTimeout(t)
  }, [count])

  if (count === null) return null

  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none anim-fade-in"
      style={{ background: 'rgba(6,8,15,0.85)' }}
    >
      {/* Radiating gold rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map(i => (
          <div
            key={`${key}-ring-${i}`}
            className="absolute rounded-full"
            style={{
              width: 120,
              height: 120,
              border: '2px solid rgba(240,192,96,0.3)',
              animation: `ripple 1s ease-out ${i * 0.15}s both`,
            }}
          />
        ))}
      </div>

      {/* Number */}
      <div
        key={`${key}-num`}
        className="font-bold relative z-10"
        style={{
          fontSize: '20vw',
          color: 'var(--gold)',
          animation: 'countdownPop 0.8s cubic-bezier(0.16,1,0.3,1) both',
          textShadow: '0 0 60px rgba(240,192,96,0.4), 0 0 120px rgba(240,192,96,0.2)',
        }}
      >
        {count === 0 ? 'GO!' : count}
      </div>
    </div>
  )
}
