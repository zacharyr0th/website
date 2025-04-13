/**
 * Social Media Configuration
 *
 * Optimized social media integration with:
 * - Strong type safety
 * - URL validation
 * - Memoized sharing URLs
 * - Performance optimizations
 */

import type { IconType } from 'react-icons';
import {
  FaLinkedin,
  FaXTwitter,
  FaGithub,
  FaEnvelope,
  FaMedium,
  FaYoutube,
  FaDiscord,
  FaTelegram,
  FaReddit,
} from 'react-icons/fa6';

// Type definitions with const assertions
export const SocialPlatforms = {
  TWITTER: 'twitter',
  GITHUB: 'github',
  LINKEDIN: 'linkedin',
  EMAIL: 'email',
  MEDIUM: 'medium',
  YOUTUBE: 'youtube',
  DISCORD: 'discord',
  TELEGRAM: 'telegram',
  REDDIT: 'reddit',
} as const;

export type SocialPlatform = (typeof SocialPlatforms)[keyof typeof SocialPlatforms];

/**
 * Social media link structure with strong typing
 */
export interface SocialLink {
  readonly url: string;
  readonly label: string;
  readonly icon: IconType;
  readonly username?: string;
  readonly platform: SocialPlatform;
  readonly active: boolean;
  readonly priority?: number;
  readonly shareEnabled?: boolean;
}

// URL validation
function validateSocialUrl(url: string, platform: string): string {
  try {
    const parsed = new URL(url);
    if (!parsed.protocol.startsWith('http') && !parsed.protocol.startsWith('mailto')) {
      throw new Error(`Invalid protocol for ${platform} URL`);
    }
    return url;
  } catch (error) {
    throw new Error(`Invalid ${platform} URL: ${url}`);
  }
}

// Memoization for social links
const activeSocialLinksCache = new Map<string, SocialLink[]>();
const sharingPlatformsCache = new Map<string, SocialLink[]>();
const socialShareUrlCache = new Map<string, string>();

/**
 * Social media links configuration with validation
 */
export const SOCIAL_LINKS = {
  // Primary Social Media Platforms
  [SocialPlatforms.TWITTER]: {
    url: validateSocialUrl('https://twitter.com/zacharyr0th', 'Twitter'),
    label: 'Twitter',
    icon: FaXTwitter,
    username: '@zacharyr0th',
    platform: SocialPlatforms.TWITTER,
    active: true,
    priority: 100,
    shareEnabled: true,
  },

  [SocialPlatforms.GITHUB]: {
    url: validateSocialUrl('https://github.com/zacharyr0th', 'GitHub'),
    label: 'GitHub',
    icon: FaGithub,
    username: 'zacharyr0th',
    platform: SocialPlatforms.GITHUB,
    active: true,
    priority: 90,
    shareEnabled: false,
  },

  [SocialPlatforms.LINKEDIN]: {
    url: validateSocialUrl('https://linkedin.com/in/zacharyr0th', 'LinkedIn'),
    label: 'LinkedIn',
    icon: FaLinkedin,
    username: 'zacharyr0th',
    platform: SocialPlatforms.LINKEDIN,
    active: true,
    priority: 80,
    shareEnabled: true,
  },

  [SocialPlatforms.EMAIL]: {
    url: validateSocialUrl('mailto:contact@zacharyroth.com', 'Email'),
    label: 'Email',
    icon: FaEnvelope,
    username: 'contact@zacharyroth.com',
    platform: SocialPlatforms.EMAIL,
    active: true,
    priority: 70,
    shareEnabled: true,
  },

  // Secondary Social Media Platforms
  [SocialPlatforms.MEDIUM]: {
    url: validateSocialUrl('https://medium.com/@zacharyr0th', 'Medium'),
    label: 'Medium',
    icon: FaMedium,
    username: '@zacharyr0th',
    platform: SocialPlatforms.MEDIUM,
    active: false,
    priority: 60,
    shareEnabled: false,
  },

  [SocialPlatforms.YOUTUBE]: {
    url: validateSocialUrl('https://youtube.com/@zacharyr0th', 'YouTube'),
    label: 'YouTube',
    icon: FaYoutube,
    username: '@zacharyr0th',
    platform: SocialPlatforms.YOUTUBE,
    active: false,
    priority: 50,
    shareEnabled: false,
  },

  [SocialPlatforms.DISCORD]: {
    url: validateSocialUrl('https://discord.gg/example', 'Discord'),
    label: 'Discord',
    icon: FaDiscord,
    username: 'zacharyr0th',
    platform: SocialPlatforms.DISCORD,
    active: false,
    priority: 40,
    shareEnabled: false,
  },

  [SocialPlatforms.TELEGRAM]: {
    url: validateSocialUrl('https://t.me/zacharyr0th', 'Telegram'),
    label: 'Telegram',
    icon: FaTelegram,
    username: '@zacharyr0th',
    platform: SocialPlatforms.TELEGRAM,
    active: false,
    priority: 30,
    shareEnabled: true,
  },

  [SocialPlatforms.REDDIT]: {
    url: validateSocialUrl('https://reddit.com/user/zacharyr0th', 'Reddit'),
    label: 'Reddit',
    icon: FaReddit,
    username: 'zacharyr0th',
    platform: SocialPlatforms.REDDIT,
    active: false,
    priority: 20,
    shareEnabled: true,
  },
} as const;

// Export primary social platforms
export const PRIMARY_SOCIAL_PLATFORMS: readonly SocialPlatform[] = [
  SocialPlatforms.TWITTER,
  SocialPlatforms.GITHUB,
  SocialPlatforms.LINKEDIN,
] as const;

/**
 * Get active social links with memoization
 */
export function getActiveSocialLinks(platforms?: readonly SocialPlatform[]): readonly SocialLink[] {
  const cacheKey = platforms?.join(',') || 'all';
  const cached = activeSocialLinksCache.get(cacheKey);
  if (cached) return cached;

  const links = platforms
    ? platforms
        .filter((platform) => SOCIAL_LINKS[platform].active)
        .map((platform) => SOCIAL_LINKS[platform])
    : Object.values(SOCIAL_LINKS).filter((link) => link.active);

  const sortedLinks = links.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  activeSocialLinksCache.set(cacheKey, sortedLinks);
  return sortedLinks;
}

/**
 * Get primary social links
 */
export function getPrimarySocialLinks(): readonly SocialLink[] {
  return getActiveSocialLinks(PRIMARY_SOCIAL_PLATFORMS);
}

/**
 * Get sharing-enabled platforms with memoization
 */
export function getSharingPlatforms(): readonly SocialLink[] {
  const cached = sharingPlatformsCache.get('sharing');
  if (cached) return cached;

  const platforms = Object.values(SOCIAL_LINKS)
    .filter((link) => link.shareEnabled)
    .sort((a, b) => (b.priority || 0) - (a.priority || 0));

  sharingPlatformsCache.set('sharing', platforms);
  return platforms;
}

/**
 * Format social username with platform-specific rules
 */
export function formatSocialUsername(platform: SocialPlatform): string {
  const link = SOCIAL_LINKS[platform];
  if (!link.username) return '';

  switch (platform) {
    case SocialPlatforms.TWITTER:
      return link.username.startsWith('@') ? link.username : `@${link.username}`;
    default:
      return link.username;
  }
}

/**
 * Clear all caches
 */
export function clearSocialCaches(): void {
  activeSocialLinksCache.clear();
  sharingPlatformsCache.clear();
  socialShareUrlCache.clear();
}
