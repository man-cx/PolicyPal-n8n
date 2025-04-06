import React from 'react';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../../src/contexts/ThemeContext';

export default function SettingsLayout() {
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
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="index"
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
          title: t('notification_preferences'),
        }}
      />
      <Stack.Screen
        name="account"
        options={{
          title: t('account_settings'),
        }}
      />
      <Stack.Screen
        name="security"
        options={{
          title: t('security'),
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          title: t('about_policypal'),
        }}
      />
    </Stack>
  );
} 