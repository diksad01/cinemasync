import { useState, useRef, useEffect, useCallback } from 'react'
import { Socket } from 'socket.io-client'

interface Peer {
  id: string
  name: string
  stream: MediaStream | null
}

interface UseFaceCamOptions {
  socket: Socket | null
  roomId: string
  userName: string
  enabled: boolean
}

export function useFaceCam({ socket, roomId, userName, enabled }: UseFaceCamOptions) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [peers, setPeers] = useState<Peer[]>([])
  const [isMuted, setIsMuted] = useState(false)
  const [isCamOff, setIsCamOff] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const pcsRef = useRef<Map<string, RTCPeerConnection>>(new Map())
  const localStreamRef = useRef<MediaStream | null>(null)

  const ICE_SERVERS = [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ]

  const createPc = useCallback((peerId: string): RTCPeerConnection => {
    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS })

    pc.onicecandidate = ({ candidate }) => {
      if (candidate && socket) {
        socket.emit('cam_ice', { toId: peerId, candidate, roomId })
      }
    }

    pc.ontrack = (event) => {
      const stream = event.streams[0]
      setPeers(prev => {
        const existing = prev.find(p => p.id === peerId)
        if (existing) return prev.map(p => p.id === peerId ? { ...p, stream } : p)
        return [...prev, { id: peerId, name: peerId, stream }]
      })
    }

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'failed' || pc.connectionState === 'closed') {
        setPeers(prev => prev.filter(p => p.id !== peerId))
        pcsRef.current.delete(peerId)
      }
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        pc.addTrack(track, localStreamRef.current!)
      })
    }

    pcsRef.current.set(peerId, pc)
    return pc
  }, [socket, roomId])

  const startCam = useCallback(async () => {
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      localStreamRef.current = stream
      setLocalStream(stream)
      setIsActive(true)
      if (socket) socket.emit('cam_join', { roomId, userName })
    } catch (e: any) {
      setError(e.message || 'Camera access denied')
    }
  }, [socket, roomId, userName])

  const stopCam = useCallback(() => {
    localStreamRef.current?.getTracks().forEach(t => t.stop())
    localStreamRef.current = null
    setLocalStream(null)
    setIsActive(false)
    setPeers([])
    pcsRef.current.forEach(pc => pc.close())
    pcsRef.current.clear()
    if (socket) socket.emit('cam_leave', { roomId })
  }, [socket, roomId])

  const toggleMute = useCallback(() => {
    if (!localStreamRef.current) return
    localStreamRef.current.getAudioTracks().forEach(t => { t.enabled = !t.enabled })
    setIsMuted(m => !m)
  }, [])

  const toggleCam = useCallback(() => {
    if (!localStreamRef.current) return
    localStreamRef.current.getVideoTracks().forEach(t => { t.enabled = !t.enabled })
    setIsCamOff(c => !c)
  }, [])

  // Socket event handlers
  useEffect(() => {
    if (!socket || !enabled) return

    const handleCamJoin = async ({ fromId, fromName }: { fromId: string; fromName: string }) => {
      if (!localStreamRef.current) return
      const pc = createPc(fromId)
      setPeers(prev => prev.find(p => p.id === fromId) ? prev : [...prev, { id: fromId, name: fromName, stream: null }])
      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)
      socket.emit('cam_offer', { toId: fromId, offer, roomId })
    }

    const handleCamOffer = async ({ fromId, fromName, offer }: { fromId: string; fromName: string; offer: RTCSessionDescriptionInit }) => {
      const pc = createPc(fromId)
      setPeers(prev => prev.find(p => p.id === fromId) ? prev : [...prev, { id: fromId, name: fromName, stream: null }])
      await pc.setRemoteDescription(offer)
      const answer = await pc.createAnswer()
      await pc.setLocalDescription(answer)
      socket.emit('cam_answer', { toId: fromId, answer, roomId })
    }

    const handleCamAnswer = async ({ fromId, answer }: { fromId: string; answer: RTCSessionDescriptionInit }) => {
      const pc = pcsRef.current.get(fromId)
      if (pc) await pc.setRemoteDescription(answer)
    }

    const handleCamIce = async ({ fromId, candidate }: { fromId: string; candidate: RTCIceCandidateInit }) => {
      const pc = pcsRef.current.get(fromId)
      if (pc) {
        try { await pc.addIceCandidate(candidate) } catch {}
      }
    }

    const handleCamLeave = ({ fromId }: { fromId: string }) => {
      pcsRef.current.get(fromId)?.close()
      pcsRef.current.delete(fromId)
      setPeers(prev => prev.filter(p => p.id !== fromId))
    }

    const handleCamPeerNames = ({ peers: peerList }: { peers: { id: string; name: string }[] }) => {
      setPeers(prev => peerList.map(p => ({ ...p, stream: prev.find(e => e.id === p.id)?.stream || null })))
    }

    socket.on('cam_join', handleCamJoin)
    socket.on('cam_offer', handleCamOffer)
    socket.on('cam_answer', handleCamAnswer)
    socket.on('cam_ice', handleCamIce)
    socket.on('cam_leave', handleCamLeave)
    socket.on('cam_peers', handleCamPeerNames)

    return () => {
      socket.off('cam_join', handleCamJoin)
      socket.off('cam_offer', handleCamOffer)
      socket.off('cam_answer', handleCamAnswer)
      socket.off('cam_ice', handleCamIce)
      socket.off('cam_leave', handleCamLeave)
      socket.off('cam_peers', handleCamPeerNames)
    }
  }, [socket, enabled, createPc, roomId])

  // Cleanup on unmount
  useEffect(() => {
    return () => { stopCam() }
  }, [])

  return { localStream, peers, isMuted, isCamOff, isActive, error, startCam, stopCam, toggleMute, toggleCam }
}
