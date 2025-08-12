import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Package, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";
import { useQuery } from "@tanstack/react-query";

interface Booking {
  id: string;
  packageTitle: string;
  packagePrice: string;
  status: "pending" | "confirmed" | "cancelled";
  bookingDate: string;
  travelDate?: string;
  notes?: string;
}

export default function BookingsPage() {
  const { user, loading } = useAuth();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['/api/bookings'],
    enabled: !!user,
  });

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-radial from-blue-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-accent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-radial from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-navy-deep mb-4">Please Sign In</h1>
          <p className="text-gray-600">You need to be signed in to view your booking history.</p>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-radial from-blue-50 to-white pt-24 pb-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-deep mb-4">
            Booking History
          </h1>
          <p className="text-xl text-gray-600">
            Track your luxury travel experiences
          </p>
        </motion.div>

        <div className="space-y-6">
          {bookings && bookings.length > 0 ? (
            bookings.map((booking: Booking, index: number) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassmorphismCard className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Package className="w-5 h-5 text-gold-accent" />
                        <h3 className="text-xl font-semibold text-navy-deep">
                          {booking.packageTitle}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Booked: {new Date(booking.bookingDate).toLocaleDateString()}</span>
                        </div>
                        {booking.travelDate && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>Travel: {booking.travelDate}</span>
                          </div>
                        )}
                        <div className="text-gold-accent font-semibold">
                          {booking.packagePrice}
                        </div>
                      </div>
                      
                      {booking.notes && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-700">{booking.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </GlassmorphismCard>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <GlassmorphismCard className="p-12">
                <Package className="w-16 h-16 text-gold-accent mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-navy-deep mb-2">
                  No Bookings Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start planning your next luxury adventure
                </p>
                <motion.a
                  href="/packages"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-gradient-luxury text-navy-deep px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Explore Packages
                </motion.a>
              </GlassmorphismCard>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}