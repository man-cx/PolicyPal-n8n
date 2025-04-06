/**
 * Card Component
 * 
 * A reusable card component with different variants.
 * Usage:
 *   <Card>
 *     <Text>Card content goes here</Text>
 *   </Card>
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, borderRadius, shadows, spacing } from '../../styles/theme';

const Card = ({
  children,
  variant = 'default',
  onPress,
  style,
  contentStyle,
  ...props
}) => {
  const cardStyles = [
    styles.card,
    variant === 'elevated' && styles.elevatedCard,
    variant === 'outlined' && styles.outlinedCard,
    variant === 'flat' && styles.flatCard,
    style,
  ];

  const contentStyles = [
    styles.content,
    contentStyle,
  ];

  // If onPress is provided, make the card touchable
  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyles}
        onPress={onPress}
        activeOpacity={0.8}
        {...props}
      >
        <View style={contentStyles}>
          {children}
        </View>
      </TouchableOpacity>
    );
  }

  // Otherwise, render as a plain View
  return (
    <View style={cardStyles} {...props}>
      <View style={contentStyles}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundLight,
    borderRadius: borderRadius.lg,
    margin: spacing.xs,
    overflow: 'hidden',
  },
  elevatedCard: {
    ...shadows.md,
  },
  outlinedCard: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  flatCard: {
    backgroundColor: colors.backgroundLight,
    // No shadow or border
  },
  content: {
    padding: spacing.lg,
  },
});

// Additional components for card structure
const CardHeader = ({ children, style, ...props }) => (
  <View style={[styles.header, style]} {...props}>
    {children}
  </View>
);

const CardFooter = ({ children, style, ...props }) => (
  <View style={[styles.footer, style]} {...props}>
    {children}
  </View>
);

const CardDivider = ({ style, ...props }) => (
  <View style={[styles.divider, style]} {...props} />
);

// Add styles for the additional components
Object.assign(styles, {
  header: {
    padding: spacing.md,
    paddingBottom: 0,
  },
  footer: {
    padding: spacing.md,
    paddingTop: 0,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
});

// Export the main component and sub-components
Card.Header = CardHeader;
Card.Footer = CardFooter;
Card.Divider = CardDivider;

export default Card; 