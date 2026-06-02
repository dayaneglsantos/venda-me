import { api } from "./api";

interface ProductFilters {
  pageNumber: number;
  pageSize: number;
  category?: string;
  search?: string;
}

export const productsList = async (filters: ProductFilters) => {
  try {
    const params: any = {
      _page: filters.pageNumber,
      _per_page: filters.pageSize,
    };

    if (filters.category) {
      params.categoryId = filters.category;
    }

    if (filters.search) {
      params.q = filters.search;
    }

    const { data } = await api.get("/products", { params });

    return { data };
  } catch (error) {
    console.log(error);
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
    console.log(error);
    return {
      error: "Ocorreu um erro ao criar o produto",
    };
  }
};
