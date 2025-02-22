import { type MotionProps } from 'framer-motion';

export const DEFAULT_ANIMATION_CONFIG = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
} as const;

export const DEFAULT_INVIEW_OPTIONS = {
  once: true,
  margin: '-100px',
} as const;

export const fadeInUpAnimation = (delay: number = 0): MotionProps => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { ...DEFAULT_ANIMATION_CONFIG, delay },
});

export const fadeInAnimation = (delay: number = 0): MotionProps => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { ...DEFAULT_ANIMATION_CONFIG, delay },
});

export const scaleInAnimation = (delay: number = 0): MotionProps => ({
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { ...DEFAULT_ANIMATION_CONFIG, delay },
});
