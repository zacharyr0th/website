import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/**
 * @type {import('next').NextConfig}
 *
 * Next.js Configuration
 * ---------------------
 * This configuration file includes security headers, optimization settings,
 * and performance enhancements. Customize the settings based on your needs.
 *
 * Security Headers:
 * - Strict CSP policies
 * - HSTS configuration
 * - Frame protection
 * - XSS protection
 * - Content type safety
 * - Referrer policy
 * - Permissions policy
 *
 * Performance:
 * - Image optimization
 * - Bundle analysis
 * - CSS optimization
 * - Package imports optimization
 * - Web Vitals tracking
 *
 * Caching:
 * - Static assets
 * - Images
 * - Fonts
 */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 1 week
    // Add domains you need to load images from
    domains: process.env.ALLOWED_IMAGE_DOMAINS?.split(',') || [],
  },

  // Optimization settings
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'react-icons',
      'framer-motion',
      'date-fns',
      'lodash',
      '@heroicons/react',
    ],
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB', 'INP'],
  },

  // Headers for security and caching
  async headers() {
    const securityHeaders = [
      // DNS prefetch control
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
      },
      // Strict Transport Security
      {
        key: 'Strict-Transport-Security',
        value: process.env.HSTS_CONFIG || 'max-age=31536000; includeSubDomains; preload',
      },
      // Frame protection
      {
        key: 'X-Frame-Options',
        value: process.env.FRAME_OPTIONS || 'DENY',
      },
      // Content type safety
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      // XSS protection
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      },
      // Referrer policy
      {
        key: 'Referrer-Policy',
        value: process.env.REFERRER_POLICY || 'strict-origin-when-cross-origin',
      },
      // Permissions policy
      {
        key: 'Permissions-Policy',
        value:
          process.env.PERMISSIONS_POLICY ||
          'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
      },
      // Content Security Policy
      {
        key: 'Content-Security-Policy',
        value:
          process.env.CSP_POLICY ||
          "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel-scripts.com https://*.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https: https://*.your-objectstorage.com; media-src 'self' https://*.your-objectstorage.com; worker-src 'self' blob:;",
      },
    ];

    const cacheConfigs = [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        // Static assets - long-term caching
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: process.env.STATIC_CACHE_CONTROL || 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Images - with revalidation
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value:
              process.env.IMAGE_CACHE_CONTROL ||
              'public, max-age=86400, stale-while-revalidate=31536000',
          },
        ],
      },
      {
        // Fonts - long-term caching
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: process.env.FONT_CACHE_CONTROL || 'public, max-age=31536000, immutable',
          },
        ],
      },
      // API routes - no caching by default
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate',
          },
        ],
      },
      // Exception for the agents API route which should be cached
      {
        source: '/api/public/agents',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      // Exception for the robots API route which should be cached
      {
        source: '/api/public/robots',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          },
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
        ],
      },
      // Exception for the sitemap API route which should be cached
      {
        source: '/api/public/sitemap',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          },
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
        ],
      },
    ];

    return cacheConfigs;
  },

  // Add redirects for standard paths to API routes
  async redirects() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/public/robots',
        permanent: false,
      },
      {
        source: '/sitemap.xml',
        destination: '/api/public/sitemap',
        permanent: false,
      },
      {
        source: '/agents.json',
        destination: '/api/public/agents',
        permanent: false,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
