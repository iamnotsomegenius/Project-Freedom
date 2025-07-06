import api from './axios';

export const integrationAPI = {
  // AI Analysis
  analyzeDeal: async (dealId, analysisType = 'funding_decision') => {
    try {
      const response = await api.post('/integration/analyze-deal', {
        deal_id: dealId,
        analysis_type: analysisType
      });
      return response.data;
    } catch (error) {
      console.error('Error analyzing deal:', error);
      throw error;
    }
  },

  // Push to Marketplace
  pushToMarketplace: async (dealData) => {
    try {
      const response = await api.post('/integration/push-to-marketplace', dealData);
      return response.data;
    } catch (error) {
      console.error('Error pushing to marketplace:', error);
      throw error;
    }
  },

  // Get Marketplace Status
  getMarketplaceStatus: async (dealId) => {
    try {
      const response = await api.get(`/integration/marketplace-status/${dealId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting marketplace status:', error);
      throw error;
    }
  },

  // Return to SeedStack
  returnToSeedStack: async (dealId, fundingSecured, fundingDetails = null) => {
    try {
      const response = await api.post('/integration/return-to-seedstack', {
        deal_id: dealId,
        funding_secured: fundingSecured,
        funding_details: fundingDetails
      });
      return response.data;
    } catch (error) {
      console.error('Error returning to SeedStack:', error);
      throw error;
    }
  },

  // Get Workflow Status
  getWorkflowStatus: async (dealId) => {
    try {
      const response = await api.get(`/integration/workflow-status/${dealId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting workflow status:', error);
      throw error;
    }
  }
};

export default integrationAPI;