// src/components/shared/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/Agrobridge_logo.png"; // Or "@/assets/agrobridge_logo.png" if lowercase

export function Header() {
  return (
    <header className="bg-white text-green-900 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="AgroBridge Logo"
              className="h-16 w-auto rounded-md" // Adjusted to h-16 as discussed
            />
            <span className="text-2xl font-bold text-green-800">AgroBridge</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          {/* Added transition-colors for smooth hover effect */}
          <Link to="/" className="text-green-700 hover:text-green-900 font-medium transition-colors duration-300">Home</Link>
          <Link to="/about" className="text-green-700 hover:text-green-900 font-medium transition-colors duration-300">About</Link>
          <Link to="/services" className="text-green-700 hover:text-green-900 font-medium transition-colors duration-300">Services</Link>
          <Link to="/contact" className="text-green-700 hover:text-green-900 font-medium transition-colors duration-300">Contact Us</Link>
          <Link to="/forum" className="text-green-700 hover:text-green-900 font-medium transition-colors duration-300">Forum</Link>
          <Link to="/marketplace" className="text-green-700 hover:text-green-900 font-medium transition-colors duration-300">Marketplace</Link>
        </div>
        <div className="flex gap-3">
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}