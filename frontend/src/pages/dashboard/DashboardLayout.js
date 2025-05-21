import React from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  HomeIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const DashboardLayout = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  const nav = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { 
      name: 'My Listings', 
      href: '/dashboard/seller', 
      icon: BuildingStorefrontIcon,
      show: user?.user_type === 'SELLER' || user?.user_type === 'ADMIN' 
    },
    { 
      name: 'My Investments', 
      href: '/dashboard/investments', 
      icon: UserGroupIcon,
      show: user?.user_type === 'INVESTOR' || user?.user_type === 'ADMIN' || user?.user_type === 'BUYER'
    },
    { name: 'Profile', href: '/dashboard/profile', icon: UserCircleIcon },
    { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
  ].filter(item => item.show !== false);
  
  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/dashboard';
  };
  
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-primary border-r border-gray-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 mb-5">
              <span className="text-xl font-semibold text-foreground">SeedSMB Dashboard</span>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {nav.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive(item.href)
                      ? 'bg-secondary/20 text-secondary'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-foreground'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <item.icon
                    className={`${
                      isActive(item.href) ? 'text-secondary' : 'text-gray-400 group-hover:text-gray-300'
                    } mr-3 flex-shrink-0 h-6 w-6`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-800 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-10 w-10 rounded-full"
                    src={user?.avatar_url || `https://ui-avatars.com/api/?name=${user?.display_name || 'User'}&background=1d5c3f&color=fff`}
                    alt={user?.display_name || 'User'}
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-foreground">{user?.display_name || user?.email?.split('@')[0]}</p>
                  <p className="text-xs font-medium text-gray-400">{user?.user_type}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile nav */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-800 bg-primary">
        <span className="text-lg font-semibold text-foreground">SeedSMB Dashboard</span>
        <div className="flex space-x-4">
          {nav.slice(0, 3).map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                isActive(item.href)
                  ? 'text-secondary'
                  : 'text-gray-400'
              }`}
            >
              <item.icon className="h-6 w-6" />
            </Link>
          ))}
        </div>
      </div>
      
      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;