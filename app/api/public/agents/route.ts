/**
 * Dynamic Agents.json Generator
 *
 * This API route dynamically generates the agents.json file with values from the site configuration.
 * It uses a more efficient approach by defining the JSON structure directly in code.
 */

import { NextResponse } from 'next/server';
import { SITE_INFO, ALLOWED_ORIGINS } from '@/lib';

// Force static generation with revalidation
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

// Pre-process the agents data at build/request time
const getAgentsData = () => {
  // Base agents data structure
  const agentsData = {
    apiVersion: '1.1',
    baseUrl: SITE_INFO.url,
    agentCapabilities: {
      supportedActions: [
        'read',
        'navigate',
        'interact',
        'search',
        'prefetch',
        'report',
        'analyze',
        'automate',
        'delegate',
      ],
      rateLimit: {
        requestsPerMinute: 120,
        cooldownPeriod: 60,
        burstLimit: 30,
        perEndpoint: {
          auth: {
            requestsPerMinute: 20,
            cooldownPeriod: 300,
          },
          search: {
            requestsPerMinute: 60,
            cooldownPeriod: 120,
          },
          api: {
            requestsPerMinute: 100,
            cooldownPeriod: 60,
          },
        },
      },
      errorHandling: {
        retryStrategy: {
          maxRetries: 3,
          backoffMultiplier: 1.5,
          initialDelayMs: 1000,
        },
      },
    },
    globalInteractions: {
      keyboardShortcuts: {
        shortcuts: {
          writing: {
            key: 'w',
            modifiers: ['meta', 'ctrl'],
            target: '/writing',
            description: 'Navigate to writing section',
          },
          projects: {
            key: 'p',
            modifiers: ['meta', 'shift'],
            target: '/projects',
            description: 'Navigate to projects section',
          },
          audio: {
            key: 'a',
            modifiers: ['meta', 'shift'],
            target: '/audio',
            description: 'Navigate to audio section',
          },
          bio: {
            key: 'b',
            modifiers: ['meta', 'shift'],
            target: '/bio',
            description: 'Navigate to bio section',
          },
          home: {
            key: 'z',
            modifiers: ['meta', 'shift'],
            target: '/',
            description: 'Navigate to home page',
          },
        },
      },
    },
    pages: {
      '/': {
        sections: ['hero', 'mainNavigation', 'featuredContent'],
        caching: {
          strategy: 'stale-while-revalidate',
          maxAge: 3600,
        },
      },
      '/writing': {
        sections: ['articleList', 'filters'],
        itemsPerPage: 10,
      },
      '/projects': {
        sections: ['projectGrid'],
      },
      '/bio': {
        sections: ['about', 'experience', 'skills'],
      },
      '/audio': {
        sections: ['audioPlayer', 'playlist'],
      },
    },
    metadata: {
      author: SITE_INFO.authorName,
      description: SITE_INFO.description,
      primaryLanguage: SITE_INFO.defaultLanguage,
      lastUpdated: new Date().toISOString(),
      version: '1.1.0',
    },
    security: {
      cors: {
        enabled: true,
        methods: ['GET', 'HEAD', 'OPTIONS'],
        origins: ALLOWED_ORIGINS,
      },
      contentSecurity: {
        enabled: true,
      },
    },
  };

  return agentsData;
};

export async function GET() {
  try {
    const agentsData = getAgentsData();

    // Return the JSON response with appropriate headers
    return NextResponse.json(agentsData, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating agents.json:', error);
    return NextResponse.json({ error: 'Failed to generate agents.json' }, { status: 500 });
  }
}
