import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';

// Supabase configuration
// In a real app, these would be environment variables
const SUPABASE_URL = 'https://your-supabase-url.supabase.co';
const SUPABASE_ANON_KEY = 'your-supabase-anon-key';

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

/**
 * User-related operations
 */
export const userService = {
  // Sign up a new user
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  // Sign in a user
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  // Sign out the current user
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get the current user
  getCurrentUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  },

  // Get the current session
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  // Send a password reset email
  resetPassword: async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'policypal://reset-password',
    });
    if (error) throw error;
  },

  // Update user profile
  updateProfile: async (userId: string, userData: any) => {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: userId, ...userData })
      .select();
    if (error) throw error;
    return data;
  },

  // Get user profile
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) throw error;
    return data;
  },
};

/**
 * Policy-related operations
 */
export const policyService = {
  // Get all policies for a user
  getAllPolicies: async (userId: string) => {
    const { data, error } = await supabase
      .from('policies')
      .select('*')
      .eq('user_id', userId);
    if (error) throw error;
    return data;
  },

  // Get a single policy by ID
  getPolicyById: async (policyId: string) => {
    const { data, error } = await supabase
      .from('policies')
      .select('*')
      .eq('id', policyId)
      .single();
    if (error) throw error;
    return data;
  },

  // Create a new policy
  createPolicy: async (policyData: any) => {
    const { data, error } = await supabase
      .from('policies')
      .insert([policyData])
      .select();
    if (error) throw error;
    return data[0];
  },

  // Update an existing policy
  updatePolicy: async (policyId: string, policyData: any) => {
    const { data, error } = await supabase
      .from('policies')
      .update(policyData)
      .eq('id', policyId)
      .select();
    if (error) throw error;
    return data[0];
  },

  // Delete a policy
  deletePolicy: async (policyId: string) => {
    const { error } = await supabase
      .from('policies')
      .delete()
      .eq('id', policyId);
    if (error) throw error;
  },

  // Search policies by query
  searchPolicies: async (userId: string, query: string) => {
    const { data, error } = await supabase
      .from('policies')
      .select('*')
      .eq('user_id', userId)
      .or(`title.ilike.%${query}%,policy_number.ilike.%${query}%,insurer.ilike.%${query}%`);
    if (error) throw error;
    return data;
  },
};

/**
 * Document-related operations
 */
export const documentService = {
  // Upload a document to storage
  uploadDocument: async (file: any, path: string) => {
    const { data, error } = await supabase.storage
      .from('documents')
      .upload(path, file);
    if (error) throw error;
    return data;
  },

  // Get a document URL
  getDocumentUrl: async (path: string) => {
    const { data } = supabase.storage.from('documents').getPublicUrl(path);
    return data.publicUrl;
  },

  // Delete a document from storage
  deleteDocument: async (path: string) => {
    const { error } = await supabase.storage.from('documents').remove([path]);
    if (error) throw error;
  },

  // Save document metadata to database
  saveDocumentMetadata: async (metadata: any) => {
    const { data, error } = await supabase
      .from('documents')
      .insert([metadata])
      .select();
    if (error) throw error;
    return data[0];
  },

  // Get all documents for a policy
  getPolicyDocuments: async (policyId: string) => {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('policy_id', policyId);
    if (error) throw error;
    return data;
  },
};

/**
 * Sharing-related operations
 */
export const sharingService = {
  // Share a policy with another user
  sharePolicy: async (sharingData: any) => {
    const { data, error } = await supabase
      .from('policy_sharing')
      .insert([sharingData])
      .select();
    if (error) throw error;
    return data[0];
  },

  // Get policies shared by the user
  getSharedByMe: async (userId: string) => {
    const { data, error } = await supabase
      .from('policy_sharing')
      .select('*, policies(*)')
      .eq('user_id', userId);
    if (error) throw error;
    return data;
  },

  // Get policies shared with the user
  getSharedWithMe: async (userId: string) => {
    const { data, error } = await supabase
      .from('policy_sharing')
      .select('*, policies(*)')
      .eq('shared_with', userId);
    if (error) throw error;
    return data;
  },

  // Revoke access to a shared policy
  revokeAccess: async (sharingId: string) => {
    const { error } = await supabase
      .from('policy_sharing')
      .delete()
      .eq('id', sharingId);
    if (error) throw error;
  },
}; 