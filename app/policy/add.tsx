import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

import { useTheme } from '../../src/contexts/ThemeContext';

// Policy types with icons and descriptions
const policyTypes = [
  { 
    id: 'health', 
    name: 'Health Insurance', 
    icon: 'medical-services',
    description: 'Medical expenses, disability, and critical illness coverage'
  },
  { 
    id: 'auto', 
    name: 'Auto Insurance', 
    icon: 'directions-car',
    description: 'Vehicle damage, liability, and theft protection'
  },
  { 
    id: 'home', 
    name: 'Home Insurance', 
    icon: 'home',
    description: 'Property damage and liability coverage for your home'
  },
  { 
    id: 'travel', 
    name: 'Travel Insurance', 
    icon: 'flight',
    description: 'Trip cancellation, medical emergencies, and lost luggage'
  },
  { 
    id: 'life', 
    name: 'Life Insurance', 
    icon: 'favorite',
    description: 'Financial protection for your beneficiaries'
  },
  { 
    id: 'business', 
    name: 'Business Insurance', 
    icon: 'business',
    description: 'Liability, property, and business interruption coverage'
  },
];

export default function AddPolicyScreen() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [policyTitle, setPolicyTitle] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [premium, setPremium] = useState('');
  const [coverageAmount, setCoverageAmount] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [insurerName, setInsurerName] = useState('');
  const [description, setDescription] = useState('');
  const [documents, setDocuments] = useState<{ uri: string; name: string; type: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectType = (typeId: string) => {
    setSelectedType(typeId);
  };

  const handleAddDocument = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const fileExtension = asset.uri.split('.').pop() || '';
        const fileName = `policy_doc_${Date.now()}.${fileExtension}`;
        const mimeType = asset.type || `image/${fileExtension}`;
        
        setDocuments([
          ...documents, 
          { 
            uri: asset.uri, 
            name: fileName, 
            type: mimeType 
          }
        ]);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert(t('error'), t('document_pick_error'));
    }
  };

  const removeDocument = (index: number) => {
    const newDocuments = [...documents];
    newDocuments.splice(index, 1);
    setDocuments(newDocuments);
  };

  const handleSavePolicy = () => {
    // Validate required fields
    if (!selectedType || !policyTitle || !policyNumber || !premium || !expiryDate) {
      Alert.alert(
        t('validation_error'),
        t('please_fill_required_fields')
      );
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        t('success'),
        t('policy_created_successfully'),
        [
          { text: t('ok'), onPress: () => router.navigate('/(tabs)/policies') }
        ]
      );
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Stack.Screen
        options={{
          title: t('add_new_policy'),
          headerStyle: {
            backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50],
          },
          headerTintColor: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
          headerShadowVisible: false,
          headerBackTitle: t('back'),
        }}
      />
      
      <ScrollView
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50] }
        ]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text 
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
          ]}
        >
          {t('policy_type')}
        </Text>
        <Text 
          style={[
            styles.sectionSubtitle,
            { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
          ]}
        >
          {t('select_policy_type')}
        </Text>
        
        <View style={styles.policyTypeGrid}>
          {policyTypes.map((type) => (
            <TouchableOpacity 
              key={type.id}
              style={[
                styles.policyTypeCard,
                { 
                  backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
                  borderColor: selectedType === type.id 
                    ? theme.colors.primary[500]
                    : isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200],
                  borderWidth: selectedType === type.id ? 2 : 1,
                }
              ]}
              onPress={() => handleSelectType(type.id)}
            >
              <View 
                style={[
                  styles.policyTypeIconContainer,
                  { 
                    backgroundColor: selectedType === type.id
                      ? theme.colors.primary[100]
                      : isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[100],
                  }
                ]}
              >
                <MaterialIcons 
                  name={type.icon as any} 
                  size={28} 
                  color={selectedType === type.id ? theme.colors.primary[500] : isDarkMode ? theme.colors.text.muted : theme.colors.neutral[500]} 
                />
              </View>
              <Text 
                style={[
                  styles.policyTypeName,
                  { 
                    color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
                    fontWeight: selectedType === type.id ? 'bold' : 'normal'
                  }
                ]}
              >
                {type.name}
              </Text>
              <Text 
                style={[
                  styles.policyTypeDescription,
                  { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
                ]}
                numberOfLines={2}
              >
                {type.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <Text 
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark },
            { marginTop: 24 }
          ]}
        >
          {t('policy_details')}
        </Text>
        <Text 
          style={[
            styles.sectionSubtitle,
            { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
          ]}
        >
          {t('enter_policy_information')}
        </Text>
        
        <View style={styles.inputGroup}>
          <Text 
            style={[
              styles.inputLabel,
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('policy_title')}*
          </Text>
          <TextInput
            style={[
              styles.textInput,
              { 
                backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
                color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
                borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200]
              }
            ]}
            placeholder={t('enter_policy_title')}
            placeholderTextColor={isDarkMode ? theme.colors.text.muted : theme.colors.neutral[400]}
            value={policyTitle}
            onChangeText={setPolicyTitle}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text 
            style={[
              styles.inputLabel,
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('policy_number')}*
          </Text>
          <TextInput
            style={[
              styles.textInput,
              { 
                backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
                color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
                borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200]
              }
            ]}
            placeholder={t('enter_policy_number')}
            placeholderTextColor={isDarkMode ? theme.colors.text.muted : theme.colors.neutral[400]}
            value={policyNumber}
            onChangeText={setPolicyNumber}
          />
        </View>
        
        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
            <Text 
              style={[
                styles.inputLabel,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              {t('premium_amount')}*
            </Text>
            <TextInput
              style={[
                styles.textInput,
                { 
                  backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
                  color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
                  borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200]
                }
              ]}
              placeholder={t('enter_premium')}
              placeholderTextColor={isDarkMode ? theme.colors.text.muted : theme.colors.neutral[400]}
              value={premium}
              onChangeText={setPremium}
              keyboardType="numeric"
            />
          </View>
          
          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <Text 
              style={[
                styles.inputLabel,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              {t('coverage_amount')}
            </Text>
            <TextInput
              style={[
                styles.textInput,
                { 
                  backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
                  color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
                  borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200]
                }
              ]}
              placeholder={t('enter_coverage')}
              placeholderTextColor={isDarkMode ? theme.colors.text.muted : theme.colors.neutral[400]}
              value={coverageAmount}
              onChangeText={setCoverageAmount}
              keyboardType="numeric"
            />
          </View>
        </View>
        
        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
            <Text 
              style={[
                styles.inputLabel,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              {t('issue_date')}
            </Text>
            <TextInput
              style={[
                styles.textInput,
                { 
                  backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
                  color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
                  borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200]
                }
              ]}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={isDarkMode ? theme.colors.text.muted : theme.colors.neutral[400]}
              value={issueDate}
              onChangeText={setIssueDate}
            />
          </View>
          
          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <Text 
              style={[
                styles.inputLabel,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              {t('expiry_date')}*
            </Text>
            <TextInput
              style={[
                styles.textInput,
                { 
                  backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
                  color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
                  borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200]
                }
              ]}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={isDarkMode ? theme.colors.text.muted : theme.colors.neutral[400]}
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
          </View>
        </View>
        
        <View style={styles.inputGroup}>
          <Text 
            style={[
              styles.inputLabel,
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('insurer_name')}
          </Text>
          <TextInput
            style={[
              styles.textInput,
              { 
                backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
                color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
                borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200]
              }
            ]}
            placeholder={t('enter_insurer_name')}
            placeholderTextColor={isDarkMode ? theme.colors.text.muted : theme.colors.neutral[400]}
            value={insurerName}
            onChangeText={setInsurerName}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text 
            style={[
              styles.inputLabel,
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('description')}
          </Text>
          <TextInput
            style={[
              styles.textArea,
              { 
                backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
                color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
                borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200]
              }
            ]}
            placeholder={t('enter_policy_description')}
            placeholderTextColor={isDarkMode ? theme.colors.text.muted : theme.colors.neutral[400]}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
        
        <Text 
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark },
            { marginTop: 24 }
          ]}
        >
          {t('policy_documents')}
        </Text>
        <Text 
          style={[
            styles.sectionSubtitle,
            { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
          ]}
        >
          {t('upload_policy_documents')}
        </Text>
        
        <TouchableOpacity 
          style={[
            styles.uploadArea,
            { 
              backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
              borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200]
            }
          ]}
          onPress={handleAddDocument}
        >
          <MaterialIcons 
            name="cloud-upload" 
            size={36} 
            color={theme.colors.primary[500]} 
          />
          <Text 
            style={[
              styles.uploadText,
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('drag_drop_files')}
          </Text>
          <Text 
            style={[
              styles.uploadSubtext,
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {t('or_click_to_browse')}
          </Text>
          <TouchableOpacity 
            style={[
              styles.browseButton,
              { backgroundColor: theme.colors.primary[500] }
            ]}
            onPress={handleAddDocument}
          >
            <Text style={styles.browseButtonText}>{t('browse_files')}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        
        {documents.length > 0 && (
          <View style={styles.documentsContainer}>
            <Text 
              style={[
                styles.uploadedFilesTitle,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              {t('uploaded_files')}
            </Text>
            
            {documents.map((doc, index) => (
              <View 
                key={index}
                style={[
                  styles.documentItem,
                  { 
                    backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
                    borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200]
                  }
                ]}
              >
                <View style={styles.documentInfo}>
                  <MaterialIcons 
                    name="description" 
                    size={24} 
                    color={theme.colors.primary[500]} 
                    style={styles.documentIcon}
                  />
                  <View>
                    <Text 
                      style={[
                        styles.documentName,
                        { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
                      ]}
                      numberOfLines={1}
                    >
                      {doc.name}
                    </Text>
                    <Text 
                      style={[
                        styles.documentType,
                        { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
                      ]}
                    >
                      {doc.type || 'Document'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => removeDocument(index)}>
                  <MaterialIcons 
                    name="delete" 
                    size={24} 
                    color={theme.colors.status.error} 
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[
              styles.cancelButton,
              { 
                backgroundColor: 'transparent',
                borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[300]
              }
            ]}
            onPress={() => router.back()}
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
              { 
                backgroundColor: theme.colors.primary[500],
                opacity: isLoading ? 0.7 : 1
              }
            ]}
            onPress={handleSavePolicy}
            disabled={isLoading}
          >
            {isLoading ? (
              <Text style={styles.saveButtonText}>{t('saving')}</Text>
            ) : (
              <Text style={styles.saveButtonText}>{t('save_policy')}</Text>
            )}
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
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  policyTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  policyTypeCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  policyTypeIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  policyTypeName: {
    fontSize: 16,
    marginBottom: 4,
  },
  policyTypeDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  textInput: {
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 14,
    height: 100,
  },
  row: {
    flexDirection: 'row',
  },
  uploadArea: {
    borderWidth: 2,
    borderRadius: 12,
    borderStyle: 'dashed',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  uploadSubtext: {
    fontSize: 14,
    marginVertical: 8,
  },
  browseButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 8,
  },
  browseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  documentsContainer: {
    marginTop: 24,
  },
  uploadedFilesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  documentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  documentIcon: {
    marginRight: 12,
  },
  documentName: {
    fontSize: 14,
    fontWeight: '500',
    maxWidth: 200,
  },
  documentType: {
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 2,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 