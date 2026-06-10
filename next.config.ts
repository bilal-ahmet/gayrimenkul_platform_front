import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'turklift.com.tr' },
      { protocol: 'https', hostname: 'www.muglam.com.tr' },
    ],
  },
};

export default nextConfig;
