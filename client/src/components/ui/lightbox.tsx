import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface LightboxState {
  isOpen: boolean;
  imageSrc: string;
}

export default function Lightbox() {
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    imageSrc: ""
  });

  useEffect(() => {
    const handleLightboxOpen = (event: CustomEvent) => {
      setLightbox({
        isOpen: true,
        imageSrc: event.detail.src
      });
    };

    const handleLightboxClose = () => {
      setLightbox(prev => ({ ...prev, isOpen: false }));
    };

    // Listen for custom lightbox events
    window.addEventListener('openLightbox', handleLightboxOpen as EventListener);
    window.addEventListener('closeLightbox', handleLightboxClose);

    return () => {
      window.removeEventListener('openLightbox', handleLightboxOpen as EventListener);
      window.removeEventListener('closeLightbox', handleLightboxClose);
    };
  }, []);

  const handleClose = () => {
    setLightbox(prev => ({ ...prev, isOpen: false }));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {lightbox.isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-[1000] flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gold-accent transition-colors z-10"
          >
            <X size={32} />
          </button>

          {/* Image */}
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            src={lightbox.imageSrc}
            alt="Lightbox"
            className="max-w-full max-h-full object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Utility function to open lightbox
export const openLightbox = (imageSrc: string) => {
  const event = new CustomEvent('openLightbox', { detail: { src: imageSrc } });
  window.dispatchEvent(event);
};
