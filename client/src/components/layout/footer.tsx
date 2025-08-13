import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "wouter";

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/luxe_voyage25/", label: "Instagram" },
  { icon: Twitter, href: "https://x.com/luxevoyage25", label: "Twitter" },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/contact", label: "Contact" },
];

const contactInfo = [
  { icon: Phone, text: "+965 2222 9999", size: "w-5 h-5" },
  { icon: Mail, text: "luxevoyage25@gmail.com", size: "w-5 h-5" },
  { icon: MapPin, text: "Carmel School Kuwait", size: "w-5 h-5" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-serif font-bold mb-4">
              <span className="text-gold-accent">Luxe</span>Voyage
            </h3>
            <p className="text-gray-300 mb-6">
              Crafting extraordinary journeys that redefine luxury travel experiences.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-gold-accent rounded-full flex items-center justify-center text-navy-deep hover:bg-white transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xl font-serif font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-gold-accent transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-serif font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index} className="flex items-center text-gray-300">
                    <Icon className={`${item.size} mr-3 text-gold-accent`} />
                    {item.text}
                  </li>
                );
              })}
            </ul>
          </motion.div>


        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm"
        >
          <p>© 2025 LuxeVoyage. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            <i className="fas fa-info-circle mr-2"></i>
            This is a project created for competition purposes. LuxeVoyage is a fictional travel agency.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}