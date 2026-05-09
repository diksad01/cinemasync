import { useEffect } from 'react'

export function useCursorGlow() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return

    let glow = document.getElementById('cursor-glow')
    if (!glow) {
      glow = document.createElement('div')
      glow.id = 'cursor-glow'
      document.body.appendChild(glow)
    }

    let targetX = 0, targetY = 0
    let currentX = 0, currentY = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      glow!.style.opacity = '1'
    }

    const onLeave = () => {
      glow!.style.opacity = '0'
    }

    const loop = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      glow!.style.left = `${currentX}px`
      glow!.style.top = `${currentY}px`
      raf = requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
      glow?.remove()
    }
  }, [])
}
