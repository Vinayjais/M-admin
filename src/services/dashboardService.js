import api from './api';
import { DASHBOARD_ENDPOINTS } from '../constants/apiEndpoints';

export const dashboardService = {
  getStats: (timeRange = 'month') => {
    return api.get(DASHBOARD_ENDPOINTS.STATS, { params: { timeRange } });
  },

  getRevenueData: (timeRange = 'month') => {
    return api.get(DASHBOARD_ENDPOINTS.REVENUE, { params: { timeRange } });
  },

  getSalesOverview: () => {
    return api.get(`${DASHBOARD_ENDPOINTS.STATS}/sales`);
  },

  getTopProducts: (limit = 10) => {
    return api.get(`${DASHBOARD_ENDPOINTS.STATS}/top-products`, { params: { limit } });
  },
};

export default dashboardService;
