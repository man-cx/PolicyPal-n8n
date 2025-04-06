import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@contexts/ThemeContext';

interface PolicyCardProps {
  title: string;
  policyNumber: string;
  type: string;
  insurer: string;
  premium: string;
  expiryDate: string;
  onPress?: () => void;
  onViewHistory?: () => void;
  onShare?: () => void;
  style?: ViewStyle;
  isExpiringSoon?: boolean;
}

const PolicyCard: React.FC<PolicyCardProps> = ({
  title,
  policyNumber,
  type,
  insurer,
  premium,
  expiryDate,
  onPress,
  onViewHistory,
  onShare,
  style,
  isExpiringSoon = false,
}) => {
  const { theme, isDarkMode } = useTheme();

  // Determine icon based on policy type
  const getIconName = () => {
    switch (type.toLowerCase()) {
      case 'health':
        return 'favorite';
      case 'auto':
      case 'car':
        return 'directions-car';
      case 'home':
      case 'property':
        return 'home';
      case 'life':
        return 'person';
      case 'travel':
        return 'flight';
      default:
        return 'shield';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: isDarkMode ? theme.colors.neutral[800] : '#ffffff',
          shadowColor: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)',
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.policyHeader}>
        <View
          style={[
            styles.policyIcon,
            { backgroundColor: isDarkMode ? theme.colors.primary[700] : theme.colors.primary[50] },
          ]}
        >
          <MaterialIcons
            name={getIconName()}
            size={24}
            color={isDarkMode ? theme.colors.primary[200] : theme.colors.primary[600]}
          />
        </View>
        <View style={styles.policyTitle}>
          <Text
            style={[
              styles.policyTitleText,
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark },
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text
            style={[
              styles.policyNumber,
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.neutral[500] },
            ]}
            numberOfLines={1}
          >
            {policyNumber}
          </Text>
        </View>
      </View>

      <View style={styles.policyDetails}>
        <View style={styles.policyDetail}>
          <Text
            style={[
              styles.detailLabel,
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.neutral[500] },
            ]}
          >
            {type}
          </Text>
          <Text
            style={[
              styles.detailValue,
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark },
            ]}
          >
            {insurer}
          </Text>
        </View>

        <View style={styles.policyDetail}>
          <Text
            style={[
              styles.detailLabel,
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.neutral[500] },
            ]}
          >
            Premium
          </Text>
          <Text
            style={[
              styles.detailValue,
              { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark },
            ]}
          >
            {premium}
          </Text>
        </View>
      </View>

      <View style={[styles.policyExpires, { borderTopColor: isDarkMode ? theme.colors.neutral[700] : '#f1f1f1' }]}>
        <Text
          style={[
            styles.expiresLabel,
            { color: isDarkMode ? theme.colors.text.muted : theme.colors.neutral[500] },
          ]}
        >
          Expires
        </Text>
        <Text
          style={[
            styles.expiresDate,
            {
              color: isExpiringSoon
                ? theme.colors.status.warning
                : isDarkMode
                ? theme.colors.text.light
                : theme.colors.text.dark,
            },
          ]}
        >
          {expiryDate}
        </Text>
      </View>

      <View style={[styles.policyActions, { borderTopColor: isDarkMode ? theme.colors.neutral[700] : '#f1f1f1' }]}>
        <TouchableOpacity
          style={[
            styles.actionBtn,
            {
              backgroundColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[100],
            },
          ]}
          onPress={onViewHistory}
        >
          <MaterialIcons
            name="history"
            size={14}
            color={isDarkMode ? theme.colors.text.muted : theme.colors.neutral[500]}
          />
          <Text
            style={[
              styles.actionBtnText,
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.neutral[500] },
            ]}
          >
            History
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionBtn,
            {
              backgroundColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[100],
            },
          ]}
          onPress={onShare}
        >
          <MaterialIcons
            name="share"
            size={14}
            color={isDarkMode ? theme.colors.text.muted : theme.colors.neutral[500]}
          />
          <Text
            style={[
              styles.actionBtnText,
              { color: isDarkMode ? theme.colors.text.muted : theme.colors.neutral[500] },
            ]}
          >
            Share
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

interface SimpleCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

export const SimpleCard: React.FC<SimpleCardProps> = ({ children, style, onPress }) => {
  const { theme, isDarkMode } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.simpleCard,
        {
          backgroundColor: isDarkMode ? theme.colors.neutral[800] : '#ffffff',
          shadowColor: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)',
        },
        style,
      ]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 15,
  },
  simpleCard: {
    borderRadius: 10,
    padding: 16,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 10,
  },
  policyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  policyIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  policyTitle: {
    flex: 1,
  },
  policyTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  policyNumber: {
    fontSize: 14,
  },
  policyDetails: {
    marginTop: 15,
  },
  policyDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  policyExpires: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expiresLabel: {
    fontSize: 14,
  },
  expiresDate: {
    fontSize: 14,
    fontWeight: '500',
  },
  policyActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
  },
  actionBtn: {
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtnText: {
    fontSize: 12,
    marginLeft: 5,
  },
});

export default PolicyCard; 