import { Skeleton } from "@/components/design-system/skeleton";

export function SkeletonMetricCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-4" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <Skeleton className="h-10 w-full mt-4" />
    </div>
  );
}

export function SkeletonChart({ className = "h-[350px]" }: { className?: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-6 flex flex-col">
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <Skeleton className={`w-full ${className}`} />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="p-4 border-b border-border/50 bg-muted/20">
        <div className="flex space-x-4">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-6 w-1/4" />
        </div>
      </div>
      <div className="divide-y divide-border/50">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4 flex space-x-4">
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-5 w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonExecutiveSummary() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-6">
      <Skeleton className="h-6 w-1/3" />
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Skeleton className="h-5 w-5 rounded-full shrink-0" />
          <Skeleton className="h-5 w-full" />
        </div>
        <div className="flex items-start space-x-3">
          <Skeleton className="h-5 w-5 rounded-full shrink-0" />
          <Skeleton className="h-5 w-5/6" />
        </div>
        <div className="flex items-start space-x-3">
          <Skeleton className="h-5 w-5 rounded-full shrink-0" />
          <Skeleton className="h-5 w-4/5" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonSidebar() {
  return (
    <div className="h-full w-full bg-card border-r border-border p-4 flex flex-col space-y-8">
      <div className="flex items-center space-x-3 px-2">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded-md" />
        ))}
      </div>
    </div>
  );
}
