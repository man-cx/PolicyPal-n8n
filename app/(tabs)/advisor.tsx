import React, { useState, useRef, useEffect } from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { useTheme } from '@contexts/ThemeContext';
import { ChatBubble, TypingIndicator } from '../../src/components';

// Message type definition
interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: 'user' | 'ai';
}

// Quick suggestions
const quickSuggestions = [
  "What's my deductible?",
  "When does my policy expire?",
  "How to file a claim?",
  "Coverage limitations?",
];

export default function AdvisorScreen() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        id: '0',
        content: "Hello! I'm your PolicyPal AI advisor. I can help answer questions about your insurance policies. What would you like to know?",
        timestamp: 'Today, 10:32 AM',
        sender: 'ai'
      }
    ]);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages, isTyping]);

  // Add a componentDidMount-like effect to print theme values for debugging
  useEffect(() => {
    console.log('Theme colors:', JSON.stringify({
      neutral800: theme.colors.neutral[800],
      textLight: theme.colors.text.light,
      textDark: theme.colors.text.dark,
      textMuted: theme.colors.text.muted,
    }, null, 2));
  }, [theme]);

  const handleSend = () => {
    if (inputText.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Generate AI response after a delay
    setTimeout(() => {
      setIsTyping(false);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputText),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        sender: 'ai'
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setInputText(suggestion);
  };

  const handleFeedback = (messageId: string, isPositive: boolean) => {
    // In a real app, you would send this feedback to your backend
    console.log(`Feedback for message ${messageId}: ${isPositive ? 'positive' : 'negative'}`);
  };

  // Simple response generator
  const generateResponse = (query: string) => {
    const normalizedQuery = query.toLowerCase();
    
    if (normalizedQuery.includes('deductible')) {
      return "Your health insurance policy (HL-12345) with ABC Insurance has a $1,000 deductible. This means you'll need to pay $1,000 out-of-pocket before your insurance coverage begins.";
    } else if (normalizedQuery.includes('expire') || normalizedQuery.includes('expiration')) {
      return "Your current health insurance policy expires on January 15, 2024. I can help you set up a reminder one month before expiration if you'd like.";
    } else if (normalizedQuery.includes('claim') || normalizedQuery.includes('file')) {
      return "To file a claim, you'll need to: 1) Gather documentation of the incident, 2) Take photos if applicable, 3) Contact your insurer through their app or website, 4) Submit the claim form with all documentation. Would you like me to guide you through the process?";
    } else if (normalizedQuery.includes('coverage') || normalizedQuery.includes('limitations')) {
      return "Your health insurance policy covers hospital stays, doctor visits, prescription medications, and preventive care. Key limitations include: no coverage for elective cosmetic procedures, limited coverage for out-of-network providers, and pre-authorization required for certain specialized treatments.";
    } else if (normalizedQuery.includes('dental')) {
      return "Your health insurance plan includes basic dental coverage with an annual limit of $1,500. This covers routine cleanings, X-rays, and basic procedures. Major dental work is covered at 50% after your deductible.";
    } else {
      return "I understand you're asking about your insurance. Could you provide more specific details about what you'd like to know? I can help with policy details, coverage information, claims, or premium payments.";
    }
  };

  const navigateToHistory = () => {
    router.push('/advisor/history');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <SafeAreaView style={[
        styles.container,
        { backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50] }
      ]}>
        <View style={styles.header}>
          <View style={styles.pageTitle}>
            <MaterialIcons 
              name="smart-toy" 
              size={24} 
              color={theme.colors.primary[500]} 
              style={styles.titleIcon}
            />
            <Text style={[
              styles.titleText,
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}>
              {t('ai_policy_advisor')}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[
              styles.settingsBtn,
              { 
                backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.background.light,
                shadowColor: isDarkMode ? 'transparent' : theme.colors.neutral[900],
              }
            ]}
            onPress={navigateToHistory}
          >
            <MaterialIcons 
              name="history" 
              size={20} 
              color={isDarkMode ? theme.colors.text.light : theme.colors.text.dark} 
            />
          </TouchableOpacity>
        </View>
        
        <View style={[
          styles.chatContainer,
          { 
            backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.background.light,
            shadowColor: isDarkMode ? 'transparent' : theme.colors.neutral[900],
          }
        ]}>
          <View style={[
            styles.chatHeader,
            { 
              borderBottomColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200]
            }
          ]}>
            <View style={[
              styles.aiAvatar,
              { backgroundColor: theme.colors.primary[500] }
            ]}>
              <MaterialIcons name="smart-toy" size={20} color={theme.colors.text.light} />
            </View>
            
            <View style={styles.aiInfo}>
              <Text style={[
                styles.aiName,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}>
                PolicyPal AI
              </Text>
              <Text style={[
                styles.aiStatus,
                { color: theme.colors.status.success }
              ]}>
                {t('ready_to_assist')}
              </Text>
            </View>
          </View>
          
          <ScrollView
            ref={scrollViewRef}
            style={styles.chatBody}
            contentContainerStyle={styles.chatContent}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                content={message.content}
                timestamp={message.timestamp}
                sender={message.sender}
                showFeedback={message.sender === 'ai'}
                onFeedback={(isPositive) => handleFeedback(message.id, isPositive)}
              />
            ))}
            
            {isTyping && <TypingIndicator isVisible={isTyping} />}
          </ScrollView>
          
          <View style={[
            styles.chatFooter,
            { 
              borderTopColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200]
            }
          ]}>
            <View style={[
              styles.messageInputContainer,
              { 
                backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100],
                borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[300]
              }
            ]}>
              <TextInput
                style={[
                  styles.messageInput,
                  { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
                ]}
                placeholder={t('type_a_message')}
                placeholderTextColor={theme.colors.text.muted}
                value={inputText}
                onChangeText={setInputText}
                multiline
              />
              
              <View style={styles.messageActions}>
                <TouchableOpacity style={styles.actionBtn}>
                  <MaterialIcons 
                    name="attach-file" 
                    size={20} 
                    color={isDarkMode ? theme.colors.text.light : theme.colors.text.dark} 
                  />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.actionBtn} 
                  onPress={handleSend}
                >
                  <MaterialIcons 
                    name="send" 
                    size={20} 
                    color={theme.colors.primary[500]} 
                  />
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.quickSuggestions}>
              {quickSuggestions.map((suggestion, index) => (
                <TouchableOpacity 
                  key={index}
                  style={[
                    styles.suggestion,
                    { 
                      backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.background.light,
                      borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200]
                    }
                  ]}
                  onPress={() => handleQuickSuggestion(suggestion)}
                >
                  <Text style={[
                    styles.suggestionText,
                    { color: isDarkMode ? theme.colors.text.light : theme.colors.primary[500] }
                  ]}>
                    {suggestion}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  pageTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    marginRight: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chatContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  aiAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  aiInfo: {
    flex: 1,
  },
  aiName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  aiStatus: {
    fontSize: 12,
  },
  chatBody: {
    flex: 1,
  },
  chatContent: {
    padding: 16,
  },
  chatFooter: {
    padding: 16,
    borderTopWidth: 1,
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
  },
  messageInput: {
    flex: 1,
    minHeight: 36,
    maxHeight: 100,
    fontSize: 14,
    paddingVertical: 4,
  },
  messageActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  quickSuggestions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8,
  },
  suggestion: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  suggestionText: {
    fontSize: 12,
  },
}); 