import { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'
import { getSocket } from '@/hooks/useSocket'
import { useStore } from '@/store'
import { useWatchHistory, type HistoryItem } from '@/hooks/useWatchHistory'

interface MovieResult {
  title: string
  identifier: string
  thumbnail: string
  directUrl: string
  year?: string
  description?: string
}

const CATEGORIES = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Documentary', 'Classic']

interface MovieBrowserProps {
  onClose: () => void
}

function timeAgo(ts: number) {
  const diff = Date.now() - ts
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  return `${days} days ago`
}

function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <div className="anim-shimmer w-full h-36" />
      <div className="p-3 space-y-2">
        <div className="anim-shimmer h-3 w-3/4 rounded" />
        <div className="anim-shimmer h-3 w-1/3 rounded" />
      </div>
    </div>
  )
}

export default function MovieBrowser({ onClose }: MovieBrowserProps) {
  const [tab, setTab] = useState<'browse' | 'history'>('browse')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<MovieResult[]>([])
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const { setVideoUrl, addMessage, roomId } = useStore()
  const { getHistory, clearHistory } = useWatchHistory()
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setHistory(getHistory())
  }, [tab])

  const search = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); return }
    setLoading(true)
    try {
      const { data } = await axios.get(`/api/search?q=${encodeURIComponent(q)}`)
      setResults(data)
    } catch { setResults([]) }
    finally { setLoading(false) }
  }, [])

  const handleQueryChange = (val: string) => {
    setQuery(val)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => search(val), 400)
  }

  const loadCategory = (cat: string) => {
    setQuery(cat)
    search(cat)
  }

  const playMovie = (url: string, title: string) => {
    setVideoUrl(url, /youtube\.com|youtu\.be/i.test(url) ? 'iframe' : 'direct')
    const socket = getSocket()
    if (socket) socket.emit('sync_url', { url, videoType: /youtube\.com|youtu\.be/i.test(url) ? 'iframe' : 'direct' })
    addMessage({ id: crypto.randomUUID(), userId: 'system', name: 'System', text: `🎬 Now playing: ${title}`, timestamp: Date.now(), isSystem: true })
    onClose()
  }

  const resumeHistory = (item: HistoryItem) => {
    playMovie(item.videoUrl, item.title)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(6,8,15,0.88)', backdropFilter: 'blur(12px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full max-w-2xl rounded-2xl overflow-hidden flex flex-col anim-scale-in"
        style={{ background: 'var(--surface)', border: '1px solid var(--border-medium)', maxHeight: '85vh', boxShadow: '0 24px 80px rgba(0,0,0,0.6)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-3">
            <span className="font-bold" style={{ color: 'var(--gold)' }}>🎬 Browse Movies</span>
            <div className="flex gap-1">
              {(['browse', 'history'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="px-3 py-1 rounded-lg text-xs font-medium transition-all"
                  style={tab === t
                    ? { background: 'var(--gold-glow)', color: 'var(--gold)', border: '1px solid var(--gold-border)' }
                    : { color: 'var(--muted)', border: '1px solid transparent' }}
                >
                  {t === 'browse' ? 'Browse' : `History (${getHistory().length})`}
                </button>
              ))}
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center interactive text-sm" style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}>✕</button>
        </div>

        {tab === 'browse' ? (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Search */}
            <div className="px-5 pt-4 pb-3">
              <input
                className="sw-input w-full"
                placeholder="Search movies, documentaries..."
                value={query}
                onChange={e => handleQueryChange(e.target.value)}
                style={{ fontSize: 16 }}
                autoFocus
              />
            </div>

            {/* Categories */}
            <div className="px-5 pb-3 flex gap-2 overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => loadCategory(cat)}
                  className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium interactive transition-all"
                  style={query === cat
                    ? { background: 'var(--gold-glow)', color: 'var(--gold)', border: '1px solid var(--gold-border)' }
                    : { color: 'var(--muted)', border: '1px solid var(--border)', background: 'var(--surface-hover)' }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto px-5 pb-5">
              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
              ) : results.length === 0 && query ? (
                <div className="text-center py-16" style={{ color: 'var(--faint)' }}>
                  <p className="text-3xl mb-3">🎞</p>
                  <p className="text-sm">No results — try a different search</p>
                </div>
              ) : results.length === 0 ? (
                <div className="text-center py-16" style={{ color: 'var(--faint)' }}>
                  <p className="text-3xl mb-3">🍿</p>
                  <p className="text-sm">Search above or pick a category</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {results.map(movie => (
                    <div
                      key={movie.identifier}
                      className="rounded-xl overflow-hidden group cursor-pointer interactive"
                      style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                      onClick={() => playMovie(movie.directUrl, movie.title)}
                    >
                      <div className="relative overflow-hidden" style={{ height: 120 }}>
                        <img
                          src={movie.thumbnail}
                          alt={movie.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={e => { (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 90'%3E%3Crect fill='%230e1117' width='120' height='90'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-size='28' fill='%23555'%3E🎬%3C/text%3E%3C/svg%3E` }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: 'var(--gold)', color: 'var(--bg)' }}>Watch Now</span>
                        </div>
                      </div>
                      <div className="p-2.5">
                        <p className="text-xs font-medium truncate" style={{ color: 'var(--gold)' }}>{movie.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* History tab */
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {history.length === 0 ? (
              <div className="text-center py-16" style={{ color: 'var(--faint)' }}>
                <p className="text-3xl mb-3">🕰</p>
                <p className="text-sm">No watch history yet</p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  {history.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-xl group"
                      style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-16 h-10 rounded-lg object-cover shrink-0"
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate" style={{ color: 'var(--text)' }}>{item.title}</p>
                        <p className="text-[10px]" style={{ color: 'var(--faint)' }}>watched {timeAgo(item.watchedAt)}</p>
                      </div>
                      <button
                        onClick={() => resumeHistory(item)}
                        className="shrink-0 px-2.5 py-1.5 rounded-lg text-xs font-medium interactive"
                        style={{ background: 'var(--gold-glow)', color: 'var(--gold)', border: '1px solid var(--gold-border)' }}
                      >
                        Resume
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => { clearHistory(); setHistory([]) }}
                  className="w-full mt-4 py-2.5 rounded-xl text-xs interactive"
                  style={{ color: 'var(--red)', border: '1px solid rgba(255,96,96,0.2)' }}
                >
                  Clear History
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
