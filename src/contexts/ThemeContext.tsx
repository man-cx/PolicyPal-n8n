import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Light theme colors
export const lightColors = {
  primary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3', // Primary color
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  background: {
    light: '#FFFFFF',
    dark: '#121212',
  },
  status: {
    error: '#D32F2F',
    warning: '#FFA000',
    success: '#388E3C',
    info: '#0288D1',
  },
  text: {
    light: '#FFFFFF',
    dark: '#212121',
    muted: '#757575',
  },
  border: {
    light: '#E0E0E0',
    dark: '#424242',
  },
  avatar: {
    background: '#E3F2FD',
    text: '#1976D2',
  },
};

// Dark theme colors
export const darkColors = {
  primary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3', // Keep primary color the same
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
  },
  neutral: {
    50: '#212121',
    100: '#424242',
    200: '#616161',
    300: '#757575',
    400: '#9E9E9E',
    500: '#BDBDBD',
    600: '#E0E0E0',
    700: '#EEEEEE',
    800: '#303030', // Card background in dark mode
    900: '#212121', // App background in dark mode
  },
  background: {
    light: '#FFFFFF',
    dark: '#121212',
  },
  status: {
    error: '#EF5350',
    warning: '#FFB74D',
    success: '#66BB6A',
    info: '#29B6F6',
  },
  text: {
    light: '#FFFFFF',
    dark: '#212121',
    muted: '#9E9E9E',
  },
  border: {
    light: '#E0E0E0',
    dark: '#424242',
  },
  avatar: {
    background: '#1E3A5F',
    text: '#90CAF9',
  },
};

// Theme context interface
interface ThemeContextType {
  theme: {
    colors: typeof lightColors;
  };
  isDarkMode: boolean;
  toggleTheme: () => void;
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
}

// Create theme context
const ThemeContext = createContext<ThemeContextType | null>(null);

// Theme provider component
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>('system');
  
  // Determine if dark mode is active
  const isDarkMode = 
    themeMode === 'system' 
      ? colorScheme === 'dark' 
      : themeMode === 'dark';
  
  // Get current theme colors
  const theme = {
    colors: isDarkMode ? darkColors : lightColors,
  };
  
  // Load saved theme on mount
  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme-mode');
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
          setThemeMode(savedTheme);
        }
      } catch (error) {
        console.error('Failed to load saved theme', error);
      }
    };
    
    loadSavedTheme();
  }, []);
  
  // Toggle between light and dark mode
  const toggleTheme = () => {
    const newMode = isDarkMode ? 'light' : 'dark';
    setThemeMode(newMode);
    persistTheme(newMode);
  };
  
  // Set a specific theme mode
  const setThemeModeFunction = (mode: 'light' | 'dark' | 'system') => {
    setThemeMode(mode);
    persistTheme(mode);
  };
  
  // Save theme preference to storage
  const persistTheme = async (mode: string) => {
    try {
      await AsyncStorage.setItem('theme-mode', mode);
    } catch (error) {
      console.error('Failed to save theme', error);
    }
  };
  
  // Provide theme context values
  const themeContextValue: ThemeContextType = {
    theme,
    isDarkMode,
    toggleTheme,
    setThemeMode: setThemeModeFunction,
  };
  
  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 