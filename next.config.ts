import type { NextConfig } from "next";

// Static export: `npm run build` writes plain files to `out/`, which any static host serves.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
