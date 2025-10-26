// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBcvJn8w9fjCQkPvkIqCC5cTsbVHtgzxAs',
  authDomain: 'smart-recruitment-9dc23.firebaseapp.com',
  projectId: 'smart-recruitment-9dc23',
  storageBucket: 'smart-recruitment-9dc23.firebasestorage.app',
  messagingSenderId: '25432278348',
  appId: '1:25432278348:web:1a58f8381ee8f2cbf7bbe9',
  measurementId: 'G-HSF2V18EE2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;
export const auth = getAuth(app);

let _resolveAuth: (user: User | null) => void;
export const authReady = new Promise(resolve => {
  _resolveAuth = resolve;
});

onAuthStateChanged(auth, async user => {
  _resolveAuth(user);
});
