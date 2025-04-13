import type { Config } from 'tailwindcss';
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
        border: 'rgb(var(--border))',
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--color-text-primary)',
            maxWidth: '100%',
            width: '100%',
            'h1, h2, h3, h4, h5, h6, p, ul, ol, table, blockquote': {
              maxWidth: '100%',
            },
            a: {
              color: 'var(--color-accent)',
              textDecoration: 'none',
              '&:hover': {
                color: 'var(--color-accent)',
                textDecoration: 'none',
              },
            },
            table: {
              width: '100%',
              marginTop: '2em',
              marginBottom: '2em',
              borderCollapse: 'separate',
              borderSpacing: '0',
              thead: {
                th: {
                  padding: '1rem 1.5rem',
                  fontWeight: '600',
                  textAlign: 'left',
                  verticalAlign: 'top',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  '&:first-child': {
                    width: '200px',
                    whiteSpace: 'nowrap',
                  },
                },
              },
              tbody: {
                tr: {
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  },
                  td: {
                    padding: '1.5rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    verticalAlign: 'top',
                    '&:first-child': {
                      width: '200px',
                      whiteSpace: 'nowrap',
                      fontWeight: '500',
                    },
                    br: {
                      content: '""',
                      display: 'block',
                      marginTop: '0.75rem',
                    },
                    ul: {
                      margin: '0',
                      paddingLeft: '0',
                      listStyle: 'none',
                      li: {
                        position: 'relative',
                        paddingLeft: '1.25rem',
                        marginBottom: '0.75rem',
                        '&:before': {
                          content: '"•"',
                          position: 'absolute',
                          left: '0',
                          color: 'var(--color-accent)',
                        },
                        '&:last-child': {
                          marginBottom: '0',
                        },
                      },
                    },
                  },
                },
              },
            },
            'thead th': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'rgba(255, 255, 255, 0.9)',
              padding: '1rem 1.5rem',
              fontWeight: '500',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            },
            'tbody tr': {
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              '&:last-child': {
                borderBottom: 'none',
              },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
              },
            },
            'tbody td': {
              padding: '1rem 1.5rem',
              color: 'rgba(255, 255, 255, 0.8)',
              'ul, ol': {
                margin: 0,
                paddingLeft: '1.25rem',
              },
              li: {
                margin: '0.25rem 0',
              },
            },
          },
        },
      },
      backgroundImage: {
        'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
      },
      fontFamily: {
        mono: ['var(--geist-mono)', 'monospace'],
        sans: ['var(--geist-sans)', 'system-ui', 'sans-serif'],
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
  plugins: [
    require('@tailwindcss/typography'),
    // Add text balance utility
    plugin(({ addUtilities }) => {
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
      });
    }),
    // Add scrollbar hiding utilities
    plugin(({ addUtilities }) => {
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
    }),
  ],
};

export default config;
