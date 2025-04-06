/**
 * PolicyPal Design System - Typography
 * 
 * This file contains text styles to be used consistently across the app.
 * Import these styles instead of creating inline styles for text components.
 */

import { StyleSheet } from 'react-native';
import { colors, fontSizes, fontWeights } from './theme';

// Base text styles
const base = {
  color: colors.textPrimary,
  fontSize: fontSizes.md,
  fontWeight: fontWeights.regular,
};

// Create the typography styles
const typography = StyleSheet.create({
  // Headings
  h1: {
    ...base,
    fontSize: fontSizes.xxxl,
    fontWeight: fontWeights.bold,
    marginBottom: 16,
  },
  h2: {
    ...base,
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.bold,
    marginBottom: 12,
  },
  h3: {
    ...base,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
    marginBottom: 8,
  },
  h4: {
    ...base,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
    marginBottom: 8,
  },
  
  // Body text
  body: {
    ...base,
  },
  bodyLarge: {
    ...base,
    fontSize: fontSizes.lg,
  },
  bodySmall: {
    ...base,
    fontSize: fontSizes.sm,
  },
  
  // Other text styles
  label: {
    ...base,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    marginBottom: 4,
  },
  caption: {
    ...base,
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
  },
  
  // Interactive text
  link: {
    ...base,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  button: {
    ...base,
    fontWeight: fontWeights.semibold,
    textAlign: 'center',
  },
  
  // Variants
  bold: {
    fontWeight: fontWeights.bold,
  },
  semibold: {
    fontWeight: fontWeights.semibold,
  },
  medium: {
    fontWeight: fontWeights.medium,
  },
  
  // Color variants
  primary: {
    color: colors.primary,
  },
  secondary: {
    color: colors.textSecondary,
  },
  light: {
    color: colors.textLight,
  },
  success: {
    color: colors.success,
  },
  error: {
    color: colors.error,
  },
  warning: {
    color: colors.warning,
  },
  muted: {
    color: colors.textMuted,
  },
  
  // Alignment
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
});

export default typography; 