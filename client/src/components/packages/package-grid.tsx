import { motion, AnimatePresence } from "framer-motion";
import PackageCard from "@/components/packages/package-card";
import { PackageType } from "@/types";

// Budget Friendly Packages
const budgetPackages: PackageType[] = [
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
    id: "kenya-safari",
    title: "Kenya Safari Adventure",
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
    id: "vietnam-adventure",
    title: "Vietnam Discovery",
    description: "7 days cultural journey from Hanoi to Ho Chi Minh",
    price: 2299,
    duration: "7 Days / 6 Nights",
    rating: 4.6,
    reviews: 142,
    category: ["cultural", "budget"],
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d0d95e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Discovery",
    badgeColor: "blue",
    includes: [
      "Internal flights included",
      "Street food tours",
      "Halong Bay cruise",
      "Local guide services",
      "Traditional craft workshops",
    ],
  },
];

// Ultra Luxury Packages
const ultraLuxuryPackages: PackageType[] = [
  {
    id: "maldives-paradise",
    title: "Maldives Paradise Resort",
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
    id: "bali-private-villa-ultra",
    title: "Bali Ultra Luxury Villa",
    description: "10 nights in exclusive clifftop villa with infinity pool",
    price: 12499,
    duration: "10 Days / 9 Nights",
    rating: 5.0,
    reviews: 89,
    category: ["luxury", "private"],
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    badge: "Ultra Luxury",
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
    id: "antarctica-expedition",
    title: "Antarctica Luxury Expedition",
    description: "12 days ultimate polar adventure with luxury icebreaker",
    price: 28999,
    duration: "12 Days / 11 Nights",
    rating: 4.8,
    reviews: 45,
    category: ["luxury", "adventure"],
    image: "https://images.unsplash.com/photo-1674784764904-2200fd51e1c9?q=80&w=1033&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "Ultra Luxury",
    badgeColor: "gold",
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
    title: "Dubai Royal Penthouse",
    description: "5 nights in Burj Al Arab Royal Suite with helicopter access",
    price: 22999,
    duration: "5 Days / 4 Nights",
    rating: 5.0,
    reviews: 112,
    category: ["luxury", "private"],
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    badge: "Ultra Luxury",
    badgeColor: "gold",
    includes: [
      "Royal Suite with butler",
      "Helicopter transfers",
      "Private desert safari",
      "Yacht charter",
      "Shopping with personal stylist",
    ],
  },
];

// Wine Master Packages
const wineMasterPackages: PackageType[] = [
  {
    id: "tuscany-wine-estate",
    title: "Tuscany Wine Estate Experience",
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
    id: "bordeaux-wine-tour",
    title: "Bordeaux Grand Cru Experience",
    description: "10 days touring world-famous châteaux with wine experts",
    price: 11299,
    duration: "10 Days / 9 Nights",
    rating: 4.8,
    reviews: 89,
    category: ["luxury", "cultural"],
    image: "https://images.unsplash.com/photo-1560148489-f637c2bc63ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Wine Master",
    badgeColor: "purple",
    includes: [
      "Château private tastings",
      "Master sommelier guide",
      "Michelin-starred dining",
      "Vintage cellar tours",
      "Wine blending workshop",
    ],
  },
  {
    id: "napa-valley-retreat",
    title: "Napa Valley Vintner's Retreat",
    description: "8 days exclusive access to California's finest wineries",
    price: 8799,
    duration: "8 Days / 7 Nights",
    rating: 4.7,
    reviews: 124,
    category: ["luxury", "private"],
    image: "https://images.unsplash.com/photo-1510076857177-7470076d4098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Wine Master",
    badgeColor: "purple",
    includes: [
      "Private winery tours",
      "Celebrity chef dinners",
      "Harvest participation",
      "Hot air balloon rides",
      "Wine investment consultation",
    ],
  },
  {
    id: "champagne-region-tour",
    title: "Champagne Region Prestige Tour",
    description: "6 days exploring prestigious champagne houses",
    price: 6999,
    duration: "6 Days / 5 Nights",
    rating: 4.9,
    reviews: 76,
    category: ["luxury", "cultural"],
    image: "https://images.unsplash.com/photo-1569275808145-6a3aa6b8b3de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Wine Master",
    badgeColor: "purple",
    includes: [
      "Dom Pérignon cellar tours",
      "Champagne master classes",
      "Reims cathedral visit",
      "Private château dinners",
      "Vintage champagne collection",
    ],
  },
];

// Cultural Immersion Packages
const culturalImmersionPackages: PackageType[] = [
  {
    id: "japan-private-ryokan",
    title: "Japan Traditional Ryokan",
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
    id: "bhutan-spiritual-journey",
    title: "Bhutan Spiritual Journey",
    description: "12 days immersive spiritual and cultural experience",
    price: 9499,
    duration: "12 Days / 11 Nights",
    rating: 4.8,
    reviews: 65,
    category: ["cultural", "luxury"],
    image: "https://images.unsplash.com/photo-1538837804644-c47b7d023e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Cultural Immersion",
    badgeColor: "red",
    includes: [
      "Tiger's Nest monastery trek",
      "Private meditation sessions",
      "Traditional archery lessons",
      "Dzong fortress tours",
      "Buddhist ceremony participation",
    ],
  },
  {
    id: "morocco-imperial-cities",
    title: "Morocco Imperial Cities",
    description: "10 days exploring ancient cities and traditions",
    price: 5299,
    duration: "10 Days / 9 Nights",
    rating: 4.6,
    reviews: 118,
    category: ["cultural", "luxury"],
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d0d95e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Cultural Immersion",
    badgeColor: "red",
    includes: [
      "Riad accommodations",
      "Medina guided tours",
      "Berber desert experience",
      "Traditional craft workshops",
      "Moroccan cooking classes",
    ],
  },
  {
    id: "peru-inca-heritage",
    title: "Peru Inca Heritage Experience",
    description: "9 days discovering ancient Inca civilization",
    price: 4799,
    duration: "9 Days / 8 Nights",
    rating: 4.7,
    reviews: 156,
    category: ["cultural", "adventure"],
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Cultural Immersion",
    badgeColor: "red",
    includes: [
      "Machu Picchu sunrise tour",
      "Sacred Valley exploration",
      "Traditional weaving workshops",
      "Andean cooking experiences",
      "Luxury train to Aguas Calientes",
    ],
  },
];

