import React, { useState } from 'react';
import Button from '../ui/Button';

const InvestorComplianceDisclaimer = ({ onAccept, onClose }) => {
  const [isChecked, setIsChecked] = useState(false);
  
  return (
    <div className="p-6 bg-primary rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Investor Compliance Disclosure</h2>
      
      <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-medium mb-2 text-warning">Investment Risk Disclosure</h3>
        <p className="text-gray-300 text-sm mb-2">
          Investing in private companies through SeedSMB involves substantial risk, including the possible loss of your entire investment. 
          These investments are highly illiquid with no secondary market and should only represent a small portion of your overall investment portfolio.
        </p>
        <p className="text-gray-300 text-sm">
          Past performance is not indicative of future results. Diversification does not ensure a profit or guarantee against loss.
        </p>
      </div>
      
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-medium">Before proceeding, please acknowledge:</h3>
        
        <div className="bg-primary border border-gray-800 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Regulatory Framework</h4>
          <p className="text-gray-400 text-sm mb-2">
            SeedSMB operates under Regulation Crowdfunding (Reg CF), which allows eligible companies to raise up to $5 million
            annually through SEC-registered platforms.
          </p>
          <p className="text-gray-400 text-sm">
            As a non-accredited investor (if applicable), your investment is subject to annual limits based on your income and net worth
            as established by the SEC.
          </p>
        </div>
        
        <div className="bg-primary border border-gray-800 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Fund Handling</h4>
          <p className="text-gray-400 text-sm">
            SeedSMB does not directly hold your funds. All investments are processed through a qualified third-party escrow agent 
            in compliance with SEC regulations. Funds are only released to the issuer when the offering's funding goal is met and 
            all regulatory requirements are satisfied.
          </p>
        </div>
        
        <div className="bg-primary border border-gray-800 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Legal Status</h4>
          <p className="text-gray-400 text-sm">
            SeedSMB is not a broker-dealer, funding portal, or investment advisor. We recommend consulting with a financial professional
            before making investment decisions.
          </p>
        </div>
      </div>
      
      <div className="flex items-start mb-6">
        <input 
          type="checkbox" 
          id="compliance-checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          className="mt-1 mr-3"
        />
        <label htmlFor="compliance-checkbox" className="text-sm text-gray-300">
          I acknowledge that I have read and understand the investment risks and regulatory disclosures. 
          I understand that SeedSMB is not a broker-dealer or investment advisor, and that investments 
          made through this platform are subject to high risk and potential loss of principal. I also 
          acknowledge that I must independently assess each investment opportunity and my own financial situation.
        </label>
      </div>
      
      <div className="flex justify-end space-x-4">
        <Button 
          variant="outline" 
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button 
          disabled={!isChecked}
          onClick={onAccept}
        >
          Accept & Continue
        </Button>
      </div>
    </div>
  );
};

export default InvestorComplianceDisclaimer;
