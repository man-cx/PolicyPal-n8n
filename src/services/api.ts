import AsyncStorage from '@react-native-async-storage/async-storage';

// API base URL
const API_BASE_URL = 'https://api.policypal.example';

// Storage key for the auth token
const AUTH_TOKEN_KEY = '@auth_token';

/**
 * Get the authentication token from storage
 */
export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Failed to get auth token', error);
    return null;
  }
};

/**
 * Set the authentication token in storage
 */
export const setAuthToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch (error) {
    console.error('Failed to save auth token', error);
  }
};

/**
 * Clear the authentication token from storage
 */
export const clearAuthToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Failed to clear auth token', error);
  }
};

/**
 * Base API request function with error handling and authentication
 */
export const apiRequest = async (
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any,
  requiresAuth: boolean = true
): Promise<any> => {
  try {
    // Build the request URL
    const url = `${API_BASE_URL}${endpoint}`;

    // Build the request headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add authentication token if required
    if (requiresAuth) {
      const token = await getAuthToken();
      if (!token) {
        throw new Error('Authentication required');
      }
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Build the request options
    const options: RequestInit = {
      method,
      headers,
    };

    // Add request body for POST and PUT requests
    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(body);
    }

    // Make the request
    const response = await fetch(url, options);

    // Parse the response
    const data = await response.json();

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
};

/**
 * API service with methods for common operations
 */
export const apiService = {
  // Auth endpoints
  auth: {
    login: (email: string, password: string) =>
      apiRequest('/auth/login', 'POST', { email, password }, false),
    register: (email: string, password: string, fullName?: string) =>
      apiRequest('/auth/register', 'POST', { email, password, fullName }, false),
    verifyEmail: (code: string) =>
      apiRequest('/auth/verify', 'POST', { code }),
    forgotPassword: (email: string) =>
      apiRequest('/auth/forgot-password', 'POST', { email }, false),
    resetPassword: (token: string, newPassword: string) =>
      apiRequest('/auth/reset-password', 'POST', { token, newPassword }, false),
  },

  // User endpoints
  user: {
    getProfile: () => apiRequest('/user/profile'),
    updateProfile: (userData: any) =>
      apiRequest('/user/profile', 'PUT', userData),
    changePassword: (currentPassword: string, newPassword: string) =>
      apiRequest('/user/change-password', 'POST', { currentPassword, newPassword }),
  },

  // Policy endpoints
  policies: {
    getAll: () => apiRequest('/policies'),
    getById: (id: string) => apiRequest(`/policies/${id}`),
    create: (policyData: any) => apiRequest('/policies', 'POST', policyData),
    update: (id: string, policyData: any) => apiRequest(`/policies/${id}`, 'PUT', policyData),
    delete: (id: string) => apiRequest(`/policies/${id}`, 'DELETE'),
    search: (query: string) => apiRequest(`/policies/search?q=${encodeURIComponent(query)}`),
  },

  // Document endpoints
  documents: {
    getAll: () => apiRequest('/documents'),
    getById: (id: string) => apiRequest(`/documents/${id}`),
    upload: (documentData: any) => apiRequest('/documents', 'POST', documentData),
    delete: (id: string) => apiRequest(`/documents/${id}`, 'DELETE'),
  },

  // Sharing endpoints
  sharing: {
    sharePolicy: (policyId: string, email: string, permissionLevel: string) =>
      apiRequest('/sharing', 'POST', { policyId, email, permissionLevel }),
    getSharedByMe: () => apiRequest('/sharing/by-me'),
    getSharedWithMe: () => apiRequest('/sharing/with-me'),
    getActivityLog: () => apiRequest('/sharing/activity'),
    revokeAccess: (sharingId: string) => apiRequest(`/sharing/${sharingId}`, 'DELETE'),
  },

  // AI Advisor endpoints
  advisor: {
    askQuestion: (question: string) => apiRequest('/advisor/ask', 'POST', { question }),
    provideFeedback: (responseId: string, helpful: boolean, feedback?: string) =>
      apiRequest('/advisor/feedback', 'POST', { responseId, helpful, feedback }),
  },
}; 