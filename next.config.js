/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ['react-icons'],
  output: 'standalone',
  experimental: {
    serverMinification: true,
    serverSourceMaps: false,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      module: 'empty',
      dgram: 'empty',
      dns: 'mock',
      fs: 'empty',
      http2: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    };
    return config;
  },
  // Security-focused redirects
  redirects: async () => [
    {
      source: '/:path*/index.html',
      destination: '/:path*',
      permanent: true,
    },
    {
      source: '/:path*.html',
      destination: '/:path*',
      permanent: true,
    },
  ],
};

module.exports = nextConfig;