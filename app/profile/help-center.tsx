import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Stack, router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from '@contexts/ThemeContext';

// Help item type
interface HelpItem {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  route: string;
}

export default function HelpCenterScreen() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();

  // Help options
  const helpItems: HelpItem[] = [
    {
      id: 'faqs',
      title: t('frequently_asked_questions'),
      description: t('find_answers_to_common_questions'),
      icon: 'question-answer',
      route: 'faqs',
    },
    {
      id: 'contact',
      title: t('contact_support'),
      description: t('get_help_from_our_team'),
      icon: 'headset-mic',
      route: 'contact-support',
    },
    {
      id: 'user-guide',
      title: t('user_guide'),
      description: t('learn_how_to_use_policypal'),
      icon: 'menu-book',
      route: 'user-guide',
    },
    {
      id: 'tutorial',
      title: t('video_tutorials'),
      description: t('watch_helpful_tutorials'),
      icon: 'videocam',
      route: 'tutorials',
    },
  ];

  // Navigate to a specific route
  const navigateTo = (route: string) => {
    router.push(`/profile/${route}` as any);
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
          title: t('help_support'),
          headerStyle: {
            backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50],
          },
          headerTintColor: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
          headerShadowVisible: false,
        }}
      />
      
      {/* Header Section */}
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
            name="support-agent"
            size={40}
            color={theme.colors.primary[500]}
          />
        </View>
        <Text
          style={[
            styles.headerTitle,
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
          ]}
        >
          {t('how_can_we_help')}
        </Text>
        <Text
          style={[
            styles.headerDescription,
            { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
          ]}
        >
          {t('help_center_description')}
        </Text>
      </View>
      
      {/* Help Options */}
      <View
        style={[
          styles.optionsCard,
          { 
            backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
            shadowColor: isDarkMode ? 'transparent' : theme.colors.neutral[900],
          }
        ]}
      >
        {helpItems.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.helpItem,
              {
                borderBottomWidth: index < helpItems.length - 1 ? 1 : 0,
                borderBottomColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200],
              }
            ]}
            onPress={() => navigateTo(item.route)}
          >
            <View
              style={[
                styles.itemIconContainer,
                { backgroundColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[100] }
              ]}
            >
              <MaterialIcons
                name={item.icon}
                size={24}
                color={theme.colors.primary[500]}
              />
            </View>
            <View style={styles.itemContent}>
              <Text
                style={[
                  styles.itemTitle,
                  { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
                ]}
              >
                {item.title}
              </Text>
              <Text
                style={[
                  styles.itemDescription,
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
        ))}
      </View>
      
      {/* Direct Contact Section */}
      <View
        style={[
          styles.contactSection,
          { 
            backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
            shadowColor: isDarkMode ? 'transparent' : theme.colors.neutral[900],
          }
        ]}
      >
        <Text
          style={[
            styles.contactTitle,
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
          ]}
        >
          {t('need_immediate_help')}
        </Text>
        
        <TouchableOpacity
          style={[
            styles.supportButton,
            { backgroundColor: theme.colors.primary[500] }
          ]}
          onPress={() => navigateTo('contact-support')}
        >
          <MaterialIcons name="chat" size={18} color="white" style={styles.buttonIcon} />
          <Text style={styles.supportButtonText}>
            {t('contact_support_team')}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <MaterialIcons
              name="email"
              size={18}
              color={theme.colors.primary[500]}
              style={styles.contactIcon}
            />
            <Text
              style={[
                styles.contactText,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              support@policypal.com
            </Text>
          </View>
          
          <View style={styles.contactItem}>
            <MaterialIcons
              name="phone"
              size={18}
              color={theme.colors.primary[500]}
              style={styles.contactIcon}
            />
            <Text
              style={[
                styles.contactText,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              +1 (800) 123-4567
            </Text>
          </View>
        </View>
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
    padding: 20,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(74, 108, 247, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  optionsCard: {
    borderRadius: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  itemIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 13,
  },
  contactSection: {
    borderRadius: 16,
    marginBottom: 16,
    padding: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonIcon: {
    marginRight: 8,
  },
  supportButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactInfo: {
    marginTop: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactIcon: {
    marginRight: 10,
  },
  contactText: {
    fontSize: 15,
  },
  bottomSpace: {
    height: 40,
  },
}); 