// new-frontend/src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header'; // Assuming your Header component path
import Footer from './components/layout/Footer'; // Assuming your Footer component path
import Home from './components/pages/Home';
import About from './components/pages/About';
import Services from './components/pages/Services';
import Contact from './components/pages/Contact';
import Forum from './components/pages/Forum';
import Marketplace from './components/pages/Marketplace'; // Assuming your Marketplace component path
import Login from './components/auth/Login';
import FarmerRegistration from './components/auth/FarmerRegistration';
import FarmerDashboard from './components/dashboards/FarmerDashboard'; // Import FarmerDashboard
import InvestorDashboard from './components/dashboards/InvestorDashboard'; // Import InvestorDashboard
import AdminDashboard from './components/dashboards/AdminDashboard'; // Import AdminDashboard
import { AuthProvider, useAuth } from './context/AuthContext'; // Import useAuth to access user role
import ProtectedRoute from './components/auth/ProtectedRoute'; // We'll create this next for better protection

// LayoutWrapper component to conditionally render Header/Footer
const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, user, loading } = useAuth(); // Use auth context to check user status and role

  // Define paths where Header and Footer should NOT be displayed
  // This array can be expanded as needed
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
      <AuthProvider> {/* AuthProvider wraps the entire application */}
        <LayoutWrapper>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/marketplace" element={<Marketplace />} /> {/* Marketplace can be public/protected based on MVP */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<FarmerRegistration />} /> {/* Assuming signup is for farmers initially */}

            {/* Protected Dashboard Routes - Basic protection, will be enhanced */}
            {/* The 'element' here directly uses the dashboard component */}
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

            {/* General Dashboard Route (Fallback, can be removed if all roles have specific dashboards) */}
            <Route path="/dashboard" element={
              <ProtectedRoute> {/* No specific roles means any authenticated user */}
                <FarmerDashboard /> {/* Can be a generic dashboard or redirect to farmer dashboard for now */}
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