export interface StrengthRisk {
  id: number;
  candidate_id: number;
  type: 'strength' | 'risk';
  content: string;
}

export interface Candidate {
  id: number;
  rank: number | null;
  name: string;
  avatar: string | null;
  yoe: number;
  hiring_potential: number;
  confidence: number;
  trust_score: number;
  open_to_work: boolean;
  role: string;
  company: string | null;
  location: string;
  recommendation: string | null;
  status: string;
  strengths_risks: StrengthRisk[];
}

export interface JobSkill {
  id: number;
  job_id: number;
  name: string;
  type: 'critical' | 'important' | 'preferred' | 'nice_to_have';
  score: number;
}

export interface JobDescription {
  id: number;
  title: string;
  status: string;
  location: string;
  department: string;
  experience_required: string;
  description: string;
  created_at: string;
  skills: JobSkill[];
}

export interface Metrics {
  total_candidates: number;
  top_avg_score: number;
  high_potential: number;
  trusted_candidates: number;
  analysis_time: string;
}

export interface AnalysisStep {
  id: number;
  step_name: string;
  status: 'completed' | 'in_progress' | 'pending';
  order: number;
}

export interface AnalysisProgress {
  steps: AnalysisStep[];
  elapsed_time: string;
  estimated_remaining: string;
  system_status: string;
  progress_percentage: number;
}

export interface TechAdoption {
  technology: string;
  year: number;
  adoption_rate: number;
}

export interface SkillDistribution {
  name: string;
  percentage: number;
}

export interface ExperienceDistribution {
  label: string;
  count: number;
}

export interface TrustDistribution {
  label: string;
  percentage: number;
}

export interface AnalyticsData {
  timeline: TechAdoption[];
  skills_distribution: SkillDistribution[];
  experience_distribution: ExperienceDistribution[];
  trust_distribution: TrustDistribution[];
}
