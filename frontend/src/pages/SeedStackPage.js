import React from 'react';
import Button from '../components/ui/Button';
import {
  CloudIcon,
  CpuChipIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  BoltIcon,
  CogIcon,
} from '@heroicons/react/24/outline';

const SeedStackPage = () => {
  return (
    <div className="min-h-screen">
      {/* Custom SeedStack Background */}
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold mb-3">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  SeedStack
                </span>
                <span className="text-xs align-super text-purple-300">™</span>
              </h1>
              <h2 className="text-2xl text-purple-200 mb-6">Enterprise SaaS for Deal Management</h2>
              <p className="text-purple-100 text-lg max-w-3xl mx-auto">
                Power your private market transactions with our comprehensive software-as-a-service platform. 
                Built for investment banks, private equity firms, family offices, and enterprise deal makers.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="bg-white/10 backdrop-blur-sm border border-purple-300/20 rounded-lg p-6">
                <CloudIcon className="h-12 w-12 text-purple-300 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Cloud-Native Infrastructure</h3>
                <p className="text-purple-100 text-sm">Scalable, secure, and compliant infrastructure built for enterprise-grade deal flow management.</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm border border-purple-300/20 rounded-lg p-6">
                <CpuChipIcon className="h-12 w-12 text-purple-300 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">AI-Powered Analytics</h3>
                <p className="text-purple-100 text-sm">Advanced machine learning algorithms for deal sourcing, valuation modeling, and risk assessment.</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm border border-purple-300/20 rounded-lg p-6">
                <ChartBarIcon className="h-12 w-12 text-purple-300 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Real-Time Dashboard</h3>
                <p className="text-purple-100 text-sm">Comprehensive portfolio monitoring with real-time performance metrics and customizable reporting.</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm border border-purple-300/20 rounded-lg p-6">
                <DocumentTextIcon className="h-12 w-12 text-purple-300 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Document Automation</h3>
                <p className="text-purple-100 text-sm">Streamlined document generation, e-signature integration, and automated compliance workflows.</p>
              </div>
            </div>

            {/* Core Modules */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-center text-white mb-12">Core Modules</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white/5 backdrop-blur-sm border border-purple-300/20 rounded-lg p-8">
                  <ShieldCheckIcon className="h-10 w-10 text-purple-300 mb-6" />
                  <h4 className="text-xl font-semibold text-white mb-4">Deal Origination & Sourcing</h4>
                  <ul className="space-y-2 text-purple-100 text-sm">
                    <li>• Automated deal pipeline management</li>
                    <li>• CRM integration and lead scoring</li>
                    <li>• Market intelligence and sourcing tools</li>
                    <li>• Competitive landscape analysis</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm border border-purple-300/20 rounded-lg p-8">
                  <ArrowPathIcon className="h-10 w-10 text-purple-300 mb-6" />
                  <h4 className="text-xl font-semibold text-white mb-4">Due Diligence Platform</h4>
                  <ul className="space-y-2 text-purple-100 text-sm">
                    <li>• Virtual data room management</li>
                    <li>• Automated financial analysis</li>
                    <li>• Risk assessment frameworks</li>
                    <li>• Team collaboration tools</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm border border-purple-300/20 rounded-lg p-8">
                  <BoltIcon className="h-10 w-10 text-purple-300 mb-6" />
                  <h4 className="text-xl font-semibold text-white mb-4">Portfolio Management</h4>
                  <ul className="space-y-2 text-purple-100 text-sm">
                    <li>• Performance tracking and reporting</li>
                    <li>• Investor communication portal</li>
                    <li>• ESG monitoring and compliance</li>
                    <li>• Exit planning and execution</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Enterprise Benefits */}
            <div className="bg-white/5 backdrop-blur-sm border border-purple-300/20 rounded-lg p-8 mb-16">
              <h3 className="text-2xl font-semibold text-center text-white mb-8">Enterprise Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-purple-200 mb-4">Operational Efficiency</h4>
                  <ul className="space-y-2 text-purple-100 text-sm">
                    <li>• 60% reduction in deal processing time</li>
                    <li>• 90% automation of routine tasks</li>
                    <li>• Seamless integration with existing systems</li>
                    <li>• Mobile-first design for on-the-go access</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-purple-200 mb-4">Risk & Compliance</h4>
                  <ul className="space-y-2 text-purple-100 text-sm">
                    <li>• SOC 2 Type II certified infrastructure</li>
                    <li>• GDPR and CCPA compliance built-in</li>
                    <li>• Audit trail and regulatory reporting</li>
                    <li>• Multi-factor authentication & encryption</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Pricing Tiers */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-center text-white mb-12">Pricing Tiers</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/10 backdrop-blur-sm border border-purple-300/20 rounded-lg p-8">
                  <h4 className="text-xl font-semibold text-white mb-4">Professional</h4>
                  <div className="text-3xl font-bold text-purple-300 mb-4">$2,500<span className="text-sm text-purple-200">/month</span></div>
                  <ul className="space-y-2 text-purple-100 text-sm mb-6">
                    <li>• Up to 50 active deals</li>
                    <li>• Basic analytics & reporting</li>
                    <li>• Standard integrations</li>
                    <li>• Email support</li>
                  </ul>
                  <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white">
                    Get Started
                  </Button>
                </div>
                
                <div className="bg-gradient-to-b from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-300/40 rounded-lg p-8 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-4">Enterprise</h4>
                  <div className="text-3xl font-bold text-purple-300 mb-4">$7,500<span className="text-sm text-purple-200">/month</span></div>
                  <ul className="space-y-2 text-purple-100 text-sm mb-6">
                    <li>• Unlimited deals</li>
                    <li>• Advanced AI analytics</li>
                    <li>• Custom integrations</li>
                    <li>• Priority phone support</li>
                    <li>• Dedicated account manager</li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white">
                    Start Free Trial
                  </Button>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm border border-purple-300/20 rounded-lg p-8">
                  <h4 className="text-xl font-semibold text-white mb-4">Custom</h4>
                  <div className="text-3xl font-bold text-purple-300 mb-4">Contact Us</div>
                  <ul className="space-y-2 text-purple-100 text-sm mb-6">
                    <li>• White-label solution</li>
                    <li>• Custom development</li>
                    <li>• On-premise deployment</li>
                    <li>• 24/7 dedicated support</li>
                    <li>• Training & onboarding</li>
                  </ul>
                  <Button variant="outline" className="w-full border-purple-300 text-purple-300 hover:bg-purple-300 hover:text-purple-900">
                    Contact Sales
                  </Button>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Deal Management?</h3>
              <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
                Join leading investment firms already using SeedStack™ to streamline their operations and accelerate deal execution.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white">
                  Schedule Demo
                </Button>
                <Button variant="outline" className="border-purple-300 text-purple-300 hover:bg-purple-300 hover:text-purple-900">
                  Request Pricing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeedStackPage;