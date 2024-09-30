import AudioArchive from './AudioArchive';

export default function ArchivePage() {
  return (
    <div className="audio-container">
      <main className="audio-main">
        <h1 className="audio-title">Audio Archive</h1>
        <hr className="audio-divider" />
        <AudioArchive initialAudioItems={[]} />
      </main>
    </div>
  );
}
