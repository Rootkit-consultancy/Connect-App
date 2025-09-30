import { useState } from 'react'
import './Login.css'

const generateRandomId = () => {
  const part = () => Math.random().toString(36).slice(2, 6)
  return `user_${part()}${part()}`
}

const generateRandomPassword = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%'
  let pwd = ''
  for (let i = 0; i < 10; i++) {
    pwd += chars[Math.floor(Math.random() * chars.length)]
  }
  return pwd
}

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username || !password) return
    onLogin({ username, password })
  }

  const handleGenerate = () => {
    const id = generateRandomId()
    const pwd = generateRandomPassword()
    setUsername(id)
    setPassword(pwd)
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Connect</h1>
        <p className="login-subtitle">Sign in to continue</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="actions">
            <button type="button" className="secondary" onClick={handleGenerate}>
              Generate ID & Password
            </button>
            <button type="submit" className="primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login


