import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { onAuthStateChanged, signOut, updateProfile, deleteUser, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db, MASTER_UID } from '@/lib/firebase'

const PLAN_META: Record<string, { icon: string; name: string; desc: string }> = {
  free:    { icon: '✨', name: 'Free',    desc: 'Basic watch parties' },
  solo:    { icon: '💛', name: 'Solo',    desc: 'File upload, queue, 3 themes' },
  couples: { icon: '❤️', name: 'Couples', desc: 'Face cam, voice, 2 viewers' },
  team:    { icon: '👥', name: 'Team',    desc: 'Up to 10 viewers, all features' },
  master:  { icon: '★',  name: 'Master',  desc: 'Owner — all features, never expires' },
}

const PLAN_FEATURES: Record<string, { label: string; has: boolean }[]> = {
  free:    [{ label: 'Watch parties', has: true }, { label: 'Chat & reactions', has: true }, { label: 'File upload', has: false }, { label: 'Face cam + voice', has: false }, { label: 'Premium themes', has: false }],
  solo:    [{ label: 'Watch parties', has: true }, { label: 'Chat & reactions', has: true }, { label: 'File upload', has: true  }, { label: 'Face cam + voice', has: false }, { label: 'Premium themes', has: true  }],
  couples: [{ label: 'Watch parties', has: true }, { label: 'Chat & reactions', has: true }, { label: 'File upload', has: true  }, { label: 'Face cam + voice', has: true  }, { label: 'Premium themes', has: true  }],
  team:    [{ label: 'Up to 10 viewers', has: true }, { label: 'Chat & reactions', has: true }, { label: 'File upload', has: true }, { label: 'Face cam + voice', has: true }, { label: 'Premium themes', has: true }],
  master:  [{ label: 'All features', has: true }, { label: 'Never expires', has: true }, { label: 'Owner access', has: true }, { label: 'Priority support', has: true }, { label: 'Early features', has: true }],
}

