# backend/app/engines/graph.py
import networkx as nx
from typing import Dict, List, Tuple

class SkillGraphEngine:
    def __init__(self):
        self.graph = nx.DiGraph()
        self._initialize_knowledge_graph()

    def _initialize_knowledge_graph(self):
        """Build standard taxonomies of technologies and skills."""
        # Core parent relationships
        self.graph.add_edge("AI Systems", "Machine Learning", weight=1.0)
        self.graph.add_edge("Machine Learning", "Deep Learning", weight=0.9)
        self.graph.add_edge("Deep Learning", "LLM / NLP", weight=0.8)
        self.graph.add_edge("LLM / NLP", "RAG", weight=0.7)
        self.graph.add_edge("LLM / NLP", "Agentic AI", weight=0.7)
        self.graph.add_edge("Software Engineering", "Python", weight=0.9)
        self.graph.add_edge("DevOps", "Docker", weight=0.8)
        self.graph.add_edge("DevOps", "Kubernetes", weight=0.8)

    def calculate_skill_distance(self, skill_a: str, skill_b: str) -> float:
        """Calculate semantic distance between two skills in the taxonomy graph."""
        if not (self.graph.has_node(skill_a) and self.graph.has_node(skill_b)):
            return 0.0 # No relation
        try:
            # Shortest path between node a and node b
            path_len = nx.shortest_path_length(self.graph.to_undirected(), skill_a, skill_b)
            return max(0.0, 1.0 - (0.2 * path_len))
        except nx.NetworkXNoPath:
            return 0.0

    def evaluate_coverage(self, candidate_skills: List[str], required_skills: List[str]) -> Dict[str, Any]:
        """Assess candidate's skills coverage using path-weighted graph distance."""
        coverage = {}
        for req in required_skills:
            best_match_score = 0.0
            for cand in candidate_skills:
                if req.lower() == cand.lower():
                    best_match_score = 1.0
                    break
                else:
                    dist = self.calculate_skill_distance(req, cand)
                    if dist > best_match_score:
                        best_match_score = dist
            coverage[req] = best_match_score
        return coverage
