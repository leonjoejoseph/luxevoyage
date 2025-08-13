import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

// Pages
import Home from "@/pages/home";
import Packages from "@/pages/packages";
import Contact from "@/pages/contact";
import Landing from "@/pages/landing";
import AdminDashboard from "@/pages/admin-dashboard";
import NotFound from "@/pages/not-found";

// Layout components
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Preloader from "@/components/layout/preloader";
import BackToTop from "@/components/layout/back-to-top";
import Lightbox from "@/components/ui/lightbox";
import AIChatbot from "@/components/ui/ai-chatbot";

function Router() {
  const { isAuthenticated, isLoading, user } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <Route path="/" component={Landing} />
      ) : (
        <>
          <Route path="/" component={Home} />
          {user && user.isAdmin && <Route path="/admin" component={AdminDashboard} />}
        </>
      )}
      <Route path="/packages" component={Packages} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate preloader delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          {isLoading && <Preloader />}
          
          <Navbar />
          <main>
            <Router />
          </main>
          <Footer />
          
          <BackToTop />
          <Lightbox />
          <AIChatbot />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
