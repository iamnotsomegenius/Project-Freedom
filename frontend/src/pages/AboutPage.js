import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import {
  UserIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-3">About SeedSMB</h1>
          <p className="text-gray-300 text-lg">
            SeedSMB is on a mission to democratize access to small business investments and solve the pressing challenge of business succession for millions of retiring Baby Boomer owners.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-primary rounded-lg overflow-hidden border border-gray-800">
            <div className="aspect-video relative">
              <img 
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Founder"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-4">
                  <UserIcon className="h-8 w-8 text-secondary mb-2" />
                  <h3 className="text-xl font-bold text-white">Our Founder</h3>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-300 mb-6">
                Meet Costakis Loizou, the founder of SeedSMB, and learn about his vision to transform access to SMB investments. From finance expertise to entrepreneurial ventures, discover the journey behind SeedSMB.
              </p>
              <div className="flex justify-center">
                <Button href="/about/founder" variant="outline">
                  Meet Our Founder
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-primary rounded-lg overflow-hidden border border-gray-800">
            <div className="aspect-video relative">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Mission"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-4">
                  <RocketLaunchIcon className="h-8 w-8 text-secondary mb-2" />
                  <h3 className="text-xl font-bold text-white">Our Mission</h3>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-300 mb-6">
                Discover SeedSMB's mission to revolutionize small business acquisitions by connecting retiring business owners, qualified buyers, and everyday investors through an innovative marketplace.
              </p>
              <div className="flex justify-center">
                <Button href="/about/mission" variant="outline">
                  Our Mission
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">The SeedSMB Difference</h2>
          <div className="bg-primary p-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-medium mb-4 text-secondary">For Investors</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span className="text-gray-300">Start investing with as little as $100</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span className="text-gray-300">Access vetted businesses with proven cash flow</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span className="text-gray-300">Diversify across multiple private businesses</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span className="text-gray-300">Transparent fee structure aligned with your interests</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-4 text-secondary">For Business Owners</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span className="text-gray-300">Find qualified buyers and secure your legacy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span className="text-gray-300">Close deals 2-3x faster than traditional channels</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span className="text-gray-300">Receive fair market value for your business</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span className="text-gray-300">Professional support throughout the sale process</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">Key Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-primary p-6 rounded-lg text-center">
              <p className="text-3xl font-bold text-secondary mb-2">$4.25T</p>
              <p className="text-gray-300">Market size of Baby Boomer business transitions</p>
            </div>
            <div className="bg-primary p-6 rounded-lg text-center">
              <p className="text-3xl font-bold text-secondary mb-2">10,000</p>
              <p className="text-gray-300">Baby Boomers reaching retirement age daily</p>
            </div>
            <div className="bg-primary p-6 rounded-lg text-center">
              <p className="text-3xl font-bold text-secondary mb-2">70%</p>
              <p className="text-gray-300">Of business owners lack succession plans</p>
            </div>
            <div className="bg-primary p-6 rounded-lg text-center">
              <p className="text-3xl font-bold text-secondary mb-2">35.3%</p>
              <p className="text-gray-300">Average IRR for SMB acquisitions</p>
            </div>
          </div>
        </div>
        
        <div className="bg-secondary/10 p-8 rounded-lg text-center mb-8">
          <h3 className="text-2xl font-semibold mb-4">Join the Movement</h3>
          <p className="text-gray-300 mb-6">
            The greatest transfer of business wealth in American history is underway. Whether you're a business owner, buyer, or investor, SeedSMB provides the platform to achieve your goals.
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

export default AboutPage;