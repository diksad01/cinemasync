const EMOJIS = ['❤️', '😂', '😱', '👏', '🔥', '💀', '🥹']

interface Props {
  onReaction: (emoji: string) => void
}

export default function EmojiBar({ onReaction }: Props) {
  return (
    <div className="flex justify-center gap-2 px-4 py-2 border-t border-sw-light shrink-0">
      {EMOJIS.map(e => (
        <button
          key={e}
          onClick={() => onReaction(e)}
          className="text-lg hover:scale-125 transition-transform duration-150 active:scale-95"
          title={e}
        >
          {e}
        </button>
      ))}
    </div>
  )
}
