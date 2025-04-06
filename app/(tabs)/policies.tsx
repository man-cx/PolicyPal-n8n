import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
  Modal,
  Dimensions
} from 'react-native';
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
    expiryDate: '2024-12-31',
    premium: '$125/month',
    coverageAmount: '$250,000'
  },
  { 
    id: '2', 
    title: 'Auto Insurance', 
    status: 'Active', 
    type: 'Auto',
    company: 'AutoSafe Insurance',
    expiryDate: '2024-09-15',
    premium: '$95/month',
    coverageAmount: '$75,000'
  },
  { 
    id: '3', 
    title: 'Home Insurance', 
    status: 'Renewal Due', 
    type: 'Home',
    company: 'HomeProtect Ltd',
    expiryDate: '2024-07-20',
    premium: '$150/month',
    coverageAmount: '$450,000'
  },
  { 
    id: '4', 
    title: 'Travel Insurance', 
    status: 'Expired', 
    type: 'Travel',
    company: 'TravelSafe Global',
    expiryDate: '2023-11-30',
    premium: '$45/month',
    coverageAmount: '$50,000'
  },
  { 
    id: '5', 
    title: 'Life Insurance', 
    status: 'Active', 
    type: 'Life',
    company: 'LifeGuard Assurance',
    expiryDate: '2050-01-01',
    premium: '$75/month',
    coverageAmount: '$500,000'
  },
];

// Policy type filter options
const filterOptions = [
  { id: 'all', label: 'All Types' },
  { id: 'Health', label: 'Health' },
  { id: 'Auto', label: 'Auto' },
  { id: 'Home', label: 'Home' },
  { id: 'Travel', label: 'Travel' },
  { id: 'Life', label: 'Life' },
];

