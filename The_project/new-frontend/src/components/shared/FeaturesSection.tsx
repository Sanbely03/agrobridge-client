// src/components/shared/FeaturesSection.tsx

import React from "react"; // Required for JSX
import { Card, CardContent } from "@/components/ui/card"; // ShadCN Card components
import { Button } from "@/components/ui/button"; // ShadCN Button component
import { Link } from "react-router-dom"; // Add this import

// Import Lucide icons for each feature.
// Ensure 'lucide-react' is installed: npm install lucide-react
import {
  LandPlot,       // For Farm Loans, Lease Farmlands
  Bell,           // For Fertilizer & Seed Access (changed from Seed for consistency)
  Wrench,         // For Hire Tractors & Tools
  LineChart,      // For Crop Sales & Profit Prediction
  Handshake,      // For Labor Market Access
  BriefcaseBusiness, // For a general business/market icon for Labor Market Access if Handshake is too generic
} from "lucide-react";

// Define the data for each feature card
const featuresData = [
  {
    icon: LandPlot,
    title: "Farm Loans",
    description: "Access affordable loan options tailored for local farmers and agribusinesses.",
    cta: "Apply Now",
    link: "/loans", // Example link
  },
  {
    icon: Bell,
    title: "Fertilizer & Seed Access",
    description: "Order quality fertilizers and seeds directly from trusted suppliers.",
    cta: "Browse Products",
    link: "/products",
  },
  {
    icon: Wrench,
    title: "Hire Tractors & Tools",
    description: "Rent modern agricultural machinery and tools for your farming needs.",
    cta: "Find Equipment",
    link: "/equipment",
  },
  {
    icon: LineChart,
    title: "Crop Sales & Profit Prediction",
    description: "Analyze market trends and predict optimal selling times for your produce.",
    cta: "View Analytics",
    link: "/analytics",
  },
  {
    icon: LandPlot, // Reusing LandPlot. Consider a more distinct icon if desired.
    title: "Lease Farmlands",
    description: "Discover available farmlands for lease or lease out your unused land.",
    cta: "Explore Listings",
    link: "/land",
  },
  {
    icon: BriefcaseBusiness, // Using BriefcaseBusiness for Labor Market Access
    title: "Labor Market Access",
    description: "Connect with skilled agricultural laborers or find farming jobs.",
    cta: "Find Labor",
    link: "/labor",
  },
];

export function FeaturesSection() {
  return (
    <section className="px-4 py-16 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-12">
        Our Core Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresData.map((feature, index) => (
          <Card
            key={index}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              {/* Icon */}
              {/* Dynamically render the Lucide icon component */}
              {React.createElement(feature.icon, { className: "w-12 h-12 text-green-600 mb-4" })}

              {/* Title */}
              <h3 className="text-xl font-semibold text-green-800">{feature.title}</h3>

              {/* Description */}
              <p className="text-gray-600 flex-grow">{feature.description}</p> {/* flex-grow to push button to bottom */}

              {/* Call to Action Button */}
              <Link to={feature.link} className="w-full"> {/* Added w-full to make Link take full width */}
                <Button className="mt-4 bg-green-700 hover:bg-green-800 text-white w-full"> {/* Added w-full to button too */}
                  {feature.cta}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}