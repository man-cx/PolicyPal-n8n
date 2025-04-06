import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import { useTheme } from '@contexts/ThemeContext';

interface TypingIndicatorProps {
  isVisible: boolean;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isVisible }) => {
  const { theme, isDarkMode } = useTheme();
  
  // Animation references
  const dot1Anim = useRef(new Animated.Value(0)).current;
  const dot2Anim = useRef(new Animated.Value(0)).current;
  const dot3Anim = useRef(new Animated.Value(0)).current;
  
  // Handle animations
  useEffect(() => {
    if (isVisible) {
      // First dot animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot1Anim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot1Anim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ).start();
      
      // Second dot animation with delay
      Animated.loop(
        Animated.sequence([
          Animated.delay(150),
          Animated.timing(dot2Anim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot2Anim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ).start();
      
      // Third dot animation with longer delay
      Animated.loop(
        Animated.sequence([
          Animated.delay(300),
          Animated.timing(dot3Anim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot3Anim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // Stop animations if not visible
      dot1Anim.stopAnimation();
      dot2Anim.stopAnimation();
      dot3Anim.stopAnimation();
    }
    
    return () => {
      // Cleanup animations on unmount
      dot1Anim.stopAnimation();
      dot2Anim.stopAnimation();
      dot3Anim.stopAnimation();
    };
  }, [isVisible, dot1Anim, dot2Anim, dot3Anim]);
  
  if (!isVisible) return null;
  
  return (
    <View style={[
      styles.container, 
      { backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[200] }
    ]}>
      <Animated.View style={[
        styles.dot,
        { 
          backgroundColor: isDarkMode ? theme.colors.primary[300] : theme.colors.primary[500],
          transform: [{ 
            translateY: dot1Anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -5]
            })
          }]
        }
      ]} />
      <Animated.View style={[
        styles.dot,
        { 
          backgroundColor: isDarkMode ? theme.colors.primary[300] : theme.colors.primary[500],
          transform: [{ 
            translateY: dot2Anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -5]
            })
          }]
        }
      ]} />
      <Animated.View style={[
        styles.dot,
        { 
          backgroundColor: isDarkMode ? theme.colors.primary[300] : theme.colors.primary[500],
          transform: [{ 
            translateY: dot3Anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -5]
            })
          }]
        }
      ]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 18,
    marginBottom: 16,
    alignItems: 'center',
    maxWidth: '80%',
    borderBottomLeftRadius: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
    opacity: 0.8,
  }
});

export default TypingIndicator; 