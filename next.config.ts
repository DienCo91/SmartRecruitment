import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  experimental: {
    authInterrupts: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // cho phép mọi domain HTTPS
      },
      {
        protocol: 'http',
        hostname: '**', // cho phép cả HTTP (nếu cần)
      },
    ],
  },
};

export default nextConfig;
