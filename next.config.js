/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://www.google-analytics.com",
              "frame-ancestors 'none'",
              "form-action 'self'",
              "base-uri 'self'",
              'upgrade-insecure-requests',
            ].join('; '),
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ['react-icons'],
  experimental: {
    serverMinification: true,
    serverSourceMaps: false,
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
  // Force all pages to be static by default
  output: 'export',
};

module.exports = nextConfig;
