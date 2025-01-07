import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import remarkImages from 'remark-images';
import remarkParse from 'remark-parse';
import { notFound } from 'next/navigation';
import { validateFrontmatter, createArticleFromFrontmatter } from '../articles';
import ArticleContent from './ArticleContent';
import type { Metadata } from 'next';
import { cache } from 'react';
import { ARTICLE_CONFIG } from '../types';

const articlesDirectory = path.join(process.cwd(), ARTICLE_CONFIG.directory);

// Enhanced markdown processor with better configuration
const processMarkdown = cache(async (content: string) => {
  const result = await remark()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkImages)
    .use(html)
    .process(content);

  return result.toString()
    // Add responsive image classes
    .replace(/<img/g, '<img class="responsive-image" loading="lazy"')
    // Add figure classes
    .replace(/<figure/g, '<figure class="image-figure"')
    // Add caption classes
    .replace(/<figcaption/g, '<figcaption class="image-caption"')
    // Add syntax highlighting classes
    .replace(/<pre><code class="language-(\w+)">/g, (_, lang) => 
      `<pre><code class="language-${lang} syntax-highlighted">`);
});

// Cache article loading
const loadArticle = cache(async (slug: string) => {
  try {
    const filePath = path.join(articlesDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const validatedFrontmatter = validateFrontmatter(data);
    return { frontmatter: validatedFrontmatter, content };
  } catch (error) {
    console.error(`Error loading article ${slug}:`, error);
    return null;
  }
});

// Get all articles sorted by date
const getAllArticles = cache(async () => {
  try {
    const fileNames = await fs.readdir(articlesDirectory);
    const articles = await Promise.all(
      fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(async fileName => {
          const slug = fileName.replace(/\.md$/, '');
          const article = await loadArticle(slug);
          if (!article) return null;
          return createArticleFromFrontmatter(article.frontmatter, article.content, slug);
        })
    );

    return articles
      .filter(article => article !== null)
      .sort((a, b) => {
        if (!a || !b) return 0;
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
      });
  } catch (error) {
    console.error('Error getting all articles:', error);
    return [];
  }
});

export async function generateMetadata(props: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = String(props.params.slug);
  const article = await loadArticle(slug);
  
  if (!article) {
    return {
      title: 'Article Not Found | Writing | Zachary Roth',
    };
  }

  return {
    title: `${article.frontmatter.title} | Writing | Zachary Roth`,
    description: article.frontmatter.description || null,
    openGraph: article.frontmatter.image ? {
      images: [{ url: article.frontmatter.image.src, alt: article.frontmatter.image.alt }],
    } : null,
  };
}

export default async function Page(props: {
  params: { slug: string };
}) {
  const slug = String(props.params.slug);

  try {
    const article = await loadArticle(slug);
    if (!article) {
      notFound();
    }

    const { frontmatter, content } = article;
    const processedArticle = createArticleFromFrontmatter(frontmatter, content, slug);
    const processedContent = await processMarkdown(content);

    // Get adjacent articles
    const allArticles = await getAllArticles();
    const currentIndex = allArticles.findIndex(a => a?.slug === slug);
    const nextArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : undefined;
    const prevArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : undefined;

    return (
      <div className="content-page font-mono bg-gradient-to-b from-background to-surface/30">
        <main className="container mx-auto px-3 sm:px-6 md:px-8 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-20 md:pb-28 max-w-[98vw] md:max-w-[90vw]">
          <div className="mx-auto max-w-[var(--article-width)]">
            <ArticleContent 
              article={processedArticle} 
              contentHtml={processedContent}
              nextArticle={nextArticle ?? undefined}
              prevArticle={prevArticle ?? undefined}
            />
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    const fileNames = await fs.readdir(articlesDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => ({
        slug: fileName.replace(/\.md$/, ''),
      }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
