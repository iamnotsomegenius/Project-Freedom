import React, { useState, useEffect } from 'react';
import { 
  ChartBarIcon, 
  BanknotesIcon, 
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  LinkIcon,
  CursorArrowRaysIcon
} from '@heroicons/react/24/outline';
import Button from '../ui/Button';

const WorkflowIntegration = ({ deal, onAnalyze, onPushToMarketplace, onReturnToSeedStack }) => {
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [marketplaceStatus, setMarketplaceStatus] = useState(null);
  const [showFundingDecision, setShowFundingDecision] = useState(false);

  const handleAIAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate AI analysis API call
      const mockAnalysis = {
        recommendation: 'seek_investors',
        confidence_score: 0.85,
        key_insights: [
          'Strong revenue growth trajectory (+35% YoY)',
          'Market-leading position in niche industry',
          'Experienced management team staying on',
          'Opportunity for operational improvements'
        ],
        financial_summary: {
          revenue_multiple: 2.1,
          ebitda_multiple: 4.2,
          projected_roi: 0.28,
          payback_period: '3.2 years'
        },
        risk_factors: [
          'Customer concentration (top 3 = 45% revenue)',
          'Regulatory changes in industry',
          'Key person dependency'
        ],
        funding_recommendation: {
          recommended_amount: 850000,
          suggested_structure: '70% debt, 30% equity',
          investor_profile: 'Strategic industry investors preferred'
        }
      };
      
      setAiAnalysis(mockAnalysis);
      setShowFundingDecision(true);
      onAnalyze && onAnalyze(mockAnalysis);
    } catch (error) {
      console.error('Error during AI analysis:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePushToMarketplace = async (fundingAmount) => {
    try {
      const result = await onPushToMarketplace({
        deal_id: deal.id,
        funding_target: fundingAmount,
        auto_generate_description: true,
        include_financials: true
      });
      
      setMarketplaceStatus({
        listing_id: result.id,
        status: 'active',
        funding_progress: 0,
        marketplace_url: `/marketplace/${result.id}`
      });
    } catch (error) {
      console.error('Error pushing to marketplace:', error);
    }
  };

  const getRecommendationIcon = (recommendation) => {
    switch (recommendation) {
      case 'self_fund':
        return <BanknotesIcon className="h-6 w-6 text-green-500" />;
      case 'seek_investors':
        return <CursorArrowRaysIcon className="h-6 w-6 text-blue-500" />;
      case 'pass':
        return <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />;
      default:
        return <ChartBarIcon className="h-6 w-6 text-gray-500" />;
    }
  };

  const getRecommendationColor = (recommendation) => {
    switch (recommendation) {
      case 'self_fund':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'seek_investors':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'pass':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getRecommendationText = (recommendation) => {
    switch (recommendation) {
      case 'self_fund':
        return 'Recommend: Self-Fund & Close in SeedStack';
      case 'seek_investors':
        return 'Recommend: Seek Investors on SeedSMB';
      case 'pass':
        return 'Recommend: Pass on This Deal';
      default:
        return 'Analyzing...';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <LinkIcon className="h-5 w-5 mr-2 text-blue-600" />
          SeedStack ↔ SeedSMB Integration
        </h3>
        <div className="text-sm text-gray-500">
          Deal: {deal?.company_name}
        </div>
      </div>

      {/* Step 1: AI Analysis */}
      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">Step 1: AI Deal Analysis</h4>
            {!aiAnalysis && (
              <Button
                onClick={handleAIAnalysis}
                disabled={isAnalyzing}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2"
              >
                {isAnalyzing ? (
                  <>
                    <ClockIcon className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <ChartBarIcon className="h-4 w-4 mr-2" />
                    Analyze Deal
                  </>
                )}
              </Button>
            )}
          </div>

          {aiAnalysis && (
            <div className="space-y-3">
              <div className={`flex items-center p-3 rounded-lg border ${getRecommendationColor(aiAnalysis.recommendation)}`}>
                {getRecommendationIcon(aiAnalysis.recommendation)}
                <span className="ml-2 font-medium">
                  {getRecommendationText(aiAnalysis.recommendation)}
                </span>
                <span className="ml-auto text-sm">
                  Confidence: {Math.round(aiAnalysis.confidence_score * 100)}%
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium mb-2">Key Insights:</h5>
                  <ul className="space-y-1">
                    {aiAnalysis.key_insights.map((insight, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Financial Summary:</h5>
                  <div className="space-y-1">
                    <div>Revenue Multiple: {aiAnalysis.financial_summary.revenue_multiple}x</div>
                    <div>EBITDA Multiple: {aiAnalysis.financial_summary.ebitda_multiple}x</div>
                    <div>Projected ROI: {Math.round(aiAnalysis.financial_summary.projected_roi * 100)}%</div>
                    <div>Payback: {aiAnalysis.financial_summary.payback_period}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Funding Decision */}
        {showFundingDecision && aiAnalysis && (
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Step 2: Funding Decision</h4>
            
            {aiAnalysis.recommendation === 'self_fund' && (
              <div className="space-y-3">
                <p className="text-gray-700">
                  Based on the analysis, you can proceed with self-funding this deal.
                </p>
                <Button
                  onClick={() => onReturnToSeedStack && onReturnToSeedStack(deal.id, true)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <BanknotesIcon className="h-4 w-4 mr-2" />
                  Continue in SeedStack → Close Deal
                </Button>
              </div>
            )}

            {aiAnalysis.recommendation === 'seek_investors' && (
              <div className="space-y-3">
                <p className="text-gray-700">
                  Recommended funding: ${aiAnalysis.funding_recommendation?.recommended_amount?.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  Structure: {aiAnalysis.funding_recommendation?.suggested_structure}
                </p>
                <Button
                  onClick={() => handlePushToMarketplace(aiAnalysis.funding_recommendation?.recommended_amount)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <ArrowRightIcon className="h-4 w-4 mr-2" />
                  Push to SeedSMB Marketplace
                </Button>
              </div>
            )}

            {aiAnalysis.recommendation === 'pass' && (
              <div className="space-y-3">
                <p className="text-gray-700">
                  Analysis suggests passing on this deal due to identified risks.
                </p>
                <div className="text-sm text-gray-600">
                  <h5 className="font-medium mb-1">Risk Factors:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    {aiAnalysis.risk_factors.map((risk, index) => (
                      <li key={index}>{risk}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Marketplace Status */}
        {marketplaceStatus && (
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Step 3: Marketplace Status</h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700">Deal successfully pushed to marketplace</p>
                <p className="text-sm text-gray-600">Status: {marketplaceStatus.status}</p>
              </div>
              <div className="space-x-2">
                <Button
                  href={marketplaceStatus.marketplace_url}
                  variant="outline"
                  className="text-sm"
                >
                  View Listing
                </Button>
                <Button
                  onClick={() => onReturnToSeedStack && onReturnToSeedStack(deal.id, false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white text-sm"
                >
                  Return to SeedStack
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowIntegration;