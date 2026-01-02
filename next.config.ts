import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  staticPageGenerationTimeout: 180,
};

export default nextConfig;
