import { useState, useEffect } from 'react'
import { getSocket } from '@/hooks/useSocket'

export default function TypingIndicator() {
  const [typer, setTyper] = useState<string | null>(null)

  useEffect(() => {
    const socket = getSocket()
    if (!socket) return

    let timeout: ReturnType<typeof setTimeout>
    const onTyping = ({ userName, isTyping }: { userName: string; isTyping: boolean }) => {
      clearTimeout(timeout)
      if (isTyping) {
        setTyper(userName)
        timeout = setTimeout(() => setTyper(null), 3000)
      } else {
        setTyper(null)
      }
    }

    socket.on('typing', onTyping)
    return () => {
      socket.off('typing', onTyping)
      clearTimeout(timeout)
    }
  }, [])

  if (!typer) return null

  return (
    <div className="flex items-center gap-2 px-4 py-1.5 anim-fade-up">
      <span className="text-xs" style={{ color: 'var(--muted)' }}>{typer}</span>
      <span className="flex gap-0.5">
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="w-1 h-1 rounded-full"
            style={{
              background: 'var(--gold)',
              animation: `typingDot 0.8s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </span>
    </div>
  )
}
