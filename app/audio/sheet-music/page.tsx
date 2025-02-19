import { type Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import AudioPageLayout from '@/audio/components/AudioPageLayout';

export const metadata: Metadata = {
  title: 'Sheet Music | Zachary Roth',
  description: 'Collection of musical scores and sheet music.',
};

export default function SheetMusicPage() {
  return (
    <AudioPageLayout>
      <PageHeader title="Sheet Music" />
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 rounded-lg bg-surface/50 backdrop-blur">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-muted">Musical scores and sheet music will be available here.</p>
        </div>
      </section>
    </AudioPageLayout>
  );
}
