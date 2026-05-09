import { useState } from 'react'
import { useStore } from '@/store'
import { getSocket } from '@/hooks/useSocket'

export default function VideoQueue() {
  const { queue, addToQueue, removeFromQueue, playNext } = useStore()
  const [urlInput, setUrlInput] = useState('')
  const [open, setOpen] = useState(false)

  const addUrl = () => {
    const url = urlInput.trim()
    if (!url) return
    const type = /youtube\.com|youtu\.be/i.test(url) ? 'iframe' : 'direct'
    const title = url.length > 50 ? url.slice(0, 47) + '...' : url
    addToQueue({ url, title, type })
    // Sync queue to room
    const socket = getSocket()
    if (socket) socket.emit('queue_add', { url, title, type })
    setUrlInput('')
  }

  const playNextVideo = () => {
    const next = playNext()
    if (!next) return
    const socket = getSocket()
    if (socket) {
      socket.emit('sync_url', { url: next.url, videoType: next.type })
      socket.emit('queue_sync', { queue: useStore.getState().queue })
    }
  }

  const removeItem = (index: number) => {
    removeFromQueue(index)
    const socket = getSocket()
    if (socket) socket.emit('queue_sync', { queue: useStore.getState().queue })
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-xs interactive flex items-center gap-1.5 px-2 py-1 rounded-lg"
        style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
      >
        <span>📋</span>
        <span className="hidden sm:inline">Queue</span>
        {queue.length > 0 && (
          <span
            className="w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
            style={{ background: 'var(--gold)', color: 'var(--bg)' }}
          >
            {queue.length}
          </span>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-72 rounded-xl p-3 z-50 anim-scale-in"
          style={{ background: 'var(--surface)', border: '1px solid var(--border-medium)', boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}
        >
          <p className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: 'var(--muted)' }}>
            Video Queue
          </p>

          {/* Add URL */}
          <div className="flex gap-1.5 mb-3">
            <input
              className="sw-input flex-1 text-xs !py-2 !px-3"
              placeholder="Add video URL..."
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addUrl()}
            />
            <button
              onClick={addUrl}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold shrink-0"
              style={{ background: 'var(--gold-glow)', color: 'var(--gold)', border: '1px solid var(--gold-border)' }}
            >+</button>
          </div>

          {/* Queue list */}
          {queue.length === 0 ? (
            <p className="text-xs text-center py-4" style={{ color: 'var(--faint)' }}>
              Queue is empty — add a video URL above
            </p>
          ) : (
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {queue.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs group"
                  style={{ background: 'var(--surface-hover)', border: '1px solid var(--border)' }}
                >
                  <span style={{ color: 'var(--faint)' }}>{i + 1}.</span>
                  <span className="flex-1 truncate" style={{ color: 'var(--text)' }}>{item.title}</span>
                  <button
                    onClick={() => removeItem(i)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                    style={{ color: 'var(--red)' }}
                  >✕</button>
                </div>
              ))}
            </div>
          )}

          {/* Play next */}
          {queue.length > 0 && (
            <button
              onClick={playNextVideo}
              className="w-full mt-2 py-2 rounded-lg text-xs font-bold"
              style={{ background: 'var(--gold-glow)', color: 'var(--gold)', border: '1px solid var(--gold-border)' }}
            >
              ▶ Play Next
            </button>
          )}
        </div>
      )}
    </div>
  )
}
