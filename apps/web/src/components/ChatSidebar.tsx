import { useState, useRef, useEffect } from 'react'
import { useStore } from '@/store'
import { getSocket } from '@/hooks/useSocket'
import UserPills from './UserPills'
import EmojiBar from './EmojiBar'
import TypingIndicator from './TypingIndicator'

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
    if (socket) {
      socket.emit('chat_msg', { message: msg, userName })
      socket.emit('typing', { isTyping: false })
    }
    setText('')
  }

  const handleTyping = (val: string) => {
    setText(val)
    const socket = getSocket()
    if (socket) socket.emit('typing', { isTyping: val.length > 0 })
  }

  const sendReaction = (emoji: string) => {
    const socket = getSocket()
    if (socket) socket.emit('reaction', { emoji })
  }

  return (
    <div
      className="flex flex-col h-full w-full anim-slide-right glass-strong"
      style={{ borderLeft: '2px solid rgba(240,192,96,0.15)', animation: 'slideInRight 0.5s cubic-bezier(0.16,1,0.3,1) both, glowBorder 4s ease-in-out infinite' }}
    >
      {/* Header */}
      <div className="px-4 py-3 shrink-0" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sw-gold font-semibold text-sm">Chat</span>
          {roomId && <span className="room-code text-[10px]">{roomId}</span>}
        </div>
        <UserPills users={users} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 chat-messages">
        {messages.length === 0 && (
          <p className="text-xs text-center mt-8 anim-fade-in" style={{ color: 'var(--faint)' }}>No messages yet — say hi!</p>
        )}
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.isSystem ? (
              <p className="text-[11px] text-center italic py-1 anim-fade-in" style={{ color: 'var(--muted)' }}>{msg.text}</p>
            ) : msg.isReaction ? (
              <div className="text-center text-2xl py-1" style={{ animation: 'scaleIn 0.3s cubic-bezier(0.16,1,0.3,1) both' }}>{msg.text}</div>
            ) : (
              <div className={`max-w-[85%] group/msg ${msg.name === userName ? 'ml-auto anim-msg-self-in' : 'anim-msg-in'}`}>
                <p className="text-[10px] font-semibold mb-0.5" style={{ color: msg.color || 'var(--gold)' }}>
                  {msg.name}
                </p>
                <div
                  className={`px-3 py-2 rounded-xl text-xs leading-relaxed break-words interactive ${
                    msg.name === userName ? 'rounded-br-sm' : 'rounded-bl-sm'
                  }`}
                  style={{
                    background: msg.name === userName ? 'rgba(240,192,96,0.08)' : 'var(--surface)',
                    border: `1px solid ${msg.name === userName ? 'rgba(240,192,96,0.2)' : 'var(--border)'}`,
                    color: 'var(--text)',
                  }}
                >
                  {msg.text}
                </div>
                {/* Timestamp on hover */}
                <p className="text-[9px] mt-0.5 opacity-0 group-hover/msg:opacity-100 transition-opacity duration-200" style={{ color: 'var(--faint)' }}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            )}
          </div>
        ))}
        <TypingIndicator />
        <div ref={bottomRef} />
      </div>

      {/* Emoji bar */}
      <EmojiBar onReaction={sendReaction} />

      {/* Input */}
      <div className="flex gap-2 px-4 py-3 shrink-0" style={{ borderTop: '1px solid var(--border)' }}>
        <input
          className="sw-input flex-1 text-xs py-2"
          placeholder="Type a message..."
          maxLength={300}
          value={text}
          onChange={e => handleTyping(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
        />
        <button onClick={send} className="btn-primary px-4 py-2 text-xs interactive">Send</button>
      </div>
    </div>
  )
}
