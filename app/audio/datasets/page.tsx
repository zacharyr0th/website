import { type Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';

export const metadata: Metadata = {
  title: 'Audio Datasets | Zachary Roth',
  description: 'Audio datasets for machine learning and research.',
};

export default function AudioDatasetsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader title="Audio Datasets" />
        <section className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 rounded-lg bg-surface/50 backdrop-blur">
            <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
            <p className="text-muted">
              Audio datasets and sample collections will be available here.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
