"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { PlusCircle, Play, Settings2, Database, ShieldAlert, Sparkles } from "lucide-react";
import { getJobDescription } from "@/lib/api";

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
  const [activeJobTitle, setActiveJobTitle] = useState("");
  const [dataset, setDataset] = useState("100k"); // "100k" or "upload"
  
  // Sliders Config
  const [techWeight, setTechWeight] = useState(40);
  const [leaderWeight, setLeaderWeight] = useState(20);
  const [trustWeight, setTrustWeight] = useState(20);
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

  // Fetch active Job Description on load
  useEffect(() => {
    async function loadActiveJob() {
      try {
        const job = await getJobDescription();
        if (job) {
          setJd(job.description || "");
          setActiveJobTitle(job.title || "AI Engineer");
        }
      } catch (err) {
        console.error("No active job description found in DB:", err);
      }
    }
    loadActiveJob();
  }, []);

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

    // 1. Sync custom JD text changes to the backend first
    try {
      await fetch("http://localhost:8000/api/v1/dashboard/job-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: activeJobTitle || "AI Engineer",
          location: "Bengaluru, India",
          department: "AI & Data",
          experience_required: "6+ Years",
          description: jd
        })
      });
    } catch (e) {
      console.warn("Could not save new Job Description to database", e);
    }

    // 2. Trigger backend calculations with weights configuration
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
            window.location.href = "/candidates"; // Redirect to recalculated candidate ranks!
          }, 1500);
          return 100;
        }
        return next;
      });
    }, 120);

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
                
                {/* Step 1: paste/edit JD */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-bold text-sm text-foreground">Step 1: Edit Job Description</h3>
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
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-black text-primary uppercase tracking-wider">Engine Process</span>
                      <h4 className="font-bold text-sm text-foreground">{PIPELINE_STEPS[currentStepIdx]}</h4>
                    </div>
                    <span className="text-lg font-black text-primary">{progress}%</span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full transition-all duration-150" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Counter Stats Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/20 p-4 rounded-2xl border border-border/40">
                      <span className="text-[9px] text-muted-foreground font-black uppercase">Candidates Indexed</span>
                      <span className="block text-lg font-black text-foreground mt-1">{stats.parsed.toLocaleString()}</span>
                    </div>
                    <div className="bg-secondary/20 p-4 rounded-2xl border border-border/40">
                      <span className="text-[9px] text-muted-foreground font-black uppercase">Extracted Requirements</span>
                      <span className="block text-lg font-black text-foreground mt-1">{stats.requirements}</span>
                    </div>
                    <div className="bg-secondary/20 p-4 rounded-2xl border border-border/40">
                      <span className="text-[9px] text-muted-foreground font-black uppercase">Knowledge Triples</span>
                      <span className="block text-lg font-black text-foreground mt-1">{stats.graphs.toLocaleString()}</span>
                    </div>
                    <div className="bg-secondary/20 p-4 rounded-2xl border border-border/40">
                      <span className="text-[9px] text-muted-foreground font-black uppercase">Inferred Skills</span>
                      <span className="block text-lg font-black text-foreground mt-1">{stats.skills.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Terminal Activities Feed */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] text-muted-foreground font-black uppercase">Active Console Output</span>
                    <div className="bg-black/95 text-emerald-400 font-mono text-[10px] p-4 rounded-2xl border border-border/60 max-h-[140px] overflow-y-auto space-y-1.5 leading-relaxed">
                      {activityLogs.map((log, idx) => (
                        <div key={idx} className="flex gap-2">
                          <span className="text-zinc-600 select-none">[LOG]</span>
                          <span>{log}</span>
                        </div>
                      ))}
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                        <span className="text-zinc-400">awaiting task response...</span>
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm flex flex-col items-center justify-center text-center p-12 min-h-[300px] select-none">
                  <ShieldAlert className="h-12 w-12 text-muted-foreground/60 mb-3" />
                  <h4 className="font-bold text-sm text-foreground">Pipeline Inactive</h4>
                  <p className="text-xs text-muted-foreground max-w-[280px] mt-1 leading-relaxed">
                    Set up your sliders configuration weights and press start to execute the scoring engine.
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
