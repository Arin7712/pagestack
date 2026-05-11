import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com"
      },
      {
        protocol: "https",
        hostname: "ztvfw4mm5j.ufs.sh"
      }
    ]
  }
};

export default nextConfig;
