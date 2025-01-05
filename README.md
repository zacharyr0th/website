# Modern Personal Website & Blog Platform

A high-performance, SEO-optimized personal website built with Next.js 13+, featuring a blog, project showcase, bio, and audio player. Designed for developers who want to showcase their work and share their thoughts.

## Technical Architecture

| Category | Features |
|----------|----------|
| **Core Technologies** | **N** Framework: Next.js 13+ with App Router<br>**TS** Language: TypeScript (Strict Mode)<br>🎨 Styling: Tailwind CSS with Custom Design System<br>📄 Content: MDX with Remark/Rehype<br>⚛️ State Management: React Hooks + Context<br>🔄 Data Fetching: SWR with REST APIs |
| **Performance Features** | Server Components (RSC)<br>Edge Runtime Support<br>Streaming SSR<br>Image Optimization<br>Dynamic Imports |
| **Developer Experience** | ESLint + Prettier Configuration<br>TypeScript Path Aliases<br>Hot Module Replacement<br>Fast Refresh |
| **SEO Optimization** | Dynamic meta tags<br>Structured data (JSON-LD)<br>Automatic sitemap generation<br>OpenGraph images<br>robots.txt configuration |

### Performance Metrics

![Lighthouse Audit Scores](/public/images/readme-lighthouse-scores.webp)

*Test taken on 2025-01-05 - [link to live lighthouse report](https://lighthouse-metrics.com/lighthouse/checks/4d5733a8-bdcd-4c32-a88c-611f97f86f61)*

### Accessibility
- WCAG 2.1 Compliant
- Keyboard Navigation
- Screen Reader Support
- Semantic HTML
- ARIA Labels

## Key Features

### Home Page

- Modern, minimalist design with fluid animations and responsive layouts
- Interactive hero section with a custom polygon background and smooth scroll transitions
- Performance-optimized image loading and a blur background for the navigation bar

![Landing Page](/public/images/readme-landing.webp)

#### Viewport 2

![Website Viewport2](/public/images/readme-viewport2.webp)

### Writing Page (Coming Soon)

- MDX-powered blog posts with support for custom components and interactive elements
- Rich markdown support including math equations, tables, diagrams, and embedded content
- Automatic social media preview image generation for posts

[Screenshot: Blog Section]

### Project Showcase

- Responsive visual project grid with hover effects and focus states
- Dynamic project data pulled from project.ts file
- Filtering system by category using the same buttons as the navigation bar

![Projects Grid](/public/images/readme-projects.png)

### Bio Section (Coming Soon)

- Interactive professional timeline with animated scrolling
- Skills visualization using dynamic progress bars and radar charts
- Comprehensive contact information with social media integration
- Downloadable resume in multiple formats (PDF, Word)
- Achievement highlights with supporting media
- Integration with GitHub contributions graph
- Dynamic testimonials section from LinkedIn API

[Screenshot: Bio Page]

### Audio Player Feature (Coming Soon)
- Global audio player with persistent state across navigation
- Custom playlist management with drag-and-drop support
- Audio visualization with WebAudio API
- Background playback with media controls integration
- Progressive loading for large audio files
- Automatic metadata extraction from audio files

## Project Structure

```
.
├── app/                    # Next.js App Router Structure
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root Layout
│   ├── api/               # API Routes
│   ├── audio/             # Audio Player Feature
│   ├── bio/               # Bio Page
│   ├── components/        # Shared Components
│   ├── lib/               # Utilities
│   ├── projects/          # Projects Section
│   ├── styles/           # Global Styles
│   └── writing/          # Blog System
├── public/               # Static Assets
└── types/               # TypeScript Types
```

### Available Scripts
- `npm run dev` - Development (port 3000)
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run check` - Type/lint checks
- `npm run clean` - Clean build files

## License

MIT License - See [LICENSE](./LICENSE) file for details.