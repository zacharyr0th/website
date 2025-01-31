import { FaGithub, FaNewspaper, FaPlay, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import type { IconType } from 'react-icons';

export const Icons: Readonly<Record<string, IconType>> = {
  GitHub: FaGithub,
  Article: FaNewspaper,
  Demo: FaPlay,
  Link: FaArrowUpRightFromSquare,
} as const;

export type ProjectCategory = keyof typeof PROJECT_CATEGORIES;

export const PROJECT_CATEGORIES = {
  web3: 'Web3',
  ai: 'AI',
  web: 'Web',
  mobile: 'Mobile',
  other: 'Other',
} as const;
