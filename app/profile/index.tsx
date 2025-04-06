import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Stack, router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from '../../src/contexts/ThemeContext';
import { useAuth } from '../../src/contexts/AuthContext';

// Mock user data
const userData = {
  name: 'Sarah Johnson',
  email: 'sarah.j@example.com',
  phone: '+1 (555) 123-4567',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  memberSince: '2022-06-15',
  address: '123 Main Street, Apt 4B',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  country: 'United States',
  policies: 3,
  claims: 2,
  documents: 8,
};

// Action item type
interface ActionItem {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  route: string;
}

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  const { user, logout } = useAuth();

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Action items
  const actionItems: ActionItem[] = [
    {
      id: 'edit-profile',
      title: t('edit_profile'),
      description: t('update_personal_information'),
      icon: 'edit',
      route: 'edit-profile',
    },
    {
      id: 'settings',
      title: t('settings'),
      description: t('manage_app_settings'),
      icon: 'settings',
      route: 'settings',
    },
    {
      id: 'help',
      title: t('help_support'),
      description: t('get_assistance_answers'),
      icon: 'help',
      route: 'help-center',
    },
    {
      id: 'about',
      title: t('about_policypal'),
      description: t('version_legal_information'),
      icon: 'info',
      route: 'about',
    },
  ];

  // Navigate to a specific route
  const navigateTo = (route: string) => {
    router.push(route as any);
  };

  // Handle logout
  const handleLogout = () => {
    // Implement logout functionality
    if (logout) {
      logout();
    }
    console.log('User logged out');
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
          title: t('profile'),
          headerStyle: {
            backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50],
          },
          headerTintColor: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
          headerShadowVisible: false,
        }}
      />
      
      {/* Profile Card */}
      <View
        style={[
          styles.profileCard,
          { 
            backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
            shadowColor: isDarkMode ? 'transparent' : theme.colors.neutral[900],
          }
        ]}
      >
        <View style={styles.profileHeader}>
          <Image source={{ uri: userData.avatar }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text
              style={[
                styles.userName,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              {userData.name}
            </Text>
            <Text
              style={[
                styles.userEmail,
                { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
              ]}
            >
              {userData.email}
            </Text>
            <Text
              style={[
                styles.memberSince,
                { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
              ]}
            >
              {t('member_since')} {formatDate(userData.memberSince)}
            </Text>
            <TouchableOpacity
              style={[
                styles.editProfileButton,
                { backgroundColor: theme.colors.primary[500] }
              ]}
              onPress={() => navigateTo('edit-profile')}
            >
              <MaterialIcons name="edit" size={16} color="white" style={styles.buttonIcon} />
              <Text style={styles.editButtonText}>{t('edit_profile')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      {/* Account Statistics */}
      <View
        style={[
          styles.statsCard,
          { 
            backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
            shadowColor: isDarkMode ? 'transparent' : theme.colors.neutral[900],
          }
        ]}
      >
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text
              style={[
                styles.statNumber,
                { color: theme.colors.primary[500] }
              ]}
            >
              {userData.policies}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
              ]}
            >
              {t('policies')}
            </Text>
          </View>
          <View
            style={[
              styles.statDivider,
              { backgroundColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200] }
            ]}
          />
          <View style={styles.statItem}>
            <Text
              style={[
                styles.statNumber,
                { color: theme.colors.primary[500] }
              ]}
            >
              {userData.claims}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
              ]}
            >
              {t('claims')}
            </Text>
          </View>
          <View
            style={[
              styles.statDivider,
              { backgroundColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200] }
            ]}
          />
          <View style={styles.statItem}>
            <Text
              style={[
                styles.statNumber,
                { color: theme.colors.primary[500] }
              ]}
            >
              {userData.documents}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
              ]}
            >
              {t('documents')}
            </Text>
          </View>
        </View>
      </View>
      
      {/* Personal Information */}
      <View
        style={[
          styles.card,
          { 
            backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
            shadowColor: isDarkMode ? 'transparent' : theme.colors.neutral[900],
          }
        ]}
      >
        <View style={styles.cardHeader}>
          <View style={styles.sectionTitleContainer}>
            <MaterialIcons 
              name="person" 
              size={20} 
              color={theme.colors.primary[500]} 
            />
            <Text
              style={[
                styles.sectionTitle,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              {t('personal_information')}
            </Text>
          </View>
        </View>
        
        <View style={styles.infoRows}>
          <View style={styles.infoRow}>
            <Text
              style={[
                styles.infoLabel,
                { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
              ]}
            >
              {t('phone')}
            </Text>
            <Text
              style={[
                styles.infoValue,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              {userData.phone}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text
              style={[
                styles.infoLabel,
                { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
              ]}
            >
              {t('address')}
            </Text>
            <Text
              style={[
                styles.infoValue,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              {userData.address}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text
              style={[
                styles.infoLabel,
                { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
              ]}
            >
              {t('city')}
            </Text>
            <Text
              style={[
                styles.infoValue,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              {userData.city}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text
              style={[
                styles.infoLabel,
                { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
              ]}
            >
              {t('state_zip')}
            </Text>
            <Text
              style={[
                styles.infoValue,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              {userData.state}, {userData.zipCode}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text
              style={[
                styles.infoLabel,
                { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
              ]}
            >
              {t('country')}
            </Text>
            <Text
              style={[
                styles.infoValue,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              {userData.country}
            </Text>
          </View>
        </View>
      </View>
      
      {/* Quick Actions */}
      <View
        style={[
          styles.card,
          { 
            backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
            shadowColor: isDarkMode ? 'transparent' : theme.colors.neutral[900],
          }
        ]}
      >
        <View style={styles.cardHeader}>
          <View style={styles.sectionTitleContainer}>
            <MaterialIcons 
              name="settings" 
              size={20} 
              color={theme.colors.primary[500]} 
            />
            <Text
              style={[
                styles.sectionTitle,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              {t('quick_actions')}
            </Text>
          </View>
        </View>
        
        <View style={styles.actionList}>
          {actionItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.actionItem,
                {
                  borderBottomWidth: index < actionItems.length - 1 ? 1 : 0,
                  borderBottomColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200],
                }
              ]}
              onPress={() => navigateTo(item.route)}
            >
              <View style={styles.actionLeft}>
                <View 
                  style={[
                    styles.actionIcon,
                    { backgroundColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[100] }
                  ]}
                >
                  <MaterialIcons
                    name={item.icon}
                    size={22}
                    color={theme.colors.primary[500]}
                  />
                </View>
                <View style={styles.actionContent}>
                  <Text
                    style={[
                      styles.actionTitle,
                      { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      styles.actionDescription,
                      { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
                    ]}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {/* Logout Button */}
      <TouchableOpacity
        style={[
          styles.logoutButton,
          { 
            backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
            borderColor: theme.colors.status.error
          }
        ]}
        onPress={handleLogout}
      >
        <MaterialIcons
          name="logout"
          size={20}
          color={theme.colors.status.error}
          style={styles.buttonIcon}
        />
        <Text
          style={[
            styles.logoutText,
            { color: theme.colors.status.error }
          ]}
        >
          {t('logout')}
        </Text>
      </TouchableOpacity>

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileCard: {
    borderRadius: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 2,
  },
  memberSince: {
    fontSize: 12,
    marginBottom: 8,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  buttonIcon: {
    marginRight: 6,
  },
  editButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  statsCard: {
    borderRadius: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    padding: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    height: 30,
  },
  card: {
    borderRadius: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    padding: 16,
    paddingBottom: 12,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  infoRows: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  actionList: {
    paddingHorizontal: 16,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionContent: {
    marginLeft: 12,
    flex: 1,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSpace: {
    height: 40,
  },
}); 