import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Package, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { motion } from "framer-motion";

interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  packageId: string;
  travelers: number;
  travelDate: string;
  totalAmount: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // Redirect to home if not authenticated or not admin
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user || !user.isAdmin)) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, user, toast]);

  // Fetch bookings
  useEffect(() => {
    if (user && user.isAdmin) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/admin/bookings');
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        throw new Error('Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch bookings",
        variant: "destructive",
      });
    } finally {
      setLoadingBookings(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Booking status updated successfully",
        });
        fetchBookings(); // Refresh bookings
      } else {
        throw new Error('Failed to update booking');
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      case 'completed':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const stats = {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    totalRevenue: bookings.reduce((sum, b) => sum + parseFloat(b.totalAmount), 0),
  };

  if (isLoading || !user || !user.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-accent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold text-navy-deep">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Manage bookings and monitor business performance
              </p>
            </div>
            <Button
              onClick={() => window.location.href = "/api/logout"}
              variant="outline"
              data-testid="button-logout"
            >
              Logout
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="text-total-bookings">
                  {stats.totalBookings}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600" data-testid="text-pending-bookings">
                  {stats.pendingBookings}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600" data-testid="text-confirmed-bookings">
                  {stats.confirmedBookings}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gold-accent" data-testid="text-total-revenue">
                  ${stats.totalRevenue.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bookings Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingBookings ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-accent mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading bookings...</p>
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">No bookings found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Customer</th>
                        <th className="text-left py-3 px-4 font-medium">Contact</th>
                        <th className="text-left py-3 px-4 font-medium">Package</th>
                        <th className="text-left py-3 px-4 font-medium">Travelers</th>
                        <th className="text-left py-3 px-4 font-medium">Amount</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-left py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium" data-testid={`text-customer-name-${booking.id}`}>
                                {booking.customerName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {new Date(booking.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 text-sm">
                                <Mail className="h-3 w-3" />
                                <span data-testid={`text-customer-email-${booking.id}`}>
                                  {booking.customerEmail}
                                </span>
                              </div>
                              {booking.customerPhone && (
                                <div className="flex items-center gap-1 text-sm">
                                  <Phone className="h-3 w-3" />
                                  <span>{booking.customerPhone}</span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-sm" data-testid={`text-package-id-${booking.id}`}>
                              {booking.packageId}
                            </div>
                            {booking.travelDate && (
                              <div className="text-xs text-gray-500">
                                Travel: {new Date(booking.travelDate).toLocaleDateString()}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4" data-testid={`text-travelers-${booking.id}`}>
                            {booking.travelers}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium" data-testid={`text-amount-${booking.id}`}>
                              ${parseFloat(booking.totalAmount).toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">
                              Payment: {booking.paymentStatus}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={`${getStatusColor(booking.status)} text-white`}>
                              {booking.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              {booking.status === 'pending' && (
                                <Button
                                  size="sm"
                                  onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                  className="bg-green-600 hover:bg-green-700"
                                  data-testid={`button-confirm-${booking.id}`}
                                >
                                  Confirm
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                data-testid={`button-cancel-${booking.id}`}
                              >
                                Cancel
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}