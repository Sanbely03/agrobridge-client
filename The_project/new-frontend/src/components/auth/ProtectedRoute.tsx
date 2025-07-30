// new-frontend/src/components/auth/ProtectedRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // Optional: specify roles allowed to access this route
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth(); // Use isAuthenticated and custom 'user' object

  if (loading) {
    // Show a loading spinner or message while authentication status is being determined
    return <div className="flex justify-center items-center min-h-[calc(100vh-120px)] p-4 text-gray-600">Loading...</div>;
  }

  if (!isAuthenticated) {
    // If not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // If authenticated but role is not allowed, redirect to a "not authorized" page or home
    console.warn(`User with role '${user.role}' tried to access a restricted page.`);
    // You can redirect to /unauthorized or /home based on your preference
    return <Navigate to="/" replace />; // Redirect to home if role is not allowed
  }

  // If authenticated and role is allowed (or no roles specified), render the children
  return <>{children}</>;
};

export default ProtectedRoute;