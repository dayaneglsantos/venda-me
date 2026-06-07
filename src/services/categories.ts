import { api } from "./api";

export const categoriesList = async () => {
  try {
    const { data } = await api.get("/categories");
    return { data };
  } catch (error) {
    console.error(error);
    return {
      error: "Ocorreu um erro ao carregar as categorias",
    };
  }
};
