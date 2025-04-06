import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Define types
export interface User {
  id: string;
  email: string;
  displayName: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | null>(null);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved user on mount
  useEffect(() => {
    const loadSavedUser = async () => {
      try {
        const savedUserData = await AsyncStorage.getItem('user');
        if (savedUserData) {
          setUser(JSON.parse(savedUserData));
        }
      } catch (error) {
        console.error('Failed to load saved user', error);
      } finally {
        setIsInitialized(true);
      }
    };

    loadSavedUser();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      // In a real app, you would call your API here
      // For demo purposes, we'll simulate a successful login
      // with some mock user data if the email matches demo@example.com
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'demo@example.com' && password === 'password123') {
        const userData: User = {
          id: '1',
          email: 'demo@example.com',
          displayName: 'Demo User',
        };
        
        // Save user to state and AsyncStorage
        setUser(userData);
        await AsyncStorage.setItem('user', JSON.stringify(userData));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      // In a real app, you would call your API to register the user
      // For demo purposes, we'll simulate a successful registration
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock user
      const userData: User = {
        id: Date.now().toString(),
        email,
        displayName: name,
      };
      
      // Save user to state and AsyncStorage
      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Clear user from state and AsyncStorage
      setUser(null);
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Logout failed', error);
      throw error;
    }
  };

  // Provide auth context values
  const authContextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isInitialized,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 