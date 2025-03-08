import type { IconType } from 'react-icons';
import { FaLinkedin, FaXTwitter, FaGithub, FaEnvelope } from 'react-icons/fa6';

/** Social media link structure */
export interface SocialLink {
  readonly url: string;
  readonly label: string;
  readonly icon: IconType;
  readonly username?: string;
  readonly platform: string;
  readonly active: boolean;
}

/** Social media links configuration */
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
} as const satisfies Record<string, Readonly<SocialLink>>;

/** Extracts social platform keys as a union type */
export type SocialPlatform = keyof typeof SOCIAL_LINKS;
