import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from '../../src/contexts/ThemeContext';

// Placeholder data for policies
const mockPolicies = [
  { 
    id: '1', 
    title: 'Health Insurance', 
    status: 'Active', 
    type: 'Health',
    company: 'HealthGuard Plus',
    expiryDate: '2024-12-31'
  },
  { 
    id: '2', 
    title: 'Auto Insurance', 
    status: 'Active', 
    type: 'Auto',
    company: 'AutoSafe Insurance',
    expiryDate: '2024-09-15'
  },
  { 
    id: '3', 
    title: 'Home Insurance', 
    status: 'Renewal Due', 
    type: 'Home',
    company: 'HomeProtect Ltd',
    expiryDate: '2024-07-20'
  },
  { 
    id: '4', 
    title: 'Travel Insurance', 
    status: 'Expired', 
    type: 'Travel',
    company: 'TravelSafe Global',
    expiryDate: '2023-11-30'
  },
  { 
    id: '5', 
    title: 'Life Insurance', 
    status: 'Active', 
    type: 'Life',
    company: 'LifeGuard Assurance',
    expiryDate: '2050-01-01'
  },
];

export default function PoliciesScreen() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();

  const handlePolicyPress = (policyId: string) => {
    router.push(`/policy/${policyId}`);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active':
        return '#4CAF50'; // Green
      case 'Renewal Due':
        return '#FF9800'; // Orange
      case 'Expired':
        return '#F44336'; // Red
      default:
        return '#757575'; // Gray
    }
  };

  const getIconName = (type: string) => {
    switch(type) {
      case 'Health':
        return 'medical-services';
      case 'Auto':
        return 'directions-car';
      case 'Home':
        return 'home';
      case 'Travel':
        return 'flight';
      case 'Life':
        return 'favorite';
      default:
        return 'description';
    }
  };

  const renderPolicyItem = ({ item }: { item: typeof mockPolicies[0] }) => (
    <TouchableOpacity 
      style={[
        styles.policyCard, 
        { backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100] }
      ]}
      onPress={() => handlePolicyPress(item.id)}
    >
      <View style={styles.policyHeader}>
        <View style={styles.policyIconContainer}>
          <MaterialIcons 
            name={getIconName(item.type)} 
            size={24} 
            color={theme.colors.primary[500]} 
          />
        </View>
        <View style={styles.policyHeaderText}>
          <Text 
            style={[
              styles.policyTitle, 
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {item.title}
          </Text>
          <Text 
            style={[
              styles.policyCompany,
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {item.company}
          </Text>
        </View>
      </View>
      
      <View style={styles.policyDetails}>
        <View style={styles.policyDetail}>
          <Text 
            style={[
              styles.policyDetailLabel, 
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {t('policy_type')}
          </Text>
          <Text 
            style={[
              styles.policyDetailValue, 
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {item.type}
          </Text>
        </View>
        
        <View style={styles.policyDetail}>
          <Text 
            style={[
              styles.policyDetailLabel, 
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {t('expiry_date')}
          </Text>
          <Text 
            style={[
              styles.policyDetailValue, 
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {new Date(item.expiryDate).toLocaleDateString()}
          </Text>
        </View>
        
        <View style={styles.policyStatus}>
          <View 
            style={[
              styles.statusIndicator, 
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
      
      <View style={styles.actionRow}>
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            { borderColor: isDarkMode ? theme.colors.neutral[600] : theme.colors.neutral[300] }
          ]}
        >
          <MaterialIcons name="history" size={16} color={theme.colors.primary[500]} />
          <Text 
            style={[
              styles.actionButtonText, 
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('view_history')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            { borderColor: isDarkMode ? theme.colors.neutral[600] : theme.colors.neutral[300] }
          ]}
        >
          <MaterialIcons name="share" size={16} color={theme.colors.primary[500]} />
          <Text 
            style={[
              styles.actionButtonText, 
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('share')}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View 
      style={[
        styles.container, 
        { backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50] }
      ]}
    >
      <View style={styles.header}>
        <Text 
          style={[
            styles.headerTitle, 
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
          ]}
        >
          {t('my_policies')}
        </Text>
        <TouchableOpacity style={styles.filterButton}>
          <MaterialIcons 
            name="filter-list" 
            size={24} 
            color={isDarkMode ? theme.colors.text.light : theme.colors.text.dark} 
          />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={mockPolicies}
        renderItem={renderPolicyItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      
      <TouchableOpacity 
        style={[
          styles.addButton, 
          { backgroundColor: theme.colors.primary[500] }
        ]}
      >
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterButton: {
    padding: 8,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80, // Extra space for floating button
  },
  policyCard: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  policyHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
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
  policyHeaderText: {
    flex: 1,
  },
  policyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  policyCompany: {
    fontSize: 14,
    marginTop: 2,
  },
  policyDetails: {
    padding: 16,
    paddingTop: 0,
  },
  policyDetail: {
    marginBottom: 8,
  },
  policyDetailLabel: {
    fontSize: 12,
  },
  policyDetailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  policyStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionRow: {
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
    marginLeft: 4,
    fontSize: 14,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});