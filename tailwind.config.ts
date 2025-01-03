import type { Config } from 'tailwindcss';

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
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--color-text-primary)',
            maxWidth: '100%',
            h1: {
              color: 'var(--color-text-primary)',
            },
            h2: {
              color: 'var(--color-text-primary)',
            },
            h3: {
              color: 'var(--color-text-primary)',
            },
            h4: {
              color: 'var(--color-text-primary)',
            },
            p: {
              color: 'var(--color-text-primary)',
            },
            a: {
              color: 'var(--color-accent)',
              '&:hover': {
                color: 'var(--color-accent-hover)',
              },
            },
            strong: {
              color: 'var(--color-text-primary)',
            },
            blockquote: {
              color: 'var(--color-text-secondary)',
              borderLeftColor: 'var(--color-surface)',
            },
            code: {
              color: 'var(--color-text-primary)',
              backgroundColor: 'var(--color-surface)',
              borderRadius: '0.375rem',
              padding: '0.25rem 0.5rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text-primary)',
              borderRadius: '0.5rem',
            },
            img: {
              borderRadius: '0.5rem',
              marginTop: '2rem',
              marginBottom: '2rem',
              boxShadow: 'var(--shadow-lg)',
            },
          },
        },
      },
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
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;