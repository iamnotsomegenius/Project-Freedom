import api from './axios';

export const getUserDeals = async () => {
  const response = await api.get('/api/deals');
  return response.data;
};

export const getDeal = async (id) => {
  const response = await api.get(`/api/deals/${id}`);
  return response.data;
};

export const addTimelineEvent = async (dealId, eventData) => {
  const response = await api.post(`/api/deals/${dealId}/timeline`, eventData);
  return response.data;
};

export const completeDeal = async (id) => {
  const response = await api.post(`/api/deals/${id}/complete`);
  return response.data;
};

export const addDocument = async (dealId, documentData) => {
  const response = await api.post(`/api/deals/${dealId}/documents`, documentData);
  return response.data;
};

export const getDealDocuments = async (dealId) => {
  const response = await api.get(`/api/deals/${dealId}/documents`);
  return response.data;
};
