import './Profile.css'

const Profile = ({ user, onLogout }) => {
  const profile = (() => { try { return JSON.parse(localStorage.getItem('connect_profile')) || {} } catch { return {} } })()
  return (
    <div className="prof">
      <header className="prof-head">
        <div className="avatar lg">{(profile?.name||'U').slice(0,1)}</div>
        <div>
          <div className="name">{profile?.name || user?.username || 'User'}</div>
          <div className="muted">{profile?.occupations?.join(' • ') || 'Member'}</div>
        </div>
      </header>

      <section className="cards">
        <div className="card">
          <div className="label">Email</div>
          <div className="value">{profile?.email || '—'}</div>
        </div>
        <div className="card">
          <div className="label">Phone</div>
          <div className="value">{profile?.phone || '—'}</div>
        </div>
        <div className="card">
          <div className="label">Connections</div>
          <div className="value">156</div>
        </div>
      </section>

      <section className="actions">
        <a className="btn" href="/share">Create Post</a>
        <button className="btn outline" onClick={onLogout}>Logout</button>
      </section>
    </div>
  )
}

export default Profile


