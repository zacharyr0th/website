import SheetMusicArchive from '../sheet-music-archive/SheetMusicArchive';
import { getContentItems } from '@/lib/content';
import type { ContentItem } from '@/lib/types';

export default async function SheetMusicPage() {
  const sheetMusic: ContentItem[] = await getContentItems('sheet-music');
  return <SheetMusicArchive initialSheetMusic={sheetMusic} />;
}