import React, { useState, useEffect } from 'react';
import SeedStackLayout from './SeedStackLayout';
import {
  PlusIcon,
  EllipsisVerticalIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';
import Button from '../ui/Button';

const DealPipeline = ({ user, onLogout }) => {
  const [deals, setDeals] = useState([]);
  const [showAddDeal, setShowAddDeal] = useState(false);
  const [newDeal, setNewDeal] = useState({
    title: '',
    industry: '',
    location: '',
    asking_price: '',
    revenue: '',
    ebitda: '',
    notes: '',
    broker_contact: ''
  });

  const stages = [
    { id: 'inbox', title: 'Inbox', color: 'bg-gray-100' },
    { id: 'interested', title: 'Interested', color: 'bg-blue-100' },
    { id: 'loi_sent', title: 'LOI Sent', color: 'bg-yellow-100' },
    { id: 'diligence', title: 'Due Diligence', color: 'bg-purple-100' },
    { id: 'closed', title: 'Closed', color: 'bg-green-100' }
  ];

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async () => {
    // Mock data - in production this would fetch from API
    const mockDeals = [
      {
        id: '1',
        title: 'Tech Services Co',
        industry: 'Technology',
        location: 'Austin, TX',
        asking_price: 2500000,
        revenue: 3200000,
        ebitda: 640000,
        stage: 'inbox',
        priority: 'high',
        notes: 'Strong recurring revenue model',
        broker_contact: 'john@techbroker.com',
        marketplace_listing_id: null
      },
      {
        id: '2',
        title: 'Manufacturing Inc',
        industry: 'Manufacturing',
        location: 'Detroit, MI',
        asking_price: 4800000,
        revenue: 8200000,
        ebitda: 1150000,
        stage: 'interested',
        priority: 'medium',
        notes: 'Family-owned for 40 years',
        broker_contact: 'sarah@industrialbrokers.com',
        marketplace_listing_id: null
      },
      {
        id: '3',
        title: 'Restaurant Chain',
        industry: 'Food Service',
        location: 'Phoenix, AZ',
        asking_price: 1800000,
        revenue: 2900000,
        ebitda: 420000,
        stage: 'loi_sent',
        priority: 'high',
        notes: 'LOI sent for $1.6M',
        broker_contact: 'mike@restaurantdeals.com',
        marketplace_listing_id: null
      }
    ];
    setDeals(mockDeals);
  };

  const handleAddDeal = async () => {
    const deal = {
      id: Date.now().toString(),
      ...newDeal,
      asking_price: parseFloat(newDeal.asking_price) || 0,
      revenue: parseFloat(newDeal.revenue) || 0,
      ebitda: parseFloat(newDeal.ebitda) || 0,
      stage: 'inbox',
      priority: 'medium',
      marketplace_listing_id: null
    };

    setDeals([...deals, deal]);
    setNewDeal({
      title: '',
      industry: '',
      location: '',
      asking_price: '',
      revenue: '',
      ebitda: '',
      notes: '',
      broker_contact: ''
    });
    setShowAddDeal(false);
  };

  const handleDragStart = (e, dealId) => {
    e.dataTransfer.setData('text/plain', dealId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStage) => {
    e.preventDefault();
    const dealId = e.dataTransfer.getData('text/plain');
    
    setDeals(deals.map(deal => 
      deal.id === dealId 
        ? { ...deal, stage: targetStage }
        : deal
    ));
  };

  const publishToMarketplace = async (dealId) => {
    const deal = deals.find(d => d.id === dealId);
    if (!deal) return;

    if (deal.stage === 'inbox' || deal.stage === 'interested') {
      alert('Deal must be at LOI stage or beyond to publish to marketplace');
      return;
    }

    // Simulate API call
    const marketplaceId = `marketplace-${Date.now()}`;
    
    setDeals(deals.map(d => 
      d.id === dealId 
        ? { ...d, marketplace_listing_id: marketplaceId }
        : d
    ));

    alert(`Deal successfully published to SeedSMB Marketplace! Listing ID: ${marketplaceId}`);
  };

  const getDealsByStage = (stage) => {
    return deals.filter(deal => deal.stage === stage);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <SeedStackLayout user={user} onLogout={onLogout}>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
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

        {/* Kanban Board */}
        <div className="overflow-x-auto">
          <div className="flex space-x-6 min-w-max pb-6">
            {stages.map((stage) => (
              <div 
                key={stage.id} 
                className="flex-shrink-0 w-72 sm:w-80"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.id)}
              >
                <div className={`${stage.color} rounded-lg p-4 min-h-[600px]`}>
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