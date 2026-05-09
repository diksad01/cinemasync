import { Link } from 'react-router-dom'

const features = [
  { icon: '🔗', title: 'Instant Sync', desc: 'Share a link — your partner joins in one tap. No login required.' },
  { icon: '💬', title: 'Live Chat', desc: 'React, send emojis, and talk while watching. Stay connected.' },
  { icon: '🎥', title: 'Any Video', desc: 'YouTube, archive.org, direct links. Paste a URL and go.' },
  { icon: '📱', title: 'Any Device', desc: 'iPhone, Android, Windows, Mac. Works everywhere via the web.' },
]

const steps = [
  { num: '01', title: 'Paste a video URL', desc: 'Drop a YouTube link, archive.org movie, or any video URL.' },
  { num: '02', title: 'Share the room link', desc: 'Copy the invite link and send it to your partner or group.' },
  { num: '03', title: 'Watch together', desc: 'Play, pause, and seek stays perfectly in sync across all devices.' },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-sw-bg">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-sw-gold font-bold text-xl">SomniWatch</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/pricing" className="text-sw-muted hover:text-sw-text transition text-sm">Pricing</Link>
          <Link to="/room/new" className="btn-primary text-xs px-4 py-2">Create Room</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-20 pb-16 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Watch Together.<br />
          <span className="text-sw-gold">Feel Together.</span>
        </h1>
        <p className="mt-6 text-sw-muted text-lg md:text-xl max-w-2xl">
          Sync movies with your partner in real time. Any device. Any distance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <Link to="/room/new" className="btn-primary text-center px-8 py-4 text-base">
            Start Watching →
          </Link>
          <Link to="/pricing" className="text-center px-8 py-4 text-base rounded-xl border border-sw-light text-sw-muted hover:text-sw-text hover:border-sw-medium transition">
            View Plans
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(f => (
            <div key={f.title} className="card card-gold p-6">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-sw-text font-semibold text-base mb-2">{f.title}</h3>
              <p className="text-sw-muted text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          How it <span className="text-sw-gold">works</span>
        </h2>
        <div className="flex flex-col gap-8">
          {steps.map(s => (
            <div key={s.num} className="flex gap-6 items-start">
              <div className="text-sw-gold font-mono font-bold text-2xl opacity-50 shrink-0 w-10">{s.num}</div>
              <div>
                <h3 className="text-sw-text font-semibold text-lg">{s.title}</h3>
                <p className="text-sw-muted text-sm mt-1">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-sw-light px-6 py-8 text-center text-sw-muted text-sm">
        <p>SomniWatch © {new Date().getFullYear()} — Built for couples who watch apart.</p>
      </footer>
    </div>
  )
}
