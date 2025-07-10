import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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
    }
  )
);

// Single hook that contains everything
export const useAuth = () => {
  return useAuthStore((state) => ({
    user: state.user,
    role: state.role,
    timestamp: state.timestamp,
    isHydrated: state.isHydrated,
    isAuthenticated: !!(state.user?.id && state.user?.email && state.user?.name),
    setAuth: state.setAuth,
    clearAuth: state.clearAuth,
  }));
};