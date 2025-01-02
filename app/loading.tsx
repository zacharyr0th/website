export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4">
      <div className="space-y-4 w-full max-w-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface/50 rounded w-3/4" />
          <div className="space-y-2">
            <div className="h-4 bg-surface/50 rounded w-full" />
            <div className="h-4 bg-surface/50 rounded w-5/6" />
            <div className="h-4 bg-surface/50 rounded w-4/6" />
          </div>
        </div>
      </div>
    </div>
  );
}
