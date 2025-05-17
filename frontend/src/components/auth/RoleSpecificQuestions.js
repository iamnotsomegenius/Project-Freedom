import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { completeOnboarding, updateProfile } from '../../api/auth';

// Form validation schemas for each user type
const sellerSchema = Yup.object({
  display_name: Yup.string().required('Business name is required'),
  industry: Yup.string().required('Industry is required'),
  years_in_business: Yup.number()
    .integer('Must be a whole number')
    .min(0, 'Cannot be negative')
    .required('Years in business is required'),
});

const buyerSchema = Yup.object({
  display_name: Yup.string().required('Name is required'),
  industry_interest: Yup.string().required('Industry preference is required'),
  investment_range: Yup.string().required('Investment range is required'),
});

const investorSchema = Yup.object({
  display_name: Yup.string().required('Name is required'),
  investor_type: Yup.string().required('Investor type is required'),
  investment_range: Yup.string().required('Investment range is required'),
});

// Industry options
const industryOptions = [
  { value: 'technology', label: 'Technology' },
  { value: 'food_beverage', label: 'Food & Beverage' },
  { value: 'retail', label: 'Retail' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'services', label: 'Services' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'construction', label: 'Construction' },
  { value: 'finance', label: 'Finance' },
  { value: 'other', label: 'Other' },
];

// Investment range options
const investmentRangeOptions = [
  { value: 'under_50k', label: 'Under $50,000' },
  { value: '50k_100k', label: '$50,000 - $100,000' },
  { value: '100k_250k', label: '$100,000 - $250,000' },
  { value: '250k_500k', label: '$250,000 - $500,000' },
  { value: '500k_1m', label: '$500,000 - $1 million' },
  { value: 'over_1m', label: 'Over $1 million' },
];

// Investor type options
const investorTypeOptions = [
  { value: 'individual', label: 'Individual Investor' },
  { value: 'angel', label: 'Angel Investor' },
  { value: 'vc', label: 'Venture Capital' },
  { value: 'pe', label: 'Private Equity' },
  { value: 'institutional', label: 'Institutional Investor' },
  { value: 'family_office', label: 'Family Office' },
];

const RoleSpecificQuestions = ({ userType, onComplete }) => {
  const { updateUserProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  // Determine schema based on user type
  const getValidationSchema = () => {
    switch (userType) {
      case 'SELLER':
        return sellerSchema;
      case 'BUYER':
        return buyerSchema;
      case 'INVESTOR':
        return investorSchema;
      default:
        return Yup.object({});
    }
  };
  
  // Get initial values based on user type
  const getInitialValues = () => {
    const baseValues = {
      display_name: '',
    };
    
    switch (userType) {
      case 'SELLER':
        return {
          ...baseValues,
          industry: '',
          years_in_business: '',
        };
      case 'BUYER':
        return {
          ...baseValues,
          industry_interest: '',
          investment_range: '',
        };
      case 'INVESTOR':
        return {
          ...baseValues,
          investor_type: '',
          investment_range: '',
        };
      default:
        return baseValues;
    }
  };
  
  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: getValidationSchema(),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setError(null);
      
      try {
        // Update user profile with role-specific data
        const profileData = {
          display_name: values.display_name,
          // Add any additional data to store in the profile
          // We could store other fields in a user_metadata object if needed
        };
        
        // Update profile
        await updateProfile(profileData);
        
        // Update profile in context
        updateUserProfile(profileData);
        
        // Complete onboarding
        await completeOnboarding();
        
        onComplete();
      } catch (err) {
        setError(err.message || 'Failed to complete profile setup');
      } finally {
        setIsSubmitting(false);
      }
    },
  });
  
  // Render form fields based on user type
  const renderFields = () => {
    switch (userType) {
      case 'SELLER':
        return (
          <>
            <Input
              label="Business Name"
              name="display_name"
              value={formik.values.display_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.display_name && formik.errors.display_name}
              placeholder="Your business name"
              required
            />
            
            <Select
              label="Industry"
              name="industry"
              value={formik.values.industry}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.industry && formik.errors.industry}
              options={industryOptions}
              placeholder="Select your business industry"
              required
            />
            
            <Input
              label="Years in Business"
              type="number"
              name="years_in_business"
              value={formik.values.years_in_business}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.years_in_business && formik.errors.years_in_business}
              placeholder="5"
              min="0"
              required
            />
          </>
        );
      
      case 'BUYER':
        return (
          <>
            <Input
              label="Full Name"
              name="display_name"
              value={formik.values.display_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.display_name && formik.errors.display_name}
              placeholder="Your name"
              required
            />
            
            <Select
              label="Industry Preference"
              name="industry_interest"
              value={formik.values.industry_interest}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.industry_interest && formik.errors.industry_interest}
              options={industryOptions}
              placeholder="Select preferred industry"
              required
            />
            
            <Select
              label="Investment Range"
              name="investment_range"
              value={formik.values.investment_range}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.investment_range && formik.errors.investment_range}
              options={investmentRangeOptions}
              placeholder="Select investment range"
              required
            />
          </>
        );
      
      case 'INVESTOR':
        return (
          <>
            <Input
              label="Full Name"
              name="display_name"
              value={formik.values.display_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.display_name && formik.errors.display_name}
              placeholder="Your name"
              required
            />
            
            <Select
              label="Investor Type"
              name="investor_type"
              value={formik.values.investor_type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.investor_type && formik.errors.investor_type}
              options={investorTypeOptions}
              placeholder="Select investor type"
              required
            />
            
            <Select
              label="Investment Range"
              name="investment_range"
              value={formik.values.investment_range}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.investment_range && formik.errors.investment_range}
              options={investmentRangeOptions}
              placeholder="Select investment range"
              required
            />
          </>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <form onSubmit={formik.handleSubmit}>
      {error && (
        <div className="mb-4 p-3 bg-danger/10 border border-danger/30 rounded-md text-sm text-danger">
          {error}
        </div>
      )}
      
      <p className="text-gray-400 mb-6">
        Tell us a bit more about yourself to complete your profile.
      </p>
      
      {renderFields()}
      
      <Button
        type="submit"
        className="w-full mt-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Completing Setup...' : 'Complete Setup'}
      </Button>
    </form>
  );
};

export default RoleSpecificQuestions;
