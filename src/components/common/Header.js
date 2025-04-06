/**
 * Header Component
 * 
 * A reusable header component for screens.
 * Usage:
 *   <Header 
 *     title="Screen Title" 
 *     leftComponent={<Icon name="arrow-back" onPress={goBack} />} 
 *     rightComponent={<Button title="Save" variant="text" onPress={save} />} 
 *   />
 */

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { colors, spacing, typography, shadows } from '../../styles/theme';
import Icon from './Icon';

const Header = ({
  title,
  subtitle,
  leftComponent,
  rightComponent,
  showBackButton = false,
  onBackPress,
  backgroundColor = colors.backgroundLight,
  titleColor = colors.textPrimary,
  elevation = true,
  style,
  titleStyle,
  subtitleStyle,
  ...props
}) => {
  const renderLeft = () => {
    if (leftComponent) return leftComponent;
    
    if (showBackButton) {
      return (
        <Icon
          name="arrow-back"
          size={24}
          color={titleColor}
          onPress={onBackPress}
          style={styles.backButton}
        />
      );
    }
    
    return <View style={styles.leftPlaceholder} />;
  };

  const renderCenter = () => (
    <View style={styles.centerContainer}>
      {title && (
        <Text style={[styles.title, { color: titleColor }, titleStyle]} numberOfLines={1}>
          {title}
        </Text>
      )}
      {subtitle && (
        <Text style={[styles.subtitle, subtitleStyle]} numberOfLines={1}>
          {subtitle}
        </Text>
      )}
    </View>
  );

  const renderRight = () => {
    if (rightComponent) return rightComponent;
    return <View style={styles.rightPlaceholder} />;
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={backgroundColor === colors.backgroundLight ? 'dark-content' : 'light-content'}
      />
      <View 
        style={[
          styles.container, 
          elevation && styles.elevated,
          { backgroundColor },
          style
        ]}
        {...props}
      >
        <View style={styles.leftContainer}>
          {renderLeft()}
        </View>
        
        {renderCenter()}
        
        <View style={styles.rightContainer}>
          {renderRight()}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: spacing.md,
    width: '100%',
  },
  elevated: {
    ...shadows.sm,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  backButton: {
    padding: spacing.xs,
  },
  leftPlaceholder: {
    width: 32,
  },
  rightPlaceholder: {
    width: 32,
  },
});

export default Header; 