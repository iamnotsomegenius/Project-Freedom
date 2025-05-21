import React from 'react';
import { useAuthModal } from '../../context/AuthModalContext';

const SplitAuthButton = ({ className = '', mobileView = false }) => {
  const { openAuthModal } = useAuthModal();
  
  const baseClasses = "flex rounded-md overflow-hidden shadow-sm";
  const containerClasses = mobileView 
    ? `${baseClasses} w-full ${className}` 
    : `${baseClasses} ${className}`;

  return (
    <div className={containerClasses}>
      <button
        type="button"
        onClick={() => openAuthModal({ mode: 'signin' })}
        className="px-4 py-2 bg-gray-800 border border-gray-700 hover:bg-gray-700 text-foreground text-sm font-medium flex-1"
      >
        Sign In
      </button>
      <span className="inline-block w-px bg-gray-700"></span>
      <button
        type="button"
        onClick={() => openAuthModal({ mode: 'signup' })}
        className="px-4 py-2 bg-secondary hover:bg-secondary/90 text-white text-sm font-medium flex-1"
      >
        Join
      </button>
    </div>
  );
};

export default SplitAuthButton;