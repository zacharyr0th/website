/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Use standalone mode with optimizations
  output: 'standalone',

  // Configure pageExtensions to include md and mdx
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  // Disable formatting during build
  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  // Image optimization
  images: {
    unoptimized: true,
  },

  // Performance optimizations
  experimental: {
    serverMinification: false,
    optimizePackageImports: ['react-icons', 'framer-motion', 'lodash'],
    // Add size optimization
    outputFileTracingRoot: process.cwd(),
    outputFileTracingExcludes: {
      '*': ['.git/**', 'node_modules/.cache/**', '.next/cache/**', 'public/audio/**'],
    },
  },
};

export default nextConfig;
