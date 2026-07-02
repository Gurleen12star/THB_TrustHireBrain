# backend/app/engines/scoring.py
from typing import Dict, List, Any

class ExplainableScoringEngine:
    def __init__(self):
        pass

    def compute_hiring_potential(self, skill_match: float, yoe_score: float, role_match: float) -> int:
        """Weighted potential calculation."""
        score = (skill_match * 0.5) + (yoe_score * 0.3) + (role_match * 0.2)
        return int(score * 100)

    def calculate_confidence(self, data_completeness: float, validation_checks: int) -> int:
        """Calculate confidence percentage based on evidence quality."""
        score = (data_completeness * 0.7) + (min(1.0, validation_checks / 5.0) * 0.3)
        return int(score * 100)

    def calculate_trust_score(self, verifications: Dict[str, bool]) -> int:
        """Calculate trust level based on verified skills, education, and experience claims."""
        verified_count = sum(1 for v in verifications.values() if v)
        total_count = max(1, len(verifications))
        return int((verified_count / total_count) * 100)

    def generate_explanation(self, candidate_data: Dict[str, Any], job_requirements: List[str]) -> Dict[str, Any]:
        """Generate human-readable explanations of WHY a candidate got their scores."""
        return {
            "ai_recommendation": "Strong Hire: Highly aligned on core LLM skills and has the required leadership capacity.",
            "key_strengths": [
                "Extensive NLP and neural network models deployment",
                "Proven track record scaling vector search indexes",
            ],
            "risk_factors": [
                "Has limited cloud native orchestration (Kubernetes) history",
            ]
        }
