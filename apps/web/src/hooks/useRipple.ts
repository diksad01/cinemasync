import { useCallback } from 'react'

export function useRipple() {
  const createRipple = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const ripple = document.createElement('span')
    ripple.className = 'ripple-circle'
    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`

    el.style.position = el.style.position || 'relative'
    el.style.overflow = 'hidden'
    el.appendChild(ripple)

    ripple.addEventListener('animationend', () => ripple.remove())
  }, [])

  return createRipple
}
