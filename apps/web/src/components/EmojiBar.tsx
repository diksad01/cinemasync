const EMOJIS = ['❤️', '😂', '😱', '👏', '🔥', '💀', '🥹']

interface Props {
  onReaction: (emoji: string) => void
}

export default function EmojiBar({ onReaction }: Props) {
  return (
    <div className="flex justify-center gap-1 px-4 py-2 shrink-0 overflow-x-auto" style={{ borderTop: '1px solid var(--border)' }}>
      {EMOJIS.map(e => (
        <button
          key={e}
          onClick={() => onReaction(e)}
          className="text-lg p-1.5 rounded-lg transition-all duration-200 active:scale-90"
          style={{ transitionTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)' }}
          onMouseEnter={ev => { (ev.target as HTMLElement).style.transform = 'scale(1.4)' }}
          onMouseLeave={ev => { (ev.target as HTMLElement).style.transform = 'scale(1)' }}
          title={e}
        >
          {e}
        </button>
      ))}
    </div>
  )
}
