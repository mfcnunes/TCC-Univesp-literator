import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCDvnXMAsjWZvSAYdsOq6_y7humo-5U07A",
  authDomain: "literator-91efa.firebaseapp.com",
  projectId: "literator-91efa",
  storageBucket: "literator-91efa.firebasestorage.app",
  messagingSenderId: "1086679910241",
  appId: "1:1086679910241:web:68b507b6691d851966e720"
};

export const firebaseConfigured = true;
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
