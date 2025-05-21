import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import {
  BanknotesIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  UserCircleIcon,
  BuildingStorefrontIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';

const BuyersPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* SEO Metadata would be handled with React Helmet or similar library */}
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Acquisition Capital, Simplified</h1>
          <h2 className="text-2xl text-secondary mb-6">Fund Your Small Business Purchase with Retail Investment Power</h2>
          <p className="text-gray-300 text-lg">
            Are you ready to acquire an established small business but lack the full capital stack? SeedSMB transforms how buyers access acquisition funding by connecting you directly with thousands of retail investors eager to participate in your deal.
          </p>
        </div>
        
        {/* Benefits Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center">Why SeedSMB for Buyers?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <BanknotesIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Streamlined Funding Process</h4>
                <p className="text-gray-400">Raise up to $5M in debt or equity financing through our Regulation CF platform</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <ClockIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Faster Closings</h4>
                <p className="text-gray-400">Complete your capital raise in as little as 45 days versus 6+ months through traditional channels</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <ArrowTrendingUpIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Lower Minimum Investment Thresholds</h4>
                <p className="text-gray-400">Attract more investors with our $100 minimum investment requirement</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <UserCircleIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Professional Deal Support</h4>
                <p className="text-gray-400">Access our team of acquisition experts to structure attractive deals</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <BuildingStorefrontIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Target Sweet Spot</h4>
                <p className="text-gray-400">Perfect for businesses valued at $500K-$3M EBITDA in the lower middle market</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <DocumentCheckIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Transparent Fee Structure</h4>
                <p className="text-gray-400">Competitive 3% of final deal value, paid only upon successful funding</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Process Section */}
        <div className="mb-16 bg-primary p-8 rounded-lg">
          <h3 className="text-2xl font-semibold mb-6 text-center">The SeedSMB Buyer Process</h3>
          <div className="space-y-6">
            <div className="flex">
              <div className="mr-4">
                <div className="bg-secondary/20 h-10 w-10 rounded-full flex items-center justify-center text-secondary font-bold">1</div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Apply</h4>
                <p className="text-gray-400">Submit your buyer profile and acquisition criteria for pre-approval</p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">
                <div className="bg-secondary/20 h-10 w-10 rounded-full flex items-center justify-center text-secondary font-bold">2</div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Structure</h4>
                <p className="text-gray-400">Work with our team to define your deal parameters and funding needs</p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">
                <div className="bg-secondary/20 h-10 w-10 rounded-full flex items-center justify-center text-secondary font-bold">3</div>
              </div>
              <div>
                <h4 className="font-medium mb-1">List</h4>
                <p className="text-gray-400">Launch your funding campaign to our network of retail investors</p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">
                <div className="bg-secondary/20 h-10 w-10 rounded-full flex items-center justify-center text-secondary font-bold">4</div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Fund</h4>
                <p className="text-gray-400">Watch investments come in real-time through our transparent platform</p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">
                <div className="bg-secondary/20 h-10 w-10 rounded-full flex items-center justify-center text-secondary font-bold">5</div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Close</h4>
                <p className="text-gray-400">Access escrowed funds to complete your acquisition upon reaching your target</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Success Story */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center">Buyer Success Stories</h3>
          <div className="bg-primary p-6 rounded-lg border border-gray-800">
            <blockquote className="text-gray-300 italic mb-4">
              "After months of struggling to close the gap in my capital stack, SeedSMB helped me raise $1.2M in just 37 days. I now own a profitable manufacturing business that I couldn't have acquired through traditional channels."
            </blockquote>
            <p className="text-right font-medium">— Michael T., Ohio</p>
          </div>
          <div className="mt-4 text-center">
            <Button href="/success-stories">
              Browse Success Stories
            </Button>
          </div>
        </div>
        
        {/* Criteria Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center">Ideal Buyer Criteria</h3>
          <p className="mb-4 text-gray-300">SeedSMB works best for buyers who:</p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Have identified a specific acquisition target or have narrowed criteria</li>
            <li>Possess relevant industry experience or transferable skills</li>
            <li>Need $250K-$5M in acquisition capital to complete their deal</li>
            <li>Can contribute at least 10% of the purchase price personally</li>
            <li>Have strong credit and management backgrounds</li>
          </ul>
        </div>
        
        {/* CTA Section */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold mb-4">Ready to transform your acquisition journey?</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => window.location.href="/marketplace"}>
              Browse Businesses
            </Button>
            <Button variant="outline" onClick={() => window.location.href="/contact"}>
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyersPage;