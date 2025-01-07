/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ['react-icons'],
  experimental: {
    serverMinification: true,
    serverSourceMaps: false,
    optimizeCss: {
      cssModules: true,
      inlineFonts: true,
      pruneUnusedSelectors: true,
      minify: true,
    },
    optimizeServerReact: true,
  },
  webpack: (config, { isServer }) => {
    // Optimize bundle size
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

    if (isServer) {
      // Server-specific optimizations
      config.optimization = {
        ...config.optimization,
        minimize: true,
        sideEffects: true,
        concatenateModules: true,
      };
    }

    // Handle browser APIs in server context
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
      };
    }

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
  // Force all pages to be static by default
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;