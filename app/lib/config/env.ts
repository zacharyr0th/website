export const config = {
  env: process.env.NODE_ENV || 'development',
  isDev: process.env.NODE_ENV !== 'production',
  isProd: process.env.NODE_ENV === 'production',
  port: parseInt(process.env.PORT || '3000', 10),
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  apiKey: process.env.API_KEY || 'development-key',
  jwtSecret: process.env.JWT_SECRET || 'development-secret',
  cookieSecret: process.env.COOKIE_SECRET || 'development-cookie-secret',
  rate_limit_window_ms: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
  rate_limit_max_requests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  allowed_origins: process.env.ALLOWED_ORIGINS || 'http://localhost:3000,https://zacharyr0th.com',
} as const;
