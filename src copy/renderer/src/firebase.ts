// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAY1hJoub4dDCoTglKHK6CKTgZ1wt4mpdo',
  authDomain: 'intelligence-65a9e.firebaseapp.com',
  projectId: 'intelligence-65a9e',
  storageBucket: 'intelligence-65a9e.appspot.com',
  messagingSenderId: '434950425402',
  appId: '1:434950425402:web:9aeae551bf827f4ed39e03',
  measurementId: 'G-YP6E3DNCP0'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const db = getFirestore(app)
