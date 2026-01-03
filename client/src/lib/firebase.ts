import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "calmus-cb823.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "calmus-cb823",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "calmus-cb823.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "417612821598",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:417612821598:web:44a473883b928b6d4170cf",
  measurementId: "G-VHPRQPZY14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
