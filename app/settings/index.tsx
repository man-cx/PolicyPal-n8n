import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { useTheme } from '../../src/contexts/ThemeContext';

// Setting item type definition
interface SettingItem {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  route: string;
  color?: string;
}

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();

  // Settings sections and items
  const settingsSections = [
    {
      id: 'preferences',
      title: t('preferences'),
      items: [
        {
          id: 'language',
          title: t('language'),
          description: t('change_app_language'),
          icon: 'language',
          route: 'language',
        },
        {
          id: 'theme',
          title: t('appearance'),
          description: t('customize_app_theme'),
          icon: 'palette',
          route: 'theme',
        },
        {
          id: 'notifications',
          title: t('notifications'),
          description: t('manage_notification_preferences'),
          icon: 'notifications',
          route: 'notifications',
        },
      ] as SettingItem[],
    },
    {
      id: 'account',
      title: t('account'),
      items: [
        {
          id: 'account-settings',
          title: t('account_settings'),
          description: t('manage_account_details'),
          icon: 'person',
          route: 'account',
        },
        {
          id: 'security',
          title: t('security'),
          description: t('security_and_login_options'),
          icon: 'security',
          route: 'security',
        },
      ] as SettingItem[],
    },
    {
      id: 'about',
      title: t('about'),
      items: [
        {
          id: 'about-app',
          title: t('about_policypal'),
          description: t('app_version_and_info'),
          icon: 'info',
          route: 'about',
        },
        {
          id: 'privacy-policy',
          title: t('privacy_policy'),
          description: t('read_our_privacy_policy'),
          icon: 'shield',
          route: 'privacy',
        },
        {
          id: 'terms',
          title: t('terms_of_service'),
          description: t('read_terms_of_service'),
          icon: 'description',
          route: 'terms',
        },
      ] as SettingItem[],
    },
    {
      id: 'danger',
      title: t('danger_zone'),
      items: [
        {
          id: 'logout',
          title: t('logout'),
          description: t('sign_out_of_your_account'),
          icon: 'logout',
          route: 'logout',
          color: theme.colors.status.error,
        },
      ] as SettingItem[],
    },
  ];

  const handleSettingPress = (route: string) => {
    if (route === 'logout') {
      // Handle logout
      // TODO: Implement logout functionality
      console.log('Logout pressed');
      return;
    }
    
    router.push(route as any);
  };

  const renderSettingItem = (item: SettingItem) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.settingItem,
        { 
          borderBottomColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200] 
        }
      ]}
      onPress={() => handleSettingPress(item.route)}
    >
      <View style={styles.settingIcon}>
        <MaterialIcons
          name={item.icon}
          size={24}
          color={item.color || (isDarkMode ? theme.colors.primary[400] : theme.colors.primary[500])}
        />
      </View>
      <View style={styles.settingContent}>
        <Text
          style={[
            styles.settingTitle,
            { color: item.color || (isDarkMode ? theme.colors.text.light : theme.colors.text.dark) }
          ]}
        >
          {item.title}
        </Text>
        <Text
          style={[
            styles.settingDescription,
            { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
          ]}
        >
          {item.description}
        </Text>
      </View>
      <MaterialIcons
        name="chevron-right"
        size={24}
        color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted}
      />
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50] }
      ]}
      showsVerticalScrollIndicator={false}
    >
      {settingsSections.map((section) => (
        <View key={section.id} style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {section.title.toUpperCase()}
          </Text>
          <View
            style={[
              styles.card,
              { 
                backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
                shadowColor: isDarkMode ? 'transparent' : theme.colors.neutral[900],
              }
            ]}
          >
            {section.items.map(renderSettingItem)}
          </View>
        </View>
      ))}
      
      <View style={styles.versionContainer}>
        <Text
          style={[
            styles.versionText,
            { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
          ]}
        >
          PolicyPal v1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingContent: {
    flex: 1,
    marginLeft: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingBottom: 40,
  },
  versionText: {
    fontSize: 12,
  },
}); 