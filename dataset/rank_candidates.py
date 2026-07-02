import json
import os
import re
import pandas as pd
from datetime import datetime

# Path definitions
CANDIDATES_JSONL_PATH = r"d:\THB\dataset\[PUB] India_runs_data_and_ai_challenge\India_runs_data_and_ai_challenge\candidates.jsonl"
OUTPUT_CSV_PATH = r"d:\THB\dataset\best_candidates.csv"
OUTPUT_XLSX_PATH = r"d:\THB\dataset\best_candidates.xlsx"

# Standardizing consulting / services companies
CONSULTING_COMPANIES = {
    "tcs", "tata consultancy services", "infosys", "wipro", 
    "accenture", "cognizant", "capgemini", "hcl", "tech mahindra", "mindtree"
}

# Non-technical/unrelated titles that are disqualifying traps
UNRELATED_TITLES = {
    "marketing manager", "operations manager", "sales executive", "accountant", 
    "hr manager", "customer support", "civil engineer", "mechanical engineer", 
    "graphic designer", "content writer", "product designer"
}

# Core target locations (Pune, Noida, Gurgaon, Delhi, Mumbai, Bangalore, Hyderabad)
INDIAN_CITIES = {
    "pune", "noida", "gurgaon", "delhi", "mumbai", "bangalore", 
    "bengaluru", "hyderabad", "ncr", "chennai", "kolkata"
}

def parse_date(date_str):
    if not date_str:
        return None
    try:
        return datetime.strptime(date_str, "%Y-%m-%d")
    except Exception:
        return None

def score_candidate(c):
    cid = c.get("candidate_id")
    profile = c.get("profile", {})
    skills_list = c.get("skills", [])
    career_history = c.get("career_history", [])
    signals = c.get("redrob_signals", {})
    
    # 1. Experience Years Check
    yoe = profile.get("years_of_experience", 0)
    exp_score = 0.0
    if 5.0 <= yoe <= 9.0:
        exp_score = 1.0
    elif 4.0 <= yoe < 5.0 or 9.0 < yoe <= 12.0:
        exp_score = 0.8
    elif yoe > 12.0:
        exp_score = 0.5
    else:
        exp_score = 0.2

    # 2. Check Only Consulting Companies
    companies_worked = []
    for job in career_history:
        comp = job.get("company", "").strip().lower()
        if comp:
            companies_worked.append(comp)
            
    is_only_consulting = False
    if companies_worked:
        is_only_consulting = all(
            any(consult in comp for consult in CONSULTING_COMPANIES) 
            for comp in companies_worked
        )
    
    # 3. Check Current Title & Unrelated Traps
    curr_title = profile.get("current_title", "").strip().lower()
    is_unrelated_trap = False
    if curr_title in UNRELATED_TITLES:
        is_unrelated_trap = True
        
    # 4. Location Check (relocation or locally based)
    loc = profile.get("location", "").strip().lower()
    country = profile.get("country", "").strip().lower()
    
    in_target_location = False
    is_outside_india = False
    
    if country and country != "india" and country != "in":
        is_outside_india = True
    
    if any(city in loc for city in INDIAN_CITIES):
        in_target_location = True
    if signals.get("willing_to_relocate", False) and not is_outside_india:
        in_target_location = True

    # 5. Semantic Skills & Experience Keyword Checks
    # We scan self-declared skills
    skills_set = {s.get("name", "").strip().lower() for s in skills_list}
    
    # We also check profile summary and history descriptions for keywords
    summary_text = (profile.get("summary") or "").lower()
    history_text = " ".join([(job.get("description") or "").lower() for job in career_history])
    combined_text = summary_text + " " + history_text
    
    # Core search / ranking / vector / eval skills
    critical_skills = {
        "embeddings", "vector database", "vector db", "pinecone", "weaviate", 
        "qdrant", "milvus", "opensearch", "elasticsearch", "faiss", 
        "retrieval", "ranking", "ndcg", "mrr", "map", "sentence-transformers", 
        "bge", "e5", "rag", "search engine", "recommendation system"
    }
    
    # Secondary AI/ML skills
    ml_skills = {
        "python", "llm", "nlp", "machine learning", "deep learning", 
        "fine-tuning", "lora", "qlora", "peft", "xgboost"
    }
    
    critical_matches = 0
    for s in critical_skills:
        if s in skills_set or s in combined_text:
            critical_matches += 1
            
    ml_matches = 0
    for s in ml_skills:
        if s in skills_set or s in combined_text:
            ml_matches += 1
            
    skill_score = (critical_matches * 0.15) + (ml_matches * 0.05)
    skill_score = min(skill_score, 1.0)
    
    # 6. Redrob Activity & Engagement Signals
    response_rate = signals.get("recruiter_response_rate", 0)
    github_score = signals.get("github_activity_score", 0)
    
    # Last active date check (decay score if inactive)
    last_active_str = signals.get("last_active_date")
    active_date = parse_date(last_active_str)
    activity_penalty = 1.0
    if active_date:
        # Reference date is early 2026 (let's say May 2026)
        days_inactive = (datetime(2026, 5, 1) - active_date).days
        if days_inactive > 180: # 6 months
            activity_penalty = 0.5
        elif days_inactive > 90: # 3 months
            activity_penalty = 0.8
            
    # 7. Overall Score Aggregation
    base_score = (exp_score * 0.2) + (skill_score * 0.5) + (response_rate * 0.2) + ((max(0, github_score)/100.0) * 0.1)
    base_score *= activity_penalty
    
    # Apply severe penalties for absolute disqualifiers
    if is_only_consulting:
        base_score *= 0.1
    if is_unrelated_trap:
        base_score *= 0.05
    if is_outside_india:
        base_score *= 0.3 # visa issue
        
    base_score = min(max(base_score, 0.0), 1.0)
    
    # Generate reasoning sentence based on real database traits
    reasoning_parts = []
    reasoning_parts.append(f"{profile.get('current_title', 'AI Engineer')} with {yoe} YOE.")
    reasoning_parts.append(f"Matched {critical_matches} critical retrieval/ranking and {ml_matches} secondary ML skills.")
    if signals.get("github_activity_score", -1) > 50:
        reasoning_parts.append(f"Highly active GitHub profile (score {github_score}).")
    reasoning_parts.append(f"Recruiter response rate is {int(response_rate * 100)}%.")
    
    reasoning = " ".join(reasoning_parts)
    
    return base_score, reasoning

