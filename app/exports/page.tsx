import ExportsContent from "@/components/ExportsContent";
import PageHeader from "@/components/PageHeader";
import { getProducts, getSettings } from "@/lib/store";

export const metadata = {
  title: "Wholesale Apple Exports",
  description: "Export inquiries for Afghan apples with wholesale packaging and order-specific terms.",
};

export default async function ExportsPage() {
  const [settings, products] = await Promise.all([getSettings(), getProducts()]);
  return <><PageHeader/><ExportsContent settings={settings} products={products}/></>;
}
