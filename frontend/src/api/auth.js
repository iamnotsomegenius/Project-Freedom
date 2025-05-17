import api from './axios';

export const login = async (email, password) => {
  const response = await api.post('/api/auth/login', { email, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/api/auth/register', userData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/api/profiles/me');
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await api.put('/api/profiles/me', profileData);
  return response.data;
};

export const completeOnboarding = async () => {
  const response = await api.put('/api/profiles/me/complete-onboarding');
  return response.data;
};

export const checkEmailExists = async (email) => {
  const response = await api.post('/api/auth/check-email', { email });
  return response.data;
};
