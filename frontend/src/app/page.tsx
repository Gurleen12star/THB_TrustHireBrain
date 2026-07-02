"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Brain, Shield, Sparkles, Check, Cpu } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-between select-none overflow-x-hidden">
      
      {/* 1. Top Navbar Header */}
      <header className="border-b border-border bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-xl text-primary flex items-center justify-center">
              <Brain className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base leading-none text-foreground">THB</span>
              <span className="text-[10px] text-muted-foreground font-semibold">TrustHireBrain</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link href="/dashboard" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link
              href="/dashboard"
              className="bg-primary text-primary-foreground text-xs font-bold py-2.5 px-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto px-6 py-20 text-center gap-8">
        
        {/* Sparkle Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-bold px-3.5 py-1.5 rounded-full">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Explainable Hiring Intelligence Platform</span>
        </div>

        {/* Hero Headings */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight leading-tight">
            Stop Resume Matching.<br />
            Measure <span className="text-primary">Hiring Potential</span>.
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
            Traditional systems answer <span className="italic text-foreground/80">"Who looks similar?"</span>.<br />
            TrustHireBrain answers <span className="font-bold text-primary">"Who has the highest hiring potential, and why?"</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto bg-primary text-primary-foreground font-bold text-sm py-3.5 px-8 rounded-2xl hover:opacity-95 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
          >
            Launch Live Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/new-analysis"
            className="w-full sm:w-auto bg-secondary hover:bg-secondary/80 text-foreground font-bold text-sm py-3.5 px-8 rounded-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-border/50"
          >
            Request Enterprise Demo
          </Link>
        </div>

        {/* Philosophical Comparison Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mt-12 text-left">
          {/* Legacy matching card */}
          <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden transition-colors duration-200">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Shield className="h-16 w-16 text-muted-foreground" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Traditional ATS</span>
              <h3 className="font-bold text-lg text-foreground mt-1">Keyword Matchers</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed font-medium">
              Filters profiles using simple regex searches, matching tags without context. Misses candidates who express skills differently.
            </p>
            <ul className="space-y-2 mt-2">
              <li className="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                Keyword density stuffing
              </li>
              <li className="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                Bias against non-traditional paths
              </li>
              <li className="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                Black-box scoring with no rationale
              </li>
            </ul>
          </div>

          {/* Explainable THB card */}
          <div className="bg-card border border-primary/20 dark:border-primary/30 rounded-[24px] p-6 shadow-md flex flex-col gap-4 relative overflow-hidden transition-colors duration-200">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Cpu className="h-16 w-16 text-primary" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">TrustHireBrain (THB)</span>
              <h3 className="font-bold text-lg text-foreground mt-1">Explainable AI Intelligence</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed font-medium">
              Maps experience semantically against requirement graphs. Calculates scores based on trust levels, evidence depth, and capability.
            </p>
            <ul className="space-y-2 mt-2">
              <li className="flex items-center gap-2 text-xs text-primary font-bold">
                <Check className="h-4 w-4 text-primary shrink-0" />
                Semantic NLP experience mapping
              </li>
              <li className="flex items-center gap-2 text-xs text-primary font-bold">
                <Check className="h-4 w-4 text-primary shrink-0" />
                Explainable capability breakdown
              </li>
              <li className="flex items-center gap-2 text-xs text-primary font-bold">
                <Check className="h-4 w-4 text-primary shrink-0" />
                Verification-weighted trust levels
              </li>
            </ul>
          </div>
        </div>

      </main>

      {/* 3. Footer */}
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground select-none">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; 2026 TrustHireBrain. All rights reserved. Enterprise-grade recruitment.</span>
          <div className="flex gap-4">
            <Link href="/dashboard" className="hover:underline">Privacy Policy</Link>
            <Link href="/dashboard" className="hover:underline">Terms of Service</Link>
            <Link href="/dashboard" className="hover:underline">Security Compliance</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
