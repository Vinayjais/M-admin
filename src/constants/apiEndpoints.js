const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/user/authentication`,
  REGISTER: `${API_BASE_URL}/user/user_register`,
  LOGOUT: `${API_BASE_URL}/user/logout`,
  ME: `${API_BASE_URL}/user/me`,
  REFRESH_TOKEN: `${API_BASE_URL}/user/refresh`,
};

export const USER_ENDPOINTS = {
  GET_ALL: `${API_BASE_URL}/admin/users`,
  GET_ONE: (id) => `${API_BASE_URL}/users/${id}`,
  CREATE: `${API_BASE_URL}/users`,
  UPDATE: (id) => `${API_BASE_URL}/users/${id}`,
  DELETE: (id) => `${API_BASE_URL}/users/${id}`,
};

export const CATEGORY_ENDPOINTS = {
  GET_ALL: `${API_BASE_URL}/categories`,
  GET_ONE: (id) => `${API_BASE_URL}/categories/${id}`,
  CREATE: `${API_BASE_URL}/categories`,
  UPDATE: (id) => `${API_BASE_URL}/categories/${id}`,
  DELETE: (id) => `${API_BASE_URL}/categories/${id}`,
};

export const PRODUCT_ENDPOINTS = {
  GET_ALL: `${API_BASE_URL}/products`,
  SEARCH: `${API_BASE_URL}/products/search`,
  GET_ONE: (id) => `${API_BASE_URL}/products/${id}`,
  CREATE: `${API_BASE_URL}/products`,
  UPDATE: (id) => `${API_BASE_URL}/products/${id}`,
  DELETE: (id) => `${API_BASE_URL}/products/${id}`,
};

export const ORDER_ENDPOINTS = {
  GET_ALL: `${API_BASE_URL}/orders`,
  GET_ONE: (id) => `${API_BASE_URL}/orders/${id}`,
  UPDATE_STATUS: (id) => `${API_BASE_URL}/orders/${id}/status`,
};

export const DASHBOARD_ENDPOINTS = {
  STATS: `${API_BASE_URL}/dashboard/stats`,
  REVENUE: `${API_BASE_URL}/dashboard/revenue`,
};

export const ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  STAFF: "staff",
  VIEWER: "viewer",
};

export const PERMISSIONS = {
  VIEW_DASHBOARD: "view_dashboard",
  MANAGE_USERS: "manage_users",
  MANAGE_PRODUCTS: "manage_products",
  MANAGE_ORDERS: "manage_orders",
  VIEW_REPORTS: "view_reports",
  MANAGE_SETTINGS: "manage_settings",
};
