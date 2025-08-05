import { supabase } from './supabaseClient';

// Create a new user profile
export const createUserProfile = async (profileData) => {
  console.log('🚀 Starting profile creation with:', profileData);
  
  try {
    const result = await supabase
      .from('Profiles')
      .insert(profileData)
      .select();
      
    console.log('🔍 Full result object:', result);
    console.log('🔍 Result.data:', result.data);
    console.log('🔍 Result.error:', result.error);
    
    if (result.error) {
      console.error('❌ Supabase returned error:', result.error);
      throw result.error;
    }
    
    console.log('✅ Profile created successfully:', result.data);
    return result.data;
    
  } catch (err) {
    console.error('❌ Caught exception:', err);
    console.error('❌ Exception type:', typeof err);
    console.error('❌ Exception details:', JSON.stringify(err, null, 2));
    throw err;
  }
};

// Get user profile by ID
export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('Profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error) {
    console.error('❌ Error fetching profile:', error);
    throw error;
  }
  
  return data;
};

// Update user profile
export const updateUserProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select();
    
  if (error) {
    console.error('❌ Error updating profile:', error);
    throw error;
  }
  
  return data;
};