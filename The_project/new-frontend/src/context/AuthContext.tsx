// new-frontend/src/context/AuthContext.tsx

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth } from '../firebaseConfig'; // Import your Firebase auth instance
import { onAuthStateChanged } from 'firebase/auth'; // Import only onAuthStateChanged as a value
import type { User } from 'firebase/auth'; // <--- IMPORT User AS A TYPE HERE

// Define the shape of our authentication context
interface AuthContextType {
  currentUser: User | null; // Stores the current logged-in user or null if not logged in
  loading: boolean; // Indicates if the authentication state is still being loaded
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define props for AuthProvider
interface AuthProviderProps {
  children: ReactNode; // Children components to be rendered within the provider
}

// Create the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    currentUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily consume the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};