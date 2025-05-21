import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import {
  IdentificationIcon,
  DocumentCheckIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';

const VerificationUpgrade = () => {
  const { verificationLevel, upgradeVerification } = useAuth();
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [error, setError] = useState(null);
  
  // Determine next verification level to upgrade to
  const getNextLevel = () => {
    if (verificationLevel < 2) return 2;
    if (verificationLevel < 3) return 3;
    if (verificationLevel < 4) return 4;
    return null; // Fully verified
  };
  
  const getUpgradeDetails = () => {
    const nextLevel = getNextLevel();
    
    switch (nextLevel) {
      case 2:
        return {
          title: 'Verify Your Identity',
          description: 'Upgrade to unlock business teasers and more',
          icon: <IdentificationIcon className="h-6 w-6" />,
          buttonText: 'Upload ID Document',
        };
      case 3:
        return {
          title: 'Enhanced Verification',
          description: 'Unlock detailed business information',
          icon: <DocumentCheckIcon className="h-6 w-6" />,
          buttonText: 'Complete Background Check',
        };
      case 4:
        return {
          title: 'Financial Verification',
          description: 'Gain full access to investment opportunities',
          icon: <BanknotesIcon className="h-6 w-6" />,
          buttonText: 'Verify Financial Status',
        };
      default:
        return {
          title: 'Fully Verified',
          description: 'You have completed all verification steps',
          icon: null,
          buttonText: null,
        };
    }
  };
  
  const handleUpgrade = async () => {
    setIsUpgrading(true);
    setError(null);
    
    const nextLevel = getNextLevel();
    if (!nextLevel) return;
    
    try {
      // For demo purposes, we'll just simulate upgrading to the next level
      const result = await upgradeVerification(nextLevel);
      
      if (!result.success) {
        setError(result.error || 'Failed to upgrade verification level');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsUpgrading(false);
    }
  };
  
  const details = getUpgradeDetails();
  
  // If fully verified, don't show upgrade option
  if (!getNextLevel()) return null;
  
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      {error && (
        <div className="mb-4 p-3 bg-danger/10 border border-danger/30 rounded-md text-sm text-danger">
          {error}
        </div>
      )}
      
      <div className="flex items-center mb-3">
        <div className="mr-3 p-2 bg-secondary/10 rounded-full text-secondary">
          {details.icon}
        </div>
        <div>
          <h3 className="font-medium">{details.title}</h3>
          <p className="text-sm text-gray-400">{details.description}</p>
        </div>
      </div>
      
      {details.buttonText && (
        <Button
          variant="secondary"
          className="w-full"
          onClick={handleUpgrade}
          disabled={isUpgrading}
        >
          {isUpgrading ? 'Processing...' : details.buttonText}
        </Button>
      )}
    </div>
  );
};

export default VerificationUpgrade;