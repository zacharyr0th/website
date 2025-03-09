import { type Metadata } from 'next';
import { RootLayoutClient } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Audio Compositions | Zachary Roth',
  description: 'Original music compositions and arrangements.',
};

export default function AudioCompositionsPage() {
  return (
    <RootLayoutClient
      width="wide"
      pageHeader={{ title: 'Audio Compositions' }}
      className="bg-gradient-to-b from-neutral-950 to-neutral-900"
    >
      <section className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 rounded-lg bg-surface/50 backdrop-blur">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-muted">
            Original compositions and arrangements will be available here.
          </p>
        </div>
      </section>
    </RootLayoutClient>
  );
}
