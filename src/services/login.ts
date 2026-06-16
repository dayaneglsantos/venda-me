import { api } from "./api";

export const login = async (email: string, password: string) => {
  try {
    const { data } = await api.post("/auth/login", { email, password });
    return { data };
  } catch (error: any) {
    return {
      error: error.response?.data?.error ?? "Ocorreu um erro ao realizar login",
    };
  }
};
