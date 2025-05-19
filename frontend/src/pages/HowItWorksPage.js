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
  ShieldCheckIcon,
  ScaleIcon,
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
                description="Create a comprehensive listing with financials, history, and your asking price. Our guided process makes it easy to showcase your business to potential buyers and investors. A $1,000 upfront listing fee applies to cover initial vetting and platform costs."
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
                description="Complete due diligence and finalize the transaction with our streamlined process. Our platform provides a secure environment for document sharing and communication. A $10,000 advisory fee is charged for successful deals, covering due diligence support and deal structuring."
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
                description="Complete the transaction with assistance from our platform. Track every step of the closing process with our deal management tools. A 3% transaction fee of the total deal value applies upon successful closing."
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
                description="Find businesses open to fractional investment through Regulation Crowdfunding. Browse opportunities based on industry, return potential, and funding targets."
                icon={<SparklesIcon className="h-6 w-6" />}
              />
              <StepCard
                number="2"
                title="Invest Any Amount"
                description="Start with as little as $100 to own a piece of a small business. Diversify your portfolio across multiple businesses to spread risk and maximize potential returns. A 1% transaction fee (capped at $50) applies to each investment."
                icon={<CurrencyDollarIcon className="h-6 w-6" />}
              />
              <StepCard
                number="3"
                title="Track Your Portfolio"
                description="Monitor business performance and receive updates from owners. Our dashboard provides real-time insights into your investments and projected returns. A 0.5% annual fee applies to managed equity stakes."
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
            <h2 className="text-2xl font-semibold mb-6 text-secondary">Understanding Regulation Crowdfunding</h2>
            <div className="bg-primary p-6 rounded-lg mb-8">
              <div className="flex items-start mb-4">
                <ShieldCheckIcon className="h-6 w-6 text-secondary mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium mb-2">What is Regulation Crowdfunding?</h3>
                  <p className="text-gray-400">
                    Regulation Crowdfunding (Reg CF) was enacted under Title III of the JOBS Act in 2016. It allows eligible businesses to 
                    raise up to $5 million annually from both accredited and non-accredited investors through SEC-registered online platforms.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start mb-4">
                <ScaleIcon className="h-6 w-6 text-secondary mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium mb-2">Investment Limits for Non-Accredited Investors</h3>
                  <p className="text-gray-400">
                    If your annual income or net worth is less than $124,000, you can invest the greater of $2,500 or 5% of the lesser of your annual income or net worth.
                    If both annual income and net worth are $124,000+, you can invest up to 10% of the lesser amount, with a maximum cap of $124,000.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <DocumentIcon className="h-6 w-6 text-secondary mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium mb-2">Disclosure and Protection</h3>
                  <p className="text-gray-400">
                    Companies must file a Form C with the SEC before raising funds, disclosing business plans, financials, and ownership information.
                    All investments are processed through a secure third-party escrow account, not held directly by SeedSMB, to ensure regulatory compliance and investor protection.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2 text-warning">Investment Risk Disclosure</h3>
              <p className="text-gray-300">
                Investing in small businesses involves substantial risk, including loss of principal. These investments are highly illiquid and should only represent a small portion of your overall investment portfolio. SeedSMB is not a broker-dealer or investment advisor. Always consider consulting with a financial professional before making investment decisions.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-secondary">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">What is Regulation Crowdfunding?</h3>
                <p className="text-gray-400">
                  Regulation Crowdfunding (Reg CF) allows eligible companies to offer and sell securities through crowdfunding. It enables small businesses to raise up to $5 million from both accredited and non-accredited investors through SEC-registered platforms.
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
                  Our fee structure includes: a $1,000 upfront listing fee for sellers, a $10,000 advisory fee for successful deals, a 3% transaction fee for buyers upon successful funding, and a 1% fee (capped at $50) for each investment. We also charge a 0.5% annual fee on managed equity stakes.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">How long does the typical acquisition process take?</h3>
                <p className="text-gray-400">
                  The acquisition timeline varies based on business complexity, but typically ranges from 60-90 days from accepted offer to closing. This includes due diligence, documentation, and final transfer of ownership.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">How are investor funds handled?</h3>
                <p className="text-gray-400">
                  All investment funds are held in a secure third-party escrow account, not by SeedSMB directly. Funds are only released to the business once funding targets are met and all compliance requirements are satisfied.
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
