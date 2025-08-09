import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import UserLayout from "./components/layout/UserLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import MarketplacePage from "./pages/MarketplacePage";
import FarmerLogin from "./components/auth/FarmerLogin";
import FarmerRegistration from "./components/auth/FarmerRegistration";


import ForumPage from "./pages/ForumPage";  // <-- Import ForumPage here
import DashboardPage from "./pages/user/DashboardPage";
import ProfilePage from "./pages/user/ProfilePage";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />      
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/forum" element={<ForumPage />} /> 
         {/* Add Forum route */}
         
  {/* Farmer Auth Pages */}
  <Route path="/login" element={<FarmerLogin />} />
  <Route path="/signup" element={<FarmerRegistration />} />

      </Route>

      {/* User Routes */}
      <Route element={<UserLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}
