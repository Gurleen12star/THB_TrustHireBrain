// frontend/src/components/Skeletons.tsx
import React from "react";

export function CardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm animate-pulse-slow">
      <div className="h-4 w-1/3 bg-secondary rounded mb-4"></div>
      <div className="space-y-3">
        <div className="h-8 bg-secondary rounded w-2/3"></div>
        <div className="h-3 bg-secondary rounded w-full"></div>
      </div>
    </div>
  );
}

export function MetricsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full mb-6">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="bg-card border border-border rounded-[24px] p-5 shadow-sm animate-pulse-slow">
          <div className="flex items-center justify-between">
            <div className="space-y-2.5 w-2/3">
              <div className="h-3 bg-secondary rounded w-4/5"></div>
              <div className="h-6 bg-secondary rounded w-full"></div>
              <div className="h-3 bg-secondary rounded w-2/3"></div>
            </div>
            <div className="h-10 w-10 bg-secondary rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="space-y-4 w-full animate-pulse-slow">
      <div className="grid grid-cols-12 pb-2 border-b border-border/50 px-2">
        <div className="h-3 bg-secondary rounded col-span-1 w-1/2"></div>
        <div className="h-3 bg-secondary rounded col-span-4 w-2/3"></div>
        <div className="h-3 bg-secondary rounded col-span-3 w-2/3"></div>
        <div className="h-3 bg-secondary rounded col-span-2 w-1/2"></div>
        <div className="h-3 bg-secondary rounded col-span-2 w-1/3 text-right"></div>
      </div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="grid grid-cols-12 items-center py-3.5 px-2 bg-card border border-border/50 rounded-2xl">
          <div className="col-span-1"><div className="h-4 w-4 bg-secondary rounded-full"></div></div>
          <div className="col-span-4 flex items-center gap-3">
            <div className="h-9 w-9 bg-secondary rounded-full"></div>
            <div className="space-y-1.5 w-1/2">
              <div className="h-3.5 bg-secondary rounded w-full"></div>
              <div className="h-2.5 bg-secondary rounded w-2/3"></div>
            </div>
          </div>
          <div className="col-span-3 px-2"><div className="h-3 bg-secondary rounded w-3/4"></div></div>
          <div className="col-span-2 text-center"><div className="h-4 bg-secondary rounded w-1/3 mx-auto"></div></div>
          <div className="col-span-2 text-right"><div className="h-4 bg-secondary rounded w-1/3 ml-auto"></div></div>
        </div>
      ))}
    </div>
  );
}
