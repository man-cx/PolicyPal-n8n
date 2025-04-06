import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, Platform, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@contexts/ThemeContext';
import { router } from 'expo-router';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightIcon?: string;
  onRightIconPress?: () => void;
  onBackPress?: () => void;
  style?: ViewStyle;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  rightIcon,
  onRightIconPress,
  onBackPress,
  style,
}) => {
  const { theme, isDarkMode } = useTheme();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? theme.colors.neutral[900] : '#ffffff',
          borderBottomColor: isDarkMode ? theme.colors.neutral[800] : theme.colors.neutral[200],
        },
        style,
      ]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? theme.colors.neutral[900] : '#ffffff'}
      />
      
      <View style={styles.headerContent}>
        {showBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={isDarkMode ? theme.colors.text.light : theme.colors.text.dark}
            />
          </TouchableOpacity>
        )}
        
        <Text
          style={[
            styles.title,
            { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark },
            showBackButton && styles.titleWithBack,
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
        
        {rightIcon && (
          <TouchableOpacity style={styles.rightButton} onPress={onRightIconPress}>
            <MaterialIcons
              name={rightIcon as any}
              size={24}
              color={isDarkMode ? theme.colors.primary[400] : theme.colors.primary[500]}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// Additional component for section headers within screens
export const SectionHeader: React.FC<{ title: string; style?: ViewStyle }> = ({ title, style }) => {
  const { theme, isDarkMode } = useTheme();
  
  return (
    <View style={[styles.sectionHeader, style]}>
      <Text
        style={[
          styles.sectionTitle,
          { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark },
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  titleWithBack: {
    marginLeft: 4,
  },
  rightButton: {
    padding: 8,
  },
  sectionHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Header; 