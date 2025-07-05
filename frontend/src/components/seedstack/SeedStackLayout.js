import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Squares2X2Icon,
  DocumentChartBarIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  ScaleIcon,
  HomeIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const SeedStackLayout = ({ children, user, onLogout }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/seedstack-app/', icon: HomeIcon },
    { name: 'Deal Pipeline', href: '/seedstack-app/deal-pipeline', icon: Squares2X2Icon },
    { name: 'Deal Sourcing & AI', href: '/seedstack-app/deal-sourcing', icon: MagnifyingGlassIcon },
    { name: 'P&L Analyzer', href: '/seedstack-app/pl-analyzer', icon: DocumentChartBarIcon },
    { name: 'LOI Generator', href: '/seedstack-app/loi-generator', icon: DocumentTextIcon },
    { name: 'Legal Templates', href: '/seedstack-app/legal-templates', icon: ScaleIcon },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo and Back to Marketplace */}
      <div className="flex flex-col space-y-3 p-4 lg:p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">
          SeedStack<span className="text-xs align-super text-gray-600">™</span>
        </h1>
        <a
          href="/"
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          ← Back to Marketplace
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 lg:px-4 py-4 lg:py-6 space-y-1 lg:space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`group flex items-center px-2 lg:px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <item.icon
                className={`mr-2 lg:mr-3 h-5 w-5 flex-shrink-0 ${
                  isActive ? 'text-green-500' : 'text-gray-400'
                }`}
              />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User menu */}
      <div className="flex-shrink-0 p-3 lg:p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-0 flex-1">
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-green-700">
                {user?.display_name?.charAt(0) || 'D'}
              </span>
            </div>
            <div className="ml-3 min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-700 truncate">{user?.display_name || 'Demo User'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || 'demo@seedstack.com'}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="ml-2 p-1 text-gray-400 hover:text-gray-600 flex-shrink-0"
            title="Logout"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
      )}

      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="absolute top-0 right-0 -mr-12 pt-2">
          <button
            type="button"
            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={() => setSidebarOpen(false)}
          >
            <XMarkIcon className="h-6 w-6 text-white" />
          </button>
        </div>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-56 xl:w-64">
          <div className="flex flex-col flex-grow bg-white shadow-lg overflow-y-auto">
            <SidebarContent />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              SeedStack<span className="text-xs align-super text-gray-600">™</span>
            </h1>
            <div className="w-6"></div> {/* Spacer for centering */}
          </div>
        </div>

        {/* Main content area */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SeedStackLayout;