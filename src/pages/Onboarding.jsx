import { useMemo, useRef, useState } from 'react'
import { auth, db, RecaptchaVerifier, signInWithPhoneNumber } from '../lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import './Onboarding.css'

const OCCUPATIONS = [
  'Software Developer','Designer','Marketing Manager','Sales Executive','Project Manager','Data Analyst','Content Writer','Photographer','Consultant','Entrepreneur','Teacher','Doctor','Engineer','Architect','Lawyer','Accountant','Chef','Artist','Musician','Fitness Trainer','Real Estate Agent','Financial Advisor','HR Manager','Operations Manager','Product Manager','UX Designer','Graphic Designer','Video Editor','Social Media Manager','Business Analyst'
]

const Slides = ({ onNext }) => {
  const slides = [
    { title: 'Welcome to Connect', subtitle: 'Meet professionals near you', emoji: '👥' },
    { title: 'Share & Discover', subtitle: 'Posts, images, videos, docs', emoji: '📣' },
    { title: 'Chat & Grow', subtitle: '1:1 or groups with media', emoji: '💬' },
  ]
  const [i, setI] = useState(0)
  return (
    <div className="ob-card">
      <div className="slide-emoji">{slides[i].emoji}</div>
      <h1 className="slide-title">{slides[i].title}</h1>
      <p className="slide-sub">{slides[i].subtitle}</p>
      <div className="dots">
        {slides.map((_, idx) => (
          <span key={idx} className={`dot ${idx===i?'active':''}`} />
        ))}
      </div>
      <div className="row">
        <button className="btn secondary" onClick={() => setI((i+1)%slides.length)}>Next</button>
        <button className="btn primary" onClick={onNext}>Get Started</button>
      </div>
    </div>
  )
}

const PhoneStep = ({ onVerified }) => {
  const [phone, setPhone] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const verifierRef = useRef(null)

  const demoMode = useMemo(() => !auth, [])

  const sendOtp = async () => {
    if (demoMode) {
      setOtpSent(true)
      return
    }
    if (!verifierRef.current) {
      verifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' })
    }
    const confirmation = await signInWithPhoneNumber(auth, phone, verifierRef.current)
    window.__confirmation = confirmation
    setOtpSent(true)
  }

  const verify = async () => {
    if (demoMode) {
      if (otp === '123456') onVerified({ uid: `demo_${phone}`, phone })
      return
    }
    const result = await window.__confirmation.confirm(otp)
    onVerified({ uid: result.user.uid, phone })
  }

  return (
    <div className="ob-card">
      <h2 className="title">Verify your phone</h2>
      <p className="muted">Enter phone with country code, e.g. +1 555 123 4567</p>
      <input className="input" placeholder="+1 555 123 4567" value={phone} onChange={e=>setPhone(e.target.value)} />
      {!otpSent ? (
        <button className="btn primary" disabled={!phone} onClick={sendOtp}>Send OTP</button>
      ) : (
        <>
          <input className="input" placeholder="Enter OTP" value={otp} onChange={e=>setOtp(e.target.value)} />
          {demoMode && <p className="hint">Demo OTP: 123456</p>}
          <button className="btn primary" disabled={!otp} onClick={verify}>Verify</button>
        </>
      )}
      <div id="recaptcha-container" />
    </div>
  )
}

const DetailsStep = ({ onNext, initial }) => {
  const [name, setName] = useState(initial?.name||'')
  const [email, setEmail] = useState(initial?.email||'')
  return (
    <div className="ob-card">
      <h2 className="title">Your details</h2>
      <input className="input" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
      <input className="input" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <button className="btn primary" disabled={!name||!email} onClick={()=>onNext({ name, email })}>Next</button>
    </div>
  )
}

const OccupationsStep = ({ onNext, initial }) => {
  const [selected, setSelected] = useState(initial?.occupations||[])
  const toggle = (occ) => {
    if (selected.includes(occ)) setSelected(selected.filter(o=>o!==occ))
    else if (selected.length<3) setSelected([...selected, occ])
  }
  return (
    <div className="ob-card">
      <h2 className="title">Select up to 3 occupations</h2>
      <div className="chips">
        {OCCUPATIONS.map(o=> (
          <button key={o} className={`chip ${selected.includes(o)?'active':''}`} onClick={()=>toggle(o)} disabled={!selected.includes(o)&&selected.length>=3}>{o}</button>
        ))}
      </div>
      <button className="btn primary" disabled={selected.length===0} onClick={()=>onNext({ occupations: selected })}>Continue</button>
    </div>
  )
}

const ConfirmStep = ({ profile, onConfirm }) => (
  <div className="ob-card">
    <h2 className="title">Confirm your profile</h2>
    <div className="summary"><div><strong>Phone:</strong> {profile.phone}</div><div><strong>Name:</strong> {profile.name}</div><div><strong>Email:</strong> {profile.email}</div><div><strong>Occupations:</strong> {profile.occupations?.join(', ')}</div></div>
    <button className="btn primary" onClick={onConfirm}>Enter App</button>
  </div>
)

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(0)
  const [profile, setProfile] = useState({})

  const next = (data) => {
    setProfile({ ...profile, ...data })
    setStep(step+1)
  }

  const handleVerified = (data) => next(data)

  const handleFinish = async () => {
    const final = { ...profile, createdAt: Date.now() }
    try {
      if (db && final.uid) {
        await setDoc(doc(db, 'users', final.uid), final, { merge: true })
      }
    } catch {}
    localStorage.setItem('connect_profile', JSON.stringify(final))
    onComplete(final)
  }

  return (
    <div className="ob-wrap">
      {step===0 && <Slides onNext={()=>setStep(1)} />}
      {step===1 && <PhoneStep onVerified={handleVerified} />}
      {step===2 && <DetailsStep onNext={next} initial={profile} />}
      {step===3 && <OccupationsStep onNext={next} initial={profile} />}
      {step===4 && <ConfirmStep profile={profile} onConfirm={handleFinish} />}
    </div>
  )
}

export default Onboarding


