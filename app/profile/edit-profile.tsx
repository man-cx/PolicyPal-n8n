import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Stack, router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { useTheme } from '../../src/contexts/ThemeContext';
import { useAuth } from '../../src/contexts/AuthContext';

// Initial form data (mock)
const initialFormData = {
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sarah.j@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Main Street, Apt 4B',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  country: 'United States',
};

export default function EditProfileScreen() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  const { user } = useAuth();

  // State for form data
  const [formData, setFormData] = useState(initialFormData);
  const [avatar, setAvatar] = useState('https://randomuser.me/api/portraits/women/44.jpg');
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleChange = (field: keyof typeof initialFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle save profile
  const handleSaveProfile = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        t('profile_updated'),
        t('profile_updated_success'),
        [{ text: t('ok'), onPress: () => router.back() }]
      );
    }, 1000);
  };

  // Handle cancel
  const handleCancel = () => {
    router.back();
  };

  // Handle avatar selection
  const handleAvatarPicker = async () => {
    try {
      // Request permissions
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(t('permission_denied'), t('permission_photo_message'));
          return;
        }
      }

      // Pick image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert(t('error'), t('error_selecting_image'));
    }
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
          title: t('edit_profile'),
          headerStyle: {
            backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50],
          },
          headerTintColor: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
          headerShadowVisible: false,
        }}
      />

      {/* Avatar Section */}
      <View style={styles.avatarSection}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <TouchableOpacity
            style={[
              styles.avatarEditButton,
              { backgroundColor: theme.colors.primary[500] }
            ]}
            onPress={handleAvatarPicker}
          >
            <MaterialIcons name="camera-alt" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.avatarHelperText,
            { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
          ]}
        >
          {t('tap_to_change_avatar')}
        </Text>
      </View>

      {/* Basic Information */}
      <View
        style={[
          styles.formSection,
          { 
            backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
            shadowColor: isDarkMode ? 'transparent' : theme.colors.neutral[900],
          }
        ]}
      >
        <View style={styles.sectionHeader}>
          <MaterialIcons name="person" size={20} color={theme.colors.primary[500]} />
          <Text
            style={[
              styles.sectionTitle,
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('basic_information')}
          </Text>
        </View>

        <View style={styles.formGroup}>
          <Text
            style={[
              styles.inputLabel,
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {t('first_name')}
          </Text>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[100],
                color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
                borderColor: isDarkMode ? theme.colors.neutral[600] : theme.colors.neutral[200],
              }
            ]}
            value={formData.firstName}
            onChangeText={(value) => handleChange('firstName', value)}
            placeholderTextColor={isDarkMode ? theme.colors.neutral[500] : theme.colors.neutral[400]}
            placeholder={t('enter_first_name')}
          />
        </View>

        <View style={styles.formGroup}>
          <Text
            style={[
              styles.inputLabel,
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {t('last_name')}
          </Text>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[100],
                color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
                borderColor: isDarkMode ? theme.colors.neutral[600] : theme.colors.neutral[200],
              }
            ]}
            value={formData.lastName}
            onChangeText={(value) => handleChange('lastName', value)}
            placeholderTextColor={isDarkMode ? theme.colors.neutral[500] : theme.colors.neutral[400]}
            placeholder={t('enter_last_name')}
          />
        </View>

        <View style={styles.formGroup}>
          <Text
            style={[
              styles.inputLabel,
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {t('email')}
          </Text>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[100],
                color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
                borderColor: isDarkMode ? theme.colors.neutral[600] : theme.colors.neutral[200],
              }
            ]}
            value={formData.email}
            onChangeText={(value) => handleChange('email', value)}
            placeholderTextColor={isDarkMode ? theme.colors.neutral[500] : theme.colors.neutral[400]}
            placeholder={t('enter_email')}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.formGroup}>
          <Text
            style={[
              styles.inputLabel,
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {t('phone')}
          </Text>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[100],
                color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
                borderColor: isDarkMode ? theme.colors.neutral[600] : theme.colors.neutral[200],
              }
            ]}
            value={formData.phone}
            onChangeText={(value) => handleChange('phone', value)}
            placeholderTextColor={isDarkMode ? theme.colors.neutral[500] : theme.colors.neutral[400]}
            placeholder={t('enter_phone')}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      {/* Address Information */}
      <View
        style={[
          styles.formSection,
          { 
            backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
            shadowColor: isDarkMode ? 'transparent' : theme.colors.neutral[900],
          }
        ]}
      >
        <View style={styles.sectionHeader}>
          <MaterialIcons name="location-on" size={20} color={theme.colors.primary[500]} />
          <Text
            style={[
              styles.sectionTitle,
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('address_information')}
          </Text>
        </View>

        <View style={styles.formGroup}>
          <Text
            style={[
              styles.inputLabel,
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {t('address')}
          </Text>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[100],
                color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
                borderColor: isDarkMode ? theme.colors.neutral[600] : theme.colors.neutral[200],
              }
            ]}
            value={formData.address}
            onChangeText={(value) => handleChange('address', value)}
            placeholderTextColor={isDarkMode ? theme.colors.neutral[500] : theme.colors.neutral[400]}
            placeholder={t('enter_address')}
          />
        </View>

        <View style={styles.formGroup}>
          <Text
            style={[
              styles.inputLabel,
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {t('city')}
          </Text>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[100],
                color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
                borderColor: isDarkMode ? theme.colors.neutral[600] : theme.colors.neutral[200],
              }
            ]}
            value={formData.city}
            onChangeText={(value) => handleChange('city', value)}
            placeholderTextColor={isDarkMode ? theme.colors.neutral[500] : theme.colors.neutral[400]}
            placeholder={t('enter_city')}
          />
        </View>

        <View style={styles.formRow}>
          <View style={[styles.formGroup, styles.formGroupHalf]}>
            <Text
              style={[
                styles.inputLabel,
                { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
              ]}
            >
              {t('state')}
            </Text>
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[100],
                  color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
                  borderColor: isDarkMode ? theme.colors.neutral[600] : theme.colors.neutral[200],
                }
              ]}
              value={formData.state}
              onChangeText={(value) => handleChange('state', value)}
              placeholderTextColor={isDarkMode ? theme.colors.neutral[500] : theme.colors.neutral[400]}
              placeholder={t('enter_state')}
            />
          </View>

          <View style={[styles.formGroup, styles.formGroupHalf]}>
            <Text
              style={[
                styles.inputLabel,
                { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
              ]}
            >
              {t('zip_code')}
            </Text>
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[100],
                  color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
                  borderColor: isDarkMode ? theme.colors.neutral[600] : theme.colors.neutral[200],
                }
              ]}
              value={formData.zipCode}
              onChangeText={(value) => handleChange('zipCode', value)}
              placeholderTextColor={isDarkMode ? theme.colors.neutral[500] : theme.colors.neutral[400]}
              placeholder={t('enter_zip_code')}
              keyboardType="number-pad"
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text
            style={[
              styles.inputLabel,
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {t('country')}
          </Text>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[100],
                color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
                borderColor: isDarkMode ? theme.colors.neutral[600] : theme.colors.neutral[200],
              }
            ]}
            value={formData.country}
            onChangeText={(value) => handleChange('country', value)}
            placeholderTextColor={isDarkMode ? theme.colors.neutral[500] : theme.colors.neutral[400]}
            placeholder={t('enter_country')}
          />
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[
            styles.cancelButton,
            { 
              backgroundColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200],
            }
          ]}
          onPress={handleCancel}
        >
          <Text
            style={[
              styles.cancelButtonText,
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('cancel')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.saveButton,
            { backgroundColor: theme.colors.primary[500] },
            isLoading && { opacity: 0.7 }
          ]}
          onPress={handleSaveProfile}
          disabled={isLoading}
        >
          {isLoading ? (
            <Text style={styles.saveButtonText}>
              {t('saving')}...
            </Text>
          ) : (
            <Text style={styles.saveButtonText}>
              {t('save_changes')}
            </Text>
          )}
        </TouchableOpacity>
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
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarEditButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  avatarHelperText: {
    fontSize: 12,
    marginTop: 5,
  },
  formSection: {
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formGroupHalf: {
    width: '48%',
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cancelButton: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 2,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpace: {
    height: 40,
  },
}); 