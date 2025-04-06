import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import ExampleScreen from './src/screens/ExampleScreen';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import './src/i18n'; // Import i18n configuration
import { loadSavedLanguage } from './src/i18n';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Create the stack navigator
const Stack = createStackNavigator();

// Main app component with navigation
function MainApp() {
  const { theme, colors } = useTheme();

  // Load saved language on mount
  useEffect(() => {
    loadSavedLanguage();
  }, []);

  return (
    <PaperProvider theme={{ dark: theme === 'dark' }}>
      <SafeAreaProvider>
        <NavigationContainer theme={{
          dark: theme === 'dark',
          colors: {
            primary: colors.primary,
            background: colors.background,
            card: colors.backgroundLight,
            text: colors.textPrimary,
            border: colors.border,
            notification: colors.error,
          }
        }}>
          <Stack.Navigator 
            initialRouteName="Example"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Example" component={ExampleScreen} />
            {/* Add more screens here as they are developed */}
          </Stack.Navigator>
          <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <MainApp />
          </ThemeProvider>
        </PersistGate>
      </ReduxProvider>
    </GestureHandlerRootView>
  );
} 