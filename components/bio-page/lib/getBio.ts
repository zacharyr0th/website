import { promises as fs } from 'fs';
import path from 'path';

export async function getBio() {
  try {
    const bioPath = path.join(process.cwd(), 'app/bio/lib/fullbio.md');
    const content = await fs.readFile(bioPath, 'utf8');
    return content;
  } catch (error) {
    console.error('Error reading bio file:', error);
    throw new Error('Failed to load bio content');
  }
}
