import React, { useState, useEffect } from 'react';
import SeedStackLayout from './SeedStackLayout';
import dealDataService from '../../services/dealDataService';
import {
  Squares2X2Icon,
  ChatBubbleLeftRightIcon,
  DocumentChartBarIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

const SeedStackDashboard = ({ user, onLogout }) => {
  const [stageCounts, setStageCounts] = useState({});
  const [totalDeals, setTotalDeals] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);

  // Get stages from shared service
  const stages = dealDataService.getStages();

  useEffect(() => {
    // Load data from shared service
    dealDataService.loadMockData();
    updateStats();

    // Listen for data updates
    const handleDataUpdate = () => {
      updateStats();
    };

    dealDataService.addListener(handleDataUpdate);

    // Setup recent activity
    setRecentActivity([
      { id: 1, type: 'deal_created', message: 'New deal added: TechServ Solutions', time: '2 hours ago' },
      { id: 2, type: 'analysis_completed', message: 'P&L analysis completed for Manufacturing Plus', time: '5 hours ago' },
      { id: 3, type: 'loi_generated', message: 'LOI generated for Healthcare Services Inc', time: '1 day ago' },
      { id: 4, type: 'market_research', message: 'Market research completed for auto repair sector', time: '2 days ago' },
    ]);

    // Cleanup listener on unmount
    return () => {
      dealDataService.removeListener(handleDataUpdate);
    };
  }, []);

  const updateStats = () => {
    const counts = dealDataService.getStageCounts();
    const total = dealDataService.getTotalDeals();
    
    setStageCounts(counts);
    setTotalDeals(total);
  };

  const quickActions = [
    {
      name: 'Add New Deal',
      href: '/seedstack-app/pipeline',
      icon: Squares2X2Icon,
      description: 'Start tracking a new acquisition opportunity'
    },
    {
      name: 'Chat with AI',
      href: '/seedstack-app/ai-assistant',
      icon: ChatBubbleLeftRightIcon,
      description: 'Get AI assistance for deal analysis'
    },
    {
      name: 'Analyze P&L',
      href: '/seedstack-app/pl-analyzer',
      icon: DocumentChartBarIcon,
      description: 'Upload and analyze financial statements'
    },
    {
      name: 'Market Research',
      href: '/seedstack-app/market-research',
      icon: ChartBarIcon,
      description: 'Research industry trends and valuations'
    }
  ];

  return (
    <SeedStackLayout user={user} onLogout={onLogout}>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.display_name || 'Demo User'}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Squares2X2Icon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Deals</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDeals}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Deals</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeDeals}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DocumentChartBarIcon className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Analyses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedAnalyses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">LOIs Generated</p>
                <p className="text-2xl font-bold text-gray-900">{stats.loisGenerated}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <a
                key={action.name}
                href={action.href}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-green-300 transition-colors group"
              >
                <div className="flex items-center mb-3">
                  <action.icon className="h-6 w-6 text-green-600" />
                  <h3 className="ml-2 font-medium text-gray-900">{action.name}</h3>
                </div>
                <p className="text-sm text-gray-600">{action.description}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 bg-green-600 rounded-full mt-2"></div>
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SeedStackLayout>
  );
};

export default SeedStackDashboard;