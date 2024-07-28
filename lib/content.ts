import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import yaml from 'js-yaml';

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

interface FrontMatterData {
  slug: string;
  title: string;
  subtitle?: string;
  image?: string;
  imageCaption?: string;
  pageViews?: number;
  description?: string;
  author?: string;
  date?: string;
  tags?: string[];
  readTime?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  bookAuthor?: string;
}

function isFrontMatterData(data: unknown): data is FrontMatterData {
  return typeof data === 'object' && data !== null && 'slug' in data && 'title' in data;
}

const contentDirectory = path.join(process.cwd(), 'content', 'writing');

export async function getContentItems(
  type?: 'article' | 'review' | 'interview'
): Promise<ContentItem[]> {
  const directories = type ? [type + 's'] : ['articles', 'reviews', 'interviews'];
  const contentDirectory = path.join(process.cwd(), 'content', 'writing');

  let allItems: ContentItem[] = [];

  for (const dir of directories) {
    const fullPath = path.join(contentDirectory, dir);
    try {
      await fs.access(fullPath);
    } catch {
      console.warn(`Directory not found: ${fullPath}`);
      continue;
    }

    const files = await fs.readdir(fullPath);

    const items = await Promise.all(
      files
        .filter((file) => file.endsWith('.md') || file.endsWith('.tsx'))
        .map(async (file): Promise<ContentItem | null> => {
          const filePath = path.join(fullPath, file);
          let fileContents: string;

          try {
            fileContents = await fs.readFile(filePath, 'utf8');
          } catch (error) {
            console.error(`Error reading file ${file}:`, error);
            return null;
          }

          let data: FrontMatterData | null = null;
          let content: string = '';

          if (file.endsWith('.md')) {
            const parsed = matter(fileContents);
            data = parsed.data as FrontMatterData;
            content = parsed.content;
          } else if (file.endsWith('.tsx')) {
            const match = fileContents.match(/\/\*\s*---\n([\s\S]*?)\n---\s*\*\/([\s\S]*)/);
            if (match) {
              try {
                data = yaml.load(match[1]) as FrontMatterData;
                content = match[2];
              } catch (error) {
                console.error(`Error parsing frontmatter in file ${file}:`, error);
                return null;
              }
            } else {
              console.error(`Invalid frontmatter in file: ${file}`);
              return null;
            }
          }

          if (!data || !isFrontMatterData(data)) {
            console.error(`Invalid or missing frontmatter in file: ${file}`);
            return null;
          }

          return {
            id: path.basename(file, path.extname(file)),
            slug: data.slug,
            title: data.title,
            subtitle: data.subtitle,
            image: data.image || '/placeholder.jpg',
            imageCaption: data.imageCaption,
            pageViews: data.pageViews || 0,
            type: dir.slice(0, -1) as 'article' | 'review' | 'interview',
            description: data.description,
            content: content,
            author: data.author || 'Unknown',
            date: data.date || new Date().toISOString(),
            tags: data.tags || [],
            readTime: data.readTime,
            likes: data.likes || 0,
            comments: data.comments || 0,
            shares: data.shares || 0,
            bookAuthor: data.bookAuthor,
          };
        })
    );

    allItems = [...allItems, ...items.filter((item): item is ContentItem => item !== null)];
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
