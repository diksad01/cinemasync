import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useStore } from '@/store'
import axios from 'axios'

export default function JoinPage() {
  const { roomId } = useParams<{ roomId: string }>()
  const navigate = useNavigate()
  const { userName, setUserName } = useStore()
  const [name, setName] = useState(userName || '')
  const [roomInfo, setRoomInfo] = useState<{ videoUrl: string | null; userCount: number } | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!roomId) return
    axios.get(`/api/room/${roomId}`)
      .then(({ data }) => { setRoomInfo({ videoUrl: data.videoUrl, userCount: data.userCount }); setLoading(false) })
      .catch(() => { setRoomInfo({ videoUrl: null, userCount: 0 }); setLoading(false) })
  }, [roomId])

  useEffect(() => { if (userName) setName(userName) }, [userName])

  const join = () => {
    if (!name.trim()) return setError('Enter your name')
    setUserName(name.trim())
    navigate(`/room/${roomId}`)
  }

  return (
    <div className="min-h-screen bg-sw-bg flex items-center justify-center px-6">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <span className="text-sw-gold font-bold text-2xl">SomniWatch</span>
          <p className="text-sw-muted text-sm mt-2">You've been invited to a watch party</p>
        </div>

        {loading ? (
          <div className="card p-8 text-center">
            <div className="text-sw-muted">Loading room...</div>
          </div>
        ) : error && !roomInfo ? (
          <div className="card p-8 text-center">
            <p className="text-sw-red mb-4">{error}</p>
            <a href="/" className="text-sw-gold hover:underline text-sm">Go to homepage</a>
          </div>
        ) : (
          <div className="card card-gold p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="room-code">{roomId}</span>
              {roomInfo && <span className="text-sw-muted text-xs">{roomInfo.userCount} watching</span>}
            </div>

            {roomInfo?.videoUrl && (
              <p className="text-xs text-sw-muted mb-4 truncate">
                Video: {roomInfo.videoUrl}
              </p>
            )}

            <label className="block text-sw-muted text-sm mb-2">Your name</label>
            <input
              className="sw-input mb-4"
              placeholder="Enter your name"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && join()}
              autoFocus
            />

            {error && <p className="text-sw-red text-sm mb-3">{error}</p>}

            <button onClick={join} className="btn-primary w-full py-3">
              Join Room →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
