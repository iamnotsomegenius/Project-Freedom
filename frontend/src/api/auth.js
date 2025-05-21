import api from './axios';

export const login = async (email, password) => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    // Store the token in localStorage
    if (response.data && response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    const errorMessage = error.response?.data?.detail || 'Authentication failed';
    throw new Error(errorMessage);
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    const errorMessage = error.response?.data?.detail || 'Registration failed';
    throw new Error(errorMessage);
  }
};

export const socialLogin = async (provider) => {
  try {
    // For now, we'll simulate social login
    // In a real implementation, this would redirect to OAuth provider
    // or use a pop-up window for authentication
    console.log(`Social login with ${provider}`);
    
    // Simulate successful login for demo purposes
    // In production, this would make an API call to a social login endpoint
    const response = await api.post(`/api/auth/social-login/${provider}`);
    return response.data;
  } catch (error) {
    console.error(`${provider} login error:`, error);
    const errorMessage = error.response?.data?.detail || `${provider} authentication failed`;
    throw new Error(errorMessage);
  }
};

export const sendPhoneVerificationCode = async (phoneNumber) => {
  try {
    const response = await api.post('/api/auth/phone/send-code', { phone_number: phoneNumber });
    return response.data;
  } catch (error) {
    console.error('Send phone verification code error:', error);
    const errorMessage = error.response?.data?.detail || 'Failed to send verification code';
    throw new Error(errorMessage);
  }
};

export const verifyPhoneCode = async (phoneNumber, code) => {
  try {
    const response = await api.post('/api/auth/phone/verify-code', { 
      phone_number: phoneNumber, 
      code
    });
    return response.data;
  } catch (error) {
    console.error('Verify phone code error:', error);
    const errorMessage = error.response?.data?.detail || 'Invalid verification code';
    throw new Error(errorMessage);
  }
};

export const logout = () => {
  // Remove token from localStorage
  localStorage.removeItem('token');
  // Dispatch logout event
  window.dispatchEvent(new Event('auth:logout'));
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/api/auth/me');
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
    const errorMessage = error.response?.data?.detail || 'Profile update failed';
    throw new Error(errorMessage);
  }
};

export const completeOnboarding = async () => {
  try {
    const response = await api.put('/api/profiles/me/complete-onboarding');
    return response.data;
  } catch (error) {
    console.error('Complete onboarding error:', error);
    const errorMessage = error.response?.data?.detail || 'Onboarding completion failed';
    throw new Error(errorMessage);
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

export const uploadAvatar = async (file, progressCallback = null) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'avatars');
    formData.append('public', 'true');
    
    const response = await api.post('/api/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: progressCallback
        ? (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            progressCallback(percentCompleted);
          }
        : undefined,
    });
    
    return response.data;
  } catch (error) {
    console.error('Avatar upload error:', error);
    const errorMessage = error.response?.data?.detail || 'Avatar upload failed';
    throw new Error(errorMessage);
  }
};
