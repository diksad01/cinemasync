import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/store'
import { useRipple } from '@/hooks/useRipple'
import axios from 'axios'

interface SearchResult {
  title: string
  identifier: string
  thumbnail: string
  directUrl: string
}

export default function CreateRoom() {
  const { userName, setUserName } = useStore()
  const navigate = useNavigate()
  const ripple = useRipple()
  const [name, setName] = useState(userName || '')
  const [url, setUrl] = useState('')
  const [tab, setTab] = useState<'url' | 'search'>('url')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { if (userName) setName(userName) }, [userName])

  const search = async () => {
    if (!query.trim()) return
    setLoading(true); setError(''); setResults([])
    try {
      const { data } = await axios.get(`/api/search?q=${encodeURIComponent(query)}`)
      setResults(data)
      if (!data.length) setError('No results found')
    } catch { setError('Search failed') }
    setLoading(false)
  }

  const extractVideo = async () => {
    if (!url.trim()) return
    setLoading(true); setError('')
    try {
      const { data } = await axios.get(`/api/extract?url=${encodeURIComponent(url)}`)
      if (data.url) {
        setUrl(data.url)
        setError('')
      }
    } catch {
      // URL might be direct — that's OK
    }
    setLoading(false)
  }

  const createRoom = () => {
    if (!name.trim()) return setError('Enter your name')
    if (!url.trim()) return setError('Paste a video URL or select from search')
    setUserName(name.trim())
    const tempCode = Array.from({ length: 6 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 31)]).join('')
    localStorage.setItem('sw_pending_url', url)
    navigate(`/room/${tempCode}`)
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Background orbs */}
      <div className="orb orb-gold" style={{ width: 500, height: 500, top: '-15%', right: '-10%', animationDuration: '10s' }} />
      <div className="orb orb-cyan" style={{ width: 400, height: 400, bottom: '-10%', left: '-5%', animationDuration: '13s', animationDelay: '-4s' }} />

      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-4xl mx-auto anim-fade-in">
        <a href="/" className="text-sw-gold font-bold text-xl interactive">SomniWatch</a>
      </nav>

      <div className="relative z-10 max-w-xl mx-auto px-6 pt-12 anim-scale-in">
        <h1 className="text-2xl font-bold mb-8 anim-fade-up">Create a Room</h1>

        {/* Name */}
        <div className="anim-fade-up" style={{ animationDelay: '80ms' }}>
          <label className="block text-sm mb-2" style={{ color: 'var(--muted)' }}>Your name</label>
          <input
            className="sw-input mb-6"
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-4 anim-fade-up" style={{ animationDelay: '160ms' }}>
          <button
            className={`text-sm font-medium pb-1 transition-all duration-200 ${tab === 'url' ? 'text-sw-gold border-b-2 border-sw-gold' : 'text-sw-muted hover:text-sw-text'}`}
            onClick={() => setTab('url')}
          >Paste URL</button>
          <button
            className={`text-sm font-medium pb-1 transition-all duration-200 ${tab === 'search' ? 'text-sw-gold border-b-2 border-sw-gold' : 'text-sw-muted hover:text-sw-text'}`}
            onClick={() => setTab('search')}
          >Search Movies</button>
        </div>

        {tab === 'url' && (
          <div className="flex gap-2 mb-6 anim-fade-up" style={{ animationDelay: '240ms' }}>
            <input
              className="sw-input flex-1"
              placeholder="https://youtube.com/watch?v=..."
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
            <button onClick={(e) => { ripple(e); extractVideo() }} disabled={loading} className="btn-primary px-4 py-3 text-sm shrink-0">
              {loading ? (
                <span className="flex gap-1 items-center">
                  {[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 rounded-full bg-sw-bg" style={{ animation: `dotBlink 1.4s ease-in-out ${i * 0.15}s infinite` }} />)}
                </span>
              ) : 'Load'}
            </button>
          </div>
        )}

        {tab === 'search' && (
          <div className="anim-fade-up" style={{ animationDelay: '240ms' }}>
            <div className="flex gap-2 mb-4">
              <input
                className="sw-input flex-1"
                placeholder="Search archive.org movies..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && search()}
              />
              <button onClick={(e) => { ripple(e); search() }} disabled={loading} className="btn-primary px-4 py-3 text-sm shrink-0">
                {loading ? (
                  <span className="flex gap-1 items-center">
                    {[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 rounded-full bg-sw-bg" style={{ animation: `dotBlink 1.4s ease-in-out ${i * 0.15}s infinite` }} />)}
                  </span>
                ) : 'Search'}
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 max-h-80 overflow-y-auto stagger">
              {results.map(r => (
                <button
                  key={r.identifier}
                  className={`card p-2 text-left anim-fade-up ${url === r.directUrl ? 'card-gold' : ''}`}
                  onClick={() => setUrl(r.directUrl)}
                >
                  <img src={r.thumbnail} alt={r.title} className="w-full aspect-video object-cover rounded-lg mb-2" style={{ background: 'var(--surface)' }} />
                  <p className="text-xs text-sw-text line-clamp-2">{r.title}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {url && (
          <div className="card card-gold p-3 mb-6 anim-scale-in">
            <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Selected video</p>
            <p className="text-sm text-sw-text truncate">{url}</p>
          </div>
        )}

        {error && <p className="text-sm mb-4 anim-fade-in" style={{ color: 'var(--red)' }}>{error}</p>}

        <button onClick={(e) => { ripple(e); createRoom() }} className="btn-primary w-full py-4 text-base anim-gold-pulse">
          Create Room →
        </button>
      </div>
    </div>
  )
}
