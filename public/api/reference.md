# API Reference

This document provides a comprehensive reference for all public APIs and components available in the website.

## Public API Endpoints

### Agents API

```typescript
GET / api / public / agents;
```

Returns metadata about the website, including endpoints and social information.

**Response Type:**

```typescript
interface AgentsResponse {
  name: string;
  description: string;
  url: string;
  type: 'personal';
  endpoints: {
    robots: string;
    sitemap: string;
    rss: string;
  };
  social: {
    twitter: string;
  };
  organization: {
    name: string;
    url: string;
    logo: string;
  };
}
```

### Robots API

```typescript
GET / api / public / robots;
```

Provides information about site crawling and indexing policies.

**Response Type:**

```typescript
interface RobotsResponse {
  routes: Array<{
    route: string;
    priority: number;
    changeFrequency: string;
    isSecure: boolean;
  }>;
  disallowedRoutes: string[];
  sitemapUrl: string;
}
```

### Sitemap API

```typescript
GET / api / public / sitemap;
```

Returns complete site structure and page metadata.

**Response Type:**

```typescript
interface SitemapResponse {
  urls: Array<{
    url: string;
    lastModified: string;
    changeFrequency: string;
    priority: number;
  }>;
}
```

## React Components

### Layout Components

- `Layout`: Main layout wrapper with navigation and footer
- `Header`: Site header with navigation menu
- `Footer`: Site footer with links and social media
- `Container`: Responsive container component

### UI Components

- `Button`: Customizable button component
- `Card`: Content card with various styles
- `Typography`: Text components with consistent styling
- `Icon`: SVG icon component with various icons

### Form Components

- `Input`: Text input component
- `TextArea`: Multi-line text input
- `Select`: Dropdown select component
- `Checkbox`: Checkbox input component

## React Hooks

### Data Hooks

- `useApi`: Hook for making API requests
- `useCache`: Data caching hook
- `useDebounce`: Debounced value hook

### UI Hooks

- `useMediaQuery`: Responsive design hook
- `useTheme`: Theme management hook
- `useScrollPosition`: Scroll tracking hook

## TypeScript Types

### API Types

- `ApiResponse`: Base type for API responses
- `ApiError`: Error response type
- `ApiEndpoint`: API endpoint configuration

### Component Types

- `ComponentProps`: Base props interface
- `StyleProps`: Styling prop types
- `ThemeType`: Theme configuration type

## Error Handling

All API endpoints follow a consistent error format:

```typescript
interface ApiError {
  error: string;
  statusCode: number;
  details?: unknown;
}
```

Common status codes:

- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

## Caching

All public API endpoints implement the following caching strategy:

- `Cache-Control: public, max-age=3600, s-maxage=3600`
- Static generation with revalidation
- Stale-while-revalidate pattern
