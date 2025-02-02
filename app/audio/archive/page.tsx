import { type Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import AudioPageLayout from '@/audio/components/AudioPageLayout';

export const metadata: Metadata = {
  title: 'Audio Archive | Zachary Roth',
  description: 'Archive of audio recordings and musical works.',
};

export default function AudioArchivePage() {
  return (
    <AudioPageLayout>
      <PageHeader title="Audio Archive" />
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 rounded-lg bg-surface/50 backdrop-blur">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-muted">Historical and archived audio content will be available here.</p>
        </div>
      </section>
    </AudioPageLayout>
  );
} 