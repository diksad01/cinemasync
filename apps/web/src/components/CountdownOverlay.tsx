import { useState, useEffect } from 'react'
import { getSocket } from '@/hooks/useSocket'

export default function CountdownOverlay() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const socket = getSocket()
    if (!socket) return

    const handle = () => {
      setCount(3)
    }

    socket.on('countdown_start', handle)
    return () => { socket.off('countdown_start', handle) }
  }, [])

  useEffect(() => {
    if (count === null) return
    if (count <= 0) {
      setCount(null)
      return
    }
    const t = setTimeout(() => setCount(count - 1), 1000)
    return () => clearTimeout(t)
  }, [count])

  if (count === null) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-20 pointer-events-none">
      <div className="text-sw-gold font-bold text-8xl animate-pulse">
        {count === 0 ? '▶' : count}
      </div>
    </div>
  )
}
