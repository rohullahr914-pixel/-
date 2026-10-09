import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/store";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> { const base=process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000"; const products=await getProducts(); return ["","/exports","/facilities",...products.map(p=>`/products/${p.slug}`)].map(path=>({url:`${base}${path}`,lastModified:new Date(),changeFrequency:"weekly",priority:path===""?1:.8})); }
