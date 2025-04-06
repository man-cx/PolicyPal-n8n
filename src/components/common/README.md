# UI Component Library

This folder contains reusable UI components for the PolicyPal app. These components are designed to be modular, customizable, and follow our design system guidelines.

## Available Components

### Avatar
A component to display user avatars with support for images or text initials.
```jsx
<Avatar
  source={{ uri: 'https://example.com/avatar.jpg' }}
  size="medium"
/>

<Avatar
  name="John Doe"
  size="large"
  backgroundColor="blue"
/>
```

### Badge
A component to display small counts, status indicators or labels.
```jsx
<Badge value="5" />
<Badge value="New" variant="success" />
<Badge value="Warning" variant="warning" outlined />
```

### Button
A customizable button component with multiple variants and states.
```jsx
<Button 
  title="Submit" 
  onPress={handleSubmit}
/>

<Button 
  title="Cancel" 
  variant="outlined" 
  onPress={handleCancel}
/>

<Button 
  title="Loading" 
  loading
  onPress={handleAction}
/>
```

### Card
A container component for grouping related content.
```jsx
<Card>
  <Text>Simple card content</Text>
</Card>

<Card variant="elevated" onPress={handleCardPress}>
  <Card.Header>
    <Text style={styles.title}>Card Title</Text>
  </Card.Header>
  <Card.Divider />
  <Text>Card content</Text>
  <Card.Footer>
    <Button title="Action" variant="text" />
  </Card.Footer>
</Card>
```

### Header
A component for screen headers with customizable left and right components.
```jsx
<Header 
  title="Screen Title" 
  showBackButton 
  onBackPress={goBack} 
/>

<Header 
  title="Profile" 
  subtitle="Edit your information"
  rightComponent={<Button title="Save" variant="text" onPress={save} />} 
/>
```

### Icon
A wrapper component for vector icons.
```jsx
<Icon name={Icon.NAMES.HOME} size={24} />
<Icon name="star" family="fontawesome" color="gold" />
<Icon name={Icon.NAMES.SETTINGS} onPress={openSettings} />
```

### Input
A text input component with support for labels, errors, and different states.
```jsx
<Input
  label="Username"
  placeholder="Enter your username"
  onChangeText={setText}
  value={text}
/>

<Input
  label="Bio"
  placeholder="Tell us about yourself"
  multiline
  numberOfLines={3}
  error={bioError}
/>
```

## Usage Example

To use these components, import them from the common folder:

```jsx
import { Button, Card, Input, Avatar } from '../components/common';

const MyScreen = () => {
  return (
    <View>
      <Avatar name="John Doe" size="medium" />
      <Card>
        <Input label="Name" placeholder="Enter your name" />
        <Button title="Submit" onPress={handleSubmit} />
      </Card>
    </View>
  );
};
```

## Design System

These components use the design tokens defined in `src/styles/theme.js` to maintain consistent styling across the app. Always import colors, spacing, and other design tokens from the theme file instead of using hardcoded values.

```jsx
import { colors, spacing, typography } from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    backgroundColor: colors.backgroundLight,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  }
});
``` 