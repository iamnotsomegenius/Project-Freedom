import * as Yup from 'yup';

// Auth validations
export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  user_type: Yup.string()
    .oneOf(['SELLER', 'BUYER', 'INVESTOR'], 'Invalid user type')
    .required('User type is required'),
});

// Business listing validations
export const listingBasicInfoSchema = Yup.object({
  title: Yup.string()
    .required('Business name is required')
    .max(100, 'Business name is too long'),
  industry: Yup.string()
    .required('Industry is required'),
  location: Yup.string()
    .required('Location is required'),
  description: Yup.string()
    .required('Description is required')
    .min(50, 'Description should be at least 50 characters'),
});

export const listingFinancialSchema = Yup.object({
  annual_revenue: Yup.number()
    .positive('Revenue must be positive')
    .required('Annual revenue is required'),
  annual_profit: Yup.number()
    .required('Annual profit is required'),
  asking_price: Yup.number()
    .positive('Asking price must be positive')
    .required('Asking price is required'),
  funding_target: Yup.number()
    .positive('Funding target must be positive')
    .nullable(),
});

export const listingAdditionalSchema = Yup.object({
  employees_count: Yup.number()
    .integer('Must be a whole number')
    .min(0, 'Cannot be negative')
    .required('Number of employees is required'),
  years_in_business: Yup.number()
    .integer('Must be a whole number')
    .min(0, 'Cannot be negative')
    .required('Years in business is required'),
  reason_for_selling: Yup.string()
    .required('Reason for selling is required')
    .min(20, 'Please provide more details'),
});

// Offer validations
export const offerSchema = Yup.object({
  offer_amount: Yup.number()
    .positive('Offer amount must be positive')
    .required('Offer amount is required'),
  down_payment: Yup.number()
    .positive('Down payment must be positive')
    .required('Down payment is required'),
  financing_terms: Yup.string()
    .oneOf(['cash', 'seller_financing', 'bank_financing', 'sba_loan'], 'Invalid financing terms')
    .required('Financing terms are required'),
  closing_timeline: Yup.number()
    .integer('Must be a whole number')
    .min(30, 'Minimum of 30 days required')
    .max(180, 'Maximum of 180 days allowed')
    .required('Closing timeline is required'),
  contingencies: Yup.array()
    .of(Yup.string()),
  additional_notes: Yup.string(),
});

// Investment validations
export const investmentSchema = Yup.object({
  amount: Yup.number()
    .positive('Investment amount must be positive')
    .min(100, 'Minimum investment is $100')
    .required('Investment amount is required'),
  agreement: Yup.boolean()
    .oneOf([true], 'You must agree to the terms')
    .required('You must agree to the terms'),
});
