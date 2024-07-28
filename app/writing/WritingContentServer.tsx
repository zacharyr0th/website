import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const writingDirectory = path.join(process.cwd(), 'app/writing/content');

export async function getWritingContentData(slug: string) {
  const fullPath = path.join(writingDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
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
  };
}

export async function getAllWritingMetadata(): Promise<Array<{ slug: string; title: string }>> {
  const files = fs.readdirSync(writingDirectory);
  const allWritingData = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(writingDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return {
      slug,
      title: data.title,
    };
  });
  return allWritingData;
}

export async function getRecommendedWritingContent(currentSlug: string, count: number) {
  const allWriting = await getAllWritingMetadata();
  const filteredWriting = allWriting.filter((article) => article.slug !== currentSlug);
  const shuffled = filteredWriting.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((article) => ({
    title: article.title,
    image: '/placeholder.webp',
    link: `/writing/${article.slug}`,
  }));
}

export async function getWritingContent(type: 'all' | 'article' | 'review' | 'interview') {
  const files = fs.readdirSync(writingDirectory);
  const allContent = await Promise.all(
    files.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      return await getWritingContentData(slug);
    })
  );
  if (type === 'all') {
    return allContent;
  } else {
    return allContent.filter((content) => content.type === type);
  }
}