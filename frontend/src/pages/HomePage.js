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
              The Marketplace for SMB <span className="text-secondary">Acquisitions</span> and <span className="text-secondary">Investments</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Connect with small business sellers, make offers, and invest in businesses with as little as $100 through Regulation Crowdfunding.
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
                  List Your Business
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
                $2.5M+
              </p>
              <p className="text-background text-sm">
                in business transactions
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
              Create a comprehensive listing for your business with financial details and funding structure.
            </p>
            <Link to="/how-it-works" className="text-secondary hover:underline">
              Learn more →
            </Link>
          </div>
          
          <div className="bg-primary p-6 rounded-lg border border-gray-800">
            <div className="bg-secondary/10 w-16 h-16 flex items-center justify-center rounded-full mb-6">
              <span className="text-secondary text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">For Buyers</h3>
            <p className="text-gray-400 mb-4">
              Browse available businesses, make offers, and complete acquisitions with our streamlined tools.
            </p>
            <Link to="/how-it-works" className="text-secondary hover:underline">
              Learn more →
            </Link>
          </div>
          
          <div className="bg-primary p-6 rounded-lg border border-gray-800">
            <div className="bg-secondary/10 w-16 h-16 flex items-center justify-center rounded-full mb-6">
              <span className="text-secondary text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">For Investors</h3>
            <p className="text-gray-400 mb-4">
              Invest in small businesses with as little as $100 through Regulation Crowdfunding.
            </p>
            <Link to="/how-it-works" className="text-secondary hover:underline">
              Learn more →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "SeedSMB made selling my business a streamlined process. I received multiple offers within weeks of listing.",
      author: "Sarah Johnson",
      role: "Former Business Owner",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      quote: "The platform's transparent approach to business acquisition gave me confidence to make my first purchase.",
      author: "Michael Chen",
      role: "Business Buyer",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      quote: "Being able to invest in local businesses with a small amount has changed how I think about my investment portfolio.",
      author: "Alex Rivera",
      role: "Investor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
    }
  ];
  
  return (
    <div className="bg-primary py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from the people who've successfully used SeedSMB.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-background p-6 rounded-lg">
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
              <p className="text-foreground">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button href="/about">Learn More About Us</Button>
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
          <h2 className="text-2xl font-bold text-foreground">Featured Businesses</h2>
          <div className="flex gap-4">
            <Button
              variant="primary"
              href="/marketplace"
            >
              Browse All Businesses
            </Button>
            <Button
              variant="outline"
              href="/list-business"
            >
              List Your Business
            </Button>
          </div>
        </div>
        <FeaturedListingsGrid />
      </div>
      
      <HowItWorksSection />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;
