import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from '@contexts/ThemeContext';

export default function TermsOfServiceScreen() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleAgree = async () => {
    try {
      await AsyncStorage.setItem('AGREED_TO_TERMS', 'true');
      router.push('./login');
    } catch (error) {
      console.error('Failed to save terms agreement', error);
    }
  };

  const toggleAgreement = () => {
    setAgreedToTerms(!agreedToTerms);
  };

  return (
    <SafeAreaView 
      style={[
        styles.container, 
        { backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50] }
      ]}
    >
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <MaterialIcons 
          name="arrow-back" 
          size={24} 
          color={isDarkMode ? theme.colors.text.light : theme.colors.text.dark} 
        />
      </TouchableOpacity>
      
      <Text 
        style={[
          styles.title, 
          { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
        ]}
      >
        {t('terms_of_service')}
      </Text>
      
      <ScrollView 
        style={[
          styles.termsContainer,
          { 
            backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100],
            borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[300],
          }
        ]}
      >
        <Text 
          style={[
            styles.termsText, 
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
          ]}
        >
          {`${t('terms_last_updated')}: May 1, 2023\n\n`}
          
          <Text style={styles.sectionTitle}>{t('terms_section_1_title')}</Text>
          {`\n${t('terms_section_1_content')}\n\n`}
          
          <Text style={styles.sectionTitle}>{t('terms_section_2_title')}</Text>
          {`\n${t('terms_section_2_content')}\n\n`}
          
          <Text style={styles.sectionTitle}>{t('terms_section_3_title')}</Text>
          {`\n${t('terms_section_3_content')}\n\n`}
          
          <Text style={styles.sectionTitle}>{t('terms_section_4_title')}</Text>
          {`\n${t('terms_section_4_content')}\n\n`}
          
          <Text style={styles.sectionTitle}>{t('terms_section_5_title')}</Text>
          {`\n${t('terms_section_5_content')}\n\n`}
        </Text>
      </ScrollView>
      
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.agreementContainer}
          onPress={toggleAgreement}
        >
          <MaterialIcons 
            name={agreedToTerms ? "check-box" : "check-box-outline-blank"} 
            size={24} 
            color={theme.colors.primary[500]} 
          />
          <Text 
            style={[
              styles.agreementText, 
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('i_agree_to_terms')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.agreeButton,
            { 
              backgroundColor: agreedToTerms ? theme.colors.primary[500] : theme.colors.neutral[400],
              opacity: agreedToTerms ? 1 : 0.5,
            }
          ]}
          onPress={handleAgree}
          disabled={!agreedToTerms}
        >
          <Text style={styles.agreeButtonText}>
            {t('continue')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={() => router.push('./login')}
        >
          <Text 
            style={[
              styles.skipButtonText, 
              { color: theme.colors.primary[500] }
            ]}
          >
            {t('skip_for_now')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 70,
    marginBottom: 20,
  },
  termsContainer: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
  },
  termsText: {
    fontSize: 14,
    lineHeight: 22,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  actionContainer: {
    marginTop: 'auto',
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  agreementText: {
    fontSize: 16,
    marginLeft: 10,
  },
  agreeButton: {
    width: '100%',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  agreeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButton: {
    padding: 10,
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: 16,
  },
}); 