import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from '@contexts/ThemeContext';

// FAQ item interface
interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export default function FaqScreen() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Toggle FAQ item expansion
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // FAQ categories and items
  const generalFaqs: FaqItem[] = [
    {
      id: 'account1',
      question: t('how_create_account'),
      answer: t('create_account_answer'),
    },
    {
      id: 'account2',
      question: t('forgot_password'),
      answer: t('reset_password_instructions'),
    },
    {
      id: 'account3',
      question: t('change_email'),
      answer: t('change_email_instructions'),
    },
  ];

  const policyFaqs: FaqItem[] = [
    {
      id: 'policy1',
      question: t('how_add_policy'),
      answer: t('add_policy_instructions'),
    },
    {
      id: 'policy2',
      question: t('policy_documents'),
      answer: t('policy_documents_explanation'),
    },
    {
      id: 'policy3',
      question: t('policy_renewal'),
      answer: t('policy_renewal_explanation'),
    },
  ];

  const claimsFaqs: FaqItem[] = [
    {
      id: 'claims1',
      question: t('how_file_claim'),
      answer: t('file_claim_instructions'),
    },
    {
      id: 'claims2',
      question: t('claim_status'),
      answer: t('check_claim_status_instructions'),
    },
    {
      id: 'claims3',
      question: t('required_documents'),
      answer: t('claim_documents_explanation'),
    },
  ];

  // Helper function to render FAQ category
  const renderFaqCategory = (title: string, items: FaqItem[]) => (
    <View
      style={[
        styles.categoryContainer,
        { 
          backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
          shadowColor: isDarkMode ? 'transparent' : theme.colors.neutral[900],
        }
      ]}
    >
      <Text
        style={[
          styles.categoryTitle,
          { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
        ]}
      >
        {title}
      </Text>
      {items.map(item => (
        <View key={item.id} style={styles.faqItemContainer}>
          <TouchableOpacity
            style={[
              styles.questionContainer,
              { 
                borderBottomColor: expandedId === item.id 
                  ? 'transparent' 
                  : isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200]
              }
            ]}
            onPress={() => toggleExpand(item.id)}
          >
            <Text
              style={[
                styles.questionText,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              {item.question}
            </Text>
            <MaterialIcons
              name={expandedId === item.id ? 'expand-less' : 'expand-more'}
              size={24}
              color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted}
            />
          </TouchableOpacity>
          
          {expandedId === item.id && (
            <View
              style={[
                styles.answerContainer,
                { 
                  borderBottomColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200]
                }
              ]}
            >
              <Text
                style={[
                  styles.answerText,
                  { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
                ]}
              >
                {item.answer}
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );

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
          title: t('frequently_asked_questions'),
          headerStyle: {
            backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50],
          },
          headerTintColor: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
          headerShadowVisible: false,
        }}
      />
      
      {/* Search box placeholder - for future implementation */}
      <View
        style={[
          styles.searchContainer,
          { 
            backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
            shadowColor: isDarkMode ? 'transparent' : theme.colors.neutral[900],
          }
        ]}
      >
        <View
          style={[
            styles.searchBox,
            { backgroundColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[100] }
          ]}
        >
          <MaterialIcons
            name="search"
            size={20}
            color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted}
            style={styles.searchIcon}
          />
          <Text
            style={[
              styles.searchPlaceholder,
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {t('search_faqs')}
          </Text>
        </View>
      </View>
      
      {/* FAQ Categories */}
      {renderFaqCategory(t('account_questions'), generalFaqs)}
      {renderFaqCategory(t('policy_questions'), policyFaqs)}
      {renderFaqCategory(t('claims_questions'), claimsFaqs)}
      
      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlaceholder: {
    fontSize: 15,
  },
  categoryContainer: {
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  faqItemContainer: {
    marginBottom: 2,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  questionText: {
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
    paddingRight: 10,
  },
  answerContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  answerText: {
    fontSize: 14,
    lineHeight: 20,
  },
  bottomSpace: {
    height: 40,
  },
}); 