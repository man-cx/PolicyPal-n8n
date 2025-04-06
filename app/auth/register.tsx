import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from '@contexts/ThemeContext';
import { useAuth } from '@contexts/AuthContext';

export default function RegisterScreen() {
  const { t } = useTranslation();
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { register } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError(t('please_fill_all_fields'));
      return;
    }
    
    if (password !== confirmPassword) {
      setError(t('passwords_do_not_match'));
      return;
    }
    
    if (password.length < 6) {
      setError(t('password_too_short'));
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      await register(name, email, password);
      // Navigate to login or tabs based on your auth flow
      router.navigate('../login');
    } catch (err) {
      setError(t('registration_failed'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
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
        
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackToLogin}
        >
          <MaterialIcons 
            name="arrow-back" 
            size={24} 
            color={isDarkMode ? theme.colors.text.light : theme.colors.text.dark} 
          />
        </TouchableOpacity>
        
        {/* Logo and Header */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/images/icon.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />
          <Text 
            style={[
              styles.appName, 
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            PolicyPal
          </Text>
        </View>
        
        {/* Register Form */}
        <View style={styles.formContainer}>
          <Text 
            style={[
              styles.formTitle, 
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('create_account')}
          </Text>
          
          {/* Name Input */}
          <View style={styles.inputContainer}>
            <MaterialIcons 
              name="person" 
              size={20} 
              color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted} 
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100],
                  color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
                }
              ]}
              placeholder={t('full_name')}
              placeholderTextColor={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted}
              value={name}
              onChangeText={setName}
            />
          </View>
          
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <MaterialIcons 
              name="email" 
              size={20} 
              color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted} 
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100],
                  color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
                }
              ]}
              placeholder={t('email')}
              placeholderTextColor={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          
          {/* Password Input */}
          <View style={styles.inputContainer}>
            <MaterialIcons 
              name="lock" 
              size={20} 
              color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted} 
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100],
                  color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
                }
              ]}
              placeholder={t('password')}
              placeholderTextColor={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity 
              style={styles.passwordToggle}
              onPress={() => setShowPassword(!showPassword)}
            >
              <MaterialIcons 
                name={showPassword ? "visibility-off" : "visibility"} 
                size={20} 
                color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted} 
              />
            </TouchableOpacity>
          </View>
          
          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <MaterialIcons 
              name="lock" 
              size={20} 
              color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted} 
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100],
                  color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
                }
              ]}
              placeholder={t('confirm_password')}
              placeholderTextColor={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted}
              secureTextEntry={!showPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          
          {/* Error Message */}
          {error ? (
            <Text style={styles.errorText}>
              {error}
            </Text>
          ) : null}
          
          {/* Register Button */}
          <TouchableOpacity 
            style={[
              styles.registerButton,
              { backgroundColor: theme.colors.primary[500] },
              isLoading && { opacity: 0.7 }
            ]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <Text style={styles.buttonText}>{t('registering')}</Text>
            ) : (
              <Text style={styles.buttonText}>{t('register')}</Text>
            )}
          </TouchableOpacity>
          
          {/* Terms and Conditions */}
          <Text 
            style={[
              styles.termsText, 
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {t('by_registering')} 
            <Text 
              style={[
                styles.termsLink, 
                { color: theme.colors.primary[500] }
              ]}
            >
              {t('terms_of_service')}
            </Text> 
            {t('and')} 
            <Text 
              style={[
                styles.termsLink, 
                { color: theme.colors.primary[500] }
              ]}
            >
              {t('privacy_policy')}
            </Text>
          </Text>
        </View>
        
        {/* Login Prompt */}
        <View style={styles.loginContainer}>
          <Text 
            style={[
              styles.loginText, 
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {t('already_have_account')}
          </Text>
          <TouchableOpacity onPress={handleBackToLogin}>
            <Text 
              style={[
                styles.loginLink, 
                { color: theme.colors.primary[500] }
              ]}
            >
              {t('login')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  themeToggle: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 8,
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 8,
    zIndex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  formContainer: {
    width: '100%',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    paddingLeft: 40,
    paddingRight: 16,
    fontSize: 16,
  },
  passwordToggle: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
  },
  errorText: {
    color: '#F44336',
    marginBottom: 16,
  },
  registerButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 18,
  },
  termsLink: {
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    fontSize: 14,
    marginRight: 4,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 