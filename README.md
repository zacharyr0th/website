# Personal Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.22-black.svg)](https://nextjs.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4.0-38B2AC.svg)](https://tailwindcss.com/)

Modern, performant personal website built with Next.js, TypeScript, and Tailwind. Features server-side rendering, static generation, and a modern component architecture.

## Quick Start

```bash
# Clone and install
git clone https://github.com/zacharytylerroth/website.git
cd website && npm install

# Development
npm run dev          # Start dev server
npm run check        # Type check & lint
npm run clean        # Clean artifacts
npm run reset        # Full reset and rebuild

# Production
npm run build        # Production build
npm run start        # Start production server
```

## Stack & Features

| Category     | Technologies & Features                                                 | Source                                                                                                          |
| ------------ | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Core**     | `next 14.2.22` · `typescript 5.7.2` · `node 20.0.0`                     | [`package.json`](./package.json)                                                                                |
| **UI/UX**    | `tailwind 3.4.0` · `framer-motion 11.0.0` · `dark-mode` · `wcag-2.1-aa` | [`tailwind.config.ts`](./tailwind.config.ts) · [`ThemeProvider.tsx`](./app/components/common/ThemeProvider.tsx) |
| **Data**     | `swr 2.2.4` · `mdx-remote 4.4.1` · `file-based-cms`                     | [`lib/markdown.ts`](./lib/markdown.ts)                                                                          |
| **Dev**      | `eslint 8.57.0` · `prettier 3.4.2` · `type-safety`                      | [`.eslintrc.json`](./.eslintrc.json) · [`.prettierrc`](./.prettierrc)                                           |
| **Security** | `csp` · `rate-limiting` · `cors` · `input-validation`                   | [`lib/security/security.ts`](./lib/security/security.ts)                                                        |

## Project Structure

```
app/
├── components/          # UI Components
│   ├── common/         # Shared components
│   │   ├── ThemeProvider.tsx    # Dark mode
│   │   ├── Navigation.tsx       # Site navigation
│   │   ├── Button.tsx          # Shared buttons
│   │   └── Layout.tsx          # Base layout
│   ├── audio/          # Audio features
│   │   ├── AudioPlayer.tsx     # Player
│   │   └── CategoryCard.tsx    # Categories
│   ├── writing/        # Blog features
│   │   ├── WritingPageServer.tsx  # SSR
│   │   ├── ArticleCard.tsx      # Article preview
│   │   └── ArchiveSection.tsx    # Archive
│   └── projects/       # Portfolio features
├── lib/                # Core Utilities
│   ├── api/           # API handlers
│   │   └── articles.ts         # Article API
│   ├── security/      # Security utils
│   │   ├── security.ts         # Core security
│   │   └── cors.ts            # CORS config
│   └── utils/         # Shared helpers
│       ├── articles.ts         # Article utils
│       └── monitoring.ts       # Error tracking
├── styles/            # Global styles
│   ├── base.css            # Base styles
│   └── components.css      # Component styles
└── public/            # Static assets
```

## Features

### Content Management

- **MDX Support**: Write content in MDX with full React component support
- **Static Generation**: Pre-render pages at build time for optimal performance
- **Dynamic Imports**: Lazy load components and modules as needed
- **Image Optimization**: Automatic image optimization and responsive images

### UI/UX

- **Dark Mode**: System-aware dark mode with smooth transitions
- **Animations**: Smooth page transitions and micro-interactions
- **Responsive Design**: Mobile-first approach with dynamic layouts
- **Accessibility**: WCAG 2.1 AA compliant with full keyboard navigation

### Development

- **Type Safety**: Strict TypeScript configuration with comprehensive types
- **Code Quality**: ESLint and Prettier with custom rule sets
- **Git Hooks**: Husky for pre-commit linting and formatting
- **Fast Refresh**: Quick development iterations with hot reloading

## API & Security

| Service      | Features                  | Protection                  | Source                                                             |
| ------------ | ------------------------- | --------------------------- | ------------------------------------------------------------------ |
| **Articles** | `static-gen` · `mdx`      | `rate-limit` · `validation` | [`app/api/articles/route.ts`](./app/api/articles/route.ts)         |
| **Projects** | `portfolio` · `demos`     | `cors` · `sanitization`     | [`lib/cors.ts`](./lib/cors.ts)                                     |
| **Audio**    | `playlists` · `streaming` | `content-validation`        | [`app/audio/AudioPageClient.tsx`](./app/audio/AudioPageClient.tsx) |

<details>
<summary><strong>Security Configuration</strong></summary>

```typescript
// Source: lib/security/security.ts
{
  headers: {
    csp: {
      'default-src': ["'self'"],
      'script-src': ["'self'", '(nonce-{NONCE})'],
      'connect-src': ["'self'", process.env.API_URL],
    },
    hsts: 'max-age=63072000',
    'frame-options': 'DENY'
  },
  api: {
    rateLimit: {
      window: '15m',
      max: 100
    },
    cors: {
      origins: ['https://zacharyr0th.com'],
      methods: ['GET']
    }
  },
  validation: {
    content: {
      maxSize: '5mb',
      types: ['.md']
    }
  }
}
```

</details>

## Development

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

### Environment Setup

```bash
# Copy environment variables
cp .env.example .env

# Required Variables
NEXT_PUBLIC_SITE_URL=          # Your site URL
NEXT_PUBLIC_VERCEL_ENV=        # development/preview/production

# Optional Variables
NEXT_PUBLIC_GA_ID=             # Google Analytics ID
```

### Available Scripts

```bash
npm run dev          # Start development server (port 3000)
npm run build        # Create production build
npm run start        # Start production server
npm run check        # Run type checking and linting
npm run clean        # Clean build artifacts
npm run reset        # Complete reset and rebuild
```

## Deployment

| Environment | Config             | URL               | Protection      | Source                               |
| ----------- | ------------------ | ----------------- | --------------- | ------------------------------------ |
| **Dev**     | `.env.development` | `localhost:3000`  | `debug-mode`    | [`next.config.js`](./next.config.js) |
| **Preview** | `.env.preview`     | `*.vercel.app`    | `basic-auth`    | [`vercel.json`](./vercel.json)       |
| **Prod**    | `.env.production`  | `zacharyr0th.com` | `full-security` | [`.vercelignore`](./.vercelignore)   |

## Dependencies

MIT License · [View License](./LICENSE)

### Core Dependencies

| Package         | Version   | Purpose     | Config                                       |
| --------------- | --------- | ----------- | -------------------------------------------- |
| `next`          | `14.2.22` | Framework   | [`next.config.js`](./next.config.js)         |
| `react`         | `18.2.0`  | UI Library  | [`tsconfig.json`](./tsconfig.json)           |
| `tailwind`      | `3.4.0`   | Styling     | [`tailwind.config.ts`](./tailwind.config.ts) |
| `framer-motion` | `11.0.0`  | Animations  | [`lib/constants.tsx`](./lib/constants.tsx)   |
| `typescript`    | `5.7.2`   | Type System | [`tsconfig.json`](./tsconfig.json)           |
| `mdx-remote`    | `4.4.1`   | MDX Support | [`next.config.js`](./next.config.js)         |
| `swr`           | `2.2.4`   | Data Fetch  | [`lib/api`](./lib/api)                       |

### Development Dependencies

| Package    | Version  | Purpose    |
| ---------- | -------- | ---------- |
| `eslint`   | `8.57.0` | Linting    |
| `prettier` | `3.4.2`  | Formatting |
| `husky`    | `9.0.0`  | Git Hooks  |
| `turbo`    | `2.3.3`  | Build Tool |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
