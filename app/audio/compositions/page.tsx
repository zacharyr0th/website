import { type Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import AudioPageLayout from '@/audio/components/AudioPageLayout';

export const metadata: Metadata = {
  title: 'Audio Compositions | Zachary Roth',
  description: 'Original musical compositions and arrangements.',
};

export default function AudioCompositionsPage() {
  return (
    <AudioPageLayout>
      <PageHeader title="Audio Compositions" />
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 rounded-lg bg-surface/50 backdrop-blur">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-muted">Original compositions and arrangements will be available here.</p>
        </div>
      </section>
    </AudioPageLayout>
  );
} 