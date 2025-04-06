import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import language resources
import enTranslations from './locales/en.json';
import zhCNTranslations from './locales/zh-CN.json';
import zhTWTranslations from './locales/zh-TW.json';

// Set up i18next
i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {
        translation: enTranslations,
      },
      'zh-CN': {
        translation: zhCNTranslations,
      },
      'zh-TW': {
        translation: zhTWTranslations,
      },
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

// Function to load saved language preference
export const loadSavedLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem('language');
    if (savedLanguage) {
      await i18n.changeLanguage(savedLanguage);
    }
  } catch (error) {
    console.error('Failed to load language preference:', error);
  }
};

// Function to save language preference
export const saveLanguagePreference = async (language) => {
  try {
    await AsyncStorage.setItem('language', language);
    await i18n.changeLanguage(language);
  } catch (error) {
    console.error('Failed to save language preference:', error);
  }
};

export default i18n; 