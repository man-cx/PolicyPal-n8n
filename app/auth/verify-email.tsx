import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@contexts/ThemeContext';
import { useAuth } from '@contexts/AuthContext';

export default function VerifyEmailScreen() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  const { login } = useAuth();
  const params = useLocalSearchParams();
  
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState(params.email as string || '');
  const [timer, setTimer] = useState(0);
  
  useEffect(() => {
    if (timer > 0) {
      const countDown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countDown);
    }
  }, [timer]);

  const handleVerify = async () => {
    if (!code) {
      setError(t('please_enter_verification_code'));
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      if (code.length === 6) {
        Alert.alert(
          t('verification_successful'),
          t('email_verified_successfully'),
          [
            { 
              text: t('continue'), 
              onPress: () => router.push('./login')
            }
          ]
        );
      } else {
        throw new Error('Invalid code');
      }
    } catch (err) {
      setError(t('invalid_verification_code'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (timer > 0) return;
    
    setIsResending(true);
    setError('');
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setTimer(60);
      Alert.alert(
        t('code_sent'),
        t('verification_code_resent')
      );
    } catch (err) {
      setError(t('failed_to_resend_code'));
      console.error(err);
    } finally {
      setIsResending(false);
    }
  };

  const handleEditEmail = () => {
    router.back();
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
      
      <View style={styles.content}>
        <MaterialIcons 
          name="mark-email-read" 
          size={80} 
          color={theme.colors.primary[500]} 
          style={styles.icon}
        />
        
        <Text 
          style={[
            styles.title, 
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
          ]}
        >
          {t('verify_your_email')}
        </Text>
        
        <Text 
          style={[
            styles.description, 
            { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
          ]}
        >
          {t('verification_code_sent_to')} {email}
        </Text>
        
        <TouchableOpacity onPress={handleEditEmail}>
          <Text 
            style={[
              styles.editEmail,
              { color: theme.colors.primary[500] }
            ]}
          >
            {t('edit_email')}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.codeInputContainer}>
          <TextInput
            style={[
              styles.codeInput,
              { 
                backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100],
                color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
                borderColor: error ? theme.colors.status.error : isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200]
              }
            ]}
            placeholder={t('enter_verification_code')}
            placeholderTextColor={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted}
            keyboardType="number-pad"
            maxLength={6}
            value={code}
            onChangeText={setCode}
          />
        </View>
        
        {error ? (
          <Text style={[styles.errorText, { color: theme.colors.status.error }]}>
            {error}
          </Text>
        ) : null}
        
        <TouchableOpacity 
          style={[
            styles.verifyButton,
            { backgroundColor: theme.colors.primary[500] },
            isLoading && { opacity: 0.7 }
          ]}
          onPress={handleVerify}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.verifyButtonText}>
              {t('verify_email')}
            </Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.resendCodeButton}
          onPress={handleResendCode}
          disabled={isResending || timer > 0}
        >
          {isResending ? (
            <ActivityIndicator color={theme.colors.primary[500]} size="small" />
          ) : (
            <Text 
              style={[
                styles.resendCodeText,
                { color: timer > 0 ? theme.colors.text.muted : theme.colors.primary[500] }
              ]}
            >
              {timer > 0 ? `${t('resend_code')} (${timer}s)` : t('resend_code')}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  editEmail: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  codeInputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  codeInput: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
    borderWidth: 1,
    textAlign: 'center',
    letterSpacing: 8,
  },
  errorText: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  verifyButton: {
    width: '100%',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendCodeButton: {
    padding: 10,
  },
  resendCodeText: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 