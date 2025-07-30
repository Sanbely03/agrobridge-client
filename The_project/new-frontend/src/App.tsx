// new-frontend/src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Services from './components/pages/Services';
import Contact from './components/pages/Contact';
import Forum from './components/pages/Forum';
import Marketplace from './components/pages/Marketplace';
import FarmerLogin from './components/auth/FarmerLogin'; // Use FarmerLogin
import FarmerRegistration from './components/auth/FarmerRegistration';
import FarmerDashboard from './components/dashboards/FarmerDashboard';
import InvestorDashboard from './components/dashboards/InvestorDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import { AuthProvider, useAuth } from './context/AuthContext'; // Import useAuth to access user role
import ProtectedRoute from './components/auth/ProtectedRoute';

// LayoutWrapper component to conditionally render Header/Footer
const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { loading } = useAuth(); // Only need loading here to prevent flickering

  // Define paths where Header and Footer should NOT be displayed
  const noHeaderFooterPaths = [
    '/farmer-dashboard',
    '/investor-dashboard',
    '/admin-dashboard',
    // Add other dashboard-like paths here if they shouldn't have global header/footer
  ];

  const shouldShowHeaderFooter = !noHeaderFooterPaths.includes(location.pathname);

  // If loading, you might want a loading spinner or blank page
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        Loading application...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {shouldShowHeaderFooter && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      {shouldShowHeaderFooter && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <LayoutWrapper>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/login" element={<FarmerLogin />} /> {/* Use FarmerLogin here */}
            <Route path="/signup" element={<FarmerRegistration />} />

            {/* Protected Dashboard Routes */}
            <Route path="/farmer-dashboard" element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <FarmerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/investor-dashboard" element={
              <ProtectedRoute allowedRoles={['investor']}>
                <InvestorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin-dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            {/* General Dashboard Route (Fallback, can be removed later) */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <FarmerDashboard /> {/* Default dashboard for authenticated users without specific role route */}
              </ProtectedRoute>
            } />

            {/* Fallback for unmatched routes */}
            <Route path="*" element={<h1 className="text-center text-3xl p-10">404 - Page Not Found</h1>} />
          </Routes>
        </LayoutWrapper>
      </AuthProvider>
    </Router>
  );
};

export default App;