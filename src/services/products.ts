import { useAuthStore } from "../store/authStore";
import type { UserType } from "../types/userType";
import { api } from "./api";

interface ProductFilters {
  pageNumber: number;
  pageSize: number;
  category?: string;
  search?: string;
  state?: string;
  status?: string;
}

export const getProduct = async (id: string) => {
  try {
    const { data } = await api.get(`/products/${id}`);
    return { data };
  } catch (error) {
    console.error(error);
    return {
      error: "Ocorreu um erro ao carregar o produto",
    };
  }
};

export const productsList = async (filters: ProductFilters) => {
  const { user } = useAuthStore.getState();

  try {
    const params: Record<string, string | number> = {
      page: filters.pageNumber,
      perPage: filters.pageSize,
    };

    if (user?.id) params.excludeUserId = user.id;
    if (filters.category) params.categoryId = filters.category;
    if (filters.state) params.state = filters.state;
    if (filters.search) params.search = filters.search;

    const { data } = await api.get("/products", { params });

    return {
      data,
      meta: {
        pages: data.pages,
        prev: data.prev,
        next: data.next,
        first: data.first,
        last: data.last,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Ocorreu um erro ao carregar os produtos",
    };
  }
};

export const myProductsList = async (filters: ProductFilters) => {
  const { user } = useAuthStore.getState();

  try {
    const params: Record<string, string | number> = {
      page: filters.pageNumber,
      perPage: filters.pageSize,
    };

    if (user?.id) params.userId = user.id;
    if (filters.category) params.categoryId = filters.category;
    if (filters.status) params.status = filters.status;
    if (filters.search) params.search = filters.search;

    const { data } = await api.get("/products", { params });

    return {
      data,
      meta: {
        pages: data.pages,
        prev: data.prev,
        next: data.next,
        first: data.first,
        last: data.last,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Ocorreu um erro ao carregar os produtos",
    };
  }
};

export const createProduct = async (productData: any) => {
  try {
    const { data } = await api.post("/products", productData);
    return { data };
  } catch (error) {
    console.error(error);
    return {
      error: "Ocorreu um erro ao criar o produto",
    };
  }
};

export const myProductsMeta = async (user: UserType) => {
  try {
    const { data } = await api.get("/products/meta", {
      params: { userId: user.id },
    });

    return { data };
  } catch (error) {
    console.error(error);
    return {
      error: "Ocorreu um erro ao carregar os produtos",
    };
  }
};

export const updateProduct = async (id: string, productData: any) => {
  try {
    const { data } = await api.put(`/products/${id}`, productData);
    return { data };
  } catch (error) {
    console.error(error);
    return {
      error: "Ocorreu um erro ao atualizar o produto",
    };
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await api.delete(`/products/${id}`);
    return { data: null };
  } catch (error) {
    console.error(error);
    return {
      error: "Ocorreu um erro ao excluir o produto",
    };
  }
};
