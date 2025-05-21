import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 Unauthorized errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page or show login modal
      localStorage.removeItem('token');
      // Dispatch logout event so the AuthContext can react
      window.dispatchEvent(new Event('auth:logout'));
    }
    return Promise.reject(error);
  }
);

// Helper function for file uploads - supports multipart/form-data
export const uploadFile = async (url, formData, progressCallback = null) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: progressCallback
      ? (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          progressCallback(percentCompleted);
        }
      : undefined,
  };
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}${url}`, formData, config);
};

export default api;
