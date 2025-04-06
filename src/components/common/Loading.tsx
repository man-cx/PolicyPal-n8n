import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

interface LoadingIndicatorProps {
  size?: number | 'small' | 'large';
  color?: string;
  style?: ViewStyle;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  size = 'large', 
  color,
  style 
}) => {
  const { theme, isDarkMode } = useTheme();
  
  const indicatorColor = color || theme.colors.primary[500];
  
  return (
    <ActivityIndicator 
      size={size} 
      color={indicatorColor} 
      style={[styles.indicator, style]} 
    />
  );
};

interface LoadingScreenProps {
  message?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = 'Loading...', 
  style,
  textStyle
}) => {
  const { theme, isDarkMode } = useTheme();
  
  return (
    <View 
      style={[
        styles.container, 
        { backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50] },
        style
      ]}
    >
      <LoadingIndicator size="large" />
      {message && (
        <Text 
          style={[
            styles.message,
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark },
            textStyle
          ]}
        >
          {message}
        </Text>
      )}
    </View>
  );
};

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  transparent?: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  visible, 
  message,
  transparent = false
}) => {
  const { theme, isDarkMode } = useTheme();
  
  if (!visible) return null;
  
  return (
    <View 
      style={[
        styles.overlay,
        { 
          backgroundColor: transparent 
            ? 'rgba(0, 0, 0, 0.5)' 
            : isDarkMode 
              ? 'rgba(0, 0, 0, 0.8)' 
              : 'rgba(255, 255, 255, 0.9)'
        }
      ]}
    >
      <View 
        style={[
          styles.overlayContent,
          { 
            backgroundColor: transparent 
              ? 'transparent' 
              : isDarkMode 
                ? theme.colors.neutral[800] 
                : 'white',
            shadowColor: isDarkMode ? '#000' : 'rgba(0, 0, 0, 0.2)'
          }
        ]}
      >
        <LoadingIndicator size="large" />
        {message && (
          <Text 
            style={[
              styles.overlayMessage,
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {message}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  overlayContent: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  overlayMessage: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default LoadingIndicator; 