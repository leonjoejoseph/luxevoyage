import { motion } from "framer-motion";
import ParallaxHero from "@/components/ui/parallax-hero";
import PackageFilters from "@/components/packages/package-filters";
import PackageGrid from "@/components/packages/package-grid";
import { useState } from "react";

export default function Packages() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <ParallaxHero
        backgroundImage="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        title="Luxury Packages"
        subtitle="Curated experiences for the discerning traveler"
        height="h-96"
      />

      {/* Filters and Packages */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-navy-deep mb-4">
              Find Your Perfect Journey
            </h2>
            <PackageFilters 
              activeFilter={activeFilter} 
              onFilterChange={setActiveFilter} 
            />
          </div>

          <PackageGrid activeFilter={activeFilter} />
        </div>
      </div>
    </motion.div>
  );
}
