// Theme context types
interface ThemeContextType {
  theme: ThemeType;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
}

interface ThemeType {
  colors: {
    primary: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    neutral: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    background: {
      light: string;
      dark: string;
      muted: string;
    };
    status: {
      success: string;
      error: string;
      warning: string;
      info: string;
    };
    text: {
      primary: string;
      secondary: string;
      dark: string;
      light: string;
      muted: string;
    };
    border: {
      light: string;
      dark: string;
    };
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  fontSizes: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
}

// Policy types
interface Policy {
  id: string;
  title: string;
  policyNumber: string;
  status: 'active' | 'expired' | 'pending';
  type: 'health' | 'auto' | 'home' | 'life' | 'travel';
  issueDate: string;
  expirationDate: string;
  coverageAmount: number;
  premium: number;
  documents: Document[];
  insurer: string;
}

interface Document {
  id: string;
  title: string;
  fileName: string;
  url: string;
  uploadDate: string;
  type: 'policy' | 'receipt' | 'claim' | 'other';
}

// User profile types
interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  birthDate?: string;
  policies: Policy[];
}

// Navigation types
type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  PolicyDetails: { policyId: string };
  Document: { documentId: string };
}; 