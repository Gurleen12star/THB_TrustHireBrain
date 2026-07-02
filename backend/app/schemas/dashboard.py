# backend/app/schemas/dashboard.py
from pydantic import BaseModel
from typing import List, Optional

class StrengthRiskSchema(BaseModel):
    id: int
    candidate_id: int
    type: str
    content: str

    class Config:
        from_attributes = True

class CandidateSchema(BaseModel):
    id: int
    rank: Optional[int]
    name: str
    avatar: Optional[str]
    yoe: float
    hiring_potential: int
    confidence: int
    trust_score: int
    open_to_work: bool
    role: str
    company: Optional[str]
    location: str
    recommendation: Optional[str]
    status: str
    strengths_risks: List[StrengthRiskSchema] = []

    class Config:
        from_attributes = True

class JobSkillSchema(BaseModel):
    id: int
    job_id: int
    name: str
    type: str
    score: int

    class Config:
        from_attributes = True

class JobDescriptionSchema(BaseModel):
    id: int
    title: str
    status: str
    location: str
    department: str
    experience_required: str
    description: str
    created_at: str
    skills: List[JobSkillSchema] = []

    class Config:
        from_attributes = True

class MetricsSchema(BaseModel):
    total_candidates: int
    top_avg_score: float
    high_potential: int
    trusted_candidates: int
    analysis_time: str

class AnalysisStepSchema(BaseModel):
    id: int
    step_name: str
    status: str
    order: int

    class Config:
        from_attributes = True

class AnalysisProgressSchema(BaseModel):
    steps: List[AnalysisStepSchema]
    elapsed_time: str
    estimated_remaining: str
    system_status: str
    progress_percentage: int

class TechAdoptionSchema(BaseModel):
    technology: str
    year: int
    adoption_rate: float

    class Config:
        from_attributes = True

class SkillDistributionSchema(BaseModel):
    name: str
    percentage: int

    class Config:
        from_attributes = True

class ExperienceDistributionSchema(BaseModel):
    label: str
    count: int

    class Config:
        from_attributes = True

class TrustDistributionSchema(BaseModel):
    label: str
    percentage: int

    class Config:
        from_attributes = True

class AnalyticsDataSchema(BaseModel):
    timeline: List[TechAdoptionSchema]
    skills_distribution: List[SkillDistributionSchema]
    experience_distribution: List[ExperienceDistributionSchema]
    trust_distribution: List[TrustDistributionSchema]
