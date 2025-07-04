import React, { useState } from 'react';
import SeedStackLayout from './SeedStackLayout';
import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';
import Button from '../ui/Button';

const LOIGenerator = ({ user, onLogout }) => {
  const [formData, setFormData] = useState({
    buyer_name: user?.display_name || 'Demo User',
    seller_name: '',
    business_name: '',
    offer_amount: '',
    due_diligence_period: 30,
    financing_contingency: true,
    earnout_provision: '',
    exclusivity_period: 30,
    additional_terms: ''
  });
  const [generatedLOI, setGeneratedLOI] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.seller_name || !formData.business_name || !formData.offer_amount) return;

    setIsGenerating(true);
    
    // Simulate LOI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const loiContent = `LETTER OF INTENT

To: ${formData.seller_name}
From: ${formData.buyer_name}
Date: ${currentDate}
Re: Proposed Acquisition of ${formData.business_name}

Dear ${formData.seller_name},

This Letter of Intent ("LOI") outlines the terms under which ${formData.buyer_name} ("Buyer") proposes to acquire ${formData.business_name} ("Company") from ${formData.seller_name} ("Seller").

1. PURCHASE PRICE
The total purchase price for the acquisition shall be $${parseFloat(formData.offer_amount).toLocaleString()}.

2. STRUCTURE
This transaction is proposed as an asset purchase, subject to final due diligence and definitive agreement negotiation.

3. DUE DILIGENCE PERIOD
Buyer shall have ${formData.due_diligence_period} (${formData.due_diligence_period}) days from the execution of this LOI to complete due diligence review, including but not limited to:
• Financial records and tax returns (3 years)
• Customer contracts and relationships
• Vendor agreements and supply chain
• Legal and regulatory compliance
• Operational systems and processes
• Employee agreements and benefits

4. FINANCING
${formData.financing_contingency 
  ? `This offer is contingent upon Buyer securing satisfactory financing for the transaction. Buyer agrees to use commercially reasonable efforts to obtain financing and will provide regular updates to Seller regarding financing progress.`
  : `This is an all-cash offer with no financing contingency. Buyer represents that they have adequate funds available to complete this transaction.`
}

5. EXCLUSIVITY PERIOD
In consideration of Buyer's time and expense in conducting due diligence, Seller agrees to negotiate exclusively with Buyer for a period of ${formData.exclusivity_period} (${formData.exclusivity_period}) days from the execution of this LOI. During this period, Seller will not solicit, encourage, or engage in negotiations with any other potential buyers.

${formData.earnout_provision ? `6. EARNOUT PROVISION
${formData.earnout_provision}

` : ''}${formData.additional_terms ? `${formData.earnout_provision ? '7' : '6'}. ADDITIONAL TERMS
${formData.additional_terms}

` : ''}${formData.earnout_provision || formData.additional_terms ? (formData.earnout_provision && formData.additional_terms ? '8' : '7') : '6'}. CONFIDENTIALITY
Both parties agree to maintain strict confidentiality regarding the terms of this LOI and any information exchanged during the due diligence process.

${formData.earnout_provision || formData.additional_terms ? (formData.earnout_provision && formData.additional_terms ? '9' : '8') : '7'}. LEGAL COUNSEL
Each party acknowledges that they have been advised to seek independent legal counsel regarding this transaction and the terms of this LOI.

${formData.earnout_provision || formData.additional_terms ? (formData.earnout_provision && formData.additional_terms ? '10' : '9') : '8'}. NON-BINDING NATURE
This LOI is intended to be non-binding except for the provisions relating to exclusivity, confidentiality, and legal fees. The parties acknowledge that a definitive purchase agreement containing detailed terms and conditions will need to be negotiated and executed.

${formData.earnout_provision || formData.additional_terms ? (formData.earnout_provision && formData.additional_terms ? '11' : '10') : '9'}. TIMELINE
The parties agree to work diligently toward executing a definitive purchase agreement within 45 days following the completion of due diligence, subject to satisfactory resolution of all material issues.

This LOI shall expire if not accepted by ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.

We look forward to working with you toward a successful transaction.

Sincerely,

${formData.buyer_name}
Buyer

