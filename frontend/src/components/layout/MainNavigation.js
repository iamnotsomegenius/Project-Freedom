import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useAuthModal } from '../../context/AuthModalContext';
import UserMenu from './UserMenu';
import Logo from './Logo';

const NavLink = ({ href, children, className = '' }) => (
  <Link
    to={href}
    className={`nav-link ${className}`}
  >
    {children}
  </Link>
);

const MobileMenu = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { openAuthModal } = useAuthModal();
  
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
            <NavLink href="/marketplace" className="text-lg">Marketplace</NavLink>
            <NavLink href="/how-it-works" className="text-lg">How It Works</NavLink>
            <NavLink href="/about" className="text-lg">About</NavLink>
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
              <>
                <Button 
                  onClick={() => {
                    onClose();
                    openAuthModal({ mode: 'signin' });
                  }}
                  variant="ghost"
                  className="w-full"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => {
                    onClose();
                    openAuthModal({ mode: 'signup' });
                  }}
                  className="w-full"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MainNavigation = () => {
  const { user } = useAuth();
  const { openAuthModal } = useAuthModal();
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
            <NavLink href="/marketplace">Marketplace</NavLink>
            <NavLink href="/how-it-works">How It Works</NavLink>
            <NavLink href="/about">About</NavLink>
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
              <>
                <Button 
                  onClick={() => openAuthModal({ mode: 'signin' })}
                  variant="ghost"
                  className="hidden md:block text-foreground hover:bg-gray-800"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => openAuthModal({ mode: 'signup' })}
                  className="hidden md:block bg-secondary hover:bg-secondary/90 text-background"
                >
                  Get Started
                </Button>
              </>
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
