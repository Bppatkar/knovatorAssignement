import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:7000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    console.log(
      `Making ${config.method?.toUpperCase()} request to: ${config.url}`
    );
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status);
    return response;
  },
  (error) => {
    console.error('API Error:', error);

    if (error.code === 'ECONNREFUSED') {
      toast.error(
        'Cannot connect to server. Please make sure the backend is running on port 7000.'
      );
    } else if (error.response) {
      // Server responded with error status
      const message = error.response?.data?.message || 'Something went wrong';
      toast.error(message);
    } else if (error.request) {
      // Request made but no response received
      toast.error('No response from server. Please check your connection.');
    } else {
      // Something else happened
      toast.error('An unexpected error occurred');
    }

    return Promise.reject(error);
  }
);

// Products API
export const getProducts = (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value);
    }
  });

  const url = params.toString()
    ? `/products?${params.toString()}`
    : '/products';
  console.log('Fetching products from:', url);

  return api.get(url);
};

export const getFilters = () => api.get('/products/filters');

// Test connection
export const testConnection = () => api.get('/health');
export const testProducts = () => api.get('/test-products');

// Orders API
export const placeOrder = (orderData) => api.post('/orders', orderData);

export default api;
