from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, Table
from sqlalchemy.orm import relationship
from app.db.session import Base

class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True, index=True)
    rank = Column(Integer, nullable=True)
    name = Column(String, index=True)
    avatar = Column(String, nullable=True)
    yoe = Column(Float)
    hiring_potential = Column(Integer)  # Percentage, e.g. 96
    confidence = Column(Integer)       # Percentage, e.g. 97
    trust_score = Column(Integer)      # Out of 100, e.g. 88
    open_to_work = Column(Boolean, default=True)
    role = Column(String, index=True)
    company = Column(String, nullable=True)
    location = Column(String)
    recommendation = Column(String, nullable=True)
    status = Column(String, default="All")  # e.g., Shortlisted, Top, All
    
    strengths_risks = relationship("CandidateStrengthRisk", back_populates="candidate", cascade="all, delete-orphan")

class CandidateStrengthRisk(Base):
    __tablename__ = "candidate_strengths_risks"

    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey("candidates.id"))
    type = Column(String)  # 'strength' or 'risk'
    content = Column(String)

    candidate = relationship("Candidate", back_populates="strengths_risks")

class JobDescription(Base):
    __tablename__ = "job_descriptions"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    status = Column(String, default="Completed")  # Completed, Processing, Pending
    location = Column(String)
    department = Column(String)
    experience_required = Column(String)
    description = Column(String)
    created_at = Column(String)
    
    skills = relationship("JobSkill", back_populates="job", cascade="all, delete-orphan")

class JobSkill(Base):
    __tablename__ = "job_skills"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("job_descriptions.id"))
    name = Column(String)
    type = Column(String)  # 'critical', 'important', 'preferred', 'nice_to_have'
    score = Column(Integer)  # Percentage, e.g. 98

    job = relationship("JobDescription", back_populates="skills")

class AnalysisStep(Base):
    __tablename__ = "analysis_steps"

    id = Column(Integer, primary_key=True, index=True)
    step_name = Column(String)
    status = Column(String)  # 'completed', 'in_progress', 'pending'
    order = Column(Integer)

class AnalysisTime(Base):
    __tablename__ = "analysis_time"

    id = Column(Integer, primary_key=True, index=True)
    elapsed_time = Column(String)
    estimated_remaining = Column(String)
    system_status = Column(String)
    progress_percentage = Column(Integer)

class TechnologyAdoption(Base):
    __tablename__ = "technology_adoption"

    id = Column(Integer, primary_key=True, index=True)
    technology = Column(String)
    year = Column(Integer)
    adoption_rate = Column(Float)

class SkillDistribution(Base):
    __tablename__ = "skill_distribution"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    percentage = Column(Integer)

class ExperienceDistribution(Base):
    __tablename__ = "experience_distribution"

    id = Column(Integer, primary_key=True, index=True)
    label = Column(String)
    count = Column(Integer)

class TrustScoreDistribution(Base):
    __tablename__ = "trust_score_distribution"

    id = Column(Integer, primary_key=True, index=True)
    label = Column(String)
    percentage = Column(Integer)
