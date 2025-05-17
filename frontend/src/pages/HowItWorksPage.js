import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import {
  ClipboardIcon,
  ChartPieIcon,
  BanknotesIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  DocumentIcon,
  ClipboardDocumentCheckIcon,
  UserPlusIcon,
  SparklesIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

const StepCard = ({ number, title, description, icon }) => {
  return (
    <div className="grid grid-cols-12 gap-4 mb-8">
      <div className="col-span-2 sm:col-span-1">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary/20 text-secondary">
          {number ? (
            <span className="text-xl font-bold">{number}</span>
          ) : (
            icon
          )}
        </div>
      </div>
      <div className="col-span-10 sm:col-span-11">
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};

const HowItWorksPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">How SeedSMB Works</h1>
        
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-secondary">For Sellers</h2>
            <div className="mt-8">
              <StepCard
                number="1"
                title="List Your Business"
                description="Create a comprehensive listing with financials, history, and your asking price. Our guided process makes it easy to showcase your business to potential buyers and investors."
                icon={<ClipboardIcon className="h-6 w-6" />}
              />
              <StepCard
                number="2"
                title="Set Funding Structure"
                description="Choose whether to seek full acquisition or enable fractional ownership through crowdfunding. You can set your funding target and determine the percentage of the business available for investment."
                icon={<ChartPieIcon className="h-6 w-6" />}
              />
              <StepCard
                number="3"
                title="Receive Offers & Investments"
                description="Get direct acquisition offers from buyers or watch your funding campaign progress as investors contribute. Review and respond to offers with our AI-assisted tools."
                icon={<BanknotesIcon className="h-6 w-6" />}
              />
              <StepCard
                number="4"
                title="Close the Deal"
                description="Complete due diligence and finalize the transaction with our streamlined process. Our platform provides a secure environment for document sharing and communication."
                icon={<CheckCircleIcon className="h-6 w-6" />}
              />
            </div>
            
            <div className="mt-8 text-center">
              <Button
                href="/list-business"
                className="bg-secondary hover:bg-secondary/90 text-background"
              >
                List Your Business
              </Button>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-secondary">For Buyers</h2>
            <div className="mt-8">
              <StepCard
                number="1"
                title="Browse Businesses"
                description="Explore available businesses filtered by industry, size, location, and financials. Find opportunities that match your acquisition criteria with our advanced search features."
                icon={<MagnifyingGlassIcon className="h-6 w-6" />}
              />
              <StepCard
                number="2"
                title="Make an Offer"
                description="Use our AI-assisted LOI generator to craft competitive offers. The system analyzes market data and similar transactions to suggest terms that are likely to be accepted."
                icon={<DocumentIcon className="h-6 w-6" />}
              />
              <StepCard
                number="3"
                title="Complete Due Diligence"
                description="Access comprehensive information and conduct thorough research. Our secure deal room facilitates document sharing and collaboration between all parties."
                icon={<ClipboardDocumentCheckIcon className="h-6 w-6" />}
              />
              <StepCard
                number="4"
                title="Finalize Acquisition"
                description="Complete the transaction with assistance from our platform. Track every step of the closing process with our deal management tools."
                icon={<UserPlusIcon className="h-6 w-6" />}
              />
            </div>
            
            <div className="mt-8 text-center">
              <Button
                href="/marketplace"
                className="bg-secondary hover:bg-secondary/90 text-background"
              >
                Find Businesses
              </Button>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-secondary">For Investors</h2>
            <div className="mt-8">
              <StepCard
                number="1"
                title="Discover Opportunities"
                description="Find businesses open to fractional investment through Regulation CF. Browse opportunities based on industry, return potential, and funding targets."
                icon={<SparklesIcon className="h-6 w-6" />}
              />
              <StepCard
                number="2"
                title="Invest Any Amount"
                description="Start with as little as $100 to own a piece of a small business. Diversify your portfolio across multiple businesses to spread risk and maximize potential returns."
                icon={<CurrencyDollarIcon className="h-6 w-6" />}
              />
              <StepCard
                number="3"
                title="Track Your Portfolio"
                description="Monitor business performance and receive updates from owners. Our dashboard provides real-time insights into your investments and projected returns."
                icon={<ChartBarIcon className="h-6 w-6" />}
              />
              <StepCard
                number="4"
                title="Receive Returns"
                description="Earn proportional distributions from business profits or exits. When businesses perform well, you share in their success through dividend payments or appreciation."
                icon={<BanknotesIcon className="h-6 w-6" />}
              />
            </div>
            
            <div className="mt-8 text-center">
              <Button
                href="/marketplace"
                className="bg-secondary hover:bg-secondary/90 text-background"
              >
                Start Investing
              </Button>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-secondary">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">What is Regulation CF?</h3>
                <p className="text-gray-400">
                  Regulation Crowdfunding (Reg CF) allows eligible companies to offer and sell securities through crowdfunding. It enables small businesses to raise up to $5 million from both accredited and non-accredited investors.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">How are businesses valued on the platform?</h3>
                <p className="text-gray-400">
                  Business valuations are typically determined by the seller based on factors like revenue multiple, profit multiple, asset value, and market comparables. Our platform provides guidance on appropriate valuation methods.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">What fees does SeedSMB charge?</h3>
                <p className="text-gray-400">
                  SeedSMB charges a 5% success fee to sellers upon successful acquisition or funding. For investors, there's a 2% processing fee on investments. There are no listing fees or monthly charges.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">How long does the typical acquisition process take?</h3>
                <p className="text-gray-400">
                  The acquisition timeline varies based on business complexity, but typically ranges from 60-90 days from accepted offer to closing. This includes due diligence, documentation, and final transfer of ownership.
                </p>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-primary rounded-lg text-center">
              <h3 className="text-xl font-medium mb-3">Still have questions?</h3>
              <p className="text-gray-400 mb-4">
                Our team is here to help you navigate the platform and answer any questions you may have.
              </p>
              <Button
                href="/contact"
                variant="outline"
              >
                Contact Us
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
