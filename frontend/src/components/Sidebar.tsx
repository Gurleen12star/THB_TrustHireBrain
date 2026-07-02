"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  PlusCircle,
  RotateCcw,
  GitBranch,
  TrendingUp,
  BarChart3,
  Award,
  Columns,
  MessageSquareCode,
  Users2,
  Settings as SettingsIcon,
  Puzzle,
  Terminal,
  Brain,
  Menu,
  ChevronLeft,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

// Navigation Structure
const navSections = [
  {
    title: "ANALYSIS",
    items: [
      { name: "Job Descriptions", href: "/job-descriptions", icon: FileText },
      { name: "Candidates", href: "/candidates", icon: Users },
      { name: "New Analysis", href: "/new-analysis", icon: PlusCircle },
      { name: "Analysis Replay", href: "/analysis-replay", icon: RotateCcw },
    ]
  },
  {
    title: "INTELLIGENCE",
    items: [
      { name: "Skill Graph", href: "/skill-graph", icon: GitBranch },
      { name: "Technology Trends", href: "/technology-trends", icon: TrendingUp },
      { name: "Analytics", href: "/analytics", icon: BarChart3 },
    ]
  },
  {
    title: "SHORTLIST",
    items: [
      { name: "Top Candidates", href: "/top-candidates", icon: Award },
      { name: "Compare Candidates", href: "/compare", icon: Columns },
      { name: "Interview Questions", href: "/interview-questions", icon: MessageSquareCode },
    ]
  },
  {
    title: "SETTINGS",
    items: [
      { name: "Team", href: "/team", icon: Users2 },
      { name: "Settings", href: "/settings", icon: SettingsIcon },
      { name: "Integrations", href: "/integrations", icon: Puzzle },
      { name: "Logs", href: "/logs", icon: Terminal },
    ]
  }
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/dashboard" && pathname === "/") return true;
    return pathname === href;
  };

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 bg-card border-r border-border flex flex-col justify-between transition-all duration-300 z-40 select-none",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between p-4 h-16 border-b border-border">
          <Link href="/" className="flex items-center gap-3 overflow-hidden">
            <div className="bg-primary/10 p-2 rounded-xl text-primary flex items-center justify-center shrink-0">
              <Brain className="h-6 w-6" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none tracking-tight text-foreground">THB</span>
                <span className="text-xs text-muted-foreground font-medium">TrustHireBrain</span>
              </div>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-secondary transition-colors duration-150"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-220px)]">
          {/* Main Dashboard Link */}
          <div className="space-y-1">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-[12px] font-medium text-sm transition-all duration-200 group relative",
                isLinkActive("/") || pathname === "/dashboard"
                  ? "bg-primary/10 text-primary dark:bg-primary/20"
                  : "text-foreground/70 hover:text-foreground hover:bg-secondary"
              )}
            >
              <LayoutDashboard className="h-5 w-5 shrink-0" />
              {!collapsed && <span>Dashboard</span>}
            </Link>
          </div>

          {/* Sectional Nav Links */}
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              {!collapsed ? (
                <div className="text-[10px] font-bold text-muted-foreground tracking-wider px-3 pt-2">
                  {section.title}
                </div>
              ) : (
                <div className="border-t border-border/50 my-2 pt-2" />
              )}
              {section.items.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-[12px] font-medium text-sm transition-all duration-200 group relative",
                    isLinkActive(item.href)
                      ? "bg-primary/10 text-primary dark:bg-primary/20"
                      : "text-foreground/70 hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>{item.name}</span>}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground border border-border text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-md">
                      {item.name}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>

      {/* Upgrade Plan Card */}
      <div className="p-4">
        {collapsed ? (
          <Link
            href="/upgrade"
            className="flex items-center justify-center p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-200"
          >
            <Sparkles className="h-5 w-5" />
          </Link>
        ) : (
          <div className="bg-secondary/50 dark:bg-secondary/30 border border-border/50 rounded-3xl p-4 flex flex-col gap-3 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="h-12 w-12 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-primary" />
                <span className="font-bold text-sm text-foreground">THB Pro</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 font-medium">Enterprise Plan</p>
            </div>
            <Link
              href="/upgrade"
              className="bg-primary text-primary-foreground font-semibold text-center text-xs py-2.5 px-4 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-sm"
            >
              Upgrade Plan
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
