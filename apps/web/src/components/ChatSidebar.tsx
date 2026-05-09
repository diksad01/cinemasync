import { useState, useRef, useEffect } from 'react'
import { useStore } from '@/store'
import { getSocket } from '@/hooks/useSocket'
import UserPills from './UserPills'
import EmojiBar from './EmojiBar'

export default function ChatSidebar() {
  const { messages, userName, users, roomId } = useStore()
  const [text, setText] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  const send = () => {
    const msg = text.trim()
    if (!msg) return
    const socket = getSocket()
    if (socket) socket.emit('chat_msg', { message: msg, userName })
    setText('')
  }

  const sendReaction = (emoji: string) => {
    const socket = getSocket()
    if (socket) socket.emit('reaction', { emoji })
  }

  return (
    <div className="flex flex-col h-full bg-sw-surface w-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-sw-light shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sw-gold font-semibold text-sm">Chat</span>
          {roomId && <span className="room-code text-[10px]">{roomId}</span>}
        </div>
        <UserPills users={users} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {messages.length === 0 && (
          <p className="text-sw-faint text-xs text-center mt-8">No messages yet — say hi!</p>
        )}
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.isSystem ? (
              <p className="text-sw-muted text-[11px] text-center italic py-1">{msg.text}</p>
            ) : msg.isReaction ? (
              <div className="text-center text-2xl py-1">{msg.text}</div>
            ) : (
              <div className={`max-w-[85%] ${msg.name === userName ? 'ml-auto' : ''}`}>
                <p className="text-[10px] font-semibold mb-0.5" style={{ color: msg.color || '#f0c060' }}>
                  {msg.name}
                </p>
                <div
                  className={`px-3 py-2 rounded-xl text-xs leading-relaxed break-words ${
                    msg.name === userName
                      ? 'bg-sw-gold-glow text-sw-text rounded-br-sm'
                      : 'bg-sw-hover text-sw-text rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Emoji bar */}
      <EmojiBar onReaction={sendReaction} />

      {/* Input */}
      <div className="flex gap-2 px-4 py-3 border-t border-sw-light shrink-0">
        <input
          className="sw-input flex-1 text-xs py-2"
          placeholder="Type a message..."
          maxLength={300}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
        />
        <button onClick={send} className="btn-primary px-4 py-2 text-xs">Send</button>
      </div>
    </div>
  )
}
