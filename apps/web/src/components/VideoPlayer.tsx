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

  useVideoSync(videoRef)

  const isIframe = videoType === 'iframe' || (videoUrl && (isYouTubeUrl(videoUrl) || isVimeoUrl(videoUrl)))

  // Track time for custom controls
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    const onTime = () => setCurrentTime(vid.currentTime)
    const onDur = () => setDuration(vid.duration || 0)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
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

  if (!videoUrl) {
    return (
      <div className="flex-1 flex items-center justify-center h-full">
        <div className="text-center text-sw-muted">
          <div className="text-5xl mb-4">🎬</div>
          <p className="font-medium">No video loaded</p>
          <p className="text-sm mt-1">Waiting for the host to share a video...</p>
        </div>
      </div>
    )
  }

  // YouTube / Vimeo iframe
  if (isIframe) {
    let embedUrl = videoUrl
    if (isYouTubeUrl(videoUrl)) {
      const ytId = extractYouTubeId(videoUrl)
      if (ytId) embedUrl = `https://www.youtube.com/embed/${ytId}?autoplay=1&enablejsapi=1&origin=${location.origin}`
    }
    return (
      <div className="video-container flex-1 h-full bg-black flex items-center justify-center">
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

  // Direct video with custom controls
  const proxyUrl = videoUrl.startsWith('/') ? videoUrl : `/api/proxy?url=${encodeURIComponent(videoUrl)}`

  return (
    <div className="video-container flex-1 h-full flex flex-col bg-black relative group">
      <video
        ref={videoRef}
        src={proxyUrl}
        className="flex-1 w-full object-contain bg-black"
        playsInline
        onClick={togglePlay}
      />

      {/* Custom controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Progress bar */}
        <input
          type="range"
          min={0}
          max={duration || 100}
          step={0.1}
          value={currentTime}
          onChange={seek}
          className="w-full h-1 mb-3 cursor-pointer appearance-none rounded-full"
          style={{
            background: `linear-gradient(to right, #f0c060 ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.15) 0%)`,
          }}
        />

        <div className="flex items-center gap-4">
          <button onClick={togglePlay} className="text-white text-lg hover:text-sw-gold transition">
            {playing ? '⏸' : '▶'}
          </button>

          <span className="text-xs text-white/70 font-mono">
            {fmt(currentTime)} / {fmt(duration)}
          </span>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-white/50">🔊</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={changeVolume}
              className="w-16 h-1 appearance-none rounded-full cursor-pointer"
              style={{
                background: `linear-gradient(to right, #f0c060 ${volume * 100}%, rgba(255,255,255,0.15) 0%)`,
              }}
            />
          </div>

          <button onClick={fullscreen} className="text-white/70 hover:text-white text-sm transition">⛶</button>
        </div>
      </div>
    </div>
  )
}
