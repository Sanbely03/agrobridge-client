// src/App.tsx (or App.jsx)
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Or HomePage if you named it that
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage'; // <--- Import the new ServicesPage

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} /> {/* Add this line */}
      {/* You will add routes for /contact, /forum, /marketplace etc. later */}
    </Routes>
  );
}

export default App;