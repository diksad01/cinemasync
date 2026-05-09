import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import CreateRoom from './pages/CreateRoom'
import WatchRoom from './pages/WatchRoom'
import JoinPage from './pages/JoinPage'
import Pricing from './pages/Pricing'
import PaymentSuccess from './pages/PaymentSuccess'
import Account from './pages/Account'
import { applyTheme } from './lib/themes'

export default function App() {
  useEffect(() => {
    const saved = localStorage.getItem('sw_theme') || 'midnight-gold'
    applyTheme(saved)
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/room/new" element={<CreateRoom />} />
      <Route path="/room/:roomId" element={<WatchRoom />} />
      <Route path="/join/:roomId" element={<JoinPage />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  )
}
