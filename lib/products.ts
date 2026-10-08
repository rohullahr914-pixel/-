import products from "@/data/products.json";
import type { Product } from "./types";
export function getProducts(): Product[] {
  return products as Product[];
}
