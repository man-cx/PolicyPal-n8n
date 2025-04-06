import { getAuthToken } from './api';

// n8n API base URL
// In a real app, this would be an environment variable
const N8N_API_BASE_URL = 'https://n8n.policypal.example/api/v1';

/**
 * Base n8n API request function with error handling and authentication
 */
export const n8nRequest = async (
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any
): Promise<any> => {
  try {
    // Build the request URL
    const url = `${N8N_API_BASE_URL}${endpoint}`;

    // Build the request headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add authentication token
    const token = await getAuthToken();
    if (token) {
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
      throw new Error(data.message || 'n8n API request failed');
    }

    return data;
  } catch (error) {
    console.error(`n8n API request failed: ${endpoint}`, error);
    throw error;
  }
};

/**
 * n8n service with methods for common operations
 */
export const n8nService = {
  // Trigger a workflow
  triggerWorkflow: async (workflowId: string, data: any) => {
    return n8nRequest(`/workflows/${workflowId}/trigger`, 'POST', data);
  },

  // Policy expiration notification workflow
  notifyPolicyExpiration: async (policyData: any) => {
    return n8nService.triggerWorkflow('policy-expiration-notification', policyData);
  },

  // Policy renewal reminder workflow
  sendRenewalReminder: async (policyData: any) => {
    return n8nService.triggerWorkflow('policy-renewal-reminder', policyData);
  },

  // New user onboarding workflow
  startUserOnboarding: async (userData: any) => {
    return n8nService.triggerWorkflow('user-onboarding', userData);
  },

  // Policy document processing workflow
  processDocument: async (documentData: any) => {
    return n8nService.triggerWorkflow('document-processing', documentData);
  },

  // Policy sharing notification workflow
  notifyPolicySharing: async (sharingData: any) => {
    return n8nService.triggerWorkflow('policy-sharing-notification', sharingData);
  },

  // Policy update notification workflow
  notifyPolicyUpdate: async (updateData: any) => {
    return n8nService.triggerWorkflow('policy-update-notification', updateData);
  },

  // Account activity summary workflow
  generateActivitySummary: async (userId: string) => {
    return n8nService.triggerWorkflow('activity-summary', { userId });
  },
}; 