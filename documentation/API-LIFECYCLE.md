# API Request Lifecycle

This document outlines the complete lifecycle of API requests in our application, explaining how different components work together to process requests and generate responses.

This layered approach to API request handling ensures:

1. **Consistency** - All API responses follow the same format
2. **Security** - Every request passes through security middleware
3. **Maintainability** - Clear separation of concerns between components
4. **Error Handling** - Standardized error responses across all endpoints

## Overview

Our API architecture follows a layered approach with clear separation of concerns:

1. **Middleware Layer** - Handles security, CORS, and request validation
2. **Route Handler Layer** - Processes specific API endpoints
3. **Utility Layer** - Provides standardized response formatting and validation

## Key Components

### 1. Middleware (`app/middleware.ts`)

The middleware acts as the first line of defense and runs on every request to the application:

- Intercepts all incoming requests
- Validates request origins against allowed origins
- Applies appropriate security headers based on route type
- Handles CORS for API routes
- Provides special handling for audio routes
- Redirects HTTP to HTTPS in production

```typescript
// Example from middleware.ts
export async function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');
  
  // Add appropriate headers
  const response = NextResponse.next();
  const headers = isApiRoute ? getCorsHeaders(origin) : getSecurityHeaders();
  Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
  return response;
}
```

### 2. API Utilities (`app/lib/api.ts`)

The API module provides standardized utilities for route handlers:

- Defines consistent API response formats
- Provides helper functions for response creation
- Contains validation schemas for different request types
- Configures API routes and their properties

```typescript
// Example from api.ts
export function createApiResponse<T>(
  data: T,
  options: {
    status?: number;
    headers?: Record<string, string>;
  } = {}
): NextResponse<ApiResponse<T>> {
  const { status = 200, headers = {} } = options;
  
  return NextResponse.json(
    { data },
    {
      status,
      headers: { ...getContentHeaders(), ...headers },
    }
  );
}
```

### 3. Route Handlers (`app/api/**/route.ts`)

Route handlers implement specific API endpoints:

- Process incoming requests
- Validate request parameters
- Perform business logic
- Use API utilities to format responses

```typescript
// Example from a route handler
export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
): Promise<Response> {
  try {
    // Process request
    // ...
    
    return api.createApiResponse(
      {
        content: processedContent.toString(),
        slug,
      },
      {
        headers: {
          ...security.getStaticHeaders(3600),
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return api.createApiErrorResponse('Failed to load article', {
      status: 500,
      details: process.env.NODE_ENV === 'development' ? err : undefined,
    });
  }
}
```

### 4. Security & Cache Utilities (`app/lib/security-cache.ts`)

Provides shared security and caching functionality:

- Security headers configuration
- CORS headers configuration
- Origin validation
- Cache control settings

## Complete Request Lifecycle

1. **Request Arrival**
   - Client sends request to the server
   - Next.js routes the request to the appropriate handler

2. **Middleware Processing**
   - `middleware.ts` intercepts the request
   - Validates origin if present
   - Applies appropriate security headers
   - Handles CORS for API routes
   - If validation fails, returns error response
   - If validation passes, forwards request to route handler

3. **Route Handler Processing**
   - Specific route handler receives the request
   - Validates request parameters using schemas from `api.ts`
   - Performs business logic (data fetching, processing, etc.)
   - Prepares response data

4. **Response Formatting**
   - Route handler uses `createApiResponse` or `createApiErrorResponse` from `api.ts`
   - Response is formatted with consistent structure
   - Appropriate headers are applied
   - Status code is set

5. **Response Delivery**
   - Formatted response is sent back to the client
   - Client processes the standardized response format

## API Response Formats

### Success Response

```json
{
  "data": {
    // Response data specific to the endpoint
  }
}
```

### Error Response

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      // Optional additional error details
    }
  }
}
```

## Security Considerations

- All API routes are protected by origin validation
- Public API routes are explicitly defined in `API_ROUTES.publicPaths`
- All responses include appropriate security headers
- Error responses don't leak sensitive information in production
