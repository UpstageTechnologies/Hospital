import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC6xYVGWKRk7hr2mqVH1Di7zw_aK40y56U",
  authDomain: "upstagehealth.firebaseapp.com",
  projectId: "upstagehealth",
  storageBucket: "upstagehealth.firebasestorage.app",
  messagingSenderId: "804607120412",
  appId: "1:804607120412:web:b7bdb0a8d996e1e7407bd9",
  measurementId: "G-LS4Z2GKSSS"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);