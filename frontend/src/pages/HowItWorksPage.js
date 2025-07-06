import React, { useState } from 'react';
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

const ProcessStep = ({ step, title, description }) => {
  return (
    <div className="text-center">
      <div className="bg-secondary/20 h-12 w-12 rounded-full flex items-center justify-center text-secondary font-bold mx-auto mb-3">
        {step}
      </div>
      <h5 className="font-medium mb-2">{title}</h5>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex items-start">
      <Icon className="h-7 w-7 text-secondary mr-4 mt-1 flex-shrink-0" />
      <div>
        <h4 className="font-medium mb-2">{title}</h4>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
};

const HowItWorksPage = () => {
  const [activeTab, setActiveTab] = useState('buyers');

  const buyerContent = {
    title: "For Buyers",
    subtitle: "Acquisition Capital, Simplified",
    description: "Are you ready to acquire an established small business but lack the full capital stack? SeedSMB transforms how buyers access acquisition funding by connecting you directly with thousands of retail investors eager to participate in your deal.",
    features: [
      {
        icon: BanknotesIcon,
        title: "Streamlined Funding Process",
        description: "Raise up to $5M in debt or equity financing through our Regulation CF platform"
      },
      {
        icon: ClockIcon,
        title: "Faster Closings",
        description: "Complete your capital raise in as little as 45 days versus 6+ months through traditional channels"
      },
      {
        icon: ArrowTrendingUpIcon,
        title: "Lower Investment Thresholds",
        description: "Attract more investors with our $100 minimum investment requirement"
      },
      {
        icon: UserCircleIcon,
        title: "Professional Deal Support",
        description: "Access our team of acquisition experts to structure attractive deals"
      },
      {
        icon: BuildingStorefrontIcon,
        title: "Target Sweet Spot",
        description: "Perfect for businesses valued at $500K-$3M EBITDA in the lower middle market"
      },
      {
        icon: DocumentCheckIcon,
        title: "Transparent Fee Structure",
        description: "Competitive 3% of final deal value, paid only upon successful funding"
      }
    ],
    process: {
      title: "The Buyer Process",
      steps: [
        { step: "1", title: "Apply", description: "Submit your buyer profile and acquisition criteria for pre-approval" },
        { step: "2", title: "Structure", description: "Work with our team to define your deal parameters and funding needs" },
        { step: "3", title: "List", description: "Launch your funding campaign to our network of retail investors" },
        { step: "4", title: "Fund", description: "Watch investments come in real-time through our transparent platform" },
        { step: "5", title: "Close", description: "Access escrowed funds to complete your acquisition upon reaching your target" }
      ]
    }
  };

  const sellerContent = {
    title: "For Sellers",
    subtitle: "Secure Your Business Legacy",
    description: "As a business owner approaching retirement or considering an exit, SeedSMB provides a transparent, efficient pathway to find the right buyer and secure your legacy. Our platform bridges the gap between sellers and buyers by providing access to retail investment capital.",
    features: [
      {
        icon: UsersIcon,
        title: "Broader Buyer Pool",
        description: "Access more qualified buyers with our retail investment backing"
      },
      {
        icon: ClockIcon,
        title: "Faster Time-to-Close",
        description: "Typically close 2-3x faster than traditional business sales channels"
      },
      {
        icon: DocumentChartBarIcon,
        title: "Streamlined Process",
        description: "One platform for listing, vetting, due diligence, and closing"
      },
      {
        icon: ShieldCheckIcon,
        title: "Professional Presentation",
        description: "Showcase your business with our standardized financial reporting"
      },
      {
        icon: BanknotesIcon,
        title: "Fair Market Value",
        description: "Get the proper valuation your years of hard work deserve"
      },
      {
        icon: LockClosedIcon,
        title: "Confidentiality Assured",
        description: "Our platform protects your sensitive business information"
      }
    ],
    process: {
      title: "The Seller Process",
      steps: [
        { step: "1", title: "Register", description: "Create your confidential seller profile and business listing" },
        { step: "2", title: "Valuation", description: "Receive a professional market valuation of your business" },
        { step: "3", title: "Packaging", description: "Our team helps prepare your business for market with standardized documentation" },
        { step: "4", title: "Matching", description: "Connect with pre-qualified buyers interested in your industry" },
        { step: "5", title: "Negotiation", description: "Finalize purchase terms with buyer support from our funding platform" },
        { step: "6", title: "Closing", description: "Complete the transaction with our streamlined closing process" }
      ]
    },
    additionalInfo: {
      title: "The Silver Tsunami Opportunity",
      content: "Baby Boomer business owners are retiring at unprecedented rates, with over 10,000 reaching retirement age daily. Yet 70% lack proper succession plans. SeedSMB helps ensure your business continues its legacy through a successful ownership transition."
    }
  };

  const investorContent = {
    title: "For Investors",
    subtitle: "Own a Piece of Main Street",
    description: "SeedSMB democratizes access to small business investments, allowing everyday investors to participate in an asset class previously reserved for private equity firms and accredited investors. Build wealth by funding the acquisition of established, profitable businesses with proven track records.",
    features: [
      {
        icon: CurrencyDollarIcon,
        title: "Low Minimum Investment",
        description: "Start with as little as $100 per deal"
      },
      {
        icon: DocumentTextIcon,
        title: "Diversification",
        description: "Spread your investment across multiple SMB opportunities"
      },
      {
        icon: MagnifyingGlassIcon,
        title: "Vetted Deals",
        description: "All businesses undergo rigorous financial and operational due diligence"
      },
      {
        icon: ChartBarIcon,
        title: "Transparency",
        description: "Access comprehensive business information in our data room"
      },
      {
        icon: BanknotesIcon,
        title: "Liquidity Options",
        description: "Potential liquidity events through buyouts or dividend streams"
      },
      {
        icon: ArrowTrendingUpIcon,
        title: "Tax Advantages",
        description: "Potential qualified small business stock benefits (consult your tax advisor)"
      }
    ],
    process: {
      title: "The Investment Process",
      steps: [
        { step: "1", title: "Register", description: "Create your investor account in minutes" },
        { step: "2", title: "Browse", description: "Explore available investment opportunities with detailed financials" },
        { step: "3", title: "Research", description: "Review comprehensive deal information in our secure data rooms" },
        { step: "4", title: "Invest", description: "Choose your investment amount starting at just $100" },
        { step: "5", title: "Monitor", description: "Track your investment portfolio and business performance updates" },
        { step: "6", title: "Returns", description: "Receive distributions or liquidity events based on business performance" }
      ]
    },
    opportunityStats: [
      {
        icon: ArrowTrendingUpIcon,
        stat: "35.3% Average IRR",
        description: "SMB acquisitions through search funds have outperformed most asset classes"
      },
      {
        icon: BanknotesIcon,
        stat: "5.2x Average ROI",
        description: "Compared to historical S&P 500 returns of ~10% annually"
      },
      {
        icon: ChartBarIcon,
        stat: "Cash Flow Focus",
        description: "Target businesses with established revenues and profit history"
      },
      {
        icon: CurrencyDollarIcon,
        stat: "$4.25 Trillion Market",
        description: "As Baby Boomers retire, unprecedented investment opportunities emerge"
      }
    ]
  };

  const getCurrentContent = () => {
    switch (activeTab) {
      case 'buyers': return buyerContent;
      case 'sellers': return sellerContent;
      case 'investors': return investorContent;
      default: return buyerContent;
    }
  };

  const currentContent = getCurrentContent();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-3">How SeedSMB Works</h1>
          <h2 className="text-2xl text-secondary mb-6">Connecting Sellers, Buyers, and Investors</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            SeedSMB connects retiring business owners, qualified buyers, and everyday investors through an innovative marketplace that democratizes access to small business investments.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-primary rounded-lg">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'buyers' ? 'bg-secondary text-background' : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('buyers')}
            >
              For Buyers
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'sellers' ? 'bg-secondary text-background' : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('sellers')}
            >
              For Sellers
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'investors' ? 'bg-secondary text-background' : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('investors')}
            >
              For Investors
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="mb-16">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-4">
              {activeTab === 'buyers' && <UserIcon className="h-12 w-12 text-secondary mx-auto" />}
              {activeTab === 'sellers' && <BuildingStorefrontIcon className="h-12 w-12 text-secondary mx-auto" />}
              {activeTab === 'investors' && <UserGroupIcon className="h-12 w-12 text-secondary mx-auto" />}
            </div>
            <h2 className="text-3xl font-bold mb-3">{currentContent.title}</h2>
            <h3 className="text-xl text-secondary mb-6">{currentContent.subtitle}</h3>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              {currentContent.description}
            </p>
          </div>

          {/* Additional Info for Sellers */}
          {activeTab === 'sellers' && currentContent.additionalInfo && (
            <div className="bg-primary p-8 rounded-lg mb-12">
              <h4 className="text-xl font-semibold mb-4">{currentContent.additionalInfo.title}</h4>
              <p className="text-gray-300">{currentContent.additionalInfo.content}</p>
            </div>
          )}

          {/* Investment Opportunity Stats for Investors */}
          {activeTab === 'investors' && currentContent.opportunityStats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {currentContent.opportunityStats.map((stat, index) => (
                <div key={index} className="bg-background/20 p-6 rounded-lg text-center">
                  <stat.icon className="h-8 w-8 text-secondary mx-auto mb-3" />
                  <h4 className="text-xl font-semibold mb-2">{stat.stat}</h4>
                  <p className="text-gray-400 text-sm">{stat.description}</p>
                </div>
              ))}
            </div>
          )}
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {currentContent.features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>

          {/* Process Section */}
          <div className="bg-primary p-8 rounded-lg">
            <h4 className="text-xl font-semibold mb-6 text-center">{currentContent.process.title}</h4>
            <div className={`grid grid-cols-1 gap-6 ${
              currentContent.process.steps.length <= 5 ? 'md:grid-cols-5' : 
              currentContent.process.steps.length === 6 ? 'md:grid-cols-3 lg:grid-cols-6' : 
              'md:grid-cols-3'
            }`}>
              {currentContent.process.steps.map((step, index) => (
                <ProcessStep 
                  key={index} 
                  step={step.step} 
                  title={step.title} 
                  description={step.description} 
                />
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