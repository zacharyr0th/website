# Agents API Documentation

This endpoint provides machine-readable metadata about the website in JSON format.

## Endpoint

```
GET /api/public/agents
```

## Response Format

```json
{
  "name": "Zachary Roth",
  "description": "Head of Growth at Aptos Labs, focusing on DeFi & AI",
  "url": "https://example.com",
  "type": "personal",
  "endpoints": {
    "robots": "https://example.com/api/public/robots",
    "sitemap": "https://example.com/api/public/sitemap",
    "rss": "https://example.com/rss.xml"
  },
  "social": {
    "twitter": "@zacharyr0th"
  },
  "organization": {
    "name": "Aptos Labs",
    "url": "https://aptoslabs.com/",
    "logo": "https://aptoslabs.com/logo.png"
  }
}
```

## Fields

- `name`: Site owner's name
- `description`: Brief description of the site owner's role and focus
- `url`: Base URL of the website
- `type`: Type of website ("personal")
- `endpoints`: Object containing URLs for various site endpoints
  - `robots`: URL of the robots API
  - `sitemap`: URL of the sitemap API
  - `rss`: URL of the RSS feed
- `social`: Object containing social media handles
  - `twitter`: Twitter handle
- `organization`: Object containing information about affiliated organization
  - `name`: Organization name
  - `url`: Organization website
  - `logo`: Organization logo URL

## Caching

The response includes appropriate cache headers:

- `Cache-Control: public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400`
- Content is statically generated with revalidation

## Error Handling

Errors are returned in JSON format with appropriate HTTP status codes:

```json
{
  "error": "Error message"
}
```
