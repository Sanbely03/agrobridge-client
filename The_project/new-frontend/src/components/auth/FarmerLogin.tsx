// new-frontend/src/components/auth/FarmerLogin.tsx

import React, { useState } from 'react';
import { auth } from '../../firebaseConfig'; // Import the auth object
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase login function
import { useNavigate } from 'react-router-dom'; // For navigation after login

const FarmerLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccess(null); // Clear previous success messages

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess('Login successful! Redirecting to dashboard...');
      // Redirect to a dashboard or home page after successful login
      navigate('/dashboard'); // You will create a dashboard route later
    } catch (err: any) {
      console.error("Failed to login:", err);
      setError(`Failed to login: ${err.message}`);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '400px',
        textAlign: 'center'
      }}>
        <h2>Farmer Login</h2>
        {success && <p style={{ color: 'green', marginBottom: '15px' }}>{success}</p>}
        {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: 'calc(100% - 20px)',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '16px'
              }}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: 'calc(100% - 20px)',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '16px'
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '5px',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
          >
            Login
          </button>
        </form>
        <p style={{ marginTop: '20px', fontSize: '14px' }}>
          Don't have an account? <a href="/signup" style={{ color: '#4CAF50', textDecoration: 'none' }}>Register here</a>
        </p>
      </div>
    </div>
  );
};

export default FarmerLogin;