import { useState, useEffect, useRef } from 'react'

export function useSessionTimer(isPaid: boolean) {
  const [showWarning, setShowWarning] = useState(false)
  const [sessionEnded, setSessionEnded] = useState(false)
  const startTime = useRef(Date.now())

  useEffect(() => {
    if (isPaid) return

    const warningTimer = setTimeout(() => setShowWarning(true), 110 * 60 * 1000) // 1h50m
    const endTimer = setTimeout(() => setSessionEnded(true), 120 * 60 * 1000)   // 2h

    return () => {
      clearTimeout(warningTimer)
      clearTimeout(endTimer)
    }
  }, [isPaid])

  return { showWarning, sessionEnded, dismissWarning: () => setShowWarning(false) }
}
