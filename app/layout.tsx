import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "براداران سرچشمه | Sarchashma Brothers", template: "%s | Sarchashma Brothers" },
  description: "Premium Afghan apples sourced directly from local orchard farmers for wholesale buyers across Afghanistan and international markets.",
  applicationName: "Sarchashma Brothers",
  icons: { icon: "/brand/logo.png", apple: "/brand/logo.png" },
  openGraph: { type: "website", locale: "fa_AF", alternateLocale: ["ps_AF", "en_US"], siteName: "Sarchashma Brothers", title: "Sarchashma Brothers", description: "Premium Afghan Apples, Direct to Your Business", images: [{ url: "/brand/logo.png", width: 1254, height: 1254, alt: "Sarchashma Brothers" }] },
  twitter: { card: "summary_large_image", title: "Sarchashma Brothers", description: "Premium Afghan Apples, Direct to Your Business", images: ["/brand/logo.png"] },
  alternates: { canonical: "/" },
};
export const viewport: Viewport = { themeColor: "#0b3325", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structured = { "@context":"https://schema.org", "@type":"Organization", name:"Sarchashma Brothers", alternateName:"براداران سرچشمه", foundingDate:"1387 SH", address:{ "@type":"PostalAddress", addressLocality:"Sarchashma, Jalrez District", addressRegion:"Maidan Wardak", addressCountry:"AF" }, logo:"/brand/logo.png" };
  return <html lang="fa" dir="rtl"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured)}}/></body></html>;
}
