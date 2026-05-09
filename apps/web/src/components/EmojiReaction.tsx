import { useState, useEffect, useCallback } from 'react'
import { getSocket } from '@/hooks/useSocket'

interface FloatingEmoji {
  id: string
  emoji: string
  x: number
  delay: number
}

export default function EmojiReaction() {
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([])

  const spawnEmoji = useCallback((emoji: string) => {
    const id = crypto.randomUUID()
    const x = 30 + Math.random() * 40
    const delay = Math.random() * 0.2
    setEmojis(prev => [...prev, { id, emoji, x, delay }])
    setTimeout(() => setEmojis(prev => prev.filter(e => e.id !== id)), 1800)
  }, [])

  useEffect(() => {
    const socket = getSocket()
    if (!socket) return

    const onReaction = ({ emoji }: { emoji: string }) => spawnEmoji(emoji)
    socket.on('reaction', onReaction)
    return () => { socket.off('reaction', onReaction) }
  }, [spawnEmoji])

  if (!emojis.length) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {emojis.map(e => (
        <span
          key={e.id}
          className="absolute text-3xl"
          style={{
            left: `${e.x}%`,
            bottom: '10%',
            animation: `floatUp 1.5s ease-out ${e.delay}s both`,
            filter: 'drop-shadow(0 0 6px rgba(240,192,96,0.3))',
          }}
        >
          {e.emoji}
        </span>
      ))}
    </div>
  )
}
