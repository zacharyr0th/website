import fs from 'fs';
import path from 'path';
import { AudioItem } from './types';

const audioDirectory = path.join(process.cwd(), 'content', 'audio');

export function getAudioFiles(): string[] {
  const categories = ['recordings', 'compositions', 'theory', 'sheet-music', 'datasets'];
  const audioExtensions = ['.wav', '.mp3', '.mp4', '.ogg', '.flac'];
  let files: string[] = [];

  categories.forEach((category) => {
    const categoryPath = path.join(audioDirectory, category);
    if (fs.existsSync(categoryPath)) {
      const categoryFiles = fs
        .readdirSync(categoryPath)
        .filter((file) => audioExtensions.some((ext) => file.endsWith(ext)))
        .map((file) => path.join(category, file));
      files = files.concat(categoryFiles);
    }
  });

  return files;
}

export function getAudioData(filename: string): AudioItem {
  const fullPath = path.join(audioDirectory, filename);
  const stats = fs.statSync(fullPath);
  const extension = path.extname(filename);

  // Basic metadata extraction (you might want to use a library for more detailed info)
  const data = {
    id: path.basename(filename, extension),
    slug: path.basename(filename, extension),
    title: path.basename(filename, extension),
    type: path.dirname(filename).split(path.sep).pop() as AudioItem['type'],
    date: stats.mtime.toISOString(),
    duration: '00:00', // You'd need to implement actual duration extraction
    fileType: extension.slice(1), // Remove the leading dot
    fileSize: stats.size,
  };

  return {
    ...data,
    artist: '',
    tags: [],
    image: '',
    content: '',
  };
}

export function getAllAudioData(): AudioItem[] {
  const audioFiles = getAudioFiles();
  return audioFiles.map((filename) => getAudioData(filename));
}