// Private Suite/Tours Packages
const privateSuitePackages: PackageType[] = [
  {
    id: "patagonia-private-expedition",
    title: "Patagonia Private Expedition",
    description: "9 days exclusive wilderness exploration with expert guides",
    price: 7899,
    duration: "9 Days / 8 Nights",
    rating: 4.9,
    reviews: 67,
    category: ["adventure", "private"],
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    badge: "Private Suite",
    badgeColor: "gold",
    includes: [
      "Private charter flights",
      "Expert wilderness guides",
      "Luxury eco-lodges",
      "Photography equipment",
      "Glacier trekking gear",
    ],
  },
  {
    id: "galapagos-private-yacht",
    title: "Galápagos Private Yacht",
    description: "7 days exclusive yacht charter with naturalist guide",
    price: 16999,
    duration: "7 Days / 6 Nights",
    rating: 5.0,
    reviews: 43,
    category: ["luxury", "private", "adventure"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Private Suite",
    badgeColor: "gold",
    includes: [
      "Private luxury yacht",
      "Expert naturalist guide",
      "Snorkeling equipment",
      "Wildlife photography gear",
      "Gourmet meals onboard",
    ],
  },
  {
    id: "african-private-safari",
    title: "African Private Safari Lodge",
    description: "8 days exclusive Big Five experience in private reserve",
    price: 13499,
    duration: "8 Days / 7 Nights",
    rating: 4.9,
    reviews: 89,
    category: ["luxury", "private", "adventure"],
    image: "https://images.unsplash.com/photo-1551582045-6ec9c11d8697?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Private Suite",
    badgeColor: "gold",
    includes: [
      "Private game reserve access",
      "Luxury safari lodge suite",
      "Personal safari guide",
      "Bush dining experiences",
      "Conservation project visits",
    ],
  },
  {
    id: "bali-private-villa",
    title: "Bali Private Cliff Villa",
    description: "7 days in exclusive cliff-side villa with personal chef",
    price: 8599,
    duration: "7 Days / 6 Nights",
    rating: 4.9,
    reviews: 89,
    category: ["luxury", "private"],
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    badge: "Private Suite",
    badgeColor: "gold",
    includes: [
      "Private cliff-side villa",
      "Personal chef and butler",
      "Helicopter temple tours",
      "Traditional spa treatments",
      "Sunset yacht charter",
    ],
  },
];

// Adventure Packages
const adventurePackages: PackageType[] = [
  {
    id: "iceland-northern-lights",
    title: "Iceland Northern Lights Adventure",
    description: "5 days aurora hunting with luxury glacier lodge",
    price: 6299,
    duration: "5 Days / 4 Nights",
    rating: 4.7,
    reviews: 128,
    category: ["adventure", "luxury"],
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    badge: "Adventure",
    badgeColor: "green",
    includes: [
      "Glass igloo accommodation",
      "Aurora hunting tours",
      "Blue Lagoon spa access",
      "Glacier hiking expedition",
      "Reykjavik city tour",
    ],
  },
  {
    id: "norway-fjords",
    title: "Norway Fjords Explorer",
    description: "9 days scenic railway and fjord cruise combination",
    price: 9299,
    duration: "9 Days / 8 Nights",
    rating: 4.7,
    reviews: 134,
    category: ["adventure", "luxury"],
    image: "https://images.unsplash.com/photo-1627894483-2000c8b7b925?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    badge: "Adventure",
    badgeColor: "green",
    includes: [
      "Premium fjord cruise",
      "Scenic railway journeys",
      "Northern lights hunting",
      "Gourmet Nordic cuisine",
      "Cultural performances",
    ],
  },
  {
    id: "new-zealand-extreme",
    title: "New Zealand Extreme Adventure",
    description: "11 days adrenaline-packed activities across both islands",
    price: 7599,
    duration: "11 Days / 10 Nights",
    rating: 4.8,
    reviews: 167,
    category: ["adventure", "luxury"],
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Adventure",
    badgeColor: "green",
    includes: [
      "Bungee jumping experiences",
      "Helicopter glacier tours",
      "White water rafting",
      "Skydiving adventures",
      "Luxury lodge accommodations",
    ],
  },
  {
    id: "himalaya-base-camp",
    title: "Himalaya Base Camp Trek",
    description: "14 days guided trek to Everest Base Camp with luxury stops",
    price: 8999,
    duration: "14 Days / 13 Nights",
    rating: 4.6,
    reviews: 93,
    category: ["adventure", "cultural"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Adventure",
    badgeColor: "green",
    includes: [
      "Expert Sherpa guides",
      "Luxury tea house stays",
      "Mountain helicopter rescue",
      "Traditional monastery visits",
      "Professional photography",
    ],
  },
];

const packages: PackageType[] = [
  ...budgetPackages,
  ...ultraLuxuryPackages,
  ...wineMasterPackages,
  ...culturalImmersionPackages,
  ...privateSuitePackages,
  ...adventurePackages,
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
