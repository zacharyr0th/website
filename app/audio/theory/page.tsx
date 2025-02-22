import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import AudioPageLayout from '@/audio/components/AudioPageLayout';

export const metadata: Metadata = {
  title: 'Music Theory | Zachary Roth',
  description: 'Music theory concepts, analysis, and resources.',
};

export default function MusicTheoryPage() {
  return (
    <AudioPageLayout>
      <PageHeader title="Music Theory" />
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 rounded-lg bg-surface/50 backdrop-blur">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-muted">Music theory resources and analysis will be available here.</p>
        </div>
      </section>
    </AudioPageLayout>
  );
}
