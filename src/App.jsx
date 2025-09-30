import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import NavigationBar from './components/NavigationBar'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Share from './pages/Share'
import Profile from './pages/Profile'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

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
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/share" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/chat"
              element={isAuthenticated ? <Chat user={user} /> : <Navigate to="/" replace />}
            />
            <Route
              path="/share"
              element={isAuthenticated ? <Share user={user} /> : <Navigate to="/" replace />}
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
