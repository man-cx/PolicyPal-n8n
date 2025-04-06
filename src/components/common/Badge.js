/**
 * Badge Component
 * 
 * A reusable badge component to display small counts, status or labels.
 * Usage:
 *   <Badge value="5" />
 *   <Badge value="New" variant="success" />
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, borderRadius, spacing, typography } from '../../styles/theme';

const Badge = ({
  value,
  variant = 'primary',
  size = 'medium',
  outlined = false,
  style,
  textStyle,
  ...props
}) => {
  // Set variant colors
  const variantColors = {
    primary: colors.primary,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
    neutral: colors.medium,
  };

  // Determine the color based on variant
  const bgColor = variantColors[variant] || variantColors.primary;
  
  // Determine size
  const sizeStyles = {
    small: {
      paddingHorizontal: spacing.xs,
      paddingVertical: 2,
      fontSize: typography.fontSize.xs,
      minWidth: 16,
      height: 16,
    },
    medium: {
      paddingHorizontal: spacing.sm,
      paddingVertical: 3,
      fontSize: typography.fontSize.xs,
      minWidth: 20,
      height: 20,
    },
    large: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      fontSize: typography.fontSize.sm,
      minWidth: 24,
      height: 24,
    },
  };
  
  const sizeStyle = sizeStyles[size] || sizeStyles.medium;

  // Set container styles based on variant and size
  const containerStyles = [
    styles.container,
    {
      backgroundColor: outlined ? 'transparent' : bgColor,
      borderColor: bgColor,
      borderWidth: outlined ? 1 : 0,
      paddingHorizontal: sizeStyle.paddingHorizontal,
      paddingVertical: sizeStyle.paddingVertical,
      minWidth: sizeStyle.minWidth,
      height: sizeStyle.height,
    },
    style,
  ];

  // Set text styles based on variant and size
  const badgeTextStyles = [
    styles.text,
    {
      color: outlined ? bgColor : colors.white,
      fontSize: sizeStyle.fontSize,
    },
    textStyle,
  ];

  // Convert to string to handle numeric values
  const displayValue = String(value);

  return (
    <View style={containerStyles} {...props}>
      <Text style={badgeTextStyles} numberOfLines={1}>
        {displayValue}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'center',
  },
});

export default Badge; 