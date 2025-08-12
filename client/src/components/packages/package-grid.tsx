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
    id: "bali-private-villa",
    title: "Bali Private Villa Retreat",
    description: "10 nights in exclusive clifftop villa with infinity pool",
    price: 12499,
    duration: "10 Days / 9 Nights",
    rating: 5.0,
    reviews: 89,
    category: ["luxury", "private"],
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    badge: "Private Suite",
    badgeColor: "gold",
    includes: [
      "Private jet transfers",
      "24/7 personal chef",
      "Daily spa treatments",
      "Private temple tours",
      "Helicopter island hopping",
    ],
  },
  {
    id: "tuscany-wine-estate",
    title: "Tuscany Wine Estate",
    description: "14 nights in private vineyard with wine master",
    price: 15999,
    duration: "14 Days / 13 Nights",
    rating: 4.9,
    reviews: 156,
    category: ["luxury", "cultural", "private"],
    image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    badge: "Wine Master",
    badgeColor: "purple",
    includes: [
      "Private estate residence",
      "Personal sommelier",
      "Cooking classes with Michelin chef",
      "Ferrari countryside tours",
      "Exclusive vineyard access",
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
    image: "https://images.unsplash.com/photo-1517079495967-03aed29f98b5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    image: "https://images.unsplash.com/photo-1584607889131-98d098f01f60?q=80&w=943&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    id: "japan-private-ryokan",
    title: "Japan Private Ryokan Experience",
    description: "8 nights in exclusive traditional inn with kaiseki dining",
    price: 11299,
    duration: "8 Days / 7 Nights",
    rating: 5.0,
    reviews: 74,
    category: ["luxury", "cultural", "private"],
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    badge: "Cultural Immersion",
    badgeColor: "red",
    includes: [
      "Private ryokan with hot springs",
      "Daily kaiseki meals",
      "Tea ceremony master",
      "Private temple meditation",
      "Mount Fuji helicopter tour",
    ],
  },
  {
    id: "antarctica-expedition",
    title: "Antarctica Luxury Expedition",
    description: "12 days ultimate polar adventure with luxury icebreaker",
    price: 28999,
    duration: "12 Days / 11 Nights",
    rating: 4.8,
    reviews: 45,
    category: ["luxury", "adventure"],
    image: "https://images.unsplash.com/photo-1478828217402-1281d024ba97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    badge: "Ultimate Adventure",
    badgeColor: "blue",
    includes: [
      "Luxury icebreaker suite",
      "Expert naturalist guides",
      "Zodiac wildlife tours",
      "Photography workshops",
      "Champagne ice tasting",
    ],
  },
  {
    id: "dubai-penthouse",
    title: "Dubai Penthouse Suite",
    description: "5 nights in Burj Al Arab Royal Suite with helicopter access",
    price: 22999,
    duration: "5 Days / 4 Nights",
    rating: 5.0,
    reviews: 112,
    category: ["luxury", "private"],
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    badge: "Royal Suite",
    badgeColor: "gold",
    includes: [
      "Royal Suite with butler",
      "Helicopter transfers",
      "Private desert safari",
      "Yacht charter",
      "Shopping with personal stylist",
    ],
  },
  {
    id: "patagonia-private-tour",
    title: "Patagonia Private Expedition",
    description: "9 days exclusive wilderness exploration with expert guides",
    price: 7899,
    duration: "9 Days / 8 Nights",
    rating: 4.9,
    reviews: 67,
    category: ["adventure", "private"],
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    badge: "Private Tour",
    badgeColor: "green",
    includes: [
      "Private charter flights",
      "Expert wilderness guides",
      "Luxury eco-lodges",
      "Photography equipment",
      "Glacier trekking gear",
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
