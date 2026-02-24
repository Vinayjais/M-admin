import api from './api';
import { USER_ENDPOINTS } from '../constants/apiEndpoints';

export const userService = {
  getAll: (params = {}) => {
    return api.get(USER_ENDPOINTS.GET_ALL, { params });
  },

  getById: (id) => {
    return api.get(USER_ENDPOINTS.GET_ONE(id));
  },

  create: (userData) => {
    return api.post(USER_ENDPOINTS.CREATE, userData);
  },

  update: (id, userData) => {
    return api.put(USER_ENDPOINTS.UPDATE(id), userData);
  },

  delete: (id) => {
    return api.delete(USER_ENDPOINTS.DELETE(id));
  },

  updateRole: (id, role) => {
    return api.patch(USER_ENDPOINTS.UPDATE(id), { role });
  },

  updateStatus: (id, status) => {
    return api.patch(USER_ENDPOINTS.UPDATE(id), { status });
  },
};

export default userService;
