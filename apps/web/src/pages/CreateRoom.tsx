import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useStore } from '@/store'
import { useRipple } from '@/hooks/useRipple'
import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db, MASTER_UID } from '@/lib/firebase'
import axios from 'axios'

interface SearchResult {
  title: string
  identifier: string
  thumbnail: string
  directUrl: string
}

const PLAN_LABELS: Record<string, { icon: string; name: string }> = {
  free:    { icon: '✨', name: 'Free' },
  solo:    { icon: '💛', name: 'Solo' },
  couples: { icon: '❤️', name: 'Couples' },
  team:    { icon: '👥', name: 'Team' },
  master:  { icon: '★',  name: 'Master' },
}

export default function CreateRoom() {
  const { userName, setUserName } = useStore()
  const navigate = useNavigate()
  const ripple = useRipple()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState(userName || '')
  const [url, setUrl] = useState('')
  const [tab, setTab] = useState<'url' | 'search' | 'upload'>('url')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Auth state
  const [fireUser, setFireUser] = useState<User | null>(null)
  const [plan, setPlan] = useState('free')

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setFireUser(u)
      if (!u) { setPlan('free'); return }
      if (u.uid === MASTER_UID) { setPlan('master'); return }
      try {
        const snap = await getDoc(doc(db, 'users', u.uid))
        if (snap.exists()) {
          const d = snap.data()
          const exp = d.expiresAt ? new Date(d.expiresAt) : null
          setPlan(d.active && (!exp || exp > new Date()) ? (d.tier || 'free') : 'free')
        }
      } catch { setPlan('free') }
    })
    return unsub
  }, [])

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

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('video/')) {
      setError('Please select a video file')
      return
    }
    setUploadFile(file)
    setError('')
  }

  const createRoom = async () => {
    if (!name.trim()) return setError('Enter your name')
    setUserName(name.trim())
    const tempCode = Array.from({ length: 6 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 31)]).join('')

    // If uploading a file, upload it to the server first
    if (tab === 'upload' && uploadFile) {
      setLoading(true)
      setError('')
      setUploadProgress(0)
      try {
        const form = new FormData()
        form.append('video', uploadFile)
        const { data } = await axios.post(`/api/upload/${tempCode}`, form, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (e) => {
            if (e.total) setUploadProgress(Math.round((e.loaded / e.total) * 100))
          },
        })
        localStorage.setItem('sw_pending_url', data.url)
        setLoading(false)
        navigate(`/room/${tempCode}`)
        return
      } catch {
        setError('Upload failed — try again or use a URL instead')
        setLoading(false)
        return
      }
    }

    // URL / search path
    if (!url.trim()) return setError('Paste a video URL, search, or upload a file')
    localStorage.setItem('sw_pending_url', url)
    navigate(`/room/${tempCode}`)
  }

  const planMeta = PLAN_LABELS[plan] || PLAN_LABELS.free
  const canUpload = plan !== 'free'

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Background orbs */}
      <div className="orb orb-gold" style={{ width: 500, height: 500, top: '-15%', right: '-10%', animationDuration: '10s' }} />
      <div className="orb orb-cyan" style={{ width: 400, height: 400, bottom: '-10%', left: '-5%', animationDuration: '13s', animationDelay: '-4s' }} />

      {/* Nav with auth + pricing */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-4xl mx-auto anim-fade-in">
        <a href="/" className="text-sw-gold font-bold text-xl interactive">SomniWatch</a>
        <div className="flex items-center gap-4">
          <Link to="/pricing" className="text-xs interactive" style={{ color: 'var(--muted)' }}>Pricing</Link>
          {fireUser ? (
            <Link to="/account" className="flex items-center gap-2 interactive">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: 'var(--gold-glow)', border: '1px solid var(--gold-border)', color: 'var(--gold)' }}
              >
                {(fireUser.displayName || fireUser.email || 'U')[0].toUpperCase()}
              </div>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: plan === 'free' ? 'rgba(255,255,255,0.06)' : 'var(--gold-glow)', color: plan === 'free' ? 'var(--muted)' : 'var(--gold)', border: plan === 'free' ? '1px solid var(--border)' : '1px solid var(--gold-border)' }}
              >
                {planMeta.icon} {planMeta.name}
              </span>
            </Link>
          ) : (
            <Link to="/account" className="text-xs font-medium interactive" style={{ color: 'var(--gold)' }}>Sign In</Link>
          )}
        </div>
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

        {/* Tabs — 3 options */}
        <div className="flex gap-4 mb-4 anim-fade-up overflow-x-auto" style={{ animationDelay: '160ms' }}>
          {[
            { key: 'url' as const, label: 'Paste URL' },
            { key: 'search' as const, label: 'Search Movies' },
            { key: 'upload' as const, label: 'Upload Movie' },
          ].map(t => (
            <button
              key={t.key}
              className={`text-sm font-medium pb-1 transition-all duration-200 whitespace-nowrap ${tab === t.key ? 'text-sw-gold border-b-2 border-sw-gold' : 'text-sw-muted hover:text-sw-text'}`}
              onClick={() => { setTab(t.key); setError('') }}
            >{t.label}</button>
          ))}
        </div>

        {/* ─── Paste URL tab ─── */}
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

        {/* ─── Search tab ─── */}
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

        {/* ─── Upload tab ─── */}
        {tab === 'upload' && (
          <div className="anim-fade-up mb-6" style={{ animationDelay: '240ms' }}>
            {!canUpload ? (
              <div className="card p-6 text-center">
                <div className="text-3xl mb-3">🔒</div>
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>File upload requires a paid plan</p>
                <p className="text-xs mb-4" style={{ color: 'var(--muted)' }}>
                  Upgrade to Solo or above to upload movies directly from your device.
                </p>
                <div className="flex gap-3 justify-center">
                  <Link to="/pricing" className="btn-primary px-5 py-2 text-sm">View Plans</Link>
                  {!fireUser && <Link to="/account" className="text-sm interactive px-4 py-2 rounded-lg" style={{ color: 'var(--gold)', border: '1px solid var(--gold-border)' }}>Sign In</Link>}
                </div>
              </div>
            ) : (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) handleFileSelect(f)
                  }}
                />

                {!uploadFile ? (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full card p-8 text-center cursor-pointer group"
                    style={{ border: '2px dashed var(--gold-border)' }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault()
                      const f = e.dataTransfer.files?.[0]
                      if (f) handleFileSelect(f)
                    }}
                  >
                    <div className="text-4xl mb-3 transition-transform duration-200 group-hover:scale-110">📁</div>
                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>
                      Drop a movie file or click to browse
                    </p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>
                      Supports MP4, MKV, WebM · Up to 4 GB
                    </p>
                  </button>
                ) : (
                  <div className="card card-gold p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-2xl shrink-0">🎬</span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-sw-text truncate">{uploadFile.name}</p>
                          <p className="text-xs" style={{ color: 'var(--muted)' }}>{(uploadFile.size / 1024 / 1024).toFixed(1)} MB</p>
                        </div>
                      </div>
                      <button
                        onClick={() => { setUploadFile(null); setUploadProgress(0) }}
                        className="text-xs interactive px-2 py-1 rounded"
                        style={{ color: 'var(--muted)' }}
                      >✕</button>
                    </div>
                    {loading && uploadProgress > 0 && (
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${uploadProgress}%`,
                            background: 'linear-gradient(135deg, var(--gold), var(--gold-hover))',
                            transition: 'width 0.3s ease',
                            boxShadow: '0 0 8px rgba(240,192,96,0.5)',
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Selected video indicator (for URL/search tabs) */}
        {url && tab !== 'upload' && (
          <div className="card card-gold p-3 mb-6 anim-scale-in">
            <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Selected video</p>
            <p className="text-sm text-sw-text truncate">{url}</p>
          </div>
        )}

        {error && <p className="text-sm mb-4 anim-fade-in" style={{ color: 'var(--red)' }}>{error}</p>}

        <button
          onClick={(e) => { ripple(e); createRoom() }}
          disabled={loading || (tab === 'upload' && !canUpload)}
          className="btn-primary w-full py-4 text-base anim-gold-pulse disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading && uploadProgress > 0 ? (
            <span className="flex items-center justify-center gap-2">
              Uploading... {uploadProgress}%
            </span>
          ) : 'Create Room →'}
        </button>
      </div>
    </div>
  )
}
