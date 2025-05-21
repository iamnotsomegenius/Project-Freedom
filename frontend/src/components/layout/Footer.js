import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-primary border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center">
              <Logo className="h-8 w-auto" />
              <span className="ml-2 font-bold text-xl text-foreground">SeedSMB</span>
            </Link>
            <p className="mt-4 text-gray-400 text-sm">
              Democratizing small business acquisitions and investments. 
              SeedSMB connects qualified buyers with retail investors to fund SMB acquisitions quickly and efficiently.
            </p>
            <div className="mt-4">
              <p className="text-sm text-gray-400">
                <span className="text-secondary">FINRA</span> registered funding portal
              </p>
              <p className="text-sm text-gray-400">
                Operating under <span className="text-secondary">SEC Regulation Crowdfunding</span>
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-foreground font-medium mb-4">How It Works</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/how-it-works/buyers" className="text-gray-400 hover:text-secondary text-sm">
                  For Buyers
                </Link>
              </li>
              <li>
                <Link to="/how-it-works/sellers" className="text-gray-400 hover:text-secondary text-sm">
                  For Sellers
                </Link>
              </li>
              <li>
                <Link to="/how-it-works/investors" className="text-gray-400 hover:text-secondary text-sm">
                  For Investors
                </Link>
              </li>
              <li>
                <Link to="/how-it-works/regulatory" className="text-gray-400 hover:text-secondary text-sm">
                  Regulatory Framework
                </Link>
              </li>
              <li>
                <Link to="/how-it-works/pricing" className="text-gray-400 hover:text-secondary text-sm">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-foreground font-medium mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about/founder" className="text-gray-400 hover:text-secondary text-sm">
                  Founder
                </Link>
              </li>
              <li>
                <Link to="/about/mission" className="text-gray-400 hover:text-secondary text-sm">
                  Mission
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-gray-400 hover:text-secondary text-sm">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-secondary text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-foreground font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-secondary text-sm">
                  Resource Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-secondary text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-secondary text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-secondary text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-secondary text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {year} SeedSMB. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-secondary">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-secondary">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-secondary">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;