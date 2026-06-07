import type { UserType } from "../types/userType";
import { api } from "./api";

interface ProductFilters {
  pageNumber: number;
  pageSize: number;
  category?: string;
  search?: string;
  state?: string;
}

export const productsList = async (filters: ProductFilters) => {
  try {
    const params: any = {
      _page: filters.pageNumber,
      _per_page: filters.pageSize,
      _sort: "-createdAt",
      _embed: "user",
    };

    const where: Record<string, any> = {};

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
    const { data } = await api.get(`/products?userId=${user.id}`);

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
