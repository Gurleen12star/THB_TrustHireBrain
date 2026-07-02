"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import TopCandidateDetails from "@/components/TopCandidateDetails";
import EmptyState from "@/components/EmptyState";
import { TableSkeleton } from "@/components/Skeletons";
import { getCandidates } from "@/lib/api";
import { Candidate } from "@/types";
import { Search, Filter, ShieldCheck, ShieldAlert, Trophy } from "lucide-react";

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    async function loadCandidates() {
      setLoading(true);
      try {
        const res = await getCandidates(search || undefined, status);
        setCandidates(res);
      } catch (err) {
        console.error("Failed to load candidates", err);
      } finally {
        setLoading(false);
      }
    }
    const delayDebounce = setTimeout(() => {
      loadCandidates();
    }, 200); // Debounce typing searches

    return () => clearTimeout(delayDebounce);
  }, [search, status]);

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
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Header titles */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none">
            <div>
              <h1 className="text-3xl font-black text-foreground tracking-tight">Candidate Intelligence</h1>
              <p className="text-sm text-muted-foreground mt-1 font-medium">
                Search, filter, and review analyzed candidate potential and trust scores
              </p>
            </div>
          </div>

          {/* Search and Filters panel */}
          <div className="bg-card border border-border rounded-[24px] p-4 flex flex-col md:flex-row items-center gap-4 shadow-sm select-none">
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search candidates by name, tech stack, or experience..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-secondary/50 dark:bg-secondary/20 border border-border/70 rounded-xl py-2.5 pl-10 pr-4 text-sm font-semibold focus:outline-none focus:border-primary transition-colors text-foreground"
              />
            </div>
            {/* Status Dropdowns */}
            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-card border border-border rounded-xl px-4 py-2.5 text-xs font-bold text-foreground focus:outline-none focus:border-primary cursor-pointer select-none"
              >
                <option value="All">All Candidates</option>
                <option value="Top">Top Candidates</option>
                <option value="Shortlisted">Shortlisted</option>
              </select>
            </div>
          </div>

          {/* Candidates Table List */}
          {loading ? (
            <TableSkeleton />
          ) : candidates.length === 0 ? (
            <EmptyState
              title="No matching candidates"
              description="No candidate matching your filter filters or search keywords was found in the database."
              actionLabel="Clear search input"
              onAction={() => {
                setSearch("");
                setStatus("All");
              }}
            />
          ) : (
            <div className="bg-card border border-border rounded-[24px] overflow-hidden shadow-sm select-none transition-colors duration-200">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border/50 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      <th className="py-4 px-6">Rank</th>
                      <th className="py-4 px-6">Candidate</th>
                      <th className="py-4 px-6">Current Title</th>
                      <th className="py-4 px-6">Years Exp</th>
                      <th className="py-4 px-6 text-center">Hiring Potential</th>
                      <th className="py-4 px-6 text-center">Confidence</th>
                      <th className="py-4 px-6 text-right">Trust Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50 text-sm">
                    {candidates.map((cand) => (
                      <tr
                        key={cand.id}
                        onClick={() => setSelectedCandidate(cand)}
                        className="hover:bg-secondary/30 dark:hover:bg-secondary/15 cursor-pointer transition-colors duration-150"
                      >
                        {/* Rank */}
                        <td className="py-4 px-6 font-bold text-foreground/80">
                          {cand.rank ? getRankBadge(cand.rank) : "-"}
                        </td>
                        {/* Name/Avatar */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={cand.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"}
                              alt={cand.name}
                              className="h-10 w-10 rounded-full object-cover border border-border"
                            />
                            <div className="flex flex-col">
                              <span className="font-bold text-sm text-foreground">{cand.name}</span>
                              <span className="text-[10px] text-muted-foreground font-semibold mt-0.5">{cand.location}</span>
                            </div>
                          </div>
                        </td>
                        {/* Role / Company */}
                        <td className="py-4 px-6 font-semibold text-foreground/80">
                          {cand.role} <span className="text-muted-foreground text-xs font-medium">@ {cand.company}</span>
                        </td>
                        {/* Experience */}
                        <td className="py-4 px-6 font-bold text-foreground/80">
                          {cand.yoe} Yrs
                        </td>
                        {/* Hiring Potential bar */}
                        <td className="py-4 px-6">
                          <div className="flex flex-col items-center justify-center max-w-[120px] mx-auto">
                            <span className="text-xs font-bold text-foreground mb-1">{cand.hiring_potential}%</span>
                            <div className="h-1.5 w-full bg-secondary dark:bg-secondary/40 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-500 rounded-full"
                                style={{ width: `${cand.hiring_potential}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        {/* Confidence */}
                        <td className="py-4 px-6 text-center font-bold text-foreground">
                          {cand.confidence}%
                        </td>
                        {/* Trust Score */}
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-1.5 font-bold text-foreground">
                            {cand.trust_score >= 80 ? (
                              <ShieldCheck className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                            ) : (
                              <ShieldAlert className="h-4.5 w-4.5 text-amber-500 shrink-0" />
                            )}
                            <span>{cand.trust_score}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Selected candidate intelligence details */}
      {selectedCandidate && (
        <TopCandidateDetails
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </div>
  );
}
