/**
 * Button Component
 * 
 * A reusable button component with different variants.
 * Usage:
 *   <Button 
 *     title="Click Me" 
 *     onPress={() => console.log('Button pressed')} 
 *     variant="primary" 
 *   />
 */

import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator 
} from 'react-native';
import { colors, borderRadius, spacing, fontSizes, fontWeights } from '../../styles/theme';

const variants = {
  primary: {
    background: colors.primary,
    text: colors.textLight,
    pressedBackground: colors.primaryDark,
  },
  secondary: {
    background: colors.backgroundLight,
    text: colors.primary,
    pressedBackground: colors.background,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  outlined: {
    background: 'transparent',
    text: colors.primary,
    pressedBackground: colors.backgroundLight,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  text: {
    background: 'transparent',
    text: colors.primary,
    pressedBackground: colors.backgroundLight,
  },
  danger: {
    background: colors.error,
    text: colors.textLight,
    pressedBackground: '#c0392b', // Darker red
  },
  success: {
    background: colors.success,
    text: colors.textLight,
    pressedBackground: '#27ae60', // Darker green
  },
};

const sizes = {
  small: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    fontSize: fontSizes.sm,
    height: 32,
  },
  medium: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    fontSize: fontSizes.md,
    height: 44,
  },
  large: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    fontSize: fontSizes.lg,
    height: 56,
  },
};

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  ...props
}) => {
  // Determine styles based on variant and size
  const variantStyle = variants[variant] || variants.primary;
  const sizeStyle = sizes[size] || sizes.medium;
  
  // Button content
  const buttonContent = (
    <>
      {loading ? (
        <ActivityIndicator 
          color={variantStyle.text} 
          size={size === 'small' ? 'small' : 'small'}
          style={styles.loader} 
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <>{icon}</>
          )}
          
          <Text 
            style={[
              styles.buttonText, 
              { color: variantStyle.text, fontSize: sizeStyle.fontSize },
              textStyle
            ]}
          >
            {title}
          </Text>
          
          {icon && iconPosition === 'right' && (
            <>{icon}</>
          )}
        </>
      )}
    </>
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: variantStyle.background,
          paddingVertical: sizeStyle.paddingVertical,
          paddingHorizontal: sizeStyle.paddingHorizontal,
          borderColor: variantStyle.borderColor,
          borderWidth: variantStyle.borderWidth || 0,
          opacity: disabled ? 0.6 : 1,
          width: fullWidth ? '100%' : undefined,
        },
        style
      ]}
      activeOpacity={0.8}
      {...props}
    >
      {buttonContent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: fontWeights.semibold,
    textAlign: 'center',
  },
  loader: {
    marginRight: spacing.xs,
  },
});

export default Button; 