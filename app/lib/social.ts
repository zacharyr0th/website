import { FaLinkedin, FaXTwitter, FaGithub, FaEnvelope } from 'react-icons/fa6';

export interface SocialLink {
  url: string;
  label: string;
  icon: React.ComponentType;
  username?: string;
  platform: string;
  active: boolean;
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
} satisfies Record<string, SocialLink>;
