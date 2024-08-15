import { promises as fs } from 'fs';
import path from 'path';
import { ContentItem } from './types';
import { addMetadataToFile } from './fileMetadata';

export async function getContentItems(
  type: 'article' | 'review' | 'interview' | 'sheet-music' | undefined
): Promise<ContentItem[]> {
  const directories = type
    ? [type === 'sheet-music' ? 'sheet-music' : type + 's']
    : ['articles', 'reviews', 'interviews', 'sheet-music'];
  const contentDirectory = path.join(process.cwd(), 'content', 'writing');

  let allItems: ContentItem[] = [];
  const usedIds = new Set();

  for (const dir of directories) {
    const fullPath =
      dir === 'sheet-music'
        ? path.join(process.cwd(), 'content', 'audio', 'sheet-music')
        : path.join(contentDirectory, dir);
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
      if (file.endsWith('.tsx') || (dir === 'sheet-music' && ['.pdf', '.mscz', '.zip'].includes(path.extname(file)))) {
        const filePath = path.join(fullPath, file);
        let data: any = {};
        let content: string = '';

        if (dir === 'sheet-music') {
          // For sheet music files, create minimal metadata
          data = {
            id: path.parse(file).name,
            slug: path.parse(file).name,
            title: path.parse(file).name,
            type: 'sheet-music',
            fileType: path.extname(file).slice(1),
          };

          // Add metadata to the file
          try {
            await addMetadataToFile(filePath, {
              composer: data.composer || 'Unknown',
              name: data.title,
              tags: data.tags || [],
            });
          } catch (error) {
            console.error(`Failed to add metadata to file: ${filePath}`, error);
            // Continue processing other files even if metadata addition fails for one
          }
        } else if (file.endsWith('.tsx')) {
          const fileContents = await fs.readFile(filePath, 'utf8');
          const metadataMatch = fileContents.match(
            /export\s+const\s+metadata\s*:\s*ContentItem\s*=\s*({[\s\S]*?});/
          );

          if (metadataMatch) {
            const metadataString = metadataMatch[1];
            try {
              data = eval(`(${metadataString})`);
            } catch (error) {
              console.warn(`Failed to parse metadata for file: ${file}`, error);
              continue;
            }
          } else {
            console.warn(`No metadata found for file: ${file}`);
            continue;
          }

          const contentMatch = fileContents.match(/<article>([\s\S]*?)<\/article>/);
          if (contentMatch) {
            content = contentMatch[1].trim();
          } else {
            console.warn(`No content found for file: ${file}`);
          }
        }

        // Add language detection
        const fileNameParts = path.parse(file).name.split('-');
        const language =
          fileNameParts[fileNameParts.length - 1].length === 2 ? fileNameParts.pop() : 'en'; // Default to English if no language code is found

        data = {
          ...data,
          language, // Add the language to the metadata
        };

        if (data && data.slug) {
          const publicDir = path.join(process.cwd(), 'public');
          const imagePath = path.join(publicDir, data.image || '');
          const imageExists = await fs
            .access(imagePath)
            .then(() => true)
            .catch(() => false);

          // Ensure unique IDs
          if (usedIds.has(data.id)) {
            console.warn(`Duplicate ID found: ${data.id}. Generating a new ID.`);
            data.id = `${data.id}-${Date.now()}`;
          }
          usedIds.add(data.id);

          allItems.push({
            ...data,
            content,
            type:
              dir === 'sheet-music'
                ? 'sheet-music'
                : (dir.slice(0, -1) as 'article' | 'review' | 'interview'),
            image: imageExists ? data.image : '/images/placeholder.webp',
            language: data.language || 'en', // Ensure language is always set
          });
        } else {
          console.warn(`Missing slug or invalid data for file: ${file}`);
        }
      }
    }
  }

  console.log('Loaded items:', allItems.length);
  return allItems;
}

export async function getReviewItems(): Promise<ContentItem[]> {
  return getContentItems('review');
}

export async function getContentItem(slug: string): Promise<ContentItem | undefined> {
  const allItems = await getContentItems(undefined);
  return allItems.find((item) => item.slug === slug);
}

export async function getAllContentSlugs(): Promise<string[]> {
  const contentItems = await getContentItems(undefined);
  const regularSlugs = contentItems.map((item) => item.slug);

  const sheetMusicDir = path.join(process.cwd(), 'content', 'audio', 'sheet-music');
  let sheetMusicSlugs: string[] = [];

  try {
    const sheetMusicFiles = await fs.readdir(sheetMusicDir);
    sheetMusicSlugs = sheetMusicFiles
      .filter((file) => ['.pdf', '.mscz', '.zip'].includes(path.extname(file)))
      .map((file) => path.parse(file).name);
    console.log(`Found ${sheetMusicSlugs.length} sheet music files`);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      console.warn(`Sheet music directory not found: ${sheetMusicDir}`);
    } else {
      console.error(`Error reading sheet music directory: ${error}`);
    }
  }

  return [...regularSlugs, ...sheetMusicSlugs];
}