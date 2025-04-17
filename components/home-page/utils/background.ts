export const BACKGROUND_MOVE_KEYFRAMES = `
  @keyframes backgroundMove {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-50%, -50%);
    }
  }
` as const;

export const ANIMATION_STYLES = {
  animation: 'backgroundMove 30s linear infinite',
  willChange: 'transform',
  transformOrigin: 'center',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
} as const;

// Optimize polygon patterns with better typing and memoization
export const POLYGON_DATA = [
  { points: '0,0 100,0 150,100 50,100', gradientId: 'gradient1' },
  { points: '100,0 200,0 200,100 150,100', gradientId: 'gradient2' },
  { points: '0,100 50,100 100,200 0,200', gradientId: 'gradient3' },
  { points: '50,100 150,100 200,200 100,200', gradientId: 'gradient4' },
] as const;

export type GradientStop = {
  offset: string;
  opacity: number;
};

export const GRADIENT_STOPS: GradientStop[] = [
  { offset: '0%', opacity: 0.8 },
  { offset: '100%', opacity: 0.6 },
];

export const GRADIENT_COLORS = ['primary', 'secondary', 'accent', 'surface'] as const;

// Pre-compute SVG attributes
export const SVG_ATTRS = {
  className: 'absolute inset-0 w-full h-full overflow-hidden',
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 1000 1000',
  preserveAspectRatio: 'xMidYMid slice',
} as const;

export const PATTERN_ATTRS = {
  width: '200',
  height: '200',
  patternUnits: 'userSpaceOnUse',
  patternTransform: 'scale(1.5)',
} as const;
