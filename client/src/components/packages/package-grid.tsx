import { motion, AnimatePresence } from "framer-motion";
import PackageCard from "@/components/packages/package-card";
import { PackageType } from "@/types";

// Ultra Luxury Packages
const ultraLuxuryPackages: PackageType[] = [
  {
    id: "maldives-paradise",
    title: "Maldives Ocean Villa Experience",
    description: "7 nights in overwater villa with private butler service",
    price: 4299,
    duration: "7 Days / 6 Nights",
    rating: 4.9,
    reviews: 127,
    category: ["luxury"],
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
    id: "antarctica-expedition",
    title: "Antarctica Luxury Expedition",
    description: "12 days of luxury exploration in the world's last frontier",
    price: 28999,
    duration: "12 Days / 11 Nights",
    rating: 5.0,
    reviews: 45,
    category: ["luxury"],
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Ultra Luxury",
    badgeColor: "gold",
    includes: [
      "Luxury expedition yacht",
      "Expert naturalist guides",
      "All meals and premium beverages",
      "Zodiac excursions",
      "Wildlife photography equipment",
    ],
  },
  {
    id: "dubai-penthouse",
    title: "Dubai Penthouse Suite",
    description: "5 nights in Burj Al Arab Royal Suite with exclusive experiences",
    price: 22999,
    duration: "5 Days / 4 Nights",
    rating: 5.0,
    reviews: 67,
    category: ["luxury"],
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Ultra Luxury",
    badgeColor: "gold",
    includes: [
      "Helicopter transfers",
      "Royal Suite accommodation",
      "Private desert safari",
      "Yacht charter",
      "Personal shopping stylist",
    ],
  },
  {
    id: "swiss-alpine-luxury",
    title: "Swiss Alpine Luxury Experience",
    description: "6 days of mountain luxury with helicopter skiing and Michelin dining",
    price: 3899,
    duration: "6 Days / 5 Nights",
    rating: 4.8,
    reviews: 134,
    category: ["luxury"],
    image: "https://images.unsplash.com/photo-1551524164-687a55dd1126?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Ultra Luxury",
    badgeColor: "gold",
    includes: [
      "Helicopter skiing",
      "Michelin-starred dining",
      "Luxury spa treatments",
      "Private alpine tours",
      "Premium chalet accommodation",
    ],
  }
];

// Wine Master Packages
const wineMasterPackages: PackageType[] = [
  {
    id: "tuscany-wine-estate",
    title: "Tuscany Wine Estate Experience",
    description: "14 nights in private vineyard with master sommelier",
    price: 15999,
    duration: "14 Days / 13 Nights",
    rating: 4.9,
    reviews: 156,
    category: ["wine"],
    image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
    id: "bordeaux-wine-journey",
    title: "Bordeaux Wine Master Journey",
    description: "10 nights exploring France's premier wine region",
    price: 12499,
    duration: "10 Days / 9 Nights",
    rating: 4.8,
    reviews: 89,
    category: ["wine"],
    image: "https://images.unsplash.com/photo-1506377247737-2628ba151e97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Wine Master",
    badgeColor: "purple",
    includes: [
      "Château accommodations",
      "Private wine tastings",
      "Master sommelier guidance",
      "Truffle hunting experience",
      "Michelin restaurant dinners",
    ],
  },
  {
    id: "napa-valley-estate",
    title: "Napa Valley Estate Experience",
    description: "8 nights in exclusive winery with harvest participation",
    price: 9999,
    duration: "8 Days / 7 Nights",
    rating: 4.7,
    reviews: 112,
    category: ["wine"],
    image: "https://images.unsplash.com/photo-1510076857177-7470076d4098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Wine Master",
    badgeColor: "purple",
    includes: [
      "Vineyard estate accommodation",
      "Harvest participation",
      "Private wine blending",
      "Helicopter vineyard tours",
      "Fine dining experiences",
    ],
  },
  {
    id: "champagne-region-tour",
    title: "Champagne Region Master Tour",
    description: "6 nights in luxury château with exclusive cellar access",
    price: 8799,
    duration: "6 Days / 5 Nights",
    rating: 4.9,
    reviews: 78,
    category: ["wine"],
    image: "https://images.unsplash.com/photo-1510138497149-d1af7d9d2524?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Wine Master",
    badgeColor: "purple",
    includes: [
      "Luxury château accommodation",
      "Exclusive cellar access",
      "Champagne tasting sessions",
      "Private chef experiences",
      "Historic town tours",
    ],
  }
];

