import { motion, AnimatePresence } from "framer-motion";
import PackageCard from "@/components/packages/package-card";
import { PackageType } from "@/types";

const packages: PackageType[] = [
  {
    id: "maldives-paradise",
    title: "Maldives Paradise",
    description: "7 nights in overwater villa with private butler service",
    price: 8999,
    duration: "7 Days / 6 Nights",
    rating: 4.9,
    reviews: 127,
    category: ["luxury", "cultural"],
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    badge: "Ultra Luxury",
    badgeColor: "gold",
    includes: [
      "Seaplane transfers",
      "All meals and premium beverages",
      "Spa treatments",
      "Private island excursions",
      "Sunset dolphin cruise",
    ],
  },
  {
    id: "swiss-alps-trek",
    title: "Swiss Alps Trek",
    description: "5 days hiking with luxury mountain lodges",
    price: 2799,
    duration: "5 Days / 4 Nights",
    rating: 4.7,
    reviews: 89,
    category: ["adventure", "budget"],
    image: "https://images.unsplash.com/photo-1464822759844-d150320c4ef5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    badge: "Adventure",
    badgeColor: "green",
    includes: [
      "Professional mountain guide",
      "All hiking equipment",
      "Gourmet mountain meals",
      "Cable car passes",
      "Photography workshop",
    ],
  },
  {
    id: "angkor-wonder",
    title: "Angkor Wonder",
    description: "4 days exploring ancient temples with expert guides",
    price: 1899,
    duration: "4 Days / 3 Nights",
    rating: 4.8,
    reviews: 156,
    category: ["cultural", "budget"],
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    badge: "Cultural",
    badgeColor: "purple",
    includes: [
      "Private temple tours",
      "Sunrise Angkor Wat visit",
      "Traditional Khmer cooking class",
      "Cultural performances",
      "Professional photographer",
    ],
  },
  {
    id: "kenya-safari",
    title: "Kenya Safari",
    description: "6 days Big Five safari with luxury tented camps",
    price: 3499,
    duration: "6 Days / 5 Nights",
    rating: 4.9,
    reviews: 203,
    category: ["adventure", "budget"],
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    badge: "Safari",
    badgeColor: "orange",
    includes: [
      "Professional safari guide",
      "Game drives in Masai Mara",
      "Cultural village visit",
      "Hot air balloon safari",
      "Bush breakfast experience",
    ],
  },
  {
    id: "japan-culture",
    title: "Japan Culture",
    description: "8 days immersive cultural experience with ryokan stays",
    price: 4299,
    duration: "8 Days / 7 Nights",
    rating: 4.8,
    reviews: 95,
    category: ["cultural", "luxury"],
    image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    badge: "Cultural",
    badgeColor: "pink",
    includes: [
      "Traditional ryokan stays",
      "Tea ceremony workshops",
      "Private temple visits",
      "Kaiseki dining experiences",
      "Geisha district tours",
    ],
  },
  {
    id: "antarctica-expedition",
    title: "Antarctica Expedition",
    description: "12 days luxury cruise to the White Continent",
    price: 12999,
    duration: "12 Days / 11 Nights",
    rating: 4.9,
    reviews: 67,
    category: ["luxury", "adventure"],
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    badge: "Expedition",
    badgeColor: "blue",
    includes: [
      "Luxury expedition ship",
      "Expert naturalist guides",
      "Zodiac boat excursions",
      "Wildlife photography workshops",
      "Penguin colony visits",
    ],
  },
];

interface PackageGridProps {
  activeFilter: string;
}

export default function PackageGrid({ activeFilter }: PackageGridProps) {
  const filteredPackages = packages.filter((pkg) => {
    if (activeFilter === "all") return true;
    return pkg.category.includes(activeFilter);
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <AnimatePresence>
        {filteredPackages.map((pkg) => (
          <motion.div
            key={pkg.id}
            variants={itemVariants}
            layout
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <PackageCard package={pkg} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
