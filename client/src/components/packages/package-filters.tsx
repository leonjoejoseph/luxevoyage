import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface PackageFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { key: "all", label: "All Packages" },
  { key: "budget", label: "Budget Friendly" },
  { key: "luxury", label: "Ultra Luxury" },
  { key: "private", label: "Private Tours" },
  { key: "adventure", label: "Adventure" },
  { key: "cultural", label: "Cultural" },
];

export default function PackageFilters({ activeFilter, onFilterChange }: PackageFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {filters.map((filter) => (
        <motion.div key={filter.key} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant={activeFilter === filter.key ? "default" : "outline"}
            className={`px-6 py-2 rounded-full border-2 transition-all duration-300 ${
              activeFilter === filter.key
                ? "bg-gold-accent hover:bg-gold-accent/90 text-navy-deep border-gold-accent"
                : "border-gold-accent text-navy-deep hover:bg-gold-accent hover:text-navy-deep"
            }`}
            onClick={() => onFilterChange(filter.key)}
          >
            {filter.label}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