ACCEPTED AND AGREED:

_________________________     Date: __________
${formData.seller_name}
Seller


IMPORTANT LEGAL DISCLAIMER:
This document is generated for informational purposes only and does not constitute legal advice. All parties should consult with qualified legal counsel before executing any binding agreements. Terms and conditions should be reviewed and customized by legal professionals familiar with applicable laws and regulations.`;

    setGeneratedLOI(loiContent);
    setIsGenerating(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLOI);
    alert('LOI copied to clipboard!');
  };

  const downloadLOI = () => {
    const blob = new Blob([generatedLOI], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LOI-${formData.business_name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setFormData({
      buyer_name: user?.display_name || 'Demo User',
      seller_name: '',
      business_name: '',
      offer_amount: '',
      due_diligence_period: 30,
      financing_contingency: true,
      earnout_provision: '',
      exclusivity_period: 30,
      additional_terms: ''
    });
    setGeneratedLOI('');
  };

  return (
    <SeedStackLayout user={user} onLogout={onLogout}>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">LOI Generator</h1>
          <p className="text-gray-600">Generate professional Letters of Intent for your acquisitions</p>
        </div>

        {!generatedLOI ? (
          /* LOI Form */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="text-center mb-6">
                <DocumentTextIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900">Create Letter of Intent</h2>
                <p className="text-gray-600">Fill in the details to generate a professional LOI</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Buyer Name *
                    </label>
                    <input
                      type="text"
                      value={formData.buyer_name}
                      onChange={(e) => setFormData({...formData, buyer_name: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seller Name *
                    </label>
                    <input
                      type="text"
                      value={formData.seller_name}
                      onChange={(e) => setFormData({...formData, seller_name: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Current business owner"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    value={formData.business_name}
                    onChange={(e) => setFormData({...formData, business_name: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Name of the business being acquired"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Offer Amount * ($)
                  </label>
                  <input
                    type="number"
                    value={formData.offer_amount}
                    onChange={(e) => setFormData({...formData, offer_amount: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="2500000"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Due Diligence Period (days)
                    </label>
                    <input
                      type="number"
                      value={formData.due_diligence_period}
                      onChange={(e) => setFormData({...formData, due_diligence_period: parseInt(e.target.value)})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      min="14"
                      max="90"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Exclusivity Period (days)
                    </label>
                    <input
                      type="number"
                      value={formData.exclusivity_period}
                      onChange={(e) => setFormData({...formData, exclusivity_period: parseInt(e.target.value)})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      min="14"
                      max="60"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.financing_contingency}
                      onChange={(e) => setFormData({...formData, financing_contingency: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Include financing contingency</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Check if your offer depends on securing external financing
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Earnout Provision (Optional)
                  </label>
                  <textarea
                    value={formData.earnout_provision}
                    onChange={(e) => setFormData({...formData, earnout_provision: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    rows="3"
                    placeholder="e.g., Additional $500,000 payable if revenue targets are met..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Terms (Optional)
                  </label>
                  <textarea
                    value={formData.additional_terms}
                    onChange={(e) => setFormData({...formData, additional_terms: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    rows="3"
                    placeholder="Any additional terms or conditions..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!formData.seller_name || !formData.business_name || !formData.offer_amount || isGenerating}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  {isGenerating ? 'Generating LOI...' : 'Generate Letter of Intent'}
                </Button>
              </form>

              {isGenerating && (
                <div className="mt-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                  <p className="text-sm text-gray-600 mt-2">Creating your LOI...</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Generated LOI */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200">
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Generated Letter of Intent</h2>
                  <p className="text-gray-600">{formData.business_name} Acquisition</p>
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
                    onClick={downloadLOI}
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
                    Generate New LOI
                  </Button>
                </div>
              </div>

              {/* LOI Content */}
              <div className="p-8">
                <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm whitespace-pre-line leading-relaxed">
                  {generatedLOI}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 bg-yellow-50">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Legal Disclaimer</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      This generated LOI is for informational purposes only and should be reviewed by qualified legal counsel before use. 
                      Terms may need to be customized based on specific circumstances and applicable laws.
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

export default LOIGenerator;