# backend/app/engines/nlp.py
import spacy
from typing import Dict, List, Any

class NLPEngine:
    def __init__(self):
        # spaCy model placeholder for resume parsing and entities extraction
        self.nlp = None

    def load_model(self):
        try:
            self.nlp = spacy.load("en_core_web_sm")
        except Exception:
            pass

    def extract_skills(self, text: str) -> List[str]:
        """Extract skills and technologies from raw resume text."""
        if not self.nlp:
            return []
        doc = self.nlp(text)
        # Placeholder skill extraction logic
        skills = []
        for ent in doc.ents:
            if ent.label_ in ["ORG", "PRODUCT", "WORK_OF_ART"]:
                skills.append(ent.text)
        return list(set(skills))

    def parse_resume(self, resume_bytes: bytes) -> Dict[str, Any]:
        """Parse pdf/docx resume bytes to structured experience metrics."""
        return {
            "candidate_name": "Extracted Candidate",
            "years_of_experience": 5.0,
            "skills": ["Python", "Machine Learning", "Docker"],
            "education": ["B.Tech Computer Science"]
        }
