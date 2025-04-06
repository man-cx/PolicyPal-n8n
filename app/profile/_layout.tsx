import React from 'react';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@contexts/ThemeContext';

export default function ProfileLayout() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[50],
        },
        headerTintColor: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, // Hide header on tab screen as it's already shown in tab navigator
        }}
      />
      <Stack.Screen
        name="edit-profile"
        options={{
          title: t('edit_profile'),
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: t('settings'),
        }}
      />
      <Stack.Screen
        name="language"
        options={{
          title: t('language_settings'),
        }}
      />
      <Stack.Screen
        name="theme"
        options={{
          title: t('theme_settings'),
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          title: t('notification_settings'),
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          title: t('about_app'),
        }}
      />
      <Stack.Screen
        name="help"
        options={{
          title: t('help_support'),
        }}
      />
    </Stack>
  );
} 