import { useState, useRef, useEffect } from 'react'
import { useStore } from '@/store'
import { THEMES, applyTheme } from '@/lib/themes'

interface ThemeSwitcherProps {
  userPlan: string
}

export default function ThemeSwitcher({ userPlan }: ThemeSwitcherProps) {
  const { theme, setTheme } = useStore()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const canUsePremium = userPlan !== 'free'
  const current = THEMES.find(t => t.id === theme) || THEMES[0]

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selectTheme = (id: string, premium: boolean) => {
    if (premium && !canUsePremium) return
    setTheme(id)
    applyTheme(id)
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="text-xs interactive flex items-center gap-1.5 px-2 py-1 rounded-lg"
        style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
      >
        <span>{current.icon}</span>
        <span className="hidden sm:inline">{current.name}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" style={{ opacity: 0.5 }}>
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-52 rounded-xl p-1.5 z-50 anim-scale-in"
          style={{ background: 'var(--surface)', border: '1px solid var(--border-medium)', boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}
        >
          {THEMES.map(t => {
            const locked = t.premium && !canUsePremium
            return (
              <button
                key={t.id}
                onClick={() => selectTheme(t.id, t.premium)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-all duration-150 ${
                  theme === t.id ? '' : locked ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-100'
                }`}
                style={{
                  background: theme === t.id ? 'var(--gold-glow)' : 'transparent',
                  color: theme === t.id ? 'var(--gold)' : 'var(--text)',
                }}
                disabled={locked}
              >
                <span className="text-base">{t.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-xs">{t.name}</span>
                    {t.premium && (
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{
                          background: locked ? 'rgba(255,255,255,0.06)' : 'var(--gold-glow)',
                          color: locked ? 'var(--faint)' : 'var(--gold)',
                        }}
                      >
                        {locked ? '🔒 PRO' : 'PRO'}
                      </span>
                    )}
                  </div>
                </div>
                {/* Color preview dots */}
                <div className="flex gap-1">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: t.vars['--gold'] }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: t.vars['--bg'] , border: '1px solid rgba(255,255,255,0.15)' }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: t.vars['--surface'], border: '1px solid rgba(255,255,255,0.15)' }} />
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
