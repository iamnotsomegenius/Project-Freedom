import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getListing } from '../api/listings';
import { formatCurrency, calculateMultiple, formatTimeAgo } from '../utils/format';
import CampaignProgress from '../components/business/CampaignProgress';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useAuthModal } from '../context/AuthModalContext';
import {
  MapPinIcon,
  TagIcon,
  ChartBarIcon,
  BanknotesIcon,
  CalendarIcon,
  UsersIcon,
  CalculatorIcon,
} from '@heroicons/react/24/outline';

const MetricCard = ({ label, value, icon }) => (
  <div className="bg-background/20 p-4 rounded-lg">
    <div className="flex items-center mb-2">
      <div className="mr-2 text-secondary">{icon}</div>
      <h4 className="text-sm font-medium text-gray-400">{label}</h4>
    </div>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

const LoadingSkeleton = () => (
  <div className="container mx-auto px-4 py-8 animate-pulse">
    <div className="relative h-64 w-full rounded-lg overflow-hidden mb-6 bg-gray-800" />
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-primary rounded-lg p-6 mb-6">
          <div className="h-6 bg-gray-800 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-800 rounded w-full mb-2" />
          <div className="h-4 bg-gray-800 rounded w-full mb-2" />
          <div className="h-4 bg-gray-800 rounded w-3/4" />
        </div>
        
        <div className="bg-primary rounded-lg p-6 mb-6">
          <div className="h-6 bg-gray-800 rounded w-1/4 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded h-24" />
            ))}
          </div>
        </div>
      </div>
      
      <div className="lg:col-span-1">
        <div className="bg-primary rounded-lg p-6 mb-6">
          <div className="h-6 bg-gray-800 rounded w-1/2 mb-4" />
          <div className="h-4 bg-gray-800 rounded w-full mb-2" />
          <div className="h-10 bg-gray-800 rounded mb-4" />
          <div className="h-10 bg-gray-800 rounded" />
        </div>
      </div>
    </div>
  </div>
);

const BusinessDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { openAuthModal } = useAuthModal();
  const navigate = useNavigate();
  
  const { data: listing, isLoading, error } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => getListing(id),
  });
  
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  
  if (error || !listing) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Business Not Found</h2>
        <p className="text-gray-400 mb-6">The business listing you're looking for doesn't exist or has been removed.</p>
        <Button href="/marketplace">Return to Marketplace</Button>
      </div>
    );
  }
  
  const handleInvestClick = () => {
    if (!user) {
      openAuthModal({ returnUrl: `/marketplace/${id}/invest` });
      return;
    }
    
    // Check if user is an investor
    if (user.user_type !== 'INVESTOR') {
      // Show message that only investors can invest
      // In a real app, you might use a toast notification
      alert('Only investors can make investments. Please update your profile type to continue.');
      return;
    }
    
    navigate(`/marketplace/${id}/invest`);
  };
  
  const handleMakeOfferClick = () => {
    if (!user) {
      openAuthModal({ returnUrl: `/marketplace/${id}/make-offer` });
      return;
    }
    
    // Check if user is a buyer
    if (user.user_type !== 'BUYER') {
      // Show message that only buyers can make offers
      alert('Only buyers can make offers. Please update your profile type to continue.');
      return;
    }
    
    navigate(`/marketplace/${id}/make-offer`);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="relative h-64 w-full rounded-lg overflow-hidden mb-6">
        <img
          src={listing.cover_image_url || 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643'}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <h1 className="text-3xl font-bold text-foreground">{listing.title}</h1>
          <div className="flex items-center mt-2">
            <span className="bg-secondary/20 text-secondary text-xs px-2 py-1 rounded-full mr-2">
              {listing.industry}
            </span>
            <div className="flex items-center text-sm">
              <MapPinIcon className="h-4 w-4 mr-1" />
              <span>{listing.location}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Business details */}
        <div className="lg:col-span-2">
          <div className="bg-primary rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Business Overview</h2>
            <p className="text-gray-300">{listing.description || 'No description provided.'}</p>
          </div>
          
          <div className="bg-primary rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <MetricCard
                label="Annual Revenue"
                value={formatCurrency(listing.annual_revenue)}
                icon={<ChartBarIcon className="h-5 w-5" />}
              />
              <MetricCard
                label="Annual Profit"
                value={formatCurrency(listing.annual_profit)}
                icon={<BanknotesIcon className="h-5 w-5" />}
              />
              <MetricCard
                label="Asking Price"
                value={formatCurrency(listing.asking_price)}
                icon={<TagIcon className="h-5 w-5" />}
              />
              <MetricCard
                label="Years in Business"
                value={listing.years_in_business || 'N/A'}
                icon={<CalendarIcon className="h-5 w-5" />}
              />
              <MetricCard
                label="Employees"
                value={listing.employees_count || 'N/A'}
                icon={<UsersIcon className="h-5 w-5" />}
              />
              <MetricCard
                label="Multiple"
                value={calculateMultiple(listing.asking_price, listing.annual_profit)}
                icon={<CalculatorIcon className="h-5 w-5" />}
              />
            </div>
          </div>
          
          <div className="bg-primary rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Seller's Notes</h2>
            <div className="bg-background/20 rounded p-4">
              <h3 className="font-medium mb-2">Reason for Selling</h3>
              <p className="text-gray-300">{listing.reason_for_selling || 'Not provided'}</p>
            </div>
          </div>
        </div>
        
        {/* Right column - Actions and funding */}
        <div className="lg:col-span-1">
          <div className="bg-primary rounded-lg p-6 mb-6 sticky top-24">
            {listing.funding_target > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Funding Progress</h3>
                <CampaignProgress campaign={{
                  raised_amount: listing.funding_raised || 0,
                  target_amount: listing.funding_target,
                  investor_count: listing.investor_count || 0,
                  end_date: listing.funding_end_date
                }} />
              </div>
            )}
            
            <div className="space-y-4">
              {user?.user_type === 'INVESTOR' && listing.funding_target > 0 && (
                <Button 
                  className="w-full bg-secondary hover:bg-secondary/90 text-background"
                  onClick={handleInvestClick}
                >
                  Invest Now
                </Button>
              )}
              
              {user?.user_type === 'BUYER' && !listing.under_loi && (
                <Button 
                  className="w-full bg-secondary hover:bg-secondary/90 text-background"
                  onClick={handleMakeOfferClick}
                >
                  Make Offer
                </Button>
              )}
              
              {!user && (
                <>
                  <Button 
                    className="w-full bg-secondary hover:bg-secondary/90 text-background"
                    onClick={() => openAuthModal({ returnUrl: `/marketplace/${id}` })}
                  >
                    Sign Up to Invest or Make Offer
                  </Button>
                  <p className="text-xs text-center text-gray-400">
                    Create an account to access full details and take action
                  </p>
                </>
              )}
              
              <Button variant="outline" className="w-full">
                Ask a Question
              </Button>
              
              <Button variant="ghost" className="w-full">
                Share Listing
              </Button>
              
              {listing.under_loi && (
                <div className="mt-2 p-3 bg-warning/10 border border-warning/30 rounded-md">
                  <p className="text-warning text-sm font-medium">
                    This business is currently under a letter of intent
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-800">
              <p className="text-xs text-gray-400">
                Listed {formatTimeAgo(listing.created_at)} • ID: {listing.id.substring(0, 8)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailPage;
