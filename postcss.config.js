module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {
      flexbox: 'no-2009',
      grid: 'autoplace',
    },
    ...(process.env.NODE_ENV === 'production'
      ? {
          'postcss-preset-env': {
            autoprefixer: {
              flexbox: 'no-2009',
              grid: 'autoplace',
            },
            stage: 3,
            features: {
              'custom-properties': false,
              'nesting-rules': false,
            },
          },
          'postcss-flexbugs-fixes': {},
          'cssnano': {
            preset: ['default', {
              discardComments: { removeAll: true },
              minifyFontValues: { removeQuotes: false },
            }],
          },
        }
      : {}),
  },
};
