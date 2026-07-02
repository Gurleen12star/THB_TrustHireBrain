// frontend/src/components/EmptyState.tsx
import React from "react";
import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title = "No candidates found",
  description = "Try adjusting your search query or filter tags to find matching profiles.",
  actionLabel,
  onAction
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-border rounded-[24px] bg-card/50 max-w-md mx-auto select-none mt-8">
      <div className="bg-secondary p-4 rounded-full text-muted-foreground mb-4">
        <FolderOpen className="h-8 w-8 stroke-[1.5]" />
      </div>
      <h4 className="font-bold text-base text-foreground mb-1.5">{title}</h4>
      <p className="text-xs text-muted-foreground max-w-[280px] leading-relaxed mb-5 font-medium">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="bg-primary text-primary-foreground text-xs font-bold py-2.5 px-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
