import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const SellerDashboardPage = () => {
  // This would normally fetch data from the backend API
  const mockListings = [
    {
      id: '1',
      title: 'Premium Auto Detailing Business',
      status: 'ACTIVE',
      views: 342,
      leads: 12,
      price: '$450,000',
      revenue: '$320,000',
      createdAt: '2023-04-15T00:00:00Z'
    },
    {
      id: '2',
      title: 'Manufacturing Supply Chain Solution',
      status: 'DRAFT',
      views: 0,
      leads: 0,
      price: '$750,000',
      revenue: '$620,000',
      createdAt: '2023-05-01T00:00:00Z'
    }
  ];

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Seller Dashboard</h1>
          <p className="text-gray-400">Manage your business listings and track buyer interest</p>
        </div>
        <Button
          href="/dashboard/seller/create-listing"
          className="mt-4 sm:mt-0"
        >
          Create New Listing
        </Button>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-primary p-4 rounded-lg border border-gray-800">
          <p className="text-gray-400 text-sm mb-1">Active Listings</p>
          <p className="text-2xl font-bold">1</p>
        </div>
        <div className="bg-primary p-4 rounded-lg border border-gray-800">
          <p className="text-gray-400 text-sm mb-1">Total Views</p>
          <p className="text-2xl font-bold">342</p>
        </div>
        <div className="bg-primary p-4 rounded-lg border border-gray-800">
          <p className="text-gray-400 text-sm mb-1">Interested Buyers</p>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="bg-primary p-4 rounded-lg border border-gray-800">
          <p className="text-gray-400 text-sm mb-1">Offers Received</p>
          <p className="text-2xl font-bold">2</p>
        </div>
      </div>
      
      {/* Listings Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Business Listings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-primary">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Business</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Views</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Leads</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Price</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Revenue</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Created</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {mockListings.map((listing) => (
                <tr key={listing.id}>
                  <td className="px-4 py-3 text-sm text-gray-300">{listing.title}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      listing.status === 'ACTIVE' 
                        ? 'bg-green-900/30 text-green-400' 
                        : 'bg-yellow-900/30 text-yellow-400'
                    }`}>
                      {listing.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-300">{listing.views}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{listing.leads}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{listing.price}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{listing.revenue}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">
                    {new Date(listing.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-300">
                    <div className="flex space-x-2">
                      <Button
                        href={`/dashboard/seller/edit/${listing.id}`}
                        variant="outline"
                        size="xs"
                      >
                        Edit
                      </Button>
                      {listing.status === 'DRAFT' && (
                        <Button
                          href={`/dashboard/seller/publish/${listing.id}`}
                          size="xs"
                        >
                          Publish
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Next Steps */}
      <div className="bg-primary p-6 rounded-lg border border-gray-800">
        <h2 className="text-xl font-semibold mb-4">Next Steps to Maximize Your Success</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-secondary flex items-center justify-center text-xs text-background font-bold mr-3">
              1
            </div>
            <div>
              <h3 className="font-medium">Complete your business profile</h3>
              <p className="text-gray-400 text-sm">Add detailed financial information, operating history, and customer data to attract serious buyers.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-secondary flex items-center justify-center text-xs text-background font-bold mr-3">
              2
            </div>
            <div>
              <h3 className="font-medium">Upload business documents</h3>
              <p className="text-gray-400 text-sm">Prepare and upload financial statements, tax returns, and other important documentation to the secure data room.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-secondary flex items-center justify-center text-xs text-background font-bold mr-3">
              3
            </div>
            <div>
              <h3 className="font-medium">Schedule a valuation consultation</h3>
              <p className="text-gray-400 text-sm">Work with our team to determine the optimal asking price for your business based on market conditions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardPage;