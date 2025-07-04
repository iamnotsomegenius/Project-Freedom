import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import {
  UserIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
  BanknotesIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  UserCircleIcon,
  DocumentCheckIcon,
  UsersIcon,
  DocumentChartBarIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

const HowItWorksPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-3">How SeedSMB Works</h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            SeedSMB connects retiring business owners, qualified buyers, and everyday investors through an innovative marketplace that democratizes access to small business investments.
          </p>
        </div>

        {/* For Buyers Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <UserIcon className="h-12 w-12 text-secondary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-3">For Buyers</h2>
            <h3 className="text-xl text-secondary mb-6">Acquisition Capital, Simplified</h3>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Are you ready to acquire an established small business but lack the full capital stack? SeedSMB transforms how buyers access acquisition funding by connecting you directly with thousands of retail investors eager to participate in your deal.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="flex items-start">
              <BanknotesIcon className="h-7 w-7 text-secondary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-2">Streamlined Funding Process</h4>
                <p className="text-gray-400 text-sm">Raise up to $5M in debt or equity financing through our Regulation CF platform</p>
              </div>
            </div>
            <div className="flex items-start">
              <ClockIcon className="h-7 w-7 text-secondary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-2">Faster Closings</h4>
                <p className="text-gray-400 text-sm">Complete your capital raise in as little as 45 days versus 6+ months through traditional channels</p>
              </div>
            </div>
            <div className="flex items-start">
              <ArrowTrendingUpIcon className="h-7 w-7 text-secondary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-2">Lower Investment Thresholds</h4>
                <p className="text-gray-400 text-sm">Attract more investors with our $100 minimum investment requirement</p>
              </div>
            </div>
            <div className="flex items-start">
              <UserCircleIcon className="h-7 w-7 text-secondary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-2">Professional Deal Support</h4>
                <p className="text-gray-400 text-sm">Access our team of acquisition experts to structure attractive deals</p>
              </div>
            </div>
            <div className="flex items-start">
              <BuildingStorefrontIcon className="h-7 w-7 text-secondary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-2">Target Sweet Spot</h4>
                <p className="text-gray-400 text-sm">Perfect for businesses valued at $500K-$3M EBITDA in the lower middle market</p>
              </div>
            </div>
            <div className="flex items-start">
              <DocumentCheckIcon className="h-7 w-7 text-secondary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-2">Transparent Fee Structure</h4>
                <p className="text-gray-400 text-sm">Competitive 3% of final deal value, paid only upon successful funding</p>
              </div>
            </div>
          </div>

          {/* Buyer Process */}
          <div className="bg-primary p-8 rounded-lg">
            <h4 className="text-xl font-semibold mb-6 text-center">The Buyer Process</h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                { step: "1", title: "Apply", desc: "Submit your buyer profile and acquisition criteria for pre-approval" },
                { step: "2", title: "Structure", desc: "Work with our team to define your deal parameters and funding needs" },
                { step: "3", title: "List", desc: "Launch your funding campaign to our network of retail investors" },
                { step: "4", title: "Fund", desc: "Watch investments come in real-time through our transparent platform" },
                { step: "5", title: "Close", desc: "Access escrowed funds to complete your acquisition upon reaching your target" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-secondary/20 h-12 w-12 rounded-full flex items-center justify-center text-secondary font-bold mx-auto mb-3">
                    {item.step}
                  </div>
                  <h5 className="font-medium mb-2">{item.title}</h5>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* For Sellers Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <BuildingStorefrontIcon className="h-12 w-12 text-secondary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-3">For Sellers</h2>
            <h3 className="text-xl text-secondary mb-6">Secure Your Business Legacy</h3>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              As a business owner approaching retirement or considering an exit, SeedSMB provides a transparent, efficient pathway to find the right buyer and secure your legacy. Our platform bridges the gap between sellers and buyers by providing access to retail investment capital.
            </p>
          </div>

          {/* Silver Tsunami */}
          <div className="bg-primary p-8 rounded-lg mb-12">
            <h4 className="text-xl font-semibold mb-4">The Silver Tsunami Opportunity</h4>
            <p className="text-gray-300">
              Baby Boomer business owners are retiring at unprecedented rates, with over 10,000 reaching retirement age daily. Yet 70% lack proper succession plans. SeedSMB helps ensure your business continues its legacy through a successful ownership transition.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="flex items-start">
              <UsersIcon className="h-7 w-7 text-secondary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-2">Broader Buyer Pool</h4>
                <p className="text-gray-400 text-sm">Access more qualified buyers with our retail investment backing</p>
              </div>
            </div>
            <div className="flex items-start">
              <ClockIcon className="h-7 w-7 text-secondary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-2">Faster Time-to-Close</h4>
                <p className="text-gray-400 text-sm">Typically close 2-3x faster than traditional business sales channels</p>
              </div>
            </div>
            <div className="flex items-start">
              <DocumentChartBarIcon className="h-7 w-7 text-secondary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-2">Streamlined Process</h4>
                <p className="text-gray-400 text-sm">One platform for listing, vetting, due diligence, and closing</p>
              </div>
            </div>
            <div className="flex items-start">
              <ShieldCheckIcon className="h-7 w-7 text-secondary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-2">Professional Presentation</h4>
                <p className="text-gray-400 text-sm">Showcase your business with our standardized financial reporting</p>
              </div>
            </div>
            <div className="flex items-start">
              <BanknotesIcon className="h-7 w-7 text-secondary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-2">Fair Market Value</h4>
                <p className="text-gray-400 text-sm">Get the proper valuation your years of hard work deserve</p>
              </div>
            </div>
            <div className="flex items-start">
              <LockClosedIcon className="h-7 w-7 text-secondary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-2">Confidentiality Assured</h4>
                <p className="text-gray-400 text-sm">Our platform protects your sensitive business information</p>
              </div>
            </div>
          </div>

          {/* Seller Process */}
          <div className="bg-primary p-8 rounded-lg">
            <h4 className="text-xl font-semibold mb-6 text-center">The Seller Process</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { step: "1", title: "Register", desc: "Create your confidential seller profile and business listing" },
                { step: "2", title: "Valuation", desc: "Receive a professional market valuation of your business" },
                { step: "3", title: "Packaging", desc: "Our team helps prepare your business for market with standardized documentation" },
                { step: "4", title: "Matching", desc: "Connect with pre-qualified buyers interested in your industry" },
                { step: "5", title: "Negotiation", desc: "Finalize purchase terms with buyer support from our funding platform" },
                { step: "6", title: "Closing", desc: "Complete the transaction with our streamlined closing process" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-secondary/20 h-12 w-12 rounded-full flex items-center justify-center text-secondary font-bold mx-auto mb-3">
                    {item.step}
                  </div>
                  <h5 className="font-medium mb-2">{item.title}</h5>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* For Investors Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <UserGroupIcon className="h-12 w-12 text-secondary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-3">For Investors</h2>
            <h3 className="text-xl text-secondary mb-6">Own a Piece of Main Street</h3>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              SeedSMB democratizes access to small business investments, allowing everyday investors to participate in an asset class previously reserved for private equity firms and accredited investors. Build wealth by funding the acquisition of established, profitable businesses with proven track records.
            </p>
          </div>

          {/* Investment Opportunity */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-background/20 p-6 rounded-lg text-center">
              <ArrowTrendingUpIcon className="h-8 w-8 text-secondary mx-auto mb-3" />
              <h4 className="text-xl font-semibold mb-2">35.3% Average IRR</h4>
              <p className="text-gray-400 text-sm">SMB acquisitions through search funds have outperformed most asset classes</p>
            </div>
            <div className="bg-background/20 p-6 rounded-lg text-center">
              <BanknotesIcon className="h-8 w-8 text-secondary mx-auto mb-3" />
              <h4 className="text-xl font-semibold mb-2">5.2x Average ROI</h4>
              <p className="text-gray-400 text-sm">Compared to historical S&P 500 returns of ~10% annually</p>
            </div>
            <div className="bg-background/20 p-6 rounded-lg text-center">
              <ChartBarIcon className="h-8 w-8 text-secondary mx-auto mb-3" />
              <h4 className="text-xl font-semibold mb-2">Cash Flow Focus</h4>
              <p className="text-gray-400 text-sm">Target businesses with established revenues and profit history</p>
            </div>
            <div className="bg-background/20 p-6 rounded-lg text-center">
              <CurrencyDollarIcon className="h-8 w-8 text-secondary mx-auto mb-3" />
              <h4 className="text-xl font-semibold mb-2">$4.25 Trillion Market</h4>
              <p className="text-gray-400 text-sm">As Baby Boomers retire, unprecedented investment opportunities emerge</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="flex items-start">
              <CurrencyDollarIcon className="h-7 w-7 text-secondary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-2">Low Minimum Investment</h4>
                <p className="text-gray-400 text-sm">Start with as little as $100 per deal</p>
              </div>
            </div>
            <div className="flex items-start">
              <DocumentTextIcon className="h-7 w-7 text-secondary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-2">Diversification</h4>
                <p className="text-gray-400 text-sm">Spread your investment across multiple SMB opportunities</p>
              </div>
            </div>
            <div className="flex items-start">
              <MagnifyingGlassIcon className="h-7 w-7 text-secondary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-2">Vetted Deals</h4>
                <p className="text-gray-400 text-sm">All businesses undergo rigorous financial and operational due diligence</p>
              </div>
            </div>
            <div className="flex items-start">
              <ChartBarIcon className="h-7 w-7 text-secondary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-2">Transparency</h4>
                <p className="text-gray-400 text-sm">Access comprehensive business information in our data room</p>
              </div>
            </div>
            <div className="flex items-start">
              <BanknotesIcon className="h-7 w-7 text-secondary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-2">Liquidity Options</h4>
                <p className="text-gray-400 text-sm">Potential liquidity events through buyouts or dividend streams</p>
              </div>
            </div>
            <div className="flex items-start">
              <ArrowTrendingUpIcon className="h-7 w-7 text-secondary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-2">Tax Advantages</h4>
                <p className="text-gray-400 text-sm">Potential qualified small business stock benefits (consult your tax advisor)</p>
              </div>
            </div>
          </div>

          {/* Investment Process */}
          <div className="bg-primary p-8 rounded-lg">
            <h4 className="text-xl font-semibold mb-6 text-center">The Investment Process</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { step: "1", title: "Register", desc: "Create your investor account in minutes" },
                { step: "2", title: "Browse", desc: "Explore available investment opportunities with detailed financials" },
                { step: "3", title: "Research", desc: "Review comprehensive deal information in our secure data rooms" },
                { step: "4", title: "Invest", desc: "Choose your investment amount starting at just $100" },
                { step: "5", title: "Monitor", desc: "Track your investment portfolio and business performance updates" },
                { step: "6", title: "Returns", desc: "Receive distributions or liquidity events based on business performance" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-secondary/20 h-12 w-12 rounded-full flex items-center justify-center text-secondary font-bold mx-auto mb-3">
                    {item.step}
                  </div>
                  <h5 className="font-medium mb-2">{item.title}</h5>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-secondary/10 p-8 rounded-lg text-center">
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