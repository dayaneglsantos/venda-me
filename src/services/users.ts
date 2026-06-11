import { api } from "./api";
import type { UserType } from "../types/userType";

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  state?: string;
  city?: string;
  avatar?: string;
}

interface UpdateUserData {
  name?: string;
  email?: string;
  phone?: string;
  state?: string;
  city?: string;
  avatar?: string;
}

export const createUser = async (data: CreateUserData) => {
  try {
    const { data: existing } = await api.get("/users", {
      params: { email: data.email },
    });
    if (existing.length > 0) {
      return { error: "E-mail já cadastrado." };
    }
    const response = await api.post("/users", data);
    return { data: response.data as UserType };
  } catch {
    return { error: "Ocorreu um erro ao criar o cadastro." };
  }
};

export const updateUser = async (id: number, data: UpdateUserData) => {
  try {
    const response = await api.patch(`/users/${id}`, data);
    return { data: response.data as UserType };
  } catch {
    return { error: "Ocorreu um erro ao atualizar o cadastro." };
  }
};
