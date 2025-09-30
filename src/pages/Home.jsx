import { useMemo } from 'react'
import './Home.css'

const cards = [
  { title: 'Messages', desc: 'Continue your conversations', cta: 'Open Chat', to: '/chat', color: '#3b82f6' },
  { title: 'My Profile', desc: 'View and manage your account', cta: 'Open Profile', to: '/profile', color: '#10b981' },
  { title: 'Invite', desc: 'Share the app with friends', cta: 'Copy Link', to: '#', color: '#f59e0b' },
]

const Home = () => {
  const profile = useMemo(() => { try { return JSON.parse(localStorage.getItem('connect_profile')) || {} } catch { return {} } }, [])
  return (
    <div className="dash">
      <header className="dash-header">
        <div className="greet">
          <div className="avatar lg">{(profile?.name||'U').slice(0,1)}</div>
          <div>
            <div className="hello">Welcome back</div>
            <div className="name">{profile?.name || 'User'}</div>
          </div>
        </div>
        <button className="bell" title="Notifications">🔔</button>
      </header>

      <div className="search">
        <input placeholder="Search people, vendors, updates" />
        <button className="primary">Search</button>
      </div>

      <section className="stats">
        <div className="stat"><div className="num">156</div><div className="label">Connections</div></div>
        <div className="stat"><div className="num">23</div><div className="label">Posts</div></div>
        <div className="stat"><div className="num">12</div><div className="label">Projects</div></div>
      </section>

      <section className="quick">
        {cards.map(c => (
          <a key={c.title} href={c.to} className="quick-card" style={{ borderColor: c.color }}>
            <div className="qc-title">{c.title}</div>
            <div className="qc-desc">{c.desc}</div>
            <div className="qc-cta" style={{ color: c.color }}>{c.cta} →</div>
          </a>
        ))}
      </section>

      <section className="preview">
        <div className="panel">
          <div className="panel-head">
            <div className="ph-title">Recent chats</div>
            <a href="/chat" className="link">View all →</a>
          </div>
          <div className="items">
            {[{n:'Designer',t:'2m',m:'Shared a mockup'},{n:'Manager',t:'1h',m:'Standup at 10'},{n:'Tech Mart',t:'1d',m:'Order shipped'}].map((c,i)=>(
              <div key={i} className="row">
                <div className="avatar">{c.n.slice(0,1)}</div>
                <div className="meta">
                  <div className="line"><span className="bold">{c.n}</span><span className="muted">{c.t}</span></div>
                  <div className="muted">{c.m}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <div className="ph-title">Suggestions</div>
            <a href="/profile" className="link">Manage →</a>
          </div>
          <div className="chips">
            {['Design','Developers','Retail','Local','Events','Offers'].map(t=>(
              <button key={t} className="chip">#{t}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="updates">
        <h3>Recent updates</h3>
        <div className="update">Alex liked your post</div>
        <div className="update">Tech Mart mentioned you in a comment</div>
        <div className="update">Designers Group added 3 new photos</div>
      </section>
    </div>
  )
}

export default Home


