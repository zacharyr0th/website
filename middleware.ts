import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Create a new ratelimiter that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
})

export async function middleware(request: NextRequest) {
  // Only apply middleware to /api/articles
  if (request.nextUrl.pathname.startsWith('/api/articles')) {
    // Get IP address for rate limiting
    const ip = request.ip ?? '127.0.0.1'
    
    // Skip origin check in development
    if (process.env.NODE_ENV !== 'development') {
      // Check if request is from same origin
      const origin = request.headers.get('origin')
      const host = request.headers.get('host')
      
      const isFromSameOrigin = origin 
        ? new URL(origin).host === host
        : false

      if (!isFromSameOrigin) {
        return new NextResponse(
          JSON.stringify({ error: 'Unauthorized' }), 
          { 
            status: 403,
            headers: { 'content-type': 'application/json' },
          }
        )
      }
    }

    // Rate limiting check
    const { success, limit, reset, remaining } = await ratelimit.limit(
      `ratelimit_${ip}`
    )
    
    if (!success) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests' }), 
        { 
          status: 429,
          headers: {
            'content-type': 'application/json',
            'x-ratelimit-limit': limit.toString(),
            'x-ratelimit-remaining': remaining.toString(),
            'x-ratelimit-reset': reset.toString(),
          },
        }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/articles/:path*',
} 