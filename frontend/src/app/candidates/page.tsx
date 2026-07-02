"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import TopCandidateDetails from "@/components/TopCandidateDetails";
import EmptyState from "@/components/EmptyState";
import { TableSkeleton } from "@/components/Skeletons";
import { getCandidates } from "@/lib/api";
import { Candidate } from "@/types";
import { 
  Search, Filter, ShieldCheck, ShieldAlert, Trophy, LayoutGrid, List, CheckCircle2, Award 
} from "lucide-react";

const PRE_FILLED_CHIPS = ["Python", "LLM", "Bangalore", "5 Years", "Open to Work"];

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [search, setSearch] = useState("");
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [layout, setLayout] = useState<"grid" | "table">("grid");

  // Advanced Filters States
  const [minExp, setMinExp] = useState<number>(0);
  const [minTrust, setMinTrust] = useState<number>(0);
  const [minPotential, setMinPotential] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function loadCandidates() {
      setLoading(true);
      try {
        const res = await getCandidates(search || undefined, status);
        
        // Filter by selected chips
        let filtered = res;
        if (selectedChips.length > 0) {
          filtered = res.filter(cand => {
            return selectedChips.every(chip => {
              if (chip === "Open to Work") return cand.open_to_work;
              if (chip === "Bangalore") return cand.location.includes("Bengaluru") || cand.location.includes("Bangalore");
              if (chip === "5 Years") return cand.yoe >= 5;
              return cand.role.toLowerCase().includes(chip.toLowerCase()) || 
                     cand.name.toLowerCase().includes(chip.toLowerCase());
            });
          });
        }

        // Apply advanced slide filters
        if (minExp > 0) filtered = filtered.filter(c => c.yoe >= minExp);
        if (minTrust > 0) filtered = filtered.filter(c => c.trust_score >= minTrust);
        if (minPotential > 0) filtered = filtered.filter(c => c.hiring_potential >= minPotential);

        setCandidates(filtered);
      } catch (err) {
        console.error("Failed to load candidates", err);
      } finally {
        setLoading(false);
      }
    }

    const delayDebounce = setTimeout(() => {
      loadCandidates();
    }, 250);

    return () => clearTimeout(delayDebounce);
  }, [search, status, selectedChips, minExp, minTrust, minPotential]);

  const toggleChip = (chip: string) => {
    setSelectedChips(prev => 
      prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
    );
  };

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
          {/* Header Title */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none">
            <div>
              <h1 className="text-3xl font-black text-foreground tracking-tight">Candidate Intelligence Engine</h1>
              <p className="text-sm text-muted-foreground mt-0.5 font-medium">
                High-density Bloomberg terminal views mapping skills verifications and hiring potentials.
              </p>
            </div>
            
            {/* View Layout Toggle */}
            <div className="flex items-center gap-1.5 border border-border p-1 rounded-xl bg-card">
              <button
                onClick={() => setLayout("grid")}
                className={`p-2 rounded-lg transition-all ${
                  layout === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
                title="Grid layout"
              >
                <LayoutGrid className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={() => setLayout("table")}
                className={`p-2 rounded-lg transition-all ${
                  layout === "table" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
                title="Table layout"
              >
                <List className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          {/* Search, Filters, and Chips */}
          <div className="bg-card border border-border rounded-[24px] p-5 shadow-sm space-y-4 select-none">
            <div className="flex flex-col md:flex-row items-center gap-3">
              {/* Search bar */}
              <div className="relative w-full md:flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search candidates by name, stack, or experience..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-secondary/50 dark:bg-secondary/20 border border-border/80 rounded-xl py-2.5 pl-11 pr-4 text-xs font-semibold focus:outline-none focus:border-primary transition-all text-foreground"
                />
              </div>

              {/* Toggle filters & Dropdown */}
              <div className="flex items-center gap-2.5 w-full md:w-auto">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`border text-xs font-bold py-2.5 px-4 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                    showFilters ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50 text-foreground bg-card"
                  }`}
                >
                  <Filter className="h-4 w-4" />
                  Advanced Filters
                </button>
                
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="bg-card border border-border rounded-xl px-4 py-2.5 text-xs font-bold text-foreground focus:outline-none focus:border-primary cursor-pointer select-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Top">Top Ranks</option>
                  <option value="Shortlisted">Shortlisted Only</option>
                </select>
              </div>
            </div>

            {/* Pre-filled chips */}
            <div className="flex flex-wrap items-center gap-2.5 border-t border-border/40 pt-4">
              <span className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">Quick Filters:</span>
              {PRE_FILLED_CHIPS.map(chip => {
                const isActive = selectedChips.includes(chip);
                return (
                  <button
                    key={chip}
                    onClick={() => toggleChip(chip)}
                    className={`text-[10px] font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                      isActive 
                        ? "bg-primary text-primary-foreground border-primary" 
                        : "bg-secondary/50 dark:bg-secondary/20 border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-border/40 pt-4 animate-fade-in">
                {/* Exp slider */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-muted-foreground">Min Experience</span>
                    <span className="text-primary">{minExp} Years</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={minExp}
                    onChange={(e) => setMinExp(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-secondary dark:bg-secondary/40 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Trust slider */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-muted-foreground">Min Trust Level</span>
                    <span className="text-primary">{minTrust}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={minTrust}
                    onChange={(e) => setMinTrust(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-secondary dark:bg-secondary/40 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Potential slider */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-muted-foreground">Min Hiring Potential</span>
                    <span className="text-primary">{minPotential}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={minPotential}
                    onChange={(e) => setMinPotential(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-secondary dark:bg-secondary/40 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Results display */}
          {loading ? (
            <TableSkeleton />
          ) : candidates.length === 0 ? (
            <EmptyState
              title="No candidates match filters"
              description="No candidates inside the index match these specific parameters."
              actionLabel="Reset search query"
              onAction={() => {
                setSearch("");
                setSelectedChips([]);
                setMinExp(0);
                setMinTrust(0);
                setMinPotential(0);
                setStatus("All");
              }}
            />
          ) : layout === "grid" ? (
            /* Bloomberg meets LinkedIn Card Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {candidates.map((cand) => (
                <div
                  key={cand.id}
                  onClick={() => setSelectedCandidate(cand)}
                  className="bg-card border border-border hover:border-primary/50 rounded-[24px] p-6 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 flex flex-col justify-between h-[250px] relative overflow-hidden group select-none"
                >
                  {/* Rank corner */}
                  {cand.rank && (
                    <div className="absolute top-4 right-4">
                      {getRankBadge(cand.rank)}
                    </div>
                  )}

                  {/* Profile Section */}
                  <div className="flex items-center gap-4">
                    <img
                      src={cand.avatar || ""}
                      alt={cand.name}
                      className="h-14 w-14 rounded-full object-cover border border-border shrink-0"
                    />
                    <div className="flex flex-col">
                      <span className="font-black text-base text-foreground leading-none">{cand.name}</span>
                      <span className="text-[10px] text-muted-foreground font-semibold mt-1.5">{cand.role}</span>
                      <span className="text-[9px] text-muted-foreground font-medium mt-0.5">{cand.company || "TechNova"}</span>
                    </div>
                  </div>

                  {/* Recommendation Badge */}
                  <div className="mt-4">
                    <span className="bg-primary/10 text-primary text-[9px] font-black px-2.5 py-1 rounded-lg border border-primary/20 flex items-center gap-1.5 self-start w-fit capitalize">
                      <Award className="h-3.5 w-3.5" />
                      {cand.status} Match
                    </span>
                  </div>

                  {/* High Density metrics */}
                  <div className="grid grid-cols-3 gap-3 border-t border-border/50 pt-4 text-xs font-bold mt-4">
                    <div>
                      <span className="text-[8px] text-muted-foreground uppercase tracking-wider block">Potential</span>
                      <span className="text-emerald-500 block mt-0.5">{cand.hiring_potential}%</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-muted-foreground uppercase tracking-wider block">Trust Score</span>
                      <span className="text-blue-500 block mt-0.5 flex items-center gap-0.5">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        {cand.trust_score}%
                      </span>
                    </div>
                    <div>
                      <span className="text-[8px] text-muted-foreground uppercase tracking-wider block">Confidence</span>
                      <span className="text-foreground block mt-0.5">{cand.confidence}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Table list View */
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
                        <td className="py-4 px-6 font-bold text-foreground/80">
                          {cand.rank ? getRankBadge(cand.rank) : "-"}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={cand.avatar || ""}
                              alt={cand.name}
                              className="h-10 w-10 rounded-full object-cover border border-border"
                            />
                            <div className="flex flex-col">
                              <span className="font-bold text-sm text-foreground">{cand.name}</span>
                              <span className="text-[10px] text-muted-foreground font-semibold mt-0.5">{cand.location}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-semibold text-foreground/80">
                          {cand.role} <span className="text-muted-foreground text-xs font-medium">@ {cand.company}</span>
                        </td>
                        <td className="py-4 px-6 font-bold text-foreground/80">
                          {cand.yoe} Yrs
                        </td>
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
                        <td className="py-4 px-6 text-center font-bold text-foreground">
                          {cand.confidence}%
                        </td>
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

      {selectedCandidate && (
        <TopCandidateDetails
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </div>
  );
}
