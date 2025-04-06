/**
 * Avatar Component
 * 
 * A reusable avatar component that can display an image or text initials.
 * Usage:
 *   <Avatar
 *     source={{ uri: 'https://example.com/avatar.jpg' }}
 *     size="medium"
 *   />
 *   <Avatar
 *     name="John Doe"
 *     size="large"
 *     backgroundColor="blue"
 *   />
 */

import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { colors, borderRadius } from '../../styles/theme';

// Helper function to get initials from a name
const getInitials = (name) => {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const Avatar = ({
  source,
  name,
  size = 'medium',
  backgroundColor,
  style,
  textStyle,
  ...props
}) => {
  // Determine size dimensions
  const sizes = {
    small: 32,
    medium: 48,
    large: 64,
    xlarge: 96
  };
  
  const avatarSize = sizes[size] || sizes.medium;
  const fontSize = avatarSize * 0.4;

  // Use provided backgroundColor or generate one based on name
  const bgColor = backgroundColor || (name ? 
    colors.avatarColors[Math.abs(name.charCodeAt(0)) % colors.avatarColors.length] : 
    colors.primary);

  const containerStyles = [
    styles.container,
    {
      width: avatarSize,
      height: avatarSize,
      borderRadius: avatarSize / 2,
      backgroundColor: source ? 'transparent' : bgColor
    },
    style
  ];

  const textStyles = [
    styles.text,
    { fontSize },
    textStyle
  ];

  // If we have an image source, render Image
  if (source) {
    return (
      <Image
        source={source}
        style={containerStyles}
        {...props}
      />
    );
  }

  // Otherwise, render a View with initials
  return (
    <View style={containerStyles} {...props}>
      <Text style={textStyles}>{getInitials(name)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
  }
});

export default Avatar; 