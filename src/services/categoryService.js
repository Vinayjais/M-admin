import api from './api';
import { CATEGORY_ENDPOINTS } from '../constants/apiEndpoints';

const parseError = (err) => {
  const data = err.response?.data;
  if (typeof data === 'string') return data;
  return data?.message || data?.error || err.message || 'Something went wrong';
};

const categoryService = {
  getAll: async () => {
    try {
      return await api.get(CATEGORY_ENDPOINTS.GET_ALL);
    } catch (err) {
      throw new Error(parseError(err));
    }
  },

  getById: async (id) => {
    try {
      return await api.get(CATEGORY_ENDPOINTS.GET_ONE(id));
    } catch (err) {
      throw new Error(parseError(err));
    }
  },

  create: async (data) => {
    try {
      return await api.post(CATEGORY_ENDPOINTS.CREATE, data);
    } catch (err) {
      throw new Error(parseError(err));
    }
  },

  update: async (id, data) => {
    try {
      return await api.put(CATEGORY_ENDPOINTS.UPDATE(id), data);
    } catch (err) {
      throw new Error(parseError(err));
    }
  },

  delete: async (id) => {
    try {
      return await api.delete(CATEGORY_ENDPOINTS.DELETE(id));
    } catch (err) {
      throw new Error(parseError(err));
    }
  },
};

export default categoryService;