// Cultural Packages
const culturalPackages: PackageType[] = [
  {
    id: "angkor-wonder",
    title: "Angkor Wonder Experience",
    description: "5 days exploring ancient temples with expert archaeologist guides",
    price: 1899,
    duration: "5 Days / 4 Nights",
    rating: 4.6,
    reviews: 203,
    category: ["cultural"],
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73aeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Cultural",
    badgeColor: "blue",
    includes: [
      "Expert archaeologist guide",
      "Temple complex access",
      "Traditional Khmer meals",
      "Cultural performances",
      "Local artisan workshops",
    ],
  },
  {
    id: "moroccan-imperial-cities",
    title: "Moroccan Imperial Cities",
    description: "9 days through Morocco's historic imperial cities",
    price: 3299,
    duration: "9 Days / 8 Nights",
    rating: 4.7,
    reviews: 167,
    category: ["cultural"],
    image: "https://images.unsplash.com/photo-1558436914-8c2b5fa1fd8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Cultural",
    badgeColor: "blue",
    includes: [
      "Historic riad accommodations",
      "Local guide expertise",
      "Traditional cooking classes",
      "Artisan workshop visits",
      "Desert excursion",
    ],
  },
  {
    id: "greek-mythology-tour",
    title: "Greek Mythology Experience",
    description: "8 days exploring ancient Greece with mythology experts",
    price: 2799,
    duration: "8 Days / 7 Nights",
    rating: 4.5,
    reviews: 145,
    category: ["cultural"],
    image: "https://images.unsplash.com/photo-1555993539-1732b0258235?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Cultural",
    badgeColor: "blue",
    includes: [
      "Expert mythology guides",
      "Archaeological site access",
      "Traditional Greek cuisine",
      "Island hopping experience",
      "Ancient theater performances",
    ],
  },
  {
    id: "egypt-pharaohs-journey",
    title: "Egypt Pharaohs Journey",
    description: "10 days discovering ancient Egypt with Egyptologists",
    price: 4199,
    duration: "10 Days / 9 Nights",
    rating: 4.8,
    reviews: 198,
    category: ["cultural"],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Cultural",
    badgeColor: "blue",
    includes: [
      "Expert Egyptologist guides",
      "Pyramid complex access",
      "Nile river cruise",
      "Valley of the Kings tour",
      "Traditional Egyptian experiences",
    ],
  }
];

// Cultural Immersion Packages
const culturalImmersionPackages: PackageType[] = [
  {
    id: "japan-private-ryokan",
    title: "Japan Private Ryokan Experience",
    description: "8 days of cultural immersion with tea ceremony and Mount Fuji helicopter tour",
    price: 11299,
    duration: "8 Days / 7 Nights",
    rating: 5.0,
    reviews: 94,
    category: ["cultural-immersion"],
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Cultural Immersion",
    badgeColor: "teal",
    includes: [
      "Private ryokan stays",
      "Tea ceremony with master",
      "Daily kaiseki meals",
      "Mount Fuji helicopter tour",
      "Private temple meditation",
    ],
  },
  {
    id: "bhutan-monastery-retreat",
    title: "Bhutan Monastery Retreat",
    description: "12 days in the Last Shangri-La with monk-guided meditation",
    price: 8999,
    duration: "12 Days / 11 Nights",
    rating: 4.9,
    reviews: 67,
    category: ["cultural-immersion"],
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Cultural Immersion",
    badgeColor: "teal",
    includes: [
      "Monastery accommodations",
      "Monk-guided meditation",
      "Traditional Bhutanese meals",
      "Himalayan trekking",
      "Cultural festival participation",
    ],
  },
  {
    id: "peru-inca-immersion",
    title: "Peru Inca Immersion",
    description: "10 days living with local communities and exploring Machu Picchu",
    price: 5799,
    duration: "10 Days / 9 Nights",
    rating: 4.8,
    reviews: 156,
    category: ["cultural-immersion"],
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Cultural Immersion",
    badgeColor: "teal",
    includes: [
      "Community homestays",
      "Traditional weaving classes",
      "Sacred Valley exploration",
      "Machu Picchu sunrise access",
      "Andean cooking experiences",
    ],
  },
  {
    id: "tibet-spiritual-journey",
    title: "Tibet Spiritual Journey",
    description: "14 days on the roof of the world with spiritual masters",
    price: 12799,
    duration: "14 Days / 13 Nights",
    rating: 5.0,
    reviews: 89,
    category: ["cultural-immersion"],
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Cultural Immersion",
    badgeColor: "teal",
    includes: [
      "Monastery accommodations",
      "Spiritual master guidance",
      "Himalayan meditation retreats",
      "Potala Palace access",
      "Traditional Tibetan ceremonies",
    ],
  }
];

