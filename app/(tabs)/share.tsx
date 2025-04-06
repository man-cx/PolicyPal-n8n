import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from '../../src/contexts/ThemeContext';

// Mock data for shared policies
const mockSharedPolicies = [
  {
    id: '1',
    policyName: 'Health Insurance',
    sharedWith: 'spouse@example.com',
    date: '2023-05-15',
    status: 'Accepted',
    type: 'Health'
  },
  {
    id: '2',
    policyName: 'Auto Insurance',
    sharedWith: 'brother@example.com',
    date: '2023-06-02',
    status: 'Pending',
    type: 'Auto'
  },
  {
    id: '3',
    policyName: 'Home Insurance',
    sharedWith: 'parents@example.com',
    date: '2023-04-10',
    status: 'Accepted',
    type: 'Home'
  }
];

// Mock data for contacts
const mockContacts = [
  { id: '1', name: 'David Chen', email: 'david.chen@example.com', relationship: 'Spouse' },
  { id: '2', name: 'Lisa Smith', email: 'lisa.smith@example.com', relationship: 'Family' },
  { id: '3', name: 'Michael Johnson', email: 'michael.j@example.com', relationship: 'Friend' },
  { id: '4', name: 'Sarah Williams', email: 'sarah.w@example.com', relationship: 'Family' },
];

export default function ShareScreen() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = mockContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIconName = (type: string) => {
    switch(type) {
      case 'Health':
        return 'medical-services';
      case 'Auto':
        return 'directions-car';
      case 'Home':
        return 'home';
      default:
        return 'description';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Accepted':
        return '#4CAF50'; // Green
      case 'Pending':
        return '#FF9800'; // Orange
      case 'Rejected':
        return '#F44336'; // Red
      default:
        return '#757575'; // Gray
    }
  };

  const renderSharedPolicyItem = ({ item }: { item: typeof mockSharedPolicies[0] }) => (
    <View 
      style={[
        styles.policyCard, 
        { backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100] }
      ]}
    >
      <View style={styles.policyHeader}>
        <View style={styles.policyIconContainer}>
          <MaterialIcons 
            name={getIconName(item.type)} 
            size={24} 
            color={theme.colors.primary[500]} 
          />
        </View>
        <View style={styles.policyInfo}>
          <Text 
            style={[
              styles.policyName, 
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {item.policyName}
          </Text>
          <Text 
            style={[
              styles.sharedWith, 
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {t('shared_with')}: {item.sharedWith}
          </Text>
        </View>
      </View>
      
      <View style={styles.policyDetails}>
        <Text 
          style={[
            styles.sharedDate, 
            { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
          ]}
        >
          {t('shared_on')}: {new Date(item.date).toLocaleDateString()}
        </Text>
        <View style={styles.statusContainer}>
          <View 
            style={[
              styles.statusDot, 
              { backgroundColor: getStatusColor(item.status) }
            ]} 
          />
          <Text 
            style={[
              styles.statusText, 
              { color: getStatusColor(item.status) }
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            { borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[300] }
          ]}
        >
          <MaterialIcons name="refresh" size={16} color={theme.colors.primary[500]} />
          <Text 
            style={[
              styles.actionButtonText, 
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('resend')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            { borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[300] }
          ]}
        >
          <MaterialIcons name="delete" size={16} color="#F44336" />
          <Text 
            style={[
              styles.actionButtonText, 
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('revoke')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderContactItem = ({ item }: { item: typeof mockContacts[0] }) => (
    <TouchableOpacity 
      style={[
        styles.contactCard, 
        { backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100] }
      ]}
    >
      <View style={styles.contactInitialsContainer}>
        <Text style={styles.contactInitials}>
          {item.name.split(' ').map(n => n[0]).join('')}
        </Text>
      </View>
      
      <View style={styles.contactInfo}>
        <Text 
          style={[
            styles.contactName, 
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
          ]}
        >
          {item.name}
        </Text>
        <Text 
          style={[
            styles.contactEmail, 
            { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
          ]}
        >
          {item.email}
        </Text>
      </View>
      
      <TouchableOpacity 
        style={[
          styles.shareButton, 
          { backgroundColor: theme.colors.primary[500] }
        ]}
      >
        <MaterialIcons name="share" size={20} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View 
      style={[
        styles.container, 
        { backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50] }
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text 
          style={[
            styles.headerTitle, 
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
          ]}
        >
          {t('share_policies')}
        </Text>
      </View>
      
      {/* Shared Policies Section */}
      <View style={styles.section}>
        <Text 
          style={[
            styles.sectionTitle, 
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
          ]}
        >
          {t('shared_policies')}
        </Text>
        
        <FlatList
          data={mockSharedPolicies}
          renderItem={renderSharedPolicyItem}
          keyExtractor={item => item.id}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          style={styles.policyList}
        />
      </View>
      
      {/* Contacts Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text 
            style={[
              styles.sectionTitle, 
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('contacts')}
          </Text>
          <TouchableOpacity style={styles.addButton}>
            <MaterialIcons 
              name="person-add" 
              size={20} 
              color={theme.colors.primary[500]} 
            />
          </TouchableOpacity>
        </View>
        
        <View 
          style={[
            styles.searchBarContainer, 
            { backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100] }
          ]}
        >
          <MaterialIcons 
            name="search" 
            size={20} 
            color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted} 
          />
          <TextInput
            style={[
              styles.searchInput,
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
            placeholder={t('search_contacts')}
            placeholderTextColor={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <FlatList
          data={filteredContacts}
          renderItem={renderContactItem}
          keyExtractor={item => item.id}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          style={styles.contactList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 8,
  },
  policyList: {
    marginTop: 8,
  },
  policyCard: {
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  policyHeader: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 8,
  },
  policyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
    marginRight: 12,
  },
  policyInfo: {
    flex: 1,
  },
  policyName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sharedWith: {
    fontSize: 14,
  },
  policyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  sharedDate: {
    fontSize: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRightWidth: 1,
  },
  actionButtonText: {
    marginLeft: 8,
    fontSize: 14,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    padding: 4,
  },
  contactList: {
    marginTop: 8,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  contactInitialsContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3F51B5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInitials: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  contactEmail: {
    fontSize: 14,
  },
  shareButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
}); 