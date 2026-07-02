import { Candidate, Metrics, AnalysisProgress, AnalyticsData, JobDescription } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

// Helper to handle fetch requests with fallback logic
async function fetchWithFallback<T>(url: string, fallbackData: T): Promise<T> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 10 }, // 10 seconds cache revalidation
      headers: { "Content-Type": "application/json" }
    });
    if (!res.ok) {
      console.warn(`API error from ${url}: Status ${res.status}. Using fallback data.`);
      return fallbackData;
    }
    return await res.json() as T;
  } catch (error) {
    console.warn(`Failed to fetch from ${url}. Server might be offline. Using fallback data.`);
    return fallbackData;
  }
}

// 1. Fallback Mock Data
const MOCK_METRICS: Metrics = {
  total_candidates: 100000,
  top_avg_score: 92.45,
  high_potential: 1248,
  trusted_candidates: 87532,
  analysis_time: "18m 42s"
};

const MOCK_PROGRESS: AnalysisProgress = {
  steps: [
    { id: 1, step_name: "Understanding Job Description", status: "completed", order: 1 },
    { id: 2, step_name: "Building Requirement Graph", status: "completed", order: 2 },
    { id: 3, step_name: "Parsing 100,000 Candidates", status: "completed", order: 3 },
    { id: 4, step_name: "Creating Intelligence Profiles", status: "completed", order: 4 },
    { id: 5, step_name: "Skill Inference Engine", status: "completed", order: 5 },
    { id: 6, step_name: "Career Evolution Analysis", status: "completed", order: 6 },
    { id: 7, step_name: "Trust Validation", status: "completed", order: 7 },
    { id: 8, step_name: "Ranking & Scoring Candidates", status: "in_progress", order: 8 },
    { id: 9, step_name: "Generating Reports", status: "pending", order: 9 }
  ],
  elapsed_time: "14m 02s",
  estimated_remaining: "4m 40s",
  system_status: "All systems operational",
  progress_percentage: 76
};

const MOCK_JOB: JobDescription = {
  id: 1,
  title: "AI Engineer",
  status: "Completed",
  location: "Bengaluru, India",
  department: "AI & Data",
  experience_required: "6+ Years",
  description: "Senior AI Engineer with 6+ years of experience in LLM, NLP, and MLOps",
  created_at: "2026-07-02",
  skills: [
    { id: 1, job_id: 1, name: "Python", type: "critical", score: 98 },
    { id: 2, job_id: 1, name: "LLM / NLP", type: "critical", score: 95 },
    { id: 3, job_id: 1, name: "Machine Learning", type: "important", score: 93 },
    { id: 4, job_id: 1, name: "PyTorch", type: "important", score: 89 },
    { id: 5, job_id: 1, name: "Vector Databases", type: "preferred", score: 85 },
    { id: 6, job_id: 1, name: "Docker", type: "preferred", score: 80 },
    { id: 7, job_id: 1, name: "AWS", type: "nice_to_have", score: 75 },
    { id: 8, job_id: 1, name: "Kubernetes", type: "nice_to_have", score: 70 }
  ]
};

