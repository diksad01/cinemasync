import { useRef } from 'react'

interface Props {
  onFileSelected: (file: File) => void
  isTransferring: boolean
  progress: number
}

export default function FileShareButton({ onFileSelected, isTransferring, progress }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex items-center gap-3">
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
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
          style={{
            background: 'rgba(240,192,96,0.12)',
            border: '1px solid rgba(240,192,96,0.2)',
            color: '#f0c060',
          }}
        >
          <span>📁</span>
          <span>Share Movie File</span>
        </button>
      ) : (
        <div
          className="rounded-lg px-4 py-2 min-w-[200px]"
          style={{
            background: 'rgba(240,192,96,0.12)',
            border: '1px solid rgba(240,192,96,0.2)',
          }}
        >
          <div className="flex justify-between mb-1 text-xs" style={{ color: '#f0c060' }}>
            <span>Sending to partner...</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 rounded-sm overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <div
              className="h-full rounded-sm transition-all duration-300"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(135deg, #f0c060, #f0a03c)',
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
