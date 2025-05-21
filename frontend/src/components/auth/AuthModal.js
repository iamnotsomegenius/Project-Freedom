import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Modal from '../ui/Modal';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import UserTypeSelection from './UserTypeSelection';
import RoleSpecificQuestions from './RoleSpecificQuestions';
import { useAuthModal } from '../../context/AuthModalContext';
import { useAuth } from '../../context/AuthContext';

const AuthModal = () => {
  const { isOpen, closeAuthModal, mode: initialMode, returnUrl } = useAuthModal();
  const { updateUserProfile } = useAuth();
  const navigate = useNavigate();
  
  const [mode, setMode] = useState(initialMode);
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState(null);
  
  // Reset state when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setStep(1);
      setUserType(null);
    }
  }, [isOpen, initialMode]);
  
  const handleAuthSuccess = () => {
    if (mode === 'signin') {
      handleClose();
    } else {
      setStep(2);
    }
  };
  
  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setStep(3);
    
    // Update user profile with selected type
    updateUserProfile({ user_type: type });
  };
  
  const handleOnboardingComplete = () => {
    handleClose();
  };
  
  const handleClose = () => {
    closeAuthModal();
    if (returnUrl) {
      navigate(returnUrl);
    }
  };
  
  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setStep(1);
  };
  
  const renderContent = () => {
    // Step 1: Sign in or Sign up form
    if (step === 1) {
      return mode === 'signin' ? (
        <SignInForm onSuccess={handleAuthSuccess} switchMode={switchMode} />
      ) : (
        <SignUpForm onSuccess={handleAuthSuccess} switchMode={switchMode} />
      );
    }
    
    // Step 2: User type selection
    if (step === 2) {
      return (
        <UserTypeSelection onSelect={handleUserTypeSelect} />
      );
    }
    
    // Step 3: Role-specific questions
    if (step === 3) {
      return (
        <RoleSpecificQuestions 
          userType={userType} 
          onComplete={handleOnboardingComplete}
        />
      );
    }
  };
  
  // Determine the title text based on step and mode
  const getTitleText = () => {
    if (step === 1) {
      if (mode === 'signin') {
        return 'Welcome Back';
      } else {
        return 'Join SeedSMB';
      }
    } else if (step === 2) {
      return 'Select Your Role';
    } else {
      return 'Complete Your Profile';
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={closeAuthModal}>
      <div className="relative">
        <button
          className="absolute top-0 right-0 text-gray-400 hover:text-foreground"
          onClick={closeAuthModal}
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
        
        <h2 className="text-xl font-semibold mb-6 text-foreground">
          {getTitleText()}
        </h2>
        
        {renderContent()}
      </div>
    </Modal>
  );
};

export default AuthModal;
