import api from './axios';

export const login = async (email, password) => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/api/profiles/me');
    return response.data;
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await api.put('/api/profiles/me', profileData);
    return response.data;
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};

export const completeOnboarding = async () => {
  try {
    const response = await api.put('/api/profiles/me/complete-onboarding');
    return response.data;
  } catch (error) {
    console.error('Complete onboarding error:', error);
    throw error;
  }
};

export const checkEmailExists = async (email) => {
  try {
    const response = await api.post('/api/auth/check-email', { email });
    return response.data;
  } catch (error) {
    console.error('Check email error:', error);
    throw error;
  }
};