export default function PoliciesScreen() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filteredPolicies, setFilteredPolicies] = useState(mockPolicies);
  const [isLoading, setIsLoading] = useState(false);

  // Filter policies based on search query and selected filter
  useEffect(() => {
    setIsLoading(true);
    
    const searchResults = mockPolicies.filter(policy => {
      const matchesSearch = 
        policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.company.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = 
        selectedFilter === 'all' || policy.type === selectedFilter;
      
      return matchesSearch && matchesFilter;
    });
    
    // Simulate network delay
    setTimeout(() => {
      setFilteredPolicies(searchResults);
      setIsLoading(false);
    }, 300);
  }, [searchQuery, selectedFilter]);

  const handlePolicyPress = (policyId: string) => {
    // Navigate to policy details
    router.navigate(`/policy/${policyId}` as any);
  };

  const handleAddPolicy = () => {
    // Navigate to add policy screen
    router.navigate("/policy/add" as any);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active':
        return theme.colors.status.success;
      case 'Renewal Due':
        return theme.colors.status.warning;
      case 'Expired':
        return theme.colors.status.error;
      default:
        return theme.colors.text.muted;
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

  const renderFilterModal = () => (
    <Modal
      visible={isFilterModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setIsFilterModalVisible(false)}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={0.9}
        onPress={() => setIsFilterModalVisible(false)}
      >
        <View
          style={[
            styles.filterModal,
            { backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white' }
          ]}
        >
          <Text
            style={[
              styles.filterTitle,
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('filter_by_type')}
          </Text>
          {filterOptions.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.filterOption,
                selectedFilter === option.id && {
                  backgroundColor: isDarkMode
                    ? theme.colors.primary[900]
                    : theme.colors.primary[50]
                }
              ]}
              onPress={() => {
                setSelectedFilter(option.id);
                setIsFilterModalVisible(false);
              }}
            >
              {option.id !== 'all' && (
                <MaterialIcons
                  name={getIconName(option.id)}
                  size={20}
                  color={theme.colors.primary[500]}
                  style={styles.filterIcon}
                />
              )}
              {option.id === 'all' && (
                <MaterialIcons
                  name="filter-list"
                  size={20}
                  color={theme.colors.primary[500]}
                  style={styles.filterIcon}
                />
              )}
              <Text
                style={{
                  color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark
                }}
              >
                {option.label}
              </Text>
              {selectedFilter === option.id && (
                <MaterialIcons
                  name="check"
                  size={20}
                  color={theme.colors.primary[500]}
                  style={styles.checkIcon}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const renderPolicyItem = ({ item }: { item: typeof mockPolicies[0] }) => (
    <TouchableOpacity 
      style={[
        styles.policyCard, 
        { backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100] }
      ]}
      onPress={() => handlePolicyPress(item.id)}
    >
      <View style={styles.policyHeader}>
        <View style={[
          styles.policyIconContainer,
          { backgroundColor: isDarkMode ? theme.colors.primary[900] : 'rgba(0, 123, 255, 0.1)' }
        ]}>
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
            {t('coverage')}
          </Text>
          <Text 
            style={[
              styles.policyDetailValue, 
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {item.coverageAmount}
          </Text>
        </View>
        
        <View style={styles.policyDetail}>
          <Text 
            style={[
              styles.policyDetailLabel, 
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {t('premium')}
          </Text>
          <Text 
            style={[
              styles.policyDetailValue, 
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {item.premium}
          </Text>
        </View>
        
        <View style={styles.expiryDateContainer}>
          <Text 
            style={[
              styles.expiryDateLabel, 
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {t('expires')}
          </Text>
          <Text 
            style={[
              styles.expiryDate, 
              { color: isDarkMode ? theme.colors.status.warning : theme.colors.status.warning }
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
      
      <View style={[
        styles.actionRow,
        { borderTopColor: isDarkMode ? theme.colors.neutral[700] : '#e0e0e0' }
      ]}>
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
            { 
              borderColor: isDarkMode ? theme.colors.neutral[600] : theme.colors.neutral[300],
              borderRightWidth: 0 
            }
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

  const renderEmptyState = () => (
    <View style={[
      styles.emptyState,
      { backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100] }
    ]}>
      <MaterialIcons
        name="folder-open"
        size={60}
        color={isDarkMode ? theme.colors.neutral[600] : theme.colors.neutral[300]}
      />
      <Text style={[
        styles.emptyStateTitle,
        { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
      ]}>
        {t('no_policies_found')}
      </Text>
      <Text style={[
        styles.emptyStateText,
        { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
      ]}>
        {t('try_adjusting_search')}
      </Text>
      <TouchableOpacity
        style={[
          styles.emptyStateButton,
          { backgroundColor: theme.colors.primary[500] }
        ]}
        onPress={handleAddPolicy}
      >
        <MaterialIcons name="add" size={18} color="white" />
        <Text style={styles.emptyStateButtonText}>{t('add_new_policy')}</Text>
      </TouchableOpacity>
    </View>
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
        <TouchableOpacity 
          style={[
            styles.addButton,
            { backgroundColor: theme.colors.primary[500] }
          ]}
          onPress={handleAddPolicy}
        >
          <MaterialIcons name="add" size={20} color="white" />
          <Text style={styles.addButtonText}>{t('add_new')}</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchFilterContainer}>
        <View style={[
          styles.searchBar,
          { 
            backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
            borderColor: isDarkMode ? theme.colors.neutral[700] : '#e0e0e0'
          }
        ]}>
          <MaterialIcons
            name="search"
            size={20}
            color={isDarkMode ? theme.colors.text.muted : '#9e9e9e'}
            style={styles.searchIcon}
          />
          <TextInput
            style={[
              styles.searchInput,
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
            placeholder={t('search_policies')}
            placeholderTextColor={isDarkMode ? theme.colors.text.muted : '#9e9e9e'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialIcons
                name="close"
                size={20}
                color={isDarkMode ? theme.colors.text.muted : '#9e9e9e'}
              />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity
          style={[
            styles.filterButton,
            { 
              backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
              borderColor: isDarkMode ? theme.colors.neutral[700] : '#e0e0e0' 
            }
          ]}
          onPress={() => setIsFilterModalVisible(true)}
        >
          <MaterialIcons
            name="filter-list"
            size={20}
            color={isDarkMode ? theme.colors.text.muted : '#9e9e9e'}
          />
          <Text
            style={[
              styles.filterButtonText,
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {filterOptions.find(option => option.id === selectedFilter)?.label || t('all_types')}
          </Text>
          <MaterialIcons
            name="arrow-drop-down"
            size={20}
            color={isDarkMode ? theme.colors.text.muted : '#9e9e9e'}
          />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary[500]} />
        </View>
      ) : (
        <FlatList
          data={filteredPolicies}
          renderItem={renderPolicyItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
        />
      )}
      
      <TouchableOpacity 
        style={[
          styles.floatingAddButton, 
          { backgroundColor: theme.colors.primary[500] }
        ]}
        onPress={handleAddPolicy}
      >
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>

      {renderFilterModal()}
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  searchFilterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    minWidth: 120,
    justifyContent: 'center',
  },
  filterButtonText: {
    fontSize: 14,
    marginHorizontal: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  policyDetailLabel: {
    fontSize: 12,
  },
  policyDetailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  expiryDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
  },
  expiryDateLabel: {
    fontSize: 12,
  },
  expiryDate: {
    fontSize: 12,
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
  floatingAddButton: {
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
  emptyState: {
    alignItems: 'center',
    padding: 40,
    borderRadius: 12,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyStateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  emptyStateButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterModal: {
    width: Dimensions.get('window').width * 0.8,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  filterIcon: {
    marginRight: 12,
  },
  checkIcon: {
    marginLeft: 'auto',
  },
});