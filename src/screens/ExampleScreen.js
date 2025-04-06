/**
 * Example Screen
 * 
 * This screen demonstrates the usage of our common components.
 */

import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { 
  Button, 
  Card, 
  Input, 
  Avatar, 
  Badge, 
  Icon, 
  Header 
} from '../components/common';
import { colors, spacing } from '../styles/theme';

const ExampleScreen = ({ navigation }) => {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  const validateInput = (text) => {
    setInputValue(text);
    if (text.length < 3) {
      setInputError('Input must be at least 3 characters');
    } else {
      setInputError('');
    }
  };

  const handleSubmit = () => {
    alert(`Submitted: ${inputValue}`);
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Components" 
        subtitle="Examples of UI components"
        showBackButton 
        onBackPress={() => navigation.goBack()} 
      />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Buttons</Text>
          <View style={styles.row}>
            <Button 
              title="Primary" 
              onPress={() => alert('Primary button pressed')}
              style={styles.button} 
            />
            <Button 
              title="Secondary" 
              variant="secondary" 
              onPress={() => alert('Secondary button pressed')}
              style={styles.button} 
            />
          </View>
          <View style={styles.row}>
            <Button 
              title="Outlined" 
              variant="outlined" 
              onPress={() => alert('Outlined button pressed')}
              style={styles.button} 
            />
            <Button 
              title="Text" 
              variant="text" 
              onPress={() => alert('Text button pressed')}
              style={styles.button} 
            />
          </View>
          <View style={styles.row}>
            <Button 
              title="Success" 
              variant="success" 
              onPress={() => alert('Success button pressed')}
              style={styles.button} 
            />
            <Button 
              title="Danger" 
              variant="danger" 
              onPress={() => alert('Danger button pressed')}
              style={styles.button} 
            />
          </View>
          <View style={styles.row}>
            <Button 
              title="With Icon" 
              leftIcon="check"
              onPress={() => alert('Button with icon pressed')}
              style={styles.button} 
            />
            <Button 
              title="Loading" 
              loading
              onPress={() => {}}
              style={styles.button} 
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cards</Text>
          <Card style={styles.card}>
            <Card.Header>
              <Text style={styles.cardTitle}>Default Card</Text>
            </Card.Header>
            <Card.Divider />
            <Text style={styles.cardContent}>
              This is a basic card with header, content and footer sections.
            </Text>
            <Card.Footer>
              <Button 
                title="Action" 
                variant="text" 
                size="small"
                onPress={() => alert('Card action pressed')} 
              />
            </Card.Footer>
          </Card>

          <Card variant="elevated" style={styles.card}>
            <Text style={styles.cardTitle}>Elevated Card</Text>
            <Text style={styles.cardContent}>
              This card has elevation and shadow applied.
            </Text>
          </Card>

          <Card 
            variant="outlined" 
            style={styles.card}
            onPress={() => alert('Touchable card pressed')}
          >
            <Text style={styles.cardTitle}>Touchable Card</Text>
            <Text style={styles.cardContent}>
              This card is touchable and has a border.
            </Text>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inputs</Text>
          <Input
            label="Username"
            placeholder="Enter your username"
            value={inputValue}
            onChangeText={validateInput}
            error={inputError}
            helper="Your username must be at least 3 characters"
          />
          
          <Input
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
          />
          
          <Input
            label="Comments"
            placeholder="Enter your comments"
            multiline
            numberOfLines={3}
          />
          
          <Input
            label="Disabled Input"
            value="This input is disabled"
            disabled
          />
          
          <Button 
            title="Submit" 
            onPress={handleSubmit}
            disabled={!!inputError || !inputValue}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Avatars</Text>
          <View style={styles.row}>
            <View style={styles.centered}>
              <Avatar
                source={{ uri: 'https://i.pravatar.cc/150?img=1' }}
                size="small"
                style={styles.avatar}
              />
              <Text style={styles.caption}>Small</Text>
            </View>
            
            <View style={styles.centered}>
              <Avatar
                source={{ uri: 'https://i.pravatar.cc/150?img=2' }}
                size="medium"
                style={styles.avatar}
              />
              <Text style={styles.caption}>Medium</Text>
            </View>
            
            <View style={styles.centered}>
              <Avatar
                source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
                size="large"
                style={styles.avatar}
              />
              <Text style={styles.caption}>Large</Text>
            </View>
          </View>
          
          <View style={styles.row}>
            <View style={styles.centered}>
              <Avatar
                name="John Doe"
                size="small"
                style={styles.avatar}
              />
              <Text style={styles.caption}>Initials</Text>
            </View>
            
            <View style={styles.centered}>
              <Avatar
                name="Jane Smith"
                size="medium"
                backgroundColor={colors.success}
                style={styles.avatar}
              />
              <Text style={styles.caption}>Custom Color</Text>
            </View>
            
            <View style={styles.centered}>
              <Avatar
                name="Guest User"
                size="large"
                backgroundColor={colors.warning}
                style={styles.avatar}
              />
              <Text style={styles.caption}>Guest</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Badges</Text>
          <View style={styles.row}>
            <View style={styles.centered}>
              <Badge value="3" style={styles.badge} />
              <Text style={styles.caption}>Default</Text>
            </View>
            
            <View style={styles.centered}>
              <Badge value="New" variant="success" style={styles.badge} />
              <Text style={styles.caption}>Success</Text>
            </View>
            
            <View style={styles.centered}>
              <Badge value="Warning" variant="warning" style={styles.badge} />
              <Text style={styles.caption}>Warning</Text>
            </View>
            
            <View style={styles.centered}>
              <Badge value="Error" variant="error" style={styles.badge} />
              <Text style={styles.caption}>Error</Text>
            </View>
          </View>
          
          <View style={styles.row}>
            <View style={styles.centered}>
              <Badge value="1" size="small" style={styles.badge} />
              <Text style={styles.caption}>Small</Text>
            </View>
            
            <View style={styles.centered}>
              <Badge value="10" size="medium" style={styles.badge} />
              <Text style={styles.caption}>Medium</Text>
            </View>
            
            <View style={styles.centered}>
              <Badge value="100+" size="large" style={styles.badge} />
              <Text style={styles.caption}>Large</Text>
            </View>
            
            <View style={styles.centered}>
              <Badge value="Outlined" variant="info" outlined style={styles.badge} />
              <Text style={styles.caption}>Outlined</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Icons</Text>
          <View style={styles.row}>
            <View style={styles.centered}>
              <Icon name={Icon.NAMES.HOME} size={24} style={styles.icon} />
              <Text style={styles.caption}>Home</Text>
            </View>
            
            <View style={styles.centered}>
              <Icon name={Icon.NAMES.NOTIFICATION} size={24} color={colors.primary} style={styles.icon} />
              <Text style={styles.caption}>Notification</Text>
            </View>
            
            <View style={styles.centered}>
              <Icon name={Icon.NAMES.SUCCESS} size={24} color={colors.success} style={styles.icon} />
              <Text style={styles.caption}>Success</Text>
            </View>
            
            <View style={styles.centered}>
              <Icon name={Icon.NAMES.ERROR} size={24} color={colors.error} style={styles.icon} />
              <Text style={styles.caption}>Error</Text>
            </View>
          </View>
          
          <View style={styles.row}>
            <View style={styles.centered}>
              <Icon 
                name={Icon.NAMES.SETTINGS} 
                size={24} 
                color={colors.info} 
                onPress={() => alert('Settings icon pressed')}
                style={styles.icon} 
              />
              <Text style={styles.caption}>Touchable</Text>
            </View>
            
            <View style={styles.centered}>
              <Icon name="star" family="fontawesome" size={24} color={colors.warning} style={styles.icon} />
              <Text style={styles.caption}>FontAwesome</Text>
            </View>
            
            <View style={styles.centered}>
              <Icon name={Icon.NAMES.USER} size={24} color={colors.medium} style={styles.icon} />
              <Text style={styles.caption}>User</Text>
            </View>
            
            <View style={styles.centered}>
              <Icon name={Icon.NAMES.SEARCH} size={24} color={colors.textSecondary} style={styles.icon} />
              <Text style={styles.caption}>Search</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.md,
    color: colors.textPrimary,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  button: {
    marginRight: spacing.md,
    marginBottom: spacing.sm,
  },
  card: {
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  cardContent: {
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  centered: {
    alignItems: 'center',
    marginRight: spacing.md,
    marginBottom: spacing.md,
  },
  avatar: {
    marginBottom: spacing.xs,
  },
  badge: {
    marginBottom: spacing.xs,
  },
  icon: {
    marginBottom: spacing.xs,
  },
  caption: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default ExampleScreen; 