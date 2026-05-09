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
    <div className="fixed inset-0 flex items-center justify-center z-[9999]" style={{ background: 'rgba(6,8,15,0.92)' }}>
      <div
        className="rounded-2xl p-8 text-center w-[90%] max-w-[400px]"
        style={{
          background: '#0e1117',
          border: '1px solid rgba(240,192,96,0.2)',
        }}
      >
        <div className="text-5xl mb-4">🎬</div>

        <h3 className="text-sw-text font-semibold text-lg mb-2">
          {fromName} wants to share a movie
        </h3>

        <p className="text-sw-gold font-mono text-sm mb-1">
          {fileName}
        </p>

        <p className="text-sw-muted text-xs mb-6">
          {sizeMB} MB · streams directly to your browser
        </p>

        {!isReceiving ? (
          <div className="flex gap-3">
            <button
              onClick={onReject}
              className="flex-1 py-3 rounded-lg text-sw-muted text-sm cursor-pointer transition hover:opacity-80"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              Decline
            </button>
            <button
              onClick={onAccept}
              className="flex-1 py-3 rounded-lg text-sw-bg font-semibold text-sm cursor-pointer transition hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, #f0c060, #f0a03c)',
                border: 'none',
              }}
            >
              Accept & Watch
            </button>
          </div>
        ) : (
          <div>
            <p className="text-sw-muted text-xs mb-2">
              Receiving... {progress}%
            </p>
            <div className="h-1.5 rounded-sm overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <div
                className="h-full rounded-sm transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(135deg, #f0c060, #f0a03c)',
                }}
              />
            </div>
            {progress === 100 && (
              <p className="text-sw-green text-xs mt-2">
                ✅ Ready — loading player...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
