export default function WaitingOverlay({ onCopyLink }: { onCopyLink: () => void }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10" style={{ background: 'var(--backdrop)' }}>
      <div className="text-center anim-scale-in">
        {/* Two silhouettes with gold connecting line */}
        <div className="flex items-center justify-center gap-6 mb-6">
          {/* Left silhouette */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: 'var(--gold-glow)', border: '2px solid var(--gold-border)' }}
          >
            <span className="text-lg" style={{ color: 'var(--gold)' }}>👤</span>
          </div>

          {/* Pulsing gold connection line */}
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3, 4].map(i => (
              <span
                key={i}
                className="w-2 h-0.5 rounded-full"
                style={{
                  background: 'var(--gold)',
                  animation: `breathe 2s ease-in-out ${i * 0.15}s infinite`,
                }}
              />
            ))}
          </div>

          {/* Right silhouette — waiting */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center anim-breathe"
            style={{ background: 'var(--surface-hover)', border: '2px dashed var(--border-medium)' }}
          >
            <span className="text-lg" style={{ color: 'var(--muted)' }}>?</span>
          </div>
        </div>

        <p className="text-sw-text font-semibold text-lg anim-fade-up" style={{ animationDelay: '0.1s' }}>
          Waiting for partner...
        </p>
        <p className="text-sm mt-2 anim-fade-up" style={{ color: 'var(--muted)', animationDelay: '0.2s' }}>
          Share the room link to invite someone
        </p>
        <button
          onClick={onCopyLink}
          className="btn-primary mt-6 px-6 py-2 text-sm anim-fade-up anim-gold-pulse"
          style={{ animationDelay: '0.3s' }}
        >
          Copy Invite Link
        </button>
      </div>
    </div>
  )
}
