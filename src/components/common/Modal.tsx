import React from 'react';
import {
  View,
  Text,
  Modal as RNModal,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@contexts/ThemeContext';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  titleStyle?: TextStyle;
  showCloseButton?: boolean;
  closeOnBackdropPress?: boolean;
  scrollable?: boolean;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  style,
  contentStyle,
  titleStyle,
  showCloseButton = true,
  closeOnBackdropPress = true,
  scrollable = false,
  footer,
}) => {
  const { theme, isDarkMode } = useTheme();

  const handleBackdropPress = () => {
    if (closeOnBackdropPress) {
      onClose();
    }
  };

  const ContentWrapper = scrollable ? ScrollView : View;

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        style={styles.centeredView} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        
        <View
          style={[
            styles.modalView,
            {
              backgroundColor: isDarkMode ? theme.colors.neutral[800] : '#ffffff',
              shadowColor: isDarkMode ? '#000' : 'rgba(0, 0, 0, 0.2)',
            },
            style,
          ]}
        >
          {title && (
            <View style={styles.titleContainer}>
              <Text
                style={[
                  styles.title,
                  { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark },
                  titleStyle,
                ]}
              >
                {title}
              </Text>
              {showCloseButton && (
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <MaterialIcons
                    name="close"
                    size={24}
                    color={isDarkMode ? theme.colors.text.muted : theme.colors.neutral[500]}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
          
          <ContentWrapper
            style={[
              styles.contentContainer,
              scrollable && styles.scrollableContent,
              contentStyle,
            ]}
          >
            {children}
          </ContentWrapper>
          
          {footer && (
            <View style={[
              styles.footer, 
              { borderTopColor: isDarkMode ? theme.colors.neutral[700] : theme.colors.neutral[200] }
            ]}>
              {footer}
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </RNModal>
  );
};

// Confirmation Modal Component
interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonColor?: string;
  isDestructive?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmButtonColor,
  isDestructive = false,
}) => {
  const { theme, isDarkMode } = useTheme();

  const buttonColor = confirmButtonColor || 
    (isDestructive ? theme.colors.status.error : theme.colors.primary[500]);

  const footer = (
    <View style={styles.confirmationButtons}>
      <TouchableOpacity
        style={[
          styles.button,
          styles.cancelButton,
          { borderColor: isDarkMode ? theme.colors.neutral[600] : theme.colors.neutral[300] }
        ]}
        onPress={onClose}
      >
        <Text style={[
          styles.buttonText, 
          { color: isDarkMode ? theme.colors.text.light : theme.colors.text.dark }
        ]}>
          {cancelText}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.button,
          styles.confirmButton,
          { backgroundColor: buttonColor }
        ]}
        onPress={() => {
          onConfirm();
          onClose();
        }}
      >
        <Text style={[styles.buttonText, styles.confirmButtonText]}>
          {confirmText}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={title}
      footer={footer}
    >
      <Text style={[
        styles.message,
        { color: isDarkMode ? theme.colors.text.muted : theme.colors.neutral[600] }
      ]}>
        {message}
      </Text>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: '80%',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  scrollableContent: {
    maxHeight: 400,
  },
  footer: {
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  confirmationButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  confirmButton: {
    borderWidth: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  confirmButtonText: {
    color: 'white',
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
});

export default Modal; 