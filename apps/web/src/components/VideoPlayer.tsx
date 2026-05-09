import { useRef, useState, useEffect } from 'react'
import { useStore } from '@/store'
import { useVideoSync } from '@/hooks/useVideoSync'

function isYouTubeUrl(url: string) {
  return /youtube\.com\/watch|youtu\.be\//i.test(url)
}

function extractYouTubeId(url: string) {
  const m = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return m ? m[1] : null
}

function isVimeoUrl(url: string) {
  return /vimeo\.com\/\d+/i.test(url)
}

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { videoUrl, videoType } = useStore()
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const hideTimer = useRef<ReturnType<typeof setTimeout>>()

  useVideoSync(videoRef)

  const isIframe = videoType === 'iframe' || (videoUrl && (isYouTubeUrl(videoUrl) || isVimeoUrl(videoUrl)))

  // Auto-hide controls after 3s
  const resetHideTimer = () => {
    setShowControls(true)
    clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => setShowControls(false), 3000)
  }

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    const onTime = () => setCurrentTime(vid.currentTime)
    const onDur = () => setDuration(vid.duration || 0)
    const onPlay = () => setPlaying(true)
    const onPause = () => { setPlaying(false); setShowControls(true) }
    vid.addEventListener('timeupdate', onTime)
    vid.addEventListener('loadedmetadata', onDur)
    vid.addEventListener('durationchange', onDur)
    vid.addEventListener('play', onPlay)
    vid.addEventListener('pause', onPause)
    return () => {
      vid.removeEventListener('timeupdate', onTime)
      vid.removeEventListener('loadedmetadata', onDur)
      vid.removeEventListener('durationchange', onDur)
      vid.removeEventListener('play', onPlay)
      vid.removeEventListener('pause', onPause)
    }
  }, [videoUrl])

  const togglePlay = () => {
    const vid = videoRef.current
    if (!vid) return
    vid.paused ? vid.play().catch(() => {}) : vid.pause()
  }

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vid = videoRef.current
    if (!vid) return
    vid.currentTime = parseFloat(e.target.value)
  }

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    if (videoRef.current) videoRef.current.volume = v
  }

  const fullscreen = () => {
    const el = document.querySelector('.video-container') as HTMLElement
    if (el) el.requestFullscreen?.()
  }

  const fmt = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const pct = duration ? (currentTime / duration) * 100 : 0

  if (!videoUrl) {
    return (
      <div className="flex-1 flex items-center justify-center h-full anim-fade-in">
        <div className="text-center">
          {/* Shimmer skeleton */}
          <div className="w-64 h-36 rounded-xl mx-auto mb-6 anim-shimmer" />
          <p className="font-medium" style={{ color: 'var(--muted)' }}>No video loaded</p>
          <p className="text-sm mt-1" style={{ color: 'var(--faint)' }}>Waiting for the host to share a video...</p>
        </div>
      </div>
    )
  }

  if (isIframe) {
    let embedUrl = videoUrl
    if (isYouTubeUrl(videoUrl)) {
      const ytId = extractYouTubeId(videoUrl)
      if (ytId) embedUrl = `https://www.youtube.com/embed/${ytId}?autoplay=1&enablejsapi=1&origin=${location.origin}`
    }
    return (
      <div className="video-container flex-1 h-full bg-black flex items-center justify-center anim-fade-in">
        <iframe
          src={embedUrl}
          className="w-full h-full"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ border: 'none' }}
        />
      </div>
    )
  }

  const proxyUrl = videoUrl.startsWith('/') ? videoUrl : `/api/proxy?url=${encodeURIComponent(videoUrl)}`

  return (
    <div
      className="video-container flex-1 h-full flex flex-col bg-black relative anim-slide-left"
      onMouseMove={resetHideTimer}
      onMouseEnter={() => setShowControls(true)}
      onClick={(e) => {
        if ((e.target as HTMLElement).tagName === 'VIDEO') togglePlay()
      }}
    >
      <video
        ref={videoRef}
        src={proxyUrl}
        className="flex-1 w-full object-contain bg-black cursor-pointer"
        playsInline
      />

      {/* Glassmorphism controls */}
      <div
        className="absolute bottom-0 left-0 right-0 glass px-4 pb-3 pt-6 transition-all duration-300 anim-slide-up"
        style={{
          opacity: showControls ? 1 : 0,
          transform: showControls ? 'translateY(0)' : 'translateY(8px)',
          pointerEvents: showControls ? 'auto' : 'none',
        }}
      >
        {/* Progress bar */}
        <div className="relative group/progress mb-3">
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={seek}
            className="w-full h-1 cursor-pointer appearance-none rounded-full relative z-10"
            style={{
              background: `linear-gradient(to right, var(--gold) ${pct}%, rgba(255,255,255,0.1) ${pct}%)`,
            }}
          />
          {/* Glow dot on progress */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full z-20 transition-transform duration-200 group-hover/progress:scale-125"
            style={{
              left: `${pct}%`,
              marginLeft: -6,
              background: 'var(--gold)',
              boxShadow: '0 0 8px rgba(240,192,96,0.6)',
              animation: 'progressGlow 2s ease-in-out infinite',
            }}
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="interactive text-white text-lg hover:text-sw-gold"
            style={{ transition: 'transform 0.15s ease, color 0.15s ease' }}
          >
            {playing ? '⏸' : '▶'}
          </button>

          <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {fmt(currentTime)} / {fmt(duration)}
          </span>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>🔊</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={changeVolume}
              className="w-16 h-1 appearance-none rounded-full cursor-pointer"
              style={{
                background: `linear-gradient(to right, var(--gold) ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%)`,
              }}
            />
          </div>

          <button onClick={fullscreen} className="interactive text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>⛶</button>
        </div>
      </div>

      {/* Click-to-play ripple indicator */}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center anim-scale-in"
            style={{ background: 'rgba(6,8,15,0.6)', backdropFilter: 'blur(8px)' }}
          >
            <span className="text-2xl ml-1" style={{ color: 'var(--gold)' }}>▶</span>
          </div>
        </div>
      )}
    </div>
  )
}
