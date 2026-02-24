import api from './api';
import { PRODUCT_ENDPOINTS } from '../constants/apiEndpoints';

export const productService = {
  getAll: (params = {}) => {
    return api.get(PRODUCT_ENDPOINTS.GET_ALL, { params });
  },

  getById: (id) => {
    return api.get(PRODUCT_ENDPOINTS.GET_ONE(id));
  },

  create: (productData) => {
    return api.post(PRODUCT_ENDPOINTS.CREATE, productData);
  },

  update: (id, productData) => {
    return api.put(PRODUCT_ENDPOINTS.UPDATE(id), productData);
  },

  delete: (id) => {
    return api.delete(PRODUCT_ENDPOINTS.DELETE(id));
  },

  updateStatus: (id, status) => {
    return api.patch(PRODUCT_ENDPOINTS.UPDATE(id), { status });
  },

  updatePrice: (id, price) => {
    return api.patch(PRODUCT_ENDPOINTS.UPDATE(id), { price });
  },
};

export default productService;
