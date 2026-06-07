import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UserType } from "../types/userType";

interface AuthState {
  user: UserType | null;
  isLogged: boolean;
  login: (user: UserType) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLogged: false,

      login: (user) =>
        set({
          user,
          isLogged: true,
        }),

      logout: () =>
        set({
          user: null,
          isLogged: false,
        }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
