import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import GradientButton from "@/components/ui/gradient-button";
import ParallaxHero from "@/components/ui/parallax-hero";

export default function HeroSection() {
  const scrollToDestinations = () => {
    const element = document.getElementById('destinations');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ParallaxHero
      backgroundImage="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
      title={
        <>
          Discover Extraordinary <span className="text-gold-accent">Journeys</span>
        </>
      }
      subtitle="Curated luxury travel experiences that transform the way you see the world"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <GradientButton onClick={scrollToDestinations}>
          Begin Your Adventure
        </GradientButton>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float cursor-pointer"
        onClick={scrollToDestinations}
      >
        <ChevronDown className="text-white text-2xl" />
      </motion.div>
    </ParallaxHero>
  );
}
