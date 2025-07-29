// new-frontend/src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import ForumPage from './pages/ForumPage';
import FarmerRegistration from './components/auth/FarmerRegistration';
import FarmerLogin from './components/auth/FarmerLogin';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardPage from './pages/DashboardPage'; // Already imported

// Import the MainLayout
import MainLayout from './components/layout/MainLayout'; // Already imported

// Your placeholder components (these are fine)
const LoansPage = () => <div style={{padding: '20px', textAlign: 'center'}}><h2>Loans Page (Protected)</h2><p>Apply for a loan here.</p></div>;
const ProductsPage = () => <div style={{padding: '20px', textAlign: 'center'}}><h2>Products Page (Protected)</h2><p>Browse fertilizers and seeds.</p></div>;
const EquipmentPage = () => <div style={{padding: '20px', textAlign: 'center'}}><h2>Equipment Page (Protected)</h2><p>Find tractors and tools for rent.</p></div>;
const AnalyticsPage = () => <div style={{padding: '20px', textAlign: 'center'}}><h2>Analytics Page (Protected)</h2><p>View crop sales predictions.</p></div>;
const LandPage = () => <div style={{padding: '20px', textAlign: 'center'}}><h2>Land Lease Page (Protected)</h2><p>Explore land listings.</p></div>;
const LaborPage = () => <div style={{padding: '20px', textAlign: 'center'}}><h2>Labor Market Page (Protected)</h2><p>Connect with agricultural labor.</p></div>;
const MarketplacePage = () => <div style={{padding: '20px', textAlign: 'center'}}><h2>Marketplace Page (Protected)</h2><p>Buy and sell produce.</p></div>;


function App() {
  return (
    <Routes>
      {/*
        THIS IS THE CRITICAL CHANGE:
        Move the /dashboard route OUTSIDE of MainLayout.
        It will now render ProtectedRoute and DashboardPage directly,
        without being wrapped by MainLayout.
      */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage /> {/* DashboardPage will now handle its own full layout */}
          </ProtectedRoute>
        }
      />

      {/*
        All other routes that *SHOULD* have the standard Header/Footer
        provided by MainLayout remain nested here.
      */}
      <Route element={<MainLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />

        {/* Authentication Routes (these typically need the main app header/footer) */}
        <Route path="/register" element={<FarmerRegistration />} />
        <Route path="/signup" element={<FarmerRegistration />} />
        <Route path="/login" element={<FarmerLogin />} />

        {/* Other Protected Routes that *DO* need MainLayout */}
        <Route path="/loans" element={<ProtectedRoute><LoansPage /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
        <Route path="/equipment" element={<ProtectedRoute><EquipmentPage /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
        <Route path="/land" element={<ProtectedRoute><LandPage /></ProtectedRoute>} />
        <Route path="/labor" element={<ProtectedRoute><LaborPage /></ProtectedRoute>} />
      </Route>

      {/* Fallback route for any undefined paths */}
      <Route path="*" element={
        <div style={{padding: '50px', textAlign: 'center'}}>
          <h2>404 - Page Not Found</h2>
          <p>The page you are looking for does not exist.</p>
          <p><a href="/" style={{color: '#4CAF50'}}>Go to Home</a></p>
        </div>
      } />

    </Routes>
  );
}

export default App;