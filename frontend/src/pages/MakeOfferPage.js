import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import { offerSchema } from '../utils/validation';
import { getListing } from '../api/listings';
import { createOffer } from '../api/offers';
import { formatCurrency, formatFinancingType } from '../utils/format';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

const MakeOfferPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { data: listing, isLoading: isLoadingListing } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => getListing(id),
  });
  
  const offerMutation = useMutation({
    mutationFn: createOffer,
    onSuccess: () => {
      toast.success('Offer submitted successfully!');
      navigate(`/dashboard/buyer/offers`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || 'Failed to submit offer');
    },
  });
  
  const formik = useFormik({
    initialValues: {
      business_id: id,
      offer_amount: '',
      down_payment: '',
      financing_terms: '',
      contingencies: [],
      closing_timeline: '60',
      additional_notes: ''
    },
    validationSchema: offerSchema,
    onSubmit: (values) => {
      offerMutation.mutate(values);
    },
  });
  
  const generateAiSuggestions = () => {
    setIsGenerating(true);
    
    // In a real implementation, this would call an API endpoint
    // For now, we'll simulate AI suggestions
    setTimeout(() => {
      const suggestedOffer = listing.asking_price * 0.95; // 95% of asking price
      const suggestedDownPayment = suggestedOffer * 0.25; // 25% down payment
      
      setAiSuggestions({
        offer_amount: suggestedOffer,
        down_payment: suggestedDownPayment,
        financing_terms: 'sba_loan',
        closing_timeline: '90',
        contingencies: ['financing', 'due_diligence']
      });
      
      setIsGenerating(false);
    }, 1500);
  };
  
  const applyAiSuggestions = () => {
    if (!aiSuggestions) return;
    
    formik.setValues({
      ...formik.values,
      ...aiSuggestions
    });
  };
  
  // Business summary card
  const BusinessSummaryCard = ({ listing }) => {
    if (!listing) return null;
    
    return (
      <div className="rounded-lg border border-gray-800 overflow-hidden">
        <div className="p-4">
          <h4 className="font-medium text-lg mb-1">{listing.title}</h4>
          <div className="text-sm text-gray-400 mb-3 flex items-center">
            <span className="mr-2">{listing.industry}</span>
            <span>•</span>
            <span className="ml-2">{listing.location}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Annual Revenue:</span>
            <span>{formatCurrency(listing.annual_revenue)}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Annual Profit:</span>
            <span>{formatCurrency(listing.annual_profit)}</span>
          </div>
          <div className="flex justify-between text-sm font-medium">
            <span>Asking Price:</span>
            <span>{formatCurrency(listing.asking_price)}</span>
          </div>
        </div>
      </div>
    );
  };
  
  const financingOptions = [
    { value: 'cash', label: 'All Cash' },
    { value: 'seller_financing', label: 'Seller Financing' },
    { value: 'bank_financing', label: 'Bank Financing' },
    { value: 'sba_loan', label: 'SBA Loan' }
  ];
  
  const contingencyOptions = [
    { id: 'financing', label: 'Financing Contingency' },
    { id: 'due_diligence', label: 'Due Diligence' },
    { id: 'inventory', label: 'Inventory Verification' },
    { id: 'lease_transfer', label: 'Lease Transfer' },
    { id: 'training', label: 'Seller Training Period' },
    { id: 'non_compete', label: 'Non-Compete Agreement' }
  ];
  
  // Contingency selector component
  const ContingencySelector = () => {
    const toggleContingency = (contingencyId) => {
      const currentContingencies = [...formik.values.contingencies];
      
      if (currentContingencies.includes(contingencyId)) {
        formik.setFieldValue(
          'contingencies',
          currentContingencies.filter(id => id !== contingencyId)
        );
      } else {
        formik.setFieldValue(
          'contingencies',
          [...currentContingencies, contingencyId]
        );
      }
    };
    
    return (
      <div className="space-y-2">
        {contingencyOptions.map((contingency) => (
          <div key={contingency.id} className="flex items-center">
            <input
              type="checkbox"
              id={`contingency-${contingency.id}`}
              checked={formik.values.contingencies.includes(contingency.id)}
              onChange={() => toggleContingency(contingency.id)}
              className="mr-2"
            />
            <label htmlFor={`contingency-${contingency.id}`} className="text-sm">
              {contingency.label}
            </label>
          </div>
        ))}
      </div>
    );
  };
  
  if (isLoadingListing) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-800 rounded w-1/3 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-primary rounded-lg p-6 h-96" />
            <div className="lg:col-span-1 bg-primary rounded-lg p-6 h-96" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
        <h2 className="text-2xl font-bold mb-4">Business Not Found</h2>
        <p className="text-gray-400 mb-6">The business listing you're looking for doesn't exist or has been removed.</p>
        <Button href="/marketplace">Return to Marketplace</Button>
      </div>
    );
  }
  
  // Check if business is already under LOI
  if (listing.under_loi) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
        <h2 className="text-2xl font-bold mb-4">Business Under Letter of Intent</h2>
        <p className="text-gray-400 mb-6">This business is already under a letter of intent and is not accepting new offers at this time.</p>
        <Button href={`/marketplace/${id}`}>Return to Business</Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Make an Offer on {listing.title}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={formik.handleSubmit} className="bg-primary rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Offer Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Offer Amount"
                  type="number"
                  name="offer_amount"
                  value={formik.values.offer_amount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.offer_amount && formik.errors.offer_amount}
                  placeholder="Enter amount"
                  required
                />
                <Input
                  label="Down Payment"
                  type="number"
                  name="down_payment"
                  value={formik.values.down_payment}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.down_payment && formik.errors.down_payment}
                  placeholder="Enter amount"
                  required
                />
                <Select
                  label="Financing Terms"
                  name="financing_terms"
                  value={formik.values.financing_terms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.financing_terms && formik.errors.financing_terms}
                  options={financingOptions}
                  placeholder="Select financing option"
                  required
                />
                <Input
                  label="Closing Timeline (days)"
                  type="number"
                  name="closing_timeline"
                  value={formik.values.closing_timeline}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.closing_timeline && formik.errors.closing_timeline}
                  min="30"
                  max="180"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Contingencies</h3>
              <ContingencySelector />
              {formik.touched.contingencies && formik.errors.contingencies && (
                <p className="mt-1 text-danger text-sm">{formik.errors.contingencies}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Additional Notes
              </label>
              <textarea
                name="additional_notes"
                className="w-full bg-background text-foreground rounded-md p-3 h-32 border border-gray-800"
                value={formik.values.additional_notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Add any additional terms or notes for the seller"
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/marketplace/${id}`)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-secondary hover:bg-secondary/90 text-background"
                disabled={offerMutation.isLoading}
              >
                {offerMutation.isLoading ? "Submitting..." : "Submit Offer"}
              </Button>
            </div>
          </form>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-primary rounded-lg p-6 sticky top-24">
            <h3 className="text-lg font-medium mb-4">AI Offer Assistant</h3>
            <p className="text-sm text-gray-300 mb-4">
              Our AI can suggest competitive terms based on similar business sales and market data.
            </p>
            
            <Button
              onClick={generateAiSuggestions}
              className="w-full mb-4"
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate Suggestions"}
            </Button>
            
            {aiSuggestions && (
              <div className="mt-4">
                <h4 className="text-md font-medium mb-2">Suggestions</h4>
                <div className="bg-background/30 rounded p-3 mb-3 text-sm">
                  {aiSuggestions.offer_amount && (
                    <p className="mb-1"><span className="font-medium">Offer Amount:</span> {formatCurrency(aiSuggestions.offer_amount)}</p>
                  )}
                  {aiSuggestions.down_payment && (
                    <p className="mb-1"><span className="font-medium">Down Payment:</span> {formatCurrency(aiSuggestions.down_payment)}</p>
                  )}
                  {aiSuggestions.financing_terms && (
                    <p className="mb-1"><span className="font-medium">Financing:</span> {formatFinancingType(aiSuggestions.financing_terms)}</p>
                  )}
                  {aiSuggestions.closing_timeline && (
                    <p className="mb-1"><span className="font-medium">Timeline:</span> {aiSuggestions.closing_timeline} days</p>
                  )}
                </div>
                <Button
                  onClick={applyAiSuggestions}
                  variant="outline"
                  className="w-full"
                >
                  Apply Suggestions
                </Button>
              </div>
            )}
            
            <div className="mt-6 pt-6 border-t border-gray-800">
              <h4 className="text-md font-medium mb-2">Business Summary</h4>
              <BusinessSummaryCard listing={listing} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeOfferPage;
