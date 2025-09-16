import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bucket-production-eaf6.up.railway.app",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
