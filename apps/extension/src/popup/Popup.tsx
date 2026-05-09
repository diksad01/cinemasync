import React, { useState, useEffect } from 'react'

type View = 'connect' | 'session'

const WEB_URL = 'https://watch.somniread.com'

export default function Popup() {
  const [view, setView] = useState<View>('connect')
  const [tab, setTab] = useState<'create' | 'join'>('create')
  const [name, setName] = useState('')
  const [roomCode, setRoomCode] = useState('')
  const [connectedRoom, setConnectedRoom] = useState('')
  const [toast, setToast] = useState('')

  useEffect(() => {
    chrome.storage.local.get(['roomCode', 'userName'], (d: any) => {
      if (d.userName) setName(d.userName)
      if (d.roomCode) {
        setConnectedRoom(d.roomCode)
        setView('session')
      }
    })
  }, [])

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2000) }

  const createRoom = () => {
    if (!name.trim()) return showToast('Enter your name')
    chrome.runtime.sendMessage({ type: 'CREATE_ROOM', userName: name.trim(), userColor: '#f0c060' }, (res: any) => {
      if (res?.roomId) {
        setConnectedRoom(res.roomId)
        setView('session')
      }
    })
  }

  const joinRoom = () => {
    if (!name.trim()) return showToast('Enter your name')
    if (!roomCode.trim() || roomCode.trim().length !== 6) return showToast('Enter a 6-letter room code')
    const code = roomCode.trim().toUpperCase()
    chrome.runtime.sendMessage({ type: 'JOIN_ROOM', roomId: code, userName: name.trim(), userColor: '#f0c060' }, () => {
      setConnectedRoom(code)
      setView('session')
    })
  }

  const leave = () => {
    chrome.runtime.sendMessage({ type: 'DISCONNECT' })
    setConnectedRoom('')
    setView('connect')
  }

  const copyLink = () => {
    const url = `${WEB_URL}/join/${connectedRoom}`
    navigator.clipboard.writeText(url).then(() => showToast('Link copied!')).catch(() => {
      const ta = document.createElement('textarea')
      ta.value = url; ta.style.cssText = 'position:fixed;opacity:0;'; document.body.appendChild(ta)
      ta.select(); document.execCommand('copy'); ta.remove()
      showToast('Link copied!')
    })
  }

  const s: Record<string, React.CSSProperties> = {
    container: { padding: 16, minHeight: 380 },
    logo: { color: '#f0c060', fontWeight: 700, fontSize: 18, marginBottom: 16, textAlign: 'center' as const },
    label: { color: '#7a8199', fontSize: 11, marginBottom: 4, display: 'block' },
    input: { width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px', color: '#e8eaf0', fontFamily: 'inherit', fontSize: 13, outline: 'none', marginBottom: 12, boxSizing: 'border-box' as const },
    btn: { width: '100%', background: 'linear-gradient(135deg, #f0c060, #f0a03c)', border: 'none', borderRadius: 10, padding: '12px 0', color: '#06080f', fontWeight: 700, fontSize: 14, cursor: 'pointer', marginTop: 8 },
    btnDanger: { width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,96,96,0.3)', borderRadius: 10, padding: '10px 0', color: '#ff6060', fontSize: 13, cursor: 'pointer', marginTop: 8 },
    tabs: { display: 'flex', gap: 12, marginBottom: 16 },
    tab: (active: boolean): React.CSSProperties => ({ fontSize: 13, fontWeight: 500, color: active ? '#f0c060' : '#7a8199', borderBottom: active ? '2px solid #f0c060' : 'none', paddingBottom: 4, cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'inherit' }),
    roomCode: { fontFamily: "'DM Mono',monospace", color: '#f0c060', background: 'rgba(240,192,96,0.12)', border: '1px solid rgba(240,192,96,0.2)', borderRadius: 8, padding: '6px 12px', letterSpacing: 2, fontSize: 16, textAlign: 'center' as const, marginBottom: 12 },
    toast: { position: 'fixed' as const, bottom: 12, left: '50%', transform: 'translateX(-50%)', background: '#0e1117', border: '1px solid rgba(240,192,96,0.2)', borderRadius: 8, padding: '6px 14px', color: '#67e8f9', fontSize: 12, zIndex: 100 },
    link: { color: '#67e8f9', cursor: 'pointer', background: 'none', border: 'none', fontSize: 12, fontFamily: 'inherit', marginTop: 8, textAlign: 'center' as const, display: 'block', width: '100%' },
  }

  if (view === 'session') {
    return (
      <div style={s.container}>
        <div style={s.logo}>SomniWatch</div>
        <div style={{ ...s.roomCode }}>{connectedRoom}</div>
        <div style={{ color: '#4ade80', fontSize: 12, textAlign: 'center', marginBottom: 12 }}>● Connected</div>
        <button style={s.btn} onClick={copyLink}>Copy Invite Link</button>
        <button style={s.btnDanger} onClick={leave}>Leave Room</button>
        {toast && <div style={s.toast}>{toast}</div>}
      </div>
    )
  }

  return (
    <div style={s.container}>
      <div style={s.logo}>SomniWatch</div>

      <span style={s.label}>Your name</span>
      <input style={s.input} placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} />

      <div style={s.tabs}>
        <button style={s.tab(tab === 'create')} onClick={() => setTab('create')}>Create Room</button>
        <button style={s.tab(tab === 'join')} onClick={() => setTab('join')}>Join Room</button>
      </div>

      {tab === 'create' && (
        <button style={s.btn} onClick={createRoom}>Create Room</button>
      )}

      {tab === 'join' && (
        <>
          <span style={s.label}>Room Code</span>
          <input
            style={{ ...s.input, fontFamily: "'DM Mono',monospace", letterSpacing: 2, textTransform: 'uppercase' }}
            placeholder="XXXXXX"
            maxLength={6}
            value={roomCode}
            onChange={e => setRoomCode(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === 'Enter' && joinRoom()}
          />
          <button style={s.btn} onClick={joinRoom}>Join Room</button>
        </>
      )}

      {toast && <div style={s.toast}>{toast}</div>}
    </div>
  )
}
