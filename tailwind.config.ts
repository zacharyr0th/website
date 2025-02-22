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
      fontFamily: {
        mono: [
          'var(--font-fira)',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
        sans: [
          'var(--font-source)',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        // Base sizes with fluid typography using modern clamp
        xs: ['clamp(0.5rem, 0.475rem + 0.25vw, 0.625rem)', { lineHeight: '1.4' }],
        sm: ['clamp(0.625rem, 0.6rem + 0.25vw, 0.75rem)', { lineHeight: '1.5' }],
        base: ['clamp(0.75rem, 0.725rem + 0.25vw, 0.875rem)', { lineHeight: '1.6' }],
        lg: ['clamp(0.875rem, 0.85rem + 0.25vw, 1rem)', { lineHeight: '1.6' }],
        xl: ['clamp(1rem, 0.975rem + 0.25vw, 1.125rem)', { lineHeight: '1.5' }],
        '2xl': ['clamp(1.125rem, 1.1rem + 0.5vw, 1.25rem)', { lineHeight: '1.4' }],
        '3xl': ['clamp(1.25rem, 1.225rem + 0.5vw, 1.5rem)', { lineHeight: '1.3' }],
        '4xl': ['clamp(1.5rem, 1.475rem + 0.5vw, 1.875rem)', { lineHeight: '1.2' }],
        '5xl': ['clamp(1.875rem, 1.85rem + 0.5vw, 2.25rem)', { lineHeight: '1.1' }],

        // Semantic heading sizes using modern type scale
        h1: [
          'clamp(1rem, 0.875rem + 1vw, 1.5rem)',
          {
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            fontWeight: '700',
          },
        ],
        h2: [
          'clamp(0.875rem, 0.75rem + 0.875vw, 1.25rem)',
          {
            lineHeight: '1.2',
            letterSpacing: '-0.01em',
            fontWeight: '600',
          },
        ],
        h3: [
          'clamp(0.75rem, 0.625rem + 0.75vw, 1.125rem)',
          {
            lineHeight: '1.3',
            letterSpacing: '-0.01em',
            fontWeight: '600',
          },
        ],
      },
      lineHeight: {
        none: '1',
        tight: '1.1',
        snug: '1.25',
        base: 'clamp(1.6, calc(1.4 + 0.2vw), 1.7)',
        relaxed: '1.75',
        loose: '2',
        // Add modern line heights
        article: 'clamp(1.6, calc(1.5 + 0.2vw), 1.8)',
        heading: 'clamp(1.1, calc(1.1 + 0.1vw), 1.2)',
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
        // Add modern letter spacing
        heading: '-0.02em',
        subheading: '-0.01em',
        body: '-0.002em',
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
      typography: ({ theme }: PluginUtils) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--color-text-primary)',
            '--tw-prose-headings': 'var(--color-text-primary)',
            '--tw-prose-lead': 'var(--color-text-secondary)',
            '--tw-prose-links': 'var(--color-accent)',
            '--tw-prose-bold': 'var(--color-text-primary)',
            '--tw-prose-counters': 'var(--color-text-secondary)',
            '--tw-prose-bullets': 'var(--color-text-secondary)',
            '--tw-prose-hr': 'var(--color-text-secondary)',
            '--tw-prose-quotes': 'var(--color-text-secondary)',
            '--tw-prose-quote-borders': 'var(--color-accent)',
            '--tw-prose-captions': 'var(--color-text-secondary)',
            '--tw-prose-code': 'var(--color-accent)',
            '--tw-prose-pre-code': 'var(--color-text-primary)',
            '--tw-prose-pre-bg': 'var(--color-surface)',
            '--tw-prose-th-borders': 'var(--color-text-secondary)',
            '--tw-prose-td-borders': 'var(--color-text-secondary)',

            // Base styles
            color: 'var(--color-text-primary)',
            maxWidth: 'none',
            width: '100%',
            fontFamily: theme('fontFamily.sans').join(', '),
            fontSize: theme('fontSize.base[0]'),
            lineHeight: theme('lineHeight.article'),
            textRendering: 'optimizeLegibility',
            fontFeatureSettings: theme('fontFeatures.base'),
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',

            // Headings
            'h1, h2, h3, h4, h5, h6': {
              color: 'var(--color-text-primary)',
              fontFamily: theme('fontFamily.mono').join(', '),
              fontWeight: '700',
              lineHeight: theme('lineHeight.heading'),
              letterSpacing: theme('letterSpacing.heading'),
              scrollMarginTop: '6rem',
              textWrap: 'balance',
              fontFeatureSettings: theme('fontFeatures.base'),
            },

            // Paragraphs
            p: {
              fontSize: ['base', { sm: 'lg', lg: 'xl' }],
              lineHeight: theme('lineHeight.article'),
              color: 'var(--color-text-primary)',
              opacity: 0.9,
              maxWidth: '70ch',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '1.5em',
              marginBottom: '1.5em',
              textWrap: 'pretty',
              hyphenate: 'auto',
              fontFeatureSettings: theme('fontFeatures.base'),
            },

            // Links
            a: {
              color: 'var(--color-accent)',
              textDecoration: 'none',
              borderBottomWidth: '1px',
              borderColor: 'var(--color-accent)',
              opacity: 0.8,
              transition: 'all 150ms ease-in-out',
              '&:hover': {
                opacity: 1,
                borderColor: 'var(--color-accent)',
                color: 'var(--color-accent-hover)',
              },
            },

            // Strong and Emphasis
            strong: {
              color: 'var(--color-text-primary)',
              fontWeight: '700',
            },

            em: {
              color: 'var(--color-text-primary)',
              opacity: 0.7,
              fontStyle: 'italic',
            },

            // Code blocks
            code: {
              fontFamily: theme('fontFamily.mono').join(', '),
              fontSize: '0.875em',
              backgroundColor: 'rgb(255 255 255 / 0.05)',
              padding: '0.2em 0.4em',
              borderRadius: '0.375rem',
              border: '1px solid rgb(255 255 255 / 0.1)',
              color: 'var(--color-accent)',
            },

            'code::before': {
              content: '""',
            },

            'code::after': {
              content: '""',
            },

            // Pre blocks
            pre: {
              backgroundColor: 'rgb(24 24 27 / 0.5)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgb(255 255 255 / 0.1)',
              padding: '1rem',
              borderRadius: '0.5rem',
              overflow: 'auto',
              marginTop: '2rem',
              marginBottom: '2rem',
            },

            // Lists
            'ul, ol': {
              listStylePosition: 'outside',
              paddingLeft: '1.5rem',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
              lineHeight: 'relaxed',
            },

            ul: {
              listStyleType: 'disc',
            },

            ol: {
              listStyleType: 'decimal',
            },

            li: {
              color: 'var(--color-text-primary)',
              opacity: 0.8,
              paddingLeft: '0.5rem',
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },

            // Blockquotes
            blockquote: {
              borderLeftWidth: '4px',
              borderColor: 'var(--color-accent)',
              opacity: 0.5,
              paddingLeft: '1.5rem',
              paddingTop: '0.25rem',
              paddingBottom: '0.25rem',
              marginTop: '2rem',
              marginBottom: '2rem',
              fontStyle: 'italic',
              color: 'var(--color-text-primary)',
            },

            // Images
            img: {
              borderRadius: '0.5rem',
              marginTop: '2rem',
              marginBottom: '2rem',
              boxShadow: theme('boxShadow.article-image'),
              border: '1px solid rgb(255 255 255 / 0.1)',
            },

            // Figures
            figure: {
              marginTop: '2rem',
              marginBottom: '2rem',
            },

            figcaption: {
              fontSize: theme('fontSize.sm'),
              color: 'var(--color-text-secondary)',
              textAlign: 'center',
              marginTop: '1rem',
            },

            // Horizontal rules
            hr: {
              marginTop: '3rem',
              marginBottom: '3rem',
              borderColor: 'rgb(255 255 255 / 0.1)',
            },

            // Tables
            table: {
              width: '100%',
              tableLayout: 'auto',
              textAlign: 'left',
              marginTop: '2rem',
              marginBottom: '2rem',
            },

            // First paragraph special styling
            'p:first-of-type': {
              fontSize: '1.125em',
              color: 'var(--color-text-primary)',
              opacity: 0.9,
            },

            // Drop cap styling
            'p:first-of-type::first-letter': {
              float: 'left',
              fontSize: '3.5em',
              lineHeight: '0.8',
              fontWeight: '700',
              marginRight: '0.1em',
              marginTop: '0.1em',
              fontFamily: theme('fontFamily.mono').join(', '),
              color: 'var(--color-text-primary)',
            },
          },
        },
        // Size variants
        sm: {
          css: {
            fontSize: theme('fontSize.sm'),
          },
        },
        lg: {
          css: {
            fontSize: theme('fontSize.lg'),
          },
        },
        xl: {
          css: {
            fontSize: theme('fontSize.xl'),
          },
        },
        // Dark mode styles are already handled by our CSS variables
      }),
    },
  },
  plugins: [
    typography,
    // Add text balance utility
    plugin(({ addUtilities, theme }) => {
      addUtilities({
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.text-pretty': {
          'text-wrap': 'pretty',
        },
        '.truncate-2': {
          display: '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
        '.truncate-3': {
          display: '-webkit-box',
          '-webkit-line-clamp': '3',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
        // Add modern text utilities
        '.font-features-normal': {
          'font-feature-settings': theme('fontFeatures.base'),
        },
        '.font-features-tabular': {
          'font-feature-settings': theme('fontFeatures.tabular'),
        },
        '.font-features-code': {
          'font-feature-settings': theme('fontFeatures.code'),
        },
        '.text-optimize-legibility': {
          'text-rendering': 'optimizeLegibility',
        },
      });
    }),
  ],
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
