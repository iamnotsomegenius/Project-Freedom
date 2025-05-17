import api from './axios';

export const getListings = async (params = {}) => {
  const response = await api.get('/api/listings', { params });
  return response.data;
};

export const getFeaturedListings = async () => {
  const response = await api.get('/api/listings/featured');
  return response.data;
};

export const getListing = async (id) => {
  const response = await api.get(`/api/listings/${id}`);
  return response.data;
};

export const createListing = async (listingData) => {
  const response = await api.post('/api/listings', listingData);
  return response.data;
};

export const updateListing = async (id, listingData) => {
  const response = await api.put(`/api/listings/${id}`, listingData);
  return response.data;
};

export const deleteListing = async (id) => {
  const response = await api.delete(`/api/listings/${id}`);
  return response.data;
};

export const publishListing = async (id) => {
  const response = await api.put(`/api/listings/${id}/publish`);
  return response.data;
};

export const getSellerListings = async (sellerId) => {
  const response = await api.get(`/api/listings/seller/${sellerId}`);
  return response.data;
};
