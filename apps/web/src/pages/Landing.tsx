import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useCursorGlow } from '@/hooks/useCursorGlow'
import { useRipple } from '@/hooks/useRipple'
import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation'

const features = [
  { icon: '🔗', title: 'Instant Sync', desc: 'Share a link — your partner joins in one tap. No login required.' },
  { icon: '💬', title: 'Live Chat', desc: 'React, send emojis, and talk while watching. Stay connected.' },
  { icon: '🎥', title: 'Any Video', desc: 'YouTube, archive.org, direct links. Paste a URL and go.' },
  { icon: '📱', title: 'Any Device', desc: 'iPhone, Android, Windows, Mac. Works everywhere via the web.' },
]

const steps = [
  { num: '01', title: 'Paste a video URL', desc: 'Drop a YouTube link, archive.org movie, or any video URL.' },
  { num: '02', title: 'Share the room link', desc: 'Copy the invite link and send it to your partner or group.' },
  { num: '03', title: 'Watch together', desc: 'Play, pause, and seek stays perfectly in sync across all devices.' },
]

function AnimatedLogo() {
  const text = 'SomniWatch'
  return (
    <span className="inline-flex">
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className="anim-fade-up inline-block"
          style={{ animationDelay: `${i * 30}ms` }}
        >
          {ch}
        </span>
      ))}
    </span>
  )
}

function ScrollDots() {
  return (
    <div className="flex gap-2 justify-center mt-12">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-sw-muted"
          style={{ animation: `dotBlink 1.4s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
    </div>
  )
}

function FeatureCard({ icon, title, desc, index }: { icon: string; title: string; desc: string; index: number }) {
  const ref = useIntersectionAnimation('anim-fade-up')
  return (
    <div ref={ref} className="card card-gold p-6 group" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="text-3xl mb-3 group-hover:anim-heartbeat transition-transform duration-300">{icon}</div>
      <h3 className="text-sw-text font-semibold text-base mb-2">{title}</h3>
      <p className="text-sw-muted text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

function StepItem({ num, title, desc, index }: { num: string; title: string; desc: string; index: number }) {
  const ref = useIntersectionAnimation('anim-fade-up')
  return (
    <div ref={ref} className="flex gap-6 items-start" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="anim-gold-shimmer font-mono font-bold text-2xl shrink-0 w-10">{num}</div>
      <div>
        <h3 className="text-sw-text font-semibold text-lg">{title}</h3>
        <p className="text-sw-muted text-sm mt-1">{desc}</p>
      </div>
    </div>
  )
}

export default function Landing() {
  useCursorGlow()
  const ripple = useRipple()
  const goldLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = goldLineRef.current
    if (el) {
      el.style.animation = 'waveIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s both'
    }
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Background orbs */}
      <div className="orb orb-gold" style={{ width: 600, height: 600, top: '-10%', left: '-10%', animationDuration: '8s' }} />
      <div className="orb orb-cyan" style={{ width: 500, height: 500, bottom: '-5%', right: '-8%', animationDuration: '11s', animationDelay: '-3s' }} />
      <div className="orb orb-gold-sm" style={{ width: 400, height: 400, top: '40%', left: '30%', animationDuration: '14s', animationDelay: '-6s' }} />

      {/* Scanline */}
      <div
        className="fixed inset-x-0 h-px pointer-events-none z-[9996]"
        style={{ background: 'rgba(255,255,255,0.02)', animation: 'scanline 8s linear infinite' }}
      />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-6xl mx-auto anim-fade-in">
        <div className="flex items-center gap-2">
          <span className="text-sw-gold font-bold text-xl">SomniWatch</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/pricing" className="text-sw-muted hover:text-sw-text transition text-sm">Pricing</Link>
          <Link to="/room/new" className="btn-primary text-xs px-4 py-2" onClick={ripple}>Create Room</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-16 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Watch Together.<br />
          <span className="text-sw-gold"><AnimatedLogo /></span>
        </h1>

        {/* Gold accent line */}
        <div
          ref={goldLineRef}
          className="h-px mt-4 origin-left"
          style={{ width: 120, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', opacity: 0 }}
        />

        <p className="mt-6 text-sw-muted text-lg md:text-xl max-w-2xl anim-fade-up" style={{ animationDelay: '0.3s' }}>
          Sync movies with your partner in real time. Any device. Any distance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10 anim-fade-up" style={{ animationDelay: '0.5s' }}>
          <Link to="/room/new" className="btn-primary text-center px-8 py-4 text-base anim-gold-pulse" onClick={ripple}>
            Start Watching →
          </Link>
          <Link
            to="/pricing"
            className="interactive text-center px-8 py-4 text-base rounded-xl border text-sw-muted hover:text-sw-text hover:border-[rgba(240,192,96,0.4)] transition-all"
            style={{ borderColor: 'var(--border)' }}
          >
            View Plans
          </Link>
        </div>

        <ScrollDots />
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          How it <span className="text-sw-gold">works</span>
        </h2>
        <div className="flex flex-col gap-8">
          {steps.map((s, i) => (
            <StepItem key={s.num} {...s} index={i} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t px-6 py-10 text-center text-sm" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
        <p className="mb-4">SomniWatch © {new Date().getFullYear()} — Built for couples who watch apart.</p>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs" style={{ color: 'var(--faint)' }}>
          <span>Powered by:</span>
          <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity" style={{ color: 'var(--muted)' }}>
            <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="TMDB" style={{ height: 12, filter: 'brightness(0) invert(0.6)' }} />
          </a>
          <a href="https://www.omdbapi.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--muted)' }}>OMDb API</a>
          <a href="https://archive.org" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--muted)' }}>Internet Archive</a>
          <a href="https://firebase.google.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--muted)' }}>Firebase</a>
          <a href="https://socket.io" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--muted)' }}>Socket.IO</a>
          <a href="https://railway.app" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--muted)' }}>Railway</a>
        </div>
        <p className="mt-3 text-[10px]" style={{ color: 'var(--faint)' }}>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
      </footer>
    </div>
  )
}
