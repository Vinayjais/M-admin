import api from './api';
import { AUTH_ENDPOINTS } from '../constants/apiEndpoints';

export const authService = {
  login: (email, password) => {
    return api.post(AUTH_ENDPOINTS.LOGIN, { email, password });
  },

  register: (userData) => {
    return api.post(AUTH_ENDPOINTS.REGISTER, userData);
  },

  logout: () => {
    return api.post(AUTH_ENDPOINTS.LOGOUT);
  },

  getCurrentUser: () => {
    return api.get(AUTH_ENDPOINTS.ME);
  },

  refreshToken: () => {
    return api.post(AUTH_ENDPOINTS.REFRESH_TOKEN);
  },
};

export default authService;
