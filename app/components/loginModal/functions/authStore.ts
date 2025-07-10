import { create } from 'zustand';
import { persist, createJSONStorage, subscribeWithSelector } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isHydrated: boolean;
  user: User | null;
  role: string;
  timestamp: number | null;
  
  // Actions
  setAuth: (userObject: User, role: string) => void;
  clearAuth: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      isHydrated: false,
      user: null,
      role: '',
      timestamp: null,

      // Actions
      setAuth: (userObject: User, role: string) => 
        set({
          user: userObject,
          role: role,
          timestamp: Date.now(),
        }),

      clearAuth: () =>
        set({
          user: null,
          role: '',
          timestamp: null,
        }),

      setHydrated: () =>
        set({
          isHydrated: true,
        }),
    }),
    {
      name: 'auth-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        role: state.role,
        timestamp: state.timestamp,
        // isHydrated is not persisted as it should reset on page load
      }),
      onRehydrateStorage: () => (state) => {
        // Always set isHydrated to true when localStorage loads
        if (state) {
          state.isHydrated = true;
        }
      },
      skipHydration: false,
    }
  )
);

// Single hook that contains everything
export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);
  const timestamp = useAuthStore((state) => state.timestamp);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  
  const isAuthenticated = !!(user?.id && user?.email && user?.name);

  return {
    user,
    role,
    timestamp,
    isHydrated,
    isAuthenticated,
    setAuth,
    clearAuth,
  };
};