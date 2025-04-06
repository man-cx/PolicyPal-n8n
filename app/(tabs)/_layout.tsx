import React from 'react';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from '../../src/contexts/ThemeContext';

export default function TabLayout() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary[500],
        tabBarInactiveTintColor: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted,
        tabBarStyle: {
          backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[50],
        },
        headerStyle: {
          backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[50],
        },
        headerTintColor: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('dashboard_title'),
          tabBarLabel: t('dashboard_title'),
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="policies"
        options={{
          title: t('policies_title'),
          tabBarLabel: t('policies_title'),
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialIcons name="description" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="advisor"
        options={{
          title: t('advisor_title'),
          tabBarLabel: t('advisor_title'),
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialIcons name="support-agent" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="share"
        options={{
          title: t('sharing_title'),
          tabBarLabel: t('sharing_title'),
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialIcons name="share" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('profile_title'),
          tabBarLabel: t('profile_title'),
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}