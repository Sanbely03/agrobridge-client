import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Facebook, Twitter, Linkedin, Phone, MessageSquare } from "lucide-react";
import logo from "@/assets/agrobridge_logo.png"; // Make sure logo path is correct

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER */}
      <header className="bg-green-800 text-white px-6 py-4 flex items-center justify-between shadow">
        <img src={logo} alt="AgroBridge Logo" className="w-12 h-12" />
        <nav className="flex gap-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/services" className="hover:underline">Services</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
          <Link to="/forum" className="hover:underline">Forum</Link>
        </nav>
      </header>

      {/* MAIN SECTION */}
      <main className="flex-grow flex items-center justify-center py-20 px-6 bg-green-100">
        <Card className="bg-white shadow-lg rounded-2xl max-w-xl w-full">
          <CardContent className="p-6 text-center space-y-4">
            <h2 className="text-3xl font-semibold text-green-800">Empowering Farmers, Enriching Nations</h2>
            <p className="text-gray-600">
              AgroBridge connects farmers with modern tools, resources, and community for sustainable growth.
            </p>
            <div className="flex justify-center space-x-4">
              <Button className="bg-yellow-500 text-white hover:bg-yellow-600">Get Started</Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* SOCIAL MEDIA & FOOTER */}
      <footer className="bg-yellow-200 border-t border-yellow-400 text-sm text-brown-900 py-6 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="space-y-2">
            <h3 className="font-semibold text-brown-800">Contact</h3>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> Agrobridge_247@gmail.com</p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> Agrobridge_247@yahoo.com</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-brown-800">Socials</h3>
            <div className="flex gap-3">
              <Facebook className="w-5 h-5" />
              <Twitter className="w-5 h-5" />
              <Linkedin className="w-5 h-5" />
              <MessageSquare className="w-5 h-5" title="Telegram" />
              <Phone className="w-5 h-5" title="WhatsApp" />
            </div>
          </div>
          <div className="text-right md:text-left">
            <p className="text-xs">&copy; {new Date().getFullYear()} AgroBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
