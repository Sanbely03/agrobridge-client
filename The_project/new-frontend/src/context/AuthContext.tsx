// new-frontend/src/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Define the shape of the user object (assuming your backend returns this)
interface User {
  id: string;
  email: string;
  fullName?: string; // Optional, based on your registration form
  role: string; // Add role here
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Initial loading for checking token
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Base URL for your backend API
  const API_BASE_URL = 'http://localhost:5000/api'; // Make sure this matches your backend

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // You might need a /api/auth/me or /api/user/profile endpoint on your backend
          // that returns user details (including role) based on the token.
          // For now, let's assume successful token presence implies authentication.
          // In a real app, you'd validate the token with the backend.
          // If your backend's login/register already returns user data, we can directly use it.

          // *** IMPORTANT: You need a backend endpoint that can validate the token
          //    and return user details including their role.
          //    If you don't have one, the 'role' will remain null here initially.
          //    We'll rely on the login/register function's response for setting role.

          // Mock user data for initial load if token exists but no /me endpoint yet
          // This part should be replaced by an actual API call for security and accuracy
          const storedUserString = localStorage.getItem('user');
          if (storedUserString) {
            const storedUser: User = JSON.parse(storedUserString);
            setUser(storedUser);
            setIsAuthenticated(true);
          } else {
            // Fallback: If token exists but no user data, assume basic auth
            // This is not ideal for production, but allows progress
            setIsAuthenticated(true);
            setUser({ id: 'temp-id', email: 'temp@example.com', role: 'unknown' });
          }

        } catch (error) {
          console.error("Failed to load user from token:", error);
          localStorage.removeItem('token');
          localStorage.removeItem('user'); // Clear potentially stale user data
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      const { token, user: userData } = response.data; // Assuming backend returns { token, user: { id, email, role, ... } }
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData)); // Store user data including role
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, fullName) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, { email, password, fullName });
      const { token, user: userData } = response.data; // Assuming backend returns { token, user: { id, email, role, ... } }
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData)); // Store user data including role
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error("Registration failed:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
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