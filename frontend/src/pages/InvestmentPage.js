import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { getListing } from '../api/listings';
import { createInvestment } from '../api/investments';
import { formatCurrency } from '../utils/format';
import Button from '../components/ui/Button';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const InvestmentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(1000);
  const [agreed, setAgreed] = useState(false);
  
  const { data: listing, isLoading: isLoadingListing } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => getListing(id),
  });
  
  const investMutation = useMutation({
    mutationFn: createInvestment,
    onSuccess: () => {
      toast.success('Investment successful!');
      navigate(`/marketplace/${id}/investment-confirmation`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || 'Failed to complete investment');
    },
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    investMutation.mutate({
      business_id: id,
      amount: amount
    });
  };
  
  // Business summary card
  const BusinessSummaryCard = ({ listing }) => {
    if (!listing) return null;
    
    return (
      <div className="rounded-lg border border-gray-800 overflow-hidden">
        <div className="p-4">
          <h4 className="font-medium text-lg mb-1">{listing.title}</h4>
          <div className="text-sm text-gray-400 mb-3 flex items-center">
            <span className="mr-2">{listing.industry}</span>
            <span>•</span>
            <span className="ml-2">{listing.location}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Annual Revenue:</span>
            <span>{formatCurrency(listing.annual_revenue)}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Annual Profit:</span>
            <span>{formatCurrency(listing.annual_profit)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Target Funding:</span>
            <span>{formatCurrency(listing.funding_target)}</span>
          </div>
        </div>
      </div>
    );
  };
  
  if (isLoadingListing) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-800 rounded w-1/3 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-primary rounded-lg p-6 h-80" />
            <div className="bg-primary rounded-lg p-6 h-80" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
        <h2 className="text-2xl font-bold mb-4">Business Not Found</h2>
        <p className="text-gray-400 mb-6">The business listing you're looking for doesn't exist or has been removed.</p>
        <Button href="/marketplace">Return to Marketplace</Button>
      </div>
    );
  }
  
  // Check if listing has funding enabled
  if (!listing.funding_target) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
        <h2 className="text-2xl font-bold mb-4">Not Available for Investment</h2>
        <p className="text-gray-400 mb-6">This business is not currently open for investments.</p>
        <Button href={`/marketplace/${id}`}>Return to Business</Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Invest in {listing.title}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-primary rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Investment Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Investment Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  <input
                    type="number"
                    className="w-full bg-background text-foreground rounded-md p-3 pl-8 border border-gray-800"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min="100"
                    step="100"
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setAmount(1000)}
                  >
                    $1,000
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setAmount(5000)}
                  >
                    $5,000
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setAmount(10000)}
                  >
                    $10,000
                  </Button>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-start">
                  <input 
                    id="terms" 
                    type="checkbox"
                    checked={agreed} 
                    onChange={(e) => setAgreed(e.target.checked)} 
                    className="mt-1 mr-2" 
                  />
                  <label htmlFor="terms" className="text-sm text-gray-300">
                    I have read and agree to the investment terms, risks disclosure, and 
                    understand that investments in private businesses carry significant risk
                    including the loss of principal.
                  </label>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary/90 text-background"
                disabled={!agreed || investMutation.isLoading || amount < 100}
              >
                {investMutation.isLoading ? "Processing..." : `Confirm ${formatCurrency(amount)} Investment`}
              </Button>
            </form>
          </div>
          
          <div className="bg-primary rounded-lg p-6">
            <h3 className="text-lg font-medium mb-3">What You Get</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                <p className="text-sm">Ownership stake proportional to investment</p>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                <p className="text-sm">Pro-rata distribution of profits</p>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                <p className="text-sm">Voting rights on major business decisions</p>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                <p className="text-sm">Quarterly financial reports and updates</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-primary rounded-lg p-6 sticky top-24">
            <h3 className="text-lg font-medium mb-4">Investment Summary</h3>
            
            <div className="border-b border-gray-800 pb-4 mb-4">
              <BusinessSummaryCard listing={listing} />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Your Investment</span>
                <span className="font-medium">{formatCurrency(amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Processing Fee</span>
                <span className="font-medium">{formatCurrency(amount * 0.02)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-800">
                <span className="font-medium">Total</span>
                <span className="font-medium">{formatCurrency(amount * 1.02)}</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-800">
              <h4 className="font-medium mb-2">Potential Returns</h4>
              <p className="text-sm text-gray-400 mb-2">
                Based on the business's current annual profit of {formatCurrency(listing.annual_profit || 0)}, 
                a {formatCurrency(amount)} investment could yield approximately:
              </p>
              
              <div className="bg-background/20 p-3 rounded-lg">
                <p className="text-center text-sm">
                  <span className="text-secondary font-medium text-lg">
                    {formatCurrency((amount / (listing.funding_target || 1)) * (listing.annual_profit || 0))}
                  </span>
                  <br />
                  <span className="text-gray-400">Estimated Annual Return*</span>
                </p>
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                *This is a simplified estimate and actual returns may vary based on business performance, 
                expenses, and other factors. Not guaranteed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentPage;
