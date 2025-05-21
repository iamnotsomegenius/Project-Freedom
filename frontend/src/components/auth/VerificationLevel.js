import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  CheckCircleIcon, 
  ShieldCheckIcon, 
  IdentificationIcon, 
  DocumentCheckIcon, 
  BanknotesIcon
} from '@heroicons/react/24/outline';

const VerificationLevel = ({ className = '', showDetails = false }) => {
  const { verificationLevel } = useAuth();
  
  const levels = [
    {
      id: 1,
      name: 'Basic',
      description: 'Email & Phone verified',
      icon: <CheckCircleIcon className="h-5 w-5" />,
    },
    {
      id: 2,
      name: 'Identity',
      description: 'Government ID verified',
      icon: <IdentificationIcon className="h-5 w-5" />,
    },
    {
      id: 3,
      name: 'Enhanced',
      description: 'Address & background verified',
      icon: <ShieldCheckIcon className="h-5 w-5" />,
    },
    {
      id: 4,
      name: 'Financial',
      description: 'Financial verification complete',
      icon: <BanknotesIcon className="h-5 w-5" />,
    },
  ];

  // Simple badge display
  if (!showDetails) {
    return (
      <div className={`flex items-center space-x-1 text-xs rounded px-2 py-1 ${className}`}>
        <ShieldCheckIcon className="h-3.5 w-3.5" />
        <span>Level {verificationLevel}</span>
      </div>
    );
  }

  // Detailed display with all verification levels
  return (
    <div className={`${className}`}>
      <h3 className="text-sm font-medium mb-2">Verification Level</h3>
      <div className="space-y-2">
        {levels.map((level) => (
          <div 
            key={level.id}
            className={`flex items-center p-2 rounded-md ${
              verificationLevel >= level.id 
                ? 'bg-secondary/20 text-secondary' 
                : 'bg-gray-800 text-gray-400'
            }`}
          >
            <div className={`mr-3 p-1.5 rounded-full ${
              verificationLevel >= level.id ? 'bg-secondary/20' : 'bg-gray-700'
            }`}>
              {level.icon}
            </div>
            <div>
              <div className="font-medium text-sm">{level.name}</div>
              <div className="text-xs opacity-80">{level.description}</div>
            </div>
            {verificationLevel >= level.id && (
              <CheckCircleIcon className="h-5 w-5 ml-auto text-secondary" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerificationLevel;