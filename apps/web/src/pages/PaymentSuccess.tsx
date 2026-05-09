import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'

export default function PaymentSuccess() {
  const [params] = useSearchParams()
  const reference = params.get('reference') || params.get('trxref') || ''
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')
  const [tier, setTier] = useState('')

  useEffect(() => {
    if (!reference) { setStatus('failed'); return }
    axios.get(`/api/payment/verify/${reference}`)
      .then(({ data }) => {
        if (data.status === 'success') {
          setStatus('success')
          setTier(data.tier || '')
        } else {
          setStatus('failed')
        }
      })
      .catch(() => setStatus('failed'))
  }, [reference])

  return (
    <div className="min-h-screen bg-sw-bg flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {status === 'loading' && (
          <div className="card p-10">
            <div className="text-4xl mb-4 animate-pulse">⏳</div>
            <p className="text-sw-text font-semibold">Verifying payment...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="card card-gold p-10">
            <div className="text-5xl mb-4">🎉</div>
            <h1 className="text-2xl font-bold text-sw-gold mb-3">Payment Successful!</h1>
            <p className="text-sw-text mb-2">
              You're now on the <span className="text-sw-gold font-bold capitalize">{tier || 'premium'}</span> plan.
            </p>
            <p className="text-sw-muted text-sm mb-6">
              All premium features are now unlocked. Start a room and enjoy!
            </p>
            <Link to="/room/new" className="btn-primary inline-block px-8 py-3">
              Start Watching →
            </Link>
          </div>
        )}

        {status === 'failed' && (
          <div className="card p-10">
            <div className="text-5xl mb-4">⚠️</div>
            <h1 className="text-xl font-bold text-sw-red mb-3">Payment Failed</h1>
            <p className="text-sw-muted text-sm mb-6">
              We couldn't verify your payment. If you were charged, please contact support.
            </p>
            <Link to="/pricing" className="text-sw-gold hover:underline text-sm">
              ← Back to pricing
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
