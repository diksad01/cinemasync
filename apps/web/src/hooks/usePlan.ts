import { useState, useEffect } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db, MASTER_UID } from '@/lib/firebase'

export interface PlanFeatures {
  tier: string
  canUpload: boolean
  canFaceCam: boolean
  canVoice: boolean
  canPremiumThemes: boolean
  maxViewers: number
  isLoggedIn: boolean
  user: User | null
}

const TIER_FEATURES: Record<string, Omit<PlanFeatures, 'tier' | 'isLoggedIn' | 'user'>> = {
  free:    { canUpload: false, canFaceCam: false, canVoice: false, canPremiumThemes: false, maxViewers: 2 },
  solo:    { canUpload: true,  canFaceCam: false, canVoice: false, canPremiumThemes: true,  maxViewers: 2 },
  couples: { canUpload: true,  canFaceCam: true,  canVoice: true,  canPremiumThemes: true,  maxViewers: 2 },
  team:    { canUpload: true,  canFaceCam: true,  canVoice: true,  canPremiumThemes: true,  maxViewers: 10 },
  master:  { canUpload: true,  canFaceCam: true,  canVoice: true,  canPremiumThemes: true,  maxViewers: 10 },
}

export function usePlan(): PlanFeatures {
  const [tier, setTier] = useState('free')
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (!u) { setTier('free'); return }
      if (u.uid === MASTER_UID) { setTier('master'); return }
      try {
        const snap = await getDoc(doc(db, 'users', u.uid))
        if (snap.exists()) {
          const d = snap.data()
          const exp = d.expiresAt ? new Date(d.expiresAt) : null
          setTier(d.active && (!exp || exp > new Date()) ? (d.tier || 'free') : 'free')
        } else {
          setTier('free')
        }
      } catch { setTier('free') }
    })
    return unsub
  }, [])

  const features = TIER_FEATURES[tier] || TIER_FEATURES.free

  return {
    tier,
    ...features,
    isLoggedIn: !!user,
    user,
  }
}
