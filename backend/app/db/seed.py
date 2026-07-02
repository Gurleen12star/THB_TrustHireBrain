import os
import sys

# Ensure backend directory is in the python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from app.db.session import engine, Base, SessionLocal
from app.models.database import (
    Candidate, CandidateStrengthRisk, JobDescription, JobSkill,
    AnalysisStep, AnalysisTime, TechnologyAdoption, SkillDistribution,
    ExperienceDistribution, TrustScoreDistribution
)

def seed_db():
    # Recreate tables
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        # 1. Seed Job Description
        job = JobDescription(
            title="AI Engineer",
            status="Completed",
            location="Bengaluru, India",
            department="AI & Data",
            experience_required="6+ Years",
            description="Senior AI Engineer with 6+ years of experience in LLM, NLP, and MLOps",
            created_at="2026-07-02"
        )
        db.add(job)
        db.commit()
        db.refresh(job)

        # 2. Seed Job Skills (Required Skills)
        skills = [
            JobSkill(job_id=job.id, name="Python", type="critical", score=98),
            JobSkill(job_id=job.id, name="LLM / NLP", type="critical", score=95),
            JobSkill(job_id=job.id, name="Machine Learning", type="important", score=93),
            JobSkill(job_id=job.id, name="PyTorch", type="important", score=89),
            JobSkill(job_id=job.id, name="Vector Databases", type="preferred", score=85),
            JobSkill(job_id=job.id, name="Docker", type="preferred", score=80),
            JobSkill(job_id=job.id, name="AWS", type="nice_to_have", score=75),
            JobSkill(job_id=job.id, name="Kubernetes", type="nice_to_have", score=70),
        ]
        db.add_all(skills)

        # 3. Seed Candidates
        c1 = Candidate(
            rank=1,
            name="Aarav Patel",
            avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            yoe=8.2,
            hiring_potential=96,
            confidence=97,
            trust_score=88,
            open_to_work=True,
            role="Senior AI Engineer",
            company="TechNova",
            location="Bengaluru, India",
            recommendation="Strong Hire: Aarav is an excellent fit for this role. High technical expertise and great growth trajectory.",
            status="Top"
        )
        c2 = Candidate(
            rank=2,
            name="Meera Iyer",
            avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
            yoe=6.5,
            hiring_potential=94,
            confidence=96,
            trust_score=97,
            open_to_work=True,
            role="AI Engineer",
            company="InnovateLab",
            location="Mumbai, India",
            recommendation="Strong Hire: Exceptionally high trust score and strong foundation in NLP pipelines.",
            status="Top"
        )
        c3 = Candidate(
            rank=3,
            name="Rohan Verma",
            avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
            yoe=7.1,
            hiring_potential=93,
            confidence=95,
            trust_score=95,
            open_to_work=True,
            role="Senior ML Engineer",
            company="DataScale",
            location="Hyderabad, India",
            recommendation="Strong Hire: Solid PyTorch and MLOps deployment background.",
            status="Top"
        )
        c4 = Candidate(
            rank=4,
            name="Sneha Reddy",
            avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
            yoe=6.8,
            hiring_potential=91,
            confidence=94,
            trust_score=94,
            open_to_work=False,
            role="AI Specialist",
            company="CyberGroup",
            location="Bengaluru, India",
            recommendation="Hire: Great vector database integration capabilities, slightly passive candidate.",
            status="Top"
        )
        c5 = Candidate(
            rank=5,
            name="Karan Singh",
            avatar="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
            yoe=7.4,
            hiring_potential=90,
            confidence=93,
            trust_score=93,
            open_to_work=True,
            role="Lead Machine Learning Engineer",
            company="AI Frontiers",
            location="Delhi, India",
            recommendation="Hire: Reliable systems scaling, solid docker/k8s orchestrator skills.",
            status="Top"
        )

        db.add_all([c1, c2, c3, c4, c5])
        db.commit()
        db.refresh(c1)

        # 4. Seed Strengths and Risks
        strengths_risks = [
            # Aarav
            CandidateStrengthRisk(candidate_id=c1.id, type="strength", content="Strong LLM and RAG experience"),
            CandidateStrengthRisk(candidate_id=c1.id, type="strength", content="Excellent system design skills"),
            CandidateStrengthRisk(candidate_id=c1.id, type="strength", content="Consistent career growth"),
            CandidateStrengthRisk(candidate_id=c1.id, type="strength", content="High impact projects"),
            CandidateStrengthRisk(candidate_id=c1.id, type="strength", content="Active in open source"),
            CandidateStrengthRisk(candidate_id=c1.id, type="risk", content="Limited Kubernetes experience"),
            CandidateStrengthRisk(candidate_id=c1.id, type="risk", content="Could improve communication evidence"),
            # Meera
            CandidateStrengthRisk(candidate_id=c2.id, type="strength", content="State-of-the-art NLP models processing experience"),
            CandidateStrengthRisk(candidate_id=c2.id, type="strength", content="Extremely high code quality standard"),
            CandidateStrengthRisk(candidate_id=c2.id, type="risk", content="Minimal cloud infrastructure scaling background"),
        ]
        db.add_all(strengths_risks)

        # 5. Seed Analysis Steps
        steps = [
            AnalysisStep(step_name="Understanding Job Description", status="completed", order=1),
            AnalysisStep(step_name="Building Requirement Graph", status="completed", order=2),
            AnalysisStep(step_name="Parsing 100,000 Candidates", status="completed", order=3),
            AnalysisStep(step_name="Creating Intelligence Profiles", status="completed", order=4),
            AnalysisStep(step_name="Skill Inference Engine", status="completed", order=5),
            AnalysisStep(step_name="Career Evolution Analysis", status="completed", order=6),
            AnalysisStep(step_name="Trust Validation", status="completed", order=7),
            AnalysisStep(step_name="Ranking & Scoring Candidates", status="in_progress", order=8),
            AnalysisStep(step_name="Generating Reports", status="pending", order=9),
        ]
        db.add_all(steps)

        # 6. Seed Analysis Time
        analysis_time = AnalysisTime(
            elapsed_time="14m 02s",
            estimated_remaining="4m 40s",
            system_status="All systems operational",
            progress_percentage=76
        )
        db.add(analysis_time)

        # 7. Seed Technology Adoption
        adoption = [
            TechnologyAdoption(technology="Python", year=2018, adoption_rate=15.0),
            TechnologyAdoption(technology="TensorFlow", year=2019, adoption_rate=30.0),
            TechnologyAdoption(technology="PyTorch", year=2020, adoption_rate=45.0),
            TechnologyAdoption(technology="Transformers", year=2021, adoption_rate=58.0),
            TechnologyAdoption(technology="LangChain", year=2022, adoption_rate=70.0),
            TechnologyAdoption(technology="RAG", year=2023, adoption_rate=82.0),
            TechnologyAdoption(technology="Agentic AI", year=2024, adoption_rate=95.0),
        ]
        db.add_all(adoption)

        # 8. Seed Skill Distribution
        skills_dist = [
            SkillDistribution(name="AI / ML", percentage=35),
            SkillDistribution(name="Backend", percentage=25),
            SkillDistribution(name="Data Engineering", percentage=15),
            SkillDistribution(name="DevOps", percentage=10),
            SkillDistribution(name="Others", percentage=15),
        ]
        db.add_all(skills_dist)

        # 9. Seed Experience Distribution
        exp_dist = [
            ExperienceDistribution(label="0-2 Yrs", count=15000),
            ExperienceDistribution(label="2-5 Yrs", count=48000),
            ExperienceDistribution(label="5-10 Yrs", count=58000),
            ExperienceDistribution(label="10+ Yrs", count=32000),
        ]
        db.add_all(exp_dist)

        # 10. Seed Trust Score Distribution
        trust_dist = [
            TrustScoreDistribution(label="High (80-100)", percentage=62),
            TrustScoreDistribution(label="Medium (50-80)", percentage=30),
            TrustScoreDistribution(label="Low (0-50)", percentage=8),
        ]
        db.add_all(trust_dist)

        db.commit()
        print("Database successfully initialized and seeded with dashboard metrics!")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
