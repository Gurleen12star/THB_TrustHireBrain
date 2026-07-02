"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { PlusCircle, Upload, Play, Terminal } from "lucide-react";

export default function NewAnalysisPage() {
  const [jd, setJd] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const handleStartAnalysis = () => {
    if (!jd) {
      alert("Please paste or write a Job Description first.");
      return;
    }
    setIsUploading(true);
    setLogs(["[SYSTEM] Initializing new pipeline instance...", "[NLP] Loading en_core_web_sm spaCy model...", "[DB] Creating workspace record..."]);
    
    setTimeout(() => {
      setLogs(prev => [...prev, "[NLP] Parsing job skills requirements...", "[VECTOR] Encoding skills nodes...", "[SYSTEM] Fetching matching resumes from pool..."]);
    }, 1000);

    setTimeout(() => {
      setLogs(prev => [...prev, "[GRAPH] Calculating capability distances...", "[SCORING] Weighting experience records...", "[SYSTEM] Done! Redirecting to dashboard..."]);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    }, 2500);
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div className="flex items-center gap-3 select-none">
            <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
              <PlusCircle className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground tracking-tight">New Analysis</h1>
              <p className="text-sm text-muted-foreground mt-0.5 font-medium">
                Create an explainable ranking pipeline by uploading job descriptions and candidate pools.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Input card */}
            <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm flex flex-col gap-6 transition-colors duration-200">
              <div className="flex flex-col gap-1.5">
                <h3 className="font-bold text-base text-foreground">1. Paste Job Description</h3>
                <p className="text-xs text-muted-foreground font-medium">Our NLP parser will automatically extract required skills and calculate semantic structures.</p>
              </div>

              <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste the full job description details here..."
                rows={8}
                className="w-full bg-secondary/50 dark:bg-secondary/20 border border-border/80 rounded-2xl p-4 text-xs font-semibold focus:outline-none focus:border-primary text-foreground"
              />

              <div className="flex flex-col gap-1.5">
                <h3 className="font-bold text-base text-foreground">2. Upload Candidate Resumes</h3>
                <p className="text-xs text-muted-foreground font-medium">Drag and drop PDFs or select zip archives containing candidate portfolios.</p>
              </div>

              {/* Upload area */}
              <div className="border-2 border-dashed border-border/80 hover:border-primary rounded-[24px] p-8 text-center cursor-pointer transition-colors flex flex-col items-center justify-center bg-secondary/10 hover:bg-secondary/25">
                <Upload className="h-8 w-8 text-muted-foreground mb-3" />
                <span className="text-xs font-bold text-foreground">Drag and drop candidate files</span>
                <span className="text-[10px] text-muted-foreground mt-1">Supports PDF, DOCX, ZIP (up to 1,000 files)</span>
              </div>

              <button
                onClick={handleStartAnalysis}
                disabled={isUploading}
                className="bg-primary text-primary-foreground font-bold text-xs py-3 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Play className="h-4 w-4" />
                {isUploading ? "Executing Pipeline..." : "Start AI Matching Pipeline"}
              </button>
            </div>

            {/* Live Pipeline Terminal logs */}
            {isUploading && (
              <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm flex flex-col gap-4 transition-colors duration-200 h-[480px]">
                <div className="flex items-center gap-2 border-b border-border pb-3">
                  <Terminal className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-sm text-foreground">Analysis Terminal Output</h3>
                </div>
                <div className="flex-1 bg-black text-emerald-400 font-mono text-[10px] p-4 rounded-xl overflow-y-auto space-y-2.5">
                  {logs.map((log, i) => (
                    <div key={i} className="leading-relaxed">{log}</div>
                  ))}
                  <div className="h-2 w-2 bg-emerald-400 animate-pulse inline-block" />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
