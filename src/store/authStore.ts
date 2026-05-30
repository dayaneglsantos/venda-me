import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Definindo a interface para o TypeScript
interface Usuario {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: Usuario | null;
  isLogged: boolean;
  login: (user: Usuario) => void;
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
