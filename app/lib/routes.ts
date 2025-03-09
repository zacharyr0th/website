/**
 * Routes Configuration
 *
 * Contains route definitions for sitemap generation
 */

// Define types for route configurations
export type RouteConfig = {
  route: string;
  priority: number;
  changeFrequency?: string;
  isSecure?: boolean;
};

export const ROUTES = {
  // Static routes (main pages)
  static: [
    {
      route: '/',
      priority: 1.0,
      changeFrequency: 'weekly',
    },
    {
      route: '/about',
      priority: 0.8,
      changeFrequency: 'monthly',
    },
    {
      route: '/projects',
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    {
      route: '/writing',
      priority: 0.9,
      changeFrequency: 'daily',
    },
    {
      route: '/contact',
      priority: 0.7,
      changeFrequency: 'monthly',
    },
  ] as RouteConfig[],

  // Resource routes (static resources)
  resources: [
    {
      route: '/resources',
      priority: 0.6,
      changeFrequency: 'monthly',
    },
  ] as RouteConfig[],
};
