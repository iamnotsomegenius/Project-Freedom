import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getListings } from '../api/listings';
import BusinessListingCard from '../components/business/BusinessListingCard';
import Button from '../components/ui/Button';
import { useAuthModal } from '../context/AuthModalContext';
import { useAuth } from '../context/AuthContext';

const FilterSidebar = ({ filters, setFilters, industries }) => {
  return (
    <div className="bg-primary rounded-lg p-6 sticky top-24">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      
      {/* Industry Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Industry</label>
        <select
          className="w-full bg-background text-foreground border border-gray-800 rounded-md px-3 py-2"
          value={filters.industry || ''}
          onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
        >
          <option value="">All Industries</option>
          {industries.map((industry) => (
            <option key={industry.value} value={industry.value}>
              {industry.label}
            </option>
          ))}
        </select>
      </div>
      
      {/* Revenue Range Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Annual Revenue</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-gray-400">Min</label>
            <select
              className="w-full bg-background text-foreground border border-gray-800 rounded-md px-3 py-2 text-sm"
              value={filters.minRevenue || ''}
              onChange={(e) => setFilters({ ...filters, minRevenue: e.target.value })}
            >
              <option value="">No Min</option>
              <option value="50000">$50k</option>
              <option value="100000">$100k</option>
              <option value="250000">$250k</option>
              <option value="500000">$500k</option>
              <option value="1000000">$1M</option>
              <option value="5000000">$5M</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400">Max</label>
            <select
              className="w-full bg-background text-foreground border border-gray-800 rounded-md px-3 py-2 text-sm"
              value={filters.maxRevenue || ''}
              onChange={(e) => setFilters({ ...filters, maxRevenue: e.target.value })}
            >
              <option value="">No Max</option>
              <option value="100000">$100k</option>
              <option value="250000">$250k</option>
              <option value="500000">$500k</option>
              <option value="1000000">$1M</option>
              <option value="5000000">$5M</option>
              <option value="10000000">$10M</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Profit Range Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Annual Profit</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-gray-400">Min</label>
            <select
              className="w-full bg-background text-foreground border border-gray-800 rounded-md px-3 py-2 text-sm"
              value={filters.minProfit || ''}
              onChange={(e) => setFilters({ ...filters, minProfit: e.target.value })}
            >
              <option value="">No Min</option>
              <option value="25000">$25k</option>
              <option value="50000">$50k</option>
              <option value="100000">$100k</option>
              <option value="250000">$250k</option>
              <option value="500000">$500k</option>
              <option value="1000000">$1M</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400">Max</label>
            <select
              className="w-full bg-background text-foreground border border-gray-800 rounded-md px-3 py-2 text-sm"
              value={filters.maxProfit || ''}
              onChange={(e) => setFilters({ ...filters, maxProfit: e.target.value })}
            >
              <option value="">No Max</option>
              <option value="50000">$50k</option>
              <option value="100000">$100k</option>
              <option value="250000">$250k</option>
              <option value="500000">$500k</option>
              <option value="1000000">$1M</option>
              <option value="5000000">$5M</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Location Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Location</label>
        <input
          type="text"
          className="w-full bg-background text-foreground border border-gray-800 rounded-md px-3 py-2"
          placeholder="City, State, or Country"
          value={filters.location || ''}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
      </div>
      
      {/* Search Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Search</label>
        <input
          type="text"
          className="w-full bg-background text-foreground border border-gray-800 rounded-md px-3 py-2"
          placeholder="Search businesses..."
          value={filters.search || ''}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </div>
      
      {/* Reset Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => setFilters({})}
      >
        Reset Filters
      </Button>
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-primary rounded-lg overflow-hidden border border-gray-800 animate-pulse">
          <div className="h-40 w-full bg-gray-800" />
          <div className="p-4">
            <div className="h-6 bg-gray-800 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-800 rounded w-1/2 mb-4" />
            <div className="grid grid-cols-2 gap-2">
              {[...Array(4)].map((_, j) => (
                <div key={j}>
                  <div className="h-3 bg-gray-800 rounded w-1/2 mb-1" />
                  <div className="h-5 bg-gray-800 rounded w-3/4" />
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-800 p-4">
            <div className="h-10 bg-gray-800 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

const EmptyState = () => {
  const { openAuthModal } = useAuthModal();
  const { user } = useAuth();
  
  return (
    <div className="text-center py-24">
      <h3 className="text-xl font-medium mb-2">No businesses found</h3>
      <p className="text-gray-400 mb-6">Try adjusting your filters or check back later</p>
      
      {user && user.user_type === 'SELLER' && (
        <Button href="/dashboard/seller/create-listing">
          List Your Business
        </Button>
      )}
      
      {!user && (
        <Button onClick={() => openAuthModal({ mode: 'signup' })}>
          Create Account to List Business
        </Button>
      )}
    </div>
  );
};

const MarketplacePage = () => {
  const [filters, setFilters] = useState({});
  
  const { data: listings, isLoading, error } = useQuery({
    queryKey: ['listings', filters],
    queryFn: () => getListings(filters),
  });
  
  // Industries list for filter
  const industries = [
    { value: 'technology', label: 'Technology' },
    { value: 'food_beverage', label: 'Food & Beverage' },
    { value: 'retail', label: 'Retail' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'services', label: 'Services' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'real_estate', label: 'Real Estate' },
    { value: 'construction', label: 'Construction' },
    { value: 'finance', label: 'Finance' },
    { value: 'other', label: 'Other' },
  ];
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Business Marketplace</h1>
        <p className="text-gray-400">
          Discover businesses for sale and investment opportunities across various industries.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="col-span-1">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            industries={industries}
          />
        </div>
        
        {/* Listings Grid */}
        <div className="col-span-1 lg:col-span-3">
          {isLoading ? (
            <LoadingSkeleton />
          ) : !listings || listings.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Show featured listings as fallback */}
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="bg-primary rounded-lg overflow-hidden border border-gray-800 hover:border-secondary transition h-full flex flex-col">
                  <div className="h-40 w-full bg-gray-800" />
                  <div className="p-4 flex-grow">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Featured Business {i}</h3>
                    <div className="text-sm text-gray-400 mb-4">Loading businesses...</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div><span className="text-xs text-gray-400">Revenue</span><br/><span className="font-medium">$XXX,XXX</span></div>
                      <div><span className="text-xs text-gray-400">EBITDA</span><br/><span className="font-medium">$XX,XXX</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <BusinessListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
