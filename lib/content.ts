import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ContentItem } from './types';

export async function getContentItems(
  type?: 'article' | 'review' | 'interview'
): Promise<ContentItem[]> {
  const directories = type ? [type + 's'] : ['articles', 'reviews', 'interviews'];
  const contentDirectory = path.join(process.cwd(), 'content', 'writing');

  let allItems: ContentItem[] = [];
  const usedIds = new Set();

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
          const metadataMatch = fileContents.match(/export\s+const\s+metadata\s*:\s*ContentItem\s*=\s*({[\s\S]*?});/);
          
          if (metadataMatch) {
            const metadataString = metadataMatch[1];
            data = eval(`(${metadataString})`);
          }
          const contentMatch = fileContents.match(/<article>([\s\S]*?)<\/article>/);
          if (contentMatch) {
            content = contentMatch[1].trim();
          }
        }

        if (data && data.slug) {
          const publicDir = path.join(process.cwd(), 'public');
          const imagePath = path.join(publicDir, data.image);
          const imageExists = await fs.access(imagePath).then(() => true).catch(() => false);

          // Ensure unique IDs
          if (usedIds.has(data.id)) {
            console.warn(`Duplicate ID found: ${data.id}. Generating a new ID.`);
            data.id = `${data.id}-${Date.now()}`;
          }
          usedIds.add(data.id);

          allItems.push({
            ...data,
            content,
            type: dir.slice(0, -1) as 'article' | 'review' | 'interview',
            image: imageExists ? data.image : '/images/placeholder.webp',
          });
        }
      }
    }
  }

  console.log('Loaded items:', allItems);
  return allItems;
}

export async function getReviewItems(): Promise<ContentItem[]> {
  return getContentItems('review');
}

export async function getContentItem(slug: string): Promise<ContentItem | undefined> {
  const allItems = await getContentItems();
  return allItems.find((item) => item.slug === slug);
}

export async function getAllContentSlugs(): Promise<string[]> {
  const allItems = await getContentItems();
  return allItems.map((item) => item.slug);
}