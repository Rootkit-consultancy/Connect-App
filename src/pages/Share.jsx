import { useMemo, useState } from 'react'
import './Share.css'

const samplePosts = [
  {
    id: 1,
    author: { name: 'Alex Johnson', avatar: 'A', occupation: 'Software Developer' },
    time: '2h',
    type: 'text',
    content: 'Shipped a new feature today. Performance is up 35%! 🚀',
    likes: 18,
    comments: 4,
    shares: 2,
  },
  {
    id: 2,
    author: { name: 'Maria Garcia', avatar: 'M', occupation: 'UX Designer' },
    time: '4h',
    type: 'image',
    media: 'https://via.placeholder.com/800x450/3b82f6/ffffff?text=Concept+Preview',
    content: 'Exploring card patterns for mobile. Thoughts?',
    likes: 29,
    comments: 8,
    shares: 3,
  },
  {
    id: 3,
    author: { name: 'Tech Mart', avatar: 'T', occupation: 'Retail' },
    time: '1d',
    type: 'video',
    media: 'https://via.placeholder.com/800x450/0ea5e9/ffffff?text=Product+Demo',
    content: 'New arrivals this week. Drop your questions below 👇',
    likes: 41,
    comments: 12,
    shares: 9,
  },
]

const Share = () => {
  const profile = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('connect_profile')) || {} } catch { return {} }
  }, [])

  const [activeTab, setActiveTab] = useState('all')
  const [composer, setComposer] = useState('')

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'images', label: 'Images' },
    { id: 'videos', label: 'Videos' },
    { id: 'docs', label: 'Documents' },
  ]

  const filteredPosts = samplePosts.filter(p => {
    if (activeTab === 'all') return true
    if (activeTab === 'images') return p.type === 'image'
    if (activeTab === 'videos') return p.type === 'video'
    if (activeTab === 'docs') return p.type === 'doc'
    return true
  })

  const submitPost = () => {
    if (!composer.trim()) return
    alert('Demo: post created!')
    setComposer('')
  }

  return (
    <div className="home">
      <header className="home-header">
        <div className="user">
          <div className="avatar">{(profile?.name||'U').slice(0,1)}</div>
          <div className="meta">
            <div className="hello">Hello, {profile?.name || 'User'}</div>
            <div className="sub">{profile?.occupations?.join(' • ') || 'Welcome back'}</div>
          </div>
        </div>
        <button className="action">＋</button>
      </header>

      <section className="stories">
        {[ 'Design', 'Tech', 'Retail', 'Events', 'Local', 'Jobs', 'Offers' ].map((t, i) => (
          <div key={i} className="story">
            <div className="bubble">{t.slice(0,1)}</div>
            <span>{t}</span>
          </div>
        ))}
      </section>

      <section className="composer">
        <div className="avatar sm">{(profile?.name||'U').slice(0,1)}</div>
        <input
          value={composer}
          onChange={e=>setComposer(e.target.value)}
          placeholder="Share an update..."
        />
        <button className="post-btn" onClick={submitPost}>Post</button>
      </section>

      <nav className="tabs">
        {tabs.map(t => (
          <button key={t.id} className={`tab ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)}>{t.label}</button>
        ))}
      </nav>

      <div className="feed">
        {filteredPosts.map(p => (
          <article key={p.id} className="card">
            <div className="card-head">
              <div className="avatar md">{p.author.avatar}</div>
              <div className="info">
                <div className="name">{p.author.name}</div>
                <div className="muted">{p.author.occupation} • {p.time}</div>
              </div>
              <button className="more">⋯</button>
            </div>
            <div className="content">
              <p>{p.content}</p>
              {p.type==='image' && (
                <div className="media"><img src={p.media} alt="" /></div>
              )}
              {p.type==='video' && (
                <div className="media video">
                  <div className="video-ph">▶ Video Preview</div>
                </div>
              )}
            </div>
            <div className="actions">
              <button>👍 {p.likes}</button>
              <button>💬 {p.comments}</button>
              <button>🔄 {p.shares}</button>
            </div>
          </article>
        ))}
      </div>

      <button className="fab" title="Create post" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>＋</button>
    </div>
  )
}

export default Share


