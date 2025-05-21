import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import {
  ArrowTrendingUpIcon,
  BanknotesIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

const InvestorsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* SEO Metadata would be handled with React Helmet or similar library */}
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Own a Piece of Main Street</h1>
          <h2 className="text-2xl text-secondary mb-6">Access High-Return Private Market Investments Starting at $100</h2>
          <p className="text-gray-300 text-lg">
            SeedSMB democratizes access to small business investments, allowing everyday investors to participate in an asset class previously reserved for private equity firms and accredited investors. Build wealth by funding the acquisition of established, profitable businesses with proven track records.
          </p>
        </div>
        
        {/* Investment Opportunity */}
        <div className="mb-16 bg-primary p-8 rounded-lg">
          <h3 className="text-2xl font-semibold mb-6">The Investment Opportunity</h3>
          <p className="text-gray-300 mb-6">
            Small business acquisitions have historically delivered exceptional returns:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-background/20 p-5 rounded-lg">
              <div className="flex items-center mb-3">
                <ArrowTrendingUpIcon className="h-8 w-8 text-secondary mr-3" />
                <h4 className="text-xl font-semibold">35.3% Average IRR</h4>
              </div>
              <p className="text-gray-400">SMB acquisitions through search funds have outperformed most asset classes</p>
            </div>
            <div className="bg-background/20 p-5 rounded-lg">
              <div className="flex items-center mb-3">
                <BanknotesIcon className="h-8 w-8 text-secondary mr-3" />
                <h4 className="text-xl font-semibold">5.2x Average ROI</h4>
              </div>
              <p className="text-gray-400">Compared to historical S&P 500 returns of ~10% annually</p>
            </div>
            <div className="bg-background/20 p-5 rounded-lg">
              <div className="flex items-center mb-3">
                <ChartBarIcon className="h-8 w-8 text-secondary mr-3" />
                <h4 className="text-xl font-semibold">Cash Flow Focus</h4>
              </div>
              <p className="text-gray-400">Target businesses with established revenues and profit history</p>
            </div>
            <div className="bg-background/20 p-5 rounded-lg">
              <div className="flex items-center mb-3">
                <CurrencyDollarIcon className="h-8 w-8 text-secondary mr-3" />
                <h4 className="text-xl font-semibold">$4.25 Trillion Market</h4>
              </div>
              <p className="text-gray-400">As Baby Boomers retire, unprecedented investment opportunities emerge</p>
            </div>
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center">Why Invest Through SeedSMB?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <CurrencyDollarIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Low Minimum Investment</h4>
                <p className="text-gray-400">Start with as little as $100 per deal</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <DocumentTextIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Diversification</h4>
                <p className="text-gray-400">Spread your investment across multiple SMB opportunities</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <MagnifyingGlassIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Vetted Deals</h4>
                <p className="text-gray-400">All businesses undergo rigorous financial and operational due diligence</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <ChartBarIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Transparency</h4>
                <p className="text-gray-400">Access comprehensive business information in our data room</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <BanknotesIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Liquidity Options</h4>
                <p className="text-gray-400">Potential liquidity events through buyouts or dividend streams</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <ArrowTrendingUpIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Tax Advantages</h4>
                <p className="text-gray-400">Potential qualified small business stock benefits (consult your tax advisor)</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Process Section */}
        <div className="mb-16 bg-primary p-8 rounded-lg">
          <h3 className="text-2xl font-semibold mb-6 text-center">The Investment Process</h3>
          <div className="space-y-6">
            <div className="flex">
              <div className="mr-4">
                <div className="bg-secondary/20 h-10 w-10 rounded-full flex items-center justify-center text-secondary font-bold">1</div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Register</h4>
                <p className="text-gray-400">Create your investor account in minutes</p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">
                <div className="bg-secondary/20 h-10 w-10 rounded-full flex items-center justify-center text-secondary font-bold">2</div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Browse</h4>
                <p className="text-gray-400">Explore available investment opportunities with detailed financials</p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">
                <div className="bg-secondary/20 h-10 w-10 rounded-full flex items-center justify-center text-secondary font-bold">3</div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Research</h4>
                <p className="text-gray-400">Review comprehensive deal information in our secure data rooms</p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">
                <div className="bg-secondary/20 h-10 w-10 rounded-full flex items-center justify-center text-secondary font-bold">4</div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Invest</h4>
                <p className="text-gray-400">Choose your investment amount starting at just $100</p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">
                <div className="bg-secondary/20 h-10 w-10 rounded-full flex items-center justify-center text-secondary font-bold">5</div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Monitor</h4>
                <p className="text-gray-400">Track your investment portfolio and business performance updates</p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">
                <div className="bg-secondary/20 h-10 w-10 rounded-full flex items-center justify-center text-secondary font-bold">6</div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Returns</h4>
                <p className="text-gray-400">Receive distributions or liquidity events based on business performance</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Investment Categories */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center">Investment Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-primary rounded-lg border border-gray-800">
              <h4 className="font-medium mb-2 text-secondary">Main Street Classics</h4>
              <p className="text-gray-400 text-sm">Established service businesses with 15%+ annual returns</p>
            </div>
            <div className="p-4 bg-primary rounded-lg border border-gray-800">
              <h4 className="font-medium mb-2 text-secondary">Growth Accelerators</h4>
              <p className="text-gray-400 text-sm">Businesses with expansion potential beyond current operations</p>
            </div>
            <div className="p-4 bg-primary rounded-lg border border-gray-800">
              <h4 className="font-medium mb-2 text-secondary">Cash Flow Kings</h4>
              <p className="text-gray-400 text-sm">Steady performers with strong dividend potential</p>
            </div>
            <div className="p-4 bg-primary rounded-lg border border-gray-800">
              <h4 className="font-medium mb-2 text-secondary">Digital Transformations</h4>
              <p className="text-gray-400 text-sm">Traditional businesses primed for technology enhancement</p>
            </div>
            <div className="p-4 bg-primary rounded-lg border border-gray-800 md:col-span-2">
              <h4 className="font-medium mb-2 text-secondary">Community Anchors</h4>
              <p className="text-gray-400 text-sm">Essential local businesses with strong community ties</p>
            </div>
          </div>
        </div>
        
        {/* Success Story */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center">Investor Success Stories</h3>
          <div className="bg-primary p-6 rounded-lg border border-gray-800">
            <blockquote className="text-gray-300 italic mb-4">
              "I've always wanted to invest in private businesses but never had the capital or connections. With SeedSMB, I've invested in six different SMBs with just $5,000 total. My first investment is already paying quarterly distributions that exceed what I was earning in my index funds."
            </blockquote>
            <p className="text-right font-medium">— Jennifer M., California</p>
          </div>
        </div>
        
        {/* Portfolio Allocation */}
        <div className="mb-16 bg-primary p-8 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4 text-center">Smart Portfolio Allocation</h3>
          <p className="text-gray-300 mb-4">
            Financial advisors increasingly recommend allocating 10-20% of investment portfolios to alternative assets like private businesses. SeedSMB makes this accessible without needing millions in net worth. Start building your SMB portfolio today.
          </p>
        </div>
        
        {/* CTA Section */}
        <div className="text-center mb-8">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => window.location.href="/marketplace"}>
              Browse Current Opportunities
            </Button>
            <Button variant="outline" onClick={() => window.location.href="/calculator"}>
              Calculate Potential Returns
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorsPage;