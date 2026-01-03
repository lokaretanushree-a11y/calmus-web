import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "calmus-cb823.firebaseapp.com",
  projectId: "calmus-cb823",
  storageBucket: "calmus-cb823.firebasestorage.app",
  messagingSenderId: "417612821598",
  appId: "1:417612821598:web:080d634b656807354170cf",
  measurementId: "G-FBJMTCRCP2",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
