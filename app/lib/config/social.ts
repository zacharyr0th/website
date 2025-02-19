import type { IconType } from 'react-icons';
import { FaLinkedin, FaXTwitter, FaGithub, FaEnvelope } from 'react-icons/fa6';

/**
 * Represents a social media link with associated metadata
 * @interface SocialLink
 */
export interface SocialLink {
  url: string /** The full URL to the social profile */;
  label: string /** Display label for the social link */;
  icon: IconType /** React Icon component */;
  username?: string /** Username on the platform (optional) */;
  platform: string /** Name of the social platform */;
  active: boolean /** Whether the social link is currently active */;
}

export const SOCIAL_LINKS = {
  twitter: {
    url: 'https://twitter.com/zacharyr0th',
    label: 'Twitter',
    icon: FaXTwitter,
    username: '@zacharyr0th',
    platform: 'X (Twitter)',
    active: true,
  },
  github: {
    url: 'https://github.com/zacharyr0th',
    label: 'GitHub',
    icon: FaGithub,
    username: 'zacharyr0th',
    platform: 'GitHub',
    active: true,
  },
  linkedin: {
    url: 'https://linkedin.com/in/zacharyr0th',
    label: 'LinkedIn',
    icon: FaLinkedin,
    username: 'zacharyr0th',
    platform: 'LinkedIn',
    active: true,
  },
  email: {
    url: 'mailto:zacharyroth@pm.me',
    label: 'Email',
    icon: FaEnvelope,
    username: 'zacharyroth@pm.me',
    platform: 'Email',
    active: true,
  },
} as const satisfies Record<string, SocialLink>;

// Derive types from the const assertion
export type SocialPlatform = keyof typeof SOCIAL_LINKS;
