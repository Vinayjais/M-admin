import api from './api';
import { ORDER_ENDPOINTS } from '../constants/apiEndpoints';

export const orderService = {
  getAll: (params = {}) => {
    return api.get(ORDER_ENDPOINTS.GET_ALL, { params });
  },

  getById: (id) => {
    return api.get(ORDER_ENDPOINTS.GET_ONE(id));
  },

  updateStatus: (id, status) => {
    return api.patch(ORDER_ENDPOINTS.UPDATE_STATUS(id), { status });
  },

  getByUser: (userId) => {
    return api.get(ORDER_ENDPOINTS.GET_ALL, { params: { userId } });
  },

  getStats: () => {
    return api.get(`${ORDER_ENDPOINTS.GET_ALL}/stats`);
  },
};

export default orderService;
