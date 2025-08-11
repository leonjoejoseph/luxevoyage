import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";

const contactItems = [
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
  },
  {
    icon: Mail,
    label: "Email",
    value: "concierge@luxevoyage.com",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "123 Luxury Lane, Beverly Hills, CA 90210",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon-Fri: 9AM-7PM, Sat-Sun: 10AM-6PM",
  },
];

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/luxe_voyage25/", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "https://x.com/luxevoyage25", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-8"
    >
      {/* Contact Information */}
      <GlassmorphismCard>
        <h3 className="text-2xl font-serif font-bold text-navy-deep mb-6">
          Get in Touch
        </h3>
        <div className="space-y-4">
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                whileHover={{ x: 5 }}
                className="flex items-center"
              >
                <div className="w-12 h-12 bg-gold-accent rounded-full flex items-center justify-center mr-4">
                  <Icon className="w-5 h-5 text-navy-deep" />
                </div>
                <div>
                  <p className="font-semibold text-navy-deep">{item.label}</p>
                  <p className="text-gray-600">{item.value}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Social Media */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h4 className="font-semibold text-navy-deep mb-4">Follow Our Journey</h4>
          <div className="flex space-x-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-navy-deep rounded-full flex items-center justify-center text-white hover:bg-gold-accent hover:text-navy-deep transition-colors duration-300"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </GlassmorphismCard>

      {/* Embedded Map */}
      <GlassmorphismCard className="p-0 overflow-hidden h-80">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.4037822!2d-118.3974632!3d34.0901491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc85670c8c91%3A0x123456789!2sBeverly%20Hills%2C%20CA%2C%20USA!5e0!3m2!1sen!2sus!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="LuxeVoyage Office Location"
        />
      </GlassmorphismCard>
    </motion.div>
  );
}
