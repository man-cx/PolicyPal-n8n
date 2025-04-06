import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

// Import translations
import en from './translations/en';
import zhCN from './translations/zh-CN';
import zhTW from './translations/zh-TW';

// Storage key for language preference
export const LANGUAGE_PREFERENCE_KEY = '@language';

// Available languages
export const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    translation: en,
    flag: '🇺🇸',
  },
  'zh-CN': {
    code: 'zh-CN',
    name: '简体中文',
    translation: zhCN,
    flag: '🇨🇳',
  },
  'zh-TW': {
    code: 'zh-TW',
    name: '繁體中文',
    translation: zhTW,
    flag: '🇹🇼',
  },
};

// Configure i18next
export const initI18n = () => {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3', // Required for Android
    resources: {
      en: {
        translation: LANGUAGES.en.translation,
      },
      'zh-CN': {
        translation: LANGUAGES['zh-CN'].translation,
      },
      'zh-TW': {
        translation: LANGUAGES['zh-TW'].translation,
      },
    },
    lng: Localization.locale, // Default to device locale
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

  // Load saved language preference
  loadSavedLanguage();

  return i18n;
};

// Function to change the language
export const changeLanguage = async (langCode: string) => {
  if (Object.keys(LANGUAGES).includes(langCode)) {
    i18n.changeLanguage(langCode);
    try {
      await AsyncStorage.setItem(LANGUAGE_PREFERENCE_KEY, langCode);
    } catch (error) {
      console.error('Failed to save language preference', error);
    }
  }
};

// Load language from storage
export const loadSavedLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_PREFERENCE_KEY);
    if (savedLanguage && Object.keys(LANGUAGES).includes(savedLanguage)) {
      i18n.changeLanguage(savedLanguage);
    }
  } catch (error) {
    console.error('Failed to load language preference', error);
  }
};

export default i18n; 