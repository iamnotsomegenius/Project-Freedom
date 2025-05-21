import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import {
  CheckIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

const PricingPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* SEO Metadata would be handled with React Helmet or similar library */}
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Transparent Pricing, Aligned Interests</h1>
          <h2 className="text-2xl text-secondary mb-6">Fair and Straightforward Fees That Support Successful Outcomes</h2>
          <p className="text-gray-300 text-lg">
            SeedSMB maintains a simple, transparent fee structure designed to align interests across all platform participants. We only succeed when our deals close successfully.
          </p>
        </div>
        
        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* For Buyers */}
          <div className="bg-primary rounded-lg overflow-hidden border border-gray-800">
            <div className="bg-secondary/10 px-6 py-4">
              <h3 className="text-xl font-semibold text-center">For Buyers</h3>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Success Fee</h4>
                  <span className="font-bold text-secondary">3%</span>
                </div>
                <p className="text-gray-400 text-sm">of total transaction value, paid only upon successful funding and closing</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-secondary mr-2" />
                  <span className="text-gray-300">Application Fee</span>
                  <span className="text-gray-400 ml-auto">None</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-secondary mr-2" />
                  <span className="text-gray-300">Listing Fee</span>
                  <span className="text-gray-400 ml-auto">None</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-secondary mr-2" />
                  <span className="text-gray-300">Due Diligence Support</span>
                  <span className="text-gray-400 ml-auto">Included</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-secondary mr-2" />
                  <span className="text-gray-300">Legal Document Templates</span>
                  <span className="text-gray-400 ml-auto">Included</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-secondary mr-2" />
                  <span className="text-gray-300">Escrow Services</span>
                  <span className="text-gray-400 ml-auto">Included</span>
                </div>
              </div>
              
              <div className="bg-background/20 p-4 rounded-lg">
                <p className="text-sm text-gray-300">
                  <strong>Example:</strong> On a $2,000,000 acquisition, the buyer success fee would be $60,000, paid only at closing.
                </p>
              </div>
            </div>
          </div>
          
          {/* For Sellers */}
          <div className="bg-primary rounded-lg overflow-hidden border border-gray-800">
            <div className="bg-secondary/10 px-6 py-4">
              <h3 className="text-xl font-semibold text-center">For Sellers</h3>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Listing Fee</h4>
                  <span className="font-bold text-secondary">$1,000</span>
                </div>
                <p className="text-gray-400 text-sm">one-time fee for business listing and initial vetting</p>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Advisory Fee</h4>
                  <span className="font-bold text-secondary">$10,000</span>
                </div>
                <p className="text-gray-400 text-sm">flat fee per successfully closed deal</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-secondary mr-2" />
                  <span className="text-gray-300">Due Diligence Preparation</span>
                  <span className="text-gray-400 ml-auto">Included</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-secondary mr-2" />
                  <span className="text-gray-300">Marketing Materials</span>
                  <span className="text-gray-400 ml-auto">Included</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-secondary mr-2" />
                  <span className="text-gray-300">Buyer Screening</span>
                  <span className="text-gray-400 ml-auto">Included</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-secondary mr-2" />
                  <span className="text-gray-300">Deal Negotiation Support</span>
                  <span className="text-gray-400 ml-auto">Included</span>
                </div>
              </div>
              
              <div className="bg-background/20 p-4 rounded-lg">
                <p className="text-sm text-gray-300">
                  <strong>Example:</strong> Selling your $2,000,000 business would cost $1,000 upfront plus $10,000 at closing—significantly less than traditional broker fees of 10-12% ($200,000-$240,000).
                </p>
              </div>
            </div>
          </div>
          
          {/* For Investors */}
          <div className="bg-primary rounded-lg overflow-hidden border border-gray-800">
            <div className="bg-secondary/10 px-6 py-4">
              <h3 className="text-xl font-semibold text-center">For Investors</h3>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Investment Transaction Fee</h4>
                  <span className="font-bold text-secondary">1%</span>
                </div>
                <p className="text-gray-400 text-sm">of invested amount, capped at $50 per transaction</p>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Annual Management Fee</h4>
                  <span className="font-bold text-secondary">0.5%</span>
                </div>
                <p className="text-gray-400 text-sm">on outstanding investment balances</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-secondary mr-2" />
                  <span className="text-gray-300">Early Withdrawal Fee</span>
                  <span className="text-gray-400 ml-auto">None</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-secondary mr-2" />
                  <span className="text-gray-300">Account Maintenance</span>
                  <span className="text-gray-400 ml-auto">No charge</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-secondary mr-2" />
                  <span className="text-gray-300">Investment Reports</span>
                  <span className="text-gray-400 ml-auto">No charge</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-secondary mr-2" />
                  <span className="text-gray-300">Portfolio Analytics</span>
                  <span className="text-gray-400 ml-auto">No charge</span>
                </div>
              </div>
              
              <div className="bg-background/20 p-4 rounded-lg">
                <p className="text-sm text-gray-300">
                  <strong>Example:</strong> A $1,000 investment would incur a $10 transaction fee at investment and $5 annually in management fees.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Comparison Table */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center">Fee Comparison</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-secondary/10">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Service</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">SeedSMB</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Traditional Business Brokers</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Investment Banks</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Private Equity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-300">Buyer Fee</td>
                  <td className="px-4 py-3 text-sm text-gray-300">3%</td>
                  <td className="px-4 py-3 text-sm text-gray-300">3-5%</td>
                  <td className="px-4 py-3 text-sm text-gray-300">5-7%</td>
                  <td className="px-4 py-3 text-sm text-gray-300">2% + 20% carry</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-300">Seller Fee</td>
                  <td className="px-4 py-3 text-sm text-gray-300">$11,000 flat</td>
                  <td className="px-4 py-3 text-sm text-gray-300">10-12%</td>
                  <td className="px-4 py-3 text-sm text-gray-300">5-10%</td>
                  <td className="px-4 py-3 text-sm text-gray-300">N/A</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-300">Investor Fee</td>
                  <td className="px-4 py-3 text-sm text-gray-300">1% + 0.5% annual</td>
                  <td className="px-4 py-3 text-sm text-gray-300">N/A</td>
                  <td className="px-4 py-3 text-sm text-gray-300">N/A</td>
                  <td className="px-4 py-3 text-sm text-gray-300">2% + 20% carry</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-300">Minimum Deal Size</td>
                  <td className="px-4 py-3 text-sm text-gray-300">$250,000</td>
                  <td className="px-4 py-3 text-sm text-gray-300">$1,000,000+</td>
                  <td className="px-4 py-3 text-sm text-gray-300">$10,000,000+</td>
                  <td className="px-4 py-3 text-sm text-gray-300">$25,000,000+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Value Beyond Fees */}
        <div className="mb-16 bg-primary p-8 rounded-lg">
          <h3 className="text-2xl font-semibold mb-6 text-center">Value Beyond Fees</h3>
          <p className="text-gray-300 mb-4">
            SeedSMB delivers exceptional value beyond our competitive fee structure:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <PlusIcon className="h-5 w-5 text-secondary mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Broader Market Access</h4>
                <p className="text-gray-400 text-sm">Connect with thousands of potential investors instead of a handful</p>
              </div>
            </div>
            <div className="flex items-start">
              <PlusIcon className="h-5 w-5 text-secondary mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Technology Efficiency</h4>
                <p className="text-gray-400 text-sm">Our platform automates many traditionally manual processes</p>
              </div>
            </div>
            <div className="flex items-start">
              <PlusIcon className="h-5 w-5 text-secondary mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Transparency</h4>
                <p className="text-gray-400 text-sm">Real-time visibility into deal progress and investor interest</p>
              </div>
            </div>
            <div className="flex items-start">
              <PlusIcon className="h-5 w-5 text-secondary mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Speed</h4>
                <p className="text-gray-400 text-sm">Average time-to-close of 60-90 days versus 6-12 months through traditional channels</p>
              </div>
            </div>
            <div className="flex items-start">
              <PlusIcon className="h-5 w-5 text-secondary mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Education Resources</h4>
                <p className="text-gray-400 text-sm">Comprehensive guides and support throughout the process</p>
              </div>
            </div>
            <div className="flex items-start">
              <PlusIcon className="h-5 w-5 text-secondary mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Post-Close Support</h4>
                <p className="text-gray-400 text-sm">Ongoing investor relations and reporting tools</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center mb-8">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => window.location.href="/fee-calculator"}>
              Fee Calculator
            </Button>
            <Button variant="outline" onClick={() => window.location.href="/contact"}>
              Schedule Fee Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;