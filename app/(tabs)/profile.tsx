import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from '../../src/contexts/ThemeContext';
import { useAuth } from '../../src/contexts/AuthContext';

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <ScrollView 
      style={[
        styles.container, 
        { backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50] }
      ]}
    >
      {/* Profile Header */}
      <View 
        style={[
          styles.profileHeader, 
          { backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100] }
        ]}
      >
        <Image 
          source={{ uri: 'https://randomuser.me/api/portraits/women/54.jpg' }} 
          style={styles.profileImage} 
        />
        <View style={styles.profileInfo}>
          <Text 
            style={[
              styles.profileName, 
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {user?.displayName || 'Jane Doe'}
          </Text>
          <Text 
            style={[
              styles.profileEmail, 
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {user?.email || 'jane.doe@example.com'}
          </Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <MaterialIcons 
            name="edit" 
            size={20} 
            color={theme.colors.primary[500]} 
          />
        </TouchableOpacity>
      </View>

      {/* Account Settings */}
      <View style={styles.section}>
        <Text 
          style={[
            styles.sectionTitle, 
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
          ]}
        >
          {t('account_settings')}
        </Text>
        
        <View 
          style={[
            styles.settingCard, 
            { backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100] }
          ]}
        >
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <MaterialIcons name="person" size={24} color={theme.colors.primary[500]} />
            </View>
            <View style={styles.settingContent}>
              <Text 
                style={[
                  styles.settingTitle, 
                  { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
                ]}
              >
                {t('personal_information')}
              </Text>
              <Text 
                style={[
                  styles.settingDescription, 
                  { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
                ]}
              >
                {t('update_personal_info')}
              </Text>
            </View>
            <MaterialIcons 
              name="chevron-right" 
              size={24} 
              color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted} 
            />
          </TouchableOpacity>
          
          <View 
            style={[
              styles.divider, 
              { backgroundColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200] }
            ]} 
          />
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <MaterialIcons name="security" size={24} color={theme.colors.primary[500]} />
            </View>
            <View style={styles.settingContent}>
              <Text 
                style={[
                  styles.settingTitle, 
                  { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
                ]}
              >
                {t('security')}
              </Text>
              <Text 
                style={[
                  styles.settingDescription, 
                  { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
                ]}
              >
                {t('change_password_security_settings')}
              </Text>
            </View>
            <MaterialIcons 
              name="chevron-right" 
              size={24} 
              color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted} 
            />
          </TouchableOpacity>
          
          <View 
            style={[
              styles.divider, 
              { backgroundColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200] }
            ]} 
          />
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <MaterialIcons name="notifications" size={24} color={theme.colors.primary[500]} />
            </View>
            <View style={styles.settingContent}>
              <Text 
                style={[
                  styles.settingTitle, 
                  { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
                ]}
              >
                {t('notifications')}
              </Text>
              <Text 
                style={[
                  styles.settingDescription, 
                  { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
                ]}
              >
                {t('manage_notifications_settings')}
              </Text>
            </View>
            <MaterialIcons 
              name="chevron-right" 
              size={24} 
              color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted} 
            />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Preferences */}
      <View style={styles.section}>
        <Text 
          style={[
            styles.sectionTitle, 
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
          ]}
        >
          {t('preferences')}
        </Text>
        
        <View 
          style={[
            styles.settingCard, 
            { backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100] }
          ]}
        >
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <MaterialIcons 
                name={isDarkMode ? "dark-mode" : "light-mode"} 
                size={24} 
                color={theme.colors.primary[500]} 
              />
            </View>
            <View style={styles.settingContent}>
              <Text 
                style={[
                  styles.settingTitle, 
                  { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
                ]}
              >
                {t('dark_mode')}
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: theme.colors.primary[300] }}
              thumbColor={isDarkMode ? theme.colors.primary[500] : '#f4f3f4'}
            />
          </View>
          
          <View 
            style={[
              styles.divider, 
              { backgroundColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200] }
            ]} 
          />
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => handleLanguageChange('en')}
          >
            <View style={styles.settingIconContainer}>
              <MaterialIcons name="language" size={24} color={theme.colors.primary[500]} />
            </View>
            <View style={styles.settingContent}>
              <Text 
                style={[
                  styles.settingTitle, 
                  { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
                ]}
              >
                {t('language')}
              </Text>
              <Text 
                style={[
                  styles.settingDescription, 
                  { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
                ]}
              >
                {i18n.language === 'en' ? 'English' : 
                 i18n.language === 'zh-CN' ? '简体中文' : 
                 i18n.language === 'zh-TW' ? '繁體中文' : 'English'}
              </Text>
            </View>
            <MaterialIcons 
              name="chevron-right" 
              size={24} 
              color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted} 
            />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Help & Support */}
      <View style={styles.section}>
        <Text 
          style={[
            styles.sectionTitle, 
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
          ]}
        >
          {t('help_support')}
        </Text>
        
        <View 
          style={[
            styles.settingCard, 
            { backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100] }
          ]}
        >
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <MaterialIcons name="help" size={24} color={theme.colors.primary[500]} />
            </View>
            <View style={styles.settingContent}>
              <Text 
                style={[
                  styles.settingTitle, 
                  { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
                ]}
              >
                {t('help_center')}
              </Text>
            </View>
            <MaterialIcons 
              name="chevron-right" 
              size={24} 
              color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted} 
            />
          </TouchableOpacity>
          
          <View 
            style={[
              styles.divider, 
              { backgroundColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200] }
            ]} 
          />
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <MaterialIcons name="support-agent" size={24} color={theme.colors.primary[500]} />
            </View>
            <View style={styles.settingContent}>
              <Text 
                style={[
                  styles.settingTitle, 
                  { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
                ]}
              >
                {t('contact_support')}
              </Text>
            </View>
            <MaterialIcons 
              name="chevron-right" 
              size={24} 
              color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted} 
            />
          </TouchableOpacity>
          
          <View 
            style={[
              styles.divider, 
              { backgroundColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200] }
            ]} 
          />
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <MaterialIcons name="info" size={24} color={theme.colors.primary[500]} />
            </View>
            <View style={styles.settingContent}>
              <Text 
                style={[
                  styles.settingTitle, 
                  { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
                ]}
              >
                {t('about')}
              </Text>
            </View>
            <MaterialIcons 
              name="chevron-right" 
              size={24} 
              color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted} 
            />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Logout Button */}
      <TouchableOpacity 
        style={[
          styles.logoutButton, 
          { backgroundColor: '#F44336' }
        ]}
        onPress={logout}
      >
        <MaterialIcons name="logout" size={20} color="white" />
        <Text style={styles.logoutText}>{t('logout')}</Text>
      </TouchableOpacity>
      
      <View style={styles.versionContainer}>
        <Text 
          style={[
            styles.versionText, 
            { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
          ]}
        >
          {t('version')} 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
  },
  editButton: {
    padding: 8,
  },
  section: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  settingCard: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: 14,
    marginTop: 2,
  },
  divider: {
    height: 1,
    width: '100%',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 24,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  versionText: {
    fontSize: 12,
  },
}); 