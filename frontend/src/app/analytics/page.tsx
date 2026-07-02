"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import DashboardCharts from "@/components/DashboardCharts";
import { getAnalyticsData } from "@/lib/api";
import { AnalyticsData } from "@/types";
import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getAnalyticsData();
        setAnalytics(res);
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, []);

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div className="flex items-center gap-3 select-none">
            <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground tracking-tight">System Analytics</h1>
              <p className="text-sm text-muted-foreground mt-0.5 font-medium">
                Detailed breakdowns of candidate quality, confidence spreads, and capability indices.
              </p>
            </div>
          </div>

          {analytics ? (
            <DashboardCharts data={analytics} />
          ) : (
            <div className="h-48 flex items-center justify-center text-muted-foreground font-semibold">
              Loading charts analytics...
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
