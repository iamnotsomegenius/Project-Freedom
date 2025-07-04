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
            <p className="text-xl text-gray-600 mb-2">Deal Flow Management Platform</p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Professional-grade CRM and deal management software for business acquisition professionals, 
              search fund operators, and private equity teams.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Core Features Overview */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Deal Management Suite</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Streamline your entire acquisition process from initial sourcing to closing with our integrated platform.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-green-300 transition-colors">
              <Squares2X2Icon className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Deal Flow CRM</h3>
              <p className="text-gray-600 text-sm">Trello-style kanban board to track deals from Inbox → LOI → Diligence → Closed with full pipeline visibility.</p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-green-300 transition-colors">
              <ChatBubbleLeftRightIcon className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Assistant</h3>
              <p className="text-gray-600 text-sm">GPT-4o powered chat panel for instant analysis, research assistance, and deal-related questions.</p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-green-300 transition-colors">
              <DocumentChartBarIcon className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Financial Parser</h3>
              <p className="text-gray-600 text-sm">Upload P&L statements and get instant financial analysis with red flags, ratios, and executive summaries.</p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-green-300 transition-colors">
              <MagnifyingGlassIcon className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Market Research</h3>
              <p className="text-gray-600 text-sm">Automated comps analysis, NAICS industry trends, and exit multiple benchmarking for informed valuations.</p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-green-300 transition-colors">
              <DocumentTextIcon className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Auto-Generate LOI</h3>
              <p className="text-gray-600 text-sm">AI-powered Letter of Intent generation with industry-standard terms, fully editable and downloadable.</p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-green-300 transition-colors">
              <ScaleIcon className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Legal Assist</h3>
              <p className="text-gray-600 text-sm">Generate NDAs, APA drafts, and legal checklists with AI assistance and attorney-reviewed templates.</p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-green-300 transition-colors">
              <EnvelopeIcon className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Outreach Engine</h3>
              <p className="text-gray-600 text-sm">Generate and track broker communications, follow-up sequences, and relationship management.</p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-green-300 transition-colors">
              <ShieldCheckIcon className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">NDA & VDR Manager</h3>
              <p className="text-gray-600 text-sm">Track executed NDAs and manage virtual data room access across multiple deals and stakeholders.</p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-green-300 transition-colors">
              <PencilSquareIcon className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Collaboration Tools</h3>
              <p className="text-gray-600 text-sm">Notion-style notes, tagging system, and document collaboration integrated with secure data rooms.</p>
            </div>
          </div>

          {/* Platform Benefits */}
          <div className="bg-gray-100 rounded-lg p-8 mb-20">
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">Why SeedStack™?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <ArrowTrendingUpIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Increase Deal Velocity</h4>
                <p className="text-gray-600 text-sm">Process 3x more deals with automated workflows and AI-powered analysis tools.</p>
              </div>
              <div className="text-center">
                <CheckCircleIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Reduce Manual Work</h4>
                <p className="text-gray-600 text-sm">Eliminate 80% of repetitive tasks with intelligent automation and document generation.</p>
              </div>
              <div className="text-center">
                <FolderIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Centralized Knowledge</h4>
                <p className="text-gray-600 text-sm">All deal information, communications, and documents in one secure, searchable platform.</p>
              </div>
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
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />Basic AI assistant</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />Financial parser</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />Document templates</li>
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
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />Market research tools</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />Outreach automation</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />Priority support</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />Team collaboration</li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Start Free Trial
                </Button>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Enterprise</h4>
                <div className="text-3xl font-bold text-gray-900 mb-4">Custom</div>
                <ul className="space-y-3 text-gray-600 text-sm mb-8">
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />Custom integrations</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />White-label option</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />Dedicated support</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />Custom training</li>
                  <li className="flex items-center"><CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />SLA guarantees</li>
                </ul>
                <Button variant="outline" className="w-full border-gray-300 text-gray-900 hover:bg-gray-50">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Streamline Your Deal Flow?</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join acquisition professionals who have transformed their deal management process with SeedStack™.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Start Free 14-Day Trial
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-900 hover:bg-gray-50">
                Schedule Demo
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">No credit card required • Setup in under 5 minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeedStackPage;