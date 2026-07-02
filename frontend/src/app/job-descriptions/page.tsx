"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { 
  getJobDescription, createJobDescription, uploadJobDescriptionFile, updateJobSkill 
} from "@/lib/api";
import { JobDescription } from "@/types";
import { 
  FileText, UploadCloud, CheckCircle2, AlertCircle, Sparkles, Code, Keyboard, FileUp, Edit2, Check, X 
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

export default function JobDescriptionsPage() {
  const [job, setJob] = useState<JobDescription | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"manual" | "upload">("manual");
  
  // Form fields
  const [title, setTitle] = useState("AI Engineer");
  const [location, setLocation] = useState("Bengaluru, India");
  const [department, setDepartment] = useState("AI & Data");
  const [experience, setExperience] = useState("6+ Years");
  const [descriptionText, setDescriptionText] = useState(
    "We are looking for a Senior AI Engineer with expertise in Python, PyTorch, LLMs, and RAG. Experience with Docker and FastAPI is preferred."
  );
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  // States
  const [dragging, setDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [parseStep, setParseStep] = useState(0);
  const [selectedNode, setSelectedNode] = useState<string | null>("LLM");
  const [showJson, setShowJson] = useState(false);

  // Inline editing states
  const [editingSkillId, setEditingSkillId] = useState<number | null>(null);
  const [editingType, setEditingType] = useState<string>("");
  const [editingScore, setEditingScore] = useState<number>(0);

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

  useEffect(() => {
    loadData();
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadFile(e.dataTransfer.files[0]);
    }
  };

  const triggerPipelineAnimation = (callback: () => void) => {
    setIsParsing(true);
    setParseStep(0);
    const interval = setInterval(() => {
      setParseStep(prev => {
        if (prev >= PARSING_STEPS.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsParsing(false);
            callback();
          }, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "manual" && !descriptionText) {
      alert("Please enter the Job Description text.");
      return;
    }
    if (mode === "upload" && !uploadFile) {
      alert("Please upload a JD file first.");
      return;
    }

    triggerPipelineAnimation(async () => {
      try {
        let updatedJob: JobDescription;
        if (mode === "manual") {
          updatedJob = await createJobDescription({
            title,
            location,
            department,
            experience_required: experience,
            description: descriptionText
          });
        } else {
          updatedJob = await uploadJobDescriptionFile({
            title,
            location,
            department,
            experience_required: experience,
            file: uploadFile!
          });
        }
        setJob(updatedJob);
      } catch (error) {
        console.error("Submission failed", error);
      }
    });
  };

  const startEditing = (skill: any) => {
    setEditingSkillId(skill.id);
    setEditingType(skill.type);
    setEditingScore(skill.score);
  };

  const handleSaveSkill = async (skillId: number) => {
    try {
      const updatedSkill = await updateJobSkill(skillId, {
        type: editingType,
        score: Number(editingScore)
      });
      if (job) {
        const updatedSkills = job.skills.map(s => s.id === skillId ? { ...s, ...updatedSkill } : s);
        setJob({ ...job, skills: updatedSkills });
      }
      setEditingSkillId(null);
    } catch (error) {
      console.error("Failed to save skill details", error);
    }
  };

  // Compile Dynamic Pie Chart data from active database skills list
  const getPieData = () => {
    if (!job || !job.skills || job.skills.length === 0) {
      return [
        { name: "Critical", value: 1, color: "#6366f1" },
        { name: "Important", value: 1, color: "#10b981" }
      ];
    }
    const categories = { critical: 0, important: 0, preferred: 0, nice_to_have: 0 };
    job.skills.forEach(s => {
      const type = s.type.toLowerCase();
      if (type.includes("critical")) categories.critical++;
      else if (type.includes("important")) categories.important++;
      else if (type.includes("preferred")) categories.preferred++;
      else categories.nice_to_have++;
    });

    return [
      { name: "Critical Priorities", value: categories.critical || 0, color: "#6366f1" },
      { name: "Important Priorities", value: categories.important || 0, color: "#10b981" },
      { name: "Preferred Priorities", value: categories.preferred || 0, color: "#f59e0b" },
      { name: "Nice to Have", value: categories.nice_to_have || 0, color: "#06b6d4" }
    ].filter(item => item.value > 0);
  };

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
                  Enter manuals or upload text files to write directly to the database.
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
                <span className="text-muted-foreground font-bold">Database Job JSON Output</span>
                <span className="text-[10px] bg-zinc-800 text-foreground/80 px-2 py-0.5 rounded-full font-bold">Active JD</span>
              </div>
              <pre className="overflow-x-auto leading-relaxed">
                {JSON.stringify(job, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: manual Entry Form */}
              <div className="lg:col-span-6 space-y-6">
                <form onSubmit={handleSubmit} className="bg-card border border-border rounded-[24px] p-6 shadow-sm space-y-4 select-none">
                  <div className="flex items-center justify-between border-b border-border/40 pb-3">
                    <h3 className="font-bold text-sm text-foreground">Create Job Description</h3>
                    
                    {/* Mode selector tab */}
                    <div className="flex items-center gap-1 border border-border p-1 rounded-xl bg-secondary/10">
                      <button
                        type="button"
                        onClick={() => setMode("manual")}
                        className={`p-1.5 rounded-lg transition-all text-[10px] font-black flex items-center gap-1.5 cursor-pointer ${
                          mode === "manual" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Keyboard className="h-3.5 w-3.5" />
                        Manual Form
                      </button>
                      <button
                        type="button"
                        onClick={() => setMode("upload")}
                        className={`p-1.5 rounded-lg transition-all text-[10px] font-black flex items-center gap-1.5 cursor-pointer ${
                          mode === "upload" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <FileUp className="h-3.5 w-3.5" />
                        File Upload
                      </button>
                    </div>
                  </div>

                  {/* Metadata fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">Role Title</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-secondary/45 border border-border/80 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-primary text-foreground"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">Location</label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="bg-secondary/45 border border-border/80 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-primary text-foreground"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">Department</label>
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="bg-secondary/45 border border-border/80 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-primary text-foreground"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">Experience</label>
                      <input
                        type="text"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="bg-secondary/45 border border-border/80 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-primary text-foreground"
                        required
                      />
                    </div>
                  </div>

                  {/* Body Content Mode */}
                  {mode === "manual" ? (
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">Job Description Text</label>
                      <textarea
                        value={descriptionText}
                        onChange={(e) => setDescriptionText(e.target.value)}
                        rows={5}
                        className="bg-secondary/45 border border-border/80 rounded-xl p-3.5 text-xs font-semibold focus:outline-none focus:border-primary text-foreground mt-1"
                        required
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">Upload JD Text File</label>
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                          dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        }`}
                      >
                        <UploadCloud className="h-8 w-8 text-primary mx-auto mb-2" />
                        <span className="text-xs font-bold text-foreground block">
                          {uploadFile ? uploadFile.name : "Drag & drop files or click to choose"}
                        </span>
                        <span className="text-[9px] text-muted-foreground mt-1 block">Supports PDF, DOCX, TXT</span>
                        <input
                          type="file"
                          onChange={(e) => e.target.files && setUploadFile(e.target.files[0])}
                          className="hidden"
                          id="file-chooser"
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById("file-chooser")?.click()}
                          className="mt-3 text-[10px] font-black border border-border hover:border-primary/50 px-3 py-1.5 rounded-lg bg-card cursor-pointer"
                        >
                          Select File
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground font-bold text-xs py-3 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    Extract & Save Requirements
                  </button>
                </form>

                {/* Simulated Parser Progress */}
                {isParsing && (
                  <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm space-y-4 animate-fade-in select-none">
                    <h3 className="font-bold text-xs text-primary uppercase tracking-wider">AI Extraction Pipeline</h3>
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

                {/* Skill Priority Table */}
                {job && (
                  <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm space-y-4 select-none">
                    <div className="flex justify-between items-center border-b border-border/40 pb-3">
                      <div>
                        <span className="text-[9px] font-black text-primary uppercase tracking-wider">Active Taxonomy</span>
                        <h3 className="font-bold text-base text-foreground mt-0.5">{job.title}</h3>
                      </div>
                      <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-black px-2.5 py-1 rounded-lg border border-emerald-500/20">
                        {job.location}
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-semibold">
                        <thead>
                          <tr className="border-b border-border/80 text-[10px] text-muted-foreground uppercase tracking-wider">
                            <th className="pb-3">Skill</th>
                            <th className="pb-3">Priority</th>
                            <th className="pb-3">Weight (0-100)</th>
                            <th className="pb-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50 text-foreground/80">
                          {job.skills.map((s) => {
                            const isEditing = editingSkillId === s.id;
                            return (
                              <tr key={s.id} className="hover:bg-secondary/15">
                                <td className="py-3 font-black text-foreground">{s.name}</td>
                                <td className="py-3">
                                  {isEditing ? (
                                    <select
                                      value={editingType}
                                      onChange={(e) => setEditingType(e.target.value)}
                                      className="bg-secondary border border-border rounded-lg p-1 text-[10px] font-semibold text-foreground focus:outline-none focus:border-primary"
                                    >
                                      <option value="critical">Critical</option>
                                      <option value="important">Important</option>
                                      <option value="preferred">Preferred</option>
                                      <option value="nice_to_have">Nice to Have</option>
                                    </select>
                                  ) : (
                                    <span className={`px-2 py-0.5 rounded-full border text-[9px] font-black capitalize ${
                                      s.type.includes("critical") ? "text-rose-500 bg-rose-500/10 border-rose-500/20" :
                                      s.type.includes("important") ? "text-amber-500 bg-amber-500/10 border-amber-500/20" :
                                      "text-blue-500 bg-blue-500/10 border-blue-500/20"
                                    }`}>
                                      {s.type.replace(/_/g, " ")}
                                    </span>
                                  )}
                                </td>
                                <td className="py-3">
                                  {isEditing ? (
                                    <input
                                      type="number"
                                      value={editingScore}
                                      onChange={(e) => setEditingScore(Number(e.target.value))}
                                      min={0}
                                      max={100}
                                      className="bg-secondary border border-border rounded-lg p-1 text-[10px] w-14 text-center font-bold text-foreground focus:outline-none focus:border-primary"
                                    />
                                  ) : (
                                    <span className="text-primary font-bold">{s.score}%</span>
                                  )}
                                </td>
                                <td className="py-3 text-right">
                                  {isEditing ? (
                                    <div className="flex justify-end gap-1.5">
                                      <button
                                        onClick={() => handleSaveSkill(s.id)}
                                        className="p-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 cursor-pointer"
                                        title="Save"
                                      >
                                        <Check className="h-3.5 w-3.5" />
                                      </button>
                                      <button
                                        onClick={() => setEditingSkillId(null)}
                                        className="p-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 cursor-pointer"
                                        title="Cancel"
                                      >
                                        <X className="h-3.5 w-3.5" />
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => startEditing(s)}
                                      className="p-1 rounded-lg hover:bg-secondary/40 text-muted-foreground hover:text-foreground cursor-pointer transition-all"
                                      title="Edit Priority/Weight"
                                    >
                                      <Edit2 className="h-3.5 w-3.5" />
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Weight Distribution & Interactive Graph */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Weight Distribution Pie Chart */}
                <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm space-y-4 select-none">
                  <h3 className="font-bold text-sm text-foreground">Parsed Requirement Weights</h3>
                  <div className="h-[200px] w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getPieData()}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={75}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {getPieData().map((entry, index) => (
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
                    <h3 className="font-bold text-sm text-foreground">Requirement Flow Path</h3>
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
                      {Object.keys(GRAPH_NODES).map((node, i) => {
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
                            {GRAPH_NODES[selectedNode as keyof typeof GRAPH_NODES]}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Suggestions Box */}
                <div className="bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 rounded-[24px] p-5 flex gap-3 select-none">
                  <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">AI Suggestion</span>
                    <h5 className="font-bold text-xs text-foreground">Missing Cloud Orchestrator Requirements</h5>
                    <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
                      No Kubernetes experience was found in the parsed text. Consider manually adding **Kubernetes** to help map orchestration paths properly.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          )}
        </main>
      </div>
    </div>
  );
}
