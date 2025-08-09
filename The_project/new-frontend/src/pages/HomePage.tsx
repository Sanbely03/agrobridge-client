import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";



import { FeaturesSection } from "@/components/shared/FeaturesSection";
import Hero from "@/components/shared/Hero";       // Your custom Hero component


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Facebook, Twitter, Linkedin, Phone, MessageSquare } from "lucide-react";
import logo from "@/assets/agrobridge_logo.png"; // Make sure logo path is correct

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col"> {/* Added flex-col for sticky footer layout */}
     {/* 2. Hero Section */}
          <Hero />
    
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

    </div>
  );
}
