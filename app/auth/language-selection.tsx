import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from '@contexts/ThemeContext';
import i18n from '@i18n/index';

// Available languages
const languages = [
  { code: 'en', name: 'English', flag: require('@assets/flags/en.png') },
  { code: 'zh-CN', name: '简体中文', flag: require('@assets/flags/zh-CN.png') },
  { code: 'zh-TW', name: '繁體中文', flag: require('@assets/flags/zh-TW.png') },
];

export default function LanguageSelectionScreen() {
  const { t } = useTranslation();
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageSelect = async (langCode: string) => {
    setSelectedLanguage(langCode);
    await i18n.changeLanguage(langCode);
    // Save language preference
    try {
      await AsyncStorage.setItem('USER_LANGUAGE', langCode);
    } catch (error) {
      console.error('Failed to save language preference', error);
    }
  };

  const handleContinue = () => {
    router.push('./login');
  };

  return (
    <SafeAreaView 
      style={[
        styles.container, 
        { backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50] }
      ]}
    >
      {/* Theme Toggle */}
      <TouchableOpacity 
        style={styles.themeToggle}
        onPress={toggleTheme}
      >
        <MaterialIcons 
          name={isDarkMode ? "light-mode" : "dark-mode"} 
          size={24} 
          color={isDarkMode ? theme.colors.text.light : theme.colors.text.dark} 
        />
      </TouchableOpacity>
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image 
          source={require('@assets/icon.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
        <Text 
          style={[
            styles.headerText, 
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
          ]}
        >
          PolicyPal
        </Text>
      </View>
      
      {/* Content */}
      <View style={styles.contentContainer}>
        <Text 
          style={[
            styles.title, 
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
          ]}
        >
          {t('select_language')}
        </Text>
        
        <ScrollView style={styles.languageList}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageItem,
                { 
                  backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100],
                  borderColor: selectedLanguage === lang.code ? theme.colors.primary[500] : 'transparent',
                }
              ]}
              onPress={() => handleLanguageSelect(lang.code)}
            >
              <Image source={lang.flag} style={styles.flagIcon} />
              <Text
                style={[
                  styles.languageName,
                  { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
                ]}
              >
                {lang.name}
              </Text>
              {selectedLanguage === lang.code && (
                <MaterialIcons 
                  name="check-circle" 
                  size={24} 
                  color={theme.colors.primary[500]} 
                  style={styles.checkIcon}
                />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Continue Button */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          { backgroundColor: theme.colors.primary[500] }
        ]}
        onPress={handleContinue}
      >
        <Text style={styles.continueButtonText}>
          {t('continue')}
        </Text>
        <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  themeToggle: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
  headerContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
  contentContainer: {
    flex: 1,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  languageList: {
    flex: 1,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 2,
  },
  flagIcon: {
    width: 30,
    height: 20,
    marginRight: 15,
  },
  languageName: {
    fontSize: 18,
    flex: 1,
  },
  checkIcon: {
    marginLeft: 10,
  },
  continueButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    marginVertical: 30,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
}); 