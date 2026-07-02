"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { getCandidates } from "@/lib/api";
import { Candidate } from "@/types";
import { Scale, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

export default function ComparePage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [candidateA, setCandidateA] = useState<Candidate | null>(null);
  const [candidateB, setCandidateB] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getCandidates();
        setCandidates(res);
        if (res.length >= 2) {
          setCandidateA(res[0]);
          setCandidateB(res[1]);
        }
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
          {/* Header */}
          <div className="flex items-center gap-3 select-none">
            <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
              <Scale className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground tracking-tight">Compare Candidates</h1>
              <p className="text-sm text-muted-foreground mt-0.5 font-medium">
                Evaluate candidates side-by-side across core skills, verification trust levels, and hiring potential.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="h-48 flex items-center justify-center text-muted-foreground font-semibold">
              Loading comparisons...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              {/* Candidate A Column */}
              <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm flex flex-col gap-6 transition-colors duration-200">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Candidate A</label>
                  <select
                    value={candidateA?.id || ""}
                    onChange={(e) => {
                      const selected = candidates.find(c => c.id === parseInt(e.target.value));
                      if (selected) setCandidateA(selected);
                    }}
                    className="bg-secondary/40 border border-border rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-primary text-foreground cursor-pointer w-full"
                  >
                    {candidates.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.role})</option>
                    ))}
                  </select>
                </div>

                {candidateA && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={candidateA.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"}
                        alt={candidateA.name}
                        className="h-16 w-16 rounded-full object-cover border border-border"
                      />
                      <div className="flex flex-col">
                        <span className="font-black text-lg text-foreground">{candidateA.name}</span>
                        <span className="text-xs text-muted-foreground font-semibold mt-0.5">{candidateA.role}</span>
                        <span className="text-xs text-muted-foreground mt-0.5 font-medium">{candidateA.location}</span>
                      </div>
                    </div>

                    {/* Stats metrics */}
                    <div className="grid grid-cols-3 gap-4 text-center border-t border-b border-border/50 py-4">
                      <div>
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Potential</span>
                        <span className="block text-xl font-black text-emerald-500 mt-1">{candidateA.hiring_potential}%</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Confidence</span>
                        <span className="block text-xl font-black text-primary mt-1">{candidateA.confidence}%</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Trust Score</span>
                        <span className="block text-xl font-black text-blue-500 mt-1 flex items-center justify-center gap-1">
                          <ShieldCheck className="h-4.5 w-4.5 text-blue-500 shrink-0" />
                          {candidateA.trust_score}
                        </span>
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Experience</span>
                      <p className="text-sm font-bold text-foreground">{candidateA.yoe} Years of Experience</p>
                    </div>

                    {/* Strengths */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Key Strengths</span>
                      <div className="space-y-1.5">
                        {candidateA.strengths_risks.filter(sr => sr.type === "strength").map(sr => (
                          <div key={sr.id} className="flex items-start gap-2 text-xs text-foreground/80 font-semibold">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{sr.content}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Candidate B Column */}
              <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm flex flex-col gap-6 transition-colors duration-200">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Candidate B</label>
                  <select
                    value={candidateB?.id || ""}
                    onChange={(e) => {
                      const selected = candidates.find(c => c.id === parseInt(e.target.value));
                      if (selected) setCandidateB(selected);
                    }}
                    className="bg-secondary/40 border border-border rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-primary text-foreground cursor-pointer w-full"
                  >
                    {candidates.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.role})</option>
                    ))}
                  </select>
                </div>

                {candidateB && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={candidateB.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"}
                        alt={candidateB.name}
                        className="h-16 w-16 rounded-full object-cover border border-border"
                      />
                      <div className="flex flex-col">
                        <span className="font-black text-lg text-foreground">{candidateB.name}</span>
                        <span className="text-xs text-muted-foreground font-semibold mt-0.5">{candidateB.role}</span>
                        <span className="text-xs text-muted-foreground mt-0.5 font-medium">{candidateB.location}</span>
                      </div>
                    </div>

                    {/* Stats metrics */}
                    <div className="grid grid-cols-3 gap-4 text-center border-t border-b border-border/50 py-4">
                      <div>
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Potential</span>
                        <span className="block text-xl font-black text-emerald-500 mt-1">{candidateB.hiring_potential}%</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Confidence</span>
                        <span className="block text-xl font-black text-primary mt-1">{candidateB.confidence}%</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Trust Score</span>
                        <span className="block text-xl font-black text-blue-500 mt-1 flex items-center justify-center gap-1">
                          <ShieldCheck className="h-4.5 w-4.5 text-blue-500 shrink-0" />
                          {candidateB.trust_score}
                        </span>
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Experience</span>
                      <p className="text-sm font-bold text-foreground">{candidateB.yoe} Years of Experience</p>
                    </div>

                    {/* Strengths */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Key Strengths</span>
                      <div className="space-y-1.5">
                        {candidateB.strengths_risks.filter(sr => sr.type === "strength").map(sr => (
                          <div key={sr.id} className="flex items-start gap-2 text-xs text-foreground/80 font-semibold">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{sr.content}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}
        </main>
      </div>
    </div>
  );
}
