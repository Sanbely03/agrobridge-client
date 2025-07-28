// src/pages/ForumPage.tsx

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { Header } from "@/components/shared/Header";
// import { Footer } from "@/components/shared/Footer";

// You might want a specific background for the forum page hero
import forumHeroBg from "@/assets/forum_hero_bg.jpg"; // <--- Add a suitable image to src/assets (e.g., people collaborating)

export default function ForumPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}

      {/* Hero Section for Forum Page */}
      <section
        className="relative text-center py-24 md:py-32 px-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${forumHeroBg})` }} // Apply your image here
      >
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-green-900 opacity-70 backdrop-blur-sm"></div>

        {/* Content wrapper */}
        <div className="relative z-10 max-w-4xl mx-auto text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fade-in-up">
            AgroBridge Community Forum
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 animate-fade-in-up animation-delay-300">
            Connect, share, and grow with fellow farmers and agricultural experts.
          </p>
        </div>
      </section>

      {/* Forum Content Section (Coming Soon) */}
      <section className="flex-grow py-16 px-4 bg-white text-gray-700 flex items-center justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-6">Forum Coming Soon!</h2>
          <p className="text-xl text-gray-600 mb-8">
            We're diligently working to bring you a vibrant and interactive community forum.
            Get ready to engage with fellow farmers, share valuable insights, and collaborate to solve agricultural challenges.
          </p>
          <p className="text-lg text-gray-500">
            Stay tuned for updates!
          </p>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
}