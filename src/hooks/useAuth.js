import { useCallback } from 'react';
import useAuthStore from '../store/authStore';

export const useAuth = () => {
  const { user, token, isAuthenticated, isLoading, error, login, logout, setUser } = useAuthStore();

  const handleLogin = useCallback(
    async (email, password) => {
      return login(email, password);
    },
    [login]
  );

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const hasRole = useCallback(
    (requiredRole) => {
      return user?.role === requiredRole;
    },
    [user]
  );

  const hasPermission = useCallback(
    (requiredPermission) => {
      return user?.permissions?.includes(requiredPermission) || user?.role === 'admin';
    },
    [user]
  );

  const hasAnyRole = useCallback(
    (roles = []) => {
      return roles.includes(user?.role);
    },
    [user]
  );

  const hasAnyPermission = useCallback(
    (permissions = []) => {
      return permissions.some((perm) => user?.permissions?.includes(perm));
    },
    [user]
  );

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    logout: handleLogout,
    setUser,
    hasRole,
    hasPermission,
    hasAnyRole,
    hasAnyPermission,
  };
};

export default useAuth;
