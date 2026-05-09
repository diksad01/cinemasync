import { useRef } from 'react'

interface Props {
  onFileSelected: (file: File) => void
  isTransferring: boolean
  progress: number
}

export default function FileShareButton({ onFileSelected, isTransferring, progress }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex items-center gap-3 anim-fade-up" style={{ animationDelay: '0.3s' }}>
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onFileSelected(file)
        }}
      />

      {!isTransferring ? (
        <button
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium interactive"
          style={{
            background: 'var(--gold-glow)',
            border: '1px solid var(--gold-border)',
            color: 'var(--gold)',
          }}
        >
          <span>📁</span>
          <span>Share Movie File</span>
        </button>
      ) : (
        <div
          className="rounded-lg px-4 py-2 min-w-[200px] glass anim-scale-in"
          style={{ border: '1px solid var(--gold-border)' }}
        >
          <div className="flex justify-between mb-1.5 text-xs" style={{ color: 'var(--gold)' }}>
            <span style={{ fontFamily: 'var(--font-mono)' }}>Sending...</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>{progress}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(135deg, var(--gold), var(--gold-hover))',
                transition: 'width 0.3s ease',
                boxShadow: '0 0 8px rgba(240,192,96,0.5)',
                animation: 'progressGlow 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
