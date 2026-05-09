interface Props {
  fileName: string
  fileSize: number
  fromName: string
  progress: number
  isReceiving: boolean
  onAccept: () => void
  onReject: () => void
}

export default function IncomingFileModal({
  fileName, fileSize, fromName,
  progress, isReceiving,
  onAccept, onReject
}: Props) {
  const sizeMB = (fileSize / 1024 / 1024).toFixed(1)

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[9999] anim-fade-in"
      style={{ background: 'rgba(6,8,15,0.92)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
    >
      <div
        className="rounded-2xl p-8 text-center w-[90%] max-w-[400px] anim-scale-in"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--gold-border)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
        }}
      >
        <div className="text-5xl mb-4" style={{ animation: 'breathe 3s ease-in-out infinite' }}>🎬</div>

        <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text)' }}>
          {fromName} wants to share a movie
        </h3>

        <p className="text-sm mb-1" style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
          {fileName}
        </p>

        <p className="text-xs mb-6" style={{ color: 'var(--muted)' }}>
          {sizeMB} MB · streams directly to your browser
        </p>

        {!isReceiving ? (
          <div className="flex gap-3">
            <button
              onClick={onReject}
              className="flex-1 py-3 rounded-lg text-sm cursor-pointer interactive"
              style={{
                background: 'transparent',
                border: '1px solid var(--border-medium)',
                color: 'var(--muted)',
              }}
            >
              Decline
            </button>
            <button
              onClick={onAccept}
              className="flex-1 py-3 rounded-lg font-semibold text-sm cursor-pointer interactive anim-gold-pulse"
              style={{
                background: 'linear-gradient(135deg, var(--gold), var(--gold-hover))',
                border: 'none',
                color: 'var(--bg)',
              }}
            >
              Accept & Watch
            </button>
          </div>
        ) : (
          <div className="anim-fade-up">
            <p className="text-xs mb-2" style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
              Receiving... {progress}%
            </p>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(135deg, var(--gold), var(--gold-hover))',
                  transition: 'width 0.3s ease',
                  boxShadow: '0 0 12px rgba(240,192,96,0.6)',
                  animation: 'progressGlow 2s ease-in-out infinite',
                }}
              />
            </div>
            {progress === 100 && (
              <p className="text-xs mt-3 anim-scale-in" style={{ color: 'var(--green)' }}>
                ✓ Transfer complete — loading player...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
