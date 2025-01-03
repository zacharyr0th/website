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
import { Metadata } from 'next';
import { cache } from 'react';

const articlesDirectory = path.join(process.cwd(), 'public/articles');

interface PageParams {
  slug: string;
}

// Cache markdown processing
const processMarkdown = cache(async (content: string) => {
  const result = await remark()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkImages)
    .use(html, { sanitize: false })
    .process(content);
  return result.toString();
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

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const slug = String(params.slug);
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

export default async function Page({ params }: { params: PageParams }) {
  const slug = String(params.slug);

  try {
    const article = await loadArticle(slug);
    if (!article) {
      notFound();
    }

    const { frontmatter, content } = article;
    const processedArticle = createArticleFromFrontmatter(frontmatter, content, slug);
    const processedContent = await processMarkdown(content);

    return (
      <div className="content-page font-mono bg-gradient-to-b from-background to-surface/30">
        <main className="container mx-auto px-6 sm:px-8 pt-24 sm:pt-36">
          <ArticleContent article={processedArticle} contentHtml={processedContent} />
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}

export async function generateStaticParams(): Promise<PageParams[]> {
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
