"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import TopCandidateDetails from "@/components/TopCandidateDetails";
import { getCandidates } from "@/lib/api";
import { Candidate } from "@/types";
import { Award, Trophy, ShieldCheck } from "lucide-react";

export default function TopCandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getCandidates(undefined, "Top");
        setCandidates(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div className="flex items-center gap-3 select-none">
            <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground tracking-tight">Top Candidates</h1>
              <p className="text-sm text-muted-foreground mt-0.5 font-medium">
                 Podium ranks of candidates with exceptional hiring potential and verified trust levels.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="h-48 flex items-center justify-center text-muted-foreground font-semibold">
              Loading top ranking matches...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
              {candidates.map((cand) => (
                <div
                  key={cand.id}
                  onClick={() => setSelectedCandidate(cand)}
                  className="bg-card border border-border hover:border-primary/50 rounded-[24px] p-6 shadow-sm cursor-pointer transition-all duration-200 flex flex-col justify-between h-[240px] hover:shadow-md relative overflow-hidden group select-none"
                >
                  <div className="absolute top-0 right-0 p-4">
                    {cand.rank === 1 && <Trophy className="h-6 w-6 text-amber-500 fill-amber-500/10" />}
                    {cand.rank === 2 && <Trophy className="h-6 w-6 text-slate-400 fill-slate-400/10" />}
                    {cand.rank === 3 && <Trophy className="h-6 w-6 text-amber-700 fill-amber-700/10" />}
                  </div>

                  <div className="flex items-center gap-4">
                    <img
                      src={cand.avatar || ""}
                      alt={cand.name}
                      className="h-14 w-14 rounded-full object-cover border border-border"
                    />
                    <div className="flex flex-col">
                      <span className="font-black text-base text-foreground leading-none">{cand.name}</span>
                      <span className="text-[10px] text-muted-foreground font-semibold mt-1.5">{cand.role}</span>
                      <span className="text-[10px] text-muted-foreground font-medium mt-0.5">{cand.yoe} Years Experience</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-border/50 pt-4 text-xs font-bold mt-4">
                    <div>
                      <span className="text-[9px] text-muted-foreground uppercase tracking-wider block">Potential</span>
                      <span className="text-emerald-500 block mt-0.5">{cand.hiring_potential}%</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-muted-foreground uppercase tracking-wider block">Trust Level</span>
                      <span className="text-blue-500 block mt-0.5 flex items-center gap-1">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        {cand.trust_score}%
                      </span>
                    </div>
                  </div>

                </div>
              ))}
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
