import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';

import { useTheme } from '@contexts/ThemeContext';

// Mock chat history data
const mockChatHistory = [
  {
    id: '1',
    title: 'Policy Coverage Questions',
    preview: 'What\'s my deductible?',
    date: '2023-09-15',
    time: '10:32 AM',
    unread: false,
  },
  {
    id: '2',
    title: 'Claim Filing Process',
    preview: 'How do I file a claim for my car accident?',
    date: '2023-09-10',
    time: '2:45 PM',
    unread: true,
  },
  {
    id: '3',
    title: 'Policy Renewal',
    preview: 'When does my health insurance expire?',
    date: '2023-09-05',
    time: '9:20 AM',
    unread: false,
  },
  {
    id: '4',
    title: 'Dental Coverage',
    preview: 'Is dental included in my health plan?',
    date: '2023-08-28',
    time: '4:15 PM',
    unread: false,
  },
  {
    id: '5',
    title: 'Payment Methods',
    preview: 'Can I set up automatic payments?',
    date: '2023-08-20',
    time: '11:05 AM',
    unread: false,
  },
];

interface ChatHistoryItem {
  id: string;
  title: string;
  preview: string;
  date: string;
  time: string;
  unread: boolean;
}

export default function ChatHistoryScreen() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();

  const navigateBack = () => {
    router.back();
  };

  const openChat = (chatId: string) => {
    // In a real app, you would load the specific chat
    // For now, we'll just go back to the main advisor screen
    router.push('/(tabs)/advisor');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const renderChatItem = ({ item }: { item: ChatHistoryItem }) => (
    <TouchableOpacity
      style={[
        styles.chatItem,
        {
          backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
          borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200],
        }
      ]}
      onPress={() => openChat(item.id)}
    >
      <View style={styles.chatItemContent}>
        <View style={styles.chatIconContainer}>
          <View style={[
            styles.chatIcon,
            { backgroundColor: theme.colors.primary[500] }
          ]}>
            <MaterialIcons name="chat" size={20} color="white" />
          </View>
          {item.unread && (
            <View style={[
              styles.unreadBadge,
              { backgroundColor: theme.colors.status.error }
            ]} />
          )}
        </View>
        
        <View style={styles.chatInfo}>
          <View style={styles.chatHeader}>
            <Text style={[
              styles.chatTitle,
              { 
                color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
                fontWeight: item.unread ? '600' : '500',
              }
            ]}>
              {item.title}
            </Text>
            <Text style={[
              styles.chatTime,
              { color: theme.colors.text.muted }
            ]}>
              {formatDate(item.date)}
            </Text>
          </View>
          
          <Text 
            style={[
              styles.chatPreview,
              { 
                color: isDarkMode ? theme.colors.text.muted : theme.colors.text.dark,
                opacity: item.unread ? 1 : 0.8,
              }
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.preview}
          </Text>
        </View>
      </View>
      
      <MaterialIcons 
        name="chevron-right" 
        size={24} 
        color={theme.colors.text.muted} 
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50] }
    ]}>
      <Stack.Screen 
        options={{
          title: t('chat_history'),
          headerStyle: {
            backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50],
          },
          headerTintColor: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={navigateBack}>
              <MaterialIcons 
                name="arrow-back" 
                size={24} 
                color={isDarkMode ? theme.colors.text.light : theme.colors.text.dark} 
              />
            </TouchableOpacity>
          ),
        }}
      />
      
      <View style={styles.header}>
        <Text style={[
          styles.title,
          { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
        ]}>
          {t('previous_conversations')}
        </Text>
      </View>
      
      <FlatList
        data={mockChatHistory}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialIcons 
              name="chat-bubble-outline" 
              size={48} 
              color={theme.colors.text.muted} 
            />
            <Text style={[
              styles.emptyStateText,
              { color: theme.colors.text.muted }
            ]}>
              {t('no_chat_history')}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  chatList: {
    padding: 16,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  chatItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  chatIconContainer: {
    position: 'relative',
    marginRight: 16,
  },
  chatIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadBadge: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    right: 0,
    top: 0,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatTitle: {
    fontSize: 16,
  },
  chatTime: {
    fontSize: 12,
  },
  chatPreview: {
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyStateText: {
    fontSize: 16,
    marginTop: 12,
  },
}); 