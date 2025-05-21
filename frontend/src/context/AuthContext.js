import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  login as apiLogin, 
  register as apiRegister, 
  getCurrentUser,
  socialLogin as apiSocialLogin,
  sendPhoneVerificationCode,
  verifyPhoneCode
} from '../api/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verificationLevel, setVerificationLevel] = useState(0); // 0 = none, 1 = email/phone, 2 = basic KYC, 3 = enhanced, 4 = financial

  useEffect(() => {
    // Check if token exists and fetch user data
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }

    // Listen for logout events
    const handleLogout = () => {
      setUser(null);
      setVerificationLevel(0);
    };

    window.addEventListener('auth:logout', handleLogout);

    return () => {
      window.removeEventListener('auth:logout', handleLogout);
    };
  }, []);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const userData = await getCurrentUser();
      setUser(userData);
      
      // Set verification level based on user data
      // This would come from the backend in a real implementation
      updateVerificationLevel(userData);
      
      setError(null);
    } catch (err) {
      console.error('Failed to fetch user:', err);
      setError('Failed to authenticate user');
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };
  
  const updateVerificationLevel = (userData) => {
    // This would be based on the actual verification status in the user profile
    // For now, we'll set it to 1 (email/phone verified) by default when logged in
    const level = userData?.verification_level || 1;
    setVerificationLevel(level);
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await apiLogin(email, password);
      localStorage.setItem('token', response.access_token);
      await fetchUser();
      return { success: true };
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.response?.data?.detail || 'Failed to login');
      return { success: false, error: err.response?.data?.detail || 'Failed to login' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      await apiRegister(userData);
      // After registration, login the user
      const loginResponse = await apiLogin(userData.email, userData.password);
      localStorage.setItem('token', loginResponse.access_token);
      await fetchUser();
      return { success: true };
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.response?.data?.detail || 'Failed to register');
      return { success: false, error: err.response?.data?.detail || 'Failed to register' };
    } finally {
      setLoading(false);
    }
  };
  
  const socialLogin = async (provider) => {
    try {
      setLoading(true);
      // Call the social login API
      const response = await apiSocialLogin(provider);
      localStorage.setItem('token', response.access_token);
      await fetchUser();
      return { success: true };
    } catch (err) {
      console.error(`${provider} login failed:`, err);
      setError(err.response?.data?.detail || `Failed to login with ${provider}`);
      return { success: false, error: err.response?.data?.detail || `Failed to login with ${provider}` };
    } finally {
      setLoading(false);
    }
  };
  
  const sendVerificationCode = async (phoneNumber) => {
    try {
      setLoading(true);
      // Send verification code to phone number
      await sendPhoneVerificationCode(phoneNumber);
      return { success: true };
    } catch (err) {
      console.error('Failed to send verification code:', err);
      setError(err.response?.data?.detail || 'Failed to send verification code');
      return { success: false, error: err.response?.data?.detail || 'Failed to send verification code' };
    } finally {
      setLoading(false);
    }
  };
  
  const verifyPhone = async (phoneNumber, code) => {
    try {
      setLoading(true);
      // Verify phone with code
      const response = await verifyPhoneCode(phoneNumber, code);
      localStorage.setItem('token', response.access_token);
      await fetchUser();
      return { success: true };
    } catch (err) {
      console.error('Phone verification failed:', err);
      setError(err.response?.data?.detail || 'Failed to verify phone number');
      return { success: false, error: err.response?.data?.detail || 'Failed to verify phone number' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setVerificationLevel(0);
    window.dispatchEvent(new Event('auth:logout'));
  };

  const updateUserProfile = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }));
  };
  
  const upgradeVerification = async (level) => {
    // In a real implementation, this would trigger the appropriate verification process
    // For now, we'll just update the level if it's higher than the current one
    if (level > verificationLevel) {
      setVerificationLevel(level);
      // Update the user profile with the new verification level
      setUser((prev) => ({ ...prev, verification_level: level }));
      return { success: true };
    }
    return { success: false, error: 'Already at this verification level or higher' };
  };

  const value = {
    user,
    loading,
    error,
    verificationLevel,
    login,
    register,
    logout,
    socialLogin,
    sendVerificationCode,
    verifyPhone,
    updateUserProfile,
    upgradeVerification,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
