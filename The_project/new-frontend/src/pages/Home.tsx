// src/pages/Home.tsx

import React from "react";
import { Header } from "@/components/shared/Header"; // Your custom Header component
import  Hero  from "@/components/shared/Hero";     // Your custom Hero component

// Import ShadCN UI components and Lucide React icon used *directly* in Home.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react"; // Ensure 'lucide-react' is installed (npm install lucide-react)

export default function Home() {
  return (
    <div>
      {/* 1. Header Section - Using your custom Header component */}
      <Header />

      {/* 2. Hero Section - Using your custom Hero component */}
      <Hero />

      {/* 3. Features Section - This will be directly in Home.tsx as you provided */}
      <section className="px-4 py-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-white rounded-2xl shadow hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-green-800 mb-2">Farm Loans</h3>
            <p className="text-gray-600">Access affordable loan options tailored for local farmers and agribusinesses.</p>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-2xl shadow hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-green-800 mb-2">Buy Tools & Fertilizer</h3>
            <p className="text-gray-600">Order quality farm tools and fertilizers directly from trusted suppliers.</p>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-2xl shadow hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-green-800 mb-2">Sell Your Produce</h3>
            <p className="text-gray-600">Reach new markets and increase profitability by selling crops on our platform.</p>
          </CardContent>
        </Card>
      </section>

      {/* 4. Search Section - This will be directly in Home.tsx as you provided */}
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

      {/* 5. Footer Section - This will be directly in Home.tsx as you provided */}
      <footer className="py-8 px-4 text-center text-gray-600 bg-gradient-to-t from-green-50 to-white">
        <p>&copy; 2025 AgroBridge. All rights reserved.</p>
      </footer>
    </div>
  );
}