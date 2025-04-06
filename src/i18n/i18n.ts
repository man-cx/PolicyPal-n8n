import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

// Import translations
import en from './locales/en.json';
import zhCN from './locales/zh-CN.json';
import zhTW from './locales/zh-TW.json';

// Create language detector
const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      // Check if user has saved language preference
      const savedLanguage = await AsyncStorage.getItem('user-language');
      
      if (savedLanguage) {
        return callback(savedLanguage);
      }
      
      // If no saved language, use device locale
      const deviceLocale = Localization.locale;
      return callback(deviceLocale);
    } catch (error) {
      console.error('Error detecting language:', error);
      return callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      await AsyncStorage.setItem('user-language', lng);
    } catch (error) {
      console.error('Error caching language:', error);
    }
  },
};

// Export function to load saved language
export const loadSavedLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem('user-language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  } catch (error) {
    console.error('Error loading saved language:', error);
  }
};

// Initialize i18next
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: en },
      'zh-CN': { translation: zhCN },
      'zh-TW': { translation: zhTW },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Prevents suspense issues with SSR
    },
  });

export default i18n; 