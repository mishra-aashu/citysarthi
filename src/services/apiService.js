import { API_CONFIG } from '../config/api';

export const fetchApi = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, options);
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
