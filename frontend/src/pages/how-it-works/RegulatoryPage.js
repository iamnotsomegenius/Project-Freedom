import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import {
  DocumentTextIcon,
  ShieldCheckIcon,
  ScaleIcon,
  UserGroupIcon,
  LockClosedIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';

const RegulatoryPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* SEO Metadata would be handled with React Helmet or similar library */}
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Regulatory Innovation at Work</h1>
          <h2 className="text-2xl text-secondary mb-6">How Modern Securities Regulations Enable Democratic Investing</h2>
          <p className="text-gray-300 text-lg">
            SeedSMB operates within a carefully designed regulatory framework that balances investor protection with capital formation opportunities. Our platform leverages recent regulatory innovations to democratize access to private market investments.
          </p>
        </div>
        
        {/* Reg CF Section */}
        <div className="mb-16 bg-primary p-8 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Regulation Crowdfunding (Reg CF)</h3>
          <p className="text-gray-300 mb-6">
            Enacted under Title III of the JOBS Act, Regulation Crowdfunding allows companies to raise up to $5 million annually from both accredited and non-accredited investors through SEC-registered platforms like SeedSMB.
          </p>
          
          <h4 className="font-semibold mb-4">Key Features:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <UserGroupIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h5 className="font-medium mb-1">Inclusive Participation</h5>
                <p className="text-gray-400 text-sm">Both accredited and non-accredited investors can participate</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <ScaleIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h5 className="font-medium mb-1">Investment Limits</h5>
                <p className="text-gray-400 text-sm">Protections ensure investors don't overextend (typically 5-10% of annual income or net worth)</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <DocumentTextIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h5 className="font-medium mb-1">Disclosure Requirements</h5>
                <p className="text-gray-400 text-sm">Standardized financial and business disclosures</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <ShieldCheckIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h5 className="font-medium mb-1">Regulatory Oversight</h5>
                <p className="text-gray-400 text-sm">SeedSMB maintains FINRA registration as a funding portal</p>
              </div>
            </div>
            <div className="flex items-start md:col-span-2">
              <div className="mr-4 mt-1">
                <DocumentDuplicateIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h5 className="font-medium mb-1">Investor Education</h5>
                <p className="text-gray-400 text-sm">Required educational materials before investment</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Investment Limits */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center">Investment Limits for Your Protection</h3>
          <p className="text-gray-300 mb-4">
            Reg CF establishes prudent investment limits based on your financial situation:
          </p>
          <div className="space-y-6 bg-primary p-6 rounded-lg">
            <div>
              <h4 className="font-medium mb-2">If your annual income or net worth is below $124,000:</h4>
              <p className="text-gray-400">
                You may invest the greater of $2,500 or 5% of the lesser of your annual income or net worth during any 12-month period.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">If both your annual income and net worth are above $124,000:</h4>
              <p className="text-gray-400">
                You may invest up to 10% of the lesser of your annual income or net worth during any 12-month period, not to exceed $124,000.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Accredited Investors:</h4>
              <p className="text-gray-400">
                No investment limits apply.
              </p>
            </div>
          </div>
        </div>
        
        {/* Deal Structure */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center">Deal Structure Options</h3>
          <p className="text-gray-300 mb-4">
            SeedSMB offers various SEC-compliant investment structures:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-primary rounded-lg border border-gray-800">
              <h4 className="font-medium mb-2 text-secondary">Common Equity</h4>
              <p className="text-gray-400 text-sm">Direct ownership stake in the acquiring entity</p>
            </div>
            <div className="p-4 bg-primary rounded-lg border border-gray-800">
              <h4 className="font-medium mb-2 text-secondary">Preferred Equity</h4>
              <p className="text-gray-400 text-sm">Ownership with liquidation preferences and dividend rights</p>
            </div>
            <div className="p-4 bg-primary rounded-lg border border-gray-800">
              <h4 className="font-medium mb-2 text-secondary">Revenue Share Notes</h4>
              <p className="text-gray-400 text-sm">Debt instruments with repayment tied to business revenue</p>
            </div>
            <div className="p-4 bg-primary rounded-lg border border-gray-800">
              <h4 className="font-medium mb-2 text-secondary">Convertible Notes</h4>
              <p className="text-gray-400 text-sm">Debt instruments that may convert to equity upon certain events</p>
            </div>
          </div>
        </div>
        
        {/* Investor Protections */}
        <div className="mb-16 bg-primary p-8 rounded-lg">
          <h3 className="text-2xl font-semibold mb-6 text-center">Investor Protections</h3>
          <p className="text-gray-300 mb-4">
            SeedSMB implements multiple safeguards to protect investors:
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <ShieldCheckIcon className="h-6 w-6 text-secondary mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-300">
                <strong className="font-medium">Escrow Services:</strong> All funds held in regulated escrow until funding goal is reached
              </span>
            </li>
            <li className="flex items-start">
              <ShieldCheckIcon className="h-6 w-6 text-secondary mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-300">
                <strong className="font-medium">All-or-Nothing Model:</strong> If funding goal isn't met, all investor funds are returned
              </span>
            </li>
            <li className="flex items-start">
              <ShieldCheckIcon className="h-6 w-6 text-secondary mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-300">
                <strong className="font-medium">Standardized Disclosures:</strong> Consistent format for reviewing deal information
              </span>
            </li>
            <li className="flex items-start">
              <ShieldCheckIcon className="h-6 w-6 text-secondary mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-300">
                <strong className="font-medium">Cooling-Off Period:</strong> Investors may cancel investments up to 48 hours before the offering deadline
              </span>
            </li>
            <li className="flex items-start">
              <ShieldCheckIcon className="h-6 w-6 text-secondary mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-300">
                <strong className="font-medium">Annual Reporting:</strong> Ongoing business performance updates for investors
              </span>
            </li>
          </ul>
        </div>
        
        {/* Compliance Leadership */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center">Compliance Leadership</h3>
          <p className="text-gray-300 mb-4">
            SeedSMB maintains strict compliance with all applicable regulations:
          </p>
          <div className="bg-primary p-6 rounded-lg">
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <LockClosedIcon className="h-5 w-5 text-secondary mr-2" />
                FINRA-registered funding portal
              </li>
              <li className="flex items-center">
                <LockClosedIcon className="h-5 w-5 text-secondary mr-2" />
                SEC-compliant offering documents
              </li>
              <li className="flex items-center">
                <LockClosedIcon className="h-5 w-5 text-secondary mr-2" />
                Anti-money laundering (AML) protocols
              </li>
              <li className="flex items-center">
                <LockClosedIcon className="h-5 w-5 text-secondary mr-2" />
                Know-your-customer (KYC) verification
              </li>
              <li className="flex items-center">
                <LockClosedIcon className="h-5 w-5 text-secondary mr-2" />
                Secure data handling and privacy protections
              </li>
            </ul>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center mb-8">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => window.location.href="/download/regulatory-guide"}>
              Download Regulatory Guide
            </Button>
            <Button variant="outline" onClick={() => window.location.href="/investor-education"}>
              Investor Education Center
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegulatoryPage;