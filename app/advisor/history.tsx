import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';

import { useTheme } from '../../src/contexts/ThemeContext';

// Mock conversation history data
const mockConversations = [
  {
    id: '1',
    topic: 'Health Insurance Coverage',
    lastMessagePreview: 'Your health insurance policy covers hospital stays, doctor visits...',
    date: '2023-10-15',
    time: '14:32',
    messageCount: 12,
  },
  {
    id: '2',
    topic: 'Auto Insurance Claim Process',
    lastMessagePreview: 'To file an auto insurance claim, you should first document the damage...',
    date: '2023-09-28',
    time: '09:15',
    messageCount: 8,
  },
  {
    id: '3',
    topic: 'Policy Renewal Options',
    lastMessagePreview: 'I\'ve analyzed your current policy and found these renewal options...',
    date: '2023-09-10',
    time: '16:45',
    messageCount: 15,
  },
  {
    id: '4',
    topic: 'Premium Payment Methods',
    lastMessagePreview: 'You can pay your premium using any of these payment methods...',
    date: '2023-08-22',
    time: '11:20',
    messageCount: 5,
  },
  {
    id: '5',
    topic: 'Coverage Limitations',
    lastMessagePreview: 'Your current policy has these coverage limitations you should be aware of...',
    date: '2023-07-15',
    time: '13:50',
    messageCount: 9,
  },
];

export default function ChatHistoryScreen() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();

  const navigateToChat = (conversationId: string) => {
    // In a real app, we would load the conversation history
    router.navigate(`/advisor/chat?conversationId=${conversationId}`);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return t('today');
    } else if (date.toDateString() === yesterday.toDateString()) {
      return t('yesterday');
    } else {
      return date.toLocaleDateString();
    }
  };

  const renderConversationItem = ({ item }: { item: typeof mockConversations[0] }) => (
    <TouchableOpacity
      style={[
        styles.conversationItem,
        { 
          backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
          borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200]
        }
      ]}
      onPress={() => navigateToChat(item.id)}
    >
      <View style={styles.conversationHeader}>
        <Text
          style={[
            styles.conversationTopic,
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
          ]}
          numberOfLines={1}
        >
          {item.topic}
        </Text>
        <Text
          style={[
            styles.conversationDate,
            { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
          ]}
        >
          {formatDate(item.date)} • {item.time}
        </Text>
      </View>
      
      <Text
        style={[
          styles.messagePreview,
          { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
        ]}
        numberOfLines={2}
      >
        {item.lastMessagePreview}
      </Text>
      
      <View style={styles.conversationFooter}>
        <View style={styles.messageCount}>
          <MaterialIcons
            name="chat-bubble-outline"
            size={16}
            color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted}
          />
          <Text
            style={[
              styles.messageCountText,
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {item.messageCount} {t('messages')}
          </Text>
        </View>
        
        <MaterialIcons
          name="chevron-right"
          size={20}
          color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted}
        />
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
      <Stack.Screen
        options={{
          title: t('conversation_history'),
          headerStyle: {
            backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50],
          },
          headerTintColor: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
          headerShadowVisible: false,
        }}
      />
      
      {mockConversations.length > 0 ? (
        <FlatList
          data={mockConversations}
          renderItem={renderConversationItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialIcons
            name="chat-bubble-outline"
            size={64}
            color={isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[300]}
          />
          <Text
            style={[
              styles.emptyTitle,
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
          >
            {t('no_conversations_yet')}
          </Text>
          <Text
            style={[
              styles.emptySubtitle,
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
            ]}
          >
            {t('start_conversation_with_ai')}
          </Text>
          <TouchableOpacity
            style={[
              styles.newChatButton,
              { backgroundColor: theme.colors.primary[500] }
            ]}
            onPress={() => router.navigate('/advisor/chat')}
          >
            <MaterialIcons name="chat" size={18} color="white" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>{t('start_new_chat')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  conversationItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  conversationTopic: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  conversationDate: {
    fontSize: 12,
  },
  messagePreview: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  conversationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageCountText: {
    fontSize: 12,
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  newChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 