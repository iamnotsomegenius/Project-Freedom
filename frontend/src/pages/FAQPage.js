import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-800 last:border-b-0">
      <button
        className="w-full text-left py-4 flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-lg">{question}</span>
        {isOpen ? (
          <ChevronUpIcon className="h-5 w-5 text-secondary" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-secondary" />
        )}
      </button>
      
      {isOpen && (
        <div className="pb-4 text-gray-300">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  const generalFaqs = [
    {
      question: "What is SeedSMB?",
      answer: "SeedSMB is the first crowdfunding platform specifically designed for small business acquisitions. We connect qualified buyers with retail investors to fund the purchase of established, profitable businesses, while helping business owners find suitable succession plans."
    },
    {
      question: "How is SeedSMB different from other investment platforms?",
      answer: "Unlike platforms that focus on startups or only serve accredited investors, SeedSMB enables everyday investors to participate in small business acquisitions starting at just $100. We focus exclusively on established businesses with proven cash flow and profitability."
    },
    {
      question: "Is SeedSMB regulated?",
      answer: "Yes, SeedSMB operates as a FINRA-registered funding portal under SEC Regulation Crowdfunding (Reg CF), allowing us to facilitate investments from both accredited and non-accredited investors."
    },
    {
      question: "What types of businesses are on the SeedSMB marketplace?",
      answer: "SeedSMB focuses on established small businesses with annual revenues between $500,000 and $10 million, and EBITDA of $250,000 to $3 million. These typically include service businesses, manufacturing, distribution, and other Main Street enterprises with proven track records."
    },
    {
      question: "What are the fees for using SeedSMB?",
      answer: "Our fee structure is designed to align interests across all platform participants. Buyers pay a 3% success fee only upon successful funding and closing. Sellers pay a $1,000 listing fee and a $10,000 advisory fee upon closing. Investors pay a 1% transaction fee capped at $50 per investment and a 0.5% annual management fee. Visit our Pricing page for more details."
    }
  ];
  
  const buyerFaqs = [
    {
      question: "What types of businesses can I acquire through SeedSMB?",
      answer: "SeedSMB focuses on established small businesses with annual revenues between $500,000 and $10 million, and EBITDA of $250,000 to $3 million. These typically include service businesses, manufacturing, distribution, and other Main Street enterprises with proven track records."
    },
    {
      question: "How much funding can I raise on SeedSMB?",
      answer: "You can raise up to $5 million through our platform, in accordance with SEC Regulation Crowdfunding limits. This can be structured as debt, equity, or a combination based on your acquisition needs."
    },
    {
      question: "Do I need to be accredited to buy a business through SeedSMB?",
      answer: "No, you don't need to be an accredited investor to buy a business through SeedSMB. However, you will need to demonstrate relevant experience and the ability to operate the business successfully. Our vetting process evaluates your background, industry knowledge, and financial capacity."
    },
    {
      question: "How long does it typically take to fund an acquisition?",
      answer: "Most acquisitions on SeedSMB are funded within 45-90 days, significantly faster than traditional financing options which often take 6+ months. The exact timeline depends on factors like deal size, industry, and business specifics."
    },
    {
      question: "What if I don't raise the full amount needed?",
      answer: "SeedSMB operates on an all-or-nothing model. If you don't reach your funding target by the campaign deadline, all investor funds are returned, and you can either restructure your campaign or explore alternative funding options."
    }
  ];
  
  const sellerFaqs = [
    {
      question: "How long does it typically take to sell my business through SeedSMB?",
      answer: "While every business is unique, our typical timeline from listing to closing ranges from 60-120 days, significantly faster than the traditional business sale process which averages 6-12 months."
    },
    {
      question: "Is my business information kept confidential during the sale process?",
      answer: "Yes, we take confidentiality very seriously. Your business listing shows only high-level information without identifying details. Potential buyers must sign NDAs and be pre-approved before accessing your confidential information memorandum and detailed financials."
    },
    {
      question: "What types of businesses are a good fit for SeedSMB?",
      answer: "Ideal businesses for SeedSMB have annual revenues of $500K-$10M, at least 3 years of operational history, demonstrable profitability, and clear financial records. We work with businesses across most industries, with particular strength in service businesses, manufacturing, distribution, and professional services."
    },
    {
      question: "How is my business valued on SeedSMB?",
      answer: "We use industry-standard valuation methodologies including multiples of EBITDA/SDE, discounted cash flow analysis, and comparable transaction analysis. Our team works with you to determine a fair market value based on your financial performance, growth potential, industry trends, and market conditions."
    },
    {
      question: "What happens after my business is listed?",
      answer: "Once listed, your business is marketed to our network of pre-qualified buyers and investors. Our platform facilitates secure document sharing, due diligence, and communication between parties. When a qualified buyer expresses interest, we help facilitate introductions and negotiations."
    }
  ];
  
  const investorFaqs = [
    {
      question: "How much can I invest through SeedSMB?",
      answer: "You can start with as little as $100 per deal. Maximum investment limits are determined by SEC regulations based on your income and net worth. Our platform will automatically calculate your limits during the investment process."
    },
    {
      question: "How are returns generated from SMB investments?",
      answer: "Returns can come in several forms depending on the deal structure: dividend/profit distributions, revenue sharing payments, interest payments on debt instruments, or equity appreciation realized through a future sale or refinancing event."
    },
    {
      question: "What are the risks of investing in small businesses?",
      answer: "Small business investments carry risks including business failure, economic downturns, management changes, and limited liquidity. Unlike public stocks, there isn't a secondary market to easily sell your investment. We recommend diversifying across multiple investments and only investing amounts you can afford to lose."
    },
    {
      question: "How does SeedSMB vet businesses before listing them?",
      answer: "Our due diligence process includes financial statement verification, operational assessment, legal compliance review, market analysis, and management evaluation. We only list businesses with strong track records, clear financial documentation, and reasonable valuation expectations."
    },
    {
      question: "Can I sell my investment if I need liquidity?",
      answer: "Small business investments are generally illiquid. While some deal structures may include buyback provisions or dividend streams, you should plan to hold your investment for the full term (typically 3-7 years). We're developing a secondary marketplace to facilitate investor-to-investor transactions in the future."
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Frequently Asked Questions</h1>
          <h2 className="text-2xl text-secondary mb-6">Everything You Need to Know About SeedSMB</h2>
          <p className="text-gray-300 text-lg">
            Find answers to commonly asked questions about using SeedSMB's platform for small business acquisitions and investments.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="inline-flex p-1 bg-primary rounded-lg">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                activeTab === 'general' ? 'bg-secondary text-background' : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('general')}
            >
              General
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                activeTab === 'buyers' ? 'bg-secondary text-background' : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('buyers')}
            >
              For Buyers
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                activeTab === 'sellers' ? 'bg-secondary text-background' : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('sellers')}
            >
              For Sellers
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                activeTab === 'investors' ? 'bg-secondary text-background' : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('investors')}
            >
              For Investors
            </button>
          </div>
        </div>
        
        {/* FAQ Items */}
        <div className="bg-primary rounded-lg p-6 mb-12">
          <div className="space-y-0">
            {activeTab === 'general' && generalFaqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
            
            {activeTab === 'buyers' && buyerFaqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
            
            {activeTab === 'sellers' && sellerFaqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
            
            {activeTab === 'investors' && investorFaqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
        
        {/* Contact Section */}
        <div className="bg-secondary/10 p-8 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-4">Still Have Questions?</h3>
          <p className="text-gray-300 mb-6">
            We're here to help! Contact our team for personalized assistance with any questions you might have about using SeedSMB.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/contact">
              Contact Us
            </Button>
            <Button variant="outline" href="/schedule">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;