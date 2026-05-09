import { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'
import { getSocket } from '@/hooks/useSocket'
import { useStore } from '@/store'
import { useWatchHistory, type HistoryItem } from '@/hooks/useWatchHistory'

interface TmdbMovie {
  id: number
  tmdbId: number
  title: string
  year: string
  rating: string | null
  votes: number
  overview: string
  poster: string | null
  backdrop: string | null
  genres: number[]
  source: 'tmdb'
}

interface TmdbDetail extends TmdbMovie {
  runtime: number
  tagline: string
  genres: string[]
  trailerKey: string | null
  imdbId: string | null
}

interface ArchiveMovie {
  title: string
  identifier: string
  thumbnail: string
  directUrl: string
  source: 'archive'
}

type AnyMovie = TmdbMovie | ArchiveMovie

const GENRE_PILLS = [
  { label: 'Trending', endpoint: '/api/tmdb/trending' },
  { label: 'Popular',  endpoint: '/api/tmdb/popular' },
  { label: 'Action',   endpoint: '/api/tmdb/genre/28' },
  { label: 'Comedy',   endpoint: '/api/tmdb/genre/35' },
  { label: 'Drama',    endpoint: '/api/tmdb/genre/18' },
  { label: 'Horror',   endpoint: '/api/tmdb/genre/27' },
  { label: 'Sci-Fi',   endpoint: '/api/tmdb/genre/878' },
  { label: 'Docs',     endpoint: '/api/tmdb/genre/99' },
  { label: 'Romance',  endpoint: '/api/tmdb/genre/10749' },
  { label: 'Classic',  endpoint: '/api/search?q=classic' },
]

interface MovieBrowserProps { onClose: () => void }

function timeAgo(ts: number) {
  const d = Math.floor((Date.now() - ts) / 86400000)
  return d === 0 ? 'today' : d === 1 ? 'yesterday' : `${d} days ago`
}

const FALLBACK = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'%3E%3Crect fill='%230e1117' width='200' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-size='40' fill='%23555'%3E%F0%9F%8E%AC%3C/text%3E%3C/svg%3E`

function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <div className="anim-shimmer w-full" style={{ aspectRatio: '2/3' }} />
      <div className="p-2.5 space-y-1.5">
        <div className="anim-shimmer h-3 w-3/4 rounded" />
        <div className="anim-shimmer h-2.5 w-1/3 rounded" />
      </div>
    </div>
  )
}

function StarRating({ rating }: { rating: string | null }) {
  if (!rating) return null
  const n = parseFloat(rating)
  return (
    <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--gold)' }}>
      ⭐ {rating}<span style={{ color: 'var(--faint)' }}>/10</span>
    </span>
  )
}

/* ─── Movie detail modal ─────────────────────────────────────────── */
function MovieDetail({ movie, onPlay, onBack }: { movie: TmdbMovie; onPlay: (url: string, title: string, poster: string) => void; onBack: () => void }) {
  const [detail, setDetail] = useState<TmdbDetail | null>(null)
  const [finding, setFinding] = useState(false)
  const [archiveStatus, setArchiveStatus] = useState<'idle' | 'searching' | 'found' | 'notfound'>('idle')
  const [archiveUrl, setArchiveUrl] = useState('')

  useEffect(() => {
    const isTmdbId = typeof movie.id === 'number'
    const url = isTmdbId
      ? `/api/movie/detail?tmdbId=${movie.id}&imdbId=${(movie as any).imdbId || ''}`
      : `/api/movie/detail?imdbId=${movie.id}&title=${encodeURIComponent(movie.title)}&year=${movie.year}`
    axios.get(url).then(r => setDetail(r.data)).catch(() => {})
  }, [movie.id])

  const findAndPlay = async () => {
    setArchiveStatus('searching')
    setFinding(true)
    try {
      const { data } = await axios.get(`/api/archive/find?title=${encodeURIComponent(movie.title)}&year=${movie.year}`)
      if (data.found) {
        setArchiveUrl(data.archiveUrl)
        setArchiveStatus('found')
      } else {
        setArchiveStatus('notfound')
      }
    } catch {
      setArchiveStatus('notfound')
    }
    setFinding(false)
  }

  const playArchive = () => {
    onPlay(archiveUrl, movie.title, movie.poster || '')
  }

  const playTrailer = () => {
    if (!detail?.trailerKey) return
    const url = `https://www.youtube.com/watch?v=${detail.trailerKey}`
    onPlay(url, `${movie.title} — Trailer`, movie.poster || '')
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Backdrop */}
      {(detail?.backdrop || movie.backdrop) && (
        <div className="relative w-full shrink-0" style={{ height: 180 }}>
          <img src={detail?.backdrop || movie.backdrop || ''} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(14,17,23,0.1), var(--surface))' }} />
          <button onClick={onBack} className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: 'rgba(6,8,15,0.7)', color: 'var(--text)', border: '1px solid var(--border)' }}>←</button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <div className="flex gap-4 px-5 pt-4 pb-3">
          {/* Poster */}
          {movie.poster && (
            <img src={movie.poster} alt={movie.title} className="shrink-0 rounded-xl object-cover shadow-lg" style={{ width: 90, height: 135 }} onError={e => { (e.target as HTMLImageElement).src = FALLBACK }} />
          )}
          <div className="flex-1 min-w-0 pt-1">
            <h2 className="font-bold text-base leading-tight mb-1" style={{ color: 'var(--text)' }}>{movie.title}</h2>
            <div className="flex flex-wrap gap-2 mb-2">
              {movie.year && <span className="text-xs" style={{ color: 'var(--muted)' }}>{movie.year}</span>}
              {detail?.runtime && <span className="text-xs" style={{ color: 'var(--muted)' }}>{Math.floor(detail.runtime / 60)}h {detail.runtime % 60}m</span>}
              <StarRating rating={movie.rating} />
            </div>
            {detail?.tagline && <p className="text-xs italic mb-2" style={{ color: 'var(--muted)' }}>"{detail.tagline}"</p>}
            {typeof detail?.genres !== 'undefined' && Array.isArray(detail.genres) && detail.genres.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {(detail.genres as string[]).map((g: string) => (
                  <span key={g} className="px-2 py-0.5 rounded-full text-[10px]" style={{ background: 'var(--gold-glow)', color: 'var(--gold)', border: '1px solid var(--gold-border)' }}>{g}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {movie.overview && (
          <p className="px-5 pb-4 text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{movie.overview}</p>
        )}

        {/* Action buttons */}
        <div className="px-5 pb-5 space-y-2">
          {/* Archive.org — find & play */}
          {archiveStatus === 'idle' && (
            <button
              onClick={findAndPlay}
              disabled={finding}
              className="w-full py-3 rounded-xl font-bold text-sm"
              style={{ background: 'var(--gold)', color: 'var(--bg)' }}
            >
              🎬 Find & Watch Now
            </button>
          )}
          {archiveStatus === 'searching' && (
            <div className="w-full py-3 rounded-xl text-sm text-center" style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}>
              🔍 Searching for a free stream…
            </div>
          )}
          {archiveStatus === 'found' && (
            <button
              onClick={playArchive}
              className="w-full py-3 rounded-xl font-bold text-sm"
              style={{ background: 'var(--gold)', color: 'var(--bg)' }}
            >
              ▶ Watch on Archive.org (Free)
            </button>
          )}
          {archiveStatus === 'notfound' && (
            <div className="w-full py-3 rounded-xl text-xs text-center" style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}>
              Free stream not found for this title — try pasting a URL directly
            </div>
          )}

          {/* Trailer */}
          {detail?.trailerKey && (
            <button
              onClick={playTrailer}
              className="w-full py-2.5 rounded-xl text-sm interactive"
              style={{ border: '1px solid var(--gold-border)', color: 'var(--gold)', background: 'var(--gold-glow)' }}
            >
              ▶ Watch Trailer on YouTube
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────────────── */
export default function MovieBrowser({ onClose }: MovieBrowserProps) {
  const [tab, setTab] = useState<'browse' | 'history'>('browse')
  const [query, setQuery] = useState('')
  const [activeGenre, setActiveGenre] = useState(GENRE_PILLS[0])
  const [results, setResults] = useState<AnyMovie[]>([])
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [selected, setSelected] = useState<TmdbMovie | null>(null)
  const [noTmdb, setNoTmdb] = useState(false)
  const { setVideoUrl, addMessage } = useStore()
  const { getHistory, clearHistory, addToHistory } = useWatchHistory()
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (tab === 'history') setHistory(getHistory())
  }, [tab])

  // Load initial genre on mount
  useEffect(() => { loadGenre(GENRE_PILLS[0]) }, [])

  const loadGenre = useCallback(async (pill: typeof GENRE_PILLS[0]) => {
    setActiveGenre(pill)
    setQuery('')
    setSelected(null)
    setLoading(true)
    try {
      const { data } = await axios.get(pill.endpoint)
      if (data.results) {
        setResults(data.results)
        setNoTmdb(false)
      } else if (Array.isArray(data)) {
        setResults(data.map((d: any) => ({ ...d, source: 'archive' } as ArchiveMovie)))
        setNoTmdb(true)
      }
    } catch {
      // TMDB unavailable — fall back to OMDb search using genre label
      try {
        const { data } = await axios.get(`/api/omdb/search?q=${encodeURIComponent(pill.label === 'Trending' || pill.label === 'Popular' ? 'best movies' : pill.label)}`)
        if (data.results?.length) {
          setResults(data.results)
          setNoTmdb(true)
        } else {
          setNoTmdb(true)
          setResults([])
        }
      } catch {
        setNoTmdb(true)
        setResults([])
      }
    }
    setLoading(false)
  }, [])

  const searchTmdb = useCallback(async (q: string) => {
    if (!q.trim()) { loadGenre(activeGenre); return }
    setLoading(true)
    setSelected(null)
    try {
      const { data } = await axios.get(`/api/tmdb/search?q=${encodeURIComponent(q)}`)
      if (data.results) {
        setResults(data.results)
        setNoTmdb(false)
      } else {
        throw new Error('no tmdb')
      }
    } catch {
      // Fall back to Archive.org
      try {
        const { data } = await axios.get(`/api/search?q=${encodeURIComponent(q)}`)
        setResults(data.map((d: any) => ({ ...d, source: 'archive' } as ArchiveMovie)))
        setNoTmdb(true)
      } catch { setResults([]) }
    }
    setLoading(false)
  }, [activeGenre, loadGenre])

  const handleQueryChange = (val: string) => {
    setQuery(val)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => searchTmdb(val), 400)
  }

  const playMovie = (url: string, title: string, poster: string = '') => {
    const isYT = /youtube\.com|youtu\.be/i.test(url)
    const isArchiveEmbed = url.includes('archive.org/embed')
    const videoType = isYT || isArchiveEmbed ? 'iframe' : 'direct'
    setVideoUrl(url, videoType)
    const socket = getSocket()
    if (socket) socket.emit('sync_url', { url, videoType })
    addMessage({ id: crypto.randomUUID(), userId: 'system', name: 'System', text: `🎬 Now playing: ${title}`, timestamp: Date.now(), isSystem: true })
    addToHistory({ title, thumbnail: poster, videoUrl: url, roomId: '' })
    onClose()
  }

  const playArchiveDirect = (movie: ArchiveMovie) => {
    playMovie(movie.directUrl, movie.title, movie.thumbnail)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      style={{ background: 'rgba(6,8,15,0.9)', backdropFilter: 'blur(12px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full max-w-2xl rounded-2xl overflow-hidden flex flex-col anim-scale-in"
        style={{ background: 'var(--surface)', border: '1px solid var(--border-medium)', maxHeight: '90vh', boxShadow: '0 32px 80px rgba(0,0,0,0.7)' }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-4 py-3 shrink-0" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-3">
            <span className="font-bold text-sm" style={{ color: 'var(--gold)' }}>🎬 Movie Browser</span>
            {noTmdb && <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,160,60,0.1)', color: 'var(--gold)', border: '1px solid rgba(255,160,60,0.2)' }}>IMDb data · add TMDB_API_KEY for full posters</span>}
            <div className="flex gap-1">
              {(['browse', 'history'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className="px-3 py-1 rounded-lg text-xs font-medium transition-all"
                  style={tab === t ? { background: 'var(--gold-glow)', color: 'var(--gold)', border: '1px solid var(--gold-border)' } : { color: 'var(--muted)', border: '1px solid transparent' }}
                >
                  {t === 'browse' ? 'Browse' : `History (${getHistory().length})`}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer" title="Movie data by TMDB">
              <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="TMDB" style={{ height: 10, opacity: 0.45, filter: 'brightness(0) invert(1)' }} />
            </a>
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center interactive text-sm" style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}>✕</button>
          </div>
        </div>

        {tab === 'browse' ? (
          selected ? (
            <MovieDetail movie={selected} onPlay={playMovie} onBack={() => setSelected(null)} />
          ) : (
            <div className="flex flex-col flex-1 overflow-hidden">
              {/* Search */}
              <div className="px-4 pt-3 pb-2 shrink-0">
                <input
                  className="sw-input w-full"
                  placeholder="Search any movie or show…"
                  value={query}
                  onChange={e => handleQueryChange(e.target.value)}
                  style={{ fontSize: 16 }}
                  autoFocus
                />
              </div>

              {/* Genre pills */}
              <div className="px-4 pb-2 flex gap-1.5 overflow-x-auto shrink-0" style={{ WebkitOverflowScrolling: 'touch' }}>
                {GENRE_PILLS.map(pill => (
                  <button
                    key={pill.label}
                    onClick={() => loadGenre(pill)}
                    className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium interactive transition-all"
                    style={activeGenre.label === pill.label && !query
                      ? { background: 'var(--gold-glow)', color: 'var(--gold)', border: '1px solid var(--gold-border)' }
                      : { color: 'var(--muted)', border: '1px solid var(--border)', background: 'var(--surface-hover)' }}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>

              {/* Results grid */}
              <div className="flex-1 overflow-y-auto px-4 pb-4">
                {loading ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                    {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
                  </div>
                ) : results.length === 0 ? (
                  <div className="text-center py-16" style={{ color: 'var(--faint)' }}>
                    <p className="text-3xl mb-3">🎞</p>
                    <p className="text-sm">{query ? 'No results — try a different search' : 'Pick a category above'}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                    {results.map((movie, i) => {
                      const isTmdb = movie.source === 'tmdb'
                      const tm = movie as TmdbMovie
                      const am = movie as ArchiveMovie
                      const poster = isTmdb ? (tm.poster || FALLBACK) : am.thumbnail
                      const title = isTmdb ? tm.title : am.title
                      const year = isTmdb ? tm.year : ''
                      const rating = isTmdb ? tm.rating : null

                      return (
                        <div
                          key={isTmdb ? tm.id : am.identifier ?? i}
                          className="rounded-xl overflow-hidden group cursor-pointer interactive flex flex-col"
                          style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                          onClick={() => isTmdb ? setSelected(tm) : playArchiveDirect(am)}
                        >
                          <div className="relative overflow-hidden" style={{ aspectRatio: '2/3' }}>
                            <img
                              src={poster}
                              alt={title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              onError={e => { (e.target as HTMLImageElement).src = FALLBACK }}
                            />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3"
                              style={{ background: 'linear-gradient(to top, rgba(6,8,15,0.9) 0%, transparent 60%)' }}>
                              <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg" style={{ background: 'var(--gold)', color: 'var(--bg)' }}>
                                {isTmdb ? 'Details' : 'Watch'}
                              </span>
                            </div>
                            {rating && (
                              <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ background: 'rgba(6,8,15,0.85)', color: 'var(--gold)' }}>
                                ⭐ {rating}
                              </div>
                            )}
                          </div>
                          <div className="p-2 flex-1">
                            <p className="text-[11px] font-medium leading-tight line-clamp-2" style={{ color: 'var(--text)' }}>{title}</p>
                            {year && <p className="text-[9px] mt-0.5" style={{ color: 'var(--faint)' }}>{year}</p>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )
        ) : (
          /* ── History tab ── */
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {history.length === 0 ? (
              <div className="text-center py-16" style={{ color: 'var(--faint)' }}>
                <p className="text-3xl mb-3">🕰</p>
                <p className="text-sm">No watch history yet</p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  {history.map(item => (
                    <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                      <img src={item.thumbnail} alt={item.title} className="w-12 h-16 rounded-lg object-cover shrink-0" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate" style={{ color: 'var(--text)' }}>{item.title}</p>
                        <p className="text-[10px]" style={{ color: 'var(--faint)' }}>watched {timeAgo(item.watchedAt)}</p>
                      </div>
                      <button onClick={() => playMovie(item.videoUrl, item.title, item.thumbnail)} className="shrink-0 px-2.5 py-1.5 rounded-lg text-xs font-medium interactive" style={{ background: 'var(--gold-glow)', color: 'var(--gold)', border: '1px solid var(--gold-border)' }}>
                        Resume
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={() => { clearHistory(); setHistory([]) }} className="w-full mt-4 py-2.5 rounded-xl text-xs interactive" style={{ color: 'var(--red)', border: '1px solid rgba(255,96,96,0.2)' }}>
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
