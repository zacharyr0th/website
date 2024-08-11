/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [],
    path: '/_next/image',
    loader: 'default',
    disableStaticImages: false,
    minimumCacheTTL: 60,
    contentSecurityPolicy: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'",
    remotePatterns: [],
    unoptimized: false,
    formats: ['image/webp'],
  },
};

module.exports = nextConfig;