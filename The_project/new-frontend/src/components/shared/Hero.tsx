// src/components/shared/Hero.tsx

import { Button } from "@/components/ui/button"; // Button is used here

export default function Hero() {
  return (
    <section className="text-center py-20 px-4 bg-gradient-to-tr from-green-50 to-yellow-50">
      <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">Connecting Farmers to a Sustainable Future</h2>
      <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-6">
        Explore modern agriculture solutions – loans, tools, fertilizers, and more all in one ecosystem.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <Button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 text-lg rounded-xl shadow">Get Started</Button>
        <Button variant="outline" className="px-6 py-3 text-lg rounded-xl shadow">Learn More</Button>
      </div>
    </section>
  );
}