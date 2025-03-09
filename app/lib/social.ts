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

/**
 * Social media link structure
 *
 * Defines the structure for social media links used throughout the site.
 * Each platform has a consistent structure for easy access and rendering.
 */
export interface SocialLink {
  readonly url: string;
  readonly label: string;
  readonly icon: IconType;
  readonly username?: string;
  readonly platform: string;
  readonly active: boolean;
  readonly priority?: number; // Higher number = higher priority for display
  readonly shareEnabled?: boolean; // Whether this platform should be available for content sharing
}

/**
 * Social media links configuration
 *
 * Central configuration for all social media platforms.
 * Used for profile links, sharing buttons, and SEO metadata.
 */
export const SOCIAL_LINKS = {
  // Primary Social Media Platforms
  twitter: {
    url: 'https://twitter.com/zacharyr0th',
    label: 'Twitter',
    icon: FaXTwitter,
    username: '@zacharyr0th',
    platform: 'X (Twitter)',
    active: true,
    priority: 100,
    shareEnabled: true,
  },
  github: {
    url: 'https://github.com/zacharyr0th',
    label: 'GitHub',
    icon: FaGithub,
    username: 'zacharyr0th',
    platform: 'GitHub',
    active: true,
    priority: 90,
    shareEnabled: false,
  },
  linkedin: {
    url: 'https://linkedin.com/in/zacharyr0th',
    label: 'LinkedIn',
    icon: FaLinkedin,
    username: 'zacharyr0th',
    platform: 'LinkedIn',
    active: true,
    priority: 80,
    shareEnabled: true,
  },
  email: {
    url: 'mailto:contact@zacharyroth.com',
    label: 'Email',
    icon: FaEnvelope,
    username: 'contact@zacharyroth.com',
    platform: 'Email',
    active: true,
    priority: 70,
    shareEnabled: true,
  },

  // Secondary Social Media Platforms
  medium: {
    url: 'https://medium.com/@zacharyr0th',
    label: 'Medium',
    icon: FaMedium,
    username: '@zacharyr0th',
    platform: 'Medium',
    active: false,
    priority: 60,
    shareEnabled: false,
  },
  youtube: {
    url: 'https://youtube.com/@zacharyr0th',
    label: 'YouTube',
    icon: FaYoutube,
    username: '@zacharyr0th',
    platform: 'YouTube',
    active: false,
    priority: 50,
    shareEnabled: false,
  },
  discord: {
    url: 'https://discord.gg/example',
    label: 'Discord',
    icon: FaDiscord,
    username: 'zacharyr0th',
    platform: 'Discord',
    active: false,
    priority: 40,
    shareEnabled: false,
  },
  telegram: {
    url: 'https://t.me/zacharyr0th',
    label: 'Telegram',
    icon: FaTelegram,
    username: '@zacharyr0th',
    platform: 'Telegram',
    active: false,
    priority: 30,
    shareEnabled: true,
  },
  reddit: {
    url: 'https://reddit.com/user/zacharyr0th',
    label: 'Reddit',
    icon: FaReddit,
    username: 'zacharyr0th',
    platform: 'Reddit',
    active: false,
    priority: 20,
    shareEnabled: true,
  },
} as const;

/**
 * Type representing valid social platform keys
 */
export type SocialPlatform = keyof typeof SOCIAL_LINKS;

// Export primary social platforms to avoid circular dependency
export const PRIMARY_SOCIAL_PLATFORMS: SocialPlatform[] = ['twitter', 'github', 'linkedin'];

/**
 * Get active social links sorted by priority
 */
export function getActiveSocialLinks(platforms?: SocialPlatform[]): SocialLink[] {
  // If no platforms are specified, use all platforms
  if (!platforms) {
    return Object.values(SOCIAL_LINKS)
      .filter((link) => link.active)
      .sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }

  // If platforms are specified, filter by them
  return platforms
    .filter((platform) => SOCIAL_LINKS[platform].active)
    .map((platform) => SOCIAL_LINKS[platform])
    .sort((a, b) => (b.priority || 0) - (a.priority || 0));
}

