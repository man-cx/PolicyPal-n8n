import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  FlatList,
  Animated
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from '../../src/contexts/ThemeContext';

// Message type definition
interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: 'user' | 'ai';
  isTyping?: boolean;
}

// Predefined quick suggestion messages
const quickSuggestions = [
  { id: '1', text: "What's my deductible?" },
  { id: '2', text: "When does my policy expire?" },
  { id: '3', text: "How to file a claim?" },
  { id: '4', text: "Coverage limitations?" },
];

export default function ChatScreen() {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Animation values for typing indicator
  const dot1Anim = useRef(new Animated.Value(0)).current;
  const dot2Anim = useRef(new Animated.Value(0)).current;
  const dot3Anim = useRef(new Animated.Value(0)).current;
  
  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '0',
      content: "Hello! I'm your PolicyPal AI advisor. I can help answer questions about your insurance policies. What would you like to know?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'ai'
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSend = () => {
    if (inputText.trim() === '') return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // Simulate AI typing
    setIsAiTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      setIsAiTyping(false);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputText),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'ai'
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setInputText(suggestion);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages, isAiTyping]);

  // Animate typing dots
  useEffect(() => {
    if (isAiTyping) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot1Anim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot1Anim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ).start();
      
      Animated.loop(
        Animated.sequence([
          Animated.delay(200),
          Animated.timing(dot2Anim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot2Anim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ).start();
      
      Animated.loop(
        Animated.sequence([
          Animated.delay(400),
          Animated.timing(dot3Anim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot3Anim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      dot1Anim.stopAnimation();
      dot2Anim.stopAnimation();
      dot3Anim.stopAnimation();
    }
  }, [isAiTyping, dot1Anim, dot2Anim, dot3Anim]);

  // Simple response generator for demo purposes
  const generateResponse = (query: string) => {
    if (query.toLowerCase().includes('deductible')) {
      return "Your health insurance policy (HL-12345) with ABC Insurance has a $1,000 deductible. This means you'll need to pay $1,000 out-of-pocket before your insurance coverage begins.";
    } else if (query.toLowerCase().includes('expire') || query.toLowerCase().includes('expiration')) {
      return "Your current health insurance policy expires on January 15, 2024. I can help you set up a reminder one month before expiration if you'd like.";
    } else if (query.toLowerCase().includes('claim') || query.toLowerCase().includes('file')) {
      return "To file a claim, you'll need to: 1) Gather documentation of the incident, 2) Take photos if applicable, 3) Contact your insurer through their app or website, 4) Submit the claim form with all documentation. Would you like me to guide you through the process?";
    } else if (query.toLowerCase().includes('coverage') || query.toLowerCase().includes('limitations')) {
      return "Your health insurance policy covers hospital stays, doctor visits, prescription medications, and preventive care. Key limitations include: no coverage for elective cosmetic procedures, limited coverage for out-of-network providers, and pre-authorization required for certain specialized treatments.";
    } else if (query.toLowerCase().includes('dental')) {
      return "Your health insurance plan includes basic dental coverage with an annual limit of $1,500. This covers routine cleanings, X-rays, and basic procedures. Major dental work is covered at 50% after your deductible.";
    } else {
      return "I understand you're asking about your insurance. Could you provide more specific details about what you'd like to know? I can help with policy details, coverage information, claims, or premium payments.";
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <Stack.Screen
        options={{
          title: t('ai_advisor'),
          headerStyle: {
            backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50],
          },
          headerTintColor: isDarkMode ? theme.colors.text.light : theme.colors.text.dark,
          headerShadowVisible: false,
        }}
      />
      
      <View
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[50] }
        ]}
      >
        {/* Chat Header */}
        <View
          style={[
            styles.chatHeader,
            { 
              backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100],
              borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200]
            }
          ]}
        >
          <View
            style={[
              styles.aiAvatar,
              { backgroundColor: theme.colors.primary[500] }
            ]}
          >
            <MaterialIcons name="smart-toy" size={24} color="white" />
          </View>
          <View style={styles.aiInfo}>
            <Text
              style={[
                styles.aiName,
                { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
              ]}
            >
              PolicyPal AI
            </Text>
            <Text
              style={[
                styles.aiStatus,
                { color: theme.colors.status.success }
              ]}
            >
              {t('online')}
            </Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <MaterialIcons
              name="more-vert"
              size={24}
              color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted}
            />
          </TouchableOpacity>
        </View>
        
        {/* Chat Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatBody}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                message.sender === 'user' ? styles.userMessageContainer : styles.aiMessageContainer
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  message.sender === 'user'
                    ? [
                        styles.userMessage,
                        { backgroundColor: theme.colors.primary[500] }
                      ]
                    : [
                        styles.aiMessage,
                        { 
                          backgroundColor: isDarkMode 
                            ? theme.colors.neutral[800] 
                            : theme.colors.neutral[100],
                          borderColor: isDarkMode 
                            ? theme.colors.neutral[700] 
                            : theme.colors.neutral[200]
                        }
                      ]
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    message.sender === 'user'
                      ? { color: 'white' }
                      : { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
                  ]}
                >
                  {message.content}
                </Text>
              </View>
              <Text
                style={[
                  styles.timestamp,
                  { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
                ]}
              >
                {message.timestamp}
              </Text>
              
              {/* Feedback buttons for AI messages */}
              {message.sender === 'ai' && (
                <View style={styles.feedbackContainer}>
                  <TouchableOpacity
                    style={[
                      styles.feedbackButton,
                      { 
                        backgroundColor: isDarkMode 
                          ? theme.colors.neutral[800] 
                          : 'white',
                        borderColor: isDarkMode 
                          ? theme.colors.neutral[700] 
                          : theme.colors.neutral[200]
                      }
                    ]}
                  >
                    <MaterialIcons
                      name="thumb-up"
                      size={16}
                      color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted}
                    />
                    <Text
                      style={[
                        styles.feedbackText,
                        { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
                      ]}
                    >
                      {t('helpful')}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[
                      styles.feedbackButton,
                      { 
                        backgroundColor: isDarkMode 
                          ? theme.colors.neutral[800] 
                          : 'white',
                        borderColor: isDarkMode 
                          ? theme.colors.neutral[700] 
                          : theme.colors.neutral[200]
                      }
                    ]}
                  >
                    <MaterialIcons
                      name="thumb-down"
                      size={16}
                      color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted}
                    />
                    <Text
                      style={[
                        styles.feedbackText,
                        { color: isDarkMode ? theme.colors.text.muted : theme.colors.text.muted }
                      ]}
                    >
                      {t('not_helpful')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
          
          {/* Typing indicator */}
          {isAiTyping && (
            <View style={styles.aiMessageContainer}>
              <View
                style={[
                  styles.typingIndicator,
                  { 
                    backgroundColor: isDarkMode 
                      ? theme.colors.neutral[800] 
                      : theme.colors.neutral[100]
                  }
                ]}
              >
                <View style={styles.typingDots}>
                  <Animated.View 
                    style={[
                      styles.dot,
                      { 
                        backgroundColor: theme.colors.primary[500],
                        transform: [
                          {
                            translateY: dot1Anim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, -5]
                            })
                          }
                        ]
                      }
                    ]} 
                  />
                  <Animated.View 
                    style={[
                      styles.dot,
                      { 
                        backgroundColor: theme.colors.primary[500],
                        transform: [
                          {
                            translateY: dot2Anim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, -5]
                            })
                          }
                        ]
                      }
                    ]} 
                  />
                  <Animated.View 
                    style={[
                      styles.dot,
                      { 
                        backgroundColor: theme.colors.primary[500],
                        transform: [
                          {
                            translateY: dot3Anim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, -5]
                            })
                          }
                        ]
                      }
                    ]} 
                  />
                </View>
              </View>
            </View>
          )}
        </ScrollView>
        
        {/* Quick Suggestions */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.quickSuggestionsContainer}
          contentContainerStyle={styles.quickSuggestionsContent}
        >
          {quickSuggestions.map((suggestion) => (
            <TouchableOpacity
              key={suggestion.id}
              style={[
                styles.suggestionChip,
                { 
                  backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
                  borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200]
                }
              ]}
              onPress={() => handleQuickSuggestion(suggestion.text)}
            >
              <Text
                style={[
                  styles.suggestionText,
                  { color: theme.colors.primary[500] }
                ]}
              >
                {suggestion.text}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Input Area */}
        <View
          style={[
            styles.inputContainer,
            { 
              backgroundColor: isDarkMode ? theme.colors.neutral[800] : 'white',
              borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200]
            }
          ]}
        >
          <TouchableOpacity style={styles.attachButton}>
            <MaterialIcons
              name="attach-file"
              size={24}
              color={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted}
            />
          </TouchableOpacity>
          
          <TextInput
            style={[
              styles.input,
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}
            placeholder={t('type_a_message')}
            placeholderTextColor={isDarkMode ? theme.colors.text.muted : theme.colors.text.muted}
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          
          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                backgroundColor: inputText.trim() 
                  ? theme.colors.primary[500] 
                  : isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[300],
                opacity: inputText.trim() ? 1 : 0.5
              }
            ]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <MaterialIcons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  aiInfo: {
    marginLeft: 12,
    flex: 1,
  },
  aiName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  aiStatus: {
    fontSize: 12,
  },
  moreButton: {
    padding: 4,
  },
  chatBody: {
    flex: 1,
  },
  chatContent: {
    padding: 16,
    paddingBottom: 20,
  },
  messageContainer: {
    marginBottom: 20,
    maxWidth: '80%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
  },
  aiMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  userMessage: {
    borderBottomRightRadius: 4,
  },
  aiMessage: {
    borderBottomLeftRadius: 4,
    borderWidth: 1,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  feedbackContainer: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
  },
  feedbackText: {
    fontSize: 12,
    marginLeft: 4,
  },
  typingIndicator: {
    padding: 15,
    borderRadius: 18,
    alignSelf: 'flex-start',
  },
  typingDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  quickSuggestionsContainer: {
    maxHeight: 60,
    marginBottom: 8,
  },
  quickSuggestionsContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 8,
    flexDirection: 'row',
  },
  suggestionChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  suggestionText: {
    fontSize: 13,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
}); 