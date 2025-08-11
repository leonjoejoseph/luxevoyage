import { motion } from "framer-motion";
import { Crown, Bell, Globe } from "lucide-react";
import StatsCounter from "@/components/home/stats-counter";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const features = [
  {
    icon: Crown,
    title: "Luxury Excellence",
    description: "Handpicked 5-star accommodations and exclusive experiences that exceed expectations.",
  },
  {
    icon: Bell,
    title: "Personal Concierge",
    description: "24/7 dedicated support and personalized itineraries crafted by travel experts.",
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Exclusive access to private venues, cultural sites, and unique experiences worldwide.",
  },
];

const stats = [
  { count: 150, label: "Destinations Covered" },
  { count: 5000, label: "Happy Travelers" },
  { count: 15, label: "Years Experience" },
  { count: 98, label: "Satisfaction Rate", suffix: "%" },
];

export default function WhyTravelSection() {
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
      ref={sectionRef}
      className="py-20 bg-navy-deep text-white"
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
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
          >
            Why Travel With Us
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            We create extraordinary journeys tailored to your dreams
          </motion.p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-navy-deep" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Statistics Counter */}
        <motion.div
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-4 gap-8 pt-16 border-t border-gray-700"
        >
          {stats.map((stat, index) => (
            <motion.div key={stat.label} variants={itemVariants}>
              <StatsCounter
                count={stat.count}
                label={stat.label}
                suffix={stat.suffix}
                isVisible={isIntersecting}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
