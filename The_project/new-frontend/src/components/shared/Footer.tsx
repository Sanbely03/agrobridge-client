// src/components/shared/Footer.tsx

import React from "react";
import { Mail, Facebook, Twitter, Linkedin, Phone, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-green-100 text-green-900 border-t border-green-300 text-sm py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Contact Section */}
        <div className="space-y-2">
          <h3 className="font-semibold text-green-800">Contact</h3>
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4" /> Agrobridge_247@gmail.com
          </p>
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4" /> Agrobridge_247@yahoo.com
          </p>
        </div>

        {/* Social Media Section */}
        <div className="space-y-2">
          <h3 className="font-semibold text-green-800">Socials</h3>
          <div className="flex gap-3">
            <Facebook className="w-5 h-5 hover:text-blue-600" />
            <Twitter className="w-5 h-5 hover:text-blue-400" />
            <Linkedin className="w-5 h-5 hover:text-blue-700" />
            <MessageSquare className="w-5 h-5" title="Telegram" />
            <Phone className="w-5 h-5" title="WhatsApp" />
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-right md:text-left">
          <p className="text-xs mt-2">
            &copy; {new Date().getFullYear()} AgroBridge. All rights reserved.
          </p>
        </div>
        
      </div>
    </footer>
  );
}

