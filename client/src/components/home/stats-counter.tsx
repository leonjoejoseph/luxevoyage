import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface StatsCounterProps {
  count: number;
  label: string;
  suffix?: string;
  isVisible: boolean;
}

export default function StatsCounter({ count, label, suffix = "", isVisible }: StatsCounterProps) {
  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 50;
    const increment = count / steps;
    const stepDuration = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCurrentCount(Math.min(Math.floor(increment * step), count));
      
      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [count, isVisible]);

  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl font-bold text-gold-accent mb-2"
      >
        {currentCount}{suffix}
      </motion.div>
      <p className="text-gray-400">{label}</p>
    </div>
  );
}
