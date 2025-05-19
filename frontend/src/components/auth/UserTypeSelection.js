import React, { useState } from 'react';
import { ShoppingBagIcon, ShoppingCartIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import Button from '../ui/Button';
import InvestorComplianceDisclaimer from './InvestorComplianceDisclaimer';

const UserTypeOption = ({ title, description, icon, onClick }) => {
  return (
    <div 
      className="bg-primary border border-gray-800 hover:border-secondary rounded-lg p-6 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center mb-3">
        <div className="mr-3 p-3 bg-secondary/10 rounded-full">
          {icon}
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
};

const UserTypeSelection = ({ onSelect }) => {
  const [showInvestorDisclaimer, setShowInvestorDisclaimer] = useState(false);
  
  const handleTypeSelection = (type) => {
    if (type === 'INVESTOR') {
      setShowInvestorDisclaimer(true);
    } else {
      onSelect(type);
    }
  };
  
  const handleDisclaimerAccept = () => {
    setShowInvestorDisclaimer(false);
    onSelect('INVESTOR');
  };
  
  const handleDisclaimerClose = () => {
    setShowInvestorDisclaimer(false);
  };
  
  if (showInvestorDisclaimer) {
    return (
      <InvestorComplianceDisclaimer 
        onAccept={handleDisclaimerAccept}
        onClose={handleDisclaimerClose}
      />
    );
  }
  
  return (
    <div>
      <p className="text-gray-400 mb-6">
        Choose how you'd like to use SeedSMB. This will customize your experience.
      </p>
      
      <div className="space-y-4">
        <UserTypeOption
          title="I'm a Seller"
          description="List your business for sale, receive offers, and connect with potential buyers and investors."
          icon={<ShoppingBagIcon className="h-6 w-6 text-secondary" />}
          onClick={() => handleTypeSelection('SELLER')}
        />
        
        <UserTypeOption
          title="I'm a Buyer"
          description="Browse business listings, make offers, and complete the acquisition process."
          icon={<ShoppingCartIcon className="h-6 w-6 text-secondary" />}
          onClick={() => handleTypeSelection('BUYER')}
        />
        
        <UserTypeOption
          title="I'm an Investor"
          description="Discover opportunities to invest in small businesses and build your portfolio."
          icon={<CurrencyDollarIcon className="h-6 w-6 text-secondary" />}
          onClick={() => handleTypeSelection('INVESTOR')}
        />
      </div>
    </div>
  );
};

export default UserTypeSelection;
