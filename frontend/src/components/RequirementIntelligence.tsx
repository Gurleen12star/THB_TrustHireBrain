"use client";

import React from "react";
import { Info, ArrowRight } from "lucide-react";
import Link from "next/link";
import { JobSkill } from "@/types";

interface RequirementIntelligenceProps {
  skills: JobSkill[];
}

export default function RequirementIntelligence({ skills }: RequirementIntelligenceProps) {
  // Group skills or select top ones
  const displayedSkills = skills.slice(0, 8);

  return (
    <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm flex flex-col justify-between h-full select-none transition-colors duration-200">
      <div>
        {/* Title Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-foreground">Requirement Intelligence</h3>
            <Info className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
          </div>
          <Link
            href="/skill-graph"
            className="text-xs font-semibold text-primary hover:opacity-80 flex items-center gap-1 transition-opacity"
          >
            View Full Graph
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Content Columns: Skills list on left, network graph on right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Column: Top Required Skills */}
          <div className="md:col-span-6 space-y-4">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
              Top Required Skills
            </h4>
            <div className="space-y-3.5">
              {displayedSkills.map((skill) => (
                <div key={skill.id} className="space-y-1">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span className="text-foreground/80 font-semibold">{skill.name}</span>
                    <span className="text-foreground font-bold">{skill.score}%</span>
                  </div>
                  {/* Progress Bar Container */}
                  <div className="h-2 w-full bg-secondary dark:bg-secondary/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive SVG Network Graph */}
          <div className="md:col-span-6 flex flex-col items-center justify-center">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 self-start md:pl-6">
              Requirement Graph
            </h4>
            <div className="relative w-full max-w-[280px] aspect-square bg-secondary/20 dark:bg-secondary/10 rounded-2xl p-2 border border-border/50">
              <svg viewBox="0 0 300 240" className="w-full h-full overflow-visible">
                {/* Connection lines from center to nodes */}
                <line x1="150" y1="120" x2="185" y2="50" stroke="currentColor" className="text-border" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="150" y1="120" x2="250" y2="100" stroke="currentColor" className="text-border" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="150" y1="120" x2="235" y2="175" stroke="currentColor" className="text-border" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="150" y1="120" x2="165" y2="200" stroke="currentColor" className="text-border" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="150" y1="120" x2="80" y2="175" stroke="currentColor" className="text-border" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="150" y1="120" x2="75" y2="90" stroke="currentColor" className="text-border" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Central Node: LLM System */}
                <circle cx="150" cy="120" r="30" className="fill-primary" />
                <text x="150" y="117" className="fill-primary-foreground text-[10px] font-bold" textAnchor="middle">LLM</text>
                <text x="150" y="129" className="fill-primary-foreground text-[10px] font-bold" textAnchor="middle">System</text>

                {/* Node: Python */}
                <circle cx="185" cy="50" r="12" className="fill-blue-500" />
                <text x="185" y="53" className="fill-white text-[8px] font-bold" textAnchor="middle">98</text>
                <text x="185" y="32" className="fill-foreground text-[10px] font-bold" textAnchor="middle">Python</text>

                {/* Node: NLP */}
                <circle cx="250" cy="100" r="12" className="fill-emerald-500" />
                <text x="250" y="103" className="fill-white text-[8px] font-bold" textAnchor="middle">95</text>
                <text x="250" y="82" className="fill-foreground text-[10px] font-bold" textAnchor="middle">NLP</text>

                {/* Node: Vector DB */}
                <circle cx="235" cy="175" r="12" className="fill-emerald-500" />
                <text x="235" y="178" className="fill-white text-[8px] font-bold" textAnchor="middle">85</text>
                <text x="235" y="195" className="fill-foreground text-[10px] font-bold" textAnchor="middle">Vector DB</text>

                {/* Node: MLOps */}
                <circle cx="165" cy="200" r="12" className="fill-emerald-500" />
                <text x="165" y="203" className="fill-white text-[8px] font-bold" textAnchor="middle">88</text>
                <text x="165" y="220" className="fill-foreground text-[10px] font-bold" textAnchor="middle">MLOps</text>

                {/* Node: Cloud */}
                <circle cx="80" cy="175" r="12" className="fill-blue-500" />
                <text x="80" y="178" className="fill-white text-[8px] font-bold" textAnchor="middle">75</text>
                <text x="80" y="195" className="fill-foreground text-[10px] font-bold" textAnchor="middle">Cloud</text>

                {/* Node: ML */}
                <circle cx="75" cy="90" r="12" className="fill-emerald-500" />
                <text x="75" y="93" className="fill-white text-[8px] font-bold" textAnchor="middle">93</text>
                <text x="75" y="72" className="fill-foreground text-[10px] font-bold" textAnchor="middle">ML</text>
              </svg>
            </div>

            {/* Graph Legend */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 text-[10px] font-semibold text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-violet-600"></span>
                <span>Critical</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                <span>Important</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>Preferred</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                <span>Nice to have</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border/50">
        <Link
          href="/skill-graph"
          className="w-full flex items-center justify-center gap-2 bg-secondary/50 dark:bg-secondary/20 text-foreground/80 hover:bg-secondary font-bold text-xs py-3 px-4 rounded-2xl transition-all duration-200"
        >
          View Requirement Graph
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
