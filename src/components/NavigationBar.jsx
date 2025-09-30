import { Link, useLocation } from 'react-router-dom'
import './NavigationBar.css'

const NavigationBar = () => {
  const location = useLocation()
  const items = [
    { to: '/share', label: 'Home' },
    { to: '/chat', label: 'Chat' },
    { to: '/share', label: 'Share' },
    { to: '/profile', label: 'Profile' },
  ]

  return (
    <nav className="navigation-bar">
      {items.map((item) => {
        const active = location.pathname === item.to
        return (
          <Link key={item.to} to={item.to} className={`nav-item ${active ? 'active' : ''}`}>
            <span className="nav-label">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export default NavigationBar


