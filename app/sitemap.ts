import type { MetadataRoute } from 'next';
import { getArticles } from '@/writing/lib/articles';
import { PROJECTS } from '@/projects/projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const articles = await getArticles();

  // Static routes
  const staticRoutes = [
    { route: '', priority: 1.0 },
    { route: '/writing', priority: 0.9 },
    { route: '/projects', priority: 0.8 },
    { route: '/audio', priority: 0.8 },
    { route: '/audio/archive', priority: 0.7 },
  ].map(({ route, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority,
  }));

  // Article routes
  const articleRoutes = articles.map((article) => ({
    url: `${baseUrl}/writing/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'weekly' as const,
    priority: article.frontmatter.featured ? 0.9 : 0.6,
  }));

  // Project routes
  const projectRoutes = PROJECTS.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: project.publishDate ? new Date(project.publishDate) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // API routes
  const apiRoutes = [
    { route: '/api/articles', priority: 0.6 },
    { route: '/api/projects', priority: 0.6 },
  ].map(({ route, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'hourly' as const,
    priority,
  }));

  // Resource routes
  const resourceRoutes = [
    { route: '/manifest.json', priority: 0.4 },
    { route: '/robots.txt', priority: 0.4 },
    { route: '/sitemap.xml', priority: 0.4 },
  ].map(({ route, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority,
  }));

  return [...staticRoutes, ...articleRoutes, ...projectRoutes, ...apiRoutes, ...resourceRoutes];
} 