// Private Suite Packages
const privateSuitePackages: PackageType[] = [
  {
    id: "bali-private-villa",
    title: "Bali Private Cliff Villa",
    description: "7 nights in exclusive clifftop villa with personal chef and butler",
    price: 8599,
    duration: "7 Days / 6 Nights",
    rating: 5.0,
    reviews: 89,
    category: ["private"],
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Private Suite",
    badgeColor: "emerald",
    includes: [
      "Private clifftop villa",
      "Personal chef and butler",
      "Helicopter temple tours",
      "Traditional spa treatments",
      "Sunset yacht charters",
    ],
  },
  {
    id: "iceland-glass-igloo",
    title: "Iceland Glass Igloo Suite",
    description: "5 nights hunting Northern Lights in luxury glass accommodation",
    price: 6299,
    duration: "5 Days / 4 Nights",
    rating: 4.9,
    reviews: 123,
    category: ["private"],
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Private Suite",
    badgeColor: "emerald",
    includes: [
      "Glass igloo accommodation",
      "Northern lights hunting",
      "Blue Lagoon spa access",
      "Glacier hiking expeditions",
      "Photography workshops",
    ],
  },
  {
    id: "norway-fjord-suite",
    title: "Norway Fjords Private Suite",
    description: "9 days in luxury fjordside accommodation with scenic railways",
    price: 9299,
    duration: "9 Days / 8 Nights",
    rating: 4.8,
    reviews: 167,
    category: ["private"],
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Private Suite",
    badgeColor: "emerald",
    includes: [
      "Fjordside private suite",
      "Scenic railway journeys",
      "Premium fjord cruises",
      "Gourmet Nordic cuisine",
      "Northern lights expeditions",
    ],
  },
  {
    id: "patagonia-eco-lodge",
    title: "Patagonia Private Eco-Lodge",
    description: "9 days wilderness exploration with luxury eco-accommodation",
    price: 7899,
    duration: "9 Days / 8 Nights",
    rating: 4.7,
    reviews: 145,
    category: ["private"],
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c50a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    badge: "Private Suite",
    badgeColor: "emerald",
    includes: [
      "Private eco-lodge",
      "Expert wilderness guides",
      "Glacier trekking",
      "Wildlife photography",
      "Gourmet outdoor dining",
    ],
  }
];

interface PackageGridProps {
  category: "all" | "ultra-luxury" | "wine-master" | "cultural" | "cultural-immersion" | "private-suite";
}

export default function PackageGrid({ category }: PackageGridProps) {
  const getPackagesByCategory = () => {
    switch (category) {
      case "ultra-luxury":
        return ultraLuxuryPackages;
      case "wine-master":
        return wineMasterPackages;
      case "cultural":
        return culturalPackages;
      case "cultural-immersion":
        return culturalImmersionPackages;
      case "private-suite":
        return privateSuitePackages;
      case "all":
      default:
        return [
          ...ultraLuxuryPackages.slice(0, 2),
          ...wineMasterPackages.slice(0, 2),
          ...culturalPackages.slice(0, 2),
          ...culturalImmersionPackages.slice(0, 2),
          ...privateSuitePackages.slice(0, 2)
        ];
    }
  };

  const packages = getPackagesByCategory();

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      <AnimatePresence>
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <PackageCard package={pkg} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}