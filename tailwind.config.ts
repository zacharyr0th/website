import type { Config } from 'tailwindcss';
import type { PluginUtils } from 'tailwindcss/types/config';
import typography from '@tailwindcss/typography';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        error: 'var(--color-error)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)',
      },
      backgroundImage: {
        'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
      },
      typography: ({ theme }: PluginUtils) => ({
        DEFAULT: {
          css: {
            fontFamily: 'var(--font-mono)',
            fontOpticalSizing: 'auto',
            '--tw-prose-body': 'var(--color-text-primary)',
            '--tw-prose-headings': 'var(--color-text-primary)',
            '--tw-prose-links': 'var(--color-accent)',
            '--tw-prose-bold': 'var(--color-text-primary)',
            '--tw-prose-quotes': 'var(--color-text-secondary)',
            '--tw-prose-code': 'var(--color-text-primary)',
            '--tw-prose-pre-code': 'var(--color-text-primary)',
            '--tw-prose-pre-bg': 'var(--color-surface)',
            fontSize: 'var(--font-size-base)',
            lineHeight: '1.4',
            letterSpacing: '-0.01em',
            wordSpacing: '-0.025em',
            maxWidth: '100%',
            textAlign: 'justify',
            hyphens: 'auto',
            p: {
              marginTop: theme('spacing.3'),
              marginBottom: theme('spacing.3'),
              lineHeight: '1.4',
              letterSpacing: '-0.01em',
              wordSpacing: '-0.025em',
              textRendering: 'optimizeLegibility',
            },
            'p + p': {
              marginTop: theme('spacing.4'),
            },
            'p:first-of-type': {
              marginTop: '0',
            },
            h1: {
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--font-size-h1)',
              lineHeight: '1.1',
              letterSpacing: '-0.03em',
              marginTop: '1.5rem',
              marginBottom: '1rem',
              fontWeight: '800',
              textAlign: 'left',
            },
            h2: {
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--font-size-h2)',
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
              marginTop: '1.4rem',
              marginBottom: '0.8rem',
              fontWeight: '700',
              textAlign: 'left',
            },
            h3: {
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--font-size-h3)',
              lineHeight: '1.3',
              letterSpacing: '-0.01em',
              marginTop: '1.2rem',
              marginBottom: '0.6rem',
              fontWeight: '600',
              textAlign: 'left',
            },
            abbr: {
              fontVariantCaps: 'small-caps',
              letterSpacing: '0.5px',
              opacity: '0.8',
              textDecoration: 'none',
              fontFeatureSettings: '"smcp"',
            },
            a: {
              '&:hover': {
                color: 'var(--color-accent-hover)',
              },
            },
            code: {
              backgroundColor: 'var(--color-surface)',
              borderRadius: theme('borderRadius.md'),
              padding: '0.25rem 0.5rem',
              '&::before': { content: '""' },
              '&::after': { content: '""' },
            },
            img: {
              borderRadius: theme('borderRadius.xl'),
              marginTop: theme('spacing.8'),
              marginBottom: theme('spacing.8'),
              boxShadow: theme('boxShadow.article-image'),
              position: 'relative',
              display: 'block',
              width: '100%',
              height: 'auto',
            },
          },
        },
      }),
      fontSize: {
        base: 'var(--font-size-base)',
      },
      lineHeight: {
        base: 'var(--line-height-base)',
      },
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
      },
      borderRadius: {
        sm: 'var(--border-radius-sm)',
        md: 'var(--border-radius-md)',
        lg: 'var(--border-radius-lg)',
      },
      boxShadow: {
        DEFAULT: 'var(--box-shadow)',
        'article-image':
          '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [typography],
};

// Add scrollbar hiding utilities
if (!config.plugins) {
  config.plugins = [];
}
config.plugins.push(
  plugin(({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) => {
    addUtilities({
      '.scrollbar-hide': {
        /* IE and Edge */
        '-ms-overflow-style': 'none',
        /* Firefox */
        'scrollbar-width': 'none',
        /* Safari and Chrome */
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
    });
  })
);

export default config;
