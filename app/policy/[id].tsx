import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from '../../src/contexts/ThemeContext';

// Types for policy data
interface PolicyContact {
  name: string;
  phone: string;
  email: string;
}

interface Policy {
  id: string;
  title: string;
  policyNumber: string;
  status: string;
  type: string;
  issueDate: string;
  expirationDate: string;
  coverageAmount: string;
  premium: string;
  insurer: string;
  description: string;
  contact: PolicyContact;
}

// Mock policy data collection
const mockPolicies: Policy[] = [
  {
    id: '1',
    title: 'Health Insurance',
    policyNumber: 'HLT-2023-78945',
    status: 'Active',
    type: 'Health',
    issueDate: '2023-01-15',
    expirationDate: '2024-01-15',
    coverageAmount: '$250,000',
    premium: '$125/month',
    insurer: 'HealthGuard Plus',
    description: 'Comprehensive health insurance policy covering hospital stays, prescription drugs, emergency services, and preventive care. Includes dental and vision coverage with a low deductible.',
    contact: {
      name: 'Sarah Johnson',
      phone: '+1 (555) 123-4567',
      email: 'sarah.j@healthguardplus.com'
    }
  },
  {
    id: '2',
    title: 'Auto Insurance',
    policyNumber: 'AUT-2023-12378',
    status: 'Active',
    type: 'Auto',
    issueDate: '2023-03-10',
    expirationDate: '2024-03-10',
    coverageAmount: '$75,000',
    premium: '$95/month',
    insurer: 'AutoSafe Insurance',
    description: 'Full coverage auto insurance with collision, comprehensive, and liability protection. Includes roadside assistance, rental car coverage, and a $500 deductible.',
    contact: {
      name: 'Michael Chen',
      phone: '+1 (555) 987-6543',
      email: 'm.chen@autosafeins.com'
    }
  },
  {
    id: '3',
    title: 'Home Insurance',
    policyNumber: 'HOM-2022-45698',
    status: 'Renewal Due',
    type: 'Home',
    issueDate: '2022-07-20',
    expirationDate: '2023-07-20',
    coverageAmount: '$450,000',
    premium: '$150/month',
    insurer: 'HomeProtect Ltd',
    description: 'Comprehensive home insurance covering property damage, personal belongings, and liability. Includes flood protection, fire damage, and theft coverage with a $1,000 deductible.',
    contact: {
      name: 'Emily Rodriguez',
      phone: '+1 (555) 234-5678',
      email: 'e.rodriguez@homeprotect.com'
    }
  }
];

const PolicyDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  const policy = mockPolicies.find(p => p.id === id) || mockPolicies[0];
  
  const textColor = isDarkMode ? theme.colors.text.light : theme.colors.text.dark;
  const mutedTextColor = isDarkMode ? theme.colors.text.muted : theme.colors.text.muted;
  const cardBgColor = isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100];
  const borderColor = isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[300];
  
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
  
  const handleUploadDocuments = () => {
    router.navigate(`/policy/upload?policyId=${policy.id}` as any);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: t('policy_details'),
          headerStyle: {
            backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50],
          },
          headerTintColor: textColor,
          headerShadowVisible: false,
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
        {/* Header with policy icon and title */}
        <View style={styles.header}>
          <View style={[
            styles.iconContainer,
            { backgroundColor: isDarkMode ? theme.colors.primary[900] : 'rgba(0, 123, 255, 0.1)' }
          ]}>
            <MaterialIcons
              name={getIconName(policy.type)}
              size={32}
              color={theme.colors.primary[500]}
            />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={[styles.policyTitle, { color: textColor }]}>
              {policy.title}
            </Text>
            <Text style={[styles.policyNumber, { color: mutedTextColor }]}>
              {t('policy_number')}: {policy.policyNumber}
            </Text>
          </View>
        </View>
        
        {/* Status badge */}
        <View style={styles.statusContainer}>
          <View style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(policy.status) + '20' }
          ]}>
            <View style={[
              styles.statusDot,
              { backgroundColor: getStatusColor(policy.status) }
            ]} />
            <Text style={[
              styles.statusText,
              { color: getStatusColor(policy.status) }
            ]}>
              {policy.status}
            </Text>
          </View>
        </View>
        
        {/* Policy info card */}
        <View style={[styles.card, { backgroundColor: cardBgColor, borderColor: borderColor }]}>
          <Text style={[styles.cardTitle, { color: textColor }]}>
            {t('policy_information')}
          </Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: mutedTextColor }]}>
                {t('insurer')}
              </Text>
              <Text style={[styles.infoValue, { color: textColor }]}>
                {policy.insurer}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: mutedTextColor }]}>
                {t('policy_type')}
              </Text>
              <Text style={[styles.infoValue, { color: textColor }]}>
                {policy.type}
              </Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: mutedTextColor }]}>
                {t('issue_date')}
              </Text>
              <Text style={[styles.infoValue, { color: textColor }]}>
                {policy.issueDate}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: mutedTextColor }]}>
                {t('expiry_date')}
              </Text>
              <Text style={[styles.infoValue, { color: textColor }]}>
                {policy.expirationDate}
              </Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: mutedTextColor }]}>
                {t('premium')}
              </Text>
              <Text style={[styles.infoValue, { color: textColor }]}>
                {policy.premium}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: mutedTextColor }]}>
                {t('coverage')}
              </Text>
              <Text style={[styles.infoValue, { color: textColor }]}>
                {policy.coverageAmount}
              </Text>
            </View>
          </View>
        </View>
        
        {/* Policy description */}
        <View style={[styles.card, { backgroundColor: cardBgColor, borderColor: borderColor }]}>
          <Text style={[styles.cardTitle, { color: textColor }]}>
            {t('policy_description')}
          </Text>
          <Text style={[styles.description, { color: textColor }]}>
            {policy.description}
          </Text>
        </View>
        
        {/* Contact information */}
        <View style={[styles.card, { backgroundColor: cardBgColor, borderColor: borderColor }]}>
          <Text style={[styles.cardTitle, { color: textColor }]}>
            {t('contact_information')}
          </Text>
          
          <View style={styles.contactRow}>
            <MaterialIcons name="person" size={20} color={theme.colors.primary[500]} />
            <Text style={[styles.contactLabel, { color: mutedTextColor }]}>
              {t('name')}:
            </Text>
            <Text style={[styles.contactValue, { color: textColor }]}>
              {policy.contact.name}
            </Text>
          </View>
          
          <View style={styles.contactRow}>
            <MaterialIcons name="phone" size={20} color={theme.colors.primary[500]} />
            <Text style={[styles.contactLabel, { color: mutedTextColor }]}>
              {t('phone')}:
            </Text>
            <Text style={[styles.contactValue, { color: textColor }]}>
              {policy.contact.phone}
            </Text>
          </View>
          
          <View style={styles.contactRow}>
            <MaterialIcons name="email" size={20} color={theme.colors.primary[500]} />
            <Text style={[styles.contactLabel, { color: mutedTextColor }]}>
              {t('email')}:
            </Text>
            <Text style={[styles.contactValue, { color: textColor }]}>
              {policy.contact.email}
            </Text>
          </View>
        </View>
        
        {/* Documents section */}
        <View style={[styles.card, { backgroundColor: cardBgColor, borderColor: borderColor }]}>
          <Text style={[styles.cardTitle, { color: textColor }]}>
            {t('policy_documents')}
          </Text>
          
          <TouchableOpacity
            style={[
              styles.documentButton,
              { backgroundColor: theme.colors.primary[500] }
            ]}
            onPress={handleUploadDocuments}
          >
            <MaterialIcons name="cloud-upload" size={20} color="white" style={{ marginRight: 8 }} />
            <Text style={styles.documentButtonText}>
              {t('manage_documents')}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Action buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { 
                backgroundColor: 'transparent', 
                borderColor: borderColor,
                borderWidth: 1
              }
            ]}
          >
            <MaterialIcons name="history" size={20} color={theme.colors.primary[500]} style={{ marginRight: 8 }} />
            <Text style={[styles.actionButtonText, { color: textColor }]}>
              {t('view_history')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: theme.colors.primary[500] }
            ]}
          >
            <MaterialIcons name="edit" size={20} color="white" style={{ marginRight: 8 }} />
            <Text style={styles.documentButtonText}>
              {t('edit_policy')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  policyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  policyNumber: {
    fontSize: 14,
  },
  statusContainer: {
    marginBottom: 24,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactLabel: {
    fontSize: 14,
    marginLeft: 8,
    marginRight: 4,
    width: 50,
  },
  contactValue: {
    fontSize: 16,
    flex: 1,
  },
  documentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  documentButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  }
});

export default PolicyDetailScreen; 