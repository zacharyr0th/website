// eslint.config.js

import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  extends: [
    'next/core-web-vitals',
    'next',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'prettier', 'jsx-a11y'],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'double'],
    'prettier/prettier': [
      'error',
      {
        semi: true,
        singleQuote: false,
        endOfLine: 'auto',
      },
    ],
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
});
