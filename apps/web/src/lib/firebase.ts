import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyB38uXvzZRnfONHjM_qIBFBiG-Vw4rqXuI",
  authDomain: "somniwatch.firebaseapp.com",
  projectId: "somniwatch",
  storageBucket: "somniwatch.firebasestorage.app",
  messagingSenderId: "62892827078",
  appId: "1:62892827078:web:e2834805a39b73f319d2c7"
}

const app = initializeApp(FIREBASE_CONFIG)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const MASTER_UID = 'k2t053MSV8OXmzKUcs83wMNu8nX2'
