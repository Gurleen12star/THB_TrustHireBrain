"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { GitBranch, Info } from "lucide-react";

export default function SkillGraphPage() {
  const [selectedNode, setSelectedNode] = useState<string | null>("LLM System");

  const nodesInfo: Record<string, { desc: string; category: string; match: number }> = {
    "LLM System": { desc: "Core language model structure, prompt engineering, context windows, and parameters optimization.", category: "Critical", match: 98 },
    "Python": { desc: "Primary programming language for scripting, AI algorithms, data pipelines, and tool bindings.", category: "Critical", match: 98 },
    "NLP": { desc: "Natural Language Processing algorithms, semantic tokenizers, entity extractors, and syntax trees.", category: "Critical", match: 95 },
    "Vector DB": { desc: "Semantic vector databases (Pinecone, Chroma, Milvus, Qdrant) for fast nearest neighbor search.", category: "Preferred", match: 85 },
    "MLOps": { desc: "Machine Learning pipeline deployment, monitoring, experiment tracking, and model versioning.", category: "Preferred", match: 88 },
    "Cloud": { desc: "Cloud infrastructure (AWS, GCP, Azure) for compute instances, serverless functions, and storage.", category: "Important", match: 75 },
    "ML": { desc: "Standard Machine Learning methodologies: classification, regression, feature clustering, and evaluation.", category: "Important", match: 93 },
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div className="flex items-center gap-3 select-none">
            <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
              <GitBranch className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground tracking-tight">Skill Graph Intelligence</h1>
              <p className="text-sm text-muted-foreground mt-0.5 font-medium">
                Map and explore technology relationships, semantic mappings, and job requirements.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive Graph Display */}
            <div className="lg:col-span-8 bg-card border border-border rounded-[24px] p-6 shadow-sm flex flex-col items-center justify-center transition-colors duration-200 aspect-video w-full">
              <h3 className="font-bold text-sm text-foreground self-start mb-6">Interactive Requirements Network</h3>
              
              <div className="relative w-full max-w-[480px] aspect-square">
                <svg viewBox="0 0 300 240" className="w-full h-full overflow-visible">
                  {/* Connection lines from center to nodes */}
                  <line x1="150" y1="120" x2="185" y2="50" stroke="currentColor" className="text-border" strokeWidth="2" strokeDasharray="3 3" />
                  <line x1="150" y1="120" x2="250" y2="100" stroke="currentColor" className="text-border" strokeWidth="2" strokeDasharray="3 3" />
                  <line x1="150" y1="120" x2="235" y2="175" stroke="currentColor" className="text-border" strokeWidth="2" strokeDasharray="3 3" />
                  <line x1="150" y1="120" x2="165" y2="200" stroke="currentColor" className="text-border" strokeWidth="2" strokeDasharray="3 3" />
                  <line x1="150" y1="120" x2="80" y2="175" stroke="currentColor" className="text-border" strokeWidth="2" strokeDasharray="3 3" />
                  <line x1="150" y1="120" x2="75" y2="90" stroke="currentColor" className="text-border" strokeWidth="2" strokeDasharray="3 3" />

                  {/* Central Node: LLM System */}
                  <g onClick={() => setSelectedNode("LLM System")} className="cursor-pointer group">
                    <circle cx="150" cy="120" r="32" className="fill-primary stroke-background group-hover:scale-105 transition-transform" strokeWidth="2" />
                    <text x="150" y="117" className="fill-primary-foreground text-[10px] font-black" textAnchor="middle">LLM</text>
                    <text x="150" y="129" className="fill-primary-foreground text-[10px] font-black" textAnchor="middle">System</text>
                  </g>

                  {/* Node: Python */}
                  <g onClick={() => setSelectedNode("Python")} className="cursor-pointer group">
                    <circle cx="185" cy="50" r="14" className="fill-blue-500 stroke-background group-hover:scale-110 transition-transform" strokeWidth="2" />
                    <text x="185" y="53" className="fill-white text-[9px] font-black" textAnchor="middle">98</text>
                    <text x="185" y="30" className="fill-foreground text-[10px] font-black" textAnchor="middle">Python</text>
                  </g>

                  {/* Node: NLP */}
                  <g onClick={() => setSelectedNode("NLP")} className="cursor-pointer group">
                    <circle cx="250" cy="100" r="14" className="fill-emerald-500 stroke-background group-hover:scale-110 transition-transform" strokeWidth="2" />
                    <text x="250" y="103" className="fill-white text-[9px] font-black" textAnchor="middle">95</text>
                    <text x="250" y="80" className="fill-foreground text-[10px] font-black" textAnchor="middle">NLP</text>
                  </g>

                  {/* Node: Vector DB */}
                  <g onClick={() => setSelectedNode("Vector DB")} className="cursor-pointer group">
                    <circle cx="235" cy="175" r="14" className="fill-emerald-500 stroke-background group-hover:scale-110 transition-transform" strokeWidth="2" />
                    <text x="235" y="178" className="fill-white text-[9px] font-black" textAnchor="middle">85</text>
                    <text x="235" y="195" className="fill-foreground text-[10px] font-black" textAnchor="middle">Vector DB</text>
                  </g>

                  {/* Node: MLOps */}
                  <g onClick={() => setSelectedNode("MLOps")} className="cursor-pointer group">
                    <circle cx="165" cy="200" r="14" className="fill-emerald-500 stroke-background group-hover:scale-110 transition-transform" strokeWidth="2" />
                    <text x="165" y="203" className="fill-white text-[9px] font-black" textAnchor="middle">88</text>
                    <text x="165" y="220" className="fill-foreground text-[10px] font-black" textAnchor="middle">MLOps</text>
                  </g>

                  {/* Node: Cloud */}
                  <g onClick={() => setSelectedNode("Cloud")} className="cursor-pointer group">
                    <circle cx="80" cy="175" r="14" className="fill-blue-500 stroke-background group-hover:scale-110 transition-transform" strokeWidth="2" />
                    <text x="80" y="178" className="fill-white text-[9px] font-black" textAnchor="middle">75</text>
                    <text x="80" y="195" className="fill-foreground text-[10px] font-black" textAnchor="middle">Cloud</text>
                  </g>

                  {/* Node: ML */}
                  <g onClick={() => setSelectedNode("ML")} className="cursor-pointer group">
                    <circle cx="75" cy="90" r="14" className="fill-emerald-500 stroke-background group-hover:scale-110 transition-transform" strokeWidth="2" />
                    <text x="75" y="93" className="fill-white text-[9px] font-black" textAnchor="middle">93</text>
                    <text x="75" y="70" className="fill-foreground text-[10px] font-black" textAnchor="middle">ML</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Selected Node Details Card */}
            <div className="lg:col-span-4 bg-card border border-border rounded-[24px] p-6 shadow-sm flex flex-col gap-5 h-full transition-colors duration-200">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <Info className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-sm text-foreground">Node Metadata Panel</h3>
              </div>

              {selectedNode ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-lg text-foreground">{selectedNode}</h4>
                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded-lg">
                      {nodesInfo[selectedNode].match}% Weight
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                    <span>Priority Category:</span>
                    <span className="text-foreground">{nodesInfo[selectedNode].category}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                    {nodesInfo[selectedNode].desc}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic">Click a skill bubble in the graph to view its metadata properties.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
