import React, { useEffect } from 'react';
import { Drawer } from 'expo-router/drawer';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { ThemeProvider, useTheme } from '@contexts/ThemeContext';
import { AuthProvider, useAuth } from '@contexts/AuthContext';
import { loadSavedLanguage } from '@i18n/index';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Custom drawer content component
function CustomDrawerContent(props) {
  const { t } = useTranslation();
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    props.navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView
      {...props}
      style={{
        backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50],
      }}
    >
      {/* User Profile Section */}
      <View style={styles.userSection}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require('@assets/avatar-placeholder.png')}
            style={styles.profileImage}
          />
        </View>
        <Text
          style={[
            styles.userName,
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark },
          ]}
        >
          {user?.displayName || t('guest')}
        </Text>
        <Text
          style={[
            styles.userEmail,
            { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted },
          ]}
        >
          {user?.email || t('not_signed_in')}
        </Text>
      </View>

      {/* Drawer Items */}
      <DrawerItemList {...props} />

      {/* Theme Toggle */}
      <DrawerItem
        label={isDarkMode ? t('light_mode') : t('dark_mode')}
        icon={({ color, size }) => (
          <MaterialIcons
            name={isDarkMode ? 'light-mode' : 'dark-mode'}
            size={size}
            color={color}
          />
        )}
        onPress={toggleTheme}
        activeTintColor={theme.colors.primary[500]}
        inactiveTintColor={isDarkMode ? theme.colors.text.light : theme.colors.text.dark}
      />

      {/* Logout Button */}
      {user && (
        <DrawerItem
          label={t('logout')}
          icon={({ color, size }) => (
            <MaterialIcons name="logout" size={size} color={color} />
          )}
          onPress={handleLogout}
          activeTintColor={theme.colors.primary[500]}
          inactiveTintColor={isDarkMode ? theme.colors.text.light : theme.colors.text.dark}
        />
      )}
    </DrawerContentScrollView>
  );
}

// Main Layout component
function MainApp() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  const { isAuthenticated, isInitialized } = useAuth();

  useEffect(() => {
    // Load saved language preference
    loadSavedLanguage();
  }, []);

  useEffect(() => {
    // Hide splash screen once initialization is complete
    if (isInitialized) {
      SplashScreen.hideAsync();
    }
  }, [isInitialized]);

  if (!isInitialized) {
    return null;
  }

  // Show authentication stack if not authenticated
  if (!isAuthenticated) {
    return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
      </Stack>
    );
  }

  // Show main app with drawer navigation for authenticated users
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[50],
        },
        headerTintColor: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
        drawerStyle: {
          backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50],
          width: 280,
        },
        drawerActiveTintColor: theme.colors.primary[500],
        drawerInactiveTintColor: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: t('home'),
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="policies"
        options={{
          title: t('my_policies'),
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="description" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="advisor"
        options={{
          title: t('ai_advisor'),
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="support-agent" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="share"
        options={{
          title: t('policy_sharing'),
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="share" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: t('profile_settings'),
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}

// Root layout with providers
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // Add any custom fonts here if needed
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AuthProvider>
          <MainApp />
          <StatusBar />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  userSection: {
    padding: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
  },
}); 