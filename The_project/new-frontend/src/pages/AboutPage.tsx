// src/pages/AboutPage.tsx

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { Header } from "@/components/shared/Header";
// import { Footer } from "@/components/shared/Footer";
import { Card, CardContent } from "@/components/ui/card";

// Import Lucide icons for the "What Makes Us Different" section
import {
  Sparkles,
  Users,
  ClipboardCheck,
  Leaf,
  Handshake,
  Lightbulb,
  Award,
} from "lucide-react";

// <--- IMPORT YOUR ABOUT PAGE HERO BACKGROUND IMAGE HERE ---
import aboutHeroBg from "@/assets/about_hero_bg.jpg"; // Replace with your actual image file name and path!

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      {/* <Header /> */}

      {/* 1. Hero Section for About Page - UPDATED WITH BLUR */}
      <section
        className="relative text-center py-24 md:py-32 px-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${aboutHeroBg})` }}
      >
        {/* Overlay for text readability - ADDED backdrop-blur-sm */}
        <div className="absolute inset-0 bg-green-900 opacity-70 backdrop-blur-sm"></div> {/* <--- ADDED THIS CLASS */}
    {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-green-900 opacity-70"></div> {/* Darker green overlay */}

        {/* Content wrapper to ensure text is above the overlay */}
        <div className="relative z-10 max-w-4xl mx-auto text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-up">
            About AgroBridge: Empowering Agriculture Digitally
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-300">
            We are committed to transforming agriculture through digital solutions and smart services, empowering farmers, agribusinesses, and innovators across Nigeria.
          </p>
          <Link to="/contact">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-green-900 px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
              Get In Touch
            </Button>
          </Link>
        </div>
      </section>

      {/* 2. Our Story Section (Placeholder/Optional)
      <section className="py-16 px-4 max-w-7xl mx-auto text-gray-700">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Our Story</h2>
        <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto">
          Born from a deep understanding of the challenges faced by Nigerian farmers, AgroBridge was founded with a vision to bridge gaps using technology... (Add your origin story here)
        </p>
      </section> */}

      {/* 3. Who We Are - Refined without a single large Card wrapper */}
      <section className="py-16 px-4 max-w-7xl mx-auto text-gray-700">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Who We Are</h2> {/* Increased mb-6 to mb-8 for more spacing */}
        <div className="grid md:grid-cols-2 gap-12 items-start bg-white p-8 rounded-2xl shadow-lg"> {/* Added bg-white, p-8, rounded-2xl, shadow-lg, and items-start */}
          <p className="text-lg leading-relaxed border-b md:border-b-0 md:border-r border-gray-200 pb-8 md:pb-0 md:pr-8"> {/* Added borders for separation */}
            AgroBridge is a technology-driven agricultural platform dedicated to transforming the Nigerian farming ecosystem. Our purpose is simple: to connect farmers, agribusinesses, and service providers into a unified, efficient, and profitable network.
          </p>
          <p className="text-lg leading-relaxed pt-8 md:pt-0 md:pl-8"> {/* Added padding for separation */}
            We are more than just a platform — we are a movement. A movement to empower rural communities, revolutionize agri-finance, simplify mechanization, and modernize food production.
          </p>
        </div>
      </section>

      {/* 4. Our Mission & Vision - Updated to use individual ShadCN Cards */}
      <section className="bg-green-50 py-16 px-4 text-gray-700">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8"> {/* Reduced gap from 12 to 8 for tighter cards */}
          {/* Mission Card */}
          <Card className="p-8 bg-white rounded-2xl shadow-lg text-center flex flex-col items-center">
            <CardContent className="p-0">
              <h2 className="text-3xl font-bold text-green-800 mb-4">Our Mission</h2>
              <p className="text-lg leading-relaxed">
                To drive sustainable growth in agriculture by providing farmers and agribusinesses with easy access to financial tools, modern equipment, farm inputs, and digital marketplaces.
              </p>
            </CardContent>
          </Card>
          {/* Vision Card */}
          <Card className="p-8 bg-white rounded-2xl shadow-lg text-center flex flex-col items-center">
            <CardContent className="p-0">
              <h2 className="text-3xl font-bold text-green-800 mb-4">Our Vision</h2>
              <p className="text-lg leading-relaxed">
                To become the leading catalyst for agricultural prosperity in Africa by 2030.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 5. What Makes Us Different Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto text-gray-700">
        <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">What Makes Us Different</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* One-Stop Platform Card */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
            <ClipboardCheck className="w-10 h-10 text-yellow-600 mb-3" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">One-Stop Platform</h3>
            <p className="text-gray-600">From hiring tractors to selling crops, we simplify it all.</p>
          </div>
          {/* AI-Driven Intelligence Card */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
            <Sparkles className="w-10 h-10 text-yellow-600 mb-3" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">AI-Driven Intelligence</h3>
            <p className="text-gray-600">Predictive insights and smart decision-making tools.</p>
          </div>
          {/* Farmer-Centered Design Card */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
            <Users className="w-10 h-10 text-yellow-600 mb-3" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">Farmer-Centered Design</h3>
            <p className="text-gray-600">Built with farmers, for farmers.</p>
          </div>
          {/* Community Support Card */}
          <Link to="/forum" className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all group">
            <Users className="w-10 h-10 text-yellow-600 mb-3 group-hover:text-yellow-700 transition-colors" />
            <h3 className="text-xl font-semibold text-green-800 mb-2 group-hover:text-green-900 transition-colors">Community Support</h3>
            <p className="text-gray-600 text-sm md:text-base">A live, active forum to connect and grow together.</p>
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      {/* <Footer /> */}
    </div>
  );
}