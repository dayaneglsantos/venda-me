import { create } from "zustand";
import type { ProductType } from "../types/productType";

interface ProductState {
  products: ProductType[];
  isLoading: boolean;
  // Ações
  setProducts: (products: ProductType[]) => void;
  addProduct: (product: ProductType) => void;
  removeProduct: (id: string) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: false,

  setProducts: (products) => set({ products }),

  addProduct: (product) =>
    set((state) => ({
      products: [product, ...state.products],
    })),

  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
}));
