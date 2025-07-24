import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    disableOptimizedLoading: true,
  },
  images: {
    domains: ["api.builder.io"],
  },
  async rewrites() {
    return [
      {
        source: "/metrics",
        destination: "/api/metrics",
      },
    ];
  },
};

export default nextConfig;
