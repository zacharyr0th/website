import { FaGithub, FaNewspaper, FaPlay, FaArrowUpRightFromSquare } from 'react-icons/fa6';

export const Icons = {
  GitHub: FaGithub,
  Article: FaNewspaper,
  Demo: FaPlay,
  Link: FaArrowUpRightFromSquare,
} as const;

export const PROJECT_CATEGORIES = {
  web3: 'Web3',
  ai: 'AI',
  web: 'Web',
  mobile: 'Mobile',
  other: 'Other',
} as const;