def main():
    print("Reading and ranking candidates from candidates.jsonl...")
    scored_candidates = []
    
    # Load and score candidates line-by-line
    count = 0
    with open(CANDIDATES_JSONL_PATH, "r", encoding="utf-8") as f:
        for line in f:
            if not line.strip():
                continue
            c = json.loads(line)
            score, reasoning = score_candidate(c)
            scored_candidates.append({
                "candidate_id": c["candidate_id"],
                "score": round(score, 4),
                "reasoning": reasoning
            })
            count += 1
            if count % 10000 == 0:
                print(f"Processed {count} candidates...")
                
    # Sort candidates
    # Rules: descending by score, tie-break by candidate_id ascending
    scored_candidates.sort(key=lambda x: (-x["score"], x["candidate_id"]))
    
    # Assign ranks 1 to 100
    top_candidates = []
    for rank, cand in enumerate(scored_candidates[:100], start=1):
        top_candidates.append({
            "candidate_id": cand["candidate_id"],
            "rank": rank,
            "score": cand["score"],
            "reasoning": cand["reasoning"]
        })
        
    # Write to CSV
    df = pd.DataFrame(top_candidates)
    # Ensure correct column order
    df = df[["candidate_id", "rank", "score", "reasoning"]]
    df.to_csv(OUTPUT_CSV_PATH, index=False)
    print(f"CSV saved to {OUTPUT_CSV_PATH}")
    
    # Write to XLSX
    df.to_excel(OUTPUT_XLSX_PATH, index=False)
    print(f"Excel file saved to {OUTPUT_XLSX_PATH}")

if __name__ == "__main__":
    main()
