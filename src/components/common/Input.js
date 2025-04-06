/**
 * Input Component
 * 
 * A reusable text input component with different states.
 * Usage:
 *   <Input
 *     label="Username"
 *     placeholder="Enter your username"
 *     onChangeText={(text) => setUsername(text)}
 *     error={usernameError}
 *   />
 */

import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../styles/theme';

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  helper,
  secureTextEntry,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  autoCapitalize = 'none',
  style,
  inputStyle,
  labelStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    if (props.onFocus) props.onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (props.onBlur) props.onBlur();
  };

  const containerStyles = [
    styles.container,
    style,
  ];

  const inputContainerStyles = [
    styles.inputContainer,
    isFocused && styles.inputContainerFocused,
    error && styles.inputContainerError,
    disabled && styles.inputContainerDisabled,
    multiline && styles.inputContainerMultiline,
  ];

  const inputStyles = [
    styles.input,
    multiline && styles.inputMultiline,
    disabled && styles.inputDisabled,
    inputStyle,
  ];

  const labelStyles = [
    styles.label,
    disabled && styles.labelDisabled,
    labelStyle,
  ];

  return (
    <View style={containerStyles}>
      {label && <Text style={labelStyles}>{label}</Text>}

      <View style={inputContainerStyles}>
        <TextInput
          style={inputStyles}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={secureTextEntry}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
      {helper && !error && <Text style={styles.helperText}>{helper}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    width: '100%',
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  labelDisabled: {
    color: colors.textMuted,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    backgroundColor: colors.backgroundLight,
    paddingHorizontal: spacing.md,
  },
  inputContainerFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.backgroundLight,
  },
  inputContainerError: {
    borderColor: colors.error,
  },
  inputContainerDisabled: {
    backgroundColor: colors.backgroundDisabled,
    borderColor: colors.border,
  },
  inputContainerMultiline: {
    minHeight: 100,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  input: {
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    paddingVertical: spacing.sm,
    height: 40,
  },
  inputMultiline: {
    height: 'auto',
    textAlignVertical: 'top',
  },
  inputDisabled: {
    color: colors.textMuted,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.fontSize.xs,
    marginTop: spacing.xs,
  },
  helperText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xs,
    marginTop: spacing.xs,
  },
});

export default Input; 