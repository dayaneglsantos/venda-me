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
    const { data } = await api.get(`/products/${id}?_embed=user`);
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
    const params: any = {
      _page: filters.pageNumber,
      _per_page: filters.pageSize,
      _sort: "-createdAt",
      _embed: "user",
    };

    const where: Record<string, any> = {};

    //produtos que não são do usuário logado
    where.userId = {
      ne: user?.id,
    };

    if (filters.category) {
      where.categoryId = {
        eq: filters.category,
      };
    }

    if (filters.state) {
      where.user = {
        state: {
          eq: filters.state,
        },
      };
    }

    if (filters.search) {
      where.title = {
        contains: filters.search,
      };
    }

    params._where = JSON.stringify(where);

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
    const params: any = {
      _page: filters.pageNumber,
      _per_page: filters.pageSize,
      _sort: "-createdAt",
      _embed: "user",
    };

    const where: Record<string, any> = {};

    where.userId = {
      eq: user?.id,
    };

    if (filters.category) {
      where.categoryId = {
        eq: filters.category,
      };
    }
    if (filters.status) {
      where.status = {
        eq: filters.status,
      };
    }

    if (filters.search) {
      where.title = {
        contains: filters.search,
      };
    }

    params._where = JSON.stringify(where);

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
    const { data } = await api.get(
      `/products?_where=${JSON.stringify({
        userId: {
          eq: user.id,
        },
      })}`,
    );

    const totalProducts = data.length;
    const soldProducts = data.filter(
      (product: any) => product.status === "sold",
    ).length;
    const pausedProducts = data.filter(
      (product: any) => product.status === "paused",
    ).length;
    const activeProducts = data.filter(
      (product: any) => product.status === "available",
    ).length;

    return {
      data: { totalProducts, soldProducts, pausedProducts, activeProducts },
    };
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
