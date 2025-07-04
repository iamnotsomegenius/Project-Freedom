import React, { useState } from 'react';
import SeedStackLayout from './SeedStackLayout';
import {
  ScaleIcon,
  DocumentTextIcon,
  ClipboardDocumentIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import Button from '../ui/Button';

const LegalTemplates = ({ user, onLogout }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customizations, setCustomizations] = useState({});
  const [generatedTemplate, setGeneratedTemplate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const templateTypes = [
    {
      id: 'nda',
      name: 'Non-Disclosure Agreement',
      description: 'Protect confidential information during due diligence',
      icon: '🔒',
      customFields: [
        { key: 'disclosing_party', label: 'Disclosing Party', type: 'text' },
        { key: 'receiving_party', label: 'Receiving Party', type: 'text' },
        { key: 'term_years', label: 'Term (years)', type: 'number', default: 2 },
        { key: 'governing_law', label: 'Governing Law', type: 'text', default: 'State of Delaware' }
      ]
    },
    {
      id: 'apa',
      name: 'Asset Purchase Agreement Outline',
      description: 'Framework for asset purchase agreements',
      icon: '📄',
      customFields: [
        { key: 'buyer_name', label: 'Buyer Name', type: 'text' },
        { key: 'seller_name', label: 'Seller Name', type: 'text' },
        { key: 'business_name', label: 'Business Name', type: 'text' },
        { key: 'purchase_price', label: 'Purchase Price', type: 'number' }
      ]
    },
    {
      id: 'employment',
      name: 'Key Employee Agreement',
      description: 'Retain key employees post-acquisition',
      icon: '👥',
      customFields: [
        { key: 'employee_name', label: 'Employee Name', type: 'text' },
        { key: 'position', label: 'Position', type: 'text' },
        { key: 'salary', label: 'Annual Salary', type: 'number' },
        { key: 'term_months', label: 'Term (months)', type: 'number', default: 24 }
      ]
    },
    {
      id: 'checklist',
      name: 'Due Diligence Checklist',
      description: 'Comprehensive DD checklist for SMB acquisitions',
      icon: '✅',
      customFields: [
        { key: 'business_type', label: 'Business Type', type: 'text' },
        { key: 'transaction_size', label: 'Transaction Size', type: 'select', options: ['Under $1M', '$1M-$5M', '$5M-$10M', 'Over $10M'] },
        { key: 'industry_focus', label: 'Industry Focus', type: 'text' }
      ]
    }
  ];

  const getTemplateById = (id) => {
    return templateTypes.find(template => template.id === id);
  };

  const handleGenerate = async () => {
    if (!selectedTemplate) return;

    setIsGenerating(true);
    
    // Simulate template generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const template = getTemplateById(selectedTemplate);
    const generated = generateTemplateContent(selectedTemplate, customizations);
    
    setGeneratedTemplate(generated);
    setIsGenerating(false);
  };

  const generateTemplateContent = (templateType, customizations) => {
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    switch (templateType) {
      case 'nda':
        return `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on ${currentDate} between ${customizations.disclosing_party || '[DISCLOSING PARTY]'} ("Disclosing Party") and ${customizations.receiving_party || '[RECEIVING PARTY]'} ("Receiving Party").

RECITALS

WHEREAS, Disclosing Party desires to disclose certain confidential and proprietary information to Receiving Party in connection with the evaluation of a potential business transaction; and

WHEREAS, Receiving Party desires to receive such information subject to the terms and conditions set forth herein;

NOW, THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows:

1. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" shall mean all non-public, proprietary, or confidential information disclosed by Disclosing Party to Receiving Party, including but not limited to:
• Financial statements, records, and projections
• Customer lists, contracts, and relationships
• Vendor information and supplier agreements
• Marketing strategies and business plans
• Operational procedures and trade secrets
• Employee information and compensation data
• Any other business information marked or identified as confidential

2. NON-DISCLOSURE OBLIGATIONS
Receiving Party agrees to:
a) Hold all Confidential Information in strict confidence
b) Not disclose Confidential Information to any third parties without prior written consent
c) Use Confidential Information solely for the purpose of evaluating the potential transaction
d) Limit access to Confidential Information to authorized representatives with a need to know

3. EXCEPTIONS
The obligations herein shall not apply to information that:
a) Is or becomes publicly available through no breach of this Agreement
b) Was known to Receiving Party prior to disclosure
c) Is independently developed without use of Confidential Information
d) Is required to be disclosed by law or court order

4. RETURN OF MATERIALS
Upon request by Disclosing Party, all Confidential Information and copies thereof shall be promptly returned or destroyed.

5. TERM
This Agreement shall remain in effect for ${customizations.term_years || 2} years from the date of execution.

6. GOVERNING LAW
This Agreement shall be governed by the laws of ${customizations.governing_law || 'the State of Delaware'}.

7. REMEDIES
Receiving Party acknowledges that breach of this Agreement would cause irreparable harm, and Disclosing Party shall be entitled to seek equitable relief, including injunction and specific performance.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

DISCLOSING PARTY:                    RECEIVING PARTY:

_________________________           _________________________
${customizations.disclosing_party || '[DISCLOSING PARTY]'}                     ${customizations.receiving_party || '[RECEIVING PARTY]'}

Date: _______________                Date: _______________


LEGAL DISCLAIMER: This template is provided for informational purposes only and does not constitute legal advice. Consult with qualified legal counsel before using this document.`;

      case 'apa':
        return `ASSET PURCHASE AGREEMENT OUTLINE

Buyer: ${customizations.buyer_name || '[BUYER NAME]'}
Seller: ${customizations.seller_name || '[SELLER NAME]'}
Target Business: ${customizations.business_name || '[BUSINESS NAME]'}
Purchase Price: $${customizations.purchase_price ? parseFloat(customizations.purchase_price).toLocaleString() : '[PURCHASE PRICE]'}

I. PARTIES AND TRANSACTION STRUCTURE
   A. Identification of buyer and seller entities
   B. Description of business being acquired
   C. Asset purchase vs. stock purchase structure
   D. Closing date and conditions

II. PURCHASE PRICE AND PAYMENT TERMS
   A. Total consideration: $${customizations.purchase_price ? parseFloat(customizations.purchase_price).toLocaleString() : '[PURCHASE PRICE]'}
   B. Payment structure (cash, notes, earnouts)
   C. Escrow arrangements
   D. Working capital adjustments
   E. Allocation of purchase price among assets

III. ASSETS BEING PURCHASED
   A. Tangible assets (equipment, inventory, real estate)
   B. Intangible assets (IP, customer lists, goodwill)
   C. Contracts and agreements
   D. Excluded assets
   E. Asset valuations and appraisals

IV. LIABILITIES ASSUMED
   A. Specified liabilities to be assumed
   B. Excluded liabilities
   C. Indemnification for excluded liabilities
   D. Environmental liabilities
   E. Tax liabilities

V. REPRESENTATIONS AND WARRANTIES
   A. Seller representations
      1. Authority and corporate standing
      2. Financial statements accuracy
      3. Material contracts disclosure
      4. Litigation and legal compliance
      5. Employee and labor matters
   B. Buyer representations
      1. Financial capacity
      2. Authority to complete transaction
   C. Survival periods and limitations

VI. COVENANTS AND AGREEMENTS
   A. Interim operating covenants
   B. Non-compete and non-solicitation
   C. Employee matters and benefits
   D. Insurance requirements
   E. Confidentiality obligations

VII. CONDITIONS TO CLOSING
   A. Due diligence completion
   B. Regulatory approvals
   C. Third-party consents
   D. Financing arrangements
   E. Material adverse change provisions

VIII. INDEMNIFICATION
   A. Seller indemnification obligations
   B. Buyer indemnification obligations
   C. Limitations on indemnification
   D. Procedures for indemnification claims
   E. Insurance and third-party recoveries

IX. DISPUTE RESOLUTION
   A. Governing law
   B. Arbitration procedures
   C. Jurisdiction and venue
   D. Attorney fees provisions

X. MISCELLANEOUS PROVISIONS
   A. Entire agreement
   B. Amendments and modifications
   C. Assignment restrictions
   D. Severability
   E. Counterpart execution

IMPORTANT: This outline should be expanded into a complete agreement by experienced legal counsel familiar with applicable laws and transaction specifics.

Prepared: ${currentDate}
Template Generated by: SeedStack™ Legal Assistant`;

      case 'employment':
        return `KEY EMPLOYEE RETENTION AGREEMENT

This Key Employee Retention Agreement ("Agreement") is entered into on ${currentDate} between ${customizations.employee_name || '[EMPLOYEE NAME]'} ("Employee") and [ACQUIRING COMPANY] ("Company").

RECITALS

WHEREAS, Company is acquiring certain assets of [TARGET BUSINESS] and desires to retain the services of Employee who possesses valuable knowledge, skills, and relationships critical to the business; and

WHEREAS, Employee agrees to continue employment with Company subject to the terms set forth herein;

NOW, THEREFORE, the parties agree as follows:

1. EMPLOYMENT TERMS
Position: ${customizations.position || '[POSITION TITLE]'}
Start Date: [CLOSING DATE]
Term: ${customizations.term_months || 24} months from the start date

2. COMPENSATION
Base Salary: $${customizations.salary ? parseFloat(customizations.salary).toLocaleString() : '[ANNUAL SALARY]'} per year
Benefits: Company standard benefit package
Bonus: [TO BE DETERMINED BASED ON PERFORMANCE METRICS]

3. RETENTION BONUS
Employee shall receive a retention bonus of $[AMOUNT] payable as follows:
• 50% after 12 months of continuous employment
• 50% after 24 months of continuous employment

4. DUTIES AND RESPONSIBILITIES
Employee shall:
a) Perform duties consistent with position and Company policies
b) Devote full professional time and attention to Company business
c) Maintain confidentiality of all proprietary information
d) Assist in transition and knowledge transfer activities

5. NON-COMPETE AND NON-SOLICITATION
During employment and for 12 months thereafter, Employee shall not:
a) Compete with Company in the same geographic market
b) Solicit Company customers or employees
c) Use or disclose confidential information

6. TERMINATION
a) Voluntary Resignation: 30 days notice required
b) Termination for Cause: Immediate termination, no severance
c) Termination without Cause: 3 months severance pay
d) Constructive Dismissal: Employee may terminate with severance

7. CONFIDENTIALITY
Employee agrees to maintain confidentiality of all business information and return all Company property upon termination.

8. GOVERNING LAW
This Agreement shall be governed by [STATE] law.

EMPLOYEE:                           COMPANY:

_________________________          _________________________
${customizations.employee_name || '[EMPLOYEE NAME]'}                          [AUTHORIZED REPRESENTATIVE]

Date: _______________               Date: _______________


LEGAL DISCLAIMER: This template should be reviewed and customized by employment law counsel familiar with applicable state and federal laws.`;

      case 'checklist':
        return `DUE DILIGENCE CHECKLIST
SMB ACQUISITION

Business: ${customizations.business_type || '[BUSINESS TYPE]'}
Transaction Size: ${customizations.transaction_size || '[TRANSACTION SIZE]'}
Industry: ${customizations.industry_focus || '[INDUSTRY]'}
Date: ${currentDate}

I. FINANCIAL DUE DILIGENCE
□ Audited financial statements (3-5 years)
□ Monthly P&L statements (24 months)
□ Balance sheets and cash flow statements
□ Tax returns (business and personal)
□ Accounts receivable aging
□ Accounts payable summary
□ Inventory analysis and turnover
□ Capital expenditure history
□ Banking relationships and loan agreements
□ Financial projections and budgets
□ Working capital analysis
□ Revenue recognition policies

II. LEGAL DUE DILIGENCE
□ Corporate organizational documents
□ Good standing certificates
□ Material contracts and agreements
□ Employment agreements and policies
□ Intellectual property portfolio
□ Litigation history and pending matters
□ Regulatory compliance documentation
□ Insurance policies and claims history
□ Real estate ownership/lease agreements
□ Environmental compliance and reports
□ Permits and licenses
□ Corporate minute books

III. OPERATIONAL DUE DILIGENCE
□ Organizational chart and employee list
□ Key employee backgrounds and agreements
□ Customer analysis and concentration
□ Supplier relationships and dependencies
□ Operations manual and procedures
□ Quality control systems
□ Technology systems and IT infrastructure
□ Manufacturing/service delivery processes
□ Capacity utilization and scalability
□ Competitive positioning analysis
□ Market share and growth trends
□ Regulatory environment assessment

IV. COMMERCIAL DUE DILIGENCE
□ Market size and growth analysis
□ Customer satisfaction surveys
□ Sales pipeline and forecasting
□ Pricing strategy and elasticity
□ Distribution channels evaluation
□ Brand strength and recognition
□ Competitive landscape mapping
□ Barrier to entry assessment
□ Supplier market dynamics
□ Technology disruption risks

V. MANAGEMENT DUE DILIGENCE
□ Management team interviews
□ Reference checks for key personnel
□ Succession planning documentation
□ Performance management systems
□ Compensation and incentive plans
□ Employee satisfaction and turnover
□ Training and development programs
□ Corporate culture assessment
□ Decision-making processes
□ Management depth and capabilities

VI. TAX DUE DILIGENCE
□ Federal and state tax compliance
□ Sales tax filings and compliance
□ Payroll tax documentation
□ Tax audit history and findings
□ Tax planning strategies
□ Transfer pricing documentation
□ Tax accounting methods
□ NOL carryforwards and limitations
□ State and local tax obligations
□ International tax considerations

VII. IT AND CYBERSECURITY
□ IT infrastructure assessment
□ Data security policies and procedures
□ Cybersecurity incident history
□ Software licensing and compliance
□ Cloud services and data storage
□ Backup and disaster recovery plans
□ System integration capabilities
□ Technology refresh cycles
□ Data privacy compliance
□ Employee technology training

VIII. ENVIRONMENTAL AND SAFETY
□ Environmental impact assessments
□ Hazardous material usage and storage
□ Waste disposal procedures
□ OSHA compliance and safety records
□ Environmental insurance coverage
□ Site contamination studies
□ Regulatory compliance history
□ Sustainability initiatives
□ Emergency response procedures
□ Worker safety training programs

IX. POST-ACQUISITION PLANNING
□ Integration planning and timeline
□ Key employee retention strategies
□ Customer communication plan
□ Vendor and supplier notifications
□ System integration requirements
□ Synergy identification and capture
□ Performance monitoring metrics
□ Change management procedures
□ Cultural integration planning
□ Communication strategies

NOTES:
_________________________________
_________________________________
_________________________________

DUE DILIGENCE TEAM:
Lead: ________________________
Financial: ____________________
Legal: _______________________
Operational: __________________

TARGET COMPLETION DATE: __________

This checklist should be customized based on specific industry requirements and transaction characteristics. Consult with professional advisors throughout the due diligence process.`;

      default:
        return 'Template content not found.';
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedTemplate);
    alert('Template copied to clipboard!');
  };

  const downloadTemplate = () => {
    const template = getTemplateById(selectedTemplate);
    const blob = new Blob([generatedTemplate], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setSelectedTemplate('');
    setCustomizations({});
    setGeneratedTemplate('');
  };

  return (
    <SeedStackLayout user={user} onLogout={onLogout}>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Legal Templates</h1>
          <p className="text-gray-600">Generate customized legal documents for your acquisitions</p>
        </div>

        {!generatedTemplate ? (
          <div className="max-w-4xl mx-auto">
            {/* Template Selection */}
            {!selectedTemplate && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Choose a Template</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {templateTypes.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:border-green-300 transition-colors"
                    >
                      <div className="flex items-start">
                        <div className="text-2xl mr-4">{template.icon}</div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">{template.name}</h3>
                          <p className="text-gray-600 text-sm">{template.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Customization Form */}
            {selectedTemplate && (
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {getTemplateById(selectedTemplate)?.name}
                    </h2>
                    <p className="text-gray-600">{getTemplateById(selectedTemplate)?.description}</p>
                  </div>
                  <Button
                    onClick={() => setSelectedTemplate('')}
                    variant="outline"
                    className="border-gray-300 text-gray-700"
                  >
                    Change Template
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {getTemplateById(selectedTemplate)?.customFields.map((field) => (
                      <div key={field.key}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {field.label}
                        </label>
                        {field.type === 'select' ? (
                          <select
                            value={customizations[field.key] || ''}
                            onChange={(e) => setCustomizations({
                              ...customizations,
                              [field.key]: e.target.value
                            })}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                          >
                            <option value="">Select an option</option>
                            {field.options?.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            value={customizations[field.key] || field.default || ''}
                            onChange={(e) => setCustomizations({
                              ...customizations,
                              [field.key]: e.target.value
                            })}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            placeholder={field.default?.toString() || ''}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button
                      onClick={resetForm}
                      variant="outline"
                      className="border-gray-300 text-gray-700"
                    >
                      Reset
                    </Button>
                    <Button
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {isGenerating ? 'Generating...' : 'Generate Template'}
                    </Button>
                  </div>
                </div>

                {isGenerating && (
                  <div className="mt-6 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                    <p className="text-sm text-gray-600 mt-2">Creating your legal template...</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Generated Template */
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200">
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {getTemplateById(selectedTemplate)?.name}
                  </h2>
                  <p className="text-gray-600">Generated Legal Template</p>
                </div>
                <div className="flex space-x-3">
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="border-gray-300 text-gray-700"
                  >
                    <ClipboardDocumentIcon className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    onClick={downloadTemplate}
                    variant="outline"
                    className="border-gray-300 text-gray-700"
                  >
                    <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    onClick={resetForm}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Generate New Template
                  </Button>
                </div>
              </div>

              {/* Template Content */}
              <div className="p-8">
                <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm whitespace-pre-line leading-relaxed max-h-96 overflow-y-auto">
                  {generatedTemplate}
                </div>
              </div>

              {/* Legal Disclaimer */}
              <div className="p-6 border-t border-gray-200 bg-yellow-50">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <ScaleIcon className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Important Legal Notice</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      This template is provided for informational purposes only and does not constitute legal advice. 
                      All templates should be reviewed and customized by qualified legal counsel before use. 
                      Laws vary by jurisdiction and specific circumstances may require different provisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SeedStackLayout>
  );
};

export default LegalTemplates;