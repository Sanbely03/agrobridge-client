// new-frontend/src/firebaseConfig.ts

// Import the functions you need from the Firebase SDKs
import { initializeApp } from 'firebase/app';         // For initializing the Firebase app
import { getAuth } from 'firebase/auth';             // For Firebase Authentication services
import { getFirestore } from 'firebase/firestore';   // For Cloud Firestore Database services

// Your web app's Firebase configuration
// This is UNIQUE to YOUR Firebase project.
// You MUST replace the placeholder values below with the actual credentials
// you copied from YOUR Firebase project's settings in the Firebase Console.
const firebaseConfig = {apiKey: "AIzaSyBpBSICOxeilZb-GvJgj9gEfUN364TdZ_4",
  authDomain: "agrobridge-platform.firebaseapp.com",
  projectId: "agrobridge-platform",
  storageBucket: "agrobridge-platform.firebasestorage.app",
  messagingSenderId: "868591678998",
  appId: "1:868591678998:web:0aaf7b2beda637567c6737"
};

// Initialize Firebase
// This line uses the 'firebaseConfig' you just defined to connect to your project.
const app = initializeApp(firebaseConfig);

// Get a reference to the Auth service
// This 'auth' object will be used for all authentication operations (register, login, logout, etc.)
const auth = getAuth(app);

// Get a reference to the Cloud Firestore database service
// This 'db' object will be used for all database operations (add, get, update, delete data)
const db = getFirestore(app);

// Export these initialized services so they can be imported and used throughout your application
export { auth, db };