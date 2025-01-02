/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    optimizeCss: false,
  },
  webpack: (config) => {
    config.resolve.fallback = { 
      fs: false,
      'styled-jsx': require.resolve('styled-jsx'),
      'styled-jsx/style': require.resolve('styled-jsx/style'),
    };
    return config;
  },
};

module.exports = nextConfig;
