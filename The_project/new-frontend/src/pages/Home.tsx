// src/pages/Home.tsx
// import { Header } from '../components/shared/Header'; // Remove if found
// import { Footer } from '../components/shared/Footer'; // Remove if found

import React from "react";
// import { Header } from "@/components/shared/Header"; // Your custom Header component
import Hero from "@/components/shared/Hero";       // Your custom Hero component
// import { Footer } from "@/components/shared/Footer"; // Your custom Footer component
import { FeaturesSection } from "@/components/shared/FeaturesSection"; // NEW: Your custom Features Section component

// Import ShadCN UI components and Lucide React icon used *directly* in Home.tsx
// (Only include what's actually used here, not in the imported components)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react"; // Only needed if Search section remains here

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col"> {/* Added flex-col for sticky footer layout */}
      {/* 1. Header Section */}
      {/* <Header /> */}

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Features Section - Now using the dedicated component */}
      <FeaturesSection />

      {/* 4. Search Section - This will be directly in Home.tsx as it's unique to Home */}
      <section className="bg-white py-10 px-4 shadow-inner">
        <div className="max-w-xl mx-auto">
          <h4 className="text-2xl font-bold text-center text-green-800 mb-4">Search the AgroBridge Network</h4>
          <div className="flex gap-2">
            <Input placeholder="Search services, products or tools..." className="flex-grow rounded-full" />
            <Button className="rounded-full bg-green-700 hover:bg-green-800 text-white">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* This div pushes the footer to the bottom, ensuring flex-grow for main content */}
      <div className="flex-grow"></div>

      {/* 5. Footer Section */}
      {/* <Footer /> */}
    </div>
  );
}