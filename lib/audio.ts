import { AudioItem } from './types';
import { getAllAudioData } from './audioContent';

export async function getAudioItems(): Promise<AudioItem[]> {
  return getAllAudioData();
}

export async function getAudioItemBySlug(slug: string): Promise<AudioItem | null> {
  const allItems = await getAudioItems();
  return allItems.find(item => item.slug === slug) || null;
}

export async function searchAudioItems(query: string): Promise<AudioItem[]> {
  const allItems = await getAudioItems();
  const lowercaseQuery = query.toLowerCase();
  return allItems.filter(audio => 
    audio.title.toLowerCase().includes(lowercaseQuery) ||
    (audio.tags && audio.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))) ||
    audio.content.toLowerCase().includes(lowercaseQuery)
  );
}