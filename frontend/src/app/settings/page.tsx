"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Settings as SettingsIcon, Save } from "lucide-react";

export default function SettingsPage() {
  const [modelWeight, setModelWeight] = useState(50);
  const [atsToken, setAtsToken] = useState("••••••••••••••••••••••••");

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div className="flex items-center gap-3 select-none">
            <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
              <SettingsIcon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground tracking-tight">Settings</h1>
              <p className="text-sm text-muted-foreground mt-0.5 font-medium">
                Configure ATS integrations, weights of explainability metrics, and access keys.
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm flex flex-col gap-6 max-w-2xl transition-colors duration-200 select-none">
            {/* ATS Integrations */}
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-sm text-foreground">Applicant Tracking System (ATS) Tokens</h3>
              <input
                type="password"
                value={atsToken}
                onChange={(e) => setAtsToken(e.target.value)}
                className="w-full bg-secondary/50 dark:bg-secondary/20 border border-border/80 rounded-xl px-4 py-2.5 text-xs font-bold text-foreground focus:outline-none focus:border-primary"
              />
            </div>

            {/* Weights */}
            <div className="flex flex-col gap-3 border-t border-border pt-4">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-foreground">Skill Graph Semantic Distance Weight</span>
                <span className="text-primary">{modelWeight}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={modelWeight}
                onChange={(e) => setModelWeight(parseInt(e.target.value))}
                className="w-full h-1.5 bg-secondary dark:bg-secondary/40 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={() => alert("Settings saved successfully!")}
              className="bg-primary text-primary-foreground font-bold text-xs py-3 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Configuration
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
