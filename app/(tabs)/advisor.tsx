import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from '../../src/contexts/ThemeContext';

// Placeholder data for advisors
const mockAdvisors = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Senior Insurance Advisor',
    specialization: 'Health Insurance',
    rating: 4.9,
    reviews: 128,
    availability: 'Available',
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Insurance Specialist',
    specialization: 'Auto & Home Insurance',
    rating: 4.8,
    reviews: 94,
    availability: 'Available',
    image: 'https://randomuser.me/api/portraits/men/36.jpg'
  },
  {
    id: '3',
    name: 'Priya Patel',
    role: 'Financial Advisor',
    specialization: 'Life & Retirement',
    rating: 4.7,
    reviews: 112,
    availability: 'Busy',
    image: 'https://randomuser.me/api/portraits/women/64.jpg'
  },
  {
    id: '4',
    name: 'David Wilson',
    role: 'Claims Specialist',
    specialization: 'All Insurance Types',
    rating: 4.6,
    reviews: 86,
    availability: 'Available',
    image: 'https://randomuser.me/api/portraits/men/22.jpg'
  },
];

// Placeholder for recent conversations
const mockConversations = [
  {
    id: '1',
    advisorId: '1',
    advisorName: 'Sarah Johnson',
    lastMessage: 'I've reviewed your health insurance options and have some recommendations for you.',
    timestamp: '10:30 AM',
    unread: true,
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: '2',
    advisorId: '3',
    advisorName: 'Priya Patel',
    lastMessage: 'Let me know if you have any questions about the retirement plan we discussed.',
    timestamp: 'Yesterday',
    unread: false,
    image: 'https://randomuser.me/api/portraits/women/64.jpg'
  },
];

export default function AdvisorScreen() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();

  const renderAdvisorItem = ({ item }: { item: typeof mockAdvisors[0] }) => (
    <TouchableOpacity 
      style={[
        styles.advisorCard, 
        { backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100] }
      ]}
    >
      <Image source={{ uri: item.image }} style={styles.advisorImage} />
      <View style={styles.advisorInfo}>
        <Text 
          style={[
            styles.advisorName, 
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
          ]}
        >
          {item.name}
        </Text>
        <Text 
          style={[
            styles.advisorRole, 
            { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
          ]}
        >
          {item.role}
        </Text>
        <Text 
          style={[
            styles.advisorSpecialization, 
            { color: isDarkMode ? theme.colors.primary[400] : theme.colors.primary[600] }
          ]}
        >
          {item.specialization}
        </Text>
        
        <View style={styles.advisorRating}>
          <MaterialIcons name="star" size={16} color="#FFD700" />
          <Text 
            style={[
              styles.ratingText, 
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {item.rating} ({item.reviews} {t('reviews')})
          </Text>
        </View>
      </View>
      
      <View style={styles.advisorActions}>
        <View 
          style={[
            styles.statusBadge, 
            { 
              backgroundColor: item.availability === 'Available' ? 
                '#4CAF50' : '#FF9800',
              opacity: 0.9
            }
          ]}
        >
          <Text style={styles.statusText}>{item.availability}</Text>
        </View>
        
        <TouchableOpacity 
          style={[
            styles.contactButton, 
            { backgroundColor: theme.colors.primary[500] }
          ]}
        >
          <MaterialIcons name="chat" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderConversationItem = ({ item }: { item: typeof mockConversations[0] }) => (
    <TouchableOpacity 
      style={[
        styles.conversationItem, 
        { backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100] }
      ]}
    >
      <View style={styles.conversationImageContainer}>
        <Image source={{ uri: item.image }} style={styles.conversationImage} />
        {item.unread && <View style={styles.unreadBadge} />}
      </View>
      
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text 
            style={[
              styles.conversationName, 
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {item.advisorName}
          </Text>
          <Text 
            style={[
              styles.conversationTime, 
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {item.timestamp}
          </Text>
        </View>
        
        <Text 
          style={[
            styles.conversationMessage, 
            { 
              color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted,
              fontWeight: item.unread ? 'bold' : 'normal'
            }
          ]}
          numberOfLines={2}
        >
          {item.lastMessage}
        </Text>
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
      {/* Search Bar */}
      <View 
        style={[
          styles.searchBar,
          { backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100] }
        ]}
      >
        <MaterialIcons 
          name="search" 
          size={20} 
          color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted} 
        />
        <Text 
          style={[
            styles.searchPlaceholder, 
            { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
          ]}
        >
          {t('search_advisors')}
        </Text>
      </View>

      {/* Recent Conversations Section */}
      {mockConversations.length > 0 && (
        <View style={styles.section}>
          <Text 
            style={[
              styles.sectionTitle, 
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('recent_conversations')}
          </Text>
          
          <FlatList
            data={mockConversations}
            renderItem={renderConversationItem}
            keyExtractor={item => item.id}
            horizontal={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      {/* Available Advisors Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text 
            style={[
              styles.sectionTitle, 
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('available_advisors')}
          </Text>
          <TouchableOpacity>
            <Text 
              style={[
                styles.viewAllLink, 
                { color: theme.colors.primary[500] }
              ]}
            >
              {t('view_all')}
            </Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={mockAdvisors}
          renderItem={renderAdvisorItem}
          keyExtractor={item => item.id}
          horizontal={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  searchPlaceholder: {
    marginLeft: 8,
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
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
  viewAllLink: {
    fontSize: 14,
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  conversationImageContainer: {
    position: 'relative',
  },
  conversationImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  unreadBadge: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    right: 0,
    top: 0,
    borderWidth: 2,
    borderColor: 'white',
  },
  conversationContent: {
    marginLeft: 12,
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  conversationTime: {
    fontSize: 12,
  },
  conversationMessage: {
    fontSize: 14,
  },
  advisorCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  advisorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  advisorInfo: {
    marginLeft: 12,
    flex: 1,
  },
  advisorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  advisorRole: {
    fontSize: 14,
    marginBottom: 2,
  },
  advisorSpecialization: {
    fontSize: 14,
    marginBottom: 4,
  },
  advisorRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
  },
  advisorActions: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  contactButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 