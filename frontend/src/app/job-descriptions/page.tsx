"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { getJobDescription, parseJobDescription } from "@/lib/api";
import { JobDescription, ParseResponse } from "@/types";
import { 
  FileText, UploadCloud, CheckCircle2, ChevronRight, AlertCircle, Sparkles, Terminal, Code 
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const PARSING_STEPS = [
  "Reading Document...",
  "Extracting Requirements...",
  "Detecting Skills...",
  "Building Requirement Graph...",
  "Assigning Priority...",
  "Done"
];

const GRAPH_NODES = {
  "LLM": "Large Language Model foundation containing semantic syntax representations.",
  "Embeddings": "Dense vector transformations capturing job skill semantics.",
  "Vector DB": "High-throughput storage indexing parsed candidates.",
  "FAISS": "Similarity search index executing local sub-100ms vector matches.",
  "Retrieval": "Contextual document aggregation pulling qualified history.",
  "RAG": "Retrieval-Augmented Generation compiling evidence responses."
};

const PIE_DATA = [
  { name: "Technical", value: 45, color: "#6366f1" },
  { name: "Soft Skills", value: 15, color: "#10b981" },
  { name: "Leadership", value: 10, color: "#f59e0b" },
  { name: "Cloud", value: 15, color: "#06b6d4" },
  { name: "AI", value: 15, color: "#ec4899" }
];

export default function JobDescriptionsPage() {
  const [job, setJob] = useState<JobDescription | null>(null);
  const [loading, setLoading] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [parseStep, setParseStep] = useState(0);
  const [selectedNode, setSelectedNode] = useState<string | null>("LLM");
  const [showJson, setShowJson] = useState(false);
  const [parsedData, setParsedData] = useState<ParseResponse | null>(null);

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    
    // Start animation
    simulateParsing();
    
    // Call backend API
    try {
      const data = await parseJobDescription();
      setParsedData(data);
    } catch (error) {
      console.error("Parse failed", error);
    }
  };

  const simulateParsing = () => {
    setIsParsing(true);
    setParseStep(0);
    const interval = setInterval(() => {
      setParseStep(prev => {
        if (prev >= PARSING_STEPS.length - 1) {
          clearInterval(interval);
          setTimeout(() => setIsParsing(false), 800);
          return prev;
        }
        return prev + 1;
      });
    }, 900);
  };

  const currentPieData = parsedData ? [
    { name: "Technical", value: parsedData.weight_distribution.technical || 45, color: "#6366f1" },
    { name: "Soft Skills", value: parsedData.weight_distribution.soft_skills || 15, color: "#10b981" },
    { name: "Leadership", value: parsedData.weight_distribution.leadership || 10, color: "#f59e0b" },
    { name: "Cloud", value: parsedData.weight_distribution.cloud || 15, color: "#06b6d4" },
    { name: "AI", value: parsedData.weight_distribution.ai || 15, color: "#ec4899" }
  ] : PIE_DATA;

  const currentGraphNodes = parsedData ? parsedData.graph_nodes : GRAPH_NODES;

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Header Title */}
          <div className="flex items-center justify-between select-none">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-foreground tracking-tight">Job Descriptions</h1>
                <p className="text-sm text-muted-foreground mt-0.5 font-medium">
                  Upload requirements to trigger AI skills parsing and interactive graph compiles.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowJson(!showJson)}
              className="border border-border hover:border-primary/50 text-foreground font-semibold text-xs py-2 px-3.5 rounded-xl transition-all flex items-center gap-2 bg-card cursor-pointer"
            >
              <Code className="h-4 w-4 text-primary" />
              {showJson ? "Show Interface" : "View Extracted JSON"}
            </button>
          </div>

          {showJson ? (
            /* Developer JSON View */
            <div className="bg-black text-emerald-400 font-mono text-xs p-6 rounded-[24px] border border-border/80 shadow-sm max-w-3xl space-y-4 relative select-none">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                <span className="text-muted-foreground font-bold">Requirement JSON Output</span>
                <span className="text-[10px] bg-zinc-800 text-foreground/80 px-2 py-0.5 rounded-full">Read-Only</span>
              </div>
              <pre className="overflow-x-auto leading-relaxed">
{JSON.stringify({
  required_skills: parsedData?.required_skills || ["Python", "LLM / NLP", "Machine Learning", "PyTorch"],
  preferred_skills: parsedData?.preferred_skills || ["Vector Databases", "Docker"],
  soft_skills: parsedData?.soft_skills || ["Product Strategy", "Technical Communication", "Mentorship"],
  experience_required: parsedData?.experience_required || "6+ Yrs",
  weight_distribution: parsedData?.weight_distribution || {
    technical: 45,
    soft_skills: 15,
    leadership: 10,
    cloud: 15,
    ai: 15
  }
}, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Upload & Main Info */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Drag and Drop Upload */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => {
                    // Start animation & api call when clicked
                    handleDrop({ preventDefault: () => {} } as any);
                  }}
                  className={`border-2 border-dashed rounded-[24px] p-8 text-center cursor-pointer transition-all duration-200 select-none ${
                    dragging ? "border-primary bg-primary/5 scale-[0.99]" : "border-border hover:border-primary/50 bg-card hover:shadow-sm"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <UploadCloud className="h-10 w-10 text-primary" />
                    <h3 className="font-bold text-sm text-foreground">Upload Job Description</h3>
                    <p className="text-xs text-muted-foreground font-medium max-w-xs leading-relaxed">
                      Drag & Drop your **PDF**, **DOCX**, or **TXT** files here or click to trigger simulated AI parse pipeline.
                    </p>
                  </div>
                </div>

                {/* Simulated Parser Progress */}
                {isParsing && (
                  <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm space-y-4 animate-fade-in select-none">
                    <h3 className="font-bold text-xs text-primary uppercase tracking-wider">AI Parsing Pipeline</h3>
                    <div className="space-y-2.5">
                      {PARSING_STEPS.map((step, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs font-semibold">
                          <span className={`${parseStep >= idx ? "text-foreground" : "text-muted-foreground/60"}`}>
                            {step}
                          </span>
                          {parseStep > idx ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          ) : parseStep === idx ? (
                            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                          ) : (
                            <span className="h-2 w-2 rounded-full bg-secondary" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Requirement Summary metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 select-none">
                  {(parsedData ? [
                    { label: "Required Skills", val: parsedData.required_skills.length, color: "text-primary bg-primary/10" },
                    { label: "Preferred", val: parsedData.preferred_skills.length, color: "text-blue-500 bg-blue-500/10" },
                    { label: "Soft Skills", val: parsedData.soft_skills.length, color: "text-emerald-500 bg-emerald-500/10" },
                    { label: "Responsibilities", val: 15, color: "text-amber-500 bg-amber-500/10" },
                    { label: "Experience", val: parsedData.experience_required, color: "text-pink-500 bg-pink-500/10" }
                  ] : [
                    { label: "Required Skills", val: 18, color: "text-primary bg-primary/10" },
                    { label: "Preferred", val: 9, color: "text-blue-500 bg-blue-500/10" },
                    { label: "Soft Skills", val: 6, color: "text-emerald-500 bg-emerald-500/10" },
                    { label: "Responsibilities", val: 15, color: "text-amber-500 bg-amber-500/10" },
                    { label: "Experience", val: "6+ Yrs", color: "text-pink-500 bg-pink-500/10" }
                  ]).map((m, i) => (
                    <div key={i} className="bg-card border border-border rounded-2xl p-4 flex flex-col justify-between h-[100px] transition-colors duration-200">
                      <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider leading-none">
                        {m.label}
                      </span>
                      <span className={`text-base font-black px-2.5 py-1 rounded-xl self-start mt-2 ${m.color}`}>
                        {m.val}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Skill Priority Table */}
                <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm space-y-4 select-none">
                  <h3 className="font-bold text-sm text-foreground">Skill Priority Taxonomy</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-semibold">
                      <thead>
                        <tr className="border-b border-border/80 text-[10px] text-muted-foreground uppercase tracking-wider">
                          <th className="pb-3">Skill</th>
                          <th className="pb-3">Priority</th>
                          <th className="pb-3">Weight</th>
                          <th className="pb-3">Category</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50 text-foreground/80">
                        {(parsedData ? parsedData.skill_priority : [
                          { name: "Python", priority: "Critical", weight: 10, category: "Programming", color: "text-rose-500 bg-rose-500/10 border-rose-500/20" },
                          { name: "LLM / NLP", priority: "Critical", weight: 10, category: "AI", color: "text-rose-500 bg-rose-500/10 border-rose-500/20" },
                          { name: "Docker", priority: "High", weight: 8, category: "DevOps", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
                          { name: "Kubernetes", priority: "Medium", weight: 6, category: "Cloud", color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
                        ]).map((row, i) => (
                          <tr key={i} className="hover:bg-secondary/10">
                            <td className="py-3 font-black text-foreground">{row.name}</td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded-full border text-[9px] font-black ${row.color}`}>
                                {row.priority}
                              </span>
                            </td>
                            <td className="py-3 text-primary font-bold">{row.weight}</td>
                            <td className="py-3 text-muted-foreground">{row.category}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              {/* Right Column: Weight Distribution & Interactive Graph */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Weight Distribution Pie Chart */}
                <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm space-y-4 select-none">
                  <h3 className="font-bold text-sm text-foreground">Requirement Weight Distribution</h3>
                  <div className="h-[200px] w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={currentPieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={75}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {currentPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: "10px", fontWeight: "bold" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Interactive Requirement Graph */}
                <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm space-y-4 select-none">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-foreground">Interactive Requirement Graph</h3>
                    <span className="text-[9px] font-bold text-primary uppercase bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                      Click Node
                    </span>
                  </div>
                  
                  <div className="bg-secondary/15 rounded-2xl p-4 border border-border/40 flex flex-col items-center">
                    {/* SVG Flow graph */}
                    <svg viewBox="0 0 340 80" className="w-full h-[80px] overflow-visible">
                      <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-border/60" />
                        </marker>
                      </defs>

                      {/* Nodes positions mapping */}
                      {Object.keys(currentGraphNodes).map((node, i) => {
                        const x = 25 + i * 58;
                        const y = 40;
                        const isSelected = selectedNode === node;
                        return (
                          <g key={node} className="cursor-pointer" onClick={() => setSelectedNode(node)}>
                            {/* Connector line to next node */}
                            {i < 5 && (
                              <line
                                x1={x}
                                y1={y}
                                x2={x + 58}
                                y2={y}
                                className="stroke-border/80"
                                strokeWidth="2"
                                markerEnd="url(#arrow)"
                              />
                            )}
                            {/* Node circle */}
                            <circle
                              cx={x}
                              cy={y}
                              r={16}
                              className={`transition-all ${
                                isSelected ? "fill-primary stroke-background" : "fill-card stroke-border hover:stroke-primary/50"
                              }`}
                              strokeWidth="2.5"
                            />
                            {/* Text label */}
                            <text
                              x={x}
                              y={y + 3}
                              className={`text-[8px] font-black text-center transition-all ${
                                isSelected ? "fill-primary-foreground" : "fill-foreground"
                              }`}
                              textAnchor="middle"
                            >
                              {node === "Vector DB" ? "VDB" : node}
                            </text>
                          </g>
                        );
                      })}
                    </svg>

                    {/* Explanatory box */}
                    {selectedNode && (
                      <div className="border border-border/50 bg-card rounded-xl p-3.5 mt-4 w-full flex items-start gap-2.5 animate-fade-in">
                        <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <div className="flex flex-col">
                          <span className="font-bold text-[10px] text-foreground uppercase tracking-wider">{selectedNode} Detail</span>
                          <p className="text-[11px] text-muted-foreground font-medium mt-1 leading-relaxed">
                            {currentGraphNodes[selectedNode as keyof typeof currentGraphNodes]}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Suggestions Box */}
                {(parsedData ? parsedData.suggestions : [
                  {
                    title: "Missing Cloud Integration Requirements",
                    description: "No cloud experience was found in the job text description. Consider adding **AWS** or **Kubernetes** to help map candidates' orchestration histories properly.",
                    type: "warning"
                  }
                ]).map((suggestion, idx) => (
                  <div key={idx} className="bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 rounded-[24px] p-5 flex gap-3 select-none">
                    <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">AI Suggestion</span>
                      <h5 className="font-bold text-xs text-foreground">{suggestion.title}</h5>
                      <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
                        {/* Basic bold rendering: replace **text** with bold tags */}
                        {suggestion.description.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="text-foreground">{part}</strong> : part)}
                      </p>
                    </div>
                  </div>
                ))}

              </div>

            </div>
          )}
        </main>
      </div>
    </div>
  );
}
