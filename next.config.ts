import type { NextConfig } from "next";
import { loadBrandEnv } from "./load-env";

// Load brand-specific environment variables
loadBrandEnv();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Configure multi-domain deployment
  // If you host on different domains, you can configure them here
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
