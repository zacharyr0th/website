import { type Metadata } from 'next';
import { RootLayoutClient } from 'components/layout';

export const metadata: Metadata = {
  title: 'Sheet Music | Zachary Roth',
  description: 'Collection of sheet music and musical scores.',
};

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export default function SheetMusicPage() {
  return (
    <RootLayoutClient
      width="wide"
      pageHeader={{ title: 'Sheet Music' }}
      className="bg-gradient-to-b from-neutral-950 to-neutral-900"
    >
      <section className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 rounded-lg bg-surface/50 backdrop-blur">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-muted">Sheet music and scores will be available here.</p>
        </div>
      </section>
    </RootLayoutClient>
  );
}