export default function Account() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [plan, setPlan] = useState('free')
  const [expiresAt, setExpiresAt] = useState<string | null>(null)
  const [displayName, setDisplayName] = useState('')
  const [editName, setEditName] = useState('')
  const [toast, setToast] = useState('')
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin')
  const [authEmail, setAuthEmail] = useState('')
  const [authPass, setAuthPass] = useState('')
  const [authError, setAuthError] = useState('')

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500) }

  useEffect(() => {
    loadAccount()
  }, [])

  async function loadAccount() {
    try {
      onAuthStateChanged(auth, async (u) => {
        setLoading(false)
        if (!u) { setUser(null); return }
        setUser(u)
        setDisplayName(u.displayName || u.email?.split('@')[0] || '')
        setEditName(u.displayName || '')

        if (u.uid === MASTER_UID) {
          setPlan('master')
          return
        }

        try {
          const docRef = doc(db, 'users', u.uid)
          const snap = await getDoc(docRef)
          if (snap.exists()) {
            const data = snap.data()
            const expiry = data.expiresAt ? new Date(data.expiresAt) : null
            if (data.active && (!expiry || expiry > new Date())) {
              setPlan(data.tier || 'free')
              setExpiresAt(data.expiresAt || null)
            } else {
              setPlan('free')
            }
          }
        } catch { setPlan('free') }
      })
    } catch { setLoading(false) }
  }

  async function doSignIn() {
    setAuthError('')
    if (!authEmail || !authPass) return setAuthError('Enter email and password')
    try {
      if (authTab === 'signup') {
        await createUserWithEmailAndPassword(auth, authEmail, authPass)
      } else {
        await signInWithEmailAndPassword(auth, authEmail, authPass)
      }
    } catch (e: any) {
      setAuthError(e.message || 'Authentication failed')
    }
  }

  async function doGoogleSignIn() {
    setAuthError('')
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (e: any) {
      if (e.code !== 'auth/popup-closed-by-user') {
        setAuthError(e.message || 'Google sign-in failed')
      }
    }
  }

  async function saveNameAction() {
    if (!editName.trim() || !auth.currentUser) return
    try {
      await updateProfile(auth.currentUser, { displayName: editName.trim() })
      setDisplayName(editName.trim())
      showToast('Display name updated')
    } catch { showToast('Failed to update name') }
  }

  async function doSignOut() {
    try {
      await signOut(auth)
      setUser(null)
      setPlan('free')
      showToast('Signed out')
    } catch {}
  }

  async function doDelete() {
    if (!confirm('Are you sure? This permanently deletes your account and cancels your plan.')) return
    if (!auth.currentUser) return
    try {
      await deleteUser(auth.currentUser)
      setUser(null)
      showToast('Account deleted')
    } catch (e: any) {
      showToast(e.message || 'Failed to delete — sign in again first')
    }
  }

  const meta = PLAN_META[plan] || PLAN_META.free
  const features = PLAN_FEATURES[plan] || PLAN_FEATURES.free

  if (loading) {
    return (
      <div className="min-h-screen bg-sw-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-sw-gold/20 border-t-sw-gold rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sw-muted text-sm">Loading account…</p>
        </div>
      </div>
    )
  }

  // Not signed in
  if (!user) {
    return (
      <div className="min-h-screen bg-sw-bg">
        <nav className="flex items-center justify-between px-6 py-4 max-w-4xl mx-auto border-b border-sw-light">
          <Link to="/" className="text-sw-gold font-bold text-xl">SomniWatch</Link>
          <Link to="/" className="text-sw-muted text-sm hover:text-sw-text transition">← Back</Link>
        </nav>
        <div className="max-w-sm mx-auto px-6 pt-16 text-center">
          <div className="text-5xl mb-4">👤</div>
          <h1 className="text-xl font-bold mb-2">Sign In</h1>
          <p className="text-sw-muted text-sm mb-6">Manage your plan, billing, and settings.</p>

          <div className="flex gap-4 justify-center mb-6">
            <button onClick={() => setAuthTab('signin')} className={`text-sm font-medium pb-1 ${authTab === 'signin' ? 'text-sw-gold border-b-2 border-sw-gold' : 'text-sw-muted'}`}>Sign In</button>
            <button onClick={() => setAuthTab('signup')} className={`text-sm font-medium pb-1 ${authTab === 'signup' ? 'text-sw-gold border-b-2 border-sw-gold' : 'text-sw-muted'}`}>Create Account</button>
          </div>

          <input className="sw-input mb-3" placeholder="Email" type="email" value={authEmail} onChange={e => setAuthEmail(e.target.value)} />
          <input className="sw-input mb-4" placeholder="Password" type="password" value={authPass} onChange={e => setAuthPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && doSignIn()} />
          {authError && <p className="text-sw-red text-xs mb-3">{authError}</p>}
          <button onClick={doSignIn} className="btn-primary w-full py-3">
            {authTab === 'signup' ? 'Create Account' : 'Sign In'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="text-xs" style={{ color: 'var(--muted)' }}>or</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          {/* Google Sign-In */}
          <button
            onClick={doGoogleSignIn}
            className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-3 interactive"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    )
  }

  // Signed in
  return (
    <div className="min-h-screen bg-sw-bg">
      <nav className="flex items-center justify-between px-6 py-4 max-w-4xl mx-auto border-b border-sw-light">
        <Link to="/" className="text-sw-gold font-bold text-xl">SomniWatch</Link>
        <Link to="/" className="text-sw-muted text-sm hover:text-sw-text transition">← Back to app</Link>
      </nav>

      <div className="max-w-lg mx-auto px-6 pt-10 pb-16">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-sw-gold-glow border border-sw-gold/30 flex items-center justify-center text-sw-gold font-bold text-xl">
            {(displayName || 'U')[0].toUpperCase()}
          </div>
          <div>
            <h1 className="text-lg font-bold">{displayName || 'User'}</h1>
            <p className="text-sw-muted text-sm">{user.email}</p>
          </div>
        </div>

        {/* Plan card */}
        <div className="card card-gold mb-4">
          <p className="text-sw-muted text-[10px] uppercase tracking-widest font-bold mb-3">Current Plan</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sw-gold-glow border border-sw-gold/25 flex items-center justify-center text-lg">{meta.icon}</div>
              <div>
                <p className="text-sw-gold font-bold">{meta.name}</p>
                <p className="text-sw-muted text-xs">{meta.desc}</p>
              </div>
            </div>
            {expiresAt && (
              <div className="text-right">
                <p className="text-sw-text text-sm font-medium">{new Date(expiresAt).toLocaleDateString()}</p>
                <p className="text-sw-muted text-[10px]">Renews</p>
              </div>
            )}
          </div>

          {/* Feature list */}
          <div className="mt-4 pt-4 border-t border-sw-light space-y-2">
            {features.map(f => (
              <div key={f.label} className="flex items-center gap-2 text-xs">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${f.has ? 'bg-sw-green/15 text-sw-green' : 'bg-white/5 text-sw-faint'}`}>
                  {f.has ? '✓' : '—'}
                </span>
                <span className={f.has ? 'text-sw-text' : 'text-sw-faint'}>{f.label}</span>
              </div>
            ))}
          </div>

          {plan === 'free' && (
            <Link to="/pricing" className="btn-primary block text-center mt-4 py-3">⚡ Upgrade Plan</Link>
          )}
        </div>

        {/* Account info */}
        <div className="card mb-4">
          <p className="text-sw-muted text-[10px] uppercase tracking-widest font-bold mb-3">Account Info</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm py-2 border-b border-sw-light">
              <span className="text-sw-muted">Display name</span>
              <span className="text-sw-text">{displayName}</span>
            </div>
            <div className="flex gap-2">
              <input className="sw-input flex-1 text-sm py-2" placeholder="New display name" maxLength={24} value={editName} onChange={e => setEditName(e.target.value)} />
              <button onClick={saveNameAction} className="px-4 py-2 text-xs rounded-lg bg-sw-gold-glow border border-sw-gold/25 text-sw-gold font-bold">Save</button>
            </div>
            <div className="flex justify-between items-center text-sm py-2 border-b border-sw-light">
              <span className="text-sw-muted">Email</span>
              <span className="text-sw-text">{user.email}</span>
            </div>
            <div className="flex justify-between items-center text-sm py-2 border-b border-sw-light">
              <span className="text-sw-muted">Member since</span>
              <span className="text-sw-text">{user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : '—'}</span>
            </div>
            <div className="flex justify-between items-center text-sm py-2">
              <span className="text-sw-muted">Provider</span>
              <span className="text-sw-text">{user.providerData?.[0]?.providerId || 'email'}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="card">
          <p className="text-sw-muted text-[10px] uppercase tracking-widest font-bold mb-3">Account Actions</p>
          <button onClick={doSignOut} className="w-full py-3 rounded-xl border border-sw-light text-sw-muted text-sm font-semibold hover:bg-sw-hover transition mb-3">
            Sign Out
          </button>
          <button onClick={doDelete} className="w-full py-3 rounded-xl border border-sw-red/25 text-sw-red text-sm font-semibold hover:bg-red-500/5 transition">
            Delete Account
          </button>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-sw-surface border border-sw-light rounded-full px-5 py-2 text-sm text-sw-text z-50">
          {toast}
        </div>
      )}
    </div>
  )
}