const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 1,
    rank: 1,
    name: "Aarav Patel",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    yoe: 8.2,
    hiring_potential: 96,
    confidence: 97,
    trust_score: 88,
    open_to_work: true,
    role: "Senior AI Engineer",
    company: "TechNova",
    location: "Bengaluru, India",
    recommendation: "Strong Hire: Aarav is an excellent fit for this role. High technical expertise and great growth trajectory.",
    status: "Top",
    strengths_risks: [
      { id: 1, candidate_id: 1, type: "strength", content: "Strong LLM and RAG experience" },
      { id: 2, candidate_id: 1, type: "strength", content: "Excellent system design skills" },
      { id: 3, candidate_id: 1, type: "strength", content: "Consistent career growth" },
      { id: 4, candidate_id: 1, type: "strength", content: "High impact projects" },
      { id: 5, candidate_id: 1, type: "strength", content: "Active in open source" },
      { id: 6, candidate_id: 1, type: "risk", content: "Limited Kubernetes experience" },
      { id: 7, candidate_id: 1, type: "risk", content: "Could improve communication evidence" }
    ]
  },
  {
    id: 2,
    rank: 2,
    name: "Meera Iyer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    yoe: 6.5,
    hiring_potential: 94,
    confidence: 96,
    trust_score: 97,
    open_to_work: true,
    role: "AI Engineer",
    company: "InnovateLab",
    location: "Mumbai, India",
    recommendation: "Strong Hire: Exceptionally high trust score and strong foundation in NLP pipelines.",
    status: "Top",
    strengths_risks: [
      { id: 8, candidate_id: 2, type: "strength", content: "State-of-the-art NLP models processing experience" },
      { id: 9, candidate_id: 2, type: "strength", content: "Extremely high code quality standard" }
    ]
  },
  {
    id: 3,
    rank: 3,
    name: "Rohan Verma",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    yoe: 7.1,
    hiring_potential: 93,
    confidence: 95,
    trust_score: 95,
    open_to_work: true,
    role: "Senior ML Engineer",
    company: "DataScale",
    location: "Hyderabad, India",
    recommendation: "Strong Hire: Solid PyTorch and MLOps deployment background.",
    status: "Top",
    strengths_risks: []
  },
  {
    id: 4,
    rank: 4,
    name: "Sneha Reddy",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    yoe: 6.8,
    hiring_potential: 91,
    confidence: 94,
    trust_score: 94,
    open_to_work: false,
    role: "AI Specialist",
    company: "CyberGroup",
    location: "Bengaluru, India",
    recommendation: "Hire: Great vector database integration capabilities, slightly passive candidate.",
    status: "Top",
    strengths_risks: []
  },
  {
    id: 5,
    rank: 5,
    name: "Karan Singh",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    yoe: 7.4,
    hiring_potential: 90,
    confidence: 93,
    trust_score: 93,
    open_to_work: true,
    role: "Lead Machine Learning Engineer",
    company: "AI Frontiers",
    location: "Delhi, India",
    recommendation: "Hire: Reliable systems scaling, solid docker/k8s orchestrator skills.",
    status: "Top",
    strengths_risks: []
  }
];

const MOCK_ANALYTICS: AnalyticsData = {
  timeline: [
    { technology: "Python", year: 2018, adoption_rate: 15.0 },
    { technology: "TensorFlow", year: 2019, adoption_rate: 30.0 },
    { technology: "PyTorch", year: 2020, adoption_rate: 45.0 },
    { technology: "Transformers", year: 2021, adoption_rate: 58.0 },
    { technology: "LangChain", year: 2022, adoption_rate: 70.0 },
    { technology: "RAG", year: 2023, adoption_rate: 82.0 },
    { technology: "Agentic AI", year: 2024, adoption_rate: 95.0 }
  ],
  skills_distribution: [
    { name: "AI / ML", percentage: 35 },
    { name: "Backend", percentage: 25 },
    { name: "Data Engineering", percentage: 15 },
    { name: "DevOps", percentage: 10 },
    { name: "Others", percentage: 15 }
  ],
  experience_distribution: [
    { label: "0-2 Yrs", count: 15000 },
    { label: "2-5 Yrs", count: 48000 },
    { label: "5-10 Yrs", count: 58000 },
    { label: "10+ Yrs", count: 32000 }
  ],
  trust_distribution: [
    { label: "High (80-100)", percentage: 62 },
    { label: "Medium (50-80)", percentage: 30 },
    { label: "Low (0-50)", percentage: 8 }
  ]
};

// 2. Fetch Actions
export async function getDashboardMetrics(): Promise<Metrics> {
  return fetchWithFallback<Metrics>(`${API_BASE_URL}/dashboard/metrics`, MOCK_METRICS);
}

export async function getAnalysisProgress(): Promise<AnalysisProgress> {
  return fetchWithFallback<AnalysisProgress>(`${API_BASE_URL}/dashboard/progress`, MOCK_PROGRESS);
}

export async function getJobDescription(): Promise<JobDescription> {
  return fetchWithFallback<JobDescription>(`${API_BASE_URL}/dashboard/job-description`, MOCK_JOB);
}

export async function getCandidates(search?: string, status?: string): Promise<Candidate[]> {
  let url = `${API_BASE_URL}/candidates`;
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (status) params.append("status", status);
  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  return fetchWithFallback<Candidate[]>(url, MOCK_CANDIDATES);
}

export async function getCandidateDetails(id: number): Promise<Candidate | null> {
  const fallback = MOCK_CANDIDATES.find(c => c.id === id) || null;
  return fetchWithFallback<Candidate | null>(`${API_BASE_URL}/candidates/${id}`, fallback);
}

export async function getAnalyticsData(): Promise<AnalyticsData> {
  return fetchWithFallback<AnalyticsData>(`${API_BASE_URL}/analytics`, MOCK_ANALYTICS);
}
