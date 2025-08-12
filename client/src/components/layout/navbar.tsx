import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AvatarGravatar from "@/components/ui/avatar-gravatar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [location] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is authenticated on component mount
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setUser(result.user);
          }
        }
      } catch (error) {
        console.log('User not authenticated');
      }
    };

    checkAuth();
  }, [location]); // Re-check on location change

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      setUser(null);
      toast({
        title: "Logged out successfully",
        description: "You have been signed out of your account."
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout failed",
        description: "There was an error signing out. Please try again.",
        variant: "destructive"
      });
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/packages", label: "Packages" },
    { href: "/contact", label: "Contact" },
    ...(user ? [{ href: "/bookings", label: "Booking History" }] : []),
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'nav-blur' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="text-2xl font-serif font-bold text-white">
              <span className="text-gold-accent">Luxe</span>Voyage
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-white hover:text-gold-accent transition-colors duration-300 ${
                    location === link.href ? 'text-gold-accent' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Authentication Button */}
              {user ? (
                <div className="flex items-center space-x-4">
                  <AvatarGravatar 
                    email={user?.email || ''}
                    firstName={user?.firstName || ''}
                    lastName={user?.lastName || ''}
                    size="md"
                  />
                  <span className="text-white text-sm">
                    Welcome, {user?.firstName}
                  </span>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-gold-accent hover:bg-transparent"
                    data-testid="button-logout"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-gold-accent hover:bg-transparent"
                    data-testid="button-login"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:text-gold-accent hover:bg-transparent"
              onClick={toggleMenu}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 w-64 h-full glassmorphism-dark md:hidden z-40"
          >
            <div className="p-6 mt-20">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-3 text-white hover:text-gold-accent transition-colors duration-300 ${
                    location === link.href ? 'text-gold-accent' : ''
                  }`}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Authentication */}
              <div className="border-t border-white/20 mt-6 pt-6">
                {user ? (
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <AvatarGravatar 
                        email={user?.email || ''}
                        firstName={user?.firstName || ''}
                        lastName={user?.lastName || ''}
                        size="sm"
                      />
                      <p className="text-white text-sm">Welcome, {user?.firstName}</p>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMenu();
                      }}
                      className="flex items-center py-3 text-white hover:text-gold-accent transition-colors duration-300"
                      data-testid="button-mobile-logout"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center py-3 text-white hover:text-gold-accent transition-colors duration-300"
                    onClick={closeMenu}
                    data-testid="button-mobile-login"
                  >
                    <User className="w-4 h-4 mr-3" />
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={closeMenu}
        />
      )}
    </>
  );
}
