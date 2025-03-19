
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export const useSessionCheck = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      return;
    }
    
    // Get the session expiry from localStorage
    const sessionExpiry = localStorage.getItem('session_expiry');
    
    if (!sessionExpiry) {
      // Set session expiry to 8 hours from now if it doesn't exist
      const expiryTime = new Date();
      expiryTime.setHours(expiryTime.getHours() + 8);
      localStorage.setItem('session_expiry', expiryTime.toISOString());
    } else {
      // Check if session has expired
      const expiryTime = new Date(sessionExpiry);
      const now = new Date();
      
      if (now > expiryTime) {
        // Session expired, log out user
        logout();
        toast({
          title: "Session expired",
          description: "Your session has expired. Please sign in again.",
          variant: "destructive",
        });
        navigate('/login');
      }
    }
    
    // Function to update activity
    const updateActivity = () => {
      // Extend session by 8 hours from now
      const expiryTime = new Date();
      expiryTime.setHours(expiryTime.getHours() + 8);
      localStorage.setItem('session_expiry', expiryTime.toISOString());
    };
    
    // Set up event listeners for user activity
    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keypress', updateActivity);
    window.addEventListener('click', updateActivity);
    window.addEventListener('scroll', updateActivity);
    
    // Set up interval to check session status
    const interval = setInterval(() => {
      const sessionExpiry = localStorage.getItem('session_expiry');
      if (sessionExpiry) {
        const expiryTime = new Date(sessionExpiry);
        const now = new Date();
        
        if (now > expiryTime) {
          logout();
          toast({
            title: "Session expired",
            description: "Your session has expired. Please sign in again.",
            variant: "destructive",
          });
          navigate('/login');
        }
      }
    }, 60000); // Check every minute
    
    return () => {
      // Clean up event listeners and interval
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keypress', updateActivity);
      window.removeEventListener('click', updateActivity);
      window.removeEventListener('scroll', updateActivity);
      clearInterval(interval);
    };
  }, [isAuthenticated, user, logout, navigate, toast]);
  
  return null;
};
