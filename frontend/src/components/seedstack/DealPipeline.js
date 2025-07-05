import React, { useState, useEffect } from 'react';
import SeedStackLayout from './SeedStackLayout';
import dealDataService from '../../services/dealDataService';
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
  const [activeStage, setActiveStage] = useState('interested');
  const [showAddDeal, setShowAddDeal] = useState(false);

  // Get stages from shared service
  const stages = dealDataService.getStages();

  useEffect(() => {
    // Load data from shared service
    dealDataService.loadMockData();
    setDeals(dealDataService.deals);

    // Listen for data updates
    const handleDataUpdate = (updatedDeals) => {
      setDeals(updatedDeals);
    };

    dealDataService.addListener(handleDataUpdate);

    // Cleanup listener on unmount
    return () => {
      dealDataService.removeListener(handleDataUpdate);
    };
  }, []);

  const getDealsByStage = (stage) => {
    return dealDataService.getDealsByStage(stage);
  };

  const getStageCount = (stage) => {
    return dealDataService.getDealsByStage(stage).length;
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    if (progress >= 25) return 'bg-blue-500';
    return 'bg-gray-300';
  };

  const renderInterestedColumns = (deal) => (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {deal.company_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {deal.industry}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {deal.location}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${deal.revenue?.toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${deal.asking_price?.toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {deal.contact_person}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          deal.nda_signed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {deal.nda_signed ? `Signed ${deal.nda_date}` : 'Pending'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          deal.interest_level === 'high' ? 'bg-green-100 text-green-800' :
          deal.interest_level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {deal.interest_level?.toUpperCase()}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {deal.next_meeting}
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

  const renderLOISentColumns = (deal) => (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {deal.company_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {deal.loi_sent_date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${deal.loi_amount?.toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {deal.loi_terms}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {deal.response_deadline}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          deal.loi_status === 'accepted' ? 'bg-green-100 text-green-800' :
          deal.loi_status === 'countered' ? 'bg-blue-100 text-blue-800' :
          deal.loi_status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {deal.loi_status?.replace('_', ' ').toUpperCase()}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {deal.days_pending} days
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {deal.broker_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-blue-600 hover:text-blue-900 mr-2">
          <PlayIcon className="h-4 w-4 inline" /> Follow-up
        </button>
        <button className="text-gray-600 hover:text-gray-900">
          <EllipsisVerticalIcon className="h-4 w-4" />
        </button>
      </td>
    </>
  );

  const renderDiligenceColumns = (deal) => (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {deal.company_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {deal.loi_signed_date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {deal.dd_end_date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
            <div 
              className={`h-2 rounded-full ${getProgressColor(deal.qoe_completion)}`}
              style={{ width: `${deal.qoe_completion}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-500">{deal.qoe_completion}%</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          deal.legal_review === 'completed' ? 'bg-green-100 text-green-800' :
          deal.legal_review === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {deal.legal_review?.replace('_', ' ')}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          deal.vdr_access === 'granted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {deal.vdr_docs_uploaded}% uploaded
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          deal.financial_review === 'completed' ? 'bg-green-100 text-green-800' :
          deal.financial_review === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          Financial: {deal.financial_review}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-blue-600 hover:text-blue-900 mr-2">
          <PlayIcon className="h-4 w-4 inline" /> Auto DD
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
        {deal.target_close_date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${deal.purchase_price?.toLocaleString()}
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
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          deal.apa_status === 'executed' ? 'bg-green-100 text-green-800' :
          deal.apa_status === 'in_review' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          APA: {deal.apa_status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {deal.conditions_cleared}/{deal.closing_conditions} cleared
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
              ${(deal.funding_raised/1000).toFixed(0)}k/${(deal.funding_target/1000).toFixed(0)}k
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
      case 'interested':
        return ['Company', 'Industry', 'Location', 'Revenue', 'Asking Price', 'Contact', 'NDA Status', 'Interest Level', 'Next Meeting', 'Actions'];
      case 'loi_sent':
        return ['Company', 'LOI Sent', 'LOI Amount', 'LOI Terms', 'Response Due', 'Status', 'Days Pending', 'Broker', 'Actions'];
      case 'diligence':
        return ['Company', 'LOI Signed', 'DD Deadline', 'QoE Progress', 'Legal Review', 'VDR Status', 'Financial Review', 'Actions'];
      case 'closing':
        return ['Company', 'Target Close', 'Purchase Price', 'SBA Status', 'APA Status', 'Conditions', 'Marketplace Funding', 'Closing Progress', 'Actions'];
      default:
        return [];
    }
  };

  const renderTableRow = (deal) => {
    switch (activeStage) {
      case 'interested':
        return renderInterestedColumns(deal);
      case 'loi_sent':
        return renderLOISentColumns(deal);
      case 'diligence':
        return renderDiligenceColumns(deal);
      case 'closing':
        return renderClosingColumns(deal);
      default:
        return null;
    }
  };

  const renderMobileCard = (deal) => {
    switch (activeStage) {
      case 'interested':
        return (
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-semibold text-gray-900">{deal.company_name}</h4>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                deal.interest_level === 'high' ? 'bg-green-100 text-green-800' :
                deal.interest_level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {deal.interest_level?.toUpperCase()}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div><span className="font-medium">Industry:</span> {deal.industry}</div>
              <div><span className="font-medium">Location:</span> {deal.location}</div>
              <div><span className="font-medium">Revenue:</span> ${deal.revenue?.toLocaleString()}</div>
              <div><span className="font-medium">Asking Price:</span> ${deal.asking_price?.toLocaleString()}</div>
              <div><span className="font-medium">Contact:</span> {deal.contact_person}</div>
              <div><span className="font-medium">Next Meeting:</span> {deal.next_meeting}</div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                deal.nda_signed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {deal.nda_signed ? `NDA Signed ${deal.nda_date}` : 'NDA Pending'}
              </span>
              <button className="text-blue-600 hover:text-blue-900 text-sm">
                <PlayIcon className="h-4 w-4 inline mr-1" /> Automate
              </button>
            </div>
          </div>
        );
      case 'loi_sent':
        return (
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-semibold text-gray-900">{deal.company_name}</h4>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                deal.loi_status === 'accepted' ? 'bg-green-100 text-green-800' :
                deal.loi_status === 'countered' ? 'bg-blue-100 text-blue-800' :
                deal.loi_status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {deal.loi_status?.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div><span className="font-medium">LOI Sent:</span> {deal.loi_sent_date}</div>
              <div><span className="font-medium">LOI Amount:</span> ${deal.loi_amount?.toLocaleString()}</div>
              <div><span className="font-medium">LOI Terms:</span> {deal.loi_terms}</div>
              <div><span className="font-medium">Response Due:</span> {deal.response_deadline}</div>
              <div><span className="font-medium">Days Pending:</span> {deal.days_pending} days</div>
              <div><span className="font-medium">Broker:</span> {deal.broker_name}</div>
            </div>
            <div className="flex justify-end pt-2">
              <button className="text-blue-600 hover:text-blue-900 text-sm">
                <PlayIcon className="h-4 w-4 inline mr-1" /> Follow-up
              </button>
            </div>
          </div>
        );
      case 'diligence':
        return (
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-gray-900">{deal.company_name}</h4>
            <div className="grid grid-cols-1 gap-y-2 text-sm">
              <div><span className="font-medium">LOI Signed:</span> {deal.loi_signed_date}</div>
              <div><span className="font-medium">DD Deadline:</span> {deal.dd_end_date}</div>
              <div className="flex items-center">
                <span className="font-medium mr-2">QoE Progress:</span>
                <div className="flex items-center flex-1">
                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressColor(deal.qoe_completion)}`}
                      style={{ width: `${deal.qoe_completion}%` }}
                    ></div>
                  </div>
                  <span className="text-xs">{deal.qoe_completion}%</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  deal.legal_review === 'completed' ? 'bg-green-100 text-green-800' :
                  deal.legal_review === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  Legal: {deal.legal_review?.replace('_', ' ')}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  deal.vdr_access === 'granted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  VDR: {deal.vdr_docs_uploaded}%
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  deal.financial_review === 'completed' ? 'bg-green-100 text-green-800' :
                  deal.financial_review === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  Financial: {deal.financial_review}
                </span>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button className="text-blue-600 hover:text-blue-900 text-sm">
                <PlayIcon className="h-4 w-4 inline mr-1" /> Auto DD
              </button>
            </div>
          </div>
        );
      case 'closing':
        return (
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-gray-900">{deal.company_name}</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div><span className="font-medium">Target Close:</span> {deal.target_close_date}</div>
              <div><span className="font-medium">Purchase Price:</span> ${deal.purchase_price?.toLocaleString()}</div>
              <div><span className="font-medium">Conditions:</span> {deal.conditions_cleared}/{deal.closing_conditions} cleared</div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                deal.sba_approval === 'approved' ? 'bg-green-100 text-green-800' :
                deal.sba_approval === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                SBA: {deal.sba_approval}
              </span>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                deal.apa_status === 'executed' ? 'bg-green-100 text-green-800' :
                deal.apa_status === 'in_review' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                APA: {deal.apa_status}
              </span>
            </div>
            {deal.marketplace_listed && (
              <div className="flex items-center">
                <span className="font-medium text-sm mr-2">Marketplace Funding:</span>
                <div className="flex items-center flex-1">
                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressColor((deal.funding_raised / deal.funding_target) * 100)}`}
                      style={{ width: `${(deal.funding_raised / deal.funding_target) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs">
                    ${(deal.funding_raised/1000).toFixed(0)}k/${(deal.funding_target/1000).toFixed(0)}k
                  </span>
                </div>
              </div>
            )}
            <div className="flex items-center">
              <span className="font-medium text-sm mr-2">Closing Progress:</span>
              <div className="flex items-center flex-1">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressColor(deal.closing_progress)}`}
                    style={{ width: `${deal.closing_progress}%` }}
                  ></div>
                </div>
                <span className="text-xs">{deal.closing_progress}%</span>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button className="text-blue-600 hover:text-blue-900 text-sm">
                <PlayIcon className="h-4 w-4 inline mr-1" /> Auto Close
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <SeedStackLayout user={user} onLogout={onLogout}>
      <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 p-4 lg:p-6 bg-white border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Deal Pipeline</h1>
              <p className="text-gray-600 text-sm lg:text-base">Automated workflow management for seamless acquisitions</p>
            </div>
            <Button 
              onClick={() => setShowAddDeal(true)}
              className="bg-green-600 hover:bg-green-700 text-white w-full lg:w-auto"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Deal
            </Button>
          </div>
        </div>

        {/* Stage Summary Cards */}
        <div className="flex-shrink-0 p-4 lg:p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            {stages.map((stage) => {
              const count = getStageCount(stage.id);
              const IconComponent = stage.id === 'interested' ? UserGroupIcon :
                                 stage.id === 'loi_sent' ? DocumentTextIcon :
                                 stage.id === 'diligence' ? CheckCircleIcon :
                                 BuildingOfficeIcon;
              
              return (
                <div 
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  className={`${stage.color} border-2 rounded-lg p-3 lg:p-6 cursor-pointer hover:shadow-md transition-all ${
                    activeStage === stage.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs lg:text-sm font-medium opacity-75 truncate">{stage.title}</p>
                      <p className="text-2xl lg:text-3xl font-bold">{count}</p>
                    </div>
                    <IconComponent className="h-6 w-6 lg:h-8 lg:w-8 opacity-75 flex-shrink-0 ml-2" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Table View */}
        <div className="flex-1 px-4 lg:px-6 pb-4 lg:pb-6 overflow-hidden">
          <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {stages.find(s => s.id === activeStage)?.title} Details
              </h3>
            </div>
            
            <div className="flex-1 overflow-auto">
              {/* Desktop Table View */}
              <div className="hidden lg:block">
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
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden">
                <div className="space-y-4 p-4">
                  {getDealsByStage(activeStage).map((deal) => (
                    <div key={deal.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
                      {renderMobileCard(deal)}
                    </div>
                  ))}
                </div>
              </div>
              
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