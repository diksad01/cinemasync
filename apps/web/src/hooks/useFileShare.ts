import { useRef, useState, useCallback } from 'react'
import { Socket } from 'socket.io-client'

const CHUNK_SIZE = 64 * 1024 // 64KB chunks

interface UseFileShareOptions {
  socket: Socket | null
  roomId: string
  onFileReady: (url: string, fileName: string) => void
  onProgress: (progress: number) => void
}

export function useFileShare({ socket, roomId, onFileReady, onProgress }: UseFileShareOptions) {
  const peerRef = useRef<RTCPeerConnection | null>(null)
  const channelRef = useRef<RTCDataChannel | null>(null)
  const fileRef = useRef<File | null>(null)
  const receivedChunks = useRef<ArrayBuffer[]>([])
  const receivedSize = useRef(0)
  const totalSize = useRef(0)
  const [isTransferring, setIsTransferring] = useState(false)
  const [sendProgress, setSendProgress] = useState(0)
  const [incomingFile, setIncomingFile] = useState<{
    fileName: string
    fileSize: number
    fileType: string
    fromId: string
  } | null>(null)

  const ICE_SERVERS: RTCConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
    ],
  }

  // ── SENDER SIDE ─────────────────────────────────────────────────────────

  const offerFile = useCallback((file: File) => {
    fileRef.current = file
    if (!socket) return
    socket.emit('file_offer', {
      roomId,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    })
  }, [socket, roomId])

  const startSending = useCallback(async (toId: string) => {
    const file = fileRef.current
    if (!file || !socket) return

    const peer = new RTCPeerConnection(ICE_SERVERS)
    peerRef.current = peer

    const channel = peer.createDataChannel('fileTransfer', { ordered: true })
    channelRef.current = channel
    channel.binaryType = 'arraybuffer'

    channel.onopen = async () => {
      console.log('[SomniWatch] Data channel open — starting transfer')
      setIsTransferring(true)
      setSendProgress(0)

      const arrayBuffer = await file.arrayBuffer()
      let offset = 0

      // Send metadata first
      const metadata = JSON.stringify({
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      })
      channel.send(metadata)

      // Send file in chunks
      while (offset < arrayBuffer.byteLength) {
        // Backpressure: wait if buffer is full
        while (channel.bufferedAmount > 16 * 1024 * 1024) {
          await new Promise(r => setTimeout(r, 50))
        }

        const chunk = arrayBuffer.slice(offset, offset + CHUNK_SIZE)
        channel.send(chunk)
        offset += chunk.byteLength

        const progress = Math.round((offset / arrayBuffer.byteLength) * 100)
        setSendProgress(progress)
        socket.emit('file_transfer_progress', { toId, progress })
      }

      // Signal complete
      channel.send('__TRANSFER_COMPLETE__')
      socket.emit('file_transfer_complete', { roomId })
      setIsTransferring(false)
      console.log('[SomniWatch] Transfer complete')
    }

    channel.onerror = (e) => console.error('[SomniWatch] Channel error:', e)

    // ICE candidates
    peer.onicecandidate = ({ candidate }) => {
      if (candidate) {
        socket.emit('webrtc_ice', { toId, candidate: candidate.toJSON() })
      }
    }

    // Create and send offer
    const offer = await peer.createOffer()
    await peer.setLocalDescription(offer)
    socket.emit('webrtc_offer', { toId, offer })
  }, [socket, roomId, onProgress])

  // ── RECEIVER SIDE ────────────────────────────────────────────────────────

  const acceptFile = useCallback((fromId: string) => {
    if (!socket) return
    socket.emit('file_accepted', { roomId, fromId })
    setIncomingFile(null)
  }, [socket, roomId])

  const rejectFile = useCallback((fromId: string) => {
    if (!socket) return
    socket.emit('file_rejected', { roomId, fromId })
    setIncomingFile(null)
  }, [socket, roomId])

  const handleIncomingConnection = useCallback(async (fromId: string, offer: RTCSessionDescriptionInit) => {
    if (!socket) return

    const peer = new RTCPeerConnection(ICE_SERVERS)
    peerRef.current = peer

    let fileName = ''
    let fileType = ''
    let metadataReceived = false

    peer.ondatachannel = ({ channel }) => {
      channel.binaryType = 'arraybuffer'

      channel.onmessage = ({ data }) => {
        // First message is metadata JSON
        if (!metadataReceived && typeof data === 'string') {
          if (data === '__TRANSFER_COMPLETE__') return
          try {
            const meta = JSON.parse(data)
            fileName = meta.fileName
            fileType = meta.fileType
            totalSize.current = meta.fileSize
            metadataReceived = true
            setIsTransferring(true)
            console.log('[SomniWatch] Receiving:', fileName)
          } catch { /* ignore */ }
          return
        }

        // File complete signal
        if (typeof data === 'string' && data === '__TRANSFER_COMPLETE__') {
          const blob = new Blob(receivedChunks.current, { type: fileType })
          const url = URL.createObjectURL(blob)
          onFileReady(url, fileName)
          setIsTransferring(false)
          receivedChunks.current = []
          receivedSize.current = 0
          console.log('[SomniWatch] File received and ready')
          return
        }

        // Accumulate chunks
        if (data instanceof ArrayBuffer) {
          receivedChunks.current.push(data)
          receivedSize.current += data.byteLength
          const progress = Math.round((receivedSize.current / totalSize.current) * 100)
          onProgress(progress)
        }
      }
    }

    peer.onicecandidate = ({ candidate }) => {
      if (candidate) {
        socket.emit('webrtc_ice', { toId: fromId, candidate: candidate.toJSON() })
      }
    }

    await peer.setRemoteDescription(offer)
    const answer = await peer.createAnswer()
    await peer.setLocalDescription(answer)
    socket.emit('webrtc_answer', { toId: fromId, answer })
  }, [socket, onFileReady, onProgress])

  // ── SOCKET EVENT HANDLERS ────────────────────────────────────────────────

  const handleFileOffer = useCallback((data: {
    fileName: string
    fileSize: number
    fileType: string
    fromId: string
  }) => {
    setIncomingFile(data)
  }, [])

  const handleFileAccepted = useCallback(({ byId }: { byId: string }) => {
    startSending(byId)
  }, [startSending])

  const handleWebRTCOffer = useCallback(({ fromId, offer }: {
    fromId: string
    offer: RTCSessionDescriptionInit
  }) => {
    handleIncomingConnection(fromId, offer)
  }, [handleIncomingConnection])

  const handleWebRTCAnswer = useCallback(async ({ fromId, answer }: {
    fromId: string
    answer: RTCSessionDescriptionInit
  }) => {
    await peerRef.current?.setRemoteDescription(answer)
  }, [])

  const handleWebRTCIce = useCallback(async ({ fromId, candidate }: {
    fromId: string
    candidate: RTCIceCandidateInit
  }) => {
    await peerRef.current?.addIceCandidate(candidate)
  }, [])

  const cleanup = useCallback(() => {
    channelRef.current?.close()
    peerRef.current?.close()
    peerRef.current = null
    channelRef.current = null
  }, [])

  return {
    offerFile,
    acceptFile,
    rejectFile,
    cleanup,
    isTransferring,
    sendProgress,
    incomingFile,
    handleFileOffer,
    handleFileAccepted,
    handleWebRTCOffer,
    handleWebRTCAnswer,
    handleWebRTCIce,
  }
}
