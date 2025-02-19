import { type Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import AudioPageLayout from '@/audio/components/AudioPageLayout';

export const metadata: Metadata = {
  title: 'Audio Recordings | Zachary Roth',
  description: 'Collection of musical performances and recordings.',
};

export default function AudioRecordingsPage() {
  return (
    <AudioPageLayout>
      <PageHeader title="Audio Recordings" />
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 rounded-lg bg-surface/50 backdrop-blur">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-muted">Musical performances and recordings will be available here.</p>
        </div>
      </section>
    </AudioPageLayout>
  );
}
