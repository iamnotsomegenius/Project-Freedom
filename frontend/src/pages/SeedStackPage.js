import React from 'react';
import Button from '../components/ui/Button';
import {
  Squares2X2Icon,
  ChatBubbleLeftRightIcon,
  DocumentChartBarIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  ScaleIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  PencilSquareIcon,
  FolderIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  CloudArrowUpIcon,
  ChartPieIcon,
  BanknotesIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  CogIcon,
  BoltIcon,
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
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Start Free 14-Day Trial
              </Button>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AI-Powered Deal Intelligence</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Revolutionary AI tools that analyze, research, and generate everything you need for successful acquisitions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-green-300 transition-colors">
              <ChatBubbleLeftRightIcon className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Assistant Chat</h3>
              <p className="text-gray-600 text-sm mb-4">Conversational GPT-4 integration with context-aware responses based on your deal pipeline and analysis needs.</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Real-time chat with deal context</li>
                <li>• Quick action buttons</li>
                <li>• Message history & threading</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-green-300 transition-colors">
              <DocumentChartBarIcon className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">P&L Analyzer</h3>
              <p className="text-gray-600 text-sm mb-4">Upload financial statements and get instant AI-powered analysis with red flags, benchmarking, and actionable insights.</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Support for Excel, CSV files</li>
                <li>• Red flag identification</li>
                <li>• Industry benchmarking</li>
                <li>• Downloadable reports</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-green-300 transition-colors">
              <MagnifyingGlassIcon className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Market Research Engine</h3>
              <p className="text-gray-600 text-sm mb-4">Automated industry analysis, competitive landscape mapping, and valuation multiple benchmarking by NAICS code.</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Industry trend analysis</li>
                <li>• Market size projections</li>
                <li>• Competitive mapping</li>
                <li>• Valuation multiples</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-green-300 transition-colors">
              <DocumentTextIcon className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">LOI Generator</h3>
              <p className="text-gray-600 text-sm mb-4">AI-powered Letter of Intent creation with dynamic forms, professional templates, and real-time editing.</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Dynamic form collection</li>
                <li>• Professional templates</li>
                <li>• Real-time preview</li>
                <li>• Multi-format download</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-green-300 transition-colors">
              <ScaleIcon className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Legal Templates Library</h3>
              <p className="text-gray-600 text-sm mb-4">AI-generated legal documents including NDAs, APA outlines, due diligence checklists, and employment agreements.</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• One-click template generation</li>
                <li>• Customizable terms</li>
                <li>• Legal disclaimers</li>
                <li>• Instant download</li>
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
          </div>

          {/* Platform Integrations */}
          <div className="bg-gray-100 rounded-lg p-8 mb-20">
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">Integrated Ecosystem</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <FolderIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Marketplace Integration</h4>
                <p className="text-gray-600 text-sm">Seamless deal discovery with advanced filtering, saved searches, and NDA-gated document access.</p>
              </div>
              <div className="text-center">
                <UserGroupIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Broker Portal</h4>
                <p className="text-gray-600 text-sm">Comprehensive listing management, analytics dashboard, and secure document sharing for brokers.</p>
              </div>
              <div className="text-center">
                <CurrencyDollarIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Investor Portal</h4>
                <p className="text-gray-600 text-sm">Regulation CF campaign management, investment tracking, and portfolio performance monitoring.</p>
              </div>
            </div>
          </div>

          {/* Technical Architecture */}
          <div className="mb-20">
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">Enterprise-Grade Architecture</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <BoltIcon className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">React 18 + TypeScript</h4>
                <p className="text-gray-600 text-sm">Modern frontend with Tailwind CSS and shadcn/ui components</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <CloudArrowUpIcon className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Supabase Backend</h4>
                <p className="text-gray-600 text-sm">PostgreSQL, Auth, and Storage with 99.9% uptime SLA</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <CogIcon className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">OpenAI GPT-4</h4>
                <p className="text-gray-600 text-sm">Custom AI service layer with context-aware responses</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <ShieldCheckIcon className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Security & Compliance</h4>
                <p className="text-gray-600 text-sm">GDPR/CCPA compliant with Reg CF adherence</p>
              </div>
            </div>
          </div>

          {/* Key Differentiators */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-16">
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">What Makes SeedStack™ Different</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">🤖 AI-First Approach</h4>
                <p className="text-gray-600 text-sm mb-3">Every feature enhanced with AI capabilities for intelligent automation and insights.</p>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-4">🔗 Integrated Ecosystem</h4>
                <p className="text-gray-600 text-sm mb-3">Seamless flow between discovery, analysis, and funding in one platform.</p>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-4">🏢 Professional Grade</h4>
                <p className="text-gray-600 text-sm">Enterprise-quality tools for serious acquisition professionals.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">⚖️ Regulatory Compliance</h4>
                <p className="text-gray-600 text-sm mb-3">Built-in Regulation CF and securities compliance for investment features.</p>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-4">📊 Data-Driven Insights</h4>
                <p className="text-gray-600 text-sm mb-3">Advanced analytics and market intelligence for informed decisions.</p>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-4">⚡ Performance Optimized</h4>
                <p className="text-gray-600 text-sm">Sub-2 second load times with enterprise-grade infrastructure.</p>
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
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Start Free 14-Day Trial
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-900 hover:bg-gray-50">
                Schedule Demo
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">No credit card required • Full feature access • Setup in under 5 minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeedStackPage;