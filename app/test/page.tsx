import ErrorTest from './ErrorTest/ErrorTest';

export default function TestPage() {
  return (
    <div className="content-page font-mono bg-gradient-to-b from-background to-surface/30 min-h-screen">
      <main className="container mx-auto px-6 sm:px-8 pt-24 sm:pt-36">
        <ErrorTest />
      </main>
    </div>
  );
}
