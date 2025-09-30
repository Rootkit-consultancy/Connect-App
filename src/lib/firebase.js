// Minimal Firebase setup; reads config from environment variables.
// If env vars are missing, the app can run in demo mode without real auth.
import { initializeApp } from 'firebase/app'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

let app
try {
  app = initializeApp(firebaseConfig)
} catch (e) {
  // Allow running without config (demo mode)
}

export const auth = app ? getAuth(app) : null
export const db = app ? getFirestore(app) : null
export { RecaptchaVerifier, signInWithPhoneNumber }


