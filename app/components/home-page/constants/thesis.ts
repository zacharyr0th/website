export const THESIS_CONTENT = {
  label: 'THESIS',
  title: 'The world needs permissionless markets',
  subtitle: 'and blockchains put everyone on the same page.',
} as const;

export const THESIS_STYLES = {
  section: 'relative min-h-screen',
  contentWrapper: 'w-full flex flex-col relative z-20',
  content: 'relative z-10 flex flex-col justify-center items-center min-h-[100vh] p-8',
  textContainer: 'max-w-5xl w-full mx-auto text-center',
  label: 'text-lg sm:text-xl uppercase tracking-wider mb-3 text-accent',
  title: 'text-2xl sm:text-3xl font-mono mb-4 sm:mb-6 text-white',
  subtitle: 'text-xl sm:text-2xl font-mono text-white/80 mx-auto text-center max-w-3xl',
  background: 'absolute top-0 inset-x-0 w-full h-[100vh]',
} as const;
