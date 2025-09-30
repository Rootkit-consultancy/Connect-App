import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import NavigationBar from './components/NavigationBar'
import Login from './pages/Login'
import Onboarding from './pages/Onboarding'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import Home from './pages/Home'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('connect_profile'))
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('connect_profile')) } catch { return null }
  })

  const handleLogin = (credentials) => {
    setUser({ username: credentials.username })
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <Router>
      <div className="app">
        <div className="app-content">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace /> : <Onboarding onComplete={(u)=>{ setUser(u); setIsAuthenticated(true) }} />} />
            <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" replace />} />
            <Route
              path="/chat"
              element={isAuthenticated ? <Chat user={user} /> : <Navigate to="/" replace />}
            />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile user={user} onLogout={handleLogout} /> : <Navigate to="/" replace />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        {isAuthenticated && <NavigationBar />}
      </div>
    </Router>
  )
}

export default App
