import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getTokenFromStorage,
  removeTokenFromStorage,
  setTokenInStorage,
} from "../utils/tokenUtils";
import authStore from "../services/authService";

// Mock dummy users for testing
const DUMMY_USERS = {
  "admin@example.com": {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    permissions: [
      "view_dashboard",
      "manage_users",
      "manage_products",
      "manage_orders",
      "view_reports",
      "manage_settings",
    ],
  },
  "manager@example.com": {
    id: "2",
    name: "Manager User",
    email: "manager@example.com",
    password: "manager123",
    role: "manager",
    permissions: [
      "view_dashboard",
      "manage_users",
      "manage_products",
      "manage_orders",
    ],
  },
  "staff@example.com": {
    id: "3",
    name: "Staff User",
    email: "staff@example.com",
    password: "staff123",
    role: "staff",
    permissions: ["view_dashboard", "manage_orders", "view_reports"],
  },
  "viewer@example.com": {
    id: "4",
    name: "Viewer User",
    email: "viewer@example.com",
    password: "viewer123",
    role: "viewer",
    permissions: ["view_dashboard"],
  },
};

// Generate mock JWT token
const generateMockToken = (user) => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      id: user.id,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
    }),
  );
  const signature = btoa("mock-signature");
  return `${header}.${payload}.${signature}`;
};

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: getTokenFromStorage(),
      isAuthenticated: !!getTokenFromStorage(),
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 500));

          // Check if user exists in dummy users
          // const dummyUser = DUMMY_USERS[email];
          // if (!dummyUser || dummyUser.password !== password) {
          //   throw new Error('Invalid email or password');
          // }

          // Generate mock token
          // const token = generateMockToken(dummyUser);
          // setTokenInStorage(token);

          // Return user data without password

          const res = await authStore.login(email, password);
          console.log("Login response:", res.data);
          const { token, user } = res.data;

          set({
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user?.role || "admin",
              permissions: user.permissions,
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

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 500));

          // Check if user already exists
          if (DUMMY_USERS[userData.email]) {
            throw new Error("User already exists");
          }

          // Create new user
          const newUser = {
            id: String(Object.keys(DUMMY_USERS).length + 1),
            name: userData.name,
            email: userData.email,
            password: userData.password,
            role: "staff",
            permissions: ["view_dashboard", "manage_orders"],
          };

          DUMMY_USERS[userData.email] = newUser;

          // Generate mock token
          const token = generateMockToken(newUser);
          setTokenInStorage(token);

          const returnUser = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            permissions: newUser.permissions,
          };

          set({
            user: returnUser,
            token: token,
            isAuthenticated: true,
            isLoading: false,
          });

          return { token, user: returnUser };
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
          set({ isAuthenticated: false });
          return;
        }

        try {
          // Decode mock token
          const payload = JSON.parse(atob(token.split(".")[1]));

          // Check if token is expired
          const currentTime = Math.floor(Date.now() / 1000);
          if (payload.exp < currentTime) {
            throw new Error("Token expired");
          }

          const user = {
            id: payload.id,
            email: payload.email,
            name: Object.values(DUMMY_USERS).find(
              (u) => u.email === payload.email,
            )?.name,
            role: payload.role,
            permissions: payload.permissions,
          };

          set({
            user,
            token,
            isAuthenticated: true,
          });
        } catch (error) {
          removeTokenFromStorage();
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
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
    },
  ),
);

export default useAuthStore;
