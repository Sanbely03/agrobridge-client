// src/pages/ContactPage.tsx

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { Header } from "@/components/shared/Header";
// import { Footer } from "@/components/shared/Footer";

// You can add an icon for contact, e.g., from lucide-react if desired
import { Mail, Phone, MapPin } from "lucide-react"; // Example icons

// You might want a specific background for the contact page hero
import contactHeroBg from "@/assets/contact_hero_bg.jpg"; // <--- Add a suitable image to src/assets

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}

      {/* Hero Section for Contact Page */}
      <section
        className="relative text-center py-24 md:py-32 px-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${contactHeroBg})` }} // Apply your image here
      >
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-green-900 opacity-70 backdrop-blur-sm"></div>

        {/* Content wrapper */}
        <div className="relative z-10 max-w-4xl mx-auto text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fade-in-up">
            Connect With AgroBridge
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 animate-fade-in-up animation-delay-300">
            Have questions, feedback, or need support? We're here to help!
          </p>
          <Link to="#contact-info"> {/* Scroll to contact info section */}
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-green-900 px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
              Reach Out
            </Button>
          </Link>
        </div>
      </section>

      {/* Contact Information Section */}
      <section id="contact-info" className="py-16 px-4 bg-white text-gray-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-10">Our Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="flex flex-col items-center p-6 bg-green-50 rounded-lg shadow-md">
              <Mail className="w-10 h-10 text-green-600 mb-3" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">Email Us</h3>
              <p className="text-gray-600 text-lg mb-2">support@agrobridge.africa</p>
              <a href="mailto:support@agrobridge.africa" className="text-blue-600 hover:underline">Send an Email</a>
            </div>
            <div className="flex flex-col items-center p-6 bg-green-50 rounded-lg shadow-md">
              <Phone className="w-10 h-10 text-green-600 mb-3" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">Call Us</h3>
              <p className="text-gray-600 text-lg mb-2">+234 700 123 4567</p>
              <a href="tel:+2347001234567" className="text-blue-600 hover:underline">Give us a Call</a>
            </div>
          </div>

          {/* Placeholder for Contact Form (Visual only for now) */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-green-800 mb-6">Send Us a Message</h3>
            <p className="text-gray-600 mb-4">
              Our contact form is coming soon! In the meantime, please reach out using the details above.
            </p>
            {/* You can add a visual representation of a form here using basic divs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <input type="text" placeholder="Your Name" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" disabled />
                <input type="email" placeholder="Your Email" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" disabled />
                <textarea placeholder="Your Message" rows={5} className="md:col-span-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" disabled></textarea>
                <Button className="md:col-span-2 bg-gray-300 text-gray-700 cursor-not-allowed">
                    Send Message (Coming Soon)
                </Button>
            </div>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
}