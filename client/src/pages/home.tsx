import { motion } from "framer-motion";
import HeroSection from "@/components/home/hero-section";
import DestinationsShowcase from "@/components/home/destinations-showcase";
import WhyTravelSection from "@/components/home/why-travel-section";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <HeroSection />
      
      {/* Destinations Showcase */}
      <DestinationsShowcase />
      
      {/* Why Travel With Us */}
      <WhyTravelSection />
    </motion.div>
  );
}
