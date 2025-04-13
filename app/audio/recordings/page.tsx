import type { Metadata } from 'next';
import { RootLayoutClient } from 'components/layout';

export const metadata: Metadata = {
  title: 'Audio Recordings | Zachary Roth',
  description: 'Musical performances and recordings collection.',
};

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export default function AudioRecordingsPage() {
  return (
    <RootLayoutClient
      width="default"
      className="font-mono bg-gradient-to-b from-background to-surface/30"
      contentClassName="mx-auto space-y-12"
      pageHeader={{
        title: 'Audio Recordings',
      }}
    >
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 rounded-lg bg-surface/50 backdrop-blur">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-muted">Musical performances and recordings will be available here.</p>
        </div>
      </section>
    </RootLayoutClient>
  );
}
