import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';

import { useTheme } from '../../src/contexts/ThemeContext';

// Account setting item type
interface AccountSettingItem {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  route: string;
  isDanger?: boolean;
}

export default function AccountSettingsScreen() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();

  // Mock user data
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    memberSince: '2022-06-15',
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Account setting items
  const accountSettings: AccountSettingItem[] = [
    {
      id: 'personal-info',
      title: t('personal_information'),
      description: t('update_name_email_phone'),
      icon: 'person',
      route: 'personal-info',
    },
    {
      id: 'password',
      title: t('password'),
      description: t('change_your_password'),
      icon: 'lock',
      route: 'password',
    },
    {
      id: 'email',
      title: t('email_addresses'),
      description: t('manage_email_addresses'),
      icon: 'email',
      route: 'email',
    },
    {
      id: 'phone',
      title: t('phone_numbers'),
      description: t('manage_phone_numbers'),
      icon: 'phone',
      route: 'phone',
    },
    {
      id: 'privacy',
      title: t('privacy_settings'),
      description: t('manage_data_sharing'),
      icon: 'privacy-tip',
      route: 'privacy-settings',
    },
    {
      id: 'data',
      title: t('download_your_data'),
      description: t('export_your_account_data'),
      icon: 'download',
      route: 'download-data',
    },
    {
      id: 'delete',
      title: t('delete_account'),
      description: t('permanently_delete_account'),
      icon: 'delete-forever',
      route: 'delete-account',
      isDanger: true,
    },
  ];

  // Navigate to setting screen
  const navigateToSetting = (route: string) => {
    // For demo purposes, just console log
    console.log(`Navigate to: ${route}`);
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50] }
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Stack.Screen
        options={{
          title: t('account_settings'),
          headerStyle: {
            backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50],
          },
          headerTintColor: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
          headerShadowVisible: false,
        }}
      />
      
      {/* User profile summary */}
      <View
        style={[
          styles.profileCard,
          { 
            backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
            shadowColor: isDarkMode ? 'transparent' : theme.colors.neutral[900],
          }
        ]}
      >
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.profileInfo}>
          <Text
            style={[
              styles.userName,
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {user.name}
          </Text>
          <Text
            style={[
              styles.userEmail,
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {user.email}
          </Text>
          <Text
            style={[
              styles.memberSince,
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {t('member_since')} {formatDate(user.memberSince)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigateToSetting('personal-info')}
        >
          <MaterialIcons
            name="edit"
            size={20}
            color={isDarkMode ? theme.colors.primary[400] : theme.colors.primary[500]}
          />
        </TouchableOpacity>
      </View>
      
      {/* Account settings */}
      <View style={styles.settingsSection}>
        <Text
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
          ]}
        >
          {t('account_settings').toUpperCase()}
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
          {accountSettings.map((setting, index) => (
            <TouchableOpacity
              key={setting.id}
              style={[
                styles.settingItem,
                { 
                  borderBottomColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200],
                  borderBottomWidth: index < accountSettings.length - 1 ? 1 : 0,
                }
              ]}
              onPress={() => navigateToSetting(setting.route)}
            >
              <View style={styles.settingIcon}>
                <MaterialIcons
                  name={setting.icon}
                  size={24}
                  color={
                    setting.isDanger
                      ? theme.colors.status.error
                      : isDarkMode
                      ? theme.colors.primary[400]
                      : theme.colors.primary[500]
                  }
                />
              </View>
              <View style={styles.settingContent}>
                <Text
                  style={[
                    styles.settingTitle,
                    { 
                      color: setting.isDanger
                        ? theme.colors.status.error
                        : isDarkMode
                        ? theme.colors.text.light
                        : theme.colors.text.dark 
                    }
                  ]}
                >
                  {setting.title}
                </Text>
                <Text
                  style={[
                    styles.settingDescription,
                    { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
                  ]}
                >
                  {setting.description}
                </Text>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={
                  setting.isDanger
                    ? theme.colors.status.error
                    : isDarkMode
                    ? theme.colors.text.muted
                    : theme.colors.text.muted
                }
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 2,
  },
  memberSince: {
    fontSize: 12,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsSection: {
    marginBottom: 24,
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
    marginRight: 8,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
  },
}); 