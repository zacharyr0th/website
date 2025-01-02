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
    appDir: true,
  },
  webpack: (config) => {
    config.resolve.fallback = { 
      fs: false,
      'styled-jsx': require.resolve('styled-jsx'),
      'styled-jsx/style': require.resolve('styled-jsx/style'),
    };
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.join(__dirname, './app'),
      '@components': path.join(__dirname, './app/components'),
      '@lib': path.join(__dirname, './app/lib'),
      '@styles': path.join(__dirname, './app/styles'),
      '@api': path.join(__dirname, './app/api'),
      '@projects': path.join(__dirname, './app/projects'),
      '@writing': path.join(__dirname, './app/writing'),
    }
    return config;
  },
};

module.exports = nextConfig;
