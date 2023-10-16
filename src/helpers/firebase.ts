import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { Firestore, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyD-CPaAQzlRUn-wx8WDJ7ZN6ztWwKonzcY',
  authDomain: 'chatdevzapp.firebaseapp.com',
  databaseURL: 'https://chatdevzapp-default-rtdb.firebaseio.com',
  projectId: 'chatdevzapp',
  storageBucket: 'chatdevzapp.appspot.com',
  messagingSenderId: '743068149338',
  appId: '1:743068149338:web:4a42ee8e1adfa9e8741a63',
  measurementId: 'G-GHJTFV0C23',
}

let _firestore: Firestore = null
let auth = null
let provider = null

function initFirebaseBackend() {
  const app = initializeApp(firebaseConfig)

  if (!_firestore) {
    _firestore = getFirestore(app)
  }

  if (!auth) {
    auth = getAuth(app)
  }

  if (!provider) {
    provider = new GoogleAuthProvider()
  }
}

export { auth, _firestore, initFirebaseBackend, provider }
