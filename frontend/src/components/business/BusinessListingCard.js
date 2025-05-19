import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon, TagIcon } from '@heroicons/react/24/outline';
import { formatCurrency, calculateMultiple } from '../../utils/format';
import { useAuth } from '../../context/AuthContext';
import { useAuthModal } from '../../context/AuthModalContext';
import Button from '../ui/Button';

const MetricItem = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-400">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const BusinessListingCard = ({ listing }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { openAuthModal } = useAuthModal();
  
  const handleInteraction = (action, requiresAuth = true) => {
    if (requiresAuth && !user) {
      openAuthModal({ returnUrl: `/marketplace/${listing.id}` });
      return;
    }
    
    if (action === 'view') {
      navigate(`/marketplace/${listing.id}`);
    }
  };
  
  const progress = (listing.funding_raised / listing.funding_target) * 100 || 0;
  
  return (
    <div className="bg-primary rounded-lg overflow-hidden border border-gray-800 hover:border-secondary transition h-full flex flex-col">
      {/* Cover Image */}
      <div className="h-40 w-full relative">
        <img
          src={listing.cover_image_url || 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'}
          alt={listing.title}
          className="h-full w-full object-cover"
        />
        {listing.under_loi && (
          <div className="absolute top-2 right-2 bg-warning/90 text-xs font-medium px-2 py-1 rounded-full">
            Under LOI
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-foreground truncate">
            {listing.title}
          </h3>
          {listing.under_loi && (
            <span className="inline-flex ml-2 h-4 w-4 rounded-full bg-warning"></span>
          )}
        </div>
        
        <div className="mt-2 flex items-center text-sm text-gray-400">
          <MapPinIcon className="h-4 w-4 mr-1" />
          <span>{listing.location}</span>
          <TagIcon className="h-4 w-4 ml-3 mr-1" />
          <span>{listing.industry}</span>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2">
          <MetricItem 
            label="Revenue" 
            value={formatCurrency(listing.annual_revenue)} 
          />
          <MetricItem 
            label="EBITDA" 
            value={formatCurrency(listing.annual_profit)} 
          />
          <MetricItem 
            label="Asking Price" 
            value={formatCurrency(listing.asking_price)} 
          />
          <MetricItem 
            label="Multiple" 
            value={calculateMultiple(listing.asking_price, listing.annual_profit)} 
          />
        </div>
      </div>
      
      {/* View Details Button - Always at the same position */}
      <div className="mt-auto">
        <div className="border-t border-gray-800 p-4">
          <Button 
            onClick={() => handleInteraction('view', false)} 
            className="w-full bg-secondary hover:bg-secondary/90 text-background"
          >
            View Details
          </Button>
        </div>
        
        {/* Funding Progress Bar or Empty Space */}
        <div className="px-4 pb-4 h-[3.75rem]">
          {listing.funding_target > 0 ? (
            <>
              <div className="flex justify-between text-xs mb-1">
                <span>Funding Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-secondary" 
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>{formatCurrency(listing.funding_raised)}</span>
                <span>{formatCurrency(listing.funding_target)}</span>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BusinessListingCard;
