import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31_536_000,
    qualities: [72, 75, 76, 78, 80],
  },
  async headers() {
    return [{
      source: "/:path*.(webp|jpg|jpeg|png|svg|woff2)",
      headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
    }];
  },
};
export default nextConfig;
