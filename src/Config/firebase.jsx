// Import the functions you need from the modular SDK
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkmFOpWm9mhYNuz_DluzQOjIRaRLlHWbg",
  authDomain: "fester-meetup.firebaseapp.com",
  projectId: "fester-meetup",
  storageBucket: "fester-meetup.appspot.com",
  messagingSenderId: "769795942499",
  appId: "1:769795942499:web:08ca9ad2ea486dc8fb7056",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); // Correctly initialize Firestore
