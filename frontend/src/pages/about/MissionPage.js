import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import {
  UsersIcon,
  UserGroupIcon,
  UserIcon,
  ArrowTrendingUpIcon,
  SparklesIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';

const MissionPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* SEO Metadata would be handled with React Helmet or similar library */}
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Our Mission & Vision</h1>
          <h2 className="text-2xl text-secondary mb-6">Democratizing Access to Main Street's Next Asset Class Boom</h2>
          <p className="text-gray-300 text-lg">
            At SeedSMB, we're on a mission to transform how small businesses change hands and how everyday Americans build wealth.
          </p>
        </div>
        
        {/* Mission Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6">The Mission That Drives Us</h3>
          <p className="text-gray-300 mb-6">
            SeedSMB was founded with a clear purpose: to create an accessible marketplace that connects three critical stakeholders in the small business ecosystem:
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start bg-primary p-6 rounded-lg">
              <div className="mr-4">
                <UsersIcon className="h-10 w-10 text-secondary" />
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-lg">Retiring Business Owners</h4>
                <p className="text-gray-300">
                  Providing liquidity and legacy preservation for the 2.3 million Baby Boomer business owners seeking succession plans
                </p>
              </div>
            </div>
            
            <div className="flex items-start bg-primary p-6 rounded-lg">
              <div className="mr-4">
                <UserIcon className="h-10 w-10 text-secondary" />
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-lg">Qualified Operators</h4>
                <p className="text-gray-300">
                  Empowering talented professionals to become business owners by solving their funding gap
                </p>
              </div>
            </div>
            
            <div className="flex items-start bg-primary p-6 rounded-lg">
              <div className="mr-4">
                <UserGroupIcon className="h-10 w-10 text-secondary" />
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-lg">Everyday Investors</h4>
                <p className="text-gray-300">
                  Opening previously inaccessible investment opportunities to retail investors seeking alternatives to traditional stocks and bonds
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wealth Gap Section */}
        <div className="mb-16 bg-primary p-8 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">The Generational Wealth Gap We're Addressing</h3>
          <p className="text-gray-300 mb-6">
            The data is stark:
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center">
              <div className="bg-secondary h-2 w-2 rounded-full mr-3"></div>
              <span className="text-gray-300">Millennials hold just 3% of U.S. wealth—one-seventh of what Baby Boomers held at the same age</span>
            </li>
            <li className="flex items-center">
              <div className="bg-secondary h-2 w-2 rounded-full mr-3"></div>
              <span className="text-gray-300">By 2030, all 73 million Baby Boomers will reach retirement age</span>
            </li>
            <li className="flex items-center">
              <div className="bg-secondary h-2 w-2 rounded-full mr-3"></div>
              <span className="text-gray-300">Approximately 10,000 Baby Boomers retire daily, many owning small businesses</span>
            </li>
            <li className="flex items-center">
              <div className="bg-secondary h-2 w-2 rounded-full mr-3"></div>
              <span className="text-gray-300">70% of these businesses lack proper succession plans</span>
            </li>
          </ul>
          <p className="text-gray-300">
            SeedSMB bridges this gap by unlocking new pathways to business ownership and investment for younger generations while providing exit options for retirement-age owners.
          </p>
        </div>
        
        {/* Core Values */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center">Core Values That Guide Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center text-center p-4 bg-primary rounded-lg border border-gray-800">
              <SparklesIcon className="h-10 w-10 text-secondary mb-3" />
              <h4 className="font-medium mb-2">Transparency</h4>
              <p className="text-gray-400 text-sm">Clear information and standardized disclosures for all marketplace participants</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-primary rounded-lg border border-gray-800">
              <UserGroupIcon className="h-10 w-10 text-secondary mb-3" />
              <h4 className="font-medium mb-2">Accessibility</h4>
              <p className="text-gray-400 text-sm">Lowering barriers to private business investment with $100 minimums</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-primary rounded-lg border border-gray-800">
              <ArrowTrendingUpIcon className="h-10 w-10 text-secondary mb-3" />
              <h4 className="font-medium mb-2">Education</h4>
              <p className="text-gray-400 text-sm">Empowering informed decisions through comprehensive resources and data</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-primary rounded-lg border border-gray-800">
              <RocketLaunchIcon className="h-10 w-10 text-secondary mb-3" />
              <h4 className="font-medium mb-2">Efficiency</h4>
              <p className="text-gray-400 text-sm">Streamlining transactions to reduce costs and accelerate timelines</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-primary rounded-lg border border-gray-800 md:col-span-2">
              <UserGroupIcon className="h-10 w-10 text-secondary mb-3" />
              <h4 className="font-medium mb-2">Community</h4>
              <p className="text-gray-400 text-sm">Building connections between generations of business owners and investors</p>
            </div>
          </div>
        </div>
        
        {/* Impact Goals */}
        <div className="mb-16 bg-primary p-8 rounded-lg">
          <h3 className="text-2xl font-semibold mb-6 text-center">Measurable Impact Goals</h3>
          <p className="text-gray-300 mb-4">By 2030, SeedSMB aims to:</p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="mr-3 mt-1">
                <div className="h-5 w-5 bg-secondary/20 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-secondary rounded-full"></div>
                </div>
              </div>
              <span className="text-gray-300">Facilitate 10,000+ successful business transitions</span>
            </li>
            <li className="flex items-start">
              <div className="mr-3 mt-1">
                <div className="h-5 w-5 bg-secondary/20 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-secondary rounded-full"></div>
                </div>
              </div>
              <span className="text-gray-300">Unlock $5+ billion in liquidity for retiring business owners</span>
            </li>
            <li className="flex items-start">
              <div className="mr-3 mt-1">
                <div className="h-5 w-5 bg-secondary/20 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-secondary rounded-full"></div>
                </div>
              </div>
              <span className="text-gray-300">Create 20,000+ new business owners from underrepresented groups</span>
            </li>
            <li className="flex items-start">
              <div className="mr-3 mt-1">
                <div className="h-5 w-5 bg-secondary/20 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-secondary rounded-full"></div>
                </div>
              </div>
              <span className="text-gray-300">Enable 1,000,000+ Americans to invest in private businesses for the first time</span>
            </li>
            <li className="flex items-start">
              <div className="mr-3 mt-1">
                <div className="h-5 w-5 bg-secondary/20 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-secondary rounded-full"></div>
                </div>
              </div>
              <span className="text-gray-300">Preserve 100,000+ jobs that would otherwise be lost to business closures</span>
            </li>
          </ul>
        </div>
        
        {/* Join Section */}
        <div className="mb-16 text-center">
          <h3 className="text-2xl font-semibold mb-4">Join the Movement</h3>
          <p className="text-gray-300 mb-6">
            The greatest transfer of business wealth in American history is underway. Will you be part of it?
          </p>
          <p className="text-gray-300 mb-8">
            Whether you're a business owner planning your exit, an aspiring entrepreneur seeking to acquire a business, or an investor looking for alternatives to the stock market, SeedSMB provides the platform to achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => window.location.href = "/marketplace"}>
              Explore Opportunities
            </Button>
            <Button variant="outline" onClick={() => window.location.href = "/newsletter"}>
              Subscribe to Market Updates
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionPage;