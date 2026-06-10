import type { UserType } from "./userType";

export interface ProductType {
  id: string;
  userId: number;
  title: string;
  price: number;
  description: string;
  images: { id: string; url: string }[];
  brand: string;
  categoryId: string;
  condition: "novo" | "usado";
  shipping: boolean;
  createdAt: string;
  user?: UserType;
  status: "available" | "paused" | "sold";
}
