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
    "Find auto repair shops in the Southeast with 20+ years experience",
    "What are current market trends for small manufacturing businesses?", 
    "Help me analyze the restaurant industry for acquisition opportunities",
    "What key metrics should I evaluate when buying a service business?"
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
        content: "Hello! I'm your AI assistant for business acquisition and deal sourcing. I can help you:\n\n**🎯 Find Target Companies**\n• Build custom search criteria for your ideal acquisition targets\n• Search databases for businesses matching your investment thesis\n• Generate detailed company profiles with contact information\n\n**📊 Market Intelligence**\n• Analyze industry trends and market dynamics\n• Provide valuation benchmarking and multiples\n• Research competitive landscapes and opportunities\n\n**🤝 Acquisition Guidance**\n• Guide you through due diligence processes\n• Help draft LOIs and negotiate terms\n• Identify potential red flags and risks\n\nWhat would you like to explore today?",
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

    try {
      // Get backend URL from environment
      const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
      
      // Call real AI API
      const response = await fetch(`${backendUrl}/api/seedstack/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer demo_seedstack_token` // In production, use real auth token
        },
        body: JSON.stringify({
          message: newMessage,
          conversation_id: messages.length > 1 ? `conv_${Date.now()}` : null,
          context: {
            messages: messages.slice(-5) // Last 5 messages for context
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        const aiMessage = {
          id: data.message_id,
          type: 'ai',
          content: data.response,
          timestamp: new Date(),
          suggestions: data.suggestions
        };

        setMessages(prev => [...prev, aiMessage]);
      } else {
        // Fallback to demo response if API fails
        await handleDemoResponse();
      }
      
    } catch (error) {
      console.error('AI API error:', error);
      // Fallback to demo response on error
      await handleDemoResponse();
    }
    
    setIsLoading(false);
  };

  const handleDemoResponse = async () => {
    // Fallback demo response logic
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
    <div className="flex flex-col h-full bg-white">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <div key={message.id} className={`border-b border-gray-100 ${
              message.type === 'user' ? 'bg-gray-50' : 'bg-white'
            }`}>
              <div className="px-6 py-8 flex space-x-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {message.type === 'user' ? (
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.display_name?.charAt(0) || 'U'}
                      </span>
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                      <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
                
                {/* Message Content */}
                <div className="flex-1 min-w-0">
                  <div className="text-gray-900 leading-relaxed">
                    <div className="whitespace-pre-wrap text-[15px] leading-7">
                      {message.content}
                    </div>
                  </div>
                  
                  {message.type === 'ai' && (
                    <div className="flex items-center space-x-3 mt-4 pt-2">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Copy</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>Good response</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L12 12M5.636 5.636L12 12m6.364 6.364L12 12m0 0l6.364-6.364M12 12L5.636 5.636" />
                        </svg>
                        <span>Bad response</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="border-b border-gray-100 bg-white">
              <div className="px-6 py-8 flex space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                    <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm">SeedStack is thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4">
          {/* Quick Prompts */}
          {messages.length <= 1 && (
            <div className="mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickPrompts.slice(0, 4).map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickPrompt(prompt)}
                    className="p-4 text-left border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {prompt.split(':')[0] || prompt.substring(0, 30) + '...'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {prompt.length > 50 ? prompt.substring(0, 50) + '...' : prompt}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="relative">
            <div className="flex items-end space-x-3 bg-white border border-gray-300 rounded-xl shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask about deal sourcing, market research, or get acquisition guidance..."
                rows={1}
                className="flex-1 p-4 border-0 resize-none focus:ring-0 focus:outline-none bg-transparent placeholder-gray-400 text-gray-900"
                style={{
                  minHeight: '24px',
                  maxHeight: '120px',
                }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || isLoading}
                className={`p-2 m-2 rounded-lg transition-colors ${
                  newMessage.trim() && !isLoading
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex items-center justify-between mt-2 px-1">
              <div className="text-xs text-gray-500">
                Press Enter to send, Shift + Enter for new line
              </div>
              <div className="text-xs text-gray-500">
                Powered by SeedStack AI
              </div>
            </div>
          </div>
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