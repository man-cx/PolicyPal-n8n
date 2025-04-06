/**
 * Icon Component
 * 
 * A reusable icon component that uses a simple icon system.
 * This implementation uses react-native-vector-icons
 * 
 * Usage:
 *   <Icon name="home" size={24} color="#000" />
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../styles/theme';

// Icon families we support
const ICON_SETS = {
  material: MaterialIcons,
  fontawesome: FontAwesome,
};

const Icon = ({
  name,
  size = 24,
  color = colors.textPrimary,
  family = 'material',
  style,
  onPress,
  ...props
}) => {
  // Get the icon set based on family
  const IconSet = ICON_SETS[family.toLowerCase()] || ICON_SETS.material;

  return (
    <View style={[styles.container, style]}>
      <IconSet
        name={name}
        size={size}
        color={color}
        style={onPress && styles.clickable}
        onPress={onPress}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  clickable: {
    padding: 5,
  },
});

// Define some common icon names as constants
// This helps with consistency and autocomplete
Icon.NAMES = {
  // Navigation
  HOME: 'home',
  BACK: 'arrow-back',
  FORWARD: 'arrow-forward',
  MENU: 'menu',
  CLOSE: 'close',
  
  // Common actions
  ADD: 'add',
  REMOVE: 'remove',
  EDIT: 'edit',
  DELETE: 'delete',
  SEARCH: 'search',
  SETTINGS: 'settings',
  
  // Status
  SUCCESS: 'check-circle',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  
  // Social
  SHARE: 'share',
  FAVORITE: 'favorite',
  LIKE: 'thumb-up',
  
  // User
  USER: 'person',
  USERS: 'people',
  
  // Communication
  EMAIL: 'email',
  PHONE: 'phone',
  MESSAGE: 'message',
  
  // Files
  DOCUMENT: 'description',
  UPLOAD: 'file-upload',
  DOWNLOAD: 'file-download',
  
  // Misc
  CALENDAR: 'event',
  CLOCK: 'access-time',
  NOTIFICATION: 'notifications',
  LOCK: 'lock',
  UNLOCK: 'lock-open',
};

export default Icon; 