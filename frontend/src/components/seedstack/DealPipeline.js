import React, { useState, useEffect } from 'react';
import SeedStackLayout from './SeedStackLayout';
import {
  PlusIcon,
  EllipsisVerticalIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ChevronRightIcon,
  LinkIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';
import Button from '../ui/Button';

const DealPipeline = ({ user, onLogout }) => {
  const [deals, setDeals] = useState([]);
  const [activeStage, setActiveStage] = useState('outreach');
  const [showAddDeal, setShowAddDeal] = useState(false);

  const stages = [
    { 
      id: 'outreach', 
      title: 'Initial Outreach', 
      color: 'bg-blue-50 border-blue-200 text-blue-900',
      icon: UserGroupIcon 
    },
    { 
      id: 'loi_submitted', 
      title: 'LOI Submitted', 
      color: 'bg-yellow-50 border-yellow-200 text-yellow-900',
      icon: DocumentTextIcon 
    },
    { 
      id: 'loi_signed', 
      title: 'LOI Signed', 
      color: 'bg-green-50 border-green-200 text-green-900',
      icon: CheckCircleIcon 
    },
    { 
      id: 'closing', 
      title: 'Closing / Due Diligence', 
      color: 'bg-purple-50 border-purple-200 text-purple-900',
      icon: BuildingOfficeIcon 
    }
  ];

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async () => {
    // Enhanced mock data with workflow tracking
    const mockDeals = [
      {
        id: '1',
        company_name: 'TechServ Solutions',
        industry: 'Technology Services',
        location: 'Austin, TX',
        revenue: 3200000,
        ebitda: 640000,
        asking_price: 2500000,
        stage: 'outreach',
        last_outreach: '2024-01-15',
        contact_person: 'John Smith',
        email: 'john@techserv.com',
        phone: '(512) 555-0123',
        nda_signed: false,
        response_status: 'pending',
        next_action: 'Follow up call scheduled',
        automation_suggestions: ['Send follow-up email', 'Schedule call']
      },
      {
        id: '2',
        company_name: 'Manufacturing Plus',
        industry: 'Manufacturing',
        location: 'Detroit, MI',
        revenue: 8200000,
        ebitda: 1150000,
        asking_price: 4800000,
        stage: 'loi_submitted',
        loi_submitted_date: '2024-01-10',
        loi_amount: 4200000,
        broker_name: 'Sarah Wilson',
        response_deadline: '2024-01-25',
        loi_status: 'under_review',
        automation_suggestions: ['Send reminder', 'Prepare revised LOI']
      },
      {
        id: '3',
        company_name: 'Restaurant Chain Co',
        industry: 'Food Service',
        location: 'Phoenix, AZ',
        revenue: 2900000,
        ebitda: 420000,
        asking_price: 1800000,
        stage: 'loi_signed',
        loi_signed_date: '2024-01-05',
        due_diligence_start: '2024-01-12',
        counsel_assigned: true,
        counsel_name: 'Johnson & Associates',
        qoe_ordered: true,
        qoe_status: 'in_progress',
        vdr_created: true,
        vdr_access: 'granted',
        automation_suggestions: ['Request additional docs', 'Schedule management meeting']
      },
      {
        id: '4',
        company_name: 'Software Dynamics',
        industry: 'Software',
        location: 'San Francisco, CA',
        revenue: 5100000,
        ebitda: 1020000,
        asking_price: 6500000,
        stage: 'closing',
        closing_target: '2024-02-15',
        counsel_review: 'completed',
        qoe_completed: true,
        qoe_findings: 'clean',
        sba_lender: 'First National Bank',
        sba_approval: 'approved',
        marketplace_listed: true,
        funding_raised: 2100000,
        funding_target: 6500000,
        closing_progress: 75,
        automation_suggestions: ['Finalize purchase agreement', 'Schedule closing']
      }
    ];
    setDeals(mockDeals);
  };

  const getDealsByStage = (stage) => {
    return deals.filter(deal => deal.stage === stage);
  };

  const getStageCount = (stage) => {
    return getDealsByStage(stage).length;
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    if (progress >= 25) return 'bg-blue-500';
    return 'bg-gray-300';
  };

  const renderOutreachColumns = (deal) => (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {deal.company_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {deal.last_outreach}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {deal.location}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {deal.industry}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${deal.revenue?.toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {deal.contact_person}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          deal.nda_signed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {deal.nda_signed ? 'NDA Signed' : 'NDA Pending'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {deal.next_action}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-blue-600 hover:text-blue-900 mr-2">
          <PlayIcon className="h-4 w-4 inline" /> Automate
        </button>
        <button className="text-gray-600 hover:text-gray-900">
          <EllipsisVerticalIcon className="h-4 w-4" />
        </button>
      </td>
    </>
  );

  const renderLOISubmittedColumns = (deal) => (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {deal.company_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {deal.loi_submitted_date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${deal.loi_amount?.toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {deal.broker_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {deal.response_deadline}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          deal.loi_status === 'accepted' ? 'bg-green-100 text-green-800' :
          deal.loi_status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {deal.loi_status?.replace('_', ' ').toUpperCase()}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-blue-600 hover:text-blue-900 mr-2">
          <PlayIcon className="h-4 w-4 inline" /> Auto Follow-up
        </button>
        <button className="text-gray-600 hover:text-gray-900">
          <EllipsisVerticalIcon className="h-4 w-4" />
        </button>
      </td>
    </>
  );

  const renderLOISignedColumns = (deal) => (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {deal.company_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {deal.loi_signed_date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {deal.counsel_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          deal.qoe_status === 'completed' ? 'bg-green-100 text-green-800' :
          deal.qoe_status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          QoE: {deal.qoe_status?.replace('_', ' ')}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          deal.vdr_access === 'granted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          VDR: {deal.vdr_access}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-blue-600 hover:text-blue-900 mr-2">
          <PlayIcon className="h-4 w-4 inline" /> Auto VDR
        </button>
        <button className="text-gray-600 hover:text-gray-900">
          <EllipsisVerticalIcon className="h-4 w-4" />
        </button>
      </td>
    </>
  );

  const renderClosingColumns = (deal) => (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {deal.company_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {deal.closing_target}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          deal.sba_approval === 'approved' ? 'bg-green-100 text-green-800' :
          deal.sba_approval === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          SBA: {deal.sba_approval}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {deal.marketplace_listed && (
          <div className="flex items-center">
            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
              <div 
                className={`h-2 rounded-full ${getProgressColor((deal.funding_raised / deal.funding_target) * 100)}`}
                style={{ width: `${(deal.funding_raised / deal.funding_target) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500">
              ${deal.funding_raised?.toLocaleString()} / ${deal.funding_target?.toLocaleString()}
            </span>
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
            <div 
              className={`h-2 rounded-full ${getProgressColor(deal.closing_progress)}`}
              style={{ width: `${deal.closing_progress}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-500">{deal.closing_progress}%</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-blue-600 hover:text-blue-900 mr-2">
          <PlayIcon className="h-4 w-4 inline" /> Auto Close
        </button>
        <button className="text-gray-600 hover:text-gray-900">
          <EllipsisVerticalIcon className="h-4 w-4" />
        </button>
      </td>
    </>
  );

  const getColumnHeaders = (stage) => {
    switch (stage) {
      case 'outreach':
        return ['Company', 'Last Outreach', 'Location', 'Industry', 'Revenue', 'Contact', 'NDA Status', 'Next Action', 'Actions'];
      case 'loi_submitted':
        return ['Company', 'Submitted', 'LOI Amount', 'Broker', 'Deadline', 'Status', 'Actions'];
      case 'loi_signed':
        return ['Company', 'Signed Date', 'Counsel', 'QoE Status', 'VDR Access', 'Actions'];
      case 'closing':
        return ['Company', 'Target Close', 'SBA Status', 'Marketplace Funding', 'Closing Progress', 'Actions'];
      default:
        return [];
    }
  };

  const renderTableRow = (deal) => {
    switch (activeStage) {
      case 'outreach':
        return renderOutreachColumns(deal);
      case 'loi_submitted':
        return renderLOISubmittedColumns(deal);
      case 'loi_signed':
        return renderLOISignedColumns(deal);
      case 'closing':
        return renderClosingColumns(deal);
      default:
        return null;
    }
  };

  return (
    <SeedStackLayout user={user} onLogout={onLogout}>
      <div className="h-full flex flex-col bg-gray-50">
        {/* Header */}
        <div className="flex-shrink-0 p-6 bg-white border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Deal Pipeline</h1>
              <p className="text-gray-600">Automated workflow management for seamless acquisitions</p>
            </div>
            <Button 
              onClick={() => setShowAddDeal(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Deal
            </Button>
          </div>
        </div>

        {/* Stage Summary Cards */}
        <div className="flex-shrink-0 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stages.map((stage) => {
              const count = getStageCount(stage.id);
              const IconComponent = stage.icon;
              
              return (
                <div 
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  className={`${stage.color} border-2 rounded-lg p-6 cursor-pointer hover:shadow-md transition-all ${
                    activeStage === stage.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium opacity-75">{stage.title}</p>
                      <p className="text-3xl font-bold">{count}</p>
                    </div>
                    <IconComponent className="h-8 w-8 opacity-75" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Table View */}
        <div className="flex-1 px-6 pb-6 overflow-hidden">
          <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {stages.find(s => s.id === activeStage)?.title} Details
              </h3>
            </div>
            
            <div className="flex-1 overflow-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    {getColumnHeaders(activeStage).map((header, index) => (
                      <th 
                        key={index}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getDealsByStage(activeStage).map((deal) => (
                    <tr key={deal.id} className="hover:bg-gray-50">
                      {renderTableRow(deal)}
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {getDealsByStage(activeStage).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No deals in this stage yet.</p>
                  <Button 
                    onClick={() => setShowAddDeal(true)}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                  >
                    Add Your First Deal
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SeedStackLayout>
  );
};

export default DealPipeline;