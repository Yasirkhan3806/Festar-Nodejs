// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkmFOpWm9mhYNuz_DluzQOjIRaRLlHWbg",
  authDomain: "fester-meetup.firebaseapp.com",
  projectId: "fester-meetup",
  storageBucket: "fester-meetup.appspot.com",
  messagingSenderId: "769795942499",
  appId: "1:769795942499:web:08ca9ad2ea486dc8fb7056"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore
export const db = getFirestore(app);