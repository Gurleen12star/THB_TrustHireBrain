"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function TechnologyTrendsPage() {
  const trends = [
    { tech: "Agentic AI", change: "+120%", status: "growing", gap: "Critical shortage" },
    { tech: "RAG Systems", change: "+85%", status: "growing", gap: "Moderate shortage" },
    { tech: "Vector Databases", change: "+45%", status: "growing", gap: "Sufficient supply" },
    { tech: "TensorFlow", change: "-18%", status: "declining", gap: "Oversupply" },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div className="flex items-center gap-3 select-none">
            <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground tracking-tight">Technology Trends</h1>
              <p className="text-sm text-muted-foreground mt-0.5 font-medium">
                Track technology adoption and skill supply-demand indicators in the talent pool.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {trends.map((t) => (
              <div key={t.tech} className="bg-card border border-border rounded-[24px] p-6 shadow-sm flex items-center justify-between transition-colors duration-200">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Emerging Tech</span>
                  <h3 className="font-bold text-lg text-foreground block">{t.tech}</h3>
                  <span className={`text-xs font-semibold ${t.status === "growing" ? "text-emerald-500" : "text-amber-500"} block`}>
                    {t.gap}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-right">
                  <span className={`text-lg font-black ${t.status === "growing" ? "text-emerald-500" : "text-amber-500"}`}>
                    {t.change}
                  </span>
                  {t.status === "growing" ? (
                    <ArrowUpRight className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-amber-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
