import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";  // ✅ Import Realtime Database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPaRK957PSzX2BdsSDPg0iIXYecD6ip0s",
  authDomain: "ai-code-editor-35610.firebaseapp.com",
  projectId: "ai-code-editor-35610",
  storageBucket: "ai-code-editor-35610.firebasestorage.app",
  messagingSenderId: "588164802568",
  appId: "1:588164802568:web:7d27184b80c39607b049bd",
  measurementId: "G-50RJTK3BCZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const firestore = getFirestore(app);
const rtdb = getDatabase(app);  // ✅ Initialize Realtime Database

// Set Auth Persistence
setPersistence(auth, browserLocalPersistence)
  .then(() => console.log("Firebase Auth Persistence Set to Local"))
  .catch((error) => console.error("Firebase Auth Persistence Error:", error));

export { auth, db, rtdb, firestore };
export default app;
