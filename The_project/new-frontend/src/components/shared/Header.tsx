// new-frontend/src/components/shared/Header.tsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // This uses an alias, should be fine for shadcn components
import logo from "@/assets/Agrobridge_logo.png"; // This uses an alias, should be fine for assets

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";

// --- CRITICAL CHANGE HERE ---
import { useAuth } from "../../context/AuthContext"; // <--- CHANGE THIS LINE
import { auth } from "../../firebaseConfig"; // <--- CHANGE THIS LINE TOO (if firebaseConfig is in src/ too)
// ----------------------------

export function Header() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <header className="bg-white text-green-900 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Site Title */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="AgroBridge Logo"
              className="h-16 w-auto rounded-md"
            />
            <span className="text-2xl font-bold text-green-800">AgroBridge</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-green-700 hover:text-green-900 font-medium transition-colors duration-300">Home</Link>
          <Link to="/about" className="text-green-700 hover:text-green-900 font-medium transition-colors duration-300">About</Link>
          <Link to="/services" className="text-green-700 hover:text-green-900 font-medium transition-colors duration-300">Services</Link>
          <Link to="/contact" className="text-green-700 hover:text-green-900 font-medium transition-colors duration-300">Contact Us</Link>
          <Link to="/forum" className="text-green-700 hover:text-green-900 font-medium transition-colors duration-300">Forum</Link>
          <Link to="/marketplace" className="text-green-700 hover:text-green-900 font-medium transition-colors duration-300">Marketplace</Link>
          {currentUser && (
            <Link to="/dashboard" className="text-green-700 hover:text-green-900 font-medium transition-colors duration-300">Dashboard</Link>
          )}
        </div>

        {/* Login/Signup or Dashboard/Logout Buttons */}
        <div className="flex gap-3">
          {currentUser ? (
            <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white">
              Logout
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation (Hamburger Menu) */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <Menu className="h-6 w-6 text-green-800" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] flex flex-col pt-10">
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold text-green-800 border-b pb-4 mb-4">AgroBridge Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 text-lg font-medium">
                <Link to="/" className="text-green-700 hover:text-green-900 py-2 border-b last:border-b-0" onClick={() => document.getElementById('sheet-trigger')?.click()}>Home</Link>
                <Link to="/about" className="text-green-700 hover:text-green-900 py-2 border-b last:border-b-0" onClick={() => document.getElementById('sheet-trigger')?.click()}>About</Link>
                <Link to="/services" className="text-green-700 hover:text-green-900 py-2 border-b last:border-b-0" onClick={() => document.getElementById('sheet-trigger')?.click()}>Services</Link>
                <Link to="/contact" className="text-green-700 hover:text-green-900 py-2 border-b last:border-b-0" onClick={() => document.getElementById('sheet-trigger')?.click()}>Contact Us</Link>
                <Link to="/forum" className="text-green-700 hover:text-green-900 py-2 border-b last:border-b-0" onClick={() => document.getElementById('sheet-trigger')?.click()}>Forum</Link>
                <Link to="/marketplace" className="text-green-700 hover:text-green-900 py-2 border-b last:border-b-0" onClick={() => document.getElementById('sheet-trigger')?.click()}>Marketplace</Link>
                {currentUser && (
                  <Link to="/dashboard" className="text-green-700 hover:text-green-900 py-2 border-b last:border-b-0" onClick={() => document.getElementById('sheet-trigger')?.click()}>Dashboard</Link>
                )}

                {currentUser ? (
                  <Button
                    onClick={() => {
                      handleLogout();
                      document.getElementById('sheet-trigger')?.click();
                    }}
                    className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Link to="/login" className="py-2 mt-4" onClick={() => document.getElementById('sheet-trigger')?.click()}>
                      <Button variant="outline" className="w-full">Login</Button>
                    </Link>
                    <Link to="/signup" className="py-2" onClick={() => document.getElementById('sheet-trigger')?.click()}>
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}