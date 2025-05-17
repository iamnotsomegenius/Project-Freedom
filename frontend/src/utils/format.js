import { format, formatDistanceToNow } from 'date-fns';

// Format currency as USD
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return 'N/A';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Calculate multiple (price/earnings ratio)
export const calculateMultiple = (price, earnings) => {
  if (!price || !earnings || earnings === 0) return 'N/A';
  
  const multiple = price / earnings;
  return multiple.toFixed(1) + 'x';
};

// Format financing type for display
export const formatFinancingType = (type) => {
  if (!type) return 'N/A';
  
  const types = {
    cash: 'All Cash',
    seller_financing: 'Seller Financing',
    bank_financing: 'Bank Financing',
    sba_loan: 'SBA Loan',
  };
  
  return types[type] || type;
};

// Format date for display
export const formatDate = (date) => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  return format(dateObj, 'MMM d, yyyy');
};

// Format time ago for display
export const formatTimeAgo = (date) => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  return formatDistanceToNow(dateObj, { addSuffix: true });
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.slice(0, maxLength) + '...';
};
