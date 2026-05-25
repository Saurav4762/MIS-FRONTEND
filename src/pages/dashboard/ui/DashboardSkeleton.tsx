export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-lg border border-[#1a2742] bg-[#081428] p-6"
          >
            <div className="h-4 w-24 rounded bg-slate-700"></div>
            <div className="mt-2 h-8 w-32 rounded bg-slate-700"></div>
          </div>
        ))}
      </div>

      {/* Pie Chart Skeleton */}
      <div className="animate-pulse rounded-lg border border-[#1a2742] bg-[#081428] p-6">
        <div className="h-6 w-48 rounded bg-slate-700"></div>
        <div className="mt-6 h-80 w-full rounded bg-slate-700"></div>
      </div>
    </div>
  );
}

