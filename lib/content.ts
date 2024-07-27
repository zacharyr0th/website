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
  description?: string; // Make description optional
  content: string;
  author: string;
  date: string;
}

const contentDirectory = path.join(process.cwd(), 'content', 'writing');

export function getContentItems(type?: 'article' | 'review' | 'interview'): ContentItem[] {
  const directories = type ? [type + 's'] : ['articles', 'reviews', 'interviews'];

  let allItems: ContentItem[] = [];

  directories.forEach((dir) => {
    const fullPath = path.join(contentDirectory, dir);
    if (!fs.existsSync(fullPath)) {
      console.warn(`Directory not found: ${fullPath}`);
      return;
    }
    const files = fs.readdirSync(fullPath);

    const items = files
      .map((file): ContentItem | null => {  // Explicitly type the return value
        const filePath = path.join(fullPath, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        
        if (!data.slug) {
          console.error(`Slug is missing in file: ${file}`);
          return null;
        }

        return {
          id: path.basename(file, '.md'),
          slug: data.slug,
          title: data.title,
          image: data.image || '/placeholder.jpg',
          pageViews: data.pageViews || 0,
          type: dir.slice(0, -1) as 'article' | 'review' | 'interview',
          description: data.description,
          content: content,
          author: data.author || 'Unknown',
          date: data.date || new Date().toISOString(),
        };
      })
      .filter((item): item is ContentItem => item !== null);

    allItems = [...allItems, ...items];
  });

  console.log('Loaded items:', allItems);
  return allItems;
}

export function getContentItem(slug: string): ContentItem | undefined {
  const allItems = getContentItems();
  return allItems.find(item => item.slug === slug);
}

export function getAllContentSlugs(): string[] {
  const allItems = getContentItems();
  return allItems.map(item => item.slug);
}