export interface ProductType {
  id: string;
  userId: number;
  title: string;
  price: number;
  description: string;
  images: string[]; // URLs organizadas pelo Dnd Kit
  brand: string;
  categoryId: number;
  condition: "novo" | "usado";
  shipping: boolean;
  createdAt: string;
}
