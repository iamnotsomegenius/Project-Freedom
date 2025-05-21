import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { 
  ChartBarIcon, 
  ChevronDownIcon, 
  ChevronUpIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';

const InvestmentPortfolioPage = () => {
  // This would normally fetch data from the backend API
  const mockInvestments = [
    {
      id: '1',
      business: 'Mountain View Manufacturing',
      type: 'Preferred Equity',
      invested: 5000,
      currentValue: 5750,
      returnToDate: 750,
      returnPercentage: 15,
      investmentDate: '2023-02-15T00:00:00Z',
      status: 'Active'
    },
    {
      id: '2',
      business: 'Coastal Wellness Center',
      type: 'Revenue Share',
      invested: 2000,
      currentValue: 2180,
      returnToDate: 180,
      returnPercentage: 9,
      investmentDate: '2023-03-10T00:00:00Z',
      status: 'Active'
    },
    {
      id: '3',
      business: 'Rocky Mountain Outfitters',
      type: 'Convertible Note',
      invested: 1000,
      currentValue: 1110,
      returnToDate: 110,
      returnPercentage: 11,
      investmentDate: '2023-04-05T00:00:00Z',
      status: 'Active'
    }
  ];

  const totalInvested = mockInvestments.reduce((sum, inv) => sum + inv.invested, 0);
  const totalCurrentValue = mockInvestments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalReturn = totalCurrentValue - totalInvested;
  const totalReturnPercentage = (totalReturn / totalInvested) * 100;

  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Investment Portfolio</h1>
        <p className="text-gray-400">Track and manage your small business investments</p>
      </div>
      
      {/* Portfolio Summary */}
      <div className="bg-primary p-6 rounded-lg border border-gray-800 mb-8">
        <h2 className="text-xl font-semibold mb-4">Portfolio Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-gray-400 text-sm mb-1">Total Invested</p>
            <p className="text-2xl font-bold">${totalInvested.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Current Value</p>
            <p className="text-2xl font-bold">${totalCurrentValue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Total Return</p>
            <div className="flex items-center">
              <p className="text-2xl font-bold">${totalReturn.toLocaleString()}</p>
              <span className="ml-2 text-green-400 flex items-center">
                <ArrowUpIcon className="h-4 w-4" />
                {totalReturnPercentage.toFixed(1)}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Active Investments</p>
            <p className="text-2xl font-bold">{mockInvestments.length}</p>
          </div>
        </div>
      </div>
      
      {/* Investment Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-primary p-6 rounded-lg border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Investment by Type</h2>
          <div className="h-64 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <ChartBarIcon className="h-16 w-16 text-gray-600 mb-4" />
              <p className="text-gray-400">Chart visualization would appear here</p>
            </div>
          </div>
        </div>
        <div className="bg-primary p-6 rounded-lg border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Performance Trend</h2>
          <div className="h-64 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <ChartBarIcon className="h-16 w-16 text-gray-600 mb-4" />
              <p className="text-gray-400">Chart visualization would appear here</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Investments List */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Investments</h2>
        <div className="space-y-4">
          {mockInvestments.map((investment) => (
            <div 
              key={investment.id} 
              className="bg-primary rounded-lg border border-gray-800 overflow-hidden"
            >
              <div 
                className="px-6 py-4 flex justify-between items-center cursor-pointer"
                onClick={() => toggleAccordion(investment.id)}
              >
                <div>
                  <h3 className="font-medium">{investment.business}</h3>
                  <div className="flex items-center space-x-3 text-sm text-gray-400">
                    <span>{investment.type}</span>
                    <span>•</span>
                    <span>Invested: ${investment.invested.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">${investment.currentValue.toLocaleString()}</p>
                    <div className="flex items-center justify-end text-sm">
                      <span className="text-green-400 flex items-center">
                        <ArrowUpIcon className="h-3 w-3 mr-1" />
                        {investment.returnPercentage}%
                      </span>
                    </div>
                  </div>
                  {openAccordion === investment.id ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
              
              {openAccordion === investment.id && (
                <div className="px-6 py-4 border-t border-gray-800 bg-gray-900/30">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">Investment Date</p>
                      <p>{new Date(investment.investmentDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Status</p>
                      <p>{investment.status}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Return to Date</p>
                      <p>${investment.returnToDate.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <Button 
                      href={`/dashboard/investments/${investment.id}`}
                      variant="outline" 
                      size="sm"
                    >
                      View Details
                    </Button>
                    <Button 
                      href={`/marketplace/${investment.business.toLowerCase().replace(/\s+/g, '-')}`}
                      variant="outline" 
                      size="sm"
                    >
                      View Business
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* CTA */}
      <div className="bg-secondary/10 p-6 rounded-lg text-center mb-8">
        <h2 className="text-xl font-semibold mb-2">Diversify Your Portfolio</h2>
        <p className="text-gray-300 mb-4">
          Explore new investment opportunities in established small businesses with proven track records.
        </p>
        <Button href="/marketplace">
          Browse the Marketplace
        </Button>
      </div>
    </div>
  );
};

export default InvestmentPortfolioPage;