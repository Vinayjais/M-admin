const TOKEN_KEY = 'admin_auth_token';

export const setTokenInStorage = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getTokenFromStorage = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeTokenFromStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

export const setAuthHeader = (token) => {
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
  return {};
};
