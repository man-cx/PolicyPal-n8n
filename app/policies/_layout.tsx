import React from 'react';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@contexts/ThemeContext';

export default function PoliciesLayout() {
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
        name="[id]"
        options={{
          title: t('policy_details'),
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          title: t('add_policy'),
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          title: t('edit_policy'),
        }}
      />
      <Stack.Screen
        name="documents"
        options={{
          title: t('policy_documents'),
        }}
      />
    </Stack>
  );
} 