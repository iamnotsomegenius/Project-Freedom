import React from 'react';
import { formatCurrency, formatDate } from '../../utils/format';

const CampaignProgress = ({ campaign }) => {
  const progress = (campaign.raised_amount / campaign.target_amount) * 100 || 0;
  
  // Calculate days remaining
  const daysRemaining = () => {
    if (!campaign.end_date) return 'N/A';
    
    const endDate = new Date(campaign.end_date);
    const now = new Date();
    const diffTime = endDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? `${diffDays} days` : 'Ended';
  };
  
  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium">{Math.round(progress)}% Funded</span>
          <span>{formatCurrency(campaign.raised_amount)} of {formatCurrency(campaign.target_amount)}</span>
        </div>
        <div className="h-3 w-full bg-background rounded-full overflow-hidden">
          <div 
            className="h-full bg-secondary" 
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
      
      {/* Campaign Stats */}
      <div className="grid grid-cols-3 gap-4 pt-2">
        <div className="text-center">
          <p className="text-xs text-gray-400">Investors</p>
          <p className="font-semibold">{campaign.investor_count || 0}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-400">Time Left</p>
          <p className="font-semibold">{daysRemaining()}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-400">End Date</p>
          <p className="font-semibold">{campaign.end_date ? formatDate(campaign.end_date) : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default CampaignProgress;
