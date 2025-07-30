// new-frontend/src/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from '../../firebaseConfig'; // Import Firebase auth and Firestore DB
import { User as FirebaseUser } from 'firebase/auth'; // Alias for Firebase User type
import { doc, getDoc, setDoc } from 'firebase/firestore'; // For Firestore operations
import axios from 'axios'; // For custom backend calls (e.g., if roles are in your custom DB)

// Define the shape of our custom user object (includes role)
interface CustomUser {
  uid: string; // Firebase User ID
  email: string;
  fullName?: string;
  role: string; // This is the custom role we fetch/store
  // Add other custom user properties as needed
}

interface AuthContextType {
  currentUser: FirebaseUser | null; // Firebase's user object
  user: CustomUser | null; // Our custom user object (with role)
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string, initialRole: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null); // From Firebase
  const [user, setUser] = useState<CustomUser | null>(null); // Our custom user object with role
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Base URL for your custom backend API (if you use it for roles)
  const API_BASE_URL = 'http://localhost:5000/api'; // CONFIRM THIS IS YOUR BACKEND URL

  useEffect(() => {
    // Firebase listener for authentication state changes
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        setCurrentUser(firebaseUser);
        setIsAuthenticated(true);

        // --- Fetch custom user data (including role) from your backend or Firestore ---
        // Option A: Fetch from your custom backend (if roles are there)
        try {
          // This endpoint should accept Firebase user's UID or ID token,
          // validate it, and return your custom user data (including role).
          // If your backend authenticates, it might issue its own JWT.
          const idToken = await firebaseUser.getIdToken();
          const response = await axios.get(`${API_BASE_URL}/user/profile`, {
            headers: { Authorization: `Bearer ${idToken}` }
          });
          const customUserData: CustomUser = response.data.user; // Assuming response.data.user has uid, email, role etc.
          setUser(customUserData);
        } catch (error) {
          console.error("Failed to fetch custom user data from backend:", error);
          // If backend fails, you might still want to proceed with FirebaseUser or force logout
          setUser({ uid: firebaseUser.uid, email: firebaseUser.email || '', role: 'unknown' }); // Fallback
        }

        // Option B: Fetch from Firestore (if roles are stored there by your Firebase backend functions)
        // try {
        //   const userDocRef = doc(db, 'users', firebaseUser.uid);
        //   const userDoc = await getDoc(userDocRef);
        //   if (userDoc.exists()) {
        //     setUser({ uid: firebaseUser.uid, ...userDoc.data() } as CustomUser);
        //   } else {
        //     // Handle case where user document doesn't exist (e.g., new user)
        //     setUser({ uid: firebaseUser.uid, email: firebaseUser.email || '', role: 'unknown' });
        //   }
        // } catch (error) {
        //   console.error("Failed to fetch custom user data from Firestore:", error);
        //   setUser({ uid: firebaseUser.uid, email: firebaseUser.email || '', role: 'unknown' }); // Fallback
        // }
        // ---------------------------------------------------------------------------------

      } else {
        setCurrentUser(null);
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []); // Empty dependency array means this runs once on mount

  // Firebase login (assuming you don't use custom backend login for auth)
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const firebaseUser = userCredential.user;

      if (firebaseUser) {
        setCurrentUser(firebaseUser);
        setIsAuthenticated(true);

        // --- Post-login: Fetch custom user data (including role) from your backend ---
        // This is crucial for role-based redirection immediately after login
        const idToken = await firebaseUser.getIdToken();
        const response = await axios.get(`${API_BASE_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${idToken}` }
        });
        const customUserData: CustomUser = response.data.user;
        setUser(customUserData);

        // You might also want to store custom user data in localStorage if you need it persisted across sessions
        localStorage.setItem('customUser', JSON.stringify(customUserData));

      }
    } catch (error: any) {
      console.error("Firebase Login failed:", error.message);
      throw new Error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Firebase registration with initial role assignment in your custom backend/Firestore
  const register = async (email: string, password: string, fullName: string, initialRole: string = 'farmer') => {
    setLoading(true);
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const firebaseUser = userCredential.user;

      if (firebaseUser) {
        // Update Firebase profile (optional)
        await firebaseUser.updateProfile({ displayName: fullName });

        // --- Store custom user data (including role) in your backend or Firestore ---
        // Option A: Send to your custom backend (recommended if your custom DB manages roles)
        const idToken = await firebaseUser.getIdToken();
        const response = await axios.post(`${API_BASE_URL}/auth/register-user-data`, {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          fullName: fullName,
          role: initialRole // Pass the role to your backend
        }, {
          headers: { Authorization: `Bearer ${idToken}` }
        });
        const customUserData: CustomUser = response.data.user; // Assuming backend returns the created user data
        setUser(customUserData);
        localStorage.setItem('customUser', JSON.stringify(customUserData));


        // Option B: Store directly in Firestore (if using Firestore for roles and no custom backend for this)
        // const userDocRef = doc(db, 'users', firebaseUser.uid);
        // await setDoc(userDocRef, {
        //   email: firebaseUser.email,
        //   fullName: fullName,
        //   role: initialRole, // Set the initial role here
        //   createdAt: new Date()
        // });
        // setUser({ uid: firebaseUser.uid, email: firebaseUser.email || '', fullName: fullName, role: initialRole });
        // ---------------------------------------------------------------------------------

        setCurrentUser(firebaseUser);
        setIsAuthenticated(true);
      }
    } catch (error: any) {
      console.error("Firebase Registration failed:", error.message);
      throw new Error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await auth.signOut(); // Firebase sign out
    setCurrentUser(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('customUser'); // Clear custom user data from localStorage
  };

  return (
    <AuthContext.Provider value={{ currentUser, user, isAuthenticated, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};