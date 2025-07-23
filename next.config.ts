import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["api.builder.io"],
  },
  async rewrites() {
    return [
      {
        source: '/metrics',
        destination: '/api/metrics',
      },
    ];
  },
};

export default nextConfig;

