import api from './axios';

export const createPaymentIntent = async (amount, currency = 'usd', metadata = {}) => {
  try {
    const response = await api.post('/api/payments/create-intent', {
      amount,
      currency,
      metadata
    });
    return response.data;
  } catch (error) {
    console.error('Payment intent creation error:', error);
    const errorMessage = error.response?.data?.detail || 'Payment processing failed';
    throw new Error(errorMessage);
  }
};

// This function would be used with Stripe Elements on the frontend
export const processPayment = async (clientSecret, paymentMethod) => {
  try {
    // This would typically be handled by Stripe.js in the frontend
    // and wouldn't involve a direct API call to your backend
    // This is just a placeholder to show the flow
    const response = await api.post('/api/payments/process', {
      client_secret: clientSecret,
      payment_method: paymentMethod
    });
    return response.data;
  } catch (error) {
    console.error('Payment processing error:', error);
    const errorMessage = error.response?.data?.detail || 'Payment processing failed';
    throw new Error(errorMessage);
  }
};

export const getPaymentHistory = async () => {
  try {
    const response = await api.get('/api/payments/history');
    return response.data;
  } catch (error) {
    console.error('Payment history error:', error);
    const errorMessage = error.response?.data?.detail || 'Failed to get payment history';
    throw new Error(errorMessage);
  }
};
