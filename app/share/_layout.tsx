import React from 'react';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@contexts/ThemeContext';

export default function ShareLayout() {
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
        name="new-share"
        options={{
          title: t('share_policy'),
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="shared-with-me"
        options={{
          title: t('shared_with_me'),
        }}
      />
      <Stack.Screen
        name="access-log"
        options={{
          title: t('access_log'),
        }}
      />
      <Stack.Screen
        name="manage-access"
        options={{
          title: t('manage_access'),
        }}
      />
    </Stack>
  );
} 