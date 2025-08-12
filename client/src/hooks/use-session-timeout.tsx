import { useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseSessionTimeoutProps {
  onTimeout?: () => void;
  timeoutDuration?: number; // in milliseconds
}

export function useSessionTimeout({ 
  onTimeout, 
  timeoutDuration = 2 * 30 * 24 * 60 * 60 * 1000 // 2 months in milliseconds
}: UseSessionTimeoutProps = {}) {
  const { toast } = useToast();

  const checkSession = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include'
      });
      
      if (!response.ok) {
        // Session expired or invalid
        toast({
          title: "Session Expired",
          description: "Your session has expired. Please sign in again.",
          variant: "destructive",
        });
        onTimeout?.();
      }
    } catch (error) {
      console.error("Session check error:", error);
    }
  }, [toast, onTimeout]);

  // Activity tracking
  const resetSessionTimeout = useCallback(() => {
    // Update last activity timestamp
    localStorage.setItem('lastActivity', Date.now().toString());
  }, []);

  // Check for inactivity
  const checkInactivity = useCallback(() => {
    const lastActivity = localStorage.getItem('lastActivity');
    if (lastActivity) {
      const timeSinceActivity = Date.now() - parseInt(lastActivity);
      
      // If inactive for more than timeout duration, check session
      if (timeSinceActivity > timeoutDuration) {
        checkSession();
      }
    } else {
      // First time, set activity
      resetSessionTimeout();
    }
  }, [checkSession, resetSessionTimeout, timeoutDuration]);

  useEffect(() => {
    // Track user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const handleActivity = () => {
      resetSessionTimeout();
    };

    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Set up periodic session checks (every 30 minutes)
    const sessionCheckInterval = setInterval(checkInactivity, 30 * 60 * 1000);
    
    // Initial session check
    checkInactivity();

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      clearInterval(sessionCheckInterval);
    };
  }, [checkInactivity, resetSessionTimeout]);

  return {
    checkSession,
    resetSessionTimeout
  };
}