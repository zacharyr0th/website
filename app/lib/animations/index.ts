import { type MotionProps as FramerMotionProps } from 'framer-motion';

export const DEFAULT_ANIMATION_CONFIG = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
} as const;

export interface ViewportOptions {
  once?: boolean;
  margin?: string;
  amount?: number | 'some' | 'all';
  root?: { current: Element | null };
}

export const DEFAULT_VIEWPORT_OPTIONS = {
  once: true,
  margin: '-100px',
  amount: 0.2,
} as const;

export type MotionProps = Omit<FramerMotionProps, 'viewport'> & {
  viewport?: ViewportOptions;
};

export type AnimationVariant =
  | 'fadeIn'
  | 'fadeInUp'
  | 'fadeInDown'
  | 'fadeInLeft'
  | 'fadeInRight'
  | 'scaleIn'
  | 'slideIn'
  | 'rotateIn'
  | 'bounceIn'
  | 'flipIn';

export interface AnimationOptions {
  delay?: number;
  duration?: number;
  ease?: [number, number, number, number];
  once?: boolean;
  viewport?: Partial<ViewportOptions> | undefined;
}

export const createAnimation = (
  variant: AnimationVariant,
  options: AnimationOptions = {}
): MotionProps => {
  const {
    delay = 0,
    duration = DEFAULT_ANIMATION_CONFIG.duration,
    ease = DEFAULT_ANIMATION_CONFIG.ease,
    once = true,
    viewport: customViewport,
  } = options;

  const baseTransition = {
    duration,
    delay,
    ease,
  };

  const baseViewport = once ? { ...DEFAULT_VIEWPORT_OPTIONS, ...customViewport } : undefined;

  const variants: Record<AnimationVariant, MotionProps> = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: baseTransition,
      viewport: baseViewport,
    },
    fadeInUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: baseTransition,
      viewport: baseViewport,
    },
    fadeInDown: {
      initial: { opacity: 0, y: -30 },
      animate: { opacity: 1, y: 0 },
      transition: baseTransition,
      viewport: baseViewport,
    },
    fadeInLeft: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
      transition: baseTransition,
      viewport: baseViewport,
    },
    fadeInRight: {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
      transition: baseTransition,
      viewport: baseViewport,
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: baseTransition,
      viewport: baseViewport,
    },
    slideIn: {
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '-100%' },
      transition: baseTransition,
      viewport: baseViewport,
    },
    rotateIn: {
      initial: { opacity: 0, rotate: -180 },
      animate: { opacity: 1, rotate: 0 },
      transition: { ...baseTransition, duration: duration * 1.2 },
      viewport: baseViewport,
    },
    bounceIn: {
      initial: { opacity: 0, scale: 0.3 },
      animate: { opacity: 1, scale: [0.3, 1.1, 0.9, 1] },
      transition: {
        ...baseTransition,
        duration: duration * 1.2,
        times: [0, 0.6, 0.8, 1],
      },
      viewport: baseViewport,
    },
    flipIn: {
      initial: { opacity: 0, rotateX: 90 },
      animate: { opacity: 1, rotateX: 0 },
      transition: {
        ...baseTransition,
        duration: duration * 1.1,
      },
      viewport: baseViewport,
    },
  };

  return variants[variant];
};

// Preset animations with common configurations
export const animations = {
  fadeIn: (delay = 0, viewport?: Partial<ViewportOptions>) =>
    createAnimation('fadeIn', { delay, viewport }),
  fadeInUp: (delay = 0, viewport?: Partial<ViewportOptions>) =>
    createAnimation('fadeInUp', { delay, viewport }),
  fadeInDown: (delay = 0, viewport?: Partial<ViewportOptions>) =>
    createAnimation('fadeInDown', { delay, viewport }),
  fadeInLeft: (delay = 0, viewport?: Partial<ViewportOptions>) =>
    createAnimation('fadeInLeft', { delay, viewport }),
  fadeInRight: (delay = 0, viewport?: Partial<ViewportOptions>) =>
    createAnimation('fadeInRight', { delay, viewport }),
  scaleIn: (delay = 0, viewport?: Partial<ViewportOptions>) =>
    createAnimation('scaleIn', { delay, viewport }),
  slideIn: (delay = 0, viewport?: Partial<ViewportOptions>) =>
    createAnimation('slideIn', { delay, viewport }),
  rotateIn: (delay = 0, viewport?: Partial<ViewportOptions>) =>
    createAnimation('rotateIn', { delay, viewport }),
  bounceIn: (delay = 0, viewport?: Partial<ViewportOptions>) =>
    createAnimation('bounceIn', { delay, viewport }),
  flipIn: (delay = 0, viewport?: Partial<ViewportOptions>) =>
    createAnimation('flipIn', { delay, viewport }),
} as const;

// Hook for handling scroll-based animations
export const useScrollAnimation = (options: AnimationOptions = {}): MotionProps => {
  const {
    duration = DEFAULT_ANIMATION_CONFIG.duration,
    delay = 0,
    ease = DEFAULT_ANIMATION_CONFIG.ease,
    once = true,
    viewport: customViewport,
  } = options;

  return {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay, ease },
    viewport: once ? { ...DEFAULT_VIEWPORT_OPTIONS, ...customViewport } : undefined,
  };
};
