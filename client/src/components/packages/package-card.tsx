import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Plus, Minus } from "lucide-react";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";
import { openLightbox } from "@/components/ui/lightbox";
import { PackageType } from "@/types";

interface PackageCardProps {
  package: PackageType;
}

const badgeColors = {
  gold: "bg-gold-accent text-navy-deep",
  green: "bg-green-500 text-white",
  purple: "bg-purple-500 text-white",
  orange: "bg-orange-500 text-white",
  pink: "bg-pink-500 text-white",
  blue: "bg-blue-500 text-white",
};

export default function PackageCard({ package: pkg }: PackageCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <GlassmorphismCard className="overflow-hidden hover-zoom h-full flex flex-col">
        {/* Image */}
        <div
          className="relative h-64 bg-cover bg-center rounded-2xl overflow-hidden cursor-pointer"
          style={{ backgroundImage: `url(${pkg.image})` }}
          onClick={() => openLightbox(pkg.image)}
        >
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
            badgeColors[pkg.badgeColor as keyof typeof badgeColors]
          }`}>
            {pkg.badge}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-2xl font-serif font-bold text-navy-deep mb-2">
            {pkg.title}
          </h3>
          <p className="text-gray-600 mb-4 flex-1">{pkg.description}</p>
          
          {/* Price and Duration */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-3xl font-bold text-gold-accent">
              ${pkg.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">{pkg.duration}</span>
          </div>

          {/* Rating and Expand Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <Star className="w-4 h-4 text-gold-accent mr-1 fill-current" />
              <span>{pkg.rating} ({pkg.reviews} reviews)</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleExpand}
              className="text-gold-accent hover:text-navy-deep transition-colors duration-300"
            >
              {isExpanded ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </motion.button>
          </div>

          {/* Expandable Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-gray-200 overflow-hidden"
              >
                <h4 className="font-semibold mb-2">Included:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {pkg.includes.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlassmorphismCard>
    </motion.div>
  );
}
