
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

// Create a simple "database" in localStorage for users
const initializeUserDatabase = () => {
  if (!localStorage.getItem('user_database')) {
    localStorage.setItem('user_database', JSON.stringify([]));
  }
};

const getUserDatabase = (): any[] => {
  const data = localStorage.getItem('user_database');
  return data ? JSON.parse(data) : [];
};

const updateUserDatabase = (users: any[]) => {
  localStorage.setItem('user_database', JSON.stringify(users));
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Initialize the user database
    initializeUserDatabase();
    
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Get the user database
      const users = getUserDatabase();
      
      // Find the user with the provided email
      const foundUser = users.find((u: any) => u.email === email);
      
      // Check if user exists and password matches
      if (!foundUser || foundUser.password !== password) {
        throw new Error('Invalid email or password');
      }
      
      // Create a user object without the password
      const userObj: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        profileImage: foundUser.profileImage
      };
      
      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(userObj));
      
      // Set session expiry (8 hours from now)
      const expiryTime = new Date();
      expiryTime.setHours(expiryTime.getHours() + 8);
      localStorage.setItem('session_expiry', expiryTime.toISOString());
      
      setUser(userObj);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${userObj.name}!`,
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : 'Invalid email or password',
        variant: "destructive",
      });
      throw new Error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Get the user database
      const users = getUserDatabase();
      
      // Check if a user with the provided email already exists
      if (users.some((u: any) => u.email === email)) {
        throw new Error('A user with this email already exists');
      }
      
      // Create new user
      const newUser = {
        id: `user_${Date.now()}`,
        email,
        name,
        password, // In a real app, this would be hashed
        profileImage: undefined
      };
      
      // Add user to the database
      users.push(newUser);
      updateUserDatabase(users);
      
      // Create a user object without the password
      const userObj: User = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        profileImage: newUser.profileImage
      };
      
      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(userObj));
      
      // Set session expiry (8 hours from now)
      const expiryTime = new Date();
      expiryTime.setHours(expiryTime.getHours() + 8);
      localStorage.setItem('session_expiry', expiryTime.toISOString());
      
      setUser(userObj);
      
      toast({
        title: "Registration successful",
        description: `Welcome, ${name}!`,
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : 'Could not create account',
        variant: "destructive",
      });
      throw new Error('Could not create account');
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      if (!user) throw new Error('Not authenticated');
      
      // Get the user database
      const users = getUserDatabase();
      
      // Find the user index
      const userIndex = users.findIndex((u: any) => u.id === user.id);
      
      if (userIndex === -1) throw new Error('User not found');
      
      // Update user data
      users[userIndex] = {
        ...users[userIndex],
        ...userData
      };
      
      // Update database
      updateUserDatabase(users);
      
      // Update current user
      const updatedUser = {
        ...user,
        ...userData
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error) {
      console.error('Update profile error:', error);
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : 'Could not update profile',
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('financial_data');
    localStorage.removeItem('session_expiry');
    setUser(null);
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
