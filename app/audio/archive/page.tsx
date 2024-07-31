import AudioArchive from './AudioArchive';
import { getAudioItems } from '../../../lib/audio';
import type { AudioItem } from '@/lib/types';

export default async function ArchivePage() {
  const audioItems: AudioItem[] = await getAudioItems();
  return (
    <div className="audio-container">
      <main className="audio-main">
        <h1 className="audio-title">Audio Archive</h1>
        <hr className="audio-divider" />
        <AudioArchive initialAudioItems={audioItems} />
      </main>
    </div>
  );
}