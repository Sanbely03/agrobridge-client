// // new-frontend/src/firebaseConfig.ts

// // Import the functions you need from the Firebase SDKs
// import { initializeApp } from 'firebase/app';         // For initializing the Firebase app
// import { getAuth } from 'firebase/auth';             // For Firebase Authentication services
// import { getFirestore } from 'firebase/firestore';   // For Cloud Firestore Database services

// // Your web app's Firebase configuration
// // This is UNIQUE to YOUR Firebase project.
// // You MUST replace the placeholder values below with the actual credentials
// // you copied from YOUR Firebase project's settings in the Firebase Console.









// // Initialize Firebase
// // This line uses the 'firebaseConfig' you just defined to connect to your project.
// const app = initializeApp(firebaseConfig);

// // Get a reference to the Auth service
// // This 'auth' object will be used for all authentication operations (register, login, logout, etc.)
// const auth = getAuth(app);

// // Get a reference to the Cloud Firestore database service
// // This 'db' object will be used for all database operations (add, get, update, delete data)
// const db = getFirestore(app);

// // Export these initialized services so they can be imported and used throughout your application
// export { auth, db };





// Example of firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // If using Firestore for roles

// const firebaseConfig = {
//   // Your Firebase config details
//   apiKey: "...",
//   authDomain: "...",
//   projectId: "...",
//   storageBucket: "...",
//   messagingSenderId: "...",
//   appId: "...",
//   measurementId: "..."
// };


const firebaseConfig = {
  apiKey: "AIzaSyDY9o_a5iasulYzSDebwld4K1_ZML8B1yw",
  authDomain: "agrobridge-2a5fb.firebaseapp.com",
  projectId: "agrobridge-2a5fb",
  storageBucket: "agrobridge-2a5fb.firebasestorage.app",
  messagingSenderId: "337105958929",
  appId: "1:337105958929:web:c076e20f431de3a101d9b0"
};













const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export { auth, db }; // Export auth AND db