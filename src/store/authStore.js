import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getTokenFromStorage,
  removeTokenFromStorage,
  setTokenInStorage,
} from "../utils/tokenUtils";
import authStore from "../services/authService";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: getTokenFromStorage(),
      isAuthenticated: !!getTokenFromStorage(),
      isInitialized: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const res = await authStore.login(email, password);
          console.log("Login response:", res.data);
          const { token, user } = res.data;

          setTokenInStorage(token);

          set({
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
            token: token,
            isAuthenticated: true,
            isLoading: false,
          });

          return { token, user: user };
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          throw error;
        }
      },



      logout: () => {
        removeTokenFromStorage();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      setUser: (user) => set({ user }),

      checkAuth: async () => {
        const token = getTokenFromStorage();
        if (!token) {
          set({ isAuthenticated: false, isInitialized: true });
          return;
        }

        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          const currentTime = Math.floor(Date.now() / 1000);
          if (payload.exp < currentTime) throw new Error("Token expired");

          set({ user: { id: payload.id, name: payload.name, email: payload.email }, token, isAuthenticated: true, isInitialized: true });
        } catch (error) {
          removeTokenFromStorage();
          set({ user: null, token: null, isAuthenticated: false, isInitialized: true });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state.isInitialized = true;
      },
    },
  ),
);

export default useAuthStore;
