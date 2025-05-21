import React from 'react';
import { useAuthModal } from '../../context/AuthModalContext';

const SplitAuthButton = ({ className = '', mobileView = false }) => {
  const { openAuthModal } = useAuthModal();
  
  // Use the same styling as the Button component but for a split button
  const baseClasses = "inline-flex rounded-md overflow-hidden shadow-sm font-medium transition-colors duration-200 focus:outline-none";
  
  // Size classes match the Button component's 'md' size
  const sizeClasses = "text-sm";
  
  const containerClasses = mobileView 
    ? `${baseClasses} ${sizeClasses} w-full ${className}` 
    : `${baseClasses} ${sizeClasses} ${className}`;

  return (
    <div className={containerClasses}>
      <button
        type="button"
        onClick={() => openAuthModal({ mode: 'signin' })}
        className="px-4 py-2 border border-secondary text-secondary hover:bg-secondary/10"
      >
        Log In
      </button>
      <button
        type="button"
        onClick={() => openAuthModal({ mode: 'signup' })}
        className="px-4 py-2 bg-secondary text-background hover:bg-secondary/90"
      >
        Join
      </button>
    </div>
  );
};

export default SplitAuthButton;