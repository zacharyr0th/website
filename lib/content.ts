import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface ContentItem {
  id: string;
  slug: string;
  title: string;
  image: string;
  pageViews: number;
  type: 'article' | 'review' | 'interview';
  description?: string;
  content?: string; // Added this line to include content
}

const contentDirectory = path.join(process.cwd(), 'content', 'writing');

export function getContentItems(type?: 'article' | 'review' | 'interview'): ContentItem[] {
  const directories = type ? [type] : ['articles', 'reviews', 'interviews'];
  
  const items: ContentItem[] = [];

  directories.forEach(dir => {
    const fullPath = path.join(contentDirectory, dir);
    const files = fs.readdirSync(fullPath);

    files.forEach(file => {
      const filePath = path.join(fullPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      items.push({
        id: path.basename(file, '.md'),
        slug: data.slug,
        title: data.title,
        image: data.image,
        pageViews: data.pageViews,
        type: dir.slice(0, -1) as 'article' | 'review' | 'interview',
        description: data.description,
      });
    });
  });

  return items;
}