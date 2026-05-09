import { useEffect, useRef } from 'react'
import { useFaceCam } from '@/hooks/useFaceCam'
import { getSocket } from '@/hooks/useSocket'
import { Link } from 'react-router-dom'

interface FaceCamBarProps {
  roomId: string
  userName: string
  canFaceCam: boolean
}

function VideoTile({ stream, label, muted }: { stream: MediaStream | null; label: string; muted?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (ref.current && stream) {
      ref.current.srcObject = stream
    }
  }, [stream])

  return (
    <div
      className="relative rounded-xl overflow-hidden shrink-0"
      style={{ width: 120, height: 90, background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      {stream ? (
        <video ref={ref} autoPlay playsInline muted={muted} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: 'var(--gold-glow)', color: 'var(--gold)' }}
          >
            {label[0]?.toUpperCase()}
          </div>
        </div>
      )}
      <div
        className="absolute bottom-0 inset-x-0 px-2 py-1 text-[10px] font-medium truncate"
        style={{ background: 'rgba(0,0,0,0.6)', color: 'var(--text)' }}
      >
        {label}
      </div>
    </div>
  )
}

export default function FaceCamBar({ roomId, userName, canFaceCam }: FaceCamBarProps) {
  const socket = getSocket()
  const { localStream, peers, isMuted, isCamOff, isActive, error, startCam, stopCam, toggleMute, toggleCam } =
    useFaceCam({ socket, roomId, userName, enabled: canFaceCam })

  if (!canFaceCam) {
    return (
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <span>🔒</span>
        <span style={{ color: 'var(--muted)' }}>Face cam —</span>
        <Link to="/pricing" style={{ color: 'var(--gold)' }} className="interactive">Couples+</Link>
      </div>
    )
  }

  return (
    <div className="flex items-end gap-2 anim-fade-up">
      {/* Local cam */}
      {isActive && (
        <VideoTile stream={localStream} label={`${userName} (you)`} muted={true} />
      )}

      {/* Remote peers */}
      {peers.map(peer => (
        <VideoTile key={peer.id} stream={peer.stream} label={peer.name} />
      ))}

      {/* Controls */}
      <div className="flex flex-col gap-1.5 pb-1">
        {!isActive ? (
          <button
            onClick={startCam}
            className="px-3 py-2 rounded-xl text-xs font-bold interactive"
            style={{ background: 'var(--gold-glow)', color: 'var(--gold)', border: '1px solid var(--gold-border)' }}
          >
            📹 Join Cam
          </button>
        ) : (
          <>
            <button
              onClick={toggleMute}
              className="px-2.5 py-1.5 rounded-lg text-xs interactive"
              style={{
                background: isMuted ? 'rgba(255,96,96,0.15)' : 'var(--surface-hover)',
                color: isMuted ? 'var(--red)' : 'var(--muted)',
                border: `1px solid ${isMuted ? 'rgba(255,96,96,0.3)' : 'var(--border)'}`,
              }}
            >
              {isMuted ? '🔇 Muted' : '🎙 Mute'}
            </button>
            <button
              onClick={toggleCam}
              className="px-2.5 py-1.5 rounded-lg text-xs interactive"
              style={{
                background: isCamOff ? 'rgba(255,96,96,0.15)' : 'var(--surface-hover)',
                color: isCamOff ? 'var(--red)' : 'var(--muted)',
                border: `1px solid ${isCamOff ? 'rgba(255,96,96,0.3)' : 'var(--border)'}`,
              }}
            >
              {isCamOff ? '🚫 Cam off' : '📹 Cam'}
            </button>
            <button
              onClick={stopCam}
              className="px-2.5 py-1.5 rounded-lg text-xs interactive"
              style={{ background: 'rgba(255,96,96,0.15)', color: 'var(--red)', border: '1px solid rgba(255,96,96,0.3)' }}
            >
              Leave
            </button>
          </>
        )}
        {error && <p className="text-[10px] max-w-[100px]" style={{ color: 'var(--red)' }}>{error}</p>}
      </div>
    </div>
  )
}
