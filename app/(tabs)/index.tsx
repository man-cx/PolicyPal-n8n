import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from '../../src/contexts/ThemeContext';
import { useAuth } from '../../src/contexts/AuthContext';

// Placeholder data for dashboard
const mockPolicies = [
  { id: '1', title: 'Health Insurance', status: 'Active', type: 'Health', coverage: '$250,000', premium: '$125/month' },
  { id: '2', title: 'Auto Insurance', status: 'Active', type: 'Auto', coverage: '$75,000', premium: '$95/month' },
  { id: '3', title: 'Home Insurance', status: 'Renewal Due', type: 'Home', coverage: '$450,000', premium: '$150/month' },
];

const mockClaims = [
  { id: '1', title: 'Medical Claim', status: 'Processing', amount: '$1,250', date: '2023-05-15', policyId: '1' },
];

const mockNotifications = [
  { id: '1', message: 'Your home insurance policy is due for renewal in 15 days', date: '2023-06-01', type: 'renewal' },
  { id: '2', message: 'New policy options available for your profile', date: '2023-05-28', type: 'offer' },
];

// Quick action shortcuts for dashboard
const quickActions = [
  { id: '1', title: 'Add Policy', icon: 'add', color: '#4CAF50', screen: '/policies/add' },
  { id: '2', title: 'File Claim', icon: 'description', color: '#2196F3', screen: '/claims/new' },
  { id: '3', title: 'Chat with AI', icon: 'chat', color: '#9C27B0', screen: '/advisor/chat' },
  { id: '4', title: 'Share Policy', icon: 'share', color: '#FF9800', screen: '/share/new-share' },
];

const { width } = Dimensions.get('window');

