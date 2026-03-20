import api from './api';
import { PRODUCT_ENDPOINTS } from '../constants/apiEndpoints';

export const productService = {
  getAll: (params = {}) => api.get(PRODUCT_ENDPOINTS.GET_ALL, { params }),

  search: (query) => api.get(PRODUCT_ENDPOINTS.SEARCH, { params: { q: query } }),

  getById: (id) => api.get(PRODUCT_ENDPOINTS.GET_ONE(id)),

  create: (productData) => {
    const form = new FormData();
    Object.entries(productData).forEach(([key, val]) => {
      if (val !== undefined && val !== null) form.append(key, val);
    });
    return api.post(PRODUCT_ENDPOINTS.CREATE, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  update: (id, productData) => api.put(PRODUCT_ENDPOINTS.UPDATE(id), productData),

  delete: (id) => api.delete(PRODUCT_ENDPOINTS.DELETE(id)),
};

export default productService;
