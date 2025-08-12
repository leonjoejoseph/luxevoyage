import { useEffect } from "react";
import { useLocation } from "wouter";
import AuthForm from "@/components/auth/login-form";

export default function LoginPage() {
  const [, setLocation] = useLocation();

  const handleAuthSuccess = (user: any) => {
    console.log("User authenticated:", user);
    // Redirect to home page after successful login
    setLocation("/");
  };

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            // User is already authenticated, redirect to home
            setLocation("/");
          }
        }
      } catch (error) {
        // Not authenticated, stay on login page
        console.log("Not authenticated");
      }
    };

    checkAuth();
  }, [setLocation]);

  return <AuthForm onSuccess={handleAuthSuccess} />;
}