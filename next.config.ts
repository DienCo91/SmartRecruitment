import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  /* config options here */
  experimental: {
    authInterrupts: true,
  },
  images: {
    domains: ['cdn-new.topcv.vn', 'static.topcv.vn'],
  },
};

export default nextConfig;
