import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import {
  DocumentTextIcon,
  DocumentCheckIcon,
  CalculatorIcon,
  ClipboardDocumentListIcon,
  AcademicCapIcon,
  ChartBarIcon,
  VideoCameraIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

const ResourceCard = ({ icon: Icon, title, description, buttonText, buttonLink }) => {
  return (
    <div className="bg-primary p-6 rounded-lg border border-gray-800">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <Icon className="h-8 w-8 text-secondary" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-6 flex-grow">{description}</p>
        <div className="mt-auto">
          <Button 
            href={buttonLink} 
            variant="outline" 
            size="sm" 
            className="w-full"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

const ResourceCenterPage = () => {
  const [activeTab, setActiveTab] = useState('buyers');
  
  const buyerResources = [
    {
      icon: DocumentTextIcon,
      title: "How to Value a Small Business",
      description: "Learn multiple approaches to determining the fair market value of a business you're considering acquiring.",
      buttonText: "Read Guide",
      buttonLink: "/resources/business-valuation-guide"
    },
    {
      icon: DocumentCheckIcon,
      title: "Letter of Intent (LOI) Template",
      description: "Download our professional, attorney-reviewed LOI template for business acquisitions.",
      buttonText: "Download Template",
      buttonLink: "/resources/loi-template"
    },
    {
      icon: CalculatorIcon,
      title: "Deal Structure Analyzer",
      description: "Interactive tool to evaluate different combinations of debt, equity, and seller financing.",
      buttonText: "Use Calculator",
      buttonLink: "/resources/deal-structure-calculator"
    },
    {
      icon: ClipboardDocumentListIcon,
      title: "Due Diligence Checklist",
      description: "Comprehensive checklist covering all aspects of business acquisition due diligence.",
      buttonText: "Download Checklist",
      buttonLink: "/resources/due-diligence-checklist"
    },
    {
      icon: AcademicCapIcon,
      title: "Reading Financial Statements",
      description: "Tutorial on how to analyze and interpret financial statements for acquisition targets.",
      buttonText: "View Tutorial",
      buttonLink: "/resources/financial-statement-analysis"
    },
    {
      icon: ChartBarIcon,
      title: "Financing Options Comparison",
      description: "Compare SBA loans, seller financing, and crowdfunding approaches for your acquisition.",
      buttonText: "View Comparison",
      buttonLink: "/resources/financing-comparison"
    }
  ];
  
  const sellerResources = [
    {
      icon: DocumentTextIcon,
      title: "Maximizing Business Valuation",
      description: "Strategies to enhance your business value before taking it to market.",
      buttonText: "Read Guide",
      buttonLink: "/resources/maximizing-valuation"
    },
    {
      icon: DocumentCheckIcon,
      title: "Confidential Information Memorandum",
      description: "Template and guide for creating a professional CIM to present to potential buyers.",
      buttonText: "Download Template",
      buttonLink: "/resources/cim-template"
    },
    {
      icon: CalculatorIcon,
      title: "Exit Proceeds Calculator",
      description: "Estimate your net proceeds after taxes, fees, and other transaction costs.",
      buttonText: "Use Calculator",
      buttonLink: "/resources/exit-proceeds-calculator"
    },
    {
      icon: ClipboardDocumentListIcon,
      title: "Sale Preparation Timeline",
      description: "Month-by-month checklist for preparing your business for sale.",
      buttonText: "Download Timeline",
      buttonLink: "/resources/sale-preparation-timeline"
    },
    {
      icon: AcademicCapIcon,
      title: "Clean Financial Recordkeeping",
      description: "Tutorial on organizing and cleaning up your financial records to maximize value.",
      buttonText: "View Tutorial",
      buttonLink: "/resources/financial-cleanup-guide"
    },
    {
      icon: ChartBarIcon,
      title: "Exit Options Comparison",
      description: "Compare full sale, partial sale, ESOP, and other exit alternatives.",
      buttonText: "View Comparison",
      buttonLink: "/resources/exit-options-comparison"
    }
  ];
  
  const investorResources = [
    {
      icon: DocumentTextIcon,
      title: "Evaluating SMB Investments",
      description: "Learn how to assess small business investment opportunities like a professional.",
      buttonText: "Read Guide",
      buttonLink: "/resources/smb-investment-evaluation"
    },
    {
      icon: DocumentCheckIcon,
      title: "Investment Portfolio Tracker",
      description: "Download our spreadsheet template for tracking your SeedSMB investments.",
      buttonText: "Download Template",
      buttonLink: "/resources/portfolio-tracker"
    },
    {
      icon: CalculatorIcon,
      title: "Return Projections Calculator",
      description: "Calculate potential IRR and cash-on-cash returns for different investment scenarios.",
      buttonText: "Use Calculator",
      buttonLink: "/resources/return-calculator"
    },
    {
      icon: ClipboardDocumentListIcon,
      title: "Investment Due Diligence",
      description: "Checklist for evaluating small business investment opportunities.",
      buttonText: "Download Checklist",
      buttonLink: "/resources/investor-due-diligence"
    },
    {
      icon: AcademicCapIcon,
      title: "Understanding Term Sheets",
      description: "Tutorial on reading and evaluating different investment structures and terms.",
      buttonText: "View Tutorial",
      buttonLink: "/resources/term-sheet-guide"
    },
    {
      icon: ChartBarIcon,
      title: "Asset Class Comparison",
      description: "Compare historical returns of SMB investments versus stocks, bonds, and real estate.",
      buttonText: "View Comparison",
      buttonLink: "/resources/asset-class-comparison"
    }
  ];
  
  const upcomingWebinars = [
    {
      title: "Live Deal Analysis",
      description: "Join our experts as they analyze a current marketplace opportunity with Q&A session.",
      date: "May 18, 2023",
      time: "2:00 PM ET",
      registerLink: "/webinars/deal-analysis-may"
    },
    {
      title: "Market Trends in SMB Acquisitions",
      description: "Quarterly update on market conditions, multiples, and industry trends.",
      date: "June 12, 2023",
      time: "1:00 PM ET",
      registerLink: "/webinars/q2-market-trends"
    },
    {
      title: "Office Hours with Acquisition Experts",
      description: "Open Q&A session with experienced small business buyers and advisors.",
      date: "May 25, 2023",
      time: "3:00 PM ET",
      registerLink: "/webinars/office-hours-may"
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Resource Center</h1>
          <h2 className="text-2xl text-secondary mb-6">Knowledge That Powers Successful Transitions</h2>
          <p className="text-gray-300 text-lg">
            Access our comprehensive library of guides, templates, calculators, and educational resources designed to help you navigate the small business acquisition landscape.
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
        
        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {activeTab === 'buyers' && buyerResources.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
          ))}
          
          {activeTab === 'sellers' && sellerResources.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
          ))}
          
          {activeTab === 'investors' && investorResources.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
          ))}
        </div>
        
        {/* Webinars Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <VideoCameraIcon className="h-8 w-8 text-secondary mr-3" />
            <h2 className="text-2xl font-semibold">Upcoming Webinars & Events</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingWebinars.map((webinar, index) => (
              <div key={index} className="bg-primary p-6 rounded-lg border border-gray-800">
                <div className="flex items-start mb-4">
                  <CalendarIcon className="h-6 w-6 text-secondary mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">{webinar.date}</p>
                    <p className="text-gray-400 text-sm">{webinar.time}</p>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{webinar.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{webinar.description}</p>
                <Button 
                  href={webinar.registerLink} 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                >
                  Register
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Request Section */}
        <div className="bg-secondary/10 p-8 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-4">Can't Find What You're Looking For?</h3>
          <p className="text-gray-300 mb-6">
            We're constantly adding new resources based on community needs. Let us know what would help you succeed.
          </p>
          <Button href="/resources/request" variant="outline">
            Request a Resource
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCenterPage;