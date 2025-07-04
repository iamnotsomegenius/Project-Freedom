import React, { useState, useEffect, useRef } from 'react';
import SeedStackLayout from './SeedStackLayout';
import {
  PaperAirplaneIcon,
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  UserGroupIcon,
  CalendarIcon,
  ShieldCheckIcon,
  PlayIcon,
  DocumentChartBarIcon,
  DocumentTextIcon,
  FunnelIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import Button from '../ui/Button';

const DealSourcingAI = ({ user, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [sourcingCriteria, setSourcingCriteria] = useState({
    industry: '',
    location: '',
    radius: '',
    employees: '',
    years_in_business: '',
    ownership_type: '',
    revenue_range: '',
    additional_criteria: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const messagesEndRef = useRef(null);

  const tabs = [
    { id: 'chat', name: 'AI Assistant', icon: ChatBubbleLeftRightIcon },
    { id: 'sourcing', name: 'Deal Sourcing', icon: MagnifyingGlassIcon },
    { id: 'universe', name: 'Buyer Universe', icon: FunnelIcon },
  ];

  const quickPrompts = [
    "Find auto repair shops in the Southeast that meet my criteria",
    "Analyze market trends for small manufacturing businesses",
    "Help me build a buyer universe for restaurants under $2M",
    "What are key due diligence areas for service businesses?",
    "Draft an LOI template for small acquisitions",
    "Identify red flags in franchise businesses"
  ];

  const presetCriteria = [
    {
      name: "Auto Repair Shops (Southeast)",
      criteria: {
        industry: "Auto Repair & Maintenance",
        location: "Southeast US (GA, FL, SC, NC, TN, AL)",
        radius: "50 miles from major metros",
        employees: "10-50 employees",
        years_in_business: "20+ years",
        ownership_type: "Founder-owned (no PE)",
        revenue_range: "$1M - $5M",
        additional_criteria: "Family-owned, established customer base"
      }
    },
    {
      name: "Regional Restaurants",
      criteria: {
        industry: "Full-Service Restaurants",
        location: "Midwest regional markets",
        radius: "25 miles from mid-size cities",
        employees: "15-40 employees",
        years_in_business: "10+ years",
        ownership_type: "Independent owner",
        revenue_range: "$800K - $3M",
        additional_criteria: "Local brand, repeat customers"
      }
    },
    {
      name: "B2B Service Companies",
      criteria: {
        industry: "Professional Services",
        location: "Major metro suburbs",
        radius: "30 miles from downtown",
        employees: "5-25 employees",
        years_in_business: "15+ years",
        ownership_type: "Founder-owned",
        revenue_range: "$500K - $2.5M",
        additional_criteria: "Recurring revenue model"
      }
    }
  ];

  useEffect(() => {
    // Load initial welcome message
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: "🎯 **Deal Sourcing & AI Assistant**\n\nI can help you:\n\n**🔍 Find Target Companies:**\n• Build custom buyer universes with specific criteria\n• Search for businesses matching your investment thesis\n• Auto-populate qualified deals into your CRM\n\n**📊 Market Intelligence:**\n• Industry analysis and market trends\n• Valuation benchmarking\n• Competitive landscape research\n\n**🤝 Deal Guidance:**\n• Due diligence planning\n• LOI drafting and negotiation\n• Financial analysis and red flags\n\nTry: \"Find auto repair shops in the Southeast\" or use the Deal Sourcing tab to build a custom search!",
        timestamp: new Date()
      }
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    // Simulate AI response based on message content
    setTimeout(() => {
      let aiResponse = '';
      
      if (newMessage.toLowerCase().includes('auto repair') || newMessage.toLowerCase().includes('southeast')) {
        aiResponse = `🔍 **Auto Repair Shop Analysis - Southeast Region**

I found **127 potential targets** matching your criteria:

**Key Insights:**
• Average revenue: $2.3M (range: $800K - $4.2M)
• Typical EBITDA margin: 12-18%
• Most are 15-35 years in business
• 89% are founder-owned
• Strong recurring customer base (avg 65% repeat)

**Top Markets:**
• Atlanta suburbs: 23 shops
• Charlotte region: 18 shops  
• Nashville area: 15 shops
• Jacksonville: 12 shops

**Investment Thesis Match:**
✅ Recession-resistant business model
✅ Aging vehicle fleet = more repairs
✅ Difficult to replicate locally
✅ Strong cash flow generation

Would you like me to **auto-populate the top 20 prospects** into your CRM and start automated outreach?`;
      } else if (newMessage.toLowerCase().includes('restaurant') || newMessage.toLowerCase().includes('food')) {
        aiResponse = `🍽️ **Restaurant Industry Analysis**

**Market Overview:**
• Post-COVID recovery at 95% of pre-pandemic levels
• Labor cost inflation averaging 8-12%
• Technology adoption accelerating (QR codes, delivery)

**Valuation Multiples:**
• Full-service: 2.5-4.0x EBITDA
• Fast-casual: 3.5-5.5x EBITDA
• QSR franchises: 4.0-6.0x EBITDA

**Key Due Diligence Areas:**
1. **Labor & Staffing**: Current wage rates, turnover
2. **Lease Terms**: Rent escalations, renewal options
3. **Local Competition**: New entrants, delivery impact
4. **Technology Stack**: POS, ordering, loyalty systems

**Red Flags to Watch:**
⚠️ Declining same-store sales
⚠️ High employee turnover (>100%/year)
⚠️ Lease expiring within 2 years
⚠️ Heavy reliance on delivery platforms`;
      } else if (newMessage.toLowerCase().includes('due diligence') || newMessage.toLowerCase().includes('red flags')) {
        aiResponse = `🔍 **Due Diligence Checklist - Small Business Acquisitions**

**Financial Red Flags:**
⚠️ Declining revenue 3+ years
⚠️ EBITDA margins below industry average
⚠️ High customer concentration (>20% from single client)
⚠️ Unusual expense timing around sale date
⚠️ Personal expenses mixed with business

**Operational Red Flags:**
⚠️ Key person dependency on owner
⚠️ Outdated systems/technology
⚠️ Regulatory compliance issues
⚠️ High employee turnover
⚠️ Customer complaints/reviews trending down

**Legal Red Flags:**
⚠️ Pending litigation
⚠️ Lease issues or expiration
⚠️ Licensing problems
⚠️ Environmental concerns
⚠️ Intellectual property disputes

**Priority Areas to Investigate:**
1. **Customer Analysis** (retention, concentration)
2. **Financial Quality** (adjusted EBITDA)
3. **Management Team** (key person risk)
4. **Market Position** (competitive moat)
5. **Growth Opportunities** (scalability)`;
      } else {
        aiResponse = `I can help you with deal sourcing, market research, and acquisition guidance. Try asking about:

• "Find [industry] businesses in [location]"
• "Analyze [industry] market trends"
• "Due diligence checklist for [business type]"
• "Draft LOI for [deal specifics]"
• "Red flags in [industry]"

Or use the **Deal Sourcing** tab to build a custom buyer universe!`;
      }

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickPrompt = (prompt) => {
    setNewMessage(prompt);
  };

  const handlePresetCriteria = (preset) => {
    setSourcingCriteria(preset.criteria);
  };

  const handleSearchDeals = async () => {
    setIsSearching(true);
    
    // Simulate search with realistic results
    setTimeout(() => {
      const mockResults = [
        {
          id: 1,
          company_name: "Southeast Auto Care",
          industry: "Auto Repair & Maintenance",
          location: "Marietta, GA",
          distance: "28 miles from Atlanta",
          employees: 15,
          years_in_business: 24,
          estimated_revenue: 2100000,
          ownership: "Founder-owned",
          match_score: 95,
          contact_info: {
            owner: "Robert Johnson",
            phone: "(770) 555-0123",
            email: "rjohnson@seautocare.com"
          },
          business_details: {
            specialties: ["Import repair", "Fleet services", "State inspections"],
            facilities: "6-bay shop with modern equipment",
            customer_base: "2,400+ active customers"
          }
        },
        {
          id: 2,
          company_name: "Precision Motors LLC",
          industry: "Auto Repair & Maintenance", 
          location: "Matthews, NC",
          distance: "12 miles from Charlotte",
          employees: 22,
          years_in_business: 31,
          estimated_revenue: 2850000,
          ownership: "Founder-owned",
          match_score: 92,
          contact_info: {
            owner: "David Martinez",
            phone: "(704) 555-0456",
            email: "dmartinez@precisionmotors.com"
          },
          business_details: {
            specialties: ["European vehicles", "Performance tuning", "Classic car restoration"],
            facilities: "8-bay facility with tire center",
            customer_base: "3,100+ customers, 70% repeat"
          }
        },
        {
          id: 3,
          company_name: "Family Auto Service",
          industry: "Auto Repair & Maintenance",
          location: "Smyrna, TN", 
          distance: "15 miles from Nashville",
          employees: 18,
          years_in_business: 28,
          estimated_revenue: 1950000,
          ownership: "Second-generation family",
          match_score: 89,
          contact_info: {
            owner: "Michael Thompson",
            phone: "(615) 555-0789",
            email: "mthompson@familyautoservice.com"
          },
          business_details: {
            specialties: ["General repair", "Oil changes", "Brake service"],
            facilities: "5-bay shop with customer lounge",
            customer_base: "1,800+ regular customers"
          }
        }
      ];
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 2000);
  };

  const handleAddToCRM = async (company, index) => {
    // Simulate adding to CRM
    const deal = {
      company_name: company.company_name,
      industry: company.industry,
      location: company.location,
      revenue: company.estimated_revenue,
      stage: 'interested',
      contact_person: company.contact_info.owner,
      email: company.contact_info.email,
      phone: company.contact_info.phone,
      source: 'AI Deal Sourcing'
    };

    // Visual feedback
    const button = document.querySelector(`[data-company-id="${company.id}"]`);
    if (button) {
      button.textContent = 'Added!';
      button.classList.add('bg-green-600');
      button.disabled = true;
    }

    // Show success message
    const successMessage = {
      id: Date.now(),
      type: 'ai',
      content: `✅ **${company.company_name}** has been added to your CRM!\n\n**Next Steps:**\n• Automated NDA email will be sent to ${company.contact_info.owner}\n• Initial outreach sequence started\n• Company profile created in "Interested" stage\n\nYou can track progress in the Deal Pipeline.`,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, successMessage]);
  };

  const renderChatTab = () => (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-3xl p-3 rounded-lg ${
              message.type === 'user' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-900'
            }`}>
              <div className="whitespace-pre-wrap text-sm">
                {message.content}
              </div>
              <div className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <p className="text-sm text-gray-600 mb-2">Quick prompts:</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {quickPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handleQuickPrompt(prompt)}
              className="px-3 py-1 text-xs bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about deals, markets, or get acquisition guidance..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isLoading}
            className="bg-green-600 hover:bg-green-700 text-white px-4"
          >
            <PaperAirplaneIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderSourcingTab = () => (
    <div className="p-6 space-y-6">
      {/* Preset Criteria */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Start Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {presetCriteria.map((preset, index) => (
            <div 
              key={index}
              onClick={() => handlePresetCriteria(preset)}
              className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-green-300 hover:bg-green-50 transition-colors"
            >
              <h4 className="font-medium text-gray-900 mb-2">{preset.name}</h4>
              <p className="text-sm text-gray-600">{preset.criteria.industry}</p>
              <p className="text-xs text-gray-500 mt-1">{preset.criteria.location}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Criteria Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Search Criteria</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <BuildingOfficeIcon className="h-4 w-4 inline mr-1" />
              Industry
            </label>
            <input
              type="text"
              value={sourcingCriteria.industry}
              onChange={(e) => setSourcingCriteria({...sourcingCriteria, industry: e.target.value})}
              placeholder="Auto Repair & Maintenance"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <MapPinIcon className="h-4 w-4 inline mr-1" />
              Location & Radius
            </label>
            <input
              type="text"
              value={sourcingCriteria.location}
              onChange={(e) => setSourcingCriteria({...sourcingCriteria, location: e.target.value})}
              placeholder="Southeast US, 50 miles from major metros"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <UserGroupIcon className="h-4 w-4 inline mr-1" />
              Employee Count
            </label>
            <input
              type="text"
              value={sourcingCriteria.employees}
              onChange={(e) => setSourcingCriteria({...sourcingCriteria, employees: e.target.value})}
              placeholder="10-50 employees"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <CalendarIcon className="h-4 w-4 inline mr-1" />
              Years in Business
            </label>
            <input
              type="text"
              value={sourcingCriteria.years_in_business}
              onChange={(e) => setSourcingCriteria({...sourcingCriteria, years_in_business: e.target.value})}
              placeholder="20+ years"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <ShieldCheckIcon className="h-4 w-4 inline mr-1" />
              Ownership Type
            </label>
            <input
              type="text"
              value={sourcingCriteria.ownership_type}
              onChange={(e) => setSourcingCriteria({...sourcingCriteria, ownership_type: e.target.value})}
              placeholder="Founder-owned (no PE)"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Revenue Range
            </label>
            <input
              type="text"
              value={sourcingCriteria.revenue_range}
              onChange={(e) => setSourcingCriteria({...sourcingCriteria, revenue_range: e.target.value})}
              placeholder="$1M - $5M"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Criteria
          </label>
          <textarea
            value={sourcingCriteria.additional_criteria}
            onChange={(e) => setSourcingCriteria({...sourcingCriteria, additional_criteria: e.target.value})}
            placeholder="Family-owned, established customer base, recession-resistant..."
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mt-6">
          <Button
            onClick={handleSearchDeals}
            disabled={isSearching || !sourcingCriteria.industry}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isSearching ? (
              <>
                <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                Searching Universe...
              </>
            ) : (
              <>
                <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                Find Matching Companies
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Found {searchResults.length} Matching Companies
            </h3>
            <p className="text-sm text-gray-600">High-probability acquisition targets based on your criteria</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {searchResults.map((company, index) => (
              <div key={company.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{company.company_name}</h4>
                    <p className="text-sm text-gray-600">{company.location} • {company.distance}</p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      {company.match_score}% match
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Est. Revenue</p>
                    <p className="font-medium">${(company.estimated_revenue/1000000).toFixed(1)}M</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Employees</p>
                    <p className="font-medium">{company.employees}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Years in Business</p>
                    <p className="font-medium">{company.years_in_business}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Ownership</p>
                    <p className="font-medium">{company.ownership}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Specialties:</strong> {company.business_details.specialties.join(', ')}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Facilities:</strong> {company.business_details.facilities}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Customer Base:</strong> {company.business_details.customer_base}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <strong>Contact:</strong> {company.contact_info.owner} • {company.contact_info.phone}
                  </div>
                  <Button
                    onClick={() => handleAddToCRM(company, index)}
                    data-company-id={company.id}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add to CRM & Start Outreach
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <Button
              onClick={() => {
                // Add all companies to CRM
                searchResults.forEach((company, index) => {
                  setTimeout(() => handleAddToCRM(company, index), index * 500);
                });
              }}
              className="bg-green-600 hover:bg-green-700 text-white mr-3"
            >
              <PlayIcon className="h-4 w-4 mr-2" />
              Add All to CRM & Start Automated Outreach
            </Button>
            <span className="text-sm text-gray-600">
              This will create CRM entries and begin personalized email sequences for all {searchResults.length} companies
            </span>
          </div>
        </div>
      )}
    </div>
  );

  const renderUniverseTab = () => (
    <div className="p-6">
      <div className="text-center py-12">
        <FunnelIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Buyer Universe Management</h3>
        <p className="text-gray-600 mb-6">
          Save and manage your acquisition search criteria for ongoing deal sourcing
        </p>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Create Saved Universe
        </Button>
      </div>
    </div>
  );

  return (
    <SeedStackLayout user={user} onLogout={onLogout}>
      <div className="h-full flex flex-col bg-gray-50">
        {/* Header */}
        <div className="flex-shrink-0 p-6 bg-white border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Deal Sourcing & AI Assistant</h1>
              <p className="text-gray-600">Find target companies, get market insights, and automate outreach</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200">
          <div className="px-6">
            <div className="flex space-x-8">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="h-4 w-4 inline mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'chat' && renderChatTab()}
          {activeTab === 'sourcing' && (
            <div className="h-full overflow-y-auto">
              {renderSourcingTab()}
            </div>
          )}
          {activeTab === 'universe' && renderUniverseTab()}
        </div>
      </div>
    </SeedStackLayout>
  );
};

export default DealSourcingAI;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(newMessage, messageType);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (message, type) => {
    // Mock AI responses based on message type and content
    const lowerMessage = message.toLowerCase();

    if (type === 'deal_analysis') {
      if (lowerMessage.includes('financial') || lowerMessage.includes('p&l')) {
        return "Based on your financial analysis request, here are key areas to examine:\n\n📊 **Revenue Analysis:**\n• Revenue growth trends (3-5 years)\n• Customer concentration risk\n• Recurring vs. one-time revenue\n\n💰 **Profitability Metrics:**\n• Gross margin stability\n• EBITDA trends and adjustments\n• Working capital requirements\n\n🚩 **Red Flags to Watch:**\n• Declining margins\n• Increasing AR/inventory\n• Customer concentration >20%\n\nWould you like me to dive deeper into any specific area?";
      } else if (lowerMessage.includes('valuation') || lowerMessage.includes('multiple')) {
        return "For valuation analysis, I recommend focusing on:\n\n📈 **Market Multiples:**\n• Industry median: 4-8x EBITDA\n• Size premium adjustments\n• Growth rate considerations\n\n🎯 **Value Drivers:**\n• Management quality\n• Market position\n• Growth potential\n• Defensive characteristics\n\n💡 **Negotiation Strategy:**\n• Start with comparable multiples\n• Adjust for specific risks/opportunities\n• Consider earnout structures\n\nWhat's the business size and industry for more specific guidance?";
      }
      return "I can help analyze this deal from multiple angles. Could you share more details about the specific aspect you'd like me to focus on? For example:\n\n• Financial performance review\n• Market position analysis\n• Risk assessment\n• Valuation methodology\n• Strategic fit evaluation";
    }

    if (type === 'market_research') {
      return "For comprehensive market research, I'll help you analyze:\n\n🏢 **Industry Overview:**\n• Market size and growth trends\n• Key competitive dynamics\n• Regulatory environment\n\n📊 **Benchmarking:**\n• Comparable company analysis\n• Transaction multiples\n• Performance metrics\n\n🎯 **Market Position:**\n• Competitive advantages\n• Market share analysis\n• Customer base evaluation\n\nWhat industry and geographic market should we research?";
    }

    if (type === 'loi_help') {
      return "I'll help you craft an effective LOI. Key components to include:\n\n📋 **Essential Terms:**\n• Purchase price and structure\n• Due diligence timeline (30-60 days)\n• Financing contingencies\n• Exclusivity period (30-45 days)\n\n⚖️ **Negotiation Elements:**\n• Earnout provisions if applicable\n• Key employee retention\n• Non-compete agreements\n• Asset vs. stock purchase\n\n✅ **Next Steps:**\n• Timeline for definitive agreement\n• Key conditions precedent\n• Break-up fee provisions\n\nWhat specific terms would you like help structuring?";
    }

    // General responses
    if (lowerMessage.includes('due diligence')) {
      return "Here's a comprehensive due diligence checklist:\n\n📊 **Financial DD:**\n• 3-5 years audited financials\n• Monthly P&L and cash flow\n• Customer contracts and concentration\n• Vendor relationships\n\n⚖️ **Legal DD:**\n• Corporate structure and compliance\n• Material contracts review\n• Litigation and regulatory matters\n• IP and asset ownership\n\n🏢 **Operational DD:**\n• Management team assessment\n• Systems and processes\n• Market position and competition\n• Growth opportunities and risks\n\nWhich area would you like me to elaborate on?";
    }

    // Default response
    return `I understand you're asking about: "${message}"\n\nBased on my experience with SMB acquisitions, here are some key considerations:\n\n• Focus on sustainable cash flow and customer relationships\n• Understand the management team's role in operations\n• Identify key growth drivers and potential risks\n• Consider market dynamics and competitive position\n\nWould you like me to dive deeper into any specific aspect of this deal or provide more targeted analysis?`;
  };

  const handleQuickPrompt = (prompt) => {
    setNewMessage(prompt);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <SeedStackLayout user={user} onLogout={onLogout}>
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
              <p className="text-gray-600">Get intelligent guidance for your acquisitions</p>
            </div>
            
            <div className="flex space-x-4">
              <select
                value={messageType}
                onChange={(e) => setMessageType(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                {messageTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Quick Prompts */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Quick prompts:</p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.slice(0, 3).map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickPrompt(prompt)}
                  className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3xl p-4 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                    <span className="text-gray-600">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="p-6 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <div className="flex space-x-4">
              <div className="flex-1">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about deal analysis, market research, or acquisition strategy..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows="2"
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || isLoading}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <PaperAirplaneIcon className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Additional Quick Prompts */}
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                {quickPrompts.slice(3).map((prompt, index) => (
                  <button
                    key={index + 3}
                    onClick={() => handleQuickPrompt(prompt)}
                    className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SeedStackLayout>
  );
};

export default AIAssistant;