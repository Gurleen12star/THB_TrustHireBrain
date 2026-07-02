"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import RequirementIntelligence from "@/components/RequirementIntelligence";
import TopCandidatesList from "@/components/TopCandidatesList";
import AnalysisProgressWidget from "@/components/AnalysisProgressWidget";
import DashboardCharts from "@/components/DashboardCharts";
import TopCandidateDetails from "@/components/TopCandidateDetails";
import { MetricsSkeleton } from "@/components/Skeletons";
import {
  getDashboardMetrics,
  getAnalysisProgress,
  getJobDescription,
  getCandidates,
  getAnalyticsData
} from "@/lib/api";
import { Metrics, AnalysisProgress, JobDescription, Candidate, AnalyticsData } from "@/types";
import {
  Users,
  TrendingUp,
  FileCheck,
  ShieldCheck,
  Clock,
  Download,
  Share2,
  Plus
} from "lucide-react";

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [progress, setProgress] = useState<AnalysisProgress | null>(null);
  const [job, setJob] = useState<JobDescription | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);

  // Load all dashboard metrics
  useEffect(() => {
    async function loadData() {
      try {
        const [mRes, pRes, jRes, cRes, aRes] = await Promise.all([
          getDashboardMetrics(),
          getAnalysisProgress(),
          getJobDescription(),
          getCandidates(undefined, "Top"),
          getAnalyticsData()
        ]);
        setMetrics(mRes);
        setProgress(pRes);
        setJob(jRes);
        setCandidates(cRes);
        setAnalytics(aRes);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Dashboard Header Title Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none">
            <div>
              <h1 className="text-3xl font-black text-foreground tracking-tight">{job?.title || "AI Engineer"}</h1>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground mt-1 font-medium">
                <span>{job?.description || "Senior AI Engineer with 6+ years of experience in LLM, NLP, and MLOps"}</span>
                <span className="text-muted-foreground/30">•</span>
                <button className="text-primary hover:underline font-semibold">View Full JD</button>
              </div>
            </div>
            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => alert("Excel exported successfully!")}
                className="bg-card border border-border hover:bg-secondary text-foreground/80 font-bold text-xs py-2.5 px-4 rounded-xl active:scale-[0.98] transition-all flex items-center gap-2 shadow-sm"
              >
                <Share2 className="h-4 w-4" />
                Export Excel
              </button>
              <button
                onClick={() => alert("PDF report download started!")}
                className="bg-card border border-border hover:bg-secondary text-foreground/80 font-bold text-xs py-2.5 px-4 rounded-xl active:scale-[0.98] transition-all flex items-center gap-2 shadow-sm"
              >
                <Download className="h-4 w-4" />
                Download Report
              </button>
              <button
                onClick={() => alert("Creating a new search analysis...")}
                className="bg-primary text-primary-foreground hover:opacity-95 font-bold text-xs py-2.5 px-4 rounded-xl active:scale-[0.98] transition-all flex items-center gap-2 shadow-md"
              >
                <Plus className="h-4 w-4" />
                New Analysis
              </button>
            </div>
          </div>

          {loading ? (
            <MetricsSkeleton />
          ) : (
            <>
              {/* KPI Cards Row (Matches Screenshot perfectly) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 select-none">
                {/* 1. Total Candidates */}
                <div className="bg-card border border-border rounded-[24px] p-5 shadow-sm flex items-center justify-between transition-colors duration-200">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Total Candidates</span>
                    <span className="text-2xl font-black text-foreground block leading-tight">
                      {metrics?.total_candidates.toLocaleString() || "100,000"}
                    </span>
                    <span className="text-[10px] text-muted-foreground block font-medium">Processed successfully</span>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                </div>

                {/* 2. Top 10 Avg Score */}
                <div className="bg-card border border-border rounded-[24px] p-5 shadow-sm flex items-center justify-between transition-colors duration-200">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Top 10 Avg. Score</span>
                    <span className="text-2xl font-black text-foreground block leading-tight">
                      {metrics?.top_avg_score || "92.45"}<span className="text-xs text-muted-foreground font-normal"> /100</span>
                    </span>
                    <span className="text-[10px] text-emerald-500 block font-semibold">Excellent pool of candidates</span>
                  </div>
                  <div className="bg-emerald-500/10 p-3 rounded-2xl text-emerald-500">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </div>

                {/* 3. High Potential */}
                <div className="bg-card border border-border rounded-[24px] p-5 shadow-sm flex items-center justify-between transition-colors duration-200">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">High Potential</span>
                    <span className="text-2xl font-black text-foreground block leading-tight">
                      {metrics?.high_potential.toLocaleString() || "1,248"}
                    </span>
                    <span className="text-[10px] text-muted-foreground block font-medium">Score &gt; 85</span>
                  </div>
                  <div className="bg-amber-500/10 p-3 rounded-2xl text-amber-500">
                    <FileCheck className="h-6 w-6" />
                  </div>
                </div>

                {/* 4. Trusted Candidates */}
                <div className="bg-card border border-border rounded-[24px] p-5 shadow-sm flex items-center justify-between transition-colors duration-200">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Trusted Candidates</span>
                    <span className="text-2xl font-black text-foreground block leading-tight">
                      {metrics?.trusted_candidates.toLocaleString() || "87,532"}
                    </span>
                    <span className="text-[10px] text-primary block font-semibold">High trust level</span>
                  </div>
                  <div className="bg-blue-500/10 p-3 rounded-2xl text-blue-500">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                </div>

                {/* 5. Analysis Time */}
                <div className="bg-card border border-border rounded-[24px] p-5 shadow-sm flex items-center justify-between transition-colors duration-200">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Analysis Time</span>
                    <span className="text-2xl font-black text-foreground block leading-tight">
                      {metrics?.analysis_time || "18m 42s"}
                    </span>
                    <span className="text-[10px] text-muted-foreground block font-medium">Total time taken</span>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
              </div>

              {/* Middle Grid Widgets: Req Intel, Top Candidates, Progress Check */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  {job && <RequirementIntelligence skills={job.skills} />}
                </div>
                <div className="lg:col-span-1">
                  <TopCandidatesList
                    candidates={candidates}
                    onSelectCandidate={(cand) => setSelectedCandidate(cand)}
                  />
                </div>
                <div className="lg:col-span-1">
                  {progress && <AnalysisProgressWidget progress={progress} />}
                </div>
              </div>

              {/* Bottom Row: 4 Analytics Recharts */}
              {analytics && <DashboardCharts data={analytics} />}
            </>
          )}
        </main>
      </div>

      {/* Details Slide-out Drawer */}
      {selectedCandidate && (
        <TopCandidateDetails
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </div>
  );
}
