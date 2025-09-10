// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC7SM1PKnG-EMHDqUGYDr_0UwEABIm_rOI',
  authDomain: 'smart-recruitment-764c1.firebaseapp.com',
  projectId: 'smart-recruitment-764c1',
  storageBucket: 'smart-recruitment-764c1.firebasestorage.app',
  messagingSenderId: '657077383226',
  appId: '1:657077383226:web:bf8b3fb0666590bac54503',
  measurementId: 'G-VWMWCXXZTX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;
export const auth = getAuth(app);
