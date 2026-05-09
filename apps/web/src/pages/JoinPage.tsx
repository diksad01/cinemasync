import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useStore } from '@/store'
import { useUsername } from '@/hooks/useUsername'
import axios from 'axios'

export default function JoinPage() {
  const { roomId } = useParams<{ roomId: string }>()
  const navigate = useNavigate()
  const { setUserName } = useStore()
  const { name: storedName, saveName, hasName } = useUsername()
  const [name, setName] = useState(storedName)
  const [isEditing, setIsEditing] = useState(!hasName)
  const [roomInfo, setRoomInfo] = useState<{ videoUrl: string | null; userCount: number } | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!roomId) return
    axios.get(`/api/room/${roomId}`)
      .then(({ data }) => { setRoomInfo({ videoUrl: data.videoUrl, userCount: data.userCount }); setLoading(false) })
      .catch(() => { setRoomInfo({ videoUrl: null, userCount: 0 }); setLoading(false) })
  }, [roomId])

  // Auto-join if we already have a stored username and room loaded
  useEffect(() => {
    if (!loading && hasName && !isEditing) {
      setUserName(storedName)
      navigate(`/room/${roomId}`)
    }
  }, [loading, hasName, isEditing])

  const join = () => {
    if (!name.trim()) return setError('Enter your name')
    saveName(name.trim())
    setUserName(name.trim())
    navigate(`/room/${roomId}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Background orbs */}
      <div className="orb orb-gold" style={{ width: 400, height: 400, top: '-10%', left: '-5%', animationDuration: '9s' }} />
      <div className="orb orb-cyan" style={{ width: 350, height: 350, bottom: '-10%', right: '-8%', animationDuration: '12s', animationDelay: '-3s' }} />

      <div className="relative z-10 max-w-sm w-full">
        <div className="text-center mb-8 anim-fade-up">
          <span className="text-sw-gold font-bold text-2xl">SomniWatch</span>
          <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>You've been invited to a watch party</p>
        </div>

        {loading ? (
          <div className="card p-8 text-center anim-scale-in">
            <div className="anim-shimmer w-32 h-4 rounded mx-auto mb-3" />
            <div className="anim-shimmer w-48 h-3 rounded mx-auto" />
          </div>
        ) : error && !roomInfo ? (
          <div className="card p-8 text-center anim-scale-in">
            <p className="mb-4" style={{ color: 'var(--red)' }}>{error}</p>
            <a href="/" className="text-sw-gold hover:underline text-sm">Go to homepage</a>
          </div>
        ) : (
          <div className="card card-gold p-6 anim-scale-in">
            <div className="flex items-center justify-between mb-4">
              <span className="room-code">{roomId}</span>
              {roomInfo && <span className="text-xs" style={{ color: 'var(--muted)' }}>{roomInfo.userCount} watching</span>}
            </div>

            {roomInfo?.videoUrl && (
              <p className="text-xs mb-4 truncate" style={{ color: 'var(--muted)' }}>
                Video: {roomInfo.videoUrl}
              </p>
            )}

            <div className="anim-fade-up mb-4" style={{ animationDelay: '0.1s' }}>
              <label className="block text-sm mb-2" style={{ color: 'var(--muted)' }}>Your name</label>
              {hasName && !isEditing ? (
                <div className="flex items-center gap-2">
                  <span className="flex-1 px-3 py-2.5 rounded-lg text-sm" style={{ background: 'var(--surface-hover)', color: 'var(--text)', border: '1px solid var(--border)' }}>{storedName}</span>
                  <button onClick={() => setIsEditing(true)} className="p-2 rounded-lg interactive" style={{ border: '1px solid var(--border)', color: 'var(--muted)' }} title="Change name">✏️</button>
                </div>
              ) : (
                <input
                  className="sw-input"
                  placeholder="Enter your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && join()}
                  autoFocus
                  style={{ fontSize: 16 }}
                />
              )}
            </div>

            {error && <p className="text-sm mb-3 anim-fade-in" style={{ color: 'var(--red)' }}>{error}</p>}

            <button onClick={join} className="btn-primary w-full py-3 anim-gold-pulse">
              Join Room →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
