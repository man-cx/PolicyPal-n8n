import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  ViewStyle, 
  TextStyle, 
  View,
  DimensionValue
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@contexts/ThemeContext';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
  fullWidth = false,
}) => {
  const { theme, isDarkMode } = useTheme();

  // Determine button background color based on variant and theme
  const getBackgroundColor = () => {
    if (disabled) {
      return isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200];
    }

    switch (variant) {
      case 'primary':
        return theme.colors.primary[500];
      case 'secondary':
        return isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[100];
      case 'danger':
        return theme.colors.status.error;
      case 'outline':
      case 'text':
        return 'transparent';
      default:
        return theme.colors.primary[500];
    }
  };

  // Determine text color based on variant and theme
  const getTextColor = () => {
    if (disabled) {
      return isDarkMode ? theme.colors.neutral[400] : theme.colors.neutral[500];
    }

    switch (variant) {
      case 'primary':
        return '#ffffff';
      case 'secondary':
        return isDarkMode ? theme.colors.text.light : theme.colors.text.dark;
      case 'danger':
        return '#ffffff';
      case 'outline':
        return isDarkMode ? theme.colors.primary[300] : theme.colors.primary[500];
      case 'text':
        return isDarkMode ? theme.colors.primary[300] : theme.colors.primary[500];
      default:
        return '#ffffff';
    }
  };

  // Determine border attributes based on variant
  const getBorderColor = () => {
    if (disabled) {
      return isDarkMode ? theme.colors.neutral[600] : theme.colors.neutral[300];
    }

    switch (variant) {
      case 'outline':
        return isDarkMode ? theme.colors.primary[300] : theme.colors.primary[500];
      default:
        return 'transparent';
    }
  };

  // Determine padding based on size
  const getPadding = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: 6, paddingHorizontal: 12 };
      case 'large':
        return { paddingVertical: 14, paddingHorizontal: 24 };
      default:
        return { paddingVertical: 10, paddingHorizontal: 20 };
    }
  };

  // Determine font size based on size
  const getFontSize = () => {
    switch (size) {
      case 'small':
        return 12;
      case 'large':
        return 18;
      default:
        return 16;
    }
  };

  // Determine icon size based on button size
  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 16;
      case 'large':
        return 24;
      default:
        return 20;
    }
  };

  const buttonStyles = {
    ...styles.button,
    ...getPadding(),
    backgroundColor: getBackgroundColor(),
    borderColor: getBorderColor(),
    borderWidth: variant === 'outline' ? 1 : 0,
    width: fullWidth ? '100%' as DimensionValue : undefined,
  };

  const textStyles = {
    ...styles.text,
    color: getTextColor(),
    fontSize: getFontSize(),
    marginLeft: icon && iconPosition === 'left' ? 8 : 0,
    marginRight: icon && iconPosition === 'right' ? 8 : 0,
  };

  const iconColor = getTextColor();
  const iconSize = getIconSize();

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="small" color={getTextColor()} />;
    }

    return (
      <>
        {icon && iconPosition === 'left' && (
          <MaterialIcons name={icon as any} size={iconSize} color={iconColor} />
        )}
        <Text style={[textStyles, textStyle]}>{title}</Text>
        {icon && iconPosition === 'right' && (
          <MaterialIcons name={icon as any} size={iconSize} color={iconColor} />
        )}
      </>
    );
  };

  return (
    <TouchableOpacity
      style={[buttonStyles, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      <View style={styles.contentContainer}>{renderContent()}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Button; 