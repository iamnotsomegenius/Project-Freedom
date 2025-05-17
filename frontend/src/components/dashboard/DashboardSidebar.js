import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../layout/Logo';
import {
  HomeIcon,
  BuildingStorefrontIcon,
  DocumentTextIcon,
  UsersIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const NavLink = ({ href, icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === href;
  
  return (
    <Link
      to={href}
      className={`flex items-center py-2 px-4 rounded-md transition-colors ${
        isActive
          ? 'bg-secondary/10 text-secondary'
          : 'text-gray-400 hover:text-foreground hover:bg-gray-800/40'
      }`}
    >
      {icon}
      <span className="ml-3">{children}</span>
    </Link>
  );
};

const DashboardSidebar = () => {
  const { user } = useAuth();
  
  // Get navigation links based on user type
  const getNavLinks = () => {
    const commonLinks = [
      {
        href: '/dashboard',
        icon: <HomeIcon className="h-5 w-5" />,
        label: 'Dashboard',
      },
      {
        href: '/dashboard/profile',
        icon: <UserCircleIcon className="h-5 w-5" />,
        label: 'Profile',
      },
      {
        href: '/dashboard/settings',
        icon: <Cog6ToothIcon className="h-5 w-5" />,
        label: 'Settings',
      },
    ];
    
    switch (user?.user_type) {
      case 'SELLER':
        return [
          ...commonLinks,
          {
            href: '/dashboard/seller/listings',
            icon: <BuildingStorefrontIcon className="h-5 w-5" />,
            label: 'My Listings',
          },
          {
            href: '/dashboard/seller/offers',
            icon: <DocumentTextIcon className="h-5 w-5" />,
            label: 'Offers Received',
          },
          {
            href: '/dashboard/seller/deals',
            icon: <UsersIcon className="h-5 w-5" />,
            label: 'Active Deals',
          },
        ];
      
      case 'BUYER':
        return [
          ...commonLinks,
          {
            href: '/dashboard/buyer/saved',
            icon: <BuildingStorefrontIcon className="h-5 w-5" />,
            label: 'Saved Businesses',
          },
          {
            href: '/dashboard/buyer/offers',
            icon: <DocumentTextIcon className="h-5 w-5" />,
            label: 'My Offers',
          },
          {
            href: '/dashboard/buyer/deals',
            icon: <UsersIcon className="h-5 w-5" />,
            label: 'Active Deals',
          },
        ];
      
      case 'INVESTOR':
        return [
          ...commonLinks,
          {
            href: '/dashboard/investor/portfolio',
            icon: <BuildingStorefrontIcon className="h-5 w-5" />,
            label: 'My Portfolio',
          },
          {
            href: '/dashboard/investor/opportunities',
            icon: <DocumentTextIcon className="h-5 w-5" />,
            label: 'Opportunities',
          },
          {
            href: '/dashboard/investor/transactions',
            icon: <UsersIcon className="h-5 w-5" />,
            label: 'Transactions',
          },
        ];
      
      default:
        return commonLinks;
    }
  };
  
  const navLinks = getNavLinks();
  
  return (
    <div className="hidden md:flex md:w-64 md:flex-col h-screen">
      <div className="flex flex-col flex-grow border-r border-gray-800 bg-primary overflow-y-auto">
        <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-800">
          <Link to="/" className="flex items-center">
            <Logo className="h-8 w-auto" />
            <span className="ml-2 font-bold text-lg text-foreground">SeedSMB</span>
          </Link>
        </div>
        <div className="flex-grow flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-3 space-y-2">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} icon={link.icon}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center">
            <div className="rounded-full bg-gray-800 h-8 w-8 flex items-center justify-center">
              <UserCircleIcon className="h-6 w-6 text-gray-300" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-foreground">
                {user?.display_name || user?.email?.split('@')[0]}
              </p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
