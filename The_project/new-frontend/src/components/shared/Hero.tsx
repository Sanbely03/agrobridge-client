// src/components/shared/Hero.tsx

import { Button } from "@/components/ui/button"; // Button is used here
import { Link } from "react-router-dom"; // Assuming Get Started/Learn More might link
import farmHeroBg from "@/assets/farm_hero_bg.jpg"; // <--- THIS LINE NEEDS TO POINT TO YOUR ACTUAL IMAGE

export default function Hero() {
  return (
    <section
      className="relative text-center py-24 md:py-32 px-4 bg-cover bg-center" // Increased padding, added bg-cover/center
      style={{ backgroundImage: `url(${farmHeroBg})` }} // Apply the background image
    >
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-green-900 opacity-70"></div> {/* Darker green overlay */}

      {/* Content wrapper to ensure text is above the overlay */}
      <div className="relative z-10 max-w-4xl mx-auto text-white"> {/* Text color changed to white */}
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-up"> {/* Added animate-fade-in-up (requires custom CSS) */}
          Empowering Nigerian Farmers, Digitally.
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-300"> {/* Added animation and delay */}
          Your one-stop digital platform for financial sustainability, operational excellence, and modern farm management.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          {/* Enhanced button animations */}
          <Link to="/signup">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-green-900 px-8 py-4 text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
              Get Started
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-green-900 px-8 py-4 text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}