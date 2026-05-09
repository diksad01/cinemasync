import React, { useState, useEffect, useRef } from 'react'

interface ChatMsg {
  id: string
  name: string
  text: string
  isSystem?: boolean
  isOwn?: boolean
}

interface User {
  id: string
  name: string
}

const EMOJIS = ['❤️', '😂', '😱', '👏', '🔥', '💀', '🥹']

export default function Sidebar({ roomCode }: { roomCode: string }) {
  const [collapsed, setCollapsed] = useState(false)
  const [messages, setMessages] = useState<ChatMsg[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [text, setText] = useState('')
  const [userName, setUserName] = useState('Guest')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chrome.storage.local.get(['userName'], (d: any) => {
      if (d.userName) setUserName(d.userName)
    })
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  useEffect(() => {
    const handler = (msg: any) => {
      if (msg.type === 'CHAT_MSG') {
        setMessages(prev => [...prev.slice(-200), {
          id: Date.now().toString() + Math.random(),
          name: msg.name,
          text: msg.text,
          isOwn: msg.name === userName,
        }])
      }
      if (msg.type === 'USER_JOINED') {
        setMessages(prev => [...prev, { id: Date.now().toString(), name: 'System', text: `${msg.user.name} joined`, isSystem: true }])
      }
      if (msg.type === 'USER_LEFT') {
        setMessages(prev => [...prev, { id: Date.now().toString(), name: 'System', text: `${msg.name} left`, isSystem: true }])
      }
      if (msg.type === 'ROOM_USERS') {
        setUsers(msg.users || [])
      }
    }
    chrome.runtime.onMessage.addListener(handler)
    return () => chrome.runtime.onMessage.removeListener(handler)
  }, [userName])

  const send = () => {
    const msg = text.trim()
    if (!msg) return
    chrome.runtime.sendMessage({ type: 'SEND_CHAT', roomId: roomCode, name: userName, text: msg })
    setText('')
  }

  const sendReaction = (emoji: string) => {
    chrome.runtime.sendMessage({ type: 'SEND_REACTION', roomId: roomCode, name: userName, emoji })
  }

  return (
    <>
      <div className={`sw-sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sw-header">
          <div>
            <div className="sw-title">SomniWatch</div>
            <div className="sw-sub">{users.length} watching · {roomCode}</div>
          </div>
          <button className="sw-close" onClick={() => setCollapsed(true)}>✕</button>
        </div>

        <div className="sw-users">
          {users.map(u => (
            <span key={u.id} className="sw-pill">{u.name}</span>
          ))}
        </div>

        <div className="sw-messages">
          {messages.map(m => (
            <div key={m.id}>
              {m.isSystem ? (
                <div className="sw-msg-system">{m.text}</div>
              ) : (
                <div className={m.isOwn ? 'sw-msg-own' : 'sw-msg-other'}>
                  <div className="sw-msg-name">{m.name}</div>
                  {m.text}
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="sw-emoji-row">
          {EMOJIS.map(e => (
            <button key={e} className="sw-emoji-btn" onClick={() => sendReaction(e)}>{e}</button>
          ))}
        </div>

        <div className="sw-input-row">
          <input
            className="sw-input"
            placeholder="Type a message..."
            maxLength={300}
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') send(); e.stopPropagation() }}
            onKeyUp={e => e.stopPropagation()}
            onKeyPress={e => e.stopPropagation()}
          />
          <button className="sw-send" onClick={send}>Send</button>
        </div>
      </div>

      <div className={`sw-tab ${collapsed ? 'visible' : ''}`} onClick={() => setCollapsed(false)}>
        SW Chat
      </div>
    </>
  )
}
