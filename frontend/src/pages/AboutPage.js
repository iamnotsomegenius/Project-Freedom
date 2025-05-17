import React from 'react';
import Button from '../components/ui/Button';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">About SeedSMB</h1>
        <p className="text-center text-gray-400 mb-12">
          Democratizing small business acquisitions and investments
        </p>
        
        <div className="mb-16">
          <img
            src="https://images.unsplash.com/photo-1573497701175-00c200fd57f0"
            alt="SeedSMB Team"
            className="w-full h-72 object-cover rounded-lg mb-8"
          />
          
          <h2 className="text-2xl font-semibold mb-4 text-secondary">Our Mission</h2>
          <p className="text-gray-300 mb-4">
            SeedSMB was founded with a simple but powerful mission: to democratize access to small business 
            ownership and investment opportunities. We believe that buying, selling, and investing in small 
            businesses should be accessible to everyone, not just those with extensive networks or deep pockets.
          </p>
          <p className="text-gray-300 mb-4">
            By leveraging Regulation CF crowdfunding and creating a transparent marketplace, we're opening doors 
            for entrepreneurs to find the right buyers, for buyers to discover ideal acquisition targets, and for 
            everyday investors to participate in the growth of small businesses with as little as $100.
          </p>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-secondary">Our Story</h2>
          <p className="text-gray-300 mb-4">
            SeedSMB began in 2023 when our founders, a team of entrepreneurs and technologists, recognized a 
            significant gap in the market. While large businesses had access to sophisticated M&A processes and 
            public markets, small business owners often struggled to find buyers, secure fair valuations, or 
            access alternative funding options.
          </p>
          <p className="text-gray-300 mb-4">
            Having personally experienced the challenges of buying and selling small businesses, our team set out 
            to build a platform that would solve these problems. We combined our expertise in finance, technology, 
            and business operations to create a marketplace that brings transparency, efficiency, and accessibility 
            to SMB acquisitions and investments.
          </p>
          <p className="text-gray-300">
            Since our launch, we've helped hundreds of business owners find new paths forward, whether through 
            complete acquisitions or creative funding solutions that allow them to retain control while accessing growth capital.
          </p>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-secondary">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-primary p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Transparency</h3>
              <p className="text-gray-400">
                We believe in full disclosure and clear communication. From business financials to platform fees, 
                we ensure all information is accessible and understandable.
              </p>
            </div>
            <div className="bg-primary p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Accessibility</h3>
              <p className="text-gray-400">
                Business ownership and investment shouldn't be limited to the wealthy or well-connected. 
                We're removing barriers to entry for buyers, sellers, and investors.
              </p>
            </div>
            <div className="bg-primary p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Innovation</h3>
              <p className="text-gray-400">
                We continuously develop new tools and approaches to make business transactions more efficient, 
                secure, and beneficial for all parties involved.
              </p>
            </div>
            <div className="bg-primary p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Community</h3>
              <p className="text-gray-400">
                We're building a community of entrepreneurs, investors, and business enthusiasts who support 
                each other and contribute to a thriving small business ecosystem.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-secondary">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
                alt="James Wilson"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-medium text-lg">James Wilson</h3>
              <p className="text-gray-400">CEO & Co-Founder</p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
                alt="Sarah Chen"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-medium text-lg">Sarah Chen</h3>
              <p className="text-gray-400">CTO & Co-Founder</p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
                alt="Michael Rodriguez"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-medium text-lg">Michael Rodriguez</h3>
              <p className="text-gray-400">COO & Co-Founder</p>
            </div>
          </div>
        </div>
        
        <div className="bg-primary p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Join Our Mission</h2>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto">
            Whether you're looking to sell your business, find your next acquisition, or invest in promising small 
            businesses, SeedSMB provides the platform and tools you need to succeed.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button href="/marketplace">
              Explore Marketplace
            </Button>
            <Button href="/contact" variant="outline">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
