import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from '../../src/contexts/ThemeContext';
import { useAuth } from '../../src/contexts/AuthContext';

// Placeholder data for dashboard
const mockPolicies = [
  { id: '1', title: 'Health Insurance', status: 'Active', type: 'Health' },
  { id: '2', title: 'Auto Insurance', status: 'Active', type: 'Auto' },
  { id: '3', title: 'Home Insurance', status: 'Renewal Due', type: 'Home' },
];

const mockNotifications = [
  { id: '1', message: 'Your home insurance policy is due for renewal in 15 days', date: '2023-06-01' },
  { id: '2', message: 'New policy options available for your profile', date: '2023-05-28' },
];

export default function Dashboard() {
  const { t } = useTranslation();
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const handlePolicyPress = (policyId: string) => {
    router.push(`/policy/${policyId}`);
  };

  return (
    <ScrollView 
      style={[
        styles.container, 
        { backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50] }
      ]}
    >
      {/* Greeting and Theme Toggle */}
      <View style={styles.header}>
        <View>
          <Text 
            style={[
              styles.greeting, 
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('greeting', { name: user?.displayName || t('user') })}
          </Text>
          <Text 
            style={[
              styles.date, 
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {new Date().toLocaleDateString()}
          </Text>
        </View>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
          <MaterialIcons 
            name={isDarkMode ? "light-mode" : "dark-mode"} 
            size={24} 
            color={isDarkMode ? theme.colors.text.light : theme.colors.text.dark} 
          />
        </TouchableOpacity>
      </View>

      {/* Dashboard Summary */}
      <View style={styles.dashboardSummary}>
        <View 
          style={[
            styles.summaryCard, 
            { backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100] }
          ]}
        >
          <Text 
            style={[
              styles.summaryTitle, 
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('active_policies')}
          </Text>
          <Text 
            style={[
              styles.summaryValue, 
              { color: theme.colors.primary[500] }
            ]}
          >
            3
          </Text>
        </View>
        <View 
          style={[
            styles.summaryCard, 
            { backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100] }
          ]}
        >
          <Text 
            style={[
              styles.summaryTitle, 
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('pending_claims')}
          </Text>
          <Text 
            style={[
              styles.summaryValue, 
              { color: theme.colors.warning[500] }
            ]}
          >
            1
          </Text>
        </View>
      </View>

      {/* Recent Policies */}
      <View style={styles.section}>
        <Text 
          style={[
            styles.sectionTitle, 
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
          ]}
        >
          {t('recent_policies')}
        </Text>
        {mockPolicies.map(policy => (
          <TouchableOpacity 
            key={policy.id} 
            style={[
              styles.policyCard, 
              { backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100] }
            ]}
            onPress={() => handlePolicyPress(policy.id)}
          >
            <View style={styles.policyIcon}>
              <MaterialIcons 
                name={
                  policy.type === 'Health' ? 'medical-services' : 
                  policy.type === 'Auto' ? 'directions-car' : 'home'
                } 
                size={24} 
                color={theme.colors.primary[500]} 
              />
            </View>
            <View style={styles.policyDetails}>
              <Text 
                style={[
                  styles.policyTitle, 
                  { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
                ]}
              >
                {policy.title}
              </Text>
              <Text 
                style={[
                  styles.policyStatus, 
                  { 
                    color: policy.status === 'Active' ? 
                      theme.colors.success[500] : theme.colors.warning[500] 
                  }
                ]}
              >
                {policy.status}
              </Text>
            </View>
            <MaterialIcons 
              name="chevron-right" 
              size={24} 
              color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted} 
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Notifications */}
      <View style={styles.section}>
        <Text 
          style={[
            styles.sectionTitle, 
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
          ]}
        >
          {t('notifications')}
        </Text>
        {mockNotifications.map(notification => (
          <View 
            key={notification.id} 
            style={[
              styles.notificationCard, 
              { backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100] }
            ]}
          >
            <View style={styles.notificationIcon}>
              <MaterialIcons 
                name="notifications" 
                size={24} 
                color={theme.colors.info[500]} 
              />
            </View>
            <View style={styles.notificationDetails}>
              <Text 
                style={[
                  styles.notificationMessage, 
                  { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
                ]}
              >
                {notification.message}
              </Text>
              <Text 
                style={[
                  styles.notificationDate, 
                  { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
                ]}
              >
                {new Date(notification.date).toLocaleDateString()}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        style={[
          styles.logoutButton, 
          { backgroundColor: theme.colors.error[500] }
        ]}
        onPress={logout}
      >
        <Text style={styles.logoutText}>{t('logout')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
  },
  themeToggle: {
    padding: 8,
  },
  dashboardSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryCard: {
    width: '48%',
    padding: 16,
    borderRadius: 8,
  },
  summaryTitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  policyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  policyIcon: {
    marginRight: 16,
  },
  policyDetails: {
    flex: 1,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  policyStatus: {
    fontSize: 14,
  },
  notificationCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  notificationIcon: {
    marginRight: 16,
  },
  notificationDetails: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 14,
  },
  notificationDate: {
    fontSize: 12,
    marginTop: 4,
  },
  logoutButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
}); 