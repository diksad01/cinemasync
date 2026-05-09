import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useStore } from '@/store'

interface Plan {
  id: string
  name: string
  emoji: string
  price: string
  interval: string
  desc: string
  features: string[]
  featured?: boolean
  badge?: string
}

const PLANS: Plan[] = [
  {
    id: 'solo_monthly',
    name: 'Solo',
    emoji: '💛',
    price: '₦2,500',
    interval: '/mo',
    desc: 'For single users who want premium features.',
    features: ['File upload & sharing', 'Video queue', '3 premium themes', 'No ads'],
  },
  {
    id: 'solo_yearly',
    name: 'Solo Yearly',
    emoji: '💛',
    price: '₦24,000',
    interval: '/yr',
    desc: 'Solo plan — save 20% annually.',
    features: ['Everything in Solo Monthly', 'Save ₦6,000/year', 'Priority support'],
  },
  {
    id: 'couples_monthly',
    name: 'Couples',
    emoji: '❤️',
    price: '₦4,000',
    interval: '/mo',
    desc: 'For partners who watch together every night.',
    features: ['All Solo features', 'Face cam & voice chat', 'Permanent room link', 'All themes unlocked', 'Weekly recap emails'],
  },
  {
    id: 'couples_founders',
    name: 'Couples Founders',
    emoji: '❤️',
    price: '₦28,000',
    interval: '/yr',
    desc: 'Limited to 10 spots. Locked forever at this price.',
    features: ['Everything in Couples', 'Locked founder pricing forever', 'Priority support', 'Early access to new features'],
    featured: true,
    badge: '10 spots only',
  },
  {
    id: 'team_monthly',
    name: 'Team',
    emoji: '👥',
    price: '₦9,500',
    interval: '/mo',
    desc: 'Watch parties with up to 10 people.',
    features: ['All Couples features', 'Up to 10 viewers', 'Unlimited rooms', 'Host controls (kick, mute)', 'Custom room branding'],
  },
  {
    id: 'team_yearly',
    name: 'Team Yearly',
    emoji: '👥',
    price: '₦90,000',
    interval: '/yr',
    desc: 'Team plan — save over ₦20,000 annually.',
    features: ['Everything in Team Monthly', 'Save ₦24,000/year', 'Priority support'],
  },
]

export default function Pricing() {
  const { userName } = useStore()
  const [email, setEmail] = useState('')
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const checkout = async (planId: string) => {
    const finalEmail = email.trim()
    if (!finalEmail || !finalEmail.includes('@')) {
      setError('Please enter a valid email address')
      return
    }
    setLoading(true)
    setError('')
    try {
      const { data } = await axios.post('/api/payment/initialize', {
        email: finalEmail,
        planId,
        userName: userName || '',
      })
      if (data.authorization_url) {
        window.location.href = data.authorization_url
      } else {
        setError('Payment setup failed — try again')
      }
    } catch {
      setError('Network error — please try again')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Background orbs */}
      <div className="orb orb-gold" style={{ width: 500, height: 500, top: '-10%', right: '-10%', animationDuration: '10s' }} />
      <div className="orb orb-cyan" style={{ width: 400, height: 400, bottom: '-5%', left: '-8%', animationDuration: '13s', animationDelay: '-4s' }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-6xl mx-auto anim-fade-in">
        <Link to="/" className="text-sw-gold font-bold text-xl interactive">SomniWatch</Link>
        <Link to="/room/new" className="text-sm transition interactive" style={{ color: 'var(--muted)' }}>Create Room</Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 text-center px-6 pt-16 pb-10 max-w-3xl mx-auto anim-fade-up">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Simple, transparent <span className="text-sw-gold">pricing</span>
        </h1>
        <p className="text-lg" style={{ color: 'var(--muted)' }}>
          Start free. Upgrade when you want premium features.
        </p>
      </section>

      {/* Free tier callout */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 mb-10 anim-fade-up" style={{ animationDelay: '0.1s' }}>
        <div className="card p-5 text-center">
          <p className="text-sw-text font-semibold">Free Plan — Always available</p>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
            Paste a URL, invite your partner, sync play/pause/seek, chat with emojis. No sign-up needed.
          </p>
        </div>
      </div>

      {/* Plans grid */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
          {PLANS.map((plan, i) => (
            <div
              key={plan.id}
              className={`card p-6 flex flex-col cursor-pointer anim-fade-up ${
                plan.featured ? 'card-gold' : ''
              } ${selectedPlan === plan.id ? 'card-gold' : ''}`}
              style={{
                animationDelay: `${i * 80}ms`,
                boxShadow: selectedPlan === plan.id ? '0 0 0 1px var(--gold), 0 8px 32px rgba(240,192,96,0.15)' : undefined,
              }}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.badge && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full w-fit mb-3" style={{ color: 'var(--gold)', background: 'var(--gold-glow)' }}>
                  {plan.badge}
                </span>
              )}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{plan.emoji}</span>
                <h3 className="text-sw-text font-bold text-lg">{plan.name}</h3>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-2xl font-bold" style={{ color: 'var(--gold)' }}>{plan.price}</span>
                <span className="text-sm" style={{ color: 'var(--muted)' }}>{plan.interval}</span>
              </div>
              <p className="text-xs mb-4" style={{ color: 'var(--muted)' }}>{plan.desc}</p>
              <ul className="flex-1 space-y-1.5 mb-4">
                {plan.features.map(f => (
                  <li key={f} className="text-xs text-sw-text flex items-start gap-2">
                    <span style={{ color: 'var(--green)' }} className="mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2.5 rounded-xl text-sm font-semibold interactive ${
                  selectedPlan === plan.id
                    ? 'btn-primary'
                    : 'hover:text-sw-text'
                }`}
                style={selectedPlan !== plan.id ? { border: '1px solid var(--border)', color: 'var(--muted)' } : undefined}
                onClick={(e) => { e.stopPropagation(); setSelectedPlan(plan.id) }}
              >
                {selectedPlan === plan.id ? 'Selected ✓' : 'Select'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Checkout section */}
      {selectedPlan && (
        <section className="relative z-10 max-w-md mx-auto px-6 pb-16 anim-scale-in">
          <div className="card card-gold p-6">
            <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--gold)' }}>Complete Upgrade</h3>
            <label className="block text-sm mb-2" style={{ color: 'var(--muted)' }}>Email address</label>
            <input
              className="sw-input mb-4"
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {error && <p className="text-sm mb-3 anim-fade-in" style={{ color: 'var(--red)' }}>{error}</p>}
            <button
              onClick={() => checkout(selectedPlan)}
              disabled={loading}
              className="btn-primary w-full py-3"
            >
              {loading ? (
                <span className="flex gap-1 items-center justify-center">
                  {[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 rounded-full bg-sw-bg" style={{ animation: `dotBlink 1.4s ease-in-out ${i * 0.15}s infinite` }} />)}
                </span>
              ) : `Pay ${PLANS.find(p => p.id === selectedPlan)?.price} →`}
            </button>
            <p className="text-[11px] text-center mt-3" style={{ color: 'var(--faint)' }}>
              Powered by Paystack. Secure payment. Cancel anytime.
            </p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 text-center text-sm" style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
        <p>SomniWatch © {new Date().getFullYear()} — Built for couples who watch apart.</p>
      </footer>
    </div>
  )
}
