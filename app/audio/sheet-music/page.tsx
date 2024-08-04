import SheetMusicArchive from '../sheet-music-archive/SheetMusicArchive';
import { getContentItems } from '@/lib/content';
import type { ContentItem } from '@/lib/types';

type SheetMusicItem = ContentItem & { filename: string };

export default async function SheetMusicPage() {
  const sheetMusic: ContentItem[] = await getContentItems('sheet-music');

  // Transform ContentItem[] to SheetMusicItem[]
  const sheetMusicWithFilename: SheetMusicItem[] = sheetMusic.map((item) => ({
    ...item,
    filename: item.slug + '.pdf',
  }));

  return <SheetMusicArchive initialSheetMusic={sheetMusicWithFilename} />;
}
