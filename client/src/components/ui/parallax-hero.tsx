import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ParallaxHeroProps {
  backgroundImage: string;
  title: string;
  subtitle?: string;
  height?: string;
  children?: React.ReactNode;
}

export default function ParallaxHero({
  backgroundImage,
  title,
  subtitle,
  height = "h-screen",
  children
}: ParallaxHeroProps) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`relative ${height} overflow-hidden`}>
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          transform: `translateY(${offsetY}px)`,
          willChange: "transform",
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-overlay" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto px-6"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
            {typeof title === 'string' ? (
              title === "Discover Extraordinary Journeys" ? (
                <>
                  Discover Extraordinary <span className="text-gold-accent">Journeys</span>
                </>
              ) : title
            ) : title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl mb-8">
              {subtitle}
            </p>
          )}
          {children}
        </motion.div>
      </div>
    </div>
  );
}
