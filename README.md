# Zachary Roth's Personal Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-13.0+-black.svg)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-38B2AC.svg)](https://tailwindcss.com/)

> A modern, performant personal website built with Next.js, TypeScript, and Tailwind CSS. 

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technical Architecture](#technical-architecture)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

### Design & User Experience
- **Responsive Design**: Mobile-first approach with breakpoints defined in [`tailwind.config.ts`](./tailwind.config.ts)
- **Theme System**: Dark/light mode with system preference detection in [`app/layout.tsx`](./app/layout.tsx)
- **Animations**: Framer Motion configurations in [`lib/constants.tsx`](./lib/constants.tsx)
- **Typography**: Custom font setup (Space Mono) with fallbacks
- **Accessibility**: WCAG 2.1 AA compliant with full keyboard navigation support

### SEO & Performance
- **Metadata**: Dynamic meta tags and OpenGraph data
- **Static Generation**: Optimized build-time rendering
- **Image Optimization**: Next.js Image component with automatic optimization

### Content Management
- **Markdown Processing**: Custom parser with syntax highlighting
- **Article System**: Full CRUD operations via API
- **Tag System**: Hierarchical categorization
- **Caching**: Optimized content delivery with stale-while-revalidate

## Development

### Project Structure
Key directories and their contents:
```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── components/        # Shared components
│   └── layout.tsx         # Root layout
├── lib/                   # Utility functions
│   ├── constants.ts       # Global constants
│   ├── markdown.ts        # Markdown processing
│   └── security.ts        # Security utilities
├── public/                # Static assets
└── styles/                # Global styles
```

## Getting Started

### Prerequisites
- Node.js 18.0+
- npm 8.0+
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/zacharytylerroth/website.git

# Navigate to project directory
cd website

# Install dependencies
npm install

# Start development server
npm run dev
```
## Development

### Available Commands
```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Create production build
npm run start        # Start production server

# Full Reset & Update (Clean Build)
npm run all          # Complete rebuild:
                     # 1. Removes node_modules, .next, .turbo, dist, and out directories
                     # 2. Updates npm packages
                     # 3. Fresh install of dependencies
                     # 4. Runs ESLint with auto-fix
                     # 5. TypeScript type checking
                     # 6. Formats code with Prettier
                     # 7. Creates production build
```