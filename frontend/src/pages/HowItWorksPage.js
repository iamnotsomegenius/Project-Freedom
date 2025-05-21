import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import {
  UserIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
  ScaleIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

const HowItWorksPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-3">How SeedSMB Works</h1>
          <p className="text-gray-300 text-lg">
            SeedSMB connects retiring business owners, qualified buyers, and everyday investors through an innovative marketplace that democratizes access to small business investments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-primary rounded-lg overflow-hidden border border-gray-800">
            <div className="aspect-video relative">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="For Buyers"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-4">
                  <UserIcon className="h-8 w-8 text-secondary mb-2" />
                  <h3 className="text-xl font-bold text-white">For Buyers</h3>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-300 mb-6">
                Raise up to $5M in acquisition capital through our innovative crowdfunding platform. Fund your small business purchase with retail investment power.
              </p>
              <div className="flex justify-center">
                <Button href="/how-it-works/buyers" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-primary rounded-lg overflow-hidden border border-gray-800">
            <div className="aspect-video relative">
              <img 
                src="https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="For Sellers"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-4">
                  <BuildingStorefrontIcon className="h-8 w-8 text-secondary mb-2" />
                  <h3 className="text-xl font-bold text-white">For Sellers</h3>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-300 mb-6">
                Connect with qualified buyers and maximize your exit value. Secure your business legacy with our streamlined marketplace.
              </p>
              <div className="flex justify-center">
                <Button href="/how-it-works/sellers" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-primary rounded-lg overflow-hidden border border-gray-800">
            <div className="aspect-video relative">
              <img 
                src="https://images.unsplash.com/photo-1579532536935-619928decd08?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="For Investors"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-4">
                  <UserGroupIcon className="h-8 w-8 text-secondary mb-2" />
                  <h3 className="text-xl font-bold text-white">For Investors</h3>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-300 mb-6">
                Invest in established small businesses with proven cash flow starting from just $100. Own a piece of Main Street.
              </p>
              <div className="flex justify-center">
                <Button href="/how-it-works/investors" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-primary rounded-lg overflow-hidden border border-gray-800">
            <div className="aspect-video relative">
              <img 
                src="https://images.unsplash.com/photo-1565877207333-4b53c88688cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Regulatory Framework"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-4">
                  <ScaleIcon className="h-8 w-8 text-secondary mb-2" />
                  <h3 className="text-xl font-bold text-white">Regulatory Framework</h3>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-300 mb-6">
                Understand the regulatory innovations that make SeedSMB possible. Learn how Regulation Crowdfunding creates opportunities for everyday investors.
              </p>
              <div className="flex justify-center">
                <Button href="/how-it-works/regulatory" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-primary rounded-lg overflow-hidden border border-gray-800">
            <div className="aspect-video relative">
              <img 
                src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Pricing"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-4">
                  <CurrencyDollarIcon className="h-8 w-8 text-secondary mb-2" />
                  <h3 className="text-xl font-bold text-white">Pricing</h3>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-300 mb-6">
                Understand SeedSMB's straightforward fee structure for buyers, sellers, and investors. Our transparent pricing ensures alignment of interests.
              </p>
              <div className="flex justify-center">
                <Button href="/how-it-works/pricing" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-secondary/10 p-8 rounded-lg text-center mb-8">
          <h3 className="text-2xl font-semibold mb-4">Ready to Get Started?</h3>
          <p className="text-gray-300 mb-6">
            Explore opportunities in the marketplace or create your account to begin your small business investment journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/marketplace">
              Browse Marketplace
            </Button>
            <Button href="/register" variant="outline">
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;