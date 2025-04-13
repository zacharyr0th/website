# zacharyr0th.com

A modern, high-performance personal website and blog platform built with Next.js 13+.

Features server-side rendering, TypeScript strict mode, and a component-driven architecture powering a project showcase, blog system, interactive bio page, and global audio player with API integrations.

## System Architecture

```
┌──────────────────────── Client Layer ──────────────────────────────────────────────┐
│                                                                                    │
│    ┌─────────────┐     ┌─────────────┐     ┌─────────────┐    ┌─────────────┐      │
│    │   Next.js   │     │    React    │     │ TailwindCSS │    │   Browser   │      │
│    │ + App Router│     │ Components  │     │   Styles    │    │    APIs     │      │
│    └─────┬───────┘     └─────┬───────┘     └─────┬───────┘    └─────┬───────┘      │
└──────────┼───────────────────┼───────────────────┼──────────────────┼──────────────┘
           │                   │                   │                  │
           │                   │                   │                  │
┌──────────┼───────────────────┼───────────────────┼──────────────────┼──────────────┐
│          │              Server Layer             │                  │              │
│    ┌─────┴───────┐     ┌─────┴───────┐     ┌─────┴───────┐     ┌────┴────────┐     │
│    │   Next.js   │     │   Next.js   │     │  Security   │     │   Browser   │     │
│    │   Server    │◄───►│ API Routes  │◄───►│ Middleware  │◄───►│  Security   │     │
│    └─────┬───────┘     └─────┬───────┘     └─────┬───────┘     └────┬────────┘     │
└──────────┼───────────────────┼───────────────────┼──────────────────┼──────────────┘
           │                   │                   │                  │
           │                   │                   │                  │
┌──────────┼───────────────────┼───────────────────┼──────────────────┼──────────────┐
│          │           Data & Storage Layer        │                  │              │
│    ┌─────┴───────┐     ┌─────┴───────┐     ┌─────┴───────┐     ┌────┴────────┐     │
│    │   S3/CDN    │     │ Filesystem  │     │    Cache    │     │   Static    │     │
│    │   Storage   │◄───►│ + MDX/Media │◄───►│    Layer    │◄───►│   Assets    │     │
│    └─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘     │
└────────────────────────────────────────────────────────────────────────────────────┘

┌─────── Core Features ──────┐     ┌─────── Security Features ───────┐
│                            │     │                                 │
│  • SSR/SSG/ISR             │     │  • RBAC + Auth                  │
│  • MDX + Media             │     │  • CSP + Security Headers       │
│  • Dynamic Routing         │     │  • API Security + Validation    │
│  • Edge Optimization       │     │  • Rate Limiting + WAF          │
└────────────────────────────┘     └─────────────────────────────────┘

Data Flow:
 1. Client Request ────────► Next.js App Router
 2. Security Middleware Validates Request
 3. Server Components/API Routes Process Request
 4. Data Fetched from Storage/Cache Layers
 5. Response Rendered/Streamed with Edge Optimization
```

## Technical Architecture

| Category                 | Features                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core Technologies**    | **N** Framework: Next.js 13+ with App Router<br>**TS** Language: TypeScript (Strict Mode)<br>Styling: Tailwind CSS with Custom Design System<br>Content: MDX with Remark/Rehype<br>State Management: React Hooks + Context<br>Data Fetching: SWR with REST APIs                                                                                                                                                                                 |
| **Performance Features** | Server Components (RSC)<br>Edge Runtime Support<br>Streaming SSR<br>Image Optimization<br>Dynamic Imports                                                                                                                                                                                                                                                                                                                                       |
| **Static Generation**    | Hybrid Static Generation Strategy:<br>- Content pages ([`articles`](./public/articles/), [`writing`](./app/writing/)) - Static with hourly revalidation<br>- Simple pages (datasets, archive) - Fully static<br>- Infrastructure ([`sitemap`](./app/sitemap.ts), [`robots`](./app/robots.ts), [`agents`](./public/agents.json)) - Static with dynamic generation<br>- API routes ([`api/`](./app/api/)) - Static with configurable revalidation |
| **Developer Experience** | ESLint + Prettier Configuration<br>TypeScript Path Aliases<br>Hot Module Replacement<br>Fast Refresh                                                                                                                                                                                                                                                                                                                                            |
| **SEO Optimization**     | Dynamic meta tags<br>Structured data (JSON-LD)<br>Automatic sitemap generation<br>OpenGraph images<br>[`robots.txt`](./app/robots.ts) configuration<br>[`agents.json`](./public/agents.json) configuration                                                                                                                                                                                                                                      |

### Available Scripts

- `npm run dev` - Development (port 3000)
- `npm run build` - Production build
- `npm run reset` - Clean install

## Configuration

### Environment Variables

See [`.env.example`](./.env.example) for all required environment variables and their descriptions.

### Storage Setup

S3-compatible storage for handling media files and assets:

1. **Cloud Storage Configuration**

   - Set up an S3-compatible storage bucket (AWS S3, Hetzner Storage, etc.)
   - Required bucket permissions:
     - `GetObject`
     - `PutObject`
     - `ListBucket`
   - Configure public access settings based on your needs

2. **CORS Configuration** (create `cors.json` in your bucket):

   ```json
   {
     "CORSRules": [
       {
         "AllowedOrigins": ["https://your-domain.com"],
         "AllowedMethods": ["GET", "PUT", "POST", "HEAD"],
         "AllowedHeaders": ["*"],
         "ExposeHeaders": ["ETag"],
         "MaxAgeSeconds": 3600
       }
     ]
   }
   ```

3. **Bucket Policy** (create `bucket-policy.json`):

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadForGetBucketObjects",
         "Effect": "Allow",
         "Principal": "*",
         "Action": ["s3:GetObject"],
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       }
     ]
   }
   ```

4. **Environment Variables**
   Update your `.env.local` with the following:

   ```bash
   STORAGE_ACCESS_KEY=your-access-key-here
   STORAGE_SECRET_KEY=your-secret-key-here
   STORAGE_BUCKET_NAME=your-bucket-name
   STORAGE_ENDPOINT=https://your-storage-endpoint
   STORAGE_REGION=us-east-1  # Optional, defaults to us-east-1
   ```

5. **Storage Features**
   Includes built-in storage features:

   - Signed URL generation for secure file access
   - Streaming support for audio files
   - Error handling for storage operations
   - Automatic content type detection
   - Cache control headers

6. **API Integration**
   The storage system is integrated with the following API endpoints:
   - `/api/audio/sign-url` - Generate signed URLs for audio files
   - `/api/audio/stream` - Stream audio files with range support

### Content Management

1. Add audio files as .mp4 files in [`public/audio/`](./public/audio/), store locally, and upload to storage
2. Add your articles in [`public/articles/`](./public/articles/) as markdown files for the blog system
3. Update project data in [`app/projects/data/projects.ts`](./app/projects/data/projects.ts) for the project section
4. Customize the bio section content in [`app/bio/data/bio.ts`](./app/bio/data/bio.ts)

Implements an enterprise-grade security system with multiple layers, detailed in [`app/lib/security/README.md`](./app/lib/security/README.md):
