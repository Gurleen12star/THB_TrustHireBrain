"use client";

import React, { useState } from "react";
import { X, CheckCircle2, AlertTriangle, ShieldCheck, Mail, MapPin, Briefcase, ChevronRight } from "lucide-react";
import { Candidate } from "@/types";

interface TopCandidateDetailsProps {
  candidate: Candidate;
  onClose: () => void;
}

export default function TopCandidateDetails({ candidate, onClose }: TopCandidateDetailsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "profile" | "timeline" | "evidence" | "report">("overview");

  // Custom SVG Radar Chart setup (CIP: Candidate Intelligence Profile)
  // Technical, Leadership, Learning, Execution, Trust, Behavior, Career
  const skillsData = [
    { name: "Technical", value: 86, angle: 0 },
    { name: "Leadership", value: 88, angle: (2 * Math.PI) / 7 },
    { name: "Learning", value: 98, angle: (4 * Math.PI) / 7 },
    { name: "Execution", value: 92, angle: (6 * Math.PI) / 7 },
    { name: "Trust", value: 96, angle: (8 * Math.PI) / 7 },
    { name: "Behavior", value: 89, angle: (10 * Math.PI) / 7 },
    { name: "Career", value: 83, angle: (12 * Math.PI) / 7 },
  ];

  const size = 200;
  const center = size / 2;
  const maxVal = 100;
  const radarRadius = 70;

  // Calculate coordinates for skill points
  const points = skillsData.map(d => {
    const r = (d.value / maxVal) * radarRadius;
    const x = center + r * Math.sin(d.angle);
    const y = center - r * Math.cos(d.angle);
    return `${x},${y}`;
  }).join(" ");

  // Grid rings coordinates (levels: 25%, 50%, 75%, 100%)
  const rings = [25, 50, 75, 100].map(level => {
    return skillsData.map(d => {
      const r = (level / maxVal) * radarRadius;
      const x = center + r * Math.sin(d.angle);
      const y = center - r * Math.cos(d.angle);
      return `${x},${y}`;
    }).join(" ");
  });

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end select-none animate-fade-in">
      <div className="w-full max-w-[620px] bg-card border-l border-border h-full flex flex-col justify-between shadow-2xl relative animate-slide-in p-6 overflow-y-auto">
        
        {/* Header Drawer Actions */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black text-xs px-2.5 py-1 rounded-full border border-emerald-500/20">
                Rank #{candidate.rank || 1}
              </span>
              <h3 className="font-bold text-lg text-foreground">Top Candidate Detail</h3>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-secondary transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Profile overview card (Matches Screen 1 Top) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <img
                src={candidate.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"}
                alt={candidate.name}
                className="h-16 w-16 rounded-full object-cover border border-border"
              />
              <div className="flex flex-col">
                <h4 className="font-black text-xl text-foreground leading-none">{candidate.name}</h4>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5 font-medium">
                  <Briefcase className="h-3.5 w-3.5" />
                  <span>{candidate.role} @ {candidate.company || "TechNova"}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1 font-medium">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{candidate.location}</span>
                </div>
              </div>
            </div>

            {/* Hiring potential circle */}
            <div className="flex items-center gap-3 bg-secondary/30 dark:bg-secondary/15 p-3.5 rounded-2xl border border-border/50">
              <div className="relative flex items-center justify-center h-12 w-12 shrink-0">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle cx="24" cy="24" r="18" className="stroke-secondary dark:stroke-secondary/30 fill-none" strokeWidth="4" />
                  <circle
                    cx="24"
                    cy="24"
                    r="18"
                    className="stroke-emerald-500 fill-none"
                    strokeWidth="4"
                    strokeDasharray={2 * Math.PI * 18}
                    strokeDashoffset={2 * Math.PI * 18 - (candidate.hiring_potential / 100) * (2 * Math.PI * 18)}
                  />
                </svg>
                <span className="absolute text-xs font-black text-foreground">{candidate.hiring_potential}%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Hiring</span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Potential</span>
              </div>
            </div>
          </div>

          {/* Badges metadata */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-xl border border-primary/20">
              {candidate.yoe} YOE
            </span>
            {candidate.open_to_work && (
              <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-500/20">
                Open to Work
              </span>
            )}
            <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1.5 rounded-xl border border-blue-500/20 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              High Trust
            </span>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-border mb-6 overflow-x-auto gap-2">
            {(["overview", "profile", "timeline", "evidence", "report"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-3 border-b-2 font-bold text-xs capitalize transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "profile" ? "Intelligence Profile" : tab}
              </button>
            ))}
          </div>

          {/* Content corresponding to active tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Radar Chart (CIP) */}
                <div className="md:col-span-6 flex flex-col items-center justify-center">
                  <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 self-start">
                    Candidate Intelligence Profile (CIP)
                  </h5>
                  <div className="w-full max-w-[200px] aspect-square flex items-center justify-center">
                    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible">
                      {/* Grid rings */}
                      {rings.map((ringPoints, i) => (
                        <polygon
                          key={i}
                          points={ringPoints}
                          className="fill-none stroke-border/40 dark:stroke-border/20"
                          strokeWidth="1"
                        />
                      ))}
                      {/* Axis lines */}
                      {skillsData.map((d, i) => {
                        const x = center + radarRadius * Math.sin(d.angle);
                        const y = center - radarRadius * Math.cos(d.angle);
                        return (
                          <line
                            key={i}
                            x1={center}
                            y1={center}
                            x2={x}
                            y2={y}
                            className="stroke-border/40 dark:stroke-border/20"
                            strokeWidth="1"
                          />
                        );
                      })}
                      {/* Data polygon */}
                      <polygon
                        points={points}
                        className="fill-primary/20 stroke-primary"
                        strokeWidth="2"
                      />
                      {/* Data points */}
                      {skillsData.map((d, i) => {
                        const r = (d.value / maxVal) * radarRadius;
                        const x = center + r * Math.sin(d.angle);
                        const y = center - r * Math.cos(d.angle);
                        return (
                          <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="3.5"
                            className="fill-primary stroke-background"
                            strokeWidth="1"
                          />
                        );
                      })}
                      {/* Labels */}
                      {skillsData.map((d, i) => {
                        // Offset labels outward
                        const labelRadius = radarRadius + 18;
                        const x = center + labelRadius * Math.sin(d.angle);
                        const y = center - labelRadius * Math.cos(d.angle);
                        let anchor: "start" | "middle" | "end" | "inherit" | undefined = "middle";
                        if (Math.sin(d.angle) > 0.1) anchor = "start";
                        if (Math.sin(d.angle) < -0.1) anchor = "end";
                        return (
                          <text
                            key={i}
                            x={x}
                            y={y + 3}
                            className="fill-foreground text-[8px] font-bold"
                            textAnchor={anchor}
                          >
                            {d.name} {d.value}
                          </text>
                        );
                      })}
                    </svg>
                  </div>
                </div>

                {/* Strengths & Risks */}
                <div className="md:col-span-6 space-y-4">
                  {/* Strengths */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Key Strengths
                    </h5>
                    <div className="space-y-1.5">
                      {candidate.strengths_risks.filter(sr => sr.type === "strength").map(sr => (
                        <div key={sr.id} className="flex items-start gap-2 text-xs text-foreground/80 font-medium">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{sr.content}</span>
                        </div>
                      ))}
                      {candidate.strengths_risks.filter(sr => sr.type === "strength").length === 0 && (
                        <p className="text-xs text-muted-foreground italic">No specific strengths indexed</p>
                      )}
                    </div>
                  </div>

                  {/* Risks */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Risk Factors
                    </h5>
                    <div className="space-y-1.5">
                      {candidate.strengths_risks.filter(sr => sr.type === "risk").map(sr => (
                        <div key={sr.id} className="flex items-start gap-2 text-xs text-foreground/80 font-medium">
                          <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>{sr.content}</span>
                        </div>
                      ))}
                      {candidate.strengths_risks.filter(sr => sr.type === "risk").length === 0 && (
                        <p className="text-xs text-muted-foreground italic">No significant risk factors flagged</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Recommendation panel (Matches Screen 1 Bottom left) */}
              <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-2xl p-4 flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                  AI Recommendation
                </span>
                <h5 className="font-bold text-sm text-foreground">
                  Strong Hire
                </h5>
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                  {candidate.recommendation || "Excellent fit for this role. High technical expertise and great growth trajectory."}
                </p>
              </div>

              {/* Confidence rating (Matches Screen 1 Bottom right) */}
              <div className="flex items-center justify-between border border-border rounded-2xl p-4 bg-secondary/20 dark:bg-secondary/10">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Confidence
                  </span>
                  <span className="text-sm font-bold text-foreground mt-0.5">
                    {candidate.confidence}% Very High
                  </span>
                  <span className="text-[9px] text-muted-foreground mt-0.5">
                    Based on verified resume evidence
                  </span>
                </div>
                {/* Circular indicator */}
                <div className="relative flex items-center justify-center h-10 w-10 shrink-0">
                  <svg className="w-10 h-10 transform -rotate-90">
                    <circle cx="20" cy="20" r="15" className="stroke-secondary dark:stroke-secondary/30 fill-none" strokeWidth="3" />
                    <circle
                      cx="20"
                      cy="20"
                      r="15"
                      className="stroke-primary fill-none"
                      strokeWidth="3"
                      strokeDasharray={2 * Math.PI * 15}
                      strokeDashoffset={2 * Math.PI * 15 - (candidate.confidence / 100) * (2 * Math.PI * 15)}
                    />
                  </svg>
                  <span className="absolute text-[10px] font-black text-foreground">{candidate.confidence}%</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-4 animate-fade-in">
              <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Skills Dependency Knowledge Graph
              </h5>
              <div className="bg-secondary/15 rounded-2xl p-4 border border-border/40 flex flex-col items-center">
                <svg viewBox="0 0 340 70" className="w-full h-[70px] overflow-visible">
                  <defs>
                    <marker id="arrow2" viewBox="0 0 10 10" refX="20" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary/60" />
                    </marker>
                  </defs>
                  {["Python", "PyTorch", "Transformers", "LLM"].map((node, i) => {
                    const x = 35 + i * 85;
                    const y = 35;
                    return (
                      <g key={node}>
                        {i < 3 && (
                          <line
                            x1={x}
                            y1={y}
                            x2={x + 85}
                            y2={y}
                            className="stroke-primary/50 stroke-dasharray-[4,4] animate-pulse"
                            strokeWidth="2"
                            markerEnd="url(#arrow2)"
                          />
                        )}
                        <circle cx={x} cy={y} r={18} className="fill-card stroke-primary" strokeWidth="2" />
                        <text x={x} y={y + 3} className="fill-foreground text-[8px] font-black" textAnchor="middle">
                          {node}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          )}

          {activeTab === "timeline" && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Career Progression Timeline
                </h5>
                <div className="flex items-center flex-wrap gap-2.5">
                  {["Backend Eng", "ML Eng", "Senior ML Eng", "LLM Eng"].map((role, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-secondary/35 p-2 rounded-xl border border-border">
                      <span className="h-4.5 w-4.5 bg-primary/10 text-primary rounded-full text-[9px] font-black flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-[10px] font-bold text-foreground">{role}</span>
                      {idx < 3 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0 ml-1" />}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3 border-t border-border/50 pt-4">
                <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Technology Evolution Path
                </h5>
                <div className="flex flex-wrap items-center gap-2">
                  {["Python", "TensorFlow", "Transformers", "LLM", "RAG"].map((tech, idx) => (
                    <React.Fragment key={idx}>
                      <span className="bg-secondary/60 text-foreground text-[10px] font-bold px-2.5 py-1 rounded-xl">
                        {tech}
                      </span>
                      {idx < 4 && <span className="text-muted-foreground text-xs">→</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "evidence" && (
            <div className="space-y-4 animate-fade-in">
              <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Verified Recommendation Evidence
              </h5>
              <div className="space-y-3 text-xs leading-relaxed text-foreground/80 font-medium">
                <div className="border border-border/80 rounded-xl p-3.5 bg-secondary/15 flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">Verified Resume Logs</span>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Calculated {candidate.yoe} Years of verifiable experience in similar neural stacks.</p>
                  </div>
                </div>
                <div className="border border-border/80 rounded-xl p-3.5 bg-secondary/15 flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">Project Architecture Matches</span>
                    <p className="text-[11px] text-muted-foreground mt-0.5">GitHub commits match scalable embedding indexing with vector datastores.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "report" && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border border-border/80 rounded-2xl p-4 bg-secondary/15">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Trust Score Index
                  </span>
                  <span className="text-xl font-black text-primary mt-1">
                    {candidate.trust_score}% Verified
                  </span>
                </div>
                <ShieldCheck className="h-10 w-10 text-emerald-500" />
              </div>

              <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-4">
                Verification Checklist
              </h5>
              <div className="space-y-2 text-xs font-bold">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4.5 w-4.5" />
                  <span>✔ Active Github & LinkedIn Profiles</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4.5 w-4.5" />
                  <span>✔ Strong Corporate Project Evidence</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4.5 w-4.5" />
                  <span>✔ Consistent Tenures (No Unexplained Gaps)</span>
                </div>
                <div className="flex items-center gap-2 text-amber-500">
                  <AlertTriangle className="h-4.5 w-4.5" />
                  <span>⚠ Minimal External Certifications</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="border-t border-border pt-4 mt-6 flex gap-3">
          <button
            onClick={() => alert("Candidate interview scheduled!")}
            className="flex-1 bg-primary text-primary-foreground font-bold text-xs py-3 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all shadow-sm text-center"
          >
            Invite to Interview
          </button>
          <button
            onClick={() => alert("Report downloaded successfully!")}
            className="flex-1 bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs py-3 rounded-2xl active:scale-[0.98] transition-all text-center border border-border/50"
          >
            Download Full Report
          </button>
        </div>

      </div>
    </div>
  );
}
