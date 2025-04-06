/**
 * PolicyPal Design System - Theme Tokens
 * 
 * This file contains all the design tokens (colors, spacing, etc.) used throughout the app.
 * Import these values instead of using hardcoded values to maintain consistency.
 */

// Color palette
export const colors = {
  // Primary colors
  primary: '#4a6cf7',
  primaryDark: '#3a5cf6',
  primaryLight: '#6a8cf8',
  
  // Neutral colors
  dark: '#2c3e50',
  medium: '#7f8c8d',
  light: '#ecf0f1',
  white: '#ffffff',
  
  // Background colors
  background: '#f5f7fa',
  backgroundLight: '#ffffff',
  backgroundDark: '#e5e9f0',
  backgroundDisabled: '#f1f1f1',
  
  // Status colors
  success: '#2ecc71',
  warning: '#f39c12',
  error: '#e74c3c',
  info: '#3498db',
  
  // Text colors
  textPrimary: '#2c3e50',
  textSecondary: '#7f8c8d',
  textLight: '#ffffff',
  textMuted: '#95a5a6',
  
  // Border colors
  border: 'rgba(0, 0, 0, 0.1)',
  borderLight: 'rgba(0, 0, 0, 0.05)',
  borderFocus: '#4a6cf7',
  
  // Avatar colors (for text avatars)
  avatarColors: [
    '#1abc9c', // Turquoise
    '#3498db', // Blue
    '#9b59b6', // Purple
    '#e74c3c', // Red
    '#f1c40f', // Yellow
    '#2ecc71', // Green
    '#e67e22', // Orange
    '#34495e', // Dark blue
  ],
};

// Spacing scale (in pixels)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius
export const borderRadius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 20,
  full: 9999,
};

// Shadows
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
};

// Typography
export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  }
};

// Animation/transitions
export const timing = {
  fast: 150,    // ms
  normal: 300,  // ms
  slow: 500,    // ms
};

// Screen dimensions (for different device sizes)
export const breakpoints = {
  phone: 375,
  tablet: 768,
};

// Z-index values
export const zIndices = {
  base: 0,
  card: 10,
  header: 20,
  modal: 30,
  toast: 40,
};

// Default theme object (combine all tokens)
export default {
  colors,
  spacing,
  borderRadius,
  shadows,
  typography,
  timing,
  breakpoints,
  zIndices,
}; 