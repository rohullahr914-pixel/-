import Storefront from "@/components/Storefront";
import { getProducts, getSettings } from "@/lib/store";
export default async function Home() {
  const [initialProducts, settings] = await Promise.all([getProducts(), getSettings()]);
  return <Storefront initialProducts={initialProducts} settings={settings} />;
}
