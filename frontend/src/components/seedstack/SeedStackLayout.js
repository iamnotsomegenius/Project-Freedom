import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Squares2X2Icon,
  ChatBubbleLeftRightIcon,
  DocumentChartBarIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  ScaleIcon,
  HomeIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const SeedStackLayout = ({ children, user, onLogout }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/seedstack-app/', icon: HomeIcon },
    { name: 'Deal Pipeline', href: '/seedstack-app/pipeline', icon: Squares2X2Icon },
    { name: 'AI Assistant', href: '/seedstack-app/ai-assistant', icon: ChatBubbleLeftRightIcon },
    { name: 'P&L Analyzer', href: '/seedstack-app/pl-analyzer', icon: DocumentChartBarIcon },
    { name: 'Market Research', href: '/seedstack-app/market-research', icon: MagnifyingGlassIcon },
    { name: 'LOI Generator', href: '/seedstack-app/loi-generator', icon: DocumentTextIcon },
    { name: 'Legal Templates', href: '/seedstack-app/legal-templates', icon: ScaleIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo and Back to Marketplace */}
          <div className="flex flex-col space-y-3 p-6 border-b border-gray-200">
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
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive ? 'text-green-500' : 'text-gray-400'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User menu */}
          <div className="flex-shrink-0 p-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-green-700">
                    {user?.display_name?.charAt(0) || 'D'}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{user?.display_name || 'Demo User'}</p>
                  <p className="text-xs text-gray-500">{user?.email || 'demo@seedstack.com'}</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="p-1 text-gray-400 hover:text-gray-600"
                title="Logout"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 ml-64">
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SeedStackLayout;