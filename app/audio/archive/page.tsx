import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Audio Archive | Zachary Roth',
  description: 'Archive of audio content and compositions',
};

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export default function AudioArchivePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader title="Audio Archive" />
        <p className="mt-8 text-lg text-neutral-400">Coming soon...</p>
      </div>
    </div>
  );
} 