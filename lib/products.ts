import type { Product } from "./types";
import { getProducts as readProducts } from "./store";
/** @deprecated Use getProducts from lib/store. */
export async function getProducts(): Promise<Product[]> { return readProducts(); }
