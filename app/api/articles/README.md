## API Architecture

### API Layer
All API routes are located in [`app/api/`](./app/api/):
- Articles API [`app/api/articles/route.ts`](./app/api/articles/route.ts):
- Markdown processing: [`lib/markdown.ts`](./lib/markdown.ts)
- Cache configuration: [`lib/cache.ts`](./lib/cache.ts)
- Rate limiting: [`middleware.ts`](./middleware.ts#L{line-number})

### Security Measures
Core security implementations:
- Rate limiting: [`middleware.ts`](./middleware.ts#L{line-number})
- Environment protection: [`lib/security.ts`](./lib/security.ts#L{line-number})
- CORS settings: [`middleware.ts`](./middleware.ts#L{line-number})
- API protection: [`lib/security.ts`](./lib/security.ts#L{line-number})
- XSS prevention: [`lib/security.ts`](./lib/security.ts#L{line-number})
- CSP headers: [`middleware.ts`](./middleware.ts#L{line-number})
- Cookie handling: [`lib/security.ts`](./lib/security.ts#L{line-number})
- Input validation: [`lib/validation.ts`](./lib/validation.ts)

### Authentication & Authorization
Implementation details:
- Route protection: [`middleware.ts`](./middleware.ts#L{line-number})
- Session management: [`lib/security.ts`](./lib/security.ts#L{line-number})
- Access control: [`lib/security.ts`](./lib/security.ts#L{line-number})
- JWT handling: [`lib/security.ts`](./lib/security.ts#L{line-number})
