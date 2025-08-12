import { motion } from "framer-motion";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";
import { openLightbox } from "@/components/ui/lightbox";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const destinations = [
  {
    name: "Santorini",
    subtitle: "Greek Islands Paradise",
    price: "$2,499",
    duration: "5 Days",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Experience the magic of Santorini's iconic sunsets and luxury cliff-side resorts.",
  },
  {
    name: "Kyoto",
    subtitle: "Ancient Japan Elegance",
    price: "$3,299",
    duration: "7 Days",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Immerse yourself in traditional culture with premium ryokan stays and private temple tours.",
  },
  {
    name: "Queenstown",
    subtitle: "Adventure Capital",
    price: "$4,199",
    duration: "8 Days",
    image: "https://images.unsplash.com/photo-1507097634215-e82e6b518529?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    description: "Combine luxury accommodations with thrilling adventures in New Zealand's stunning landscape.",
  },
];

export default function DestinationsShowcase() {
  const [sectionRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section 
      id="destinations"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-serif font-bold text-navy-deep mb-4"
          >
            Featured Destinations
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Handpicked destinations that offer the perfect blend of luxury, culture, and unforgettable experiences
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8"
        >
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.name}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
            >
              <GlassmorphismCard className="overflow-hidden hover-zoom group">
                <div
                  className="relative h-64 bg-cover bg-center rounded-2xl overflow-hidden"
                  style={{ backgroundImage: `url(${destination.image})` }}
                  onClick={() => openLightbox(destination.image)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-serif font-bold mb-2">{destination.name}</h3>
                    <p className="text-sm opacity-90">{destination.subtitle}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{destination.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gold-accent font-semibold text-lg">
                      From {destination.price}
                    </span>
                    <span className="text-sm text-gray-500">{destination.duration}</span>
                  </div>
                </div>
              </GlassmorphismCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