/**
 * Get primary social links as defined in site configuration
 *
 * @returns Array of primary social links that are active
 */
export function getPrimarySocialLinks(): SocialLink[] {
  return getActiveSocialLinks(PRIMARY_SOCIAL_PLATFORMS);
}

/**
 * Get social links that are enabled for content sharing
 */
export function getSharingPlatforms(): SocialLink[] {
  return Object.values(SOCIAL_LINKS)
    .filter((link) => link.shareEnabled)
    .sort((a, b) => (b.priority || 0) - (a.priority || 0));
}

/**
 * Format social username for display
 *
 * @param platform - The social platform
 * @returns Formatted username with appropriate prefix
 */
export function formatSocialUsername(platform: SocialPlatform): string {
  const link = SOCIAL_LINKS[platform];

  if (!link.username) {
    return '';
  }

  switch (platform) {
    case 'twitter':
      return link.username.startsWith('@') ? link.username : `@${link.username}`;
    case 'github':
    case 'linkedin':
    case 'email':
    default:
      return link.username;
  }
}

/**
 * Supported social sharing platforms
 */
export type SharingPlatform =
  | SocialPlatform
  | 'facebook'
  | 'pinterest'
  | 'reddit'
  | 'whatsapp'
  | 'telegram'
  | 'hackernews'
  | 'mastodon'
  | 'pocket'
  | 'tumblr'
  | 'discord'
  | 'slack'
  | 'farcaster';

/**
 * Options for social sharing
 */
export interface SocialShareOptions {
  /** URL to share */
  url: string;
  /** Text content to share (title, description, etc.) */
  text?: string;
  /** URL of an image to share (for platforms that support it) */
  imageUrl?: string;
  /** Tags/hashtags to include (for platforms that support it) */
  tags?: string[];
  /** Mastodon instance URL (required for Mastodon sharing) */
  mastodonInstance?: string;
  /** Via attribution (for Twitter) */
  via?: string;
  /** Frame URL for Farcaster (optional, defaults to url) */
  frameUrl?: string;
}

/**
 * Generate a social sharing URL for various platforms
 *
 * @param platform - Social platform to generate sharing URL for
 * @param options - Sharing options (url, text, image, etc.)
 * @returns Platform-specific sharing URL
 */
