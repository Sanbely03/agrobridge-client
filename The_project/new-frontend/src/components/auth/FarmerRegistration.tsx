// src/components/auth/FarmerRegistration.tsx
import React, { useState } from 'react';
import { auth, db } from '../../firebaseConfig'; // Ensure you have firebaseConfig.js
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// Define the functional component with React.FC type
const FarmerRegistration: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleRegister = async (e: React.FormEvent) => { // Type 'e' as React.FormEvent
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      // 1. Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Send email verification
      await sendEmailVerification(user);
      setMessage('Registration successful! Please check your email to verify your account before logging in.');

      // 3. Store additional user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        name: name,
        role: 'farmer', // Assigning 'farmer' role by default for this registration
        createdAt: new Date(),
        // Initialize wallets as per our blueprint
        withdrawableBalance: 0,
        nonWithdrawableLoanBalance: 0,
        isEmailVerified: false, // Will be updated by Firebase automatically on verification
        farmCoordinates: null, // To be updated later in the loan application
        isAccountVerifiedByAgent: false, // For later agent verification
        communityAssociationId: null, // For later community verification
      });

      // Clear form
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');

    } catch (err: any) { // Type 'err' as 'any' for now, or use specific FirebaseError type if imported
      console.error("Registration error:", err);
      // Firebase error handling
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('The email address is already in use by another account.');
          break;
        case 'auth/invalid-email':
          setError('The email address is not valid.');
          break;
        case 'auth/weak-password':
          setError('The password is too weak. Please choose a stronger password.');
          break;
        default:
          setError('Failed to register: ' + err.message);
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Farmer Registration</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        {error && <p style={styles.error}>{error}</p>}
        {message && <p style={styles.message}>{message}</p>}

        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Full Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="confirmPassword" style={styles.label}>Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p style={styles.loginLink}>
        Already have an account? <a href="/login" style={styles.link}>Login here</a>
      </p>
    </div>
  );
};

// Basic Inline Styles (You'll replace this with proper CSS or a UI library)
const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: 'calc(100% - 20px)',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  buttonDisabled: {
    backgroundColor: '#a5d6a7',
    cursor: 'not-allowed',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
    textAlign: 'center',
  },
  message: {
    color: 'green',
    marginBottom: '10px',
    textAlign: 'center',
  },
  loginLink: {
    textAlign: 'center',
    marginTop: '20px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default FarmerRegistration;