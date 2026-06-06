import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: "AIzaSyDcFhk4odZiPt5Lh9Uml_mk9obPK3C3Su0",
  authDomain: "inf124-food-app.firebaseapp.com",
  projectId: "inf124-food-app",
  storageBucket: "inf124-food-app.firebasestorage.app",
  messagingSenderId: "250864493523",
  appId: "1:250864493523:web:376a519a11285fa9b08526",
  measurementId: "G-GJRF44ZB7G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
