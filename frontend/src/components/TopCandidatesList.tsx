"use client";

import React from "react";
import { ArrowRight, Trophy, ShieldCheck, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { Candidate } from "@/types";

interface TopCandidatesListProps {
  candidates: Candidate[];
  onSelectCandidate?: (candidate: Candidate) => void;
}

export default function TopCandidatesList({ candidates, onSelectCandidate }: TopCandidatesListProps) {
  // Sort by rank and take top 5
  const topCandidates = [...candidates]
    .filter(c => c.rank !== null)
    .sort((a, b) => (a.rank || 99) - (b.rank || 99))
    .slice(0, 5);

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-amber-500 fill-amber-500/10" />;
      case 2:
        return <Trophy className="h-5 w-5 text-slate-400 fill-slate-400/10" />;
      case 3:
        return <Trophy className="h-5 w-5 text-amber-700 fill-amber-700/10" />;
      default:
        return <span className="font-bold text-muted-foreground text-sm pl-1.5">{rank}</span>;
    }
  };

  return (
    <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm flex flex-col justify-between h-full select-none transition-colors duration-200">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg text-foreground">Top Candidates</h3>
          <Link
            href="/candidates"
            className="text-xs font-semibold text-primary hover:opacity-80 flex items-center gap-1 transition-opacity"
          >
            View All
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Table Headings */}
        <div className="grid grid-cols-12 text-[10px] font-bold text-muted-foreground uppercase tracking-wider pb-2 border-b border-border/50 mb-3 px-2">
          <div className="col-span-1">Rank</div>
          <div className="col-span-4">Candidate</div>
          <div className="col-span-3 text-center">Hiring Potential</div>
          <div className="col-span-2 text-center">Confidence</div>
          <div className="col-span-2 text-right">Trust Score</div>
        </div>

        {/* Candidate List Rows */}
        <div className="space-y-1">
          {topCandidates.map((candidate) => (
            <div
              key={candidate.id}
              onClick={() => onSelectCandidate && onSelectCandidate(candidate)}
              className="grid grid-cols-12 items-center py-2 px-2 hover:bg-secondary/40 dark:hover:bg-secondary/20 rounded-[16px] cursor-pointer transition-all duration-150 border border-transparent hover:border-border/30"
            >
              {/* Rank Icon */}
              <div className="col-span-1 flex items-center">
                {candidate.rank && getRankBadge(candidate.rank)}
              </div>

              {/* Profile info */}
              <div className="col-span-4 flex items-center gap-3">
                <img
                  src={candidate.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"}
                  alt={candidate.name}
                  className="h-9 w-9 rounded-full object-cover border border-border"
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-sm text-foreground truncate leading-none">
                    {candidate.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-semibold mt-1">
                    {candidate.yoe} YOE
                  </span>
                </div>
              </div>

              {/* Hiring Potential bar & % */}
              <div className="col-span-3 flex flex-col justify-center items-center px-2">
                <div className="flex items-center justify-between w-full text-xs font-bold text-foreground mb-1">
                  <span>{candidate.hiring_potential}%</span>
                </div>
                <div className="h-1.5 w-full bg-secondary dark:bg-secondary/40 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${candidate.hiring_potential}%` }}
                  />
                </div>
              </div>

              {/* Confidence % */}
              <div className="col-span-2 text-center font-bold text-sm text-foreground">
                {candidate.confidence}%
              </div>

              {/* Trust Score & status */}
              <div className="col-span-2 flex items-center justify-end gap-1.5 text-right font-bold text-sm text-foreground pr-1">
                {candidate.trust_score >= 80 ? (
                  <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                ) : (
                  <ShieldAlert className="h-4 w-4 text-amber-500 shrink-0" />
                )}
                <span>{candidate.trust_score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View rankings button */}
      <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-muted-foreground">
        <span>Showing Top 5 of 100,000 candidates</span>
        <Link
          href="/candidates"
          className="text-primary hover:opacity-80 flex items-center gap-1 transition-opacity"
        >
          View Full Rankings
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
