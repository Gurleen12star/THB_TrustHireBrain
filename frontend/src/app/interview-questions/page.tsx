"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { MessageSquareCode, Check } from "lucide-react";

export default function InterviewQuestionsPage() {
  const questions = [
    { q: "Design a scalable RAG indexing architecture that handles 10M vectors with sub-100ms latency. Which vector databases would you select and why?", target: "Vector Database Experience check" },
    { q: "Explain how you optimize LLM fine-tuning contexts to prevent memory bloat in deep learning environments. Share an example using PyTorch.", target: "LLM & PyTorch expertise check" },
    { q: "Since you have limited Kubernetes history, how would you configure containerized deployments for high-availability AI endpoints?", target: "Orchestration risk check" },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div className="flex items-center gap-3 select-none">
            <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
              <MessageSquareCode className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground tracking-tight">Interview Questions</h1>
              <p className="text-sm text-muted-foreground mt-0.5 font-medium">
                AI-generated behavioral and technical screening questions targeting candidate capability gaps.
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm flex flex-col gap-6 max-w-3xl transition-colors duration-200 select-none">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Candidate Specific</span>
              <h3 className="font-bold text-lg text-foreground">Screening Aarav Patel</h3>
            </div>

            <div className="space-y-4">
              {questions.map((q, idx) => (
                <div key={idx} className="border border-border/80 rounded-2xl p-4 flex flex-col gap-2 bg-secondary/10">
                  <div className="flex items-center gap-2">
                    <span className="h-5 w-5 bg-primary/10 text-primary rounded-full text-xs font-black flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{q.target}</span>
                  </div>
                  <p className="text-xs text-foreground/90 leading-relaxed font-semibold">
                    {q.q}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
