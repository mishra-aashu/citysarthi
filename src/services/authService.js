import { fetchApi } from './apiService';

export const loginWithPhone = async (phoneNumber) => {
  return fetchApi('/auth/login', { method: 'POST', body: JSON.stringify({ phoneNumber }) });
};

export const verifyOtp = async (phoneNumber, otp) => {
  return fetchApi('/auth/verify-otp', { method: 'POST', body: JSON.stringify({ phoneNumber, otp }) });
};