export default function Dashboard() {
  const { t } = useTranslation();
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  
  // Helper functions for colors
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active':
        return theme.colors.status.success;
      case 'Renewal Due':
        return theme.colors.status.warning;
      case 'Processing':
        return theme.colors.primary[500];
      default:
        return theme.colors.text.muted;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'renewal':
        return 'event';
      case 'offer':
        return 'local-offer';
      default:
        return 'notifications';
    }
  };

  const handlePolicyPress = (policyId: string) => {
    router.navigate('/(tabs)/policies');
  };

  const handleQuickAction = (screen: string) => {
    router.navigate('/(tabs)');
  };

  return (
    <ScrollView 
      style={[
        styles.container, 
        { backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50] }
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header with User Profile */}
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
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
            <MaterialIcons 
              name={isDarkMode ? "light-mode" : "dark-mode"} 
              size={24} 
              color={isDarkMode ? theme.colors.text.light : theme.colors.text.dark} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => router.navigate('/(tabs)/profile')}
          >
            <View style={[
              styles.profileFallback,
              { backgroundColor: theme.colors.primary[100] }
            ]}>
              <Text style={[
                styles.profileInitial,
                { color: theme.colors.primary[700] }
              ]}>
                {user?.displayName ? user.displayName[0].toUpperCase() : 'U'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Action Shortcuts */}
      <View style={styles.quickActions}>
        {quickActions.map(action => (
          <TouchableOpacity 
            key={action.id} 
            style={styles.quickActionItem}
            onPress={() => handleQuickAction(action.screen)}
          >
            <View style={[
              styles.quickActionIcon,
              { backgroundColor: action.color + '20' } // Adding 20% opacity
            ]}>
              <MaterialIcons 
                name="add" 
                size={24} 
                color={action.color} 
              />
            </View>
            <Text 
              style={[
                styles.quickActionTitle,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              {t(action.title.toLowerCase().replace(' ', '_'))}
            </Text>
          </TouchableOpacity>
        ))}
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
            {mockPolicies.filter(p => p.status === 'Active').length}
          </Text>
          <MaterialIcons 
            name="policy" 
            size={24} 
            color={theme.colors.primary[300]}
            style={styles.summaryIcon}
          />
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
              { color: theme.colors.status.warning }
            ]}
          >
            {mockClaims.length}
          </Text>
          <MaterialIcons 
            name="assignment" 
            size={24} 
            color={theme.colors.status.warning}
            style={styles.summaryIcon} 
          />
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
            {t('total_coverage')}
          </Text>
          <Text 
            style={[
              styles.summaryValue, 
              { color: theme.colors.status.success }
            ]}
          >
            $775K
          </Text>
          <MaterialIcons 
            name="shield" 
            size={24} 
            color={theme.colors.status.success}
            style={styles.summaryIcon} 
          />
        </View>
      </View>

      {/* Policy Overview Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text 
            style={[
              styles.sectionTitle, 
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('policy_overview')}
          </Text>
          <TouchableOpacity onPress={() => router.navigate('/(tabs)/policies')}>
            <Text style={[styles.viewAll, { color: theme.colors.primary[500] }]}>
              {t('view_all')}
            </Text>
          </TouchableOpacity>
        </View>
        
        {mockPolicies.map(policy => (
          <TouchableOpacity 
            key={policy.id} 
            style={[
              styles.policyCard, 
              { backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100] }
            ]}
            onPress={() => handlePolicyPress(policy.id)}
          >
            <View style={[
              styles.policyIconContainer,
              { backgroundColor: theme.colors.primary[50] }
            ]}>
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
              <View style={styles.policyInfo}>
                <Text style={[styles.policyInfoText, { color: theme.colors.text.muted }]}>
                  {policy.coverage}
                </Text>
                <Text style={[styles.policyInfoDivider, { color: theme.colors.text.muted }]}>•</Text>
                <Text style={[styles.policyInfoText, { color: theme.colors.text.muted }]}>
                  {policy.premium}
                </Text>
              </View>
            </View>
            <View style={styles.policyStatus}>
              <View style={[
                styles.statusIndicator, 
                { backgroundColor: getStatusColor(policy.status) }
              ]} />
              <Text 
                style={[
                  styles.statusText, 
                  { color: getStatusColor(policy.status) }
                ]}
              >
                {policy.status}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Claims */}
      {mockClaims.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text 
              style={[
                styles.sectionTitle, 
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              {t('recent_claims')}
            </Text>
            <TouchableOpacity onPress={() => router.navigate('/(tabs)')}>
              <Text style={[styles.viewAll, { color: theme.colors.primary[500] }]}>
                {t('view_all')}
              </Text>
            </TouchableOpacity>
          </View>
          
          {mockClaims.map(claim => (
            <TouchableOpacity 
              key={claim.id} 
              style={[
                styles.claimCard, 
                { backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100] }
              ]}
              onPress={() => router.navigate('/(tabs)')}
            >
              <View style={styles.claimDetails}>
                <Text 
                  style={[
                    styles.claimTitle, 
                    { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
                  ]}
                >
                  {claim.title}
                </Text>
                <View style={styles.claimInfo}>
                  <Text style={[styles.claimDate, { color: theme.colors.text.muted }]}>
                    {new Date(claim.date).toLocaleDateString()}
                  </Text>
                  <Text style={[styles.claimInfoDivider, { color: theme.colors.text.muted }]}>•</Text>
                  <Text style={[styles.claimAmount, { color: theme.colors.primary[500] }]}>
                    {claim.amount}
                  </Text>
                </View>
              </View>
              <View style={styles.claimStatus}>
                <Text 
                  style={[
                    styles.statusText, 
                    { color: getStatusColor(claim.status) }
                  ]}
                >
                  {claim.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Recent Notifications */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text 
            style={[
              styles.sectionTitle, 
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('notifications')}
          </Text>
          <TouchableOpacity onPress={() => router.navigate('/(tabs)')}>
            <Text style={[styles.viewAll, { color: theme.colors.primary[500] }]}>
              {t('view_all')}
            </Text>
          </TouchableOpacity>
        </View>
        
        {mockNotifications.map(notification => (
          <View 
            key={notification.id} 
            style={[
              styles.notificationCard, 
              { backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100] }
            ]}
          >
            <View style={[
              styles.notificationIconContainer,
              { backgroundColor: theme.colors.primary[50] }
            ]}>
              <MaterialIcons 
                name={getNotificationIcon(notification.type)} 
                size={24} 
                color={theme.colors.status.info} 
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
    marginBottom: 20,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
  },
  iconButton: {
    padding: 8,
    marginRight: 8,
  },
  profileButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileFallback: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickActionItem: {
    alignItems: 'center',
    width: (Dimensions.get('window').width - 64) / 4,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 12,
    textAlign: 'center',
  },
  dashboardSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryCard: {
    width: '31%',
    padding: 12,
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  summaryTitle: {
    fontSize: 12,
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  summaryIcon: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    opacity: 0.3,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    fontSize: 14,
  },
  policyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  policyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  policyDetails: {
    flex: 1,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  policyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  policyInfoText: {
    fontSize: 12,
  },
  policyInfoDivider: {
    marginHorizontal: 4,
    fontSize: 8,
  },
  policyStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  claimCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  claimDetails: {
    flex: 1,
  },
  claimTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  claimInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  claimDate: {
    fontSize: 12,
  },
  claimInfoDivider: {
    marginHorizontal: 4,
    fontSize: 8,
  },
  claimAmount: {
    fontSize: 12,
    fontWeight: '600',
  },
  claimStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  notificationCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationDetails: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 14,
    marginBottom: 4,
  },
  notificationDate: {
    fontSize: 12,
  },
}); 