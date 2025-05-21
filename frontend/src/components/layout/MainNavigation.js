import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useAuthModal } from '../../context/AuthModalContext';
import UserMenu from './UserMenu';
import Logo from './Logo';
import SplitAuthButton from '../ui/SplitAuthButton';

// Dropdown component for navigation menus
const NavDropdown = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  
  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsOpen(true);
  };
  
  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setIsOpen(false);
    }, 300); // 300ms delay before closing
    setTimeoutId(id);
  };
  
  return (
    <div 
      className="relative" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="flex items-center gap-1 text-foreground hover:text-secondary py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDownIcon className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-0 w-48 bg-primary border border-gray-800 rounded-md shadow-lg py-2 z-50">
          {children}
        </div>
      )}
    </div>
  );
};

const NavLink = ({ href, children, className = '' }) => (
  <Link
    to={href}
    className={`nav-link ${className}`}
  >
    {children}
  </Link>
);

const DropdownLink = ({ href, children }) => (
  <Link 
    to={href} 
    className="block px-4 py-2.5 text-sm text-foreground hover:bg-gray-800 hover:text-secondary"
  >
    {children}
  </Link>
);

const MobileMenu = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  
  return (
    <div
      className={`fixed inset-0 z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-64 bg-primary shadow-lg">
        <div className="flex justify-end p-4">
          <button
            className="text-gray-400 hover:text-foreground"
            onClick={onClose}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-4">
          <nav className="flex flex-col space-y-4">
            <div className="border-b border-gray-800 pb-2">
              <div className="text-lg font-medium mb-2">How It Works</div>
              <div className="pl-4 space-y-2">
                <Link to="/how-it-works/buyers" className="block text-gray-400 hover:text-secondary">For Buyers</Link>
                <Link to="/how-it-works/sellers" className="block text-gray-400 hover:text-secondary">For Sellers</Link>
                <Link to="/how-it-works/investors" className="block text-gray-400 hover:text-secondary">For Investors</Link>
                <Link to="/how-it-works/regulatory" className="block text-gray-400 hover:text-secondary">Regulatory Framework</Link>
                <Link to="/how-it-works/pricing" className="block text-gray-400 hover:text-secondary">Pricing</Link>
              </div>
            </div>
            
            <div className="border-b border-gray-800 pb-2">
              <div className="text-lg font-medium mb-2">About Us</div>
              <div className="pl-4 space-y-2">
                <Link to="/about/founder" className="block text-gray-400 hover:text-secondary">Founder</Link>
                <Link to="/about/mission" className="block text-gray-400 hover:text-secondary">Mission</Link>
              </div>
            </div>
            
            <div className="border-b border-gray-800 pb-2">
              <div className="text-lg font-medium mb-2">Marketplace</div>
              <div className="pl-4 space-y-2">
                <Link to="/marketplace" className="block text-gray-400 hover:text-secondary">Browse Deals</Link>
                <Link to="/dashboard/investments" className="block text-gray-400 hover:text-secondary">Investment Portfolio</Link>
                <Link to="/resources" className="block text-gray-400 hover:text-secondary">Resources</Link>
              </div>
            </div>
          </nav>
          
          <div className="mt-8 space-y-4">
            {user ? (
              <>
                {user.user_type === 'SELLER' && (
                  <Button 
                    href="/dashboard/seller/create-listing"
                    variant="outline"
                    className="w-full"
                  >
                    List Business
                  </Button>
                )}
                <Link 
                  to="/dashboard" 
                  className="block px-4 py-2 text-foreground hover:bg-gray-800 rounded-md"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => {
                    onClose();
                    useAuth().logout();
                  }}
                  className="block px-4 py-2 text-foreground hover:bg-gray-800 rounded-md w-full text-left"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <SplitAuthButton mobileView={true} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MainNavigation = () => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-primary/95 sticky top-0 z-40 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <Logo className="h-8 w-auto" />
            <span className="ml-2 font-bold text-lg text-foreground">SeedSMB</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {/* How It Works Dropdown */}
            <NavDropdown title="How It Works">
              <DropdownLink href="/how-it-works/buyers">For Buyers</DropdownLink>
              <DropdownLink href="/how-it-works/sellers">For Sellers</DropdownLink>
              <DropdownLink href="/how-it-works/investors">For Investors</DropdownLink>
              <DropdownLink href="/how-it-works/regulatory">Regulatory Framework</DropdownLink>
              <DropdownLink href="/how-it-works/pricing">Pricing</DropdownLink>
            </NavDropdown>
            
            {/* About Us Dropdown */}
            <NavDropdown title="About Us">
              <DropdownLink href="/about/founder">Founder</DropdownLink>
              <DropdownLink href="/about/mission">Mission</DropdownLink>
            </NavDropdown>
            
            {/* Marketplace Dropdown */}
            <NavDropdown title="Marketplace">
              <DropdownLink href="/marketplace">Browse Deals</DropdownLink>
              <DropdownLink href="/dashboard/investments">Investment Portfolio</DropdownLink>
              <DropdownLink href="/resources">Resources</DropdownLink>
            </NavDropdown>
          </nav>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {user.user_type === 'SELLER' && (
                  <Button 
                    href="/dashboard/seller/create-listing"
                    variant="outline"
                    className="hidden md:block border-secondary text-secondary hover:bg-secondary/10"
                  >
                    List Business
                  </Button>
                )}
                <UserMenu />
              </>
            ) : (
              <div className="hidden md:block">
                <SplitAuthButton />
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden text-gray-400 hover:text-foreground"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
    </header>
  );
};

export default MainNavigation;