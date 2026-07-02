"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Users2, Shield } from "lucide-react";

export default function TeamPage() {
  const team = [
    { name: "Arjun Sharma", role: "Lead Recruiter", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop", status: "Active" },
    { name: "Ananya Sharma", role: "Talent Partner", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", status: "Active" },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div className="flex items-center gap-3 select-none">
            <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
              <Users2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground tracking-tight">Recruitment Team</h1>
              <p className="text-sm text-muted-foreground mt-0.5 font-medium">
                Manage members and access scopes inside the workspace.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl select-none">
            {team.map((member) => (
              <div key={member.name} className="bg-card border border-border rounded-[24px] p-6 shadow-sm flex items-center justify-between transition-colors duration-200">
                <div className="flex items-center gap-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-12 w-12 rounded-full object-cover border border-border"
                  />
                  <div className="flex flex-col">
                    <span className="font-black text-base text-foreground leading-none">{member.name}</span>
                    <span className="text-[10px] text-muted-foreground font-semibold mt-1.5">{member.role}</span>
                  </div>
                </div>
                <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] px-2.5 py-1 rounded-full border border-emerald-500/20">
                  {member.status}
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
