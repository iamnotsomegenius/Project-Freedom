import api from './axios';

export const createInvestment = async (investmentData) => {
  const response = await api.post('/api/investments', investmentData);
  return response.data;
};

export const getUserInvestments = async () => {
  const response = await api.get('/api/investments');
  return response.data;
};

export const getBusinessInvestments = async (businessId) => {
  const response = await api.get(`/api/investments/business/${businessId}`);
  return response.data;
};

export const getInvestment = async (id) => {
  const response = await api.get(`/api/investments/${id}`);
  return response.data;
};
