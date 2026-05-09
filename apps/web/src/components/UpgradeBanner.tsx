import { Link } from 'react-router-dom'

interface UpgradeBannerProps {
  onDismiss: () => void
}

export function UpgradeWarningBanner({ onDismiss }: UpgradeBannerProps) {
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 flex items-center justify-between gap-4 px-5 py-3 anim-slide-up"
      style={{ background: 'rgba(14,17,23,0.96)', backdropFilter: 'blur(12px)', borderTop: '1px solid var(--gold-border)' }}
    >
      <p className="text-sm" style={{ color: 'var(--text)' }}>
        ⏳ Your free session ends in <span style={{ color: 'var(--gold)', fontWeight: 600 }}>10 minutes</span> — upgrade to keep watching
      </p>
      <div className="flex items-center gap-2 shrink-0">
        <Link to="/pricing" className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: 'var(--gold-glow)', color: 'var(--gold)', border: '1px solid var(--gold-border)' }}>
          Upgrade
        </Link>
        <button onClick={onDismiss} className="px-3 py-1.5 rounded-lg text-xs interactive" style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}>
          Dismiss
        </button>
      </div>
    </div>
  )
}

export function SessionEndedOverlay() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center anim-fade-in"
      style={{ background: 'rgba(6,8,15,0.92)', backdropFilter: 'blur(16px)', animationDuration: '2s' }}
    >
      <div className="text-center max-w-sm px-6">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'var(--gold-glow)', border: '1px solid var(--gold-border)' }}>
          <span className="text-2xl">⏰</span>
        </div>
        <p className="font-bold text-xl mb-2" style={{ color: 'var(--text)' }}>Free session ended</p>
        <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Upgrade to continue watching together with no time limits</p>
        <Link
          to="/pricing"
          className="btn-primary px-8 py-3 text-sm font-bold inline-block"
        >
          View Plans →
        </Link>
      </div>
    </div>
  )
}
