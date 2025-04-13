/**
 * Dynamic Robots.txt Generator
 *
 * This API route dynamically generates the robots.txt file with values from the site configuration.
 */

import { NextResponse } from 'next/server';
import { SITE_INFO, ROUTES } from '@/lib';
import { CACHE_CONFIG } from '@/lib/config/site.config';
import { BOT_CONFIG, SECURITY } from '@/lib/config/robots.config';
import { errorHandler } from '@/lib/errors/handler';
import { ApiError, ErrorCategory, ErrorSeverity } from '@/lib/errors/types';

// Force static generation with revalidation
export const dynamic = 'force-static';
export const revalidate = 3600; // 1 hour, value from CACHE_CONFIG.robots.revalidate

// Type for user agents matching robots.txt requirements
type UserAgentConfig = {
  userAgent: string | readonly string[];
  allow?: string | readonly string[];
  disallow?: string | readonly string[];
  crawlDelay?: number;
};

export async function GET() {
  try {
    const baseUrl = SITE_INFO.url;
    const allowedBotRoutes = ROUTES.getAllowedBotRoutes();
    const allowedCrawlingRoutes = ROUTES.getAllowedCrawlingRoutes();

    // Define bot-specific configurations with security considerations
    const botConfigs: UserAgentConfig[] = [
      // General bots - most restrictive
      {
        userAgent: BOT_CONFIG.general.userAgent,
        allow: allowedCrawlingRoutes,
        disallow: [...SECURITY.sensitivePathPatterns, ...SECURITY.commonDisallowPatterns],
        crawlDelay: BOT_CONFIG.general.crawlDelay,
      },

      // Google bot - more permissive for better indexing
      {
        userAgent: BOT_CONFIG.googlebot.userAgent,
        allow: allowedBotRoutes,
        disallow: Array.from(SECURITY.commonDisallowPatterns),
        crawlDelay: BOT_CONFIG.googlebot.crawlDelay,
      },

      // GPT bot - allow access to public API paths for AI training
      {
        userAgent: BOT_CONFIG.gptbot.userAgent,
        allow: allowedBotRoutes,
        disallow: [...SECURITY.commonDisallowPatterns, '/api/private/*', '/api/draft/*'],
        crawlDelay: BOT_CONFIG.gptbot.crawlDelay,
      },

      // Bing bot
      {
        userAgent: BOT_CONFIG.bingbot.userAgent,
        allow: allowedBotRoutes,
        disallow: Array.from(SECURITY.commonDisallowPatterns),
        crawlDelay: BOT_CONFIG.bingbot.crawlDelay,
      },

      // Other search engine bots - more restrictive
      {
        userAgent: Array.from(BOT_CONFIG.otherBots.userAgent),
        allow: allowedCrawlingRoutes,
        disallow: [...SECURITY.commonDisallowPatterns, '/api/*'],
        crawlDelay: BOT_CONFIG.otherBots.crawlDelay,
      },

      // Security scanners and potentially harmful bots - highly restricted
      {
        userAgent: Array.from(BOT_CONFIG.securityScanners.userAgent),
        disallow: ['/', '/api/*'],
        crawlDelay: BOT_CONFIG.securityScanners.crawlDelay,
      },
    ];

    // Generate robots.txt content
    let robotsTxt = '';

    // Add each bot configuration
    for (const config of botConfigs) {
      // Add user agent(s)
      if (Array.isArray(config.userAgent)) {
        for (const agent of config.userAgent) {
          robotsTxt += `User-agent: ${agent}\n`;
        }
      } else {
        robotsTxt += `User-agent: ${config.userAgent}\n`;
      }

      // Add crawl delay if specified
      if (config.crawlDelay !== undefined) {
        robotsTxt += `Crawl-delay: ${config.crawlDelay}\n`;
      }

      // Add allow rules
      if (config.allow) {
        const allows = Array.isArray(config.allow) ? config.allow : [config.allow];
        for (const allow of allows) {
          robotsTxt += `Allow: ${allow}\n`;
        }
      }

      // Add disallow rules
      if (config.disallow) {
        const disallows = Array.isArray(config.disallow) ? config.disallow : [config.disallow];
        for (const disallow of disallows) {
          robotsTxt += `Disallow: ${disallow}\n`;
        }
      }

      // Add a blank line between configurations
      robotsTxt += '\n';
    }

    // Add sitemap URL if it's in the allowed routes
    const sitemapRoute = ROUTES.getRouteConfig('/api/public/sitemap');
    if (sitemapRoute?.allowBots) {
      robotsTxt += `Sitemap: ${baseUrl}/api/public/sitemap\n`;
    }

    // Return the text response with appropriate headers
    return new NextResponse(robotsTxt, {
      headers: {
        'Content-Type': 'text/plain',
        ...CACHE_CONFIG.robots.headers,
      },
    });
  } catch (error) {
    // Handle specific error types
    if (error instanceof ApiError) {
      errorHandler.report(error, {
        source: 'robots.route',
        category: ErrorCategory.API,
        severity: ErrorSeverity.ERROR,
      });

      return new NextResponse(`# Error: ${error.message}`, {
        status: error.statusCode,
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    // Handle unknown errors
    const appError = new ApiError('Failed to generate robots.txt', 500, {
      source: 'robots.route',
      severity: ErrorSeverity.ERROR,
      metadata: {
        originalError: error instanceof Error ? error.message : 'Unknown error',
      },
    });

    errorHandler.report(appError);

    return new NextResponse('# Error generating robots.txt\n# Please try again later', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}
