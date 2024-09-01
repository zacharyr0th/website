import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const writingDirectory = path.join(process.cwd(), 'app/writing/content');
let cachedWritingMetadata: Array<{ slug: string; title: string }> | null = null;

export async function getWritingContentData(slug: string) {
  try {
    const fullPath = path.join(writingDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      id: slug,
      slug,
      content,
      title: data.title,
      description: data.description,
      author: data.author,
      date: data.date,
      image: data.image,
      readTime: data.readTime,
      tags: data.tags,
      type: data.type,
      pageViews: 0,
      language: data.language,
    };
  } catch (error) {
    console.error(`Error reading file for slug ${slug}:`, error);
    throw error;
  }
}

export async function getAllWritingMetadata(): Promise<Array<{ slug: string; title: string }>> {
  if (cachedWritingMetadata) return cachedWritingMetadata;

  try {
    const files = await fs.readdir(writingDirectory);
    const allWritingData = await Promise.all(
      files.map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(writingDirectory, fileName);
        const fileContents = await fs.readFile(fullPath, 'utf8');
        const { data } = matter(fileContents);
        return { slug, title: data.title };
      })
    );
    cachedWritingMetadata = allWritingData;
    return allWritingData;
  } catch (error) {
    console.error('Error reading writing metadata:', error);
    throw error;
  }
}

export async function getRecommendedWritingContent(currentSlug: string, count: number) {
  const allWriting = await getAllWritingMetadata();
  const filteredWriting = allWriting.filter((article) => article.slug !== currentSlug);
  
  // Fisher-Yates shuffle algorithm
  for (let i = filteredWriting.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filteredWriting[i], filteredWriting[j]] = [filteredWriting[j], filteredWriting[i]];
  }

  return filteredWriting.slice(0, count).map((article) => ({
    title: article.title,
    image: '/placeholder.webp',
    link: `/writing/${article.slug}`,
  }));
}

export async function getWritingContent(type: 'all' | 'article' | 'review' | 'interview') {
  const files = await fs.readdir(writingDirectory);
  const allContent = await Promise.all(
    files.map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      return getWritingContentData(slug);
    })
  );
  return type === 'all' ? allContent : allContent.filter((content) => content.type === type);
}
