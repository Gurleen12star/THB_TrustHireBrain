"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import TopCandidateDetails from "@/components/TopCandidateDetails";
import EmptyState from "@/components/EmptyState";
import { TableSkeleton } from "@/components/Skeletons";
import { getCandidates, createCandidate } from "@/lib/api";
import { Candidate } from "@/types";
import { 
  Search, Filter, ShieldCheck, ShieldAlert, Trophy, LayoutGrid, List, Plus, X, Sparkles, Award 
} from "lucide-react";

const PRE_FILLED_CHIPS = ["Python", "LLM", "Bangalore", "5 Years", "Open to Work"];

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [search, setSearch] = useState("");
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [layout, setLayout] = useState<"grid" | "table">("grid");

  // Advanced Filters States
  const [minExp, setMinExp] = useState<number>(0);
  const [minTrust, setMinTrust] = useState<number>(0);
  const [minPotential, setMinPotential] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);

  // Add Candidate Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("ML Engineer");
  const [newCompany, setNewCompany] = useState("");
  const [newLocation, setNewLocation] = useState("Bengaluru, India");
  const [newYoe, setNewYoe] = useState(4.5);
  const [newTrust, setNewTrust] = useState(85);
  const [newPotential, setNewPotential] = useState(80);
  const [newConfidence, setNewConfidence] = useState(85);
  const [newStrengths, setNewStrengths] = useState("Python, PyTorch, LLMs");
  const [newRisks, setNewRisks] = useState("Limited Kubernetes experience");
  const [newRec, setNewRec] = useState("");

  const loadCandidates = async () => {
    setLoading(true);
    try {
      // Direct SQLite backend query with filter parameters
      const res = await getCandidates(search || undefined, status, {
        minExperience: minExp || undefined,
        minTrust: minTrust || undefined,
        minPotential: minPotential || undefined
      });
      
      // Filter by selected chips on frontend if any chip is clicked
      let filtered = res;
      if (selectedChips.length > 0) {
        filtered = res.filter(cand => {
          return selectedChips.every(chip => {
            if (chip === "Open to Work") return cand.open_to_work;
            if (chip === "Bangalore") return cand.location.includes("Bengaluru") || cand.location.includes("Bangalore");
            if (chip === "5 Years") return cand.yoe >= 5;
            return cand.role.toLowerCase().includes(chip.toLowerCase()) || 
                   cand.name.toLowerCase().includes(chip.toLowerCase());
          });
        });
      }

      setCandidates(filtered);
    } catch (err) {
      console.error("Failed to load candidates", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadCandidates();
    }, 250);

    return () => clearTimeout(delayDebounce);
  }, [search, status, selectedChips, minExp, minTrust, minPotential]);

  const toggleChip = (chip: string) => {
    setSelectedChips(prev => 
      prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
    );
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-amber-500 fill-amber-500/10" />;
      case 2:
        return <Trophy className="h-5 w-5 text-slate-400 fill-slate-400/10" />;
      case 3:
        return <Trophy className="h-5 w-5 text-amber-700 fill-amber-700/10" />;
      default:
        return <span className="font-bold text-muted-foreground text-sm pl-1.5">{rank}</span>;
    }
  };

  const handleAddCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newRole || !newLocation) {
      alert("Name, Role, and Location are required.");
      return;
    }

    try {
      const strengthsArr = newStrengths.split(",").map(s => s.trim()).filter(Boolean);
      const risksArr = newRisks.split(",").map(r => r.trim()).filter(Boolean);

      await createCandidate({
        name: newName,
        yoe: newYoe,
        role: newRole,
        company: newCompany || undefined,
        location: newLocation,
        trust_score: newTrust,
        hiring_potential: newPotential,
        confidence: newConfidence,
        recommendation: newRec || undefined,
        strengths: strengthsArr,
        risks: risksArr
      });

      // Clear form & close modal
      setNewName("");
      setNewCompany("");
      setNewStrengths("Python, PyTorch, LLMs");
      setNewRisks("Limited Kubernetes experience");
      setNewRec("");
      setShowAddModal(false);
      
      // Reload candidate catalog
      loadCandidates();
    } catch (err) {
      console.error("Failed to add candidate:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Header Title */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none">
            <div>
              <h1 className="text-3xl font-black text-foreground tracking-tight">Candidate Intelligence Engine</h1>
              <p className="text-sm text-muted-foreground mt-0.5 font-medium">
                High-density Bloomberg terminal views mapping skills verifications and hiring potentials.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Add Candidate Button */}
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-primary text-primary-foreground font-black text-xs py-2.5 px-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
              >
                <Plus className="h-4.5 w-4.5" />
                Add Candidate
              </button>

              {/* View Layout Toggle */}
              <div className="flex items-center gap-1.5 border border-border p-1 rounded-xl bg-card">
                <button
                  onClick={() => setLayout("grid")}
                  className={`p-2 rounded-lg transition-all cursor-pointer ${
                    layout === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                  title="Grid layout"
                >
                  <LayoutGrid className="h-4.5 w-4.5" />
                </button>
                <button
                  onClick={() => setLayout("table")}
                  className={`p-2 rounded-lg transition-all cursor-pointer ${
                    layout === "table" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                  title="Table layout"
                >
                  <List className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Search, Filters, and Chips */}
          <div className="bg-card border border-border rounded-[24px] p-5 shadow-sm space-y-4 select-none">
            <div className="flex flex-col md:flex-row items-center gap-3">
              {/* Search bar */}
              <div className="relative w-full md:flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search candidates by name, stack, or experience..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-secondary/50 dark:bg-secondary/20 border border-border/80 rounded-xl py-2.5 pl-11 pr-4 text-xs font-semibold focus:outline-none focus:border-primary transition-all text-foreground"
                />
              </div>

              {/* Toggle filters & Dropdown */}
              <div className="flex items-center gap-2.5 w-full md:w-auto">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`border text-xs font-bold py-2.5 px-4 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                    showFilters ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50 text-foreground bg-card"
                  }`}
                >
                  <Filter className="h-4 w-4" />
                  Advanced Filters
                </button>
                
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="bg-card border border-border rounded-xl px-4 py-2.5 text-xs font-bold text-foreground focus:outline-none focus:border-primary cursor-pointer select-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Top">Top Ranks</option>
                  <option value="Shortlisted">Shortlisted Only</option>
                </select>
              </div>
            </div>

            {/* Pre-filled chips */}
            <div className="flex flex-wrap items-center gap-2.5 border-t border-border/40 pt-4">
              <span className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">Quick Filters:</span>
              {PRE_FILLED_CHIPS.map(chip => {
                const isActive = selectedChips.includes(chip);
                return (
                  <button
                    key={chip}
                    onClick={() => toggleChip(chip)}
                    className={`text-[10px] font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                      isActive 
                        ? "bg-primary text-primary-foreground border-primary" 
                        : "bg-secondary/50 dark:bg-secondary/20 border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-border/40 pt-4 animate-fade-in">
                {/* Exp slider */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-muted-foreground">Min Experience</span>
                    <span className="text-primary">{minExp} Years</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={15}
                    step={0.5}
                    value={minExp}
                    onChange={(e) => setMinExp(Number(e.target.value))}
                    className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Trust slider */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-muted-foreground">Min Trust Score</span>
                    <span className="text-primary">{minTrust}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={minTrust}
                    onChange={(e) => setMinTrust(Number(e.target.value))}
                    className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Potential slider */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-muted-foreground">Min Hiring Potential</span>
                    <span className="text-primary">{minPotential}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={minPotential}
                    onChange={(e) => setMinPotential(Number(e.target.value))}
                    className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Grid and Table Listings */}
          {loading ? (
            <TableSkeleton />
          ) : candidates.length === 0 ? (
            <EmptyState />
          ) : layout === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-none">
              {candidates.map((cand) => (
                <div 
                  key={cand.id} 
                  onClick={() => setSelectedCandidate(cand)}
                  className="bg-card border border-border/80 hover:border-primary/50 hover:shadow-md rounded-[24px] p-5 cursor-pointer transition-all flex flex-col justify-between h-[210px] group relative overflow-hidden"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <img 
                        src={cand.avatar || ""} 
                        alt={cand.name} 
                        className="h-11 w-11 rounded-full object-cover border border-border/40 shrink-0" 
                      />
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{cand.name}</span>
                        <span className="text-[10px] text-muted-foreground font-semibold mt-0.5">{cand.role}</span>
                      </div>
                    </div>
                    {getRankBadge(cand.rank ?? 99)}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    <span className="bg-secondary/40 text-foreground font-black text-[9px] px-2 py-0.5 rounded-lg border border-border">
                      {cand.yoe} YOE
                    </span>
                    <span className="bg-secondary/40 text-foreground font-black text-[9px] px-2 py-0.5 rounded-lg border border-border">
                      {cand.location}
                    </span>
                  </div>

                  <div className="border-t border-border/40 pt-3 mt-4 flex items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[8px] text-muted-foreground uppercase font-black tracking-wider">Hiring Potential</span>
                      <span className="text-xs font-black text-foreground">{cand.hiring_potential}%</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500">
                      <ShieldCheck className="h-4 w-4 shrink-0" />
                      {cand.trust_score}% Trust
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-[24px] overflow-hidden shadow-sm select-none">
              <table className="w-full text-left border-collapse text-xs font-semibold">
                <thead>
                  <tr className="border-b border-border/80 text-[10px] text-muted-foreground uppercase tracking-wider bg-secondary/10">
                    <th className="p-4">Rank</th>
                    <th className="p-4">Candidate</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Experience</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Hiring Potential</th>
                    <th className="p-4">Trust Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50 text-foreground/80">
                  {candidates.map((cand) => (
                    <tr 
                      key={cand.id} 
                      onClick={() => setSelectedCandidate(cand)}
                      className="hover:bg-secondary/15 cursor-pointer transition-colors"
                    >
                      <td className="p-4 font-black">{cand.rank}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={cand.avatar || ""} alt={cand.name} className="h-8 w-8 rounded-full object-cover shrink-0" />
                          <span className="font-bold text-foreground">{cand.name}</span>
                        </div>
                      </td>
                      <td className="p-4">{cand.role}</td>
                      <td className="p-4">{cand.yoe} Years</td>
                      <td className="p-4">{cand.location}</td>
                      <td className="p-4 text-primary font-bold">{cand.hiring_potential}%</td>
                      <td className="p-4 font-black text-emerald-500">{cand.trust_score}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Add Candidate popup Dialog Modal */}
          {showAddModal && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 select-none animate-fade-in">
              <div className="bg-card border border-border rounded-[28px] max-w-lg w-full p-6 shadow-2xl space-y-4 relative max-h-[90vh] overflow-y-auto">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="absolute right-4 top-4 p-1.5 rounded-lg border border-border hover:border-rose-500/50 text-muted-foreground hover:text-rose-500 transition-all cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>

                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-5 w-5" />
                  <h3 className="font-black text-lg text-foreground">Add Candidate Profile</h3>
                </div>

                <form onSubmit={handleAddCandidate} className="space-y-4 text-xs font-semibold">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] text-muted-foreground font-black uppercase">Candidate Name</label>
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="John Doe"
                        className="bg-secondary/40 border border-border/80 rounded-xl p-2.5 focus:outline-none focus:border-primary text-foreground"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] text-muted-foreground font-black uppercase">Role Title</label>
                      <input
                        type="text"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        placeholder="AI Engineer"
                        className="bg-secondary/40 border border-border/80 rounded-xl p-2.5 focus:outline-none focus:border-primary text-foreground"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] text-muted-foreground font-black uppercase">Current Company</label>
                      <input
                        type="text"
                        value={newCompany}
                        onChange={(e) => setNewCompany(e.target.value)}
                        placeholder="Google"
                        className="bg-secondary/40 border border-border/80 rounded-xl p-2.5 focus:outline-none focus:border-primary text-foreground"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] text-muted-foreground font-black uppercase">Location</label>
                      <input
                        type="text"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        placeholder="Bengaluru, India"
                        className="bg-secondary/40 border border-border/80 rounded-xl p-2.5 focus:outline-none focus:border-primary text-foreground"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] text-muted-foreground font-black uppercase">YOE</label>
                      <input
                        type="number"
                        value={newYoe}
                        onChange={(e) => setNewYoe(Number(e.target.value))}
                        step={0.5}
                        className="bg-secondary/40 border border-border/80 rounded-xl p-2.5 text-center focus:outline-none focus:border-primary text-foreground"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] text-muted-foreground font-black uppercase">Potential</label>
                      <input
                        type="number"
                        value={newPotential}
                        onChange={(e) => setNewPotential(Number(e.target.value))}
                        className="bg-secondary/40 border border-border/80 rounded-xl p-2.5 text-center focus:outline-none focus:border-primary text-foreground"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] text-muted-foreground font-black uppercase">Trust</label>
                      <input
                        type="number"
                        value={newTrust}
                        onChange={(e) => setNewTrust(Number(e.target.value))}
                        className="bg-secondary/40 border border-border/80 rounded-xl p-2.5 text-center focus:outline-none focus:border-primary text-foreground"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] text-muted-foreground font-black uppercase">Conf</label>
                      <input
                        type="number"
                        value={newConfidence}
                        onChange={(e) => setNewConfidence(Number(e.target.value))}
                        className="bg-secondary/40 border border-border/80 rounded-xl p-2.5 text-center focus:outline-none focus:border-primary text-foreground"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] text-muted-foreground font-black uppercase">Key Strengths (Comma separated)</label>
                    <input
                      type="text"
                      value={newStrengths}
                      onChange={(e) => setNewStrengths(e.target.value)}
                      className="bg-secondary/40 border border-border/80 rounded-xl p-2.5 focus:outline-none focus:border-primary text-foreground"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] text-muted-foreground font-black uppercase">Key Risks (Comma separated)</label>
                    <input
                      type="text"
                      value={newRisks}
                      onChange={(e) => setNewRisks(e.target.value)}
                      className="bg-secondary/40 border border-border/80 rounded-xl p-2.5 focus:outline-none focus:border-primary text-foreground"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] text-muted-foreground font-black uppercase">Recruiter Recommendation Notes</label>
                    <textarea
                      value={newRec}
                      onChange={(e) => setNewRec(e.target.value)}
                      rows={2}
                      className="bg-secondary/40 border border-border/80 rounded-xl p-2.5 focus:outline-none focus:border-primary text-foreground"
                      placeholder="Strong Python and LLM fundamentals..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground font-bold text-xs py-3 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer mt-2"
                  >
                    Save Profile to DB
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Details Drawer */}
          {selectedCandidate && (
            <TopCandidateDetails 
              candidate={selectedCandidate} 
              onClose={() => setSelectedCandidate(null)} 
            />
          )}
        </main>
      </div>
    </div>
  );
}
