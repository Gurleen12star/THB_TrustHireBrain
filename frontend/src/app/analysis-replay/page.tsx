"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { 
  Play, Pause, RotateCcw, GitBranch, Users, ShieldCheck, Trophy, Sparkles, Server 
} from "lucide-react";

export default function AnalysisReplayPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(10); // 10x default
  const [activeStep, setActiveStep] = useState("idle"); // idle, requirements, parsing, knowledge, settling, done

  const [mockCandidates, setMockCandidates] = useState<any[]>([]);

  // Simulation controls
  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setProgress(0);
    setIsPlaying(false);
    setActiveStep("idle");
    setMockCandidates([]);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 1;

        // Set steps based on timeline progress
        if (next < 25) {
          setActiveStep("requirements");
        } else if (next >= 25 && next < 55) {
          setActiveStep("parsing");
        } else if (next >= 55 && next < 80) {
          setActiveStep("knowledge");
        } else if (next >= 80 && next < 100) {
          setActiveStep("settling");
        } else {
          setActiveStep("done");
          setIsPlaying(false);
          clearInterval(interval);
          
          // Final shortlist loaded
          setMockCandidates([
            { rank: 1, name: "Aarav Patel", role: "Senior AI Engineer", potential: 96, trust: 88 },
            { rank: 2, name: "Meera Iyer", role: "AI Engineer", potential: 94, trust: 97 },
            { rank: 3, name: "Rohan Verma", role: "Senior ML Engineer", potential: 93, trust: 95 }
          ]);
          return 100;
        }

        // Live candidate stream during parsing phase
        if (next >= 25 && next < 55) {
          const names = ["Karan Singh", "Sneha Reddy", "Arjun Nair", "Devi Pillai", "Priya Das"];
          const roles = ["ML Engineer", "Data Scientist", "PyTorch Specialist", "AI Developer"];
          const randomName = names[Math.floor(Math.random() * names.length)];
          const randomRole = roles[Math.floor(Math.random() * roles.length)];
          
          setMockCandidates(prevList => [
            { rank: "?", name: randomName, role: randomRole, potential: Math.floor(Math.random() * 20) + 75, trust: Math.floor(Math.random() * 20) + 80 },
            ...prevList.slice(0, 2)
          ]);
        }

        return next;
      });
    }, 1500 / speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Header Title */}
          <div className="flex items-center gap-3 select-none">
            <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
              <RotateCcw className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground tracking-tight">Analysis Replay</h1>
              <p className="text-sm text-muted-foreground mt-0.5 font-medium">
                Replay the entire matching pipeline logic at 10× speed to visualize decision paths.
              </p>
            </div>
          </div>

          {/* Replay Controls card */}
          <div className="bg-card border border-border rounded-[24px] p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
            <div className="flex items-center gap-3">
              <button
                onClick={handleTogglePlay}
                className="bg-primary text-primary-foreground p-3 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2 text-xs font-bold"
              >
                {isPlaying ? <Pause className="h-4.5 w-4.5" /> : <Play className="h-4.5 w-4.5" />}
                {isPlaying ? "Pause" : "Play Replay"}
              </button>
              <button
                onClick={handleReset}
                className="border border-border hover:border-primary/50 text-foreground p-3 rounded-2xl bg-card hover:shadow-sm active:scale-[0.98] transition-all cursor-pointer"
                title="Reset Replay"
              >
                <RotateCcw className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Custom Speed dial */}
            <div className="flex items-center gap-2 border border-border p-1 rounded-xl bg-secondary/20">
              {[5, 10, 20].map(s => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    speed === s ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}x Speed
                </button>
              ))}
            </div>

            {/* Progress bar */}
            <div className="flex-1 max-w-md w-full flex items-center gap-3">
              <div className="flex-1 h-2 bg-secondary dark:bg-secondary/40 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-150" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
              <span className="text-xs font-bold text-primary min-w-[35px] text-right">{progress}%</span>
            </div>
          </div>

          {/* Visual Workspace Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
            
            {/* Top Left: Requirement Graph compilation */}
            <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm flex flex-col justify-between h-[280px]">
              <div>
                <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-primary" />
                  1. Compilation of Requirement Graph
                </h3>
                <p className="text-xs text-muted-foreground font-medium mt-1">
                  NLP engine maps JD nodes and priority weightings.
                </p>
              </div>

              <div className="bg-secondary/10 rounded-2xl p-4 flex justify-center items-center h-[150px]">
                <svg viewBox="0 0 300 60" className="w-full max-w-[280px] overflow-visible">
                  {["LLM", "Embeddings", "FAISS", "RAG"].map((node, i) => {
                    const x = 30 + i * 80;
                    const y = 30;
                    const isLit = activeStep !== "idle" && (
                      activeStep === "requirements" ? i <= Math.floor(progress / 6) : true
                    );
                    return (
                      <g key={node}>
                        {i < 3 && (
                          <line
                            x1={x}
                            y1={y}
                            x2={x + 80}
                            y2={y}
                            className={`stroke-2 transition-all ${isLit ? "stroke-primary" : "stroke-border/40"}`}
                          />
                        )}
                        <circle 
                          cx={x} 
                          cy={y} 
                          r={16} 
                          className={`transition-all ${isLit ? "fill-primary/20 stroke-primary" : "fill-card stroke-border"}`} 
                          strokeWidth="2" 
                        />
                        <text x={x} y={y + 3} className="fill-foreground text-[8px] font-black" textAnchor="middle">
                          {node}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Top Right: Knowledge Graph connections pulsing */}
            <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm flex flex-col justify-between h-[280px]">
              <div>
                <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                  <Server className="h-4 w-4 text-primary" />
                  2. Skills Knowledge Graph Paths
                </h3>
                <p className="text-xs text-muted-foreground font-medium mt-1">
                  Visualizes path connections matching job taxonomy.
                </p>
              </div>

              <div className="bg-secondary/10 rounded-2xl p-4 flex justify-center items-center h-[150px]">
                <svg viewBox="0 0 300 80" className="w-full max-w-[280px] overflow-visible">
                  {/* Outer circle layout */}
                  {["Python", "PyTorch", "Transformers", "LLM"].map((tech, i) => {
                    const angle = (i * Math.PI) / 2;
                    const x = 150 + 60 * Math.sin(angle);
                    const y = 40 - 30 * Math.cos(angle);
                    const isLit = activeStep === "knowledge" || activeStep === "settling" || activeStep === "done";
                    
                    return (
                      <g key={tech}>
                        {/* Lines connecting from center to outer */}
                        {isLit && (
                          <line
                            x1="150"
                            y1="40"
                            x2={x}
                            y2={y}
                            className="stroke-primary stroke-2 stroke-dasharray-[3,3] animate-pulse"
                          />
                        )}
                        <circle
                          cx={x}
                          cy={y}
                          r={16}
                          className={`transition-all ${isLit ? "fill-primary/10 stroke-primary" : "fill-card stroke-border"}`}
                          strokeWidth="2"
                        />
                        <text x={x} y={y + 3} className="fill-foreground text-[7px] font-black" textAnchor="middle">
                          {tech}
                        </text>
                      </g>
                    );
                  })}
                  {/* Center Node */}
                  <circle cx="150" cy="40" r="12" className="fill-primary stroke-background" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Bottom Left: Candidates parsed streaming */}
            <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm flex flex-col justify-between h-[280px]">
              <div>
                <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  3. Candidate Stream Parser
                </h3>
                <p className="text-xs text-muted-foreground font-medium mt-1">
                  Candidates are evaluated for matching weights and experience.
                </p>
              </div>

              {/* Scrolling List */}
              <div className="bg-secondary/10 rounded-2xl p-4 flex flex-col gap-2 h-[150px] overflow-y-auto">
                {activeStep === "idle" && (
                  <div className="text-xs text-muted-foreground italic text-center my-auto">Replay offline. Click Play.</div>
                )}
                {activeStep === "requirements" && (
                  <div className="text-xs text-muted-foreground italic text-center my-auto">Waiting for requirement compilation...</div>
                )}
                {(activeStep === "parsing" || activeStep === "knowledge" || activeStep === "settling" || activeStep === "done") && (
                  <div className="space-y-2">
                    {mockCandidates.map((cand, idx) => (
                      <div key={idx} className="bg-card border border-border/80 p-2.5 rounded-xl flex justify-between items-center animate-slide-in">
                        <div className="flex flex-col">
                          <span className="font-bold text-[10px] text-foreground leading-none">{cand.name}</span>
                          <span className="text-[8px] text-muted-foreground font-semibold mt-1">{cand.role}</span>
                        </div>
                        <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-lg">
                          {cand.potential}% Match
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Right: Final Shortlist settling */}
            <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm flex flex-col justify-between h-[280px]">
              <div>
                <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  4. Rank Placement & Settle
                </h3>
                <p className="text-xs text-muted-foreground font-medium mt-1">
                  Final top matches are settled into position.
                </p>
              </div>

              <div className="bg-secondary/10 rounded-2xl p-4 flex flex-col justify-center gap-2.5 h-[150px]">
                {activeStep !== "settling" && activeStep !== "done" ? (
                  <div className="text-xs text-muted-foreground italic text-center my-auto">Awaiting compilation ranks...</div>
                ) : (
                  <div className="space-y-2 animate-fade-in">
                    {mockCandidates.filter(c => c.rank !== "?").map((cand, i) => (
                      <div key={i} className="flex items-center justify-between bg-card border border-border rounded-xl p-2.5 shadow-sm">
                        <div className="flex items-center gap-3">
                          <span className="bg-primary/10 text-primary font-black text-[9px] h-5.5 w-5.5 rounded-full flex items-center justify-center shrink-0 border border-primary/20">
                            #{cand.rank}
                          </span>
                          <div className="flex flex-col">
                            <span className="font-bold text-[10px] text-foreground leading-none">{cand.name}</span>
                            <span className="text-[8px] text-muted-foreground mt-1 font-semibold">{cand.role}</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-blue-500 font-bold flex items-center gap-0.5">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          {cand.trust}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
