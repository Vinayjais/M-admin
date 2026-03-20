import { useCallback } from 'react';
import useAuthStore from '../store/authStore';

export const useAuth = () => {
  const { user, token, isAuthenticated, isLoading, error, login, logout, setUser } = useAuthStore();

  const handleLogin = useCallback(
    async (email, password) => {
      console.log("Attempting login with email:", email);
      return login(email, password);
    },
    [login]
  );

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    logout: handleLogout,
    setUser,
  };
};

export default useAuth;
