import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface ContentItem {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  image: string;
  imageCaption?: string;
  pageViews: number;
  type: 'article' | 'review' | 'interview';
  description?: string;
  content: string;
  author: string;
  date: string;
  tags?: string[];
  readTime?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  bookAuthor?: string; // For reviews
}

export async function getContentItems(
  type?: 'article' | 'review' | 'interview'
): Promise<ContentItem[]> {
  const directories = type ? [type + 's'] : ['articles', 'reviews', 'interviews'];
  const contentDirectory = path.join(process.cwd(), 'content', 'writing');

  console.log('Content directory:', contentDirectory);

  let allItems: ContentItem[] = [];

  for (const dir of directories) {
    const fullPath = path.join(contentDirectory, dir);
    console.log('Checking directory:', fullPath);

    try {
      await fs.access(fullPath);
    } catch {
      console.warn(`Directory not found: ${fullPath}`);
      continue;
    }

    const files = await fs.readdir(fullPath);
    console.log(`Found ${files.length} files in ${dir}:`, files);

    for (const file of files) {
      if (file.endsWith('.md') || file.endsWith('.tsx')) {
        const filePath = path.join(fullPath, file);
        const fileContents = await fs.readFile(filePath, 'utf8');
        
        let data: any;
        let content: string = '';

        if (file.endsWith('.md')) {
          const { data: frontmatter, content: mdContent } = matter(fileContents);
          data = frontmatter;
          content = mdContent;
        } else if (file.endsWith('.tsx')) {
          const metadataMatch = fileContents.match(/export const metadata = ({[\s\S]*?});/);
          const contentMatch = fileContents.match(/<article>([\s\S]*?)<\/article>/);
          
          if (metadataMatch) {
            data = eval(`(${metadataMatch[1]})`);
          }
          if (contentMatch) {
            content = contentMatch[1].trim();
          }
        }

        if (data && data.slug) {
          allItems.push({
            ...data,
            content,
            type: dir.slice(0, -1) as 'article' | 'review' | 'interview',
          });
        }
      }
    }
  }

  console.log('Loaded items:', allItems);
  return allItems;
}

export async function getContentItem(slug: string): Promise<ContentItem | undefined> {
  const allItems = await getContentItems();
  return allItems.find((item) => item.slug === slug);
}

export async function getAllContentSlugs(): Promise<string[]> {
  const allItems = await getContentItems();
  return allItems.map((item) => item.slug);
}