import { FaGithub, FaNewspaper, FaPlay, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import type { IconType } from 'react-icons';

export const Icons: Readonly<Record<string, IconType>> = {
  GitHub: FaGithub,
  Article: FaNewspaper,
  Demo: FaPlay,
  Link: FaArrowUpRightFromSquare,
} as const;
