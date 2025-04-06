import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';

import { useTheme } from '../src/contexts/ThemeContext';
import { useAuth } from '../src/contexts/AuthContext';

export default function AppIndex() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  const { user, isAuthenticated, isInitialized } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a splash screen with loading for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      handleNavigation();
    }, 2000);

    return () => clearTimeout(timer);
  }, [isInitialized]);

  const handleNavigation = () => {
    if (isAuthenticated && user) {
      router.replace('/(tabs)');
    } else {
      router.replace('/auth/login');
    }
  };

  if (isLoading || !isInitialized) {
    return (
      <View 
        style={[
          styles.container, 
          { backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50] }
        ]}
      >
        <Image 
          source={require('@assets/images/icon.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
        <Text 
          style={[
            styles.appName, 
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
          ]}
        >
          PolicyPal
        </Text>
        <ActivityIndicator 
          size="large" 
          color={theme.colors.primary[500]} 
          style={styles.loader}
        />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  loader: {
    marginTop: 20,
  },
}); 