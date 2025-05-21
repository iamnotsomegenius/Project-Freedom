import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import {
  BriefcaseIcon,
  ChartBarIcon,
  AcademicCapIcon,
  LightBulbIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

const FounderPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* SEO Metadata would be handled with React Helmet or similar library */}
        
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-10 mb-16">
          <div className="md:w-1/3">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Costakis Loizou"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 flex justify-center space-x-4">
              <a 
                href="https://www.linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-secondary"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a 
                href="https://twitter.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-secondary"
              >
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold mb-3">Leadership with Vision</h1>
            <h2 className="text-2xl text-secondary mb-6">Meet Costakis Loizou, Founder of SeedSMB</h2>
            <p className="text-gray-300 mb-6">
              Costakis Loizou founded SeedSMB with a singular mission: to democratize access to the lucrative small business acquisition market while solving the pressing challenge of business succession for retiring owners.
            </p>
          </div>
        </div>
        
        {/* Financial Expertise Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6">Financial Expertise Meets Entrepreneurial Drive</h3>
          <p className="text-gray-300 mb-6">
            With over four years of experience in private investments and multiple entrepreneurial ventures, Costakis brings a unique perspective to the small business acquisition landscape. His professional background spans:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <BriefcaseIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Private Credit Expertise</h4>
                <p className="text-gray-400">Current Analyst at Tree Line Capital Partners specializing in lower middle market direct lending</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <ChartBarIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Deal Analysis Professional</h4>
                <p className="text-gray-400">Expert in financial modeling, LBO structuring, and credit assessment for SMB acquisitions</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <EyeIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Investment Evaluation</h4>
                <p className="text-gray-400">Deep experience evaluating business models, capital structures, and growth trajectories</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <ChartBarIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Multi-Industry Exposure</h4>
                <p className="text-gray-400">Worked across diverse industries to understand key success metrics and risk factors</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Entrepreneurial Journey */}
        <div className="mb-16 bg-primary p-8 rounded-lg">
          <h3 className="text-2xl font-semibold mb-6">Entrepreneurial Journey</h3>
          <p className="text-gray-300 mb-6">
            Beyond his financial expertise, Costakis has launched multiple ventures that inform SeedSMB's approach:
          </p>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-2">ATX Lighting & Lawn</h4>
              <p className="text-gray-400">Built a dual-service seasonal business generating over $25,000 from a single client engagement</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Get My Boxes</h4>
              <p className="text-gray-400">Created a recurring-revenue logistics service with $350+ monthly recurring revenue</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Git Prompt</h4>
              <p className="text-gray-400">Developed an AI infrastructure platform enabling transparent sharing of prompt engineering</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Food Filter</h4>
              <p className="text-gray-400">Built a mobile application integrating calorie tracking with food delivery platforms</p>
            </div>
          </div>
        </div>
        
        {/* Education and Background */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6">Education and Background</h3>
          <div className="flex mb-4">
            <div className="mr-4">
              <AcademicCapIcon className="h-8 w-8 text-secondary" />
            </div>
            <div>
              <h4 className="font-medium">Southern Methodist University, BBA</h4>
            </div>
          </div>
          <p className="text-gray-300 mb-4">
            Previous experience at:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Tree Line Capital Partners</li>
            <li>Fidus Capital</li>
            <li>Highwire Capital</li>
            <li>New Century Capital Partners</li>
            <li>El Toro Capital Management</li>
          </ul>
        </div>
        
        {/* Inspiration Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6">The Inspiration Behind SeedSMB</h3>
          <div className="bg-primary p-6 rounded-lg border border-gray-800">
            <div className="flex mb-4">
              <div className="mr-4">
                <LightBulbIcon className="h-8 w-8 text-secondary" />
              </div>
              <div className="italic text-gray-300">
                "I kept seeing two problems that needed solving: retirement-age business owners without succession plans, and everyday investors without access to private business investments. SeedSMB bridges this gap by connecting qualified buyers to retail investors, creating a win-win for all parties involved."
              </div>
            </div>
            <p className="text-right">— Costakis Loizou</p>
          </div>
        </div>
        
        {/* Vision Section */}
        <div className="mb-16 bg-primary p-8 rounded-lg">
          <h3 className="text-2xl font-semibold mb-6">Vision for the Future</h3>
          <p className="text-gray-300">
            Costakis sees SeedSMB becoming the primary marketplace for facilitating the greatest transfer of business wealth in American history—the $4.25 trillion "Silver Tsunami" of Baby Boomer business transitions. By democratizing access to this opportunity, SeedSMB helps address the growing wealth inequality between generations.
          </p>
        </div>
        
        {/* CTA Section */}
        <div className="text-center mb-8">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => window.open('https://www.linkedin.com/', '_blank')}>
              Connect with Costakis on LinkedIn
            </Button>
            <Button variant="outline" onClick={() => window.location.href="/about/mission"}>
              Read the SeedSMB Mission
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderPage;