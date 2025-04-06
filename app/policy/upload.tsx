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
  Platform,
  ActivityIndicator
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

import { useTheme } from '../../src/contexts/ThemeContext';

// Document type options
const documentTypes = [
  { id: 'policy-docs', label: 'Policy Document' },
  { id: 'id-proof', label: 'ID Proof' },
  { id: 'bills', label: 'Bills & Receipts' },
  { id: 'claims', label: 'Claim Documents' },
  { id: 'medical', label: 'Medical Records' },
  { id: 'other', label: 'Other' },
];

export default function DocumentUploadScreen() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  const params = useLocalSearchParams();
  const policyId = params.policyId as string;
  
  const [selectedType, setSelectedType] = useState(documentTypes[0].id);
  const [documentTitle, setDocumentTitle] = useState('');
  const [documents, setDocuments] = useState<{ uri: string; name: string; type: string; size?: number }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSelectType = (typeId: string) => {
    setSelectedType(typeId);
  };

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });

      if (result.canceled === false && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const newDoc = {
          uri: asset.uri,
          name: asset.name,
          type: asset.mimeType || 'application/octet-stream',
          size: asset.size,
        };
        
        setDocuments([...documents, newDoc]);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert(t('error'), t('document_pick_error'));
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(t('permission_denied'), t('camera_permission_required'));
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const fileExtension = asset.uri.split('.').pop() || 'jpg';
        const fileName = `document_${Date.now()}.${fileExtension}`;
        
        setDocuments([
          ...documents, 
          { 
            uri: asset.uri, 
            name: fileName, 
            type: `image/${fileExtension}`,
            size: asset.fileSize
          }
        ]);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert(t('error'), t('camera_error'));
    }
  };

  const removeDocument = (index: number) => {
    const newDocuments = [...documents];
    newDocuments.splice(index, 1);
    setDocuments(newDocuments);
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size';
    
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleUpload = () => {
    if (documents.length === 0) {
      Alert.alert(t('error'), t('please_add_documents'));
      return;
    }

    if (!documentTitle.trim()) {
      Alert.alert(t('error'), t('please_enter_doc_title'));
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            Alert.alert(
              t('success'),
              t('documents_uploaded_successfully'),
              [
                { text: t('ok'), onPress: () => router.back() }
              ]
            );
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Stack.Screen
        options={{
          title: t('upload_documents'),
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
          {t('document_type')}
        </Text>
        
        <View style={styles.typeSelector}>
          {documentTypes.map((type) => (
            <TouchableOpacity 
              key={type.id}
              style={[
                styles.typeOption,
                { 
                  backgroundColor: selectedType === type.id
                    ? theme.colors.primary[500]
                    : isDarkMode ? theme.colors.neutral[800] : 'white',
                }
              ]}
              onPress={() => handleSelectType(type.id)}
            >
              <Text 
                style={[
                  styles.typeLabel,
                  { 
                    color: selectedType === type.id
                      ? 'white'
                      : isDarkMode ? theme.colors.text.light : theme.colors.text.dark 
                  }
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.inputGroup}>
          <Text 
            style={[
              styles.inputLabel,
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('document_title')}*
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
            placeholder={t('enter_document_title')}
            placeholderTextColor={isDarkMode ? theme.colors.text.muted : theme.colors.neutral[400]}
            value={documentTitle}
            onChangeText={setDocumentTitle}
          />
        </View>
        
        <Text 
          style={[
            styles.sectionTitle,
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark },
            { marginTop: 20 }
          ]}
        >
          {t('upload_files')}
        </Text>
        
        <View style={styles.uploadButtons}>
          <TouchableOpacity 
            style={[
              styles.uploadButton,
              { 
                backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
                borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200]
              }
            ]}
            onPress={handlePickDocument}
          >
            <MaterialIcons name="upload-file" size={24} color={theme.colors.primary[500]} />
            <Text 
              style={[
                styles.uploadButtonText,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              {t('select_files')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.uploadButton,
              { 
                backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
                borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200]
              }
            ]}
            onPress={handleTakePhoto}
          >
            <MaterialIcons name="camera-alt" size={24} color={theme.colors.primary[500]} />
            <Text 
              style={[
                styles.uploadButtonText,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              {t('take_photo')}
            </Text>
          </TouchableOpacity>
        </View>
        
        {documents.length > 0 ? (
          <View style={styles.documentsContainer}>
            <Text 
              style={[
                styles.uploadedFilesTitle,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              {t('selected_files')} ({documents.length})
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
                    name={doc.type.includes('image') ? 'image' : 'description'} 
                    size={24} 
                    color={theme.colors.primary[500]} 
                    style={styles.documentIcon}
                  />
                  <View style={styles.documentDetails}>
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
                        styles.documentSize,
                        { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
                      ]}
                    >
                      {formatFileSize(doc.size)}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeDocument(index)}
                >
                  <MaterialIcons 
                    name="delete" 
                    size={24} 
                    color={theme.colors.status.error} 
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <View 
            style={[
              styles.emptyDocumentsContainer,
              { 
                backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
                borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200]
              }
            ]}
          >
            <MaterialIcons
              name="cloud-upload"
              size={48}
              color={isDarkMode ? theme.colors.neutral[600] : theme.colors.neutral[300]}
            />
            <Text 
              style={[
                styles.emptyDocumentsText,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              {t('no_documents_selected')}
            </Text>
            <Text 
              style={[
                styles.emptyDocumentsSubtext,
                { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
              ]}
            >
              {t('select_or_take_photo')}
            </Text>
          </View>
        )}
        
        {isUploading && (
          <View 
            style={[
              styles.progressContainer,
              { 
                backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
                borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200]
              }
            ]}
          >
            <Text 
              style={[
                styles.progressText,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              {t('uploading_files')} ({uploadProgress}%)
            </Text>
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar,
                  { 
                    backgroundColor: theme.colors.primary[500],
                    width: `${uploadProgress}%`
                  }
                ]}
              />
            </View>
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
            disabled={isUploading}
          >
            <Text 
              style={[
                styles.cancelButtonText,
                { 
                  color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
                  opacity: isUploading ? 0.5 : 1
                }
              ]}
            >
              {t('cancel')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.uploadSubmitButton,
              { 
                backgroundColor: theme.colors.primary[500],
                opacity: isUploading ? 0.7 : 1
              }
            ]}
            onPress={handleUpload}
            disabled={isUploading}
          >
            {isUploading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <>
                <MaterialIcons name="cloud-upload" size={20} color="white" style={styles.uploadIcon} />
                <Text style={styles.uploadSubmitButtonText}>{t('upload_now')}</Text>
              </>
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
    marginBottom: 16,
  },
  typeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  typeOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 8,
  },
  typeLabel: {
    fontSize: 14,
    fontWeight: '500',
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
  uploadButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  uploadButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 4,
  },
  uploadButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  documentsContainer: {
    marginTop: 8,
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
  documentDetails: {
    flex: 1,
  },
  documentName: {
    fontSize: 14,
    fontWeight: '500',
  },
  documentSize: {
    fontSize: 12,
    marginTop: 2,
  },
  removeButton: {
    padding: 4,
  },
  emptyDocumentsContainer: {
    padding: 32,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  emptyDocumentsText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDocumentsSubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
  progressContainer: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 20,
  },
  progressText: {
    fontSize: 14,
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
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
  uploadSubmitButton: {
    flex: 2,
    height: 50,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  uploadIcon: {
    marginRight: 8,
  },
  uploadSubmitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 