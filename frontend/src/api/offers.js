import api from './axios';

export const createOffer = async (offerData) => {
  const response = await api.post('/api/offers', offerData);
  return response.data;
};

export const getUserOffers = async () => {
  const response = await api.get('/api/offers');
  return response.data;
};

export const getSellerOffers = async () => {
  const response = await api.get('/api/offers/seller');
  return response.data;
};

export const getOffer = async (id) => {
  const response = await api.get(`/api/offers/${id}`);
  return response.data;
};

export const acceptOffer = async (id) => {
  const response = await api.post(`/api/offers/${id}/accept`);
  return response.data;
};

export const rejectOffer = async (id) => {
  const response = await api.post(`/api/offers/${id}/reject`);
  return response.data;
};
