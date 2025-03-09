# Dynamic Agents, Robots, and Sitemap Implementation

This document describes the implementation of dynamically generated agents.json, robots.txt, and sitemap.xml files for the website.

## Overview

Instead of using static files or Next.js's built-in app directory files (robots.ts, sitemap.ts), we've implemented these as dynamic API routes.

This approach offers several advantages:

1. **Dynamic Content Generation**: Content is generated at request time, ensuring it's always up-to-date
2. **Centralized Logic**: All generation logic is in API routes, making it easier to maintain
3. **Proper Caching**: Each route has appropriate cache headers for optimal performance
4. **Standard URLs**: Standard URLs like /robots.txt still work through redirects

## Implementation Details

### 1. API Routes

All three files are implemented as API routes in the `app/api/public/` directory:

#### Agents API (`/api/public/agents`)

- **File**: `app/api/public/agents/route.ts`
- **Purpose**: Generates a JSON file that describes the website's capabilities for AI agents
- **Content**: Includes information about supported actions, rate limits, navigation, and security
- **Data Source**: Uses values from `SITE_INFO` and `ALLOWED_ORIGINS`

```typescript
// Example usage
const agentsData = {
  apiVersion: '1.1',
  baseUrl: SITE_INFO.url,
  metadata: {
    author: SITE_INFO.authorName,
    description: SITE_INFO.description,
    // ...
  },
  // ...
};
```

#### Robots API (`/api/public/robots`)

- **File**: `app/api/public/robots/route.ts`
- **Purpose**: Generates a robots.txt file to control crawler behavior
- **Content**: Includes user-agent specific rules, allow/disallow paths, and crawl delays
- **Data Source**: Uses values from `SITE_INFO`, `ROUTES`, `BOT_CONFIG`, and `SECURITY`

```typescript
// Example of generated content
User-agent: *
Crawl-delay: 1
Allow: /
Allow: /writing/
Disallow: /api/private/*

User-agent: Googlebot
Crawl-delay: 0.5
Allow: /
Allow: /writing/
// ...
```

#### Sitemap API (`/api/public/sitemap`)

- **File**: `app/api/public/sitemap/route.ts`
- **Purpose**: Generates a sitemap.xml file to help search engines discover pages
- **Content**: Includes URLs, last modified dates, change frequencies, and priorities
- **Data Source**: Uses values from `SITE_INFO`, `ROUTES`, and dynamic data from articles and projects

```xml
<!-- Example of generated content -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://zacharyroth.com/</loc>
    <lastmod>2023-03-08T00:00:00.000Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- ... -->
</urlset>
```

### 2. Configuration

#### Redirects

Redirects are configured in `next.config.js` to ensure standard URLs work:

```javascript
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
}
```

#### Caching

Cache headers are configured in `next.config.js` to ensure optimal performance:

```javascript
{
  source: '/api/public/agents',
  headers: [
    {
      key: 'Cache-Control',
      value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  ],
},
// Similar configurations for robots and sitemap
```

#### Routes Configuration

Routes are configured in `app/lib/metadata.ts` to ensure consistency:

```typescript
export const ROUTES = {
  // ...
  resources: [
    // ...
    { route: '/api/public/robots', priority: 0.4, changeFrequency: 'monthly', isSecure: false },
    { route: '/api/public/sitemap', priority: 0.4, changeFrequency: 'monthly', isSecure: false },
    { route: '/api/public/agents', priority: 0.4, changeFrequency: 'monthly', isSecure: false },
    // ...
  ],

  // Public API paths that are allowed for bots
  publicApiPaths: [
    // ...
    '/api/public/agents',
    '/api/public/robots',
    '/api/public/sitemap',
  ],
  // ...
};
```

## Technical Details

### Static Generation with Revalidation

All three API routes use static generation with revalidation to ensure optimal performance:

```typescript
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour
```

### Content Types

Each API route returns the appropriate content type:

- Agents API: `application/json`
- Robots API: `text/plain`
- Sitemap API: `application/xml`

### Error Handling

All three API routes include error handling to ensure they always return a valid response:

```typescript
try {
  // Generate content
} catch (error) {
  console.error('Error generating content:', error);
  return new NextResponse('Error content', {
    status: 500,
    headers: {
      'Content-Type': 'appropriate/type',
    },
  });
}
```

## Testing and Verification

To verify that the endpoints are working correctly, you can use curl commands to test both the direct API routes and the redirected standard URLs:

### Testing Standard URLs

```bash
# Test robots.txt
curl -i https://yourdomain.com/robots.txt

# Test sitemap.xml
curl -i https://yourdomain.com/sitemap.xml

# Test agents.json
curl -i https://yourdomain.com/agents.json
```

### Testing API Routes Directly

```bash
# Test robots API
curl -i https://yourdomain.com/api/public/robots

# Test sitemap API
curl -i https://yourdomain.com/api/public/sitemap

# Test agents API
curl -i https://yourdomain.com/api/public/agents
```

### What to Look For

When testing these endpoints, verify the following:

1. **Status Code**: Should be 200 OK
2. **Content Type Headers**:
   - robots.txt: `Content-Type: text/plain`
   - sitemap.xml: `Content-Type: application/xml`
   - agents.json: `Content-Type: application/json`
3. **Cache Headers**: Should include `Cache-Control` with appropriate values
4. **Content Validation**:
   - robots.txt: Should contain User-agent directives, Allow/Disallow rules
   - sitemap.xml: Should be valid XML with `<urlset>` as root element
   - agents.json: Should be valid JSON with expected structure

### Automated Testing

For more thorough testing, consider implementing automated tests that:

1. Validate the structure and content of each response
2. Verify that redirects are working correctly
3. Check that cache headers are set properly
4. Ensure content is updated when underlying data changes

Example test script (using Jest):

```typescript
describe('SEO Endpoints', () => {
  test('robots.txt returns correct content and headers', async () => {
    const response = await fetch('https://yourdomain.com/robots.txt');
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('text/plain');

    const text = await response.text();
    expect(text).toContain('User-agent:');
    expect(text).toContain('Sitemap:');
  });

  // Similar tests for sitemap.xml and agents.json
});
```
