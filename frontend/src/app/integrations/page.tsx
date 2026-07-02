"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Puzzle, Check } from "lucide-react";

export default function IntegrationsPage() {
  const integrations = [
    { name: "Greenhouse", status: "Connected", desc: "Sync open jobs and export candidate records automatically." },
    { name: "Workday Recruiter", status: "Not Connected", desc: "Sync enterprise profiles and candidate pipelines." },
    { name: "Slack", status: "Connected", desc: "Receive notifications of parsed candidates and trust alerts." },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div className="flex items-center gap-3 select-none">
            <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
              <Puzzle className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground tracking-tight">Integrations</h1>
              <p className="text-sm text-muted-foreground mt-0.5 font-medium">
                Connect external databases, applicant tracking systems, and workspace messengers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl select-none">
            {integrations.map((item) => (
              <div key={item.name} className="bg-card border border-border rounded-[24px] p-6 shadow-sm flex flex-col justify-between h-[200px] transition-colors duration-200">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-foreground">{item.name}</h3>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                      item.status === "Connected" 
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
                        : "bg-secondary text-muted-foreground border-border"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
                {item.status !== "Connected" && (
                  <button
                    onClick={() => alert(`Connecting ${item.name}...`)}
                    className="w-full bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs py-2 rounded-xl border border-border/50 text-center"
                  >
                    Connect API
                  </button>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
