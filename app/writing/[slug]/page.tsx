import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { notFound } from 'next/navigation';
import { validateFrontmatter, createArticleFromFrontmatter } from '@/app/lib/utils/articles';
import ArticleContent from './ArticleContent';

const articlesDirectory = path.join(process.cwd(), 'public/articles');

interface ArticlePageProps {
  params: { slug: string };
}

export default async function ArticlePage({ params: { slug } }: ArticlePageProps) {
  try {
    const filePath = path.join(articlesDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const validatedFrontmatter = validateFrontmatter(data);
    const article = createArticleFromFrontmatter(validatedFrontmatter, content, slug);
    const serializedContent = await serialize(content, {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
    });

    return (
      <div className="content-page font-mono bg-gradient-to-b from-background to-surface/30">
        <main className="container mx-auto">
          <ArticleContent article={article} serializedContent={serializedContent} />
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
