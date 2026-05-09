import { useState, useEffect, useCallback } from 'react'
import { getSocket } from '@/hooks/useSocket'

interface Toast {
  id: string
  text: string
}

export default function SyncToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((text: string) => {
    const id = crypto.randomUUID()
    setToasts(prev => [...prev.slice(-2), { id, text }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }, [])

  useEffect(() => {
    const socket = getSocket()
    if (!socket) return

    const onPlay = ({ from }: { from: string }) => { if (from !== socket.id) addToast('▶ Partner played') }
    const onPause = ({ from }: { from: string }) => { if (from !== socket.id) addToast('⏸ Partner paused') }
    const onSeek = ({ from }: { from: string }) => { if (from !== socket.id) addToast('⏩ Partner seeked') }
    const onUrl = ({ from }: { from: string }) => { if (from !== socket.id) addToast('🎬 Video changed') }

    socket.on('sync_play', onPlay)
    socket.on('sync_pause', onPause)
    socket.on('sync_seek', onSeek)
    socket.on('sync_url', onUrl)

    return () => {
      socket.off('sync_play', onPlay)
      socket.off('sync_pause', onPause)
      socket.off('sync_seek', onSeek)
      socket.off('sync_url', onUrl)
    }
  }, [addToast])

  if (!toasts.length) return null

  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className="glass rounded-xl px-4 py-2 text-xs text-sw-text anim-slide-up whitespace-nowrap"
          style={{ borderLeft: '3px solid var(--gold)', minWidth: 160, textAlign: 'center' }}
        >
          {t.text}
        </div>
      ))}
    </div>
  )
}
