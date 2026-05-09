import { useEffect, useRef } from 'react'
import { getSocket } from './useSocket'
import { useStore } from '@/store'

const SEEK_THRESHOLD = 2.5
const DEBOUNCE_MS = 800

export function useVideoSync(videoRef: React.RefObject<HTMLVideoElement | null>) {
  const isSyncing = useRef(false)
  const debounce = useRef<ReturnType<typeof setTimeout>>()
  const bufferTimer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const socket = getSocket()
    const vid = videoRef.current
    if (!socket || !vid) return

    const guard = () => isSyncing.current

    const onPlay = () => {
      if (guard()) return
      clearTimeout(debounce.current)
      debounce.current = setTimeout(() => {
        socket.emit('sync_play', { currentTime: vid.currentTime })
      }, DEBOUNCE_MS)
    }

    const onPause = () => {
      if (guard()) return
      clearTimeout(debounce.current)
      debounce.current = setTimeout(() => {
        socket.emit('sync_pause', { currentTime: vid.currentTime })
      }, DEBOUNCE_MS)
    }

    const onSeeked = () => {
      if (guard()) return
      clearTimeout(debounce.current)
      debounce.current = setTimeout(() => {
        socket.emit('sync_seek', { currentTime: vid.currentTime })
      }, DEBOUNCE_MS)
    }

    const onWaiting = () => {
      clearTimeout(bufferTimer.current)
      bufferTimer.current = setTimeout(() => {
        socket.emit('sync_buffer', { buffering: true })
      }, 1500)
    }

    const onPlaying = () => {
      clearTimeout(bufferTimer.current)
      socket.emit('sync_buffer', { buffering: false })
    }

    vid.addEventListener('play', onPlay)
    vid.addEventListener('pause', onPause)
    vid.addEventListener('seeked', onSeeked)
    vid.addEventListener('waiting', onWaiting)
    vid.addEventListener('playing', onPlaying)
    vid.addEventListener('canplay', onPlaying)

    // Incoming sync events
    const handlePlay = ({ currentTime }: { currentTime: number }) => {
      isSyncing.current = true
      if (Math.abs(vid.currentTime - currentTime) > SEEK_THRESHOLD) vid.currentTime = currentTime
      vid.play().catch(() => {}).finally(() => setTimeout(() => { isSyncing.current = false }, 300))
    }

    const handlePause = ({ currentTime }: { currentTime: number }) => {
      isSyncing.current = true
      vid.pause()
      if (Math.abs(vid.currentTime - currentTime) > SEEK_THRESHOLD) vid.currentTime = currentTime
      setTimeout(() => { isSyncing.current = false }, 300)
    }

    const handleSeek = ({ currentTime }: { currentTime: number }) => {
      isSyncing.current = true
      vid.currentTime = currentTime
      setTimeout(() => { isSyncing.current = false }, 300)
    }

    socket.on('sync_play', handlePlay)
    socket.on('sync_pause', handlePause)
    socket.on('sync_seek', handleSeek)

    // Apply initial room_state to video
    socket.on('room_state', ({ currentTime, isPlaying }: { currentTime: number; isPlaying: boolean }) => {
      if (!currentTime) return
      isSyncing.current = true
      const apply = () => {
        vid.currentTime = currentTime
        if (isPlaying) vid.play().catch(() => {})
        setTimeout(() => { isSyncing.current = false }, 300)
      }
      if (vid.readyState >= 1) apply()
      else vid.addEventListener('loadedmetadata', apply, { once: true })
    })

    return () => {
      vid.removeEventListener('play', onPlay)
      vid.removeEventListener('pause', onPause)
      vid.removeEventListener('seeked', onSeeked)
      vid.removeEventListener('waiting', onWaiting)
      vid.removeEventListener('playing', onPlaying)
      vid.removeEventListener('canplay', onPlaying)
      socket.off('sync_play', handlePlay)
      socket.off('sync_pause', handlePause)
      socket.off('sync_seek', handleSeek)
    }
  }, [videoRef.current])
}
