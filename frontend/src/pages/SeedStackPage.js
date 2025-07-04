import React from 'react';
import Button from '../components/ui/Button';
import {
  Squares2X2Icon,
  ChatBubbleLeftRightIcon,
  DocumentChartBarIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  ScaleIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  BanknotesIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const SeedStackPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              SeedStack<span className="text-xs align-super text-gray-600">™</span>
            </h1>
            <p className="text-xl text-gray-600 mb-2">AI-Native SMB Acquisition Platform</p>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto">
              The first AI-powered platform that transforms SMB acquisitions from a manual, relationship-driven process 
              into a data-driven, scalable business model.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/seedstack-app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Try Live Demo
              </a>
              <Button variant="outline" className="border-gray-300 text-gray-900 hover:bg-gray-50">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* AI-Powered Core Features */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Acquisition Platform</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Advanced tools that streamline, analyze, and optimize every aspect of your business acquisition process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-green-300 transition-colors">
              <MagnifyingGlassIcon className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Market Research</h3>
              <p className="text-gray-600 text-sm mb-4">Comprehensive industry analysis, competitive landscape mapping, and valuation benchmarking for informed decision-making.</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Industry trend analysis</li>
                <li>• Market size and growth projections</li>
                <li>• Competitive landscape mapping</li>
                <li>• Valuation multiple benchmarks</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-green-300 transition-colors">
              <Squares2X2Icon className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Deal Pipeline CRM</h3>
              <p className="text-gray-600 text-sm mb-4">Kanban-style deal flow management: Inbox → Interested → LOI Sent → Due Diligence → Closed.</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Drag-and-drop progression</li>
                <li>• Priority color coding</li>
                <li>• Activity tracking</li>
                <li>• Notes & next actions</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-green-300 transition-colors">
              <DocumentChartBarIcon className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Financial Analysis</h3>
              <p className="text-gray-600 text-sm mb-4">Upload financial statements to receive comprehensive analysis with red flag identification, benchmarking, and actionable insights.</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Multiple file format support</li>
                <li>• Automated red flag detection</li>
                <li>• Industry benchmarking</li>
                <li>• Professional analysis reports</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-green-300 transition-colors">
              <DocumentTextIcon className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Legal Document Suite</h3>
              <p className="text-gray-600 text-sm mb-4">Generate Letters of Intent and essential legal documents including NDAs, APA outlines, due diligence checklists, and employment agreements.</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Professional LOI creation</li>
                <li>• One-click document generation</li>
                <li>• Customizable legal terms</li>
                <li>• Instant download and sharing</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-green-300 transition-colors">
              <ChatBubbleLeftRightIcon className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Deal Assistant</h3>
              <p className="text-gray-600 text-sm mb-4">Intelligent conversational assistant that understands your deals and provides expert guidance throughout the acquisition process.</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Context-aware deal analysis</li>
                <li>• Strategic guidance and recommendations</li>
                <li>• Instant answers to acquisition questions</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-green-300 transition-colors">
              <BanknotesIcon className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">VDR & Capital Raising Tools</h3>
              <p className="text-gray-600 text-sm mb-4">Seamless virtual data room and capital raising capabilities integrated with the SeedSMB marketplace for comprehensive deal execution.</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Secure document sharing</li>
                <li>• Marketplace integration</li>
                <li>• Investor outreach tools</li>
                <li>• Deal syndication platform</li>
              </ul>
            </div>
          </div>

          {/* Platform Integrations */}
          <div className="bg-gray-100 rounded-lg p-8 mb-20">
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">Integrated Ecosystem</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Squares2X2Icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Marketplace Integration</h4>
                <p className="text-gray-600 text-sm">Seamless deal discovery with advanced filtering, saved searches, and secure document access.</p>
              </div>
              <div className="text-center">
                <UserGroupIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Broker Portal</h4>
                <p className="text-gray-600 text-sm">Comprehensive listing management, analytics dashboard, and secure document sharing for brokers.</p>
              </div>
              <div className="text-center">
                <CurrencyDollarIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Investor Portal</h4>
                <p className="text-gray-600 text-sm">Investment campaign management, portfolio tracking, and comprehensive performance monitoring.</p>
              </div>
            </div>
          </div>

          {/* Key Differentiators */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-16">
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">What Makes SeedStack™ Different</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">🚀 Modern Technology</h4>
                <p className="text-gray-600 text-sm mb-3">Built with cutting-edge technology for intelligent automation and insights.</p>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-4">🔗 Integrated Ecosystem</h4>
                <p className="text-gray-600 text-sm mb-3">Seamless flow between discovery, analysis, and funding in one unified platform.</p>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-4">🏢 Professional Grade</h4>
                <p className="text-gray-600 text-sm">Enterprise-quality tools designed for serious acquisition professionals.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">⚖️ Regulatory Compliance</h4>
                <p className="text-gray-600 text-sm mb-3">Built-in Regulation CF and securities compliance for investment features.</p>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-4">📊 Data-Driven Insights</h4>
                <p className="text-gray-600 text-sm mb-3">Advanced analytics and market intelligence for informed decision-making.</p>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-4">⚡ Performance Optimized</h4>
                <p className="text-gray-600 text-sm">Lightning-fast performance with enterprise-grade infrastructure and security.</p>
              </div>
            </div>
          </div>

          {/* Success Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">$10M+</div>
              <p className="text-gray-700 text-sm">Deal flow facilitated</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">100+</div>
              <p className="text-gray-700 text-sm">Successful transactions</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
              <p className="text-gray-700 text-sm">Uptime SLA</p>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Simple, Transparent Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Starter</h4>
                <div className="text-3xl font-bold text-gray-900 mb-4">$299<span className="text-sm text-gray-600 font-normal">/month</span></div>
                <ul className="space-y-3 text-gray-600 text-sm mb-8">
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />Up to 25 active deals</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />AI assistant & chat</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />P&L analyzer</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />Basic templates</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />Email support</li>
                </ul>
                <Button variant="outline" className="w-full border-gray-300 text-gray-900 hover:bg-gray-50">
                  Start Free Trial
                </Button>
              </div>
              
              <div className="bg-white rounded-lg border-2 border-green-600 p-8 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Professional</h4>
                <div className="text-3xl font-bold text-gray-900 mb-4">$799<span className="text-sm text-gray-600 font-normal">/month</span></div>
                <ul className="space-y-3 text-gray-600 text-sm mb-8">
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />Unlimited deals</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />Advanced AI features</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />Market research engine</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />All legal templates</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />Priority support</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />Marketplace integration</li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Start Free Trial
                </Button>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Enterprise</h4>
                <div className="text-3xl font-bold text-gray-900 mb-4">Custom</div>
                <ul className="space-y-3 text-gray-600 text-sm mb-8">
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />White-label solution</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />Custom integrations</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />Dedicated support</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />API access</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />Custom training</li>
                </ul>
                <Button variant="outline" className="w-full border-gray-300 text-gray-900 hover:bg-gray-50">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Transform Your SMB Acquisition Process</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join 1,000+ acquisition professionals who have revolutionized their deal flow with AI-powered tools.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/seedstack-app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Try Live Demo
              </a>
              <Button variant="outline" className="border-gray-300 text-gray-900 hover:bg-gray-50">
                Schedule Demo
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">No setup required • Full feature access • Explore all capabilities</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeedStackPage;