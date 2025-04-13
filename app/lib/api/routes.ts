/**
 * Routes Configuration
 *
 * Optimized route definitions with:
 * - Strong type safety
 * - Memoized route lookups
 * - Efficient route filtering
 * - Route validation
 */

// Type definitions with const assertions for better type inference
export const RouteChangeFrequencies = {
  ALWAYS: 'always',
  HOURLY: 'hourly',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
  NEVER: 'never',
} as const;

export type RouteChangeFrequency =
  (typeof RouteChangeFrequencies)[keyof typeof RouteChangeFrequencies];

export type BaseRouteConfig = {
  readonly route: string;
  readonly priority: number;
  readonly changeFrequency: RouteChangeFrequency;
};

export type RouteConfig = BaseRouteConfig & {
  readonly isSecure?: boolean;
  readonly allowBots?: boolean;
  readonly allowCrawling?: boolean;
};

export type RouteCategory = 'static' | 'resource' | 'api' | 'dynamic';

// Memoization for route lookups
const routeConfigCache = new Map<string, RouteConfig>();
const allowedBotRoutesCache = new Set<string>();
const allowedCrawlingRoutesCache = new Set<string>();

// Helper to validate routes
function validateRoute(route: string): string {
  if (!route.startsWith('/')) {
    throw new Error(`Invalid route: ${route} - Must start with /`);
  }
  return route;
}

export const ROUTES = {
  // Static routes (main pages)
  static: [
    {
      route: '/',
      priority: 1.0,
      changeFrequency: RouteChangeFrequencies.WEEKLY,
      allowBots: true,
      allowCrawling: true,
    },
    {
      route: '/about',
      priority: 0.8,
      changeFrequency: RouteChangeFrequencies.MONTHLY,
      allowBots: true,
      allowCrawling: true,
    },
    {
      route: '/projects',
      priority: 0.9,
      changeFrequency: RouteChangeFrequencies.WEEKLY,
      allowBots: true,
      allowCrawling: true,
    },
    {
      route: '/writing',
      priority: 0.9,
      changeFrequency: RouteChangeFrequencies.DAILY,
      allowBots: true,
      allowCrawling: true,
    },
    {
      route: '/contact',
      priority: 0.7,
      changeFrequency: RouteChangeFrequencies.MONTHLY,
      allowBots: true,
      allowCrawling: true,
    },
  ] as const satisfies readonly RouteConfig[],

  // Resource routes (static resources)
  resources: [
    {
      route: '/resources',
      priority: 0.6,
      changeFrequency: RouteChangeFrequencies.MONTHLY,
      allowBots: true,
      allowCrawling: true,
    },
    {
      route: '/manifest.json',
      priority: 0.4,
      changeFrequency: RouteChangeFrequencies.MONTHLY,
      allowBots: true,
      allowCrawling: false,
    },
    {
      route: '/api/public/robots',
      priority: 0.4,
      changeFrequency: RouteChangeFrequencies.MONTHLY,
      allowBots: true,
      allowCrawling: true,
    },
    {
      route: '/api/public/sitemap',
      priority: 0.4,
      changeFrequency: RouteChangeFrequencies.MONTHLY,
      allowBots: true,
      allowCrawling: true,
    },
    {
      route: '/api/public/agents',
      priority: 0.4,
      changeFrequency: RouteChangeFrequencies.MONTHLY,
      allowBots: true,
      allowCrawling: true,
    },
    {
      route: '/rss.xml',
      priority: 0.5,
      changeFrequency: RouteChangeFrequencies.DAILY,
      allowBots: true,
      allowCrawling: true,
    },
  ] as const satisfies readonly RouteConfig[],

  // Helper functions with memoization
  getRouteConfig(route: string): RouteConfig | undefined {
    // Validate route
    try {
      validateRoute(route);
    } catch {
      return undefined;
    }

    // Check cache first
    const cached = routeConfigCache.get(route);
    if (cached) return cached;

    // Find route config
    const config = [...this.static, ...this.resources].find((r) => r.route === route);
    if (config) {
      routeConfigCache.set(route, config);
    }

    return config;
  },

  getAllowedBotRoutes(): readonly string[] {
    // Return cached result if available
    if (allowedBotRoutesCache.size > 0) {
      return Array.from(allowedBotRoutesCache);
    }

    // Calculate and cache allowed bot routes
    const routes = [...this.static, ...this.resources]
      .filter((r) => r.allowBots)
      .map((r) => r.route);

    routes.forEach((route) => allowedBotRoutesCache.add(route));
    return routes;
  },

  getAllowedCrawlingRoutes(): readonly string[] {
    // Return cached result if available
    if (allowedCrawlingRoutesCache.size > 0) {
      return Array.from(allowedCrawlingRoutesCache);
    }

    // Calculate and cache allowed crawling routes
    const routes = [...this.static, ...this.resources]
      .filter((r) => r.allowCrawling)
      .map((r) => r.route);

    routes.forEach((route) => allowedCrawlingRoutesCache.add(route));
    return routes;
  },

  // Additional helper methods
  isAllowedForBots(route: string): boolean {
    return this.getAllowedBotRoutes().includes(route);
  },

  isAllowedForCrawling(route: string): boolean {
    return this.getAllowedCrawlingRoutes().includes(route);
  },

  clearCache(): void {
    routeConfigCache.clear();
    allowedBotRoutesCache.clear();
    allowedCrawlingRoutesCache.clear();
  },
} as const;
