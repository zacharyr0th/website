/**
 * Dynamic Robots.txt Generator
 * 
 * This API route dynamically generates the robots.txt file with values from the site configuration.
 * It uses the same logic as the app/robots.ts file but serves it as a text response.
 */

import { NextResponse } from 'next/server';
import { 
  SITE_INFO, 
  ROUTES, 
  BOT_CONFIG,
  SECURITY
} from '@/lib';

// Force static generation with revalidation
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

// Type for user agents matching robots.txt requirements
type UserAgentConfig = {
  userAgent: string | string[];
  allow?: string | string[];
  disallow?: string | string[];
  crawlDelay?: number;
};

export async function GET() {
  try {
    const baseUrl = SITE_INFO.url;
    const agentsJsonPath = '/api/public/agents';

    // Define bot-specific configurations with security considerations
    const botConfigs: UserAgentConfig[] = [
      // General bots
      {
        userAgent: BOT_CONFIG.general.userAgent,
        allow: [...ROUTES.allowedPaths, ...ROUTES.assetPatterns],
        disallow: [...SECURITY.sensitivePathPatterns, ...SECURITY.commonDisallowPatterns],
        crawlDelay: BOT_CONFIG.general.crawlDelay,
      },
      
      // Google bot - more permissive for better indexing
      {
        userAgent: BOT_CONFIG.googlebot.userAgent,
        allow: [...ROUTES.allowedPaths, '/manifest.json'],
        disallow: [...SECURITY.commonDisallowPatterns],
        crawlDelay: BOT_CONFIG.googlebot.crawlDelay,
      },
      
      // GPT bot - allow access to public API paths for AI training
      {
        userAgent: BOT_CONFIG.gptbot.userAgent,
        allow: [...ROUTES.allowedPaths, agentsJsonPath, ...ROUTES.publicApiPaths],
        disallow: [...SECURITY.commonDisallowPatterns, '/api/private/*', '/api/draft/*'],
        crawlDelay: BOT_CONFIG.gptbot.crawlDelay,
      },
      
      // Bing bot
      {
        userAgent: BOT_CONFIG.bingbot.userAgent,
        allow: [...ROUTES.allowedPaths, agentsJsonPath],
        disallow: [...SECURITY.commonDisallowPatterns],
        crawlDelay: BOT_CONFIG.bingbot.crawlDelay,
      },
      
      // Other search engine bots - more restrictive
      {
        userAgent: Array.isArray(BOT_CONFIG.otherBots.userAgent) 
          ? Array.from(BOT_CONFIG.otherBots.userAgent) 
          : BOT_CONFIG.otherBots.userAgent,
        allow: [...ROUTES.allowedPaths],
        disallow: [...SECURITY.commonDisallowPatterns, agentsJsonPath, ...ROUTES.publicApiPaths],
        crawlDelay: BOT_CONFIG.otherBots.crawlDelay,
      },
      
      // Security scanners and potentially harmful bots - highly restricted
      {
        userAgent: Array.isArray(BOT_CONFIG.securityScanners.userAgent) 
          ? Array.from(BOT_CONFIG.securityScanners.userAgent) 
          : BOT_CONFIG.securityScanners.userAgent,
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

    // Add sitemap URL
    robotsTxt += `Sitemap: ${baseUrl}/api/public/sitemap\n`;

    // Return the text response with appropriate headers
    return new NextResponse(robotsTxt, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating robots.txt:', error);
    return new NextResponse('# Error generating robots.txt', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
} 