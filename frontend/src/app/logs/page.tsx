"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Terminal } from "lucide-react";

export default function LogsPage() {
  const logs = [
    { time: "17:02:11", module: "SYSTEM", text: "SQLite dev database initialized" },
    { time: "17:02:15", module: "DB", text: "Seeding metrics: 100,000 candidates indexed" },
    { time: "17:02:18", module: "NLP", text: "Successfully parsed AI Engineer job requirements" },
    { time: "17:05:32", module: "GRAPH", text: "Skill network graph compiled (LLM center node)" },
    { time: "17:06:01", module: "SCORING", text: "Aarav Patel hiring potential calculated at 96%" },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div className="flex items-center gap-3 select-none">
            <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
              <Terminal className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground tracking-tight">System Logs</h1>
              <p className="text-sm text-muted-foreground mt-0.5 font-medium">
                Review background execution logs, NLP parse metrics, and SQLite database sync cycles.
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm flex flex-col gap-4 max-w-3xl transition-colors duration-200 select-none">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <Terminal className="h-5 w-5 text-primary" />
              <h3 className="font-bold text-sm text-foreground">Standard Output Log Console</h3>
            </div>
            <div className="bg-black text-emerald-400 font-mono text-[10px] p-4 rounded-xl space-y-2 h-[320px] overflow-y-auto">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-muted-foreground">[{log.time}]</span>
                  <span className="text-primary font-bold">[{log.module}]</span>
                  <span>{log.text}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
