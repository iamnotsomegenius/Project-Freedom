import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getSellerListings } from '../../api/listings';
import { getSellerOffers } from '../../api/offers';
import { getUserDeals } from '../../api/deals';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency, formatDate } from '../../utils/format';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import StatCard from '../../components/dashboard/StatCard';
import Button from '../../components/ui/Button';
import {
  BuildingStorefrontIcon,
  DocumentTextIcon,
  EyeIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

// Helper functions
const countListingsByStatus = (listings, status) => {
  if (!listings) return 0;
  return listings.filter(listing => listing.status === status).length;
};

const calculateTotalViews = (listings) => {
  if (!listings) return 0;
  // In a real app, you would have a views counter for each listing
  return listings.length * 10; // Placeholder for demo
};

const calculateTotalFunding = (listings) => {
  if (!listings) return 0;
  return listings.reduce((sum, listing) => sum + (listing.funding_raised || 0), 0);
};

// Empty state component
const EmptyState = ({ title, description, action }) => (
  <div className="text-center py-12 bg-primary rounded-lg">
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-gray-400 mb-6 max-w-md mx-auto">{description}</p>
    {action && (
      <Button 
        href={action.href}
        className={action.className || ""}
      >
        {action.label}
      </Button>
    )}
  </div>
);

// Listings table
const SellerListingsTable = ({ listings }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-800">
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Business</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Price</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Status</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Listed On</th>
          <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-800">
        {listings.map((listing) => (
          <tr key={listing.id} className="hover:bg-gray-800/30">
            <td className="px-4 py-3 text-sm">
              <Link to={`/marketplace/${listing.id}`} className="font-medium hover:text-secondary">
                {listing.title}
              </Link>
            </td>
            <td className="px-4 py-3 text-sm">{formatCurrency(listing.asking_price)}</td>
            <td className="px-4 py-3 text-sm">
              <span className={`px-2 py-1 rounded-full text-xs ${
                listing.status === 'active' ? 'bg-success/20 text-success' :
                listing.status === 'under_loi' ? 'bg-warning/20 text-warning' :
                listing.status === 'draft' ? 'bg-gray-500/20 text-gray-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {listing.status === 'active' ? 'Active' :
                 listing.status === 'under_loi' ? 'Under LOI' :
                 listing.status === 'draft' ? 'Draft' :
                 listing.status}
              </span>
            </td>
            <td className="px-4 py-3 text-sm">{formatDate(listing.created_at)}</td>
            <td className="px-4 py-3 text-sm text-right">
              <Button 
                href={`/dashboard/seller/listings/${listing.id}`}
                variant="ghost"
                size="sm"
              >
                View
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Recent offers table
const RecentOffersTable = ({ offers }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-800">
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Business</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Offer Amount</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Status</th>
          <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-800">
        {offers.map((offer) => (
          <tr key={offer.id} className="hover:bg-gray-800/30">
            <td className="px-4 py-3 text-sm">
              {offer.business?.title || 'Unknown Business'}
            </td>
            <td className="px-4 py-3 text-sm">{formatCurrency(offer.offer_amount)}</td>
            <td className="px-4 py-3 text-sm">
              <span className={`px-2 py-1 rounded-full text-xs ${
                offer.status === 'pending' ? 'bg-warning/20 text-warning' :
                offer.status === 'accepted' ? 'bg-success/20 text-success' :
                offer.status === 'rejected' ? 'bg-danger/20 text-danger' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
              </span>
            </td>
            <td className="px-4 py-3 text-sm text-right">
              <Button 
                href={`/dashboard/seller/offers/${offer.id}`}
                variant="ghost"
                size="sm"
              >
                View
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Main seller dashboard component
const SellerDashboardPage = () => {
  const { user } = useAuth();
  
  const { data: listings } = useQuery({
    queryKey: ['seller-listings'],
    queryFn: () => getSellerListings(user.id),
    enabled: !!user?.id,
  });
  
  const { data: offers } = useQuery({
    queryKey: ['seller-offers'],
    queryFn: getSellerOffers,
  });
  
  const { data: deals } = useQuery({
    queryKey: ['user-deals'],
    queryFn: getUserDeals,
  });
  
  return (
    <div className="space-y-8">
      <DashboardHeader 
        title="Seller Dashboard" 
        actions={
          <Button 
            href="/dashboard/seller/create-listing"
            className="bg-secondary hover:bg-secondary/90 text-background"
          >
            Add New Listing
          </Button>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Listings"
          value={countListingsByStatus(listings, 'active')}
          icon={<BuildingStorefrontIcon className="h-5 w-5" />}
          trend={{ value: 0, label: 'from last month' }}
        />
        <StatCard
          title="Total Offers"
          value={offers?.length || 0}
          icon={<DocumentTextIcon className="h-5 w-5" />}
          trend={{ value: 0, label: 'from last month' }}
        />
        <StatCard
          title="Total Views"
          value={calculateTotalViews(listings)}
          icon={<EyeIcon className="h-5 w-5" />}
          trend={{ value: 0, label: 'from last month' }}
        />
        <StatCard
          title="Funding Raised"
          value={formatCurrency(calculateTotalFunding(listings))}
          icon={<CurrencyDollarIcon className="h-5 w-5" />}
          trend={{ value: 0, label: 'from last month' }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-primary rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Your Listings</h3>
              {listings && listings.length > 0 && (
                <Button 
                  href="/dashboard/seller/listings"
                  variant="outline"
                  size="sm"
                >
                  View All
                </Button>
              )}
            </div>
            <div className="p-6">
              {listings?.length > 0 ? (
                <SellerListingsTable listings={listings.slice(0, 5)} />
              ) : (
                <EmptyState
                  title="No listings yet"
                  description="Create your first business listing to start selling"
                  action={{
                    label: "Create Listing",
                    href: "/dashboard/seller/create-listing"
                  }}
                />
              )}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-primary rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Recent Offers</h3>
              {offers && offers.length > 0 && (
                <Button 
                  href="/dashboard/seller/offers"
                  variant="outline"
                  size="sm"
                >
                  View All
                </Button>
              )}
            </div>
            <div className="p-6">
              {offers?.length > 0 ? (
                <RecentOffersTable offers={offers.slice(0, 5)} />
              ) : (
                <EmptyState
                  title="No offers yet"
                  description="Offers will appear here once received"
                  action={null}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      
      {deals && deals.length > 0 && (
        <div className="bg-primary rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Active Deals</h3>
            <Button 
              href="/dashboard/seller/deals"
              variant="outline"
              size="sm"
            >
              View All
            </Button>
          </div>
          {/* Active deals content */}
          <div className="p-6">
            {/* Deal cards or list would go here */}
            <p className="text-gray-400">You have {deals.length} active deal(s)</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboardPage;
