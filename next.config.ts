import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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

