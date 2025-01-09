// Thesis content
export const THESIS_CONTENT = {
  label: 'Thesis',
  title: 'The world needs permissionless markets',
  subtitle: 'and blockchains put everyone on the same page.',
} as const;

// Thesis styles
export const THESIS_STYLES = {
  section: 'relative min-h-screen',
  contentWrapper: 'w-full flex flex-col relative z-20',
  content: 'relative z-10 flex flex-col justify-center items-center min-h-screen p-8',
  textContainer: 'max-w-4xl w-full',
  label: 'text-sm uppercase tracking-wider mb-2 text-accent',
  title: 'text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-shadow-subtle text-white',
  subtitle: 'text-lg text-white/80',
  background: 'absolute top-0 inset-x-0 w-full h-screen opacity-50',
} as const;

export const heroContent = {
  name: 'Zachary Roth',
  title: 'Head of Growth, DeFi & AI @ ',
  aptosLink: 'https://aptoslabs.com/',
  sections: [
    {
      title: 'Ecosystem Analyst',
      content:
        'Curious analyst and builder with experience across the Bitcoin, Ethereum, Solana, and Aptos ecosystems.',
      backgroundColor: 'var(--color-primary)',
    },
    {
      title: 'Market Strategist',
      content:
        'My focus involves identifying market opportunities and advising teams on how to utilize on-chain solutions to improve their products and services. ',
      backgroundColor: 'var(--color-secondary)',
    },
    {
      title: 'Writer',
      content:
        'I write about technology and finance, bringing a wide-ranging perspective to each topic.',
      backgroundColor: 'var(--color-accent)',
    },
  ],
  chainLogos: ['bitcoin', 'ethereum', 'solana', 'aptos'],
} as const;
