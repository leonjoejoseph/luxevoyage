import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MapPin, Star, Users, Award } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-deep via-navy-deep to-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-navy-deep/70" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-serif font-bold mb-6"
          >
            <span className="text-gold-accent">Luxe</span>Voyage
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-gray-300"
          >
            Crafting extraordinary journeys that redefine luxury travel experiences
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-x-4"
          >
            <Button
              onClick={() => window.location.href = "/api/login"}
              size="lg"
              className="bg-gold-accent hover:bg-gold-accent/90 text-navy-deep font-semibold px-8 py-3 text-lg"
              data-testid="button-login"
            >
              Sign In to Explore
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gold-accent text-gold-accent hover:bg-gold-accent hover:text-navy-deep px-8 py-3 text-lg"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              data-testid="button-learn-more"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Why Choose <span className="text-gold-accent">LuxeVoyage</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the pinnacle of luxury travel with our carefully curated destinations and personalized service
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: MapPin,
                title: "Exclusive Destinations",
                description: "Access to the world's most luxurious and remote locations"
              },
              {
                icon: Star,
                title: "5-Star Service",
                description: "Personalized attention and 24/7 concierge support"
              },
              {
                icon: Users,
                title: "Expert Guides",
                description: "Local experts and professional guides for authentic experiences"
              },
              {
                icon: Award,
                title: "Premium Quality",
                description: "Only the finest accommodations and experiences"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-gold-accent" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gold-accent/20 to-gold-accent/10">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Sign in with your Google or Apple ID to access exclusive packages and personalized travel experiences
            </p>
            <Button
              onClick={() => window.location.href = "/api/login"}
              size="lg"
              className="bg-gold-accent hover:bg-gold-accent/90 text-navy-deep font-semibold px-12 py-4 text-xl"
              data-testid="button-get-started"
            >
              Get Started
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}