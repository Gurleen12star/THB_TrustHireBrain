"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { PlusCircle, Play, Settings2, Database, ShieldAlert, Sparkles } from "lucide-react";

const PIPELINE_STEPS = [
  "Reading Job Description",
  "Building Requirement Graph",
  "Parsing Candidates",
  "Skill Inference",
  "Building Knowledge Graph",
  "Career Evolution Analysis",
  "Candidate Intelligence Profiles",
  "Hiring Potential Estimation",
  "Trust Validation",
  "Ranking Engine",
  "Evidence Generation",
  "Export"
];

const MOCK_ACTIVITY_FEED = [
  "Initializing pipeline instances...",
  "Detected RAG Requirement: Priority Increased",
  "Analyzing candidate #1249 experience gaps...",
  "Candidate #82713: Leadership Evidence Found",
  "Matching candidate #1458 trust signals...",
  "Trust Score Updated for Aarav Patel (88%)",
  "Evaluating tensor knowledge mappings...",
  "Candidate #24581: Core PyTorch experience verified",
  "Hiring Potential scores calculated",
  "Ranking list compiled successfully.",
  "Reports generated for Top Shortlist."
];

export default function NewAnalysisPage() {
  const [jd, setJd] = useState("");
  const [dataset, setDataset] = useState("100k"); // "100k" or "upload"
  
  // Sliders Config
  const [techWeight, setTechWeight] = useState(45);
  const [leaderWeight, setLeaderWeight] = useState(20);
  const [trustWeight, setTrustWeight] = useState(15);
  const [learnWeight, setLearnWeight] = useState(10);
  const [behavWeight, setBehavWeight] = useState(10);

  // Simulation Status
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [stats, setStats] = useState({
    parsed: 0,
    requirements: 0,
    graphs: 0,
    skills: 0
  });
  const [activityLogs, setActivityLogs] = useState<string[]>([]);

  const handleStartAnalysis = async () => {
    if (!jd) {
      alert("Please paste or write a Job Description first.");
      return;
    }

    setIsRunning(true);
    setProgress(0);
    setCurrentStepIdx(0);
    setStats({ parsed: 0, requirements: 0, graphs: 0, skills: 0 });
    setActivityLogs([]);

    // Trigger backend POST call to notify
    try {
      await fetch("http://localhost:8000/api/v1/dashboard/analysis/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          technical_weight: techWeight,
          leadership_weight: leaderWeight,
          trust_weight: trustWeight,
          learning_weight: learnWeight,
          behaviour_weight: behavWeight
        })
      });
    } catch (e) {
      console.warn("Backend starting analysis sync failed, continuing offline...", e);
    }
  };

  // Simulation loop
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 1;
        
        // Map progress to steps
        const stepIdx = Math.floor((next / 100) * PIPELINE_STEPS.length);
        setCurrentStepIdx(Math.min(stepIdx, PIPELINE_STEPS.length - 1));

        // Increment counts
        setStats(s => ({
          parsed: Math.min(Math.floor((next / 100) * 74328), 74328),
          requirements: Math.min(Math.floor((next / 100) * 18), 18),
          graphs: Math.min(Math.floor((next / 100) * 74328), 74328),
          skills: Math.min(Math.floor((next / 100) * 320000), 320000)
        }));

        // Feed logs periodically
        if (next % 9 === 0) {
          const logIdx = Math.floor((next / 100) * MOCK_ACTIVITY_FEED.length);
          setActivityLogs(logs => [...logs, MOCK_ACTIVITY_FEED[logIdx] || "Parsing pipeline..."]);
        }

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsRunning(false);
            window.location.href = "/dashboard";
          }, 1500);
          return 100;
        }
        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Page Title */}
          <div className="flex items-center gap-3 select-none">
            <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
              <PlusCircle className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground tracking-tight">New Analysis</h1>
              <p className="text-sm text-muted-foreground mt-0.5 font-medium">
                Launch a candidate matching sequence with tailored model configs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Input Config side */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm flex flex-col gap-6 select-none">
                
                {/* Step 1: paste JD */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-bold text-sm text-foreground">Step 1: Paste Job Description</h3>
                  <textarea
                    value={jd}
                    onChange={(e) => setJd(e.target.value)}
                    placeholder="Paste the full job requirements here..."
                    rows={6}
                    className="w-full bg-secondary/50 dark:bg-secondary/20 border border-border/80 rounded-2xl p-4 text-xs font-semibold focus:outline-none focus:border-primary text-foreground mt-1"
                  />
                </div>

                {/* Step 2: Choose Dataset */}
                <div className="flex flex-col gap-2.5 border-t border-border/50 pt-4">
                  <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                    <Database className="h-4 w-4 text-primary" />
                    Step 2: Candidate Dataset Pool
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setDataset("100k")}
                      className={`p-3.5 border rounded-2xl text-left cursor-pointer transition-all flex flex-col justify-between h-[90px] ${
                        dataset === "100k" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 bg-card"
                      }`}
                    >
                      <span className="font-bold text-xs text-foreground">Preloaded Talent Pool</span>
                      <span className="text-[10px] text-muted-foreground font-semibold">100,000 Candidates</span>
                    </button>
                    <button
                      onClick={() => setDataset("upload")}
                      className={`p-3.5 border rounded-2xl text-left cursor-pointer transition-all flex flex-col justify-between h-[90px] ${
                        dataset === "upload" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 bg-card"
                      }`}
                    >
                      <span className="font-bold text-xs text-foreground">Upload Corporate DB</span>
                      <span className="text-[10px] text-muted-foreground font-semibold">Custom candidate records</span>
                    </button>
                  </div>
                </div>

                {/* Step 3: Sliders Config */}
                <div className="flex flex-col gap-4 border-t border-border/50 pt-4">
                  <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                    <Settings2 className="h-4 w-4 text-primary" />
                    Step 3: Intelligence Weight Sliders
                  </h3>
                  
                  {/* Sliders list */}
                  <div className="space-y-3">
                    {[
                      { label: "Technical Weight", val: techWeight, set: setTechWeight },
                      { label: "Leadership Weight", val: leaderWeight, set: setLeaderWeight },
                      { label: "Trust Score Weight", val: trustWeight, set: setTrustWeight },
                      { label: "Learning Adaptability", val: learnWeight, set: setLearnWeight },
                      { label: "Behavioral Alignment", val: behavWeight, set: setBehavWeight }
                    ].map((sl, i) => (
                      <div key={i} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-muted-foreground">{sl.label}</span>
                          <span className="text-primary">{sl.val}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={sl.val}
                          onChange={(e) => sl.set(parseInt(e.target.value))}
                          className="w-full h-1.5 bg-secondary dark:bg-secondary/40 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 4: Start button */}
                <button
                  onClick={handleStartAnalysis}
                  disabled={isRunning}
                  className="bg-primary text-primary-foreground font-bold text-xs py-3 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2 shadow-sm cursor-pointer"
                >
                  <Play className="h-4 w-4" />
                  🧠 Start THB Analysis
                </button>

              </div>
            </div>

            {/* Live Pipeline execution side */}
            <div className="lg:col-span-6 space-y-6">
              {isRunning ? (
                <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm space-y-6 animate-fade-in select-none">
                  
                  {/* Progress Status */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-base text-foreground">THB Analyzing Candidates</h3>
                      <span className="text-xs text-muted-foreground font-semibold mt-0.5 block">Remaining: 2m 30s</span>
                    </div>
                    <div className="relative h-12 w-12 flex items-center justify-center">
                      <svg className="w-12 h-12 transform -rotate-90">
                        <circle cx="24" cy="24" r="20" className="stroke-secondary dark:stroke-secondary/30 fill-none" strokeWidth="4" />
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          className="stroke-primary fill-none transition-all"
                          strokeWidth="4"
                          strokeDasharray={2 * Math.PI * 20}
                          strokeDashoffset={2 * Math.PI * 20 - (progress / 100) * (2 * Math.PI * 20)}
                        />
                      </svg>
                      <span className="absolute text-[11px] font-black text-foreground">{progress}%</span>
                    </div>
                  </div>

                  {/* High Density stats counters */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-b border-border/50 py-4 text-center font-bold">
                    <div>
                      <span className="text-[8px] text-muted-foreground uppercase tracking-wider block">Parsed</span>
                      <span className="text-sm text-foreground block mt-1">{stats.parsed.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-muted-foreground uppercase tracking-wider block">Requirements</span>
                      <span className="text-sm text-foreground block mt-1">{stats.requirements}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-muted-foreground uppercase tracking-wider block">Graphs</span>
                      <span className="text-sm text-foreground block mt-1">{stats.graphs.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-muted-foreground uppercase tracking-wider block">Skills</span>
                      <span className="text-sm text-foreground block mt-1">{stats.skills.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* 12-Step checklist */}
                  <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
                    {PIPELINE_STEPS.map((step, idx) => {
                      const isDone = currentStepIdx > idx;
                      const isCurrent = currentStepIdx === idx;
                      return (
                        <div key={idx} className="flex items-center gap-2 p-2 rounded-xl border border-border/30 bg-secondary/10">
                          {isDone ? (
                            <span className="h-4.5 w-4.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center font-bold text-[9px]">✔</span>
                          ) : isCurrent ? (
                            <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                          ) : (
                            <span className="h-2 w-2 rounded-full bg-secondary/60" />
                          )}
                          <span className={`${isDone ? "text-foreground" : isCurrent ? "text-primary font-bold" : "text-muted-foreground"}`}>
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Live Activity Feed */}
                  <div className="bg-black text-emerald-400 font-mono text-[10px] p-4 rounded-2xl h-[160px] overflow-y-auto space-y-2">
                    {activityLogs.map((log, i) => (
                      <div key={i} className="flex gap-1.5">
                        <span className="text-muted-foreground">↓</span>
                        <span>{log}</span>
                      </div>
                    ))}
                    <div className="h-1.5 w-1.5 bg-emerald-400 animate-pulse inline-block" />
                  </div>

                </div>
              ) : (
                /* Prompt Box */
                <div className="bg-card border border-border rounded-[24px] p-8 text-center flex flex-col items-center justify-center h-full min-h-[300px] select-none text-muted-foreground">
                  <ShieldAlert className="h-12 w-12 text-muted-foreground/60 mb-3" />
                  <h4 className="font-bold text-sm text-foreground">Waiting for analysis trigger</h4>
                  <p className="text-xs text-muted-foreground mt-1 max-w-xs leading-relaxed font-medium">
                    Configure your job description and custom models above, then click **Start THB Analysis** to watch the parsing steps live.
                  </p>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
