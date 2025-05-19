import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFeaturedListings } from '../../api/listings';
import BusinessListingCard from './BusinessListingCard';
import Button from '../ui/Button';

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-primary rounded-lg overflow-hidden border border-gray-800 animate-pulse h-full flex flex-col">
          <div className="h-40 w-full bg-gray-800" />
          <div className="p-4 flex-grow">
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
          <div className="mt-auto">
            <div className="border-t border-gray-800 p-4">
              <div className="h-10 bg-gray-800 rounded" />
            </div>
            <div className="px-4 pb-4 h-[3.75rem]">
              <div className="h-2 w-full bg-gray-700 rounded-full mt-2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center py-12">
      <h3 className="text-xl font-medium mb-2">No featured businesses yet</h3>
      <p className="text-gray-400 mb-6">Check back soon for featured business listings</p>
      <Button href="/marketplace" variant="outline">
        Browse All Businesses
      </Button>
    </div>
  );
};

const FeaturedListingsGrid = () => {
  const { data: listings, isLoading, error } = useQuery({
    queryKey: ['featuredListings'],
    queryFn: getFeaturedListings,
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-danger">Failed to load featured listings</p>
      </div>
    );
  }

  if (!listings || listings.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <BusinessListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};

export default FeaturedListingsGrid;
