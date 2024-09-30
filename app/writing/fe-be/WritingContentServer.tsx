import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import {
  ContentType,
  ContentItem,
  WritingContentType,
  WritingMetadata,
  RecommendedWritingContent,
} from '@/lib/types';

const writingDirectory = path.join(process.cwd(), 'public', 'content', 'writing');
let cachedWritingMetadata: Map<string, WritingMetadata & { type: ContentType; data: any }> | null =
  null;

export async function getWritingContentData(slug: string): Promise<ContentItem> {
  if (!cachedWritingMetadata) {
    await getAllWritingMetadata();
  }

  const metadata = cachedWritingMetadata!.get(slug);
  if (!metadata) {
    throw new Error(`No metadata found for slug: ${slug}`);
  }

  const fullPath = path.join(writingDirectory, `${slug}.md`);
  const fileContents = await fs.readFile(fullPath, 'utf8');
  const { content } = matter(fileContents);

  return {
    id: slug,
    slug,
    content,
    title: metadata.title,
    description: metadata.data.description,
    author: metadata.data.author,
    date: metadata.data.date,
    image: metadata.data.image,
    readTime: metadata.data.readTime,
    tags: metadata.data.tags,
    type: metadata.type as ContentType,
    pageViews: 0,
    language: metadata.data.language,
    // Add these optional fields
    subtitle: metadata.data.subtitle,
    imageCaption: metadata.data.imageCaption,
    likes: metadata.data.likes,
    comments: metadata.data.comments,
    shares: metadata.data.shares,
    bookAuthor: metadata.data.bookAuthor,
    composer: metadata.data.composer,
    fileType: metadata.data.fileType,
  };
}

export async function getAllWritingMetadata(): Promise<
  Map<string, WritingMetadata & { type: ContentType; data: any }>
> {
  if (cachedWritingMetadata) return cachedWritingMetadata;

  try {
    const files = await fs.readdir(writingDirectory);
    const allWritingData = new Map<string, WritingMetadata & { type: ContentType; data: any }>();

    await Promise.all(
      files.map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(writingDirectory, fileName);
        const fileContents = await fs.readFile(fullPath, 'utf8');
        const { data } = matter(fileContents);
        allWritingData.set(slug, {
          slug,
          title: data.title,
          type: data.type as ContentType,
          data,
        });
      })
    );

    cachedWritingMetadata = allWritingData;
    return allWritingData;
  } catch (error) {
    console.error('Error reading writing metadata:', error);
    throw error;
  }
}

export async function getRecommendedWritingContent(
  currentSlug: string,
  count: number
): Promise<RecommendedWritingContent[]> {
  const allWriting = await getAllWritingMetadata();
  const filteredWriting = Array.from(allWriting.entries()).filter(([slug]) => slug !== currentSlug);

  // Fisher-Yates shuffle algorithm
  for (let i = filteredWriting.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filteredWriting[i], filteredWriting[j]] = [filteredWriting[j], filteredWriting[i]];
  }

  return filteredWriting.slice(0, count).map(([slug, data]) => ({
    title: data.title,
    image: '/placeholder.webp',
    link: `/writing/${slug}`,
  }));
}

export async function getWritingContent(type: WritingContentType): Promise<ContentItem[]> {
  const allContent = await getAllWritingMetadata();

  const filteredContent =
    type === 'all'
      ? Array.from(allContent.keys())
      : Array.from(allContent.entries())
          .filter(([, data]) => data.type === type)
          .map(([slug]) => slug);

  return Promise.all(filteredContent.map(getWritingContentData));
}
