"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { getJobDescription } from "@/lib/api";
import { JobDescription } from "@/types";
import { FileText, MapPin, Briefcase, Calendar } from "lucide-react";

export default function JobDescriptionsPage() {
  const [job, setJob] = useState<JobDescription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getJobDescription();
        setJob(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
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
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground tracking-tight">Job Descriptions</h1>
              <p className="text-sm text-muted-foreground mt-0.5 font-medium">
                Review parsed requirements and custom skill weightings.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="h-48 flex items-center justify-center text-muted-foreground font-semibold">
              Loading Job Descriptions...
            </div>
          ) : job ? (
            <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm flex flex-col gap-6 max-w-3xl transition-colors duration-200">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Active Analysis</span>
                <h2 className="text-2xl font-black text-foreground">{job.title}</h2>
              </div>

              {/* Meta tags */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-b border-border/50 py-4 text-xs font-semibold text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <span>{job.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Experience: {job.experience_required}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  <span>Status: {job.status}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-foreground">Role Overview</h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                  {job.description}. Responsible for building robust neural interfaces, deploying scalable search indexes, and architecting microservices pipelines.
                </p>
              </div>

              {/* Skill weightings */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-foreground">Skills Taxonomy Mapping</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {job.skills.map(skill => (
                    <div key={skill.id} className="border border-border/80 rounded-xl p-3.5 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-bold text-xs text-foreground">{skill.name}</span>
                        <span className="text-[9px] text-muted-foreground mt-0.5 capitalize font-medium">{skill.type} Priority</span>
                      </div>
                      <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-lg">
                        {skill.score}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="text-muted-foreground font-semibold">No Job Descriptions found.</div>
          )}
        </main>
      </div>
    </div>
  );
}
