import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import {
  UsersIcon,
  ClockIcon,
  DocumentChartBarIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';

const SellersPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* SEO Metadata would be handled with React Helmet or similar library */}
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Secure Your Business Legacy</h1>
          <h2 className="text-2xl text-secondary mb-6">Connect with Qualified Buyers and Maximize Your Exit Value</h2>
          <p className="text-gray-300 text-lg">
            As a business owner approaching retirement or considering an exit, SeedSMB provides a transparent, efficient pathway to find the right buyer and secure your legacy. Our platform bridges the gap between sellers and buyers by providing access to retail investment capital.
          </p>
        </div>
        
        {/* Silver Tsunami Section */}
        <div className="mb-16 bg-primary p-8 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">The Silver Tsunami Opportunity</h3>
          <p className="text-gray-300 mb-4">
            Baby Boomer business owners are retiring at unprecedented rates, with over 10,000 reaching retirement age daily. Yet 70% lack proper succession plans. SeedSMB helps ensure your business continues its legacy through a successful ownership transition.
          </p>
        </div>
        
        {/* Benefits Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center">Why SeedSMB for Sellers?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <UsersIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Broader Buyer Pool</h4>
                <p className="text-gray-400">Access more qualified buyers with our retail investment backing</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <ClockIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Faster Time-to-Close</h4>
                <p className="text-gray-400">Typically close 2-3x faster than traditional business sales channels</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <DocumentChartBarIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Streamlined Process</h4>
                <p className="text-gray-400">One platform for listing, vetting, due diligence, and closing</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <ShieldCheckIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Professional Presentation</h4>
                <p className="text-gray-400">Showcase your business with our standardized financial reporting</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <BanknotesIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Fair Market Value</h4>
                <p className="text-gray-400">Get the proper valuation your years of hard work deserve</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <LockClosedIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Confidentiality Assured</h4>
                <p className="text-gray-400">Our platform protects your sensitive business information</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Process Section */}
        <div className="mb-16 bg-primary p-8 rounded-lg">
          <h3 className="text-2xl font-semibold mb-6 text-center">The SeedSMB Seller Process</h3>
          <div className="space-y-6">
            <div className="flex">
              <div className="mr-4">
                <div className="bg-secondary/20 h-10 w-10 rounded-full flex items-center justify-center text-secondary font-bold">1</div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Register</h4>
                <p className="text-gray-400">Create your confidential seller profile and business listing</p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">
                <div className="bg-secondary/20 h-10 w-10 rounded-full flex items-center justify-center text-secondary font-bold">2</div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Valuation</h4>
                <p className="text-gray-400">Receive a professional market valuation of your business</p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">
                <div className="bg-secondary/20 h-10 w-10 rounded-full flex items-center justify-center text-secondary font-bold">3</div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Packaging</h4>
                <p className="text-gray-400">Our team helps prepare your business for market with standardized documentation</p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">
                <div className="bg-secondary/20 h-10 w-10 rounded-full flex items-center justify-center text-secondary font-bold">4</div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Matching</h4>
                <p className="text-gray-400">Connect with pre-qualified buyers interested in your industry</p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">
                <div className="bg-secondary/20 h-10 w-10 rounded-full flex items-center justify-center text-secondary font-bold">5</div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Negotiation</h4>
                <p className="text-gray-400">Finalize purchase terms with buyer support from our funding platform</p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">
                <div className="bg-secondary/20 h-10 w-10 rounded-full flex items-center justify-center text-secondary font-bold">6</div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Closing</h4>
                <p className="text-gray-400">Complete the transaction with our streamlined closing process</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Success Story */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center">Seller Success Stories</h3>
          <div className="bg-primary p-6 rounded-lg border border-gray-800">
            <blockquote className="text-gray-300 italic mb-4">
              "After 32 years building my distribution company, finding the right buyer seemed impossible. SeedSMB not only found a qualified buyer but helped them secure the funding to give me a full-value exit. The process took just 90 days from listing to closing."
            </blockquote>
            <p className="text-right font-medium">— Barbara K., Florida</p>
          </div>
          <div className="mt-4 text-center">
            <Button href="/success-stories">
              Browse Success Stories
            </Button>
          </div>
        </div>
        
        {/* Criteria Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center">Ideal Seller Criteria</h3>
          <p className="mb-4 text-gray-300">SeedSMB works best for sellers who:</p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Own established businesses with $500K-$10M in annual revenue</li>
            <li>Can demonstrate at least 3 years of profit history</li>
            <li>Are seeking a full exit or staged transition</li>
            <li>Value finding the right buyer to continue their legacy</li>
            <li>Need liquidity within the next 6-24 months</li>
          </ul>
        </div>
        
        {/* CTA Section */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold mb-4">Ready to secure your business legacy?</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => window.location.href="/list-business"}>
              List Your Business
            </Button>
            <Button variant="outline" onClick={() => window.location.href="/contact"}>
              Free Valuation Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellersPage;