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
  label: 'text-xl sm:text-2xl uppercase tracking-wider mb-4 text-accent',
  title: 'text-4xl sm:text-5xl font-mono mb-6 sm:mb-8 text-white',
  subtitle: 'text-2xl sm:text-3xl font-mono text-white/80',
  background: 'absolute top-0 inset-x-0 w-full h-[100vh]',
} as const;