export function getSocialShareUrl(
  platform: SharingPlatform,
  options: SocialShareOptions | string
): string {
  // Handle string argument for backward compatibility
  const opts: SocialShareOptions = typeof options === 'string' ? { url: options } : options;

  const {
    url,
    text = '',
    imageUrl = '',
    tags = [],
    mastodonInstance = 'mastodon.social',
    via = '',
    frameUrl,
  } = opts;

  // Encode parameters
  const encodedUrl = encodeURIComponent(url);
  const encodedText = text ? encodeURIComponent(text) : '';
  const encodedImageUrl = imageUrl ? encodeURIComponent(imageUrl) : '';
  const encodedVia = via ? encodeURIComponent(via) : '';

  // Format hashtags for platforms that support them
  const hashtagsString = tags
    .map((tag) => (tag.startsWith('#') ? tag.substring(1) : tag))
    .join(',');
  const encodedHashtags = encodeURIComponent(hashtagsString);

  // Generate hashtags text for platforms that use them inline
  const hashtagsText = tags.map((tag) => (tag.startsWith('#') ? tag : `#${tag}`)).join(' ');
  const encodedHashtagsText = hashtagsText ? encodeURIComponent(' ' + hashtagsText) : '';

  switch (platform) {
    case 'twitter':
      let twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
      if (encodedText) twitterUrl += `&text=${encodedText}`;
      if (encodedHashtags) twitterUrl += `&hashtags=${encodedHashtags}`;
      if (encodedVia) twitterUrl += `&via=${encodedVia}`;
      return twitterUrl;

    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

    case 'linkedin':
      const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
      return linkedinUrl;

    case 'pinterest':
      let pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}`;
      if (encodedText) pinterestUrl += `&description=${encodedText}`;
      if (encodedImageUrl) pinterestUrl += `&media=${encodedImageUrl}`;
      return pinterestUrl;

    case 'reddit':
      let redditUrl = `https://www.reddit.com/submit?url=${encodedUrl}`;
      if (encodedText) redditUrl += `&title=${encodedText}`;
      return redditUrl;

    case 'whatsapp':
      let whatsappText = encodedText ? `${encodedText} ${encodedUrl}` : encodedUrl;
      whatsappText += encodedHashtagsText;
      return `https://api.whatsapp.com/send?text=${whatsappText}`;

    case 'telegram':
      let telegramText = encodedText ? `${encodedText} ${encodedUrl}` : encodedUrl;
      telegramText += encodedHashtagsText;
      return `https://t.me/share/url?url=${encodedUrl}&text=${telegramText}`;

    case 'hackernews':
      let hnUrl = `https://news.ycombinator.com/submitlink?u=${encodedUrl}`;
      if (encodedText) hnUrl += `&t=${encodedText}`;
      return hnUrl;

    case 'mastodon':
      const instance = mastodonInstance || 'mastodon.social';
      let mastodonText = encodedText ? `${encodedText} ${encodedUrl}` : encodedUrl;
      mastodonText += encodedHashtagsText;
      return `https://${instance}/share?text=${mastodonText}`;

    case 'pocket':
      let pocketUrl = `https://getpocket.com/save?url=${encodedUrl}`;
      if (encodedText) pocketUrl += `&title=${encodedText}`;
      return pocketUrl;

    case 'tumblr':
      let tumblrUrl = `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodedUrl}`;
      if (encodedText) tumblrUrl += `&title=${encodedText}`;
      if (encodedHashtagsText) tumblrUrl += `&tags=${encodedHashtags}`;
      return tumblrUrl;

    case 'discord':
      // Discord has limited sharing capabilities via URL
      return `https://discord.com/channels/@me?text=${encodedUrl}`;

    case 'slack':
      // Opens Slack app with prefilled content if installed
      const slackText = encodedText ? `${encodedText} ${encodedUrl}` : encodedUrl;
      return `https://slack.com/app_redirect?channel=general&text=${slackText}`;

    case 'email':
      const subject = encodedText || 'Check this out';
      const body = `${encodedText ? encodedText + '%0A%0A' : ''}${encodedUrl}${encodedHashtagsText ? '%0A%0A' + encodedHashtagsText : ''}`;
      return `mailto:?subject=${subject}&body=${body}`;

    case 'github':
      // GitHub doesn't have a direct sharing mechanism
      return url;

    case 'farcaster':
      // Farcaster uses Warpcast as its main client
      // If a frameUrl is provided, use that for Frame-compatible sharing
      const farcasterFrameUrl = frameUrl || url;
      if (encodedText) {
        return `https://warpcast.com/~/compose?text=${encodedText}%20${encodedUrl}${encodedHashtagsText}`;
      } else {
        return `https://warpcast.com/~/compose?embeds[]=${encodeURIComponent(farcasterFrameUrl)}`;
      }

    default:
      return url;
  }
}

/**
 * Get all available sharing platforms
 *
 * @returns Array of all supported sharing platforms
 */
export function getAvailableSharingPlatforms(): SharingPlatform[] {
  return [
    'twitter',
    'facebook',
    'linkedin',
    'pinterest',
    'reddit',
    'whatsapp',
    'telegram',
    'hackernews',
    'mastodon',
    'pocket',
    'tumblr',
    'discord',
    'slack',
    'email',
    'farcaster',
    ...(Object.keys(SOCIAL_LINKS).filter(
      (platform) => SOCIAL_LINKS[platform as SocialPlatform].shareEnabled
    ) as SocialPlatform[]),
  ];
}
