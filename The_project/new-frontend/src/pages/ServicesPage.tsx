// src/pages/ServicesPage.tsx

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // ShadCN Card components
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

// Import Lucide icons for services
import {
  DollarSign,        // Farm Loan Access System
  ShoppingCart,      // Agro Input Purchase System
  Wrench,            // Tool and Tractor Rental Service
  Calculator,        // Smart Farm Input Cost Estimator
  Building2,         // Crop Marketplace Integration (or could be Sprout/Wheat)
  LineChart,         // Financial Analytics Dashboard
  Tractor,           // Alternative for Tools/Tractors
  Coins,             // Alternative for Loans
  Leaf,              // General agriculture/growth
  LandPlot,          // Land Leasing
  UsersRound,        // Labor Hiring
  Gauge,             // Farm Monitoring / Dashboard
  UserCircle,        // User Profile
  ShieldCheck,       // KYC
  Settings,          // Admin Control
} from "lucide-react";

export default function ServicesPage() {
  // Define your services based on the MVP Blueprint 
  const services = [
    {
      id: "loans",
      icon: DollarSign,
      title: "Farm Loan Access System",
      description: "Smart loan packages tailored to crop type, land size, and seasonal projections. Track eligibility, approvals, and repayment schedules easily. [cite: 5, 6, 7, 8]",
      link: "/loans",
      buttonText: "Apply Now",
    },
    {
      id: "inputs",
      icon: ShoppingCart,
      title: "Agro Input Purchase System",
      description: "Shop for quality seeds and fertilizers. Integrated delivery tracking and seamless wallet/payment options. [cite: 9, 10, 11, 12]",
      link: "/inputs",
      buttonText: "Browse Products",
    },
    {
      id: "rentals",
      icon: Wrench,
      title: "Tool and Tractor Rental Service",
      description: "Access a dynamic inventory of modern tools and tractors. Location-aware booking for efficient farm operations. [cite: 13, 14, 15, 16]",
      link: "/rentals",
      buttonText: "Find Equipment",
    },
    {
      id: "estimator",
      icon: Calculator,
      title: "Smart Farm Input Cost Estimator",
      description: "Calculate required inputs (fertilizer, herbicide, pesticide) based on farm size and crop type, with full cost estimates. [cite: 17, 18, 19, 20, 21, 22]",
      link: "/estimator",
      buttonText: "Get Estimate",
    },
    {
      id: "marketplace",
      icon: Building2, // or Sprout/Wheat/Store
      title: "Crop Marketplace Integration",
      description: "Sell your harvested crops to a wider market. Track prices and optimize your profitability. [cite: 23, 24, 25, 26]",
      link: "/marketplace",
      buttonText: "Sell Your Produce",
    },
    {
      id: "analytics",
      icon: LineChart,
      title: "Financial Analytics Dashboard",
      description: "Visually track loan repayment progress, profitability estimations, revenue, expenses, and ROI. [cite: 39, 40, 41, 42]",
      link: "/dashboard",
      buttonText: "View Dashboard",
    },
    {
      id: "land-leasing",
      icon: LandPlot,
      title: "Land Leasing and Management",
      description: "Discover available farmlands to lease or upload your own unused land for rental. [cite: 27, 28, 29, 30]",
      link: "/land-leasing",
      buttonText: "Explore Listings",
    },
    {
      id: "labor",
      icon: UsersRound,
      title: "Labor Hiring and Management",
      description: "Connect with skilled agricultural laborers for short-term and seasonal work. [cite: 32, 33]",
      link: "/labor",
      buttonText: "Find Labor",
    },
    {
      id: "monitoring",
      icon: Gauge,
      title: "Farm Monitoring and Advisory",
      description: "Access periodic farm health checks, alerts, reports, and AI-based planting advice. [cite: 35, 36, 37, 38]",
      link: "/monitoring",
      buttonText: "Learn More",
    },
     {
      id: "profile-kyc",
      icon: UserCircle,
      title: "User Profile and Farmer KYC",
      description: "Secure onboarding and tiered verification system for all users. [cite: 43, 44, 45]",
      link: "/profile",
      buttonText: "Manage Profile",
    },
    {
      id: "admin",
      icon: Settings,
      title: "Admin Control and Platform Management",
      description: "Admin access to moderate users, tools, loans, listings, and analytics, including fraud detection. [cite: 46, 47, 48]",
      link: "/admin",
      buttonText: "Admin Portal",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with Logo + Nav */}
      <Header />

      {/* Hero Section for Services Page */}
      <section className="bg-gradient-to-r from-green-600 to-blue-700 py-20 px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fade-in-up">
            Our Comprehensive Agricultural Solutions
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8 animate-fade-in-up animation-delay-300">
            Empowering every step of your farming journey with cutting-edge technology and support.
          </p>
          <Link to="/signup">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-green-900 px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 px-4 bg-white text-gray-700">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-green-800 mb-12 text-center">Discover Our Core Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:border-green-500 transition-all duration-300 group">
                <CardHeader className="p-0 mb-4"> {/* Adjusted padding */}
                  <service.icon className="w-12 h-12 text-green-600 mb-3 group-hover:text-green-700 transition-colors" />
                  <CardTitle className="text-xl font-semibold text-green-800 group-hover:text-green-900 transition-colors">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-grow"> {/* flex-grow to push button to bottom */}
                  <p className="text-gray-600 text-base mb-6">{service.description}</p>
                </CardContent>
                <Link to={service.link}>
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300">
                    {service.buttonText}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call-To-Action Footer */}
      <section className="py-16 px-4 bg-yellow-50 text-green-900 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to empower your farm?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join AgroBridge today and transform your agricultural practice with our innovative solutions.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/signup">
            <Button className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 text-lg rounded-full shadow-lg">
              Sign Up Now
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-100 px-8 py-4 text-lg rounded-full shadow-lg">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>

      {/* This div pushes the footer to the bottom */}
      <div className="flex-grow"></div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}