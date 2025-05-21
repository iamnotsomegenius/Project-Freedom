import React, { createContext, useContext, useState } from 'react';

const AuthModalContext = createContext();

export function AuthModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const [returnUrl, setReturnUrl] = useState(null);

  const openAuthModal = ({ mode: modalMode = 'signup', returnUrl: url = null } = {}) => {
    setMode(modalMode);
    setReturnUrl(url);
    setIsOpen(true);
  };

  const closeAuthModal = () => {
    setIsOpen(false);
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
  };

  const value = {
    isOpen,
    mode,
    returnUrl,
    openAuthModal,
    closeAuthModal,
    switchMode,
  };

  return (
    <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
}
