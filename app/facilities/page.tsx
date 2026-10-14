import FacilitiesContent from "@/components/FacilitiesContent";
import PageHeader from "@/components/PageHeader";
import { getSettings } from "@/lib/store";

export const metadata = {
  title: "Our Facilities",
  description: "See how Sarchashma Brothers sources, grades, packs, stores, and loads Afghan apples.",
};

export default async function FacilitiesPage() {
  const settings = await getSettings();
  return <><PageHeader/><FacilitiesContent settings={settings}/></>;
}
