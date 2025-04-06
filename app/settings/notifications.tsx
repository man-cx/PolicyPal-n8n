import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

import { useTheme } from '../../src/contexts/ThemeContext';

// Notification type definition
interface NotificationOption {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  enabled: boolean;
}

export default function NotificationPreferencesScreen() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  
  // Notification options state
  const [notificationOptions, setNotificationOptions] = useState<NotificationOption[]>([
    {
      id: 'policy-updates',
      title: t('policy_updates'),
      description: t('get_notified_about_policy_changes'),
      icon: 'policy',
      enabled: true,
    },
    {
      id: 'payment-reminders',
      title: t('payment_reminders'),
      description: t('receive_reminders_about_upcoming_payments'),
      icon: 'payment',
      enabled: true,
    },
    {
      id: 'renewal-notices',
      title: t('renewal_notices'),
      description: t('get_alerts_about_policy_renewals'),
      icon: 'autorenew',
      enabled: true,
    },
    {
      id: 'claim-updates',
      title: t('claim_updates'),
      description: t('receive_updates_about_your_claims'),
      icon: 'update',
      enabled: true,
    },
    {
      id: 'document-approvals',
      title: t('document_approvals'),
      description: t('notifications_when_documents_are_approved'),
      icon: 'description',
      enabled: false,
    },
    {
      id: 'new-features',
      title: t('new_features'),
      description: t('learn_about_new_app_features'),
      icon: 'new-releases',
      enabled: false,
    },
  ]);

  // Toggle notification setting
  const toggleNotification = (id: string) => {
    setNotificationOptions(
      notificationOptions.map((option) =>
        option.id === id ? { ...option, enabled: !option.enabled } : option
      )
    );
  };

  // Notification categories
  const notificationCategories = [
    {
      id: 'policy',
      title: t('policy_notifications'),
      options: notificationOptions.filter((option) => 
        ['policy-updates', 'renewal-notices'].includes(option.id)
      ),
    },
    {
      id: 'financial',
      title: t('financial_notifications'),
      options: notificationOptions.filter((option) => 
        ['payment-reminders'].includes(option.id)
      ),
    },
    {
      id: 'documents',
      title: t('document_notifications'),
      options: notificationOptions.filter((option) => 
        ['document-approvals'].includes(option.id)
      ),
    },
    {
      id: 'claims',
      title: t('claim_notifications'),
      options: notificationOptions.filter((option) => 
        ['claim-updates'].includes(option.id)
      ),
    },
    {
      id: 'app',
      title: t('app_notifications'),
      options: notificationOptions.filter((option) => 
        ['new-features'].includes(option.id)
      ),
    },
  ];

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
          title: t('notification_preferences'),
          headerStyle: {
            backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50],
          },
          headerTintColor: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
          headerShadowVisible: false,
        }}
      />
      
      {/* Top description card */}
      <View
        style={[
          styles.descriptionCard,
          { 
            backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
            shadowColor: isDarkMode ? 'transparent' : theme.colors.neutral[900],
          }
        ]}
      >
        <Text
          style={[
            styles.descriptionText,
            { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
          ]}
        >
          {t('notification_preferences_description')}
        </Text>
      </View>
      
      {/* Notification categories */}
      {notificationCategories.map((category) => (
        <View key={category.id} style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {category.title.toUpperCase()}
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
            {category.options.map((option) => (
              <View
                key={option.id}
                style={[
                  styles.notificationItem,
                  { 
                    borderBottomColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200],
                    borderBottomWidth: category.options.indexOf(option) < category.options.length - 1 ? 1 : 0,
                  }
                ]}
              >
                <View style={styles.notificationIcon}>
                  <MaterialIcons
                    name={option.icon}
                    size={24}
                    color={isDarkMode ? theme.colors.primary[400] : theme.colors.primary[500]}
                  />
                </View>
                <View style={styles.notificationContent}>
                  <Text
                    style={[
                      styles.notificationTitle,
                      { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
                    ]}
                  >
                    {option.title}
                  </Text>
                  <Text
                    style={[
                      styles.notificationDescription,
                      { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
                    ]}
                  >
                    {option.description}
                  </Text>
                </View>
                <Switch
                  value={option.enabled}
                  onValueChange={() => toggleNotification(option.id)}
                  trackColor={{ 
                    false: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[300],
                    true: theme.colors.primary[500] 
                  }}
                  thumbColor="white"
                  ios_backgroundColor={isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[300]}
                />
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  descriptionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
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
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 13,
  },
}); 