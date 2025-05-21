import api, { uploadFile } from './axios';

export const uploadDocument = async (file, folder, isPublic = false, progressCallback = null) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    formData.append('public', isPublic.toString());
    
    const response = await uploadFile('/api/files/upload', formData, progressCallback);
    return response.data;
  } catch (error) {
    console.error('Document upload error:', error);
    const errorMessage = error.response?.data?.detail || 'Document upload failed';
    throw new Error(errorMessage);
  }
};

export const getDocumentUrl = async (path, bucket = 'marketplace-files', isPublic = false) => {
  try {
    const response = await api.get('/api/files/url', {
      params: { path, bucket, public: isPublic }
    });
    return response.data.url;
  } catch (error) {
    console.error('Get document URL error:', error);
    const errorMessage = error.response?.data?.detail || 'Failed to get document URL';
    throw new Error(errorMessage);
  }
};

export const deleteDocument = async (path, bucket = 'marketplace-files') => {
  try {
    const response = await api.delete('/api/files/delete', {
      params: { path, bucket }
    });
    return response.data;
  } catch (error) {
    console.error('Delete document error:', error);
    const errorMessage = error.response?.data?.detail || 'Document deletion failed';
    throw new Error(errorMessage);
  }
};

export const listDocuments = async (folder, bucket = 'marketplace-files') => {
  try {
    const response = await api.get('/api/files/list', {
      params: { folder, bucket }
    });
    return response.data;
  } catch (error) {
    console.error('List documents error:', error);
    const errorMessage = error.response?.data?.detail || 'Failed to list documents';
    throw new Error(errorMessage);
  }
};
