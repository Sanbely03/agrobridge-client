// new-frontend/src/components/auth/ProtectedRoute.tsx

import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import our custom auth hook

interface ProtectedRouteProps {
  children: ReactNode; // The component(s) that this route is protecting
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth(); // Get current user and loading status from AuthContext

  // If auth state is still loading, show a loading message/spinner
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        fontSize: '20px',
        color: '#333'
      }}>
        Loading user session...
      </div>
    );
  }

  // If there's no current user (not logged in), redirect to the login page
  if (!currentUser) {
    // Navigate component is used for declarative navigation
    return <Navigate to="/login" replace />; // 'replace' prevents adding to history stack
  }

  // If user is logged in, render the children components (the protected content)
  return <>{children}</>;
};

export default ProtectedRoute;