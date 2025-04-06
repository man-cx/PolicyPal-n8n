import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from '@contexts/ThemeContext';

export default function AboutScreen() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  
  // App version and build details
  const appVersion = '1.0.0';
  const appBuild = '2023.1';
  
  // Company details
  const companyInfo = {
    name: 'PolicyPal Ltd.',
    founded: '2022',
    employees: '50+',
    headquarters: 'San Francisco, CA',
    website: 'https://www.policypal.com',
  };
  
  // Social media handles
  const socialLinks = [
    { platform: 'Twitter', icon: 'twitter', url: 'https://twitter.com/policypal' },
    { platform: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/company/policypal' },
    { platform: 'Facebook', icon: 'facebook', url: 'https://facebook.com/policypal' },
    { platform: 'Instagram', icon: 'instagram', url: 'https://instagram.com/policypal' },
  ];
  
  // Open external links
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Could not open link', err));
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
          title: t('about_app'),
          headerStyle: {
            backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50],
          },
          headerTintColor: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
          headerShadowVisible: false,
        }}
      />
      
      {/* App logo and version */}
      <View
        style={[
          styles.headerSection,
          { 
            backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
            shadowColor: isDarkMode ? 'transparent' : theme.colors.neutral[900],
          }
        ]}
      >
        <View style={styles.iconContainer}>
          <MaterialIcons
            name="policy"
            size={60}
            color={theme.colors.primary[500]}
          />
        </View>
        <Text
          style={[
            styles.appName,
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
          ]}
        >
          PolicyPal
        </Text>
        <Text
          style={[
            styles.versionText,
            { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
          ]}
        >
          {t('version')} {appVersion} ({appBuild})
        </Text>
      </View>
      
      {/* App description */}
      <View
        style={[
          styles.sectionCard,
          { 
            backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
            shadowColor: isDarkMode ? 'transparent' : theme.colors.neutral[900],
          }
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
          ]}
        >
          {t('about_policypal')}
        </Text>
        <Text
          style={[
            styles.descriptionText,
            { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.dark }
          ]}
        >
          {t('app_description_paragraph1')}
        </Text>
        <Text
          style={[
            styles.descriptionText,
            { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.dark }
          ]}
        >
          {t('app_description_paragraph2')}
        </Text>
      </View>
      
      {/* Company information */}
      <View
        style={[
          styles.sectionCard,
          { 
            backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
            shadowColor: isDarkMode ? 'transparent' : theme.colors.neutral[900],
          }
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
          ]}
        >
          {t('company_info')}
        </Text>
        
        <View style={styles.companyDetails}>
          <View style={styles.detailRow}>
            <Text
              style={[
                styles.detailLabel,
                { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
              ]}
            >
              {t('company_name')}:
            </Text>
            <Text
              style={[
                styles.detailValue,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              {companyInfo.name}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text
              style={[
                styles.detailLabel,
                { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
              ]}
            >
              {t('founded')}:
            </Text>
            <Text
              style={[
                styles.detailValue,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              {companyInfo.founded}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text
              style={[
                styles.detailLabel,
                { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
              ]}
            >
              {t('team_size')}:
            </Text>
            <Text
              style={[
                styles.detailValue,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              {companyInfo.employees}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text
              style={[
                styles.detailLabel,
                { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
              ]}
            >
              {t('headquarters')}:
            </Text>
            <Text
              style={[
                styles.detailValue,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              {companyInfo.headquarters}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text
              style={[
                styles.detailLabel,
                { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
              ]}
            >
              {t('website')}:
            </Text>
            <TouchableOpacity onPress={() => openLink(companyInfo.website)}>
              <Text
                style={[
                  styles.linkText,
                  { color: theme.colors.primary[500] }
                ]}
              >
                {companyInfo.website.replace('https://', '')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      {/* Legal information */}
      <View
        style={[
          styles.sectionCard,
          { 
            backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
            shadowColor: isDarkMode ? 'transparent' : theme.colors.neutral[900],
          }
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
          ]}
        >
          {t('legal_info')}
        </Text>
        
        <TouchableOpacity 
          style={styles.legalButton}
          onPress={() => openLink('https://www.policypal.com/terms')}
        >
          <Text
            style={[
              styles.legalButtonText,
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('terms_of_service')}
          </Text>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted}
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.legalButton}
          onPress={() => openLink('https://www.policypal.com/privacy')}
        >
          <Text
            style={[
              styles.legalButtonText,
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('privacy_policy')}
          </Text>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted}
          />
        </TouchableOpacity>
      </View>
      
      {/* Social media links */}
      <View
        style={[
          styles.sectionCard,
          { 
            backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
            shadowColor: isDarkMode ? 'transparent' : theme.colors.neutral[900],
          }
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
          ]}
        >
          {t('follow_us')}
        </Text>
        
        <View style={styles.socialLinks}>
          {socialLinks.map((link, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.socialButton,
                { backgroundColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[100] }
              ]}
              onPress={() => openLink(link.url)}
            >
              <MaterialIcons
                name={link.icon as any}
                size={24}
                color={theme.colors.primary[500]}
              />
              <Text
                style={[
                  styles.socialText,
                  { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
                ]}
              >
                {link.platform}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {/* Copyright footer */}
      <View style={styles.footer}>
        <Text
          style={[
            styles.copyrightText,
            { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
          ]}
        >
          © {new Date().getFullYear()} {companyInfo.name} {t('all_rights_reserved')}
        </Text>
      </View>
      
      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerSection: {
    borderRadius: 16,
    marginBottom: 16,
    padding: 24,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  versionText: {
    fontSize: 14,
  },
  sectionCard: {
    borderRadius: 16,
    marginBottom: 16,
    padding: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  companyDetails: {
    marginTop: 8,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    width: 120,
  },
  detailValue: {
    fontSize: 14,
    flex: 1,
  },
  linkText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  legalButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  legalButtonText: {
    fontSize: 15,
  },
  socialLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    width: '48%',
  },
  socialText: {
    marginLeft: 10,
    fontSize: 14,
  },
  footer: {
    marginTop: 8,
    alignItems: 'center',
  },
  copyrightText: {
    fontSize: 12,
  },
  bottomSpace: {
    height: 40,
  },
}); 