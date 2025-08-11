import { motion } from "framer-motion";

export default function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-navy-deep flex items-center justify-center z-[9999]"
    >
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl font-serif text-gold-accent mb-4 animate-pulse-slow"
        >
          LuxeVoyage
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "4rem" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-1 bg-gold-accent mx-auto animate-pulse"
        />
      </div>
    </motion.div>
  );
}
