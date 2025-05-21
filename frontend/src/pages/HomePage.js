import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import FeaturedListingsGrid from '../components/business/FeaturedListingsGrid';
import { useAuthModal } from '../context/AuthModalContext';
import { useAuth } from '../context/AuthContext';

const HeroSection = () => {
  const { openAuthModal } = useAuthModal();
  const { user } = useAuth();
  
  return (
    <div className="bg-primary">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
              Acquisition Capital, <span className="text-secondary">Simplified</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              SeedSMB transforms how buyers access acquisition funding by connecting you directly with thousands of retail investors eager to participate in your deal.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                href="/marketplace"
                className="text-center"
              >
                Browse Marketplace
              </Button>
              {!user && (
                <Button
                  onClick={() => openAuthModal({ mode: 'signup' })}
                  variant="outline"
                  className="text-center"
                >
                  Get Started
                </Button>
              )}
            </div>
          </div>
          <div className="hidden lg:block relative">
            <img
              src="https://images.unsplash.com/photo-1580893246395-52aead8960dc"
              alt="Business handshake"
              className="rounded-lg shadow-lg object-cover h-[500px] w-full"
            />
            <div className="absolute -left-6 -bottom-6 bg-secondary p-4 rounded-lg shadow-lg">
              <p className="text-background font-semibold text-xl">
                $5M+
              </p>
              <p className="text-background text-sm">
                maximum acquisition funding
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HowItWorksSection = () => {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How SeedSMB Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our platform makes it easy to buy, sell, or invest in small businesses through a streamlined process.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-primary p-6 rounded-lg border border-gray-800">
            <div className="bg-secondary/10 w-16 h-16 flex items-center justify-center rounded-full mb-6">
              <span className="text-secondary text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">For Sellers</h3>
            <p className="text-gray-400 mb-4">
              Secure your business legacy by connecting with qualified buyers and maximizing your exit value. Our platform helps ensure your business continues its legacy through a successful ownership transition.
            </p>
            <Link to="/how-it-works/sellers" className="text-secondary hover:underline">
              Learn more →
            </Link>
          </div>
          
          <div className="bg-primary p-6 rounded-lg border border-gray-800">
            <div className="bg-secondary/10 w-16 h-16 flex items-center justify-center rounded-full mb-6">
              <span className="text-secondary text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">For Buyers</h3>
            <p className="text-gray-400 mb-4">
              Fund your small business purchase with retail investment power. Raise up to $5M in debt or equity financing through our Regulation CF platform and complete your capital raise in as little as 45 days.
            </p>
            <Link to="/how-it-works/buyers" className="text-secondary hover:underline">
              Learn more →
            </Link>
          </div>
          
          <div className="bg-primary p-6 rounded-lg border border-gray-800">
            <div className="bg-secondary/10 w-16 h-16 flex items-center justify-center rounded-full mb-6">
              <span className="text-secondary text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">For Investors</h3>
            <p className="text-gray-400 mb-4">
              Own a piece of Main Street with as little as $100. Access high-return private market investments in established small businesses with proven cash flow and build wealth through diversified investments.
            </p>
            <Link to="/how-it-works/investors" className="text-secondary hover:underline">
              Learn more →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsSection = () => {
  return (
    <div className="bg-primary py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center p-6 border border-gray-800 rounded-lg">
            <p className="text-secondary text-3xl font-bold mb-2">35.3%</p>
            <p className="text-gray-300">Average IRR for SMB acquisitions</p>
          </div>
          <div className="text-center p-6 border border-gray-800 rounded-lg">
            <p className="text-secondary text-3xl font-bold mb-2">$100</p>
            <p className="text-gray-300">Minimum investment amount</p>
          </div>
          <div className="text-center p-6 border border-gray-800 rounded-lg">
            <p className="text-secondary text-3xl font-bold mb-2">45 Days</p>
            <p className="text-gray-300">Average funding timeline</p>
          </div>
          <div className="text-center p-6 border border-gray-800 rounded-lg">
            <p className="text-secondary text-3xl font-bold mb-2">$4.25T</p>
            <p className="text-gray-300">Market size of Baby Boomer business transitions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "After 32 years building my distribution company, finding the right buyer seemed impossible. SeedSMB not only found a qualified buyer but helped them secure the funding to give me a full-value exit. The process took just 90 days from listing to closing.",
      author: "Barbara K.",
      role: "Florida, Former Business Owner",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      quote: "After months of struggling to close the gap in my capital stack, SeedSMB helped me raise $1.2M in just 37 days. I now own a profitable manufacturing business that I couldn't have acquired through traditional channels.",
      author: "Michael T.",
      role: "Ohio, Business Buyer",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      quote: "I've always wanted to invest in private businesses but never had the capital or connections. With SeedSMB, I've invested in six different SMBs with just $5,000 total. My first investment is already paying quarterly distributions that exceed what I was earning in my index funds.",
      author: "Jennifer M.",
      role: "California, Investor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
    }
  ];
  
  return (
    <div className="bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real results from people who've successfully used SeedSMB to achieve their business and investment goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-primary p-6 rounded-lg border border-gray-800">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button href="/success-stories">Read More Success Stories</Button>
        </div>
      </div>
    </div>
  );
};

const CTASection = () => {
  return (
    <div className="bg-secondary/10 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Whether you're looking to sell your business, fund your next acquisition, or diversify your investment portfolio, SeedSMB provides the platform and tools you need to succeed.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button href="/marketplace">Browse Marketplace</Button>
          <Button href="/how-it-works" variant="outline">Learn How It Works</Button>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      <div className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-foreground">Featured Business Opportunities</h2>
          <div className="flex gap-4">
            <Button
              variant="primary"
              href="/marketplace"
            >
              Browse All Businesses
            </Button>
          </div>
        </div>
        <FeaturedListingsGrid />
      </div>
      
      <HowItWorksSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default HomePage;