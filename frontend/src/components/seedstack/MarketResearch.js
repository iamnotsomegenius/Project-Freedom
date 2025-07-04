import React, { useState } from 'react';
import SeedStackLayout from './SeedStackLayout';
import {
  MagnifyingGlassIcon,
  ChartBarIcon,
  BanknotesIcon,
  TrendingUpIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';
import Button from '../ui/Button';

const MarketResearch = ({ user, onLogout }) => {
  const [formData, setFormData] = useState({
    industry: '',
    location: '',
    naics_code: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [research, setResearch] = useState(null);

  const industryOptions = [
    'Technology Services',
    'Manufacturing',
    'Healthcare Services',
    'Professional Services',
    'Food & Beverage',
    'Retail',
    'Construction',
    'Transportation',
    'Real Estate',
    'Financial Services'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.industry || !formData.location) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock research data
    const mockResearch = {
      industry: formData.industry,
      location: formData.location,
      naics_code: '541511',
      overview: {
        market_size: '$45.2B',
        growth_rate: '8.7%',
        employment: '2.1M workers',
        establishments: '184,000 businesses'
      },
      trends: [
        'Digital transformation acceleration driving 15% annual growth',
        'Consolidation among smaller players creating acquisition opportunities',
        'Increased focus on cybersecurity and compliance services',
        'Remote work driving demand for cloud-based solutions',
        'AI and automation transforming service delivery models'
      ],
      competitive_landscape: {
        market_leaders: [
          { name: 'TechGlobal Corp', market_share: '12%', revenue: '$5.4B' },
          { name: 'Innovation Systems', market_share: '8%', revenue: '$3.6B' },
          { name: 'Digital Solutions Inc', market_share: '6%', revenue: '$2.7B' }
        ],
        market_concentration: 'Fragmented - Top 10 players control 35% of market',
        barriers_to_entry: 'Medium - Requires specialized skills and certifications'
      },
      location_analysis: {
        market_penetration: 'High',
        competition_density: 'Very High',
        economic_indicators: {
          gdp_growth: '3.2%',
          unemployment: '4.1%',
          median_income: '$75,000',
          business_climate_rank: '12th nationally'
        },
        cost_factors: {
          office_rent: '$28/sq ft',
          average_salary: '$85,000',
          tax_rate: '6.5%'
        }
      },
      valuation_data: {
        revenue_multiples: {
          low: '1.8x',
          median: '2.5x',
          high: '3.2x'
        },
        ebitda_multiples: {
          low: '4.2x',
          median: '6.8x',
          high: '9.1x'
        },
        recent_transactions: [
          { company: 'TechServ Solutions', multiple: '7.2x EBITDA', date: 'Q4 2024', size: '$12M' },
          { company: 'Digital Consulting Group', multiple: '6.1x EBITDA', date: 'Q3 2024', size: '$8M' },
          { company: 'CloudFirst Technologies', multiple: '8.5x EBITDA', date: 'Q2 2024', size: '$25M' }
        ]
      },
      risk_factors: [
        'Technology disruption risk - 35% of services could be automated',
        'Economic sensitivity - 20% revenue decline in recessions',
        'Talent acquisition challenges in competitive market',
        'Client concentration risk for smaller players',
        'Regulatory changes affecting data privacy requirements'
      ],
      opportunities: [
        'Growing demand from SMBs needing digital transformation',
        'Government contracts increasing by 12% annually',
        'Expansion into emerging technologies (AI, IoT, blockchain)',
        'Roll-up opportunities in fragmented market',
        'Cross-selling opportunities with complementary services'
      ]
    };
    
    setResearch(mockResearch);
    setIsLoading(false);
  };

  const resetResearch = () => {
    setResearch(null);
    setFormData({ industry: '', location: '', naics_code: '' });
  };

  return (
    <SeedStackLayout user={user} onLogout={onLogout}>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Market Research</h1>
          <p className="text-gray-600">Generate comprehensive industry and market analysis</p>
        </div>

        {!research && (
          /* Research Form */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="text-center mb-6">
                <MagnifyingGlassIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900">Start Your Market Research</h2>
                <p className="text-gray-600">Get AI-powered insights on industry trends, competition, and valuations</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry *
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({...formData, industry: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  >
                    <option value="">Select an industry</option>
                    {industryOptions.map((industry) => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="e.g., Austin, TX or Texas or United States"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NAICS Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.naics_code}
                    onChange={(e) => setFormData({...formData, naics_code: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="e.g., 541511"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter specific NAICS code for more targeted research
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={!formData.industry || !formData.location || isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  {isLoading ? 'Generating Research...' : 'Generate Market Research'}
                </Button>
              </form>

              {isLoading && (
                <div className="mt-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                  <p className="text-sm text-gray-600 mt-2">Analyzing market data...</p>
                </div>
              )}
            </div>
          </div>
        )}

        {research && (
          /* Research Results */
          <div className="space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {research.industry} Market Analysis
                  </h2>
                  <p className="text-gray-600">{research.location}</p>
                </div>
                <Button 
                  onClick={resetResearch}
                  variant="outline"
                  className="border-gray-300 text-gray-700"
                >
                  New Research
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <ChartBarIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Market Size</p>
                  <p className="text-xl font-bold text-gray-900">{research.overview.market_size}</p>
                </div>
                
                <div className="text-center">
                  <TrendingUpIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Growth Rate</p>
                  <p className="text-xl font-bold text-gray-900">{research.overview.growth_rate}</p>
                </div>
                
                <div className="text-center">
                  <BuildingOfficeIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Establishments</p>
                  <p className="text-xl font-bold text-gray-900">{research.overview.establishments}</p>
                </div>
                
                <div className="text-center">
                  <BanknotesIcon className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Employment</p>
                  <p className="text-xl font-bold text-gray-900">{research.overview.employment}</p>
                </div>
              </div>
            </div>

            {/* Key Trends */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Trends</h3>
              <ul className="space-y-3">
                {research.trends.map((trend, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-2 w-2 bg-green-600 rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-700">{trend}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Competitive Landscape */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Competitive Landscape</h3>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Market Leaders</h4>
                <div className="space-y-3">
                  {research.competitive_landscape.market_leaders.map((leader, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{leader.name}</p>
                        <p className="text-sm text-gray-600">Market Share: {leader.market_share}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{leader.revenue}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Market Concentration</h4>
                  <p className="text-sm text-gray-700">{research.competitive_landscape.market_concentration}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Barriers to Entry</h4>
                  <p className="text-sm text-gray-700">{research.competitive_landscape.barriers_to_entry}</p>
                </div>
              </div>
            </div>

            {/* Valuation Multiples */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Valuation Benchmarks</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Revenue Multiples</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Low:</span>
                      <span className="text-sm font-medium">{research.valuation_data.revenue_multiples.low}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Median:</span>
                      <span className="text-sm font-medium">{research.valuation_data.revenue_multiples.median}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">High:</span>
                      <span className="text-sm font-medium">{research.valuation_data.revenue_multiples.high}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">EBITDA Multiples</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Low:</span>
                      <span className="text-sm font-medium">{research.valuation_data.ebitda_multiples.low}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Median:</span>
                      <span className="text-sm font-medium">{research.valuation_data.ebitda_multiples.median}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">High:</span>
                      <span className="text-sm font-medium">{research.valuation_data.ebitda_multiples.high}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Recent Transactions</h4>
                <div className="space-y-3">
                  {research.valuation_data.recent_transactions.map((transaction, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{transaction.company}</p>
                        <p className="text-sm text-gray-600">{transaction.date} • {transaction.size}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{transaction.multiple}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Location Analysis */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Analysis - {research.location}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Economic Indicators</h4>
                  <div className="space-y-2">
                    {Object.entries(research.location_analysis.economic_indicators).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm text-gray-600 capitalize">{key.replace('_', ' ')}:</span>
                        <span className="text-sm font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Cost Factors</h4>
                  <div className="space-y-2">
                    {Object.entries(research.location_analysis.cost_factors).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm text-gray-600 capitalize">{key.replace('_', ' ')}:</span>
                        <span className="text-sm font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Factors & Opportunities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-900 mb-4">Risk Factors</h3>
                <ul className="space-y-2">
                  {research.risk_factors.map((risk, index) => (
                    <li key={index} className="text-sm text-red-800 flex items-start">
                      <div className="flex-shrink-0 h-2 w-2 bg-red-600 rounded-full mt-2 mr-3"></div>
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Opportunities</h3>
                <ul className="space-y-2">
                  {research.opportunities.map((opportunity, index) => (
                    <li key={index} className="text-sm text-green-800 flex items-start">
                      <div className="flex-shrink-0 h-2 w-2 bg-green-600 rounded-full mt-2 mr-3"></div>
                      {opportunity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </SeedStackLayout>
  );
};

export default MarketResearch;