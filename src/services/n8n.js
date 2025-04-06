import { supabase } from './supabase';

// Replace with your actual n8n API endpoint
const N8N_API_URL = 'https://your-n8n-instance.com/api';

// Helper function to get the auth token for n8n requests
const getAuthToken = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token;
};

// Handles API calls to n8n with proper authentication
export const callN8nApi = async (endpoint, method = 'GET', data = null) => {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      throw new Error('Authentication required');
    }

    const url = `${N8N_API_URL}/${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    const options = {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    };

    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('n8n API error:', error);
    return {
      error: true,
      message: error.message || 'An error occurred with the API request',
    };
  }
};

// API functions for specific n8n workflows
export const n8nApi = {
  // Document processing workflow
  processDocument: async (documentData) => {
    return callN8nApi('documents/process', 'POST', documentData);
  },
  
  // AI advisor query workflow
  queryAdvisor: async (queryData) => {
    return callN8nApi('advisor/query', 'POST', queryData);
  },
  
  // Schedule notification workflow
  scheduleNotification: async (notificationData) => {
    return callN8nApi('notifications/schedule', 'POST', notificationData);
  }
}; 