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
      <div className="h-full flex flex-col">
        {/* Fixed Header */}
        <div className="flex-shrink-0 p-6 border-b border-gray-200 bg-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Deal Pipeline</h1>
              <p className="text-gray-600">Track your acquisition opportunities</p>
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

        {/* Scrollable Kanban Board */}
        <div className="flex-1 p-6 overflow-x-auto bg-gray-50">
          <div className="flex space-x-6" style={{ minWidth: 'fit-content' }}>
            {stages.map((stage) => (
              <div 
                key={stage.id} 
                className="flex-shrink-0 w-80"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.id)}
              >
                <div className={`${stage.color} rounded-lg p-4 h-full`}>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    {stage.title} ({getDealsByStage(stage.id).length})
                  </h3>
                  
                  <div className="space-y-3">
                    {getDealsByStage(stage.id).map((deal) => (
                      <div
                        key={deal.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, deal.id)}
                        className={`bg-white rounded-lg p-4 shadow-sm border-l-4 ${getPriorityColor(deal.priority)} cursor-move hover:shadow-md transition-shadow`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900 text-sm">{deal.title}</h4>
                          <div className="relative">
                            <button className="text-gray-400 hover:text-gray-600">
                              <EllipsisVerticalIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-600 space-y-1">
                          <p><strong>Industry:</strong> {deal.industry}</p>
                          <p><strong>Location:</strong> {deal.location}</p>
                          <p><strong>Asking:</strong> ${deal.asking_price?.toLocaleString()}</p>
                          <p><strong>Revenue:</strong> ${deal.revenue?.toLocaleString()}</p>
                          <p><strong>EBITDA:</strong> ${deal.ebitda?.toLocaleString()}</p>
                        </div>
                        
                        {deal.notes && (
                          <p className="text-xs text-gray-500 mt-2 italic">{deal.notes}</p>
                        )}
                        
                        <div className="mt-3 flex justify-between items-center">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            deal.priority === 'high' ? 'bg-red-100 text-red-800' :
                            deal.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {deal.priority}
                          </span>
                          
                          {(stage.id === 'loi_sent' || stage.id === 'diligence' || stage.id === 'closed') && !deal.marketplace_listing_id && (
                            <button
                              onClick={() => publishToMarketplace(deal.id)}
                              className="text-xs text-green-600 hover:text-green-800 flex items-center"
                              title="Publish to SeedSMB Marketplace"
                            >
                              <LinkIcon className="h-3 w-3 mr-1" />
                              Publish
                            </button>
                          )}
                          
                          {deal.marketplace_listing_id && (
                            <span className="text-xs text-green-600 flex items-center">
                              <LinkIcon className="h-3 w-3 mr-1" />
                              Live
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Deal Modal */}
        {showAddDeal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Deal</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    value={newDeal.title}
                    onChange={(e) => setNewDeal({...newDeal, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="Enter business name"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Industry
                    </label>
                    <input
                      type="text"
                      value={newDeal.industry}
                      onChange={(e) => setNewDeal({...newDeal, industry: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      placeholder="e.g., Technology"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={newDeal.location}
                      onChange={(e) => setNewDeal({...newDeal, location: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      placeholder="City, State"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Asking Price
                    </label>
                    <input
                      type="number"
                      value={newDeal.asking_price}
                      onChange={(e) => setNewDeal({...newDeal, asking_price: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Revenue
                    </label>
                    <input
                      type="number"
                      value={newDeal.revenue}
                      onChange={(e) => setNewDeal({...newDeal, revenue: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      EBITDA
                    </label>
                    <input
                      type="number"
                      value={newDeal.ebitda}
                      onChange={(e) => setNewDeal({...newDeal, ebitda: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Broker Contact
                  </label>
                  <input
                    type="email"
                    value={newDeal.broker_contact}
                    onChange={(e) => setNewDeal({...newDeal, broker_contact: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="broker@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={newDeal.notes}
                    onChange={(e) => setNewDeal({...newDeal, notes: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    rows="3"
                    placeholder="Initial thoughts, key details..."
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowAddDeal(false)}
                  className="border-gray-300 text-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddDeal}
                  disabled={!newDeal.title}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Add Deal
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SeedStackLayout>
  );
};

export default DealPipeline;