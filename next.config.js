/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
      ],
    },
  ],
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
