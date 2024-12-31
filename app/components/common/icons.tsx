import { FaLinkedin, FaXTwitter, FaGithub, FaEnvelope, FaSun, FaMoon } from 'react-icons/fa6';
import type { IconType } from 'react-icons';

export const ICONS = {
  social: {
    twitter: FaXTwitter,
    linkedin: FaLinkedin,
    github: FaGithub,
    email: FaEnvelope,
  },
  theme: {
    light: FaSun,
    dark: FaMoon,
  },
} as const;

export type IconName = keyof typeof ICONS.social | keyof typeof ICONS.theme;
export type SocialIconName = keyof typeof ICONS.social;
export type ThemeIconName = keyof typeof ICONS.theme;

export const getIcon = (name: IconName): IconType => {
  if (name in ICONS.social) return ICONS.social[name as SocialIconName];
  if (name in ICONS.theme) return ICONS.theme[name as ThemeIconName];
  throw new Error(`Icon ${name} not found`);
};
