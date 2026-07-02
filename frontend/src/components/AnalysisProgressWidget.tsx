"use client";

import React from "react";
import { Check, Loader2, Circle, AlertCircle } from "lucide-react";
import { AnalysisProgress } from "@/types";

interface AnalysisProgressWidgetProps {
  progress: AnalysisProgress;
}

export default function AnalysisProgressWidget({ progress }: AnalysisProgressWidgetProps) {
  // SVG circular ring variables
  const radius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress.progress_percentage / 100) * circumference;

  return (
    <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm flex flex-col justify-between h-full select-none transition-colors duration-200">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-lg text-foreground">Analysis Progress</h3>
        </div>

        {/* Grid layout: Stepper on left, ring details on right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Column: Stepper list */}
          <div className="md:col-span-7 space-y-3">
            {progress.steps.map((step) => (
              <div key={step.id} className="flex items-center gap-3.5">
                {/* Step indicator */}
                <div className="shrink-0 flex items-center justify-center">
                  {step.status === "completed" && (
                    <div className="h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                  )}
                  {step.status === "in_progress" && (
                    <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin flex items-center justify-center" />
                  )}
                  {step.status === "pending" && (
                    <div className="h-5 w-5 rounded-full border border-muted-foreground/30 flex items-center justify-center">
                      <Circle className="h-3 w-3 text-muted-foreground/30 fill-none" />
                    </div>
                  )}
                </div>

                {/* Step text info */}
                <div className="flex flex-col">
                  <span className={`text-xs font-bold leading-none ${
                    step.status === "completed" 
                      ? "text-foreground/90" 
                      : step.status === "in_progress" 
                      ? "text-primary" 
                      : "text-muted-foreground"
                  }`}>
                    {step.step_name}
                  </span>
                  <span className="text-[9px] text-muted-foreground mt-0.5 capitalize">
                    {step.status === "in_progress" ? "In Progress..." : step.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Progress ring */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            {/* SVG Progress Ring */}
            <div className="relative flex items-center justify-center">
              <svg className="w-32 h-32 transform -rotate-90">
                {/* Background Ring */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  className="stroke-secondary dark:stroke-secondary/35 fill-none"
                  strokeWidth={strokeWidth}
                />
                {/* Progress Ring */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  className="stroke-emerald-500 fill-none transition-all duration-700 ease-out"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              {/* Overlay text */}
              <div className="absolute flex flex-col items-center text-center">
                <span className="text-2xl font-black text-foreground">
                  {progress.progress_percentage}%
                </span>
                <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-wider leading-none mt-0.5">
                  Analysis
                </span>
                <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-wider leading-none mt-0.5">
                  Complete
                </span>
              </div>
            </div>

            {/* Timing statistics */}
            <div className="mt-4 w-full grid grid-cols-2 border-t border-border/50 pt-3 text-center">
              <div className="border-r border-border/50 pr-2">
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Elapsed Time
                </span>
                <span className="text-xs font-bold text-foreground block mt-0.5">
                  {progress.elapsed_time}
                </span>
              </div>
              <div className="pl-2">
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Remaining
                </span>
                <span className="text-xs font-bold text-foreground block mt-0.5">
                  {progress.estimated_remaining}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Status Banner */}
      <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between bg-secondary/30 dark:bg-secondary/15 p-3 rounded-2xl">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-foreground">System Status</span>
          <span className="text-[10px] text-muted-foreground mt-0.5 font-medium">All systems operational</span>
        </div>
        <span className="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 shrink-0"></span>
      </div>
    </div>
  );
}
