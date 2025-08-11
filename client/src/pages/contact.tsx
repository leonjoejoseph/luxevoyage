import { motion } from "framer-motion";
import ParallaxHero from "@/components/ui/parallax-hero";
import ContactForm from "@/components/contact/contact-form";
import ContactInfo from "@/components/contact/contact-info";

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <ParallaxHero
        backgroundImage="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        title="Plan Your Journey"
        subtitle="Let our travel experts create your perfect luxury experience"
        height="h-96"
      />

      {/* Contact Section */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>

          {/* Project Disclaimer */}
          <div className="mt-16 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              <i className="fas fa-info-circle mr-2"></i>
              This is a project created for competition purposes. LuxeVoyage is a fictional travel agency.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
