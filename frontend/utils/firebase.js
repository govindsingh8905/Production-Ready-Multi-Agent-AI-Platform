// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cortex-ai-ed209.firebaseapp.com",
  projectId: "cortex-ai-ed209",
  storageBucket: "cortex-ai-ed209.firebasestorage.app",
  messagingSenderId: "429286585390",
  appId: "1:429286585390:web:62208dad984bd52fc49bbf",
  measurementId: "G-34P1MXYHM7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)

export const googleProvider = new GoogleAuthProvider()
