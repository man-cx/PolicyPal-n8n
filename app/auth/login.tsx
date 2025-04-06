import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from '@contexts/ThemeContext';
import { useAuth } from '@contexts/AuthContext';

export default function LoginScreen() {
  const { t } = useTranslation();
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError(t('please_fill_all_fields'));
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (err) {
      setError(t('invalid_credentials'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('demo@example.com');
    setPassword('password123');
    
    setIsLoading(true);
    setError('');
    
    try {
      await login('demo@example.com', 'password123');
      router.replace('/(tabs)');
    } catch (err) {
      setError(t('demo_login_failed'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    router.navigate('../register');
  };

  const handleForgotPassword = () => {
    router.navigate('../forgot-password');
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
        
        {/* Logo and Header */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('@assets/images/icon.png')} 
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
          <Text 
            style={[
              styles.tagline, 
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {t('app_tagline')}
          </Text>
        </View>
        
        {/* Login Form */}
        <View style={styles.formContainer}>
          <Text 
            style={[
              styles.formTitle, 
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('login')}
          </Text>
          
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
          
          {/* Error Message */}
          {error ? (
            <Text style={styles.errorText}>
              {error}
            </Text>
          ) : null}
          
          {/* Login Button */}
          <TouchableOpacity 
            style={[
              styles.loginButton,
              { backgroundColor: theme.colors.primary[500] },
              isLoading && { opacity: 0.7 }
            ]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <Text style={styles.buttonText}>{t('logging_in')}</Text>
            ) : (
              <Text style={styles.buttonText}>{t('login')}</Text>
            )}
          </TouchableOpacity>
          
          {/* Forgot Password */}
          <TouchableOpacity 
            style={styles.forgotPasswordContainer}
            onPress={handleForgotPassword}
          >
            <Text 
              style={[
                styles.forgotPasswordText, 
                { color: theme.colors.primary[500] }
              ]}
            >
              {t('forgot_password')}
            </Text>
          </TouchableOpacity>
          
          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View 
              style={[
                styles.divider, 
                { backgroundColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[300] }
              ]} 
            />
            <Text 
              style={[
                styles.dividerText, 
                { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
              ]}
            >
              {t('or')}
            </Text>
            <View 
              style={[
                styles.divider, 
                { backgroundColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[300] }
              ]} 
            />
          </View>
          
          {/* Demo Login Button */}
          <TouchableOpacity 
            style={[
              styles.demoButton,
              { 
                backgroundColor: 'transparent',
                borderColor: theme.colors.primary[500],
                borderWidth: 1
              }
            ]}
            onPress={handleDemoLogin}
          >
            <Text 
              style={[
                styles.demoButtonText, 
                { color: theme.colors.primary[500] }
              ]}
            >
              {t('demo_login')}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Register Prompt */}
        <View style={styles.registerContainer}>
          <Text 
            style={[
              styles.registerText, 
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {t('dont_have_account')}
          </Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text 
              style={[
                styles.registerLink, 
                { color: theme.colors.primary[500] }
              ]}
            >
              {t('register')}
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
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    textAlign: 'center',
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
  loginButton: {
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
  forgotPasswordContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
  },
  demoButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  demoButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  registerText: {
    fontSize: 14,
    marginRight: 4,
  },
  registerLink: {
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 