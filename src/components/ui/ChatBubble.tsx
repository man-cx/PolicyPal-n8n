import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from '@contexts/ThemeContext';

interface ChatBubbleProps {
  content: string;
  timestamp: string;
  sender: 'user' | 'ai';
  showFeedback?: boolean;
  onFeedback?: (isPositive: boolean) => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  content,
  timestamp,
  sender,
  showFeedback = false,
  onFeedback,
}) => {
  const { theme, isDarkMode } = useTheme();
  
  // Get appropriate colors based on sender and theme
  const bubbleStyle = React.useMemo(() => {
    const commonStyles = {
      borderRadius: 18,
      padding: 14,
    };

    if (sender === 'ai') {
      return StyleSheet.create({
        bubble: {
          ...commonStyles,
          backgroundColor: isDarkMode ? theme.colors.neutral[900] : theme.colors.neutral[200],
          borderBottomLeftRadius: 5,
        }
      });
    } else {
      return StyleSheet.create({
        bubble: {
          ...commonStyles,
          backgroundColor: theme.colors.primary[500],
          borderBottomRightRadius: 5,
        }
      });
    }
  }, [sender, isDarkMode, theme]);
  
  const getTextColor = () => {
    // Always use light text (white) in dark mode for AI messages
    if (sender === 'ai') {
      return isDarkMode ? theme.colors.text.light : theme.colors.text.dark;
    } else {
      return theme.colors.text.light;
    }
  };
  
  return (
    <View style={[
      styles.container,
      { maxWidth: '80%', alignSelf: sender === 'ai' ? 'flex-start' : 'flex-end' }
    ]}>
      <View style={bubbleStyle.bubble}>
        <Text style={[styles.messageText, { color: getTextColor() }]}>
          {content}
        </Text>
      </View>
      
      <Text style={[
        styles.timestamp,
        { 
          color: theme.colors.text.muted,
          textAlign: sender === 'ai' ? 'left' : 'right',
        }
      ]}>
        {timestamp}
      </Text>
      
      {showFeedback && sender === 'ai' && (
        <View style={styles.feedbackContainer}>
          <TouchableOpacity 
            style={[
              styles.feedbackButton,
              { 
                backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100],
                borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[300]
              }
            ]}
            onPress={() => onFeedback && onFeedback(true)}
          >
            <MaterialIcons 
              name="thumb-up" 
              size={14} 
              color={isDarkMode ? theme.colors.text.light : theme.colors.text.dark} 
              style={styles.feedbackIcon}
            />
            <Text style={[
              styles.feedbackText,
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}>
              Helpful
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.feedbackButton,
              { 
                backgroundColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[100],
                borderColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[300]
              }
            ]}
            onPress={() => onFeedback && onFeedback(false)}
          >
            <MaterialIcons 
              name="thumb-down" 
              size={14} 
              color={isDarkMode ? theme.colors.text.light : theme.colors.text.dark} 
              style={styles.feedbackIcon}
            />
            <Text style={[
              styles.feedbackText,
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
            ]}>
              Not helpful
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 11,
    marginTop: 5,
  },
  feedbackContainer: {
    flexDirection: 'row',
    marginTop: 6,
    gap: 8,
  },
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  feedbackIcon: {
    marginRight: 4,
  },
  feedbackText: {
    fontSize: 12,
  }
});

export default ChatBubble; 