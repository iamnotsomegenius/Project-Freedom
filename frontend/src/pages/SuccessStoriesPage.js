import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const SuccessStoriesPage = () => {
  const successStories = [
    {
      title: "Mountain View Manufacturing",
      category: "Manufacturing",
      buyerName: "Sarah Chen",
      sellerName: "Robert Thompson",
      dealSize: "$3.15 million",
      fundingRaised: "$1.2 million",
      investorCount: 347,
      closingTime: "52 days",
      image: "https://images.unsplash.com/photo-1533603208999-14810030370c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      businessDescription: "A precision metal fabrication shop with 32 years of operation",
      annualRevenue: "$3.7 million",
      ebitda: "$875,000",
      multiplePaid: "3.6x EBITDA",
      sellerStory: "After building the business for three decades, owner Robert Thompson wanted to retire but had no family succession plan. Traditional brokers estimated a 12-18 month sale process with significant fee erosion.",
      buyerStory: "Sarah Chen, a mechanical engineer with 12 years of industry experience, wanted to purchase the business but faced a $1.2 million funding gap despite SBA pre-approval and personal investment.",
      solution: "Sarah raised $1.2 million through 347 investors on SeedSMB (average investment: $3,458) in 52 days, structured as preferred equity with quarterly distributions.",
      outcome: [
        "Robert received full asking price and completed transition in 90 days",
        "Sarah acquired her dream business with manageable capital structure",
        "Investors are receiving 12% annual distributions with equity upside",
        "All 17 employees retained their jobs with new growth opportunities"
      ]
    },
    {
      title: "Coastal Wellness Center",
      category: "Healthcare",
      buyerName: "Marcus Johnson",
      sellerName: "Elizabeth Green",
      dealSize: "$1.85 million",
      fundingRaised: "$750,000",
      investorCount: 218,
      closingTime: "45 days",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      businessDescription: "An established wellness center with multiple service lines including physical therapy and nutrition counseling",
      annualRevenue: "$1.5 million",
      ebitda: "$420,000",
      multiplePaid: "4.4x EBITDA",
      sellerStory: "After 22 years of operation, Dr. Elizabeth Green was ready to retire but wanted to ensure her practice would continue serving the community. Traditional sale methods were yielding low-ball offers from corporate groups.",
      buyerStory: "Marcus Johnson, a physical therapist with an MBA, wanted to expand from employee to owner but struggled to secure sufficient traditional financing.",
      solution: "Marcus raised $750,000 from 218 investors on SeedSMB in just 45 days, combining with his savings and an SBA loan to complete the acquisition.",
      outcome: [
        "Elizabeth received her desired valuation and a 90-day transition period",
        "Marcus successfully transitioned from employee to owner-operator",
        "Investors are receiving 9% annual returns through a revenue share note",
        "The practice has since grown revenue by 20% under new ownership"
      ]
    },
    {
      title: "Rocky Mountain Outfitters",
      category: "Retail",
      buyerName: "Jessica & David Miller",
      sellerName: "Thomas Wilson",
      dealSize: "$950,000",
      fundingRaised: "$350,000",
      investorCount: 112,
      closingTime: "61 days",
      image: "https://images.unsplash.com/photo-1559076294-ad5d5f283582?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      businessDescription: "A specialty outdoor equipment retailer and tour provider with 15 years of operation",
      annualRevenue: "$1.2 million",
      ebitda: "$210,000",
      multiplePaid: "4.5x EBITDA",
      sellerStory: "Thomas Wilson built the business from scratch but was ready to pursue new adventures. He struggled to find a buyer who shared his passion for the outdoors and commitment to the local community.",
      buyerStory: "Jessica and David Miller, avid outdoor enthusiasts with retail management experience, dreamed of owning their own outfitting business but had limited capital.",
      solution: "The Millers raised $350,000 through 112 SeedSMB investors to combine with their savings and seller financing, closing the deal in 61 days.",
      outcome: [
        "Thomas received 70% cash at closing with the remainder structured as seller financing",
        "The Millers successfully transitioned from corporate retail to business ownership",
        "Investors are receiving 11% returns through a combination of equity and revenue sharing",
        "The business has expanded its online presence, increasing revenue by 35%"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Success Stories</h1>
          <h2 className="text-2xl text-secondary mb-6">Real Deals, Real Results</h2>
          <p className="text-gray-300 text-lg">
            Explore how SeedSMB has helped business buyers, sellers, and investors achieve their goals through our innovative SMB marketplace.
          </p>
        </div>
        
        <div className="space-y-16">
          {successStories.map((story, index) => (
            <div key={index} className="bg-primary rounded-lg overflow-hidden border border-gray-800">
              <div className="md:flex">
                <div className="md:w-2/5">
                  <div className="h-64 md:h-full">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-3/5 p-6">
                  <div className="mb-4">
                    <span className="bg-secondary/20 text-secondary px-2 py-1 rounded text-sm">
                      {story.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{story.title}</h3>
                  <p className="text-gray-300 mb-4">
                    {story.businessDescription}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">Annual Revenue</p>
                      <p className="font-semibold">{story.annualRevenue}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">EBITDA</p>
                      <p className="font-semibold">{story.ebitda}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Purchase Price</p>
                      <p className="font-semibold">{story.dealSize}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Multiple</p>
                      <p className="font-semibold">{story.multiplePaid}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      variant="outline"
                      onClick={() => document.getElementById(`story-${index}`).scrollIntoView({ behavior: 'smooth' })}
                    >
                      View Full Case Study
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {successStories.map((story, index) => (
          <div key={`detail-${index}`} id={`story-${index}`} className="mt-16 mb-24">
            <h2 className="text-3xl font-bold mb-8 text-center">{story.title} Case Study</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-primary p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-secondary">The Seller's Story</h3>
                <p className="text-gray-300">{story.sellerStory}</p>
              </div>
              <div className="bg-primary p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-secondary">The Buyer's Story</h3>
                <p className="text-gray-300">{story.buyerStory}</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">The SeedSMB Solution</h3>
              <div className="bg-primary p-6 rounded-lg">
                <p className="text-gray-300 mb-6">{story.solution}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-secondary text-2xl font-bold">{story.fundingRaised}</p>
                    <p className="text-gray-400 text-sm">Crowdfunding Raised</p>
                  </div>
                  <div>
                    <p className="text-secondary text-2xl font-bold">{story.investorCount}</p>
                    <p className="text-gray-400 text-sm">Investors Participated</p>
                  </div>
                  <div>
                    <p className="text-secondary text-2xl font-bold">{story.closingTime}</p>
                    <p className="text-gray-400 text-sm">Time to Closing</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">The Outcome</h3>
              <div className="bg-primary p-6 rounded-lg">
                <ul className="space-y-2">
                  {story.outcome.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-secondary mr-2">•</span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-300 mb-4">Ready to write your own success story?</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button href="/marketplace">
                  Browse Marketplace
                </Button>
                <Button variant="outline" href="/register">
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStoriesPage;