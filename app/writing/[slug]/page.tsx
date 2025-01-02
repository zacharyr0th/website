import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { notFound } from 'next/navigation';
import { validateFrontmatter, createArticleFromFrontmatter } from '../articles';
import ArticleContent from './ArticleContent';
import { Metadata } from 'next';

const articlesDirectory = path.join(process.cwd(), 'public/articles');

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = String(params.slug);
  return {
    title: `${slug} | Writing | Zachary Roth`,
  };
}

export default async function Page({ params }: Props) {
  const slug = String(params.slug);

  try {
    const filePath = path.join(articlesDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const validatedFrontmatter = validateFrontmatter(data);
    const article = createArticleFromFrontmatter(validatedFrontmatter, content, slug);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return <ArticleContent article={article} contentHtml={contentHtml} />;
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
