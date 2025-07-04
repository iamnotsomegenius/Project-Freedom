import React, { useState } from 'react';
import SeedStackLayout from './SeedStackLayout';
import {
  CloudArrowUpIcon,
  DocumentChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import Button from '../ui/Button';

const PLAnalyzer = ({ user, onLogout }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = (file) => {
    if (file && (file.type.includes('excel') || file.type.includes('csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.csv'))) {
      setUploadedFile(file);
      analyzeFile(file);
    } else {
      alert('Please upload an Excel (.xlsx, .xls) or CSV file');
    }
  };

  const analyzeFile = async (file) => {
    setIsAnalyzing(true);
    
    // Simulate file analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analysis results
    const mockAnalysis = {
      summary: "This business shows strong profitability with healthy margins. However, working capital management needs attention as indicated by rising AR and declining inventory turnover.",
      metrics: {
        revenue: 2500000,
        cogs: 1370000,
        gross_profit: 1130000,
        operating_expenses: 662500,
        ebitda: 467500,
        net_income: 302500,
        gross_margin: 45.2,
        operating_margin: 18.7,
        net_margin: 12.1
      },
      trends: {
        revenue_growth: 12.5,
        profit_growth: 8.3,
        margin_trend: "stable"
      },
      ratios: {
        current_ratio: 2.1,
        debt_to_equity: 0.45,
        roa: 15.2,
        roe: 22.8,
        inventory_turnover: 4.8,
        receivables_turnover: 8.2
      },
      red_flags: [
        {
          severity: "high",
          category: "Working Capital",
          description: "Accounts receivable increased 35% without corresponding revenue growth",
          recommendation: "Review collection procedures and customer credit policies"
        },
        {
          severity: "medium", 
          category: "Inventory",
          description: "Inventory turnover declined from 6.2x to 4.8x",
          recommendation: "Analyze slow-moving inventory and demand forecasting"
        },
        {
          severity: "medium",
          category: "Operating Costs",
          description: "Employee costs increased 22% while revenue grew only 12.5%",
          recommendation: "Review staffing efficiency and productivity metrics"
        }
      ],
      benchmarks: {
        industry_revenue_multiple: "2.1x - 3.2x",
        industry_ebitda_multiple: "5.8x - 8.4x",
        industry_gross_margin: "42% - 48%",
        industry_ebitda_margin: "15% - 25%"
      }
    };
    
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const downloadReport = () => {
    const reportData = JSON.stringify(analysis, null, 2);
    const blob = new Blob([reportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pl-analysis-${uploadedFile?.name || 'report'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <SeedStackLayout user={user} onLogout={onLogout}>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">P&L Analyzer</h1>
          <p className="text-gray-600">Upload financial statements for AI-powered analysis</p>
        </div>

        {!uploadedFile && (
          /* File Upload Area */
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              dragOver 
                ? 'border-green-400 bg-green-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
          >
            <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-lg font-medium text-gray-900">
                  Drop your P&L file here, or <span className="text-green-600">browse</span>
                </span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileSelect}
                />
              </label>
              <p className="text-sm text-gray-500 mt-2">
                Supports Excel (.xlsx, .xls) and CSV files up to 10MB
              </p>
            </div>
            
            <div className="mt-6">
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-2">What we analyze:</p>
                <ul className="text-left max-w-md mx-auto space-y-1">
                  <li>• Revenue trends and growth patterns</li>
                  <li>• Profitability and margin analysis</li>
                  <li>• Cost structure and efficiency</li>
                  <li>• Working capital management</li>
                  <li>• Industry benchmarking</li>
                  <li>• Red flag identification</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {uploadedFile && !analysis && (
          /* Processing State */
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="text-center">
              <DocumentChartBarIcon className="mx-auto h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {isAnalyzing ? 'Analyzing' : 'Processing'} {uploadedFile.name}
              </h3>
              {isAnalyzing && (
                <div className="max-w-md mx-auto">
                  <div className="animate-pulse space-y-3">
                    <div className="text-sm text-gray-600">Extracting financial data...</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                    </div>
                    <div className="text-sm text-gray-600">Running AI analysis...</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {analysis && (
          /* Analysis Results */
          <div className="space-y-8">
            {/* Summary */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Executive Summary</h2>
                <Button 
                  onClick={downloadReport}
                  variant="outline"
                  className="border-gray-300 text-gray-700"
                >
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </div>
              <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
            </div>

            {/* Key Metrics */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Key Financial Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${analysis.metrics.revenue.toLocaleString()}</p>
                  <p className="text-sm text-green-600">+{analysis.trends.revenue_growth}% YoY</p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">EBITDA</p>
                  <p className="text-2xl font-bold text-gray-900">${analysis.metrics.ebitda.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{analysis.metrics.operating_margin}% margin</p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">Net Income</p>
                  <p className="text-2xl font-bold text-gray-900">${analysis.metrics.net_income.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{analysis.metrics.net_margin}% margin</p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">Gross Margin</p>
                  <p className="text-2xl font-bold text-gray-900">{analysis.metrics.gross_margin}%</p>
                  <p className="text-sm text-gray-600">Industry: 42-48%</p>
                </div>
              </div>
            </div>

            {/* Red Flags */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                <ExclamationTriangleIcon className="h-5 w-5 inline mr-2 text-yellow-500" />
                Areas of Concern
              </h2>
              <div className="space-y-4">
                {analysis.red_flags.map((flag, index) => (
                  <div key={index} className={`border rounded-lg p-4 ${getSeverityColor(flag.severity)}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{flag.category}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(flag.severity)}`}>
                        {flag.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm mb-2">{flag.description}</p>
                    <p className="text-xs font-medium">Recommendation: {flag.recommendation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Ratios */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Financial Ratios</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Current Ratio</p>
                  <p className="text-lg font-semibold text-gray-900">{analysis.ratios.current_ratio}</p>
                  <p className="text-xs text-gray-500">Liquidity measure</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Debt to Equity</p>
                  <p className="text-lg font-semibold text-gray-900">{analysis.ratios.debt_to_equity}</p>
                  <p className="text-xs text-gray-500">Leverage ratio</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">ROA</p>
                  <p className="text-lg font-semibold text-gray-900">{analysis.ratios.roa}%</p>
                  <p className="text-xs text-gray-500">Asset efficiency</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">ROE</p>
                  <p className="text-lg font-semibold text-gray-900">{analysis.ratios.roe}%</p>
                  <p className="text-xs text-gray-500">Return on equity</p>
                </div>
              </div>
            </div>

            {/* Industry Benchmarks */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Industry Benchmarks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Valuation Multiples</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Revenue Multiple:</span>
                      <span className="text-sm font-medium">{analysis.benchmarks.industry_revenue_multiple}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">EBITDA Multiple:</span>
                      <span className="text-sm font-medium">{analysis.benchmarks.industry_ebitda_multiple}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-2">Profitability Benchmarks</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Industry Gross Margin:</span>
                      <span className="text-sm font-medium">{analysis.benchmarks.industry_gross_margin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Industry EBITDA Margin:</span>
                      <span className="text-sm font-medium">{analysis.benchmarks.industry_ebitda_margin}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Items */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                <CheckCircleIcon className="h-5 w-5 inline mr-2 text-green-600" />
                Recommended Next Steps
              </h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Request detailed aging of accounts receivable</li>
                <li>• Analyze customer concentration and contract terms</li>
                <li>• Review inventory composition and turnover by category</li>
                <li>• Assess staffing levels and productivity metrics</li>
                <li>• Compare with 2-3 industry peers for validation</li>
                <li>• Prepare follow-up questions for management</li>
              </ul>
            </div>

            {/* Reset Button */}
            <div className="text-center">
              <Button
                onClick={() => {
                  setUploadedFile(null);
                  setAnalysis(null);
                  setIsAnalyzing(false);
                }}
                variant="outline"
                className="border-gray-300 text-gray-700"
              >
                Analyze Another File
              </Button>
            </div>
          </div>
        )}
      </div>
    </SeedStackLayout>
  );
};

export default PLAnalyzer;