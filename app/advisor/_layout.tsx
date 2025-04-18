import React from 'react';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@contexts/ThemeContext';

export default function AdvisorLayout() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50],
        },
        headerTintColor: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50],
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, // Hide header on tab screen as it's already shown in tab navigator
        }}
      />
      <Stack.Screen
        name="chat"
        options={{
          title: t('ai_chat'),
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="history"
        options={{
          title: t('chat_history'),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="suggestion"
        options={{
          title: t('policy_suggestion'),
          presentation: 'modal',
        }}
      />
    </Stack>
  );
} 