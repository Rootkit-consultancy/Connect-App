import { useState } from 'react'
import './Chat.css'

const initial = [
  { id: 1, name: 'Designer', last: 'Shared a mockup', time: '2m', unread: 2 },
  { id: 2, name: 'Manager', last: 'Standup at 10', time: '1h', unread: 0 },
  { id: 3, name: 'Tech Mart', last: 'Order shipped', time: '1d', unread: 1 },
]

const Chat = () => {
  const [list] = useState(initial)
  const [active, setActive] = useState(null)
  const [text, setText] = useState('')

  const select = (c) => setActive(c)
  const send = () => { if (!text.trim()) return; alert('Demo: sent'); setText('') }

  return (
    <div className="chat-wrap">
      <aside className="inbox">
        <div className="inbox-head">
          <h3>Chats</h3>
          <button>＋</button>
        </div>
        <div className="items">
          {list.map(c => (
            <button key={c.id} className={`item ${active?.id===c.id?'active':''}`} onClick={()=>select(c)}>
              <div className="avatar">{c.name.slice(0,1)}</div>
              <div className="meta">
                <div className="row"><span className="name">{c.name}</span><span className="time">{c.time}</span></div>
                <div className="row">
                  <span className="last">{c.last}</span>
                  {c.unread>0 && <span className="badge">{c.unread}</span>}
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      <main className="panel">
        {!active ? (
          <div className="empty">Select a conversation</div>
        ) : (
          <>
            <div className="panel-head">
              <div className="avatar">{active.name.slice(0,1)}</div>
              <div className="who">
                <div className="name">{active.name}</div>
                <div className="muted">Online</div>
              </div>
            </div>
            <div className="messages">
              <div className="msg other">Hey there! <span className="time">10:30</span></div>
              <div className="msg me">Hi! <span className="time">10:31</span></div>
            </div>
            <div className="composer">
              <button className="icon">📎</button>
              <input value={text} onChange={e=>setText(e.target.value)} placeholder="Message..." />
              <button className="send" onClick={send}>Send</button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default Chat


