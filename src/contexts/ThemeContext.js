import React, { createContext, useState, useEffect, useContext } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors as lightColors } from '../styles/theme';

// Create a dark mode version of the theme colors
const darkColors = {
  // Primary colors
  primary: lightColors.primary,
  primaryDark: lightColors.primaryDark,
  primaryLight: lightColors.primaryLight,
  
  // Neutral colors
  dark: '#ecf0f1', // Inverted for dark mode
  medium: '#95a5a6',
  light: '#2c3e50', // Inverted for dark mode
  white: '#121212',
  
  // Background colors
  background: '#121212',
  backgroundLight: '#1e1e1e',
  backgroundDark: '#0a0a0a',
  backgroundDisabled: '#2c2c2c',
  
  // Status colors remain the same for visibility
  success: lightColors.success,
  warning: lightColors.warning,
  error: lightColors.error,
  info: lightColors.info,
  
  // Text colors
  textPrimary: '#ffffff',
  textSecondary: '#b3b3b3',
  textLight: '#1e1e1e',
  textMuted: '#6c757d',
  
  // Border colors
  border: 'rgba(255, 255, 255, 0.1)',
  borderLight: 'rgba(255, 255, 255, 0.05)',
  borderFocus: lightColors.primary,
  
  // Avatar colors
  avatarColors: lightColors.avatarColors,
};

// Create the theme context
const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const deviceTheme = useColorScheme();
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'
  const [colors, setColors] = useState(lightColors);
  
  // Load saved theme preference on mount
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        // Use device theme if no preference is saved, or use saved preference
        const themeToApply = savedTheme || deviceTheme || 'light';
        setTheme(themeToApply);
        setColors(themeToApply === 'dark' ? darkColors : lightColors);
      } catch (error) {
        console.error('Failed to load theme preference:', error);
      }
    };
    
    loadThemePreference();
  }, [deviceTheme]);
  
  // Function to toggle theme
  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setColors(newTheme === 'dark' ? darkColors : lightColors);
    
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };
  
  // Function to explicitly set theme
  const setThemeMode = async (mode) => {
    if (mode !== 'light' && mode !== 'dark') return;
    
    setTheme(mode);
    setColors(mode === 'dark' ? darkColors : lightColors);
    
    try {
      await AsyncStorage.setItem('theme', mode);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };
  
  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme: setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}; 