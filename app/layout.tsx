import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "برادران سرچشمه | سیب تازه از باغ برای تجارت عمده",
  description: "عرضه عمده سیب سرخ و زرد تازه و گلچین‌شده از باغ‌های درهٔ سرچشمه، میدان وردک؛ هماهنگی مستقیم قیمت روز، بسته‌بندی و ارسال.",
  icons: { icon: "/brand/logo.jpeg" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fa" dir="rtl"><body>{children}</body></html>;
}
