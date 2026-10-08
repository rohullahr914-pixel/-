import Storefront from "@/components/Storefront";
import { getProducts } from "@/lib/products";
export default function Home() {
  return <Storefront initialProducts={getProducts()} />;
}
