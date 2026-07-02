# 🧠 TrustHireBrain (THB)

### Beyond Resume Matching — Trustworthy AI Hiring Intelligence

An Explainable AI Hiring Intelligence Platform that builds Candidate Intelligence Profiles, understands job requirements, infers missing skills, analyzes career evolution, validates trust, and predicts hiring potential using multi-intelligence reasoning.

🏆 **Built for India Runs x Redrob AI Challenge 2026**

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/FastAPI-0.109-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/SQLite-3.0-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
  <img src="https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="MIT License" />
</p>

---

## 2. Problem Statement

Traditional Applicant Tracking Systems (ATS) rely on surface-level keyword frequency matchers. This creates a flawed matching pipeline:

```text
Traditional ATS: 
Job Description Keywords ──> Resume Scanning ──> Match Score (Regex Count) ──> Top Ranked Candidates
```

### Critical Bottlenecks of Legacy Systems:
*   **Misses Hidden/Adjacent Skills:** Candidates with rich experience might use different synonyms or fail to list exact acronyms (e.g., matching "Deep Learning" but missing "Neural Networks").
*   **Zero Explainability:** Algorithms yield black-box scores with no context or breakdown, leaving hiring managers to manually verify suitability.
*   **Ignores Experience Trust:** Treats self-reported resume bullets as absolute truths without verifying credentials or detecting anomalies.
*   **Ignores Career Growth Evolution:** Fails to analyze progression speed, company prestige, or trajectory changes over time.
*   **No Reasoning Capabilities:** Lacks multi-dimensional evaluation of soft skills, execution capabilities, and leadership alignment.

---

## 3. Our Solution: Semantic Multi-Intelligence Reasoning

TrustHireBrain replaces simple filters with a multi-layered semantic evaluation pipeline:

```text
Job Description ──> Requirement Graph ──> Knowledge Graph ──> Skill Inference 
      │
      └──> Candidate Profile ──> Career Evolution ──> Technology Timeline ──> Hiring Potential & Trust Rating
```

Rather than checking for exact string occurrences, THB models candidate suitability across 8 core intelligence dimensions, weighting evidence dynamically against the requirement graph to explain exactly **why** a candidate is suitable.

---

## 4. Why TrustHireBrain?

| Feature Dimension | Traditional ATS | TrustHireBrain (THB) |
| :--- | :--- | :--- |
| **Match Mode** | Keyword Matching | Requirement Intelligence Engine |
| **Scoring Target** | Resume Similarity | Real Hiring Potential Rating |
| **Skill Understanding** | Static Strings | Dynamic Skill Graph Inference |
| **Explainability** | Black Box | Explainable AI Breakdown & Evidence |
| **Profile Integrity** | Single Flat Score | Multi-Intelligence Profile Dimensions |
| **Trust Layer** | No Trust Verification | Credentials & Experience Trust Validation |
| **Career Analytics** | No Career Analysis | Career Evolution & Promotion Trajectory |
| **Uncertainty** | No Confidence Metrics | Confidence Estimation Percentage |

---

## 5. Feature Catalog

### 📋 Requirement Intelligence
*   **Multi-Format Upload:** Direct support for drag-and-drop file uploads (`.pdf`, `.docx`, `.txt`) or manual text entry.
*   **Requirement Graph:** Visual SVG network representation of skills dependency mapping.
*   **Weight Customization:** Real-time editing of parsed skill priorities (Critical, Important, Preferred) and weight scores.

### 👤 Candidate Intelligence
*   **Dynamic Parsing:** Automated parsing of candidate profiles directly into relational models.
*   **Career & Tech Timeline:** Chronological mapping of roles, promotions, and technology stack adoptions.
*   **Knowledge Graph:** Semantic inference linking self-declared skills with related auxiliary frameworks.

### 🧠 Decision & Match Intelligence
*   **Hiring Potential Engine:** Dynamically calculates candidate fit by mapping profile strength against JD requirement graphs.
*   **Trust Score Validation:** Heuristic verification of experience alignment, career gaps, and skill validation.
*   **Confidence Estimation:** Provides a confidence metric for each rating to reflect match certainty.
*   **Explainable Evidence Notes:** Generates real-time textual explanations of candidate strengths and risks.

### 📊 Platform Analytics & Dashboard
*   **Real-time Shortlist:** Dynamic ranking list updating instantly when sliders are adjusted.
*   **Visualization Suite:** Recharts-powered graphs showing experience ranges, trust score spreads, and skill distribution.
*   **Detailed Drawers:** Pop-out detail views showing a deep dive into candidate profiles.
*   **Side-by-Side Comparison:** Interactive side-by-side comparison modal for candidate matching metrics.

---

## 6. Screenshots & Workspace Views

### 1. Interactive Main Dashboard
![Main Dashboard](assets/media__1782991909319.png)

### 2. Live Dynamic Analysis Workspace
![New Analysis Pipeline Workspace](assets/media__1782991931596.png)

### 3. Job Description Parser & Skill Graph Priority Table
![Job Description Requirement Intelligence](assets/media__1782992364438.png)

---

## 7. System Architecture

THB's backend and frontend are strictly separated to support high-throughput AI inference pipelines and real-time state synchronization:

```mermaid
graph TD
    subgraph Frontend [Next.js 15 Client]
        UI[Interactive UI & Charts]
        State[State Manager]
        Fetch[API Fetch Client]
    end

    subgraph Backend [FastAPI Server Core]
        API[Router Controllers]
        Scoring[Hiring Potential Calculator]
        Graph[Requirement Graph Engine]
        DB_Layer[SQLAlchemy Database Session]
    end

    subgraph Storage [Database]
        SQLite[(SQLite Database File)]
    end

    UI <--> State
    State <--> Fetch
    Fetch <== REST JSON ==> API
    API <--> Scoring
    API <--> Graph
    Scoring <--> DB_Layer
    Graph <--> DB_Layer
    DB_Layer <--> SQLite
```

---

## 8. Candidate Intelligence Profile Dimensions

To build a holistic view, THB evaluates candidate profiles across 8 core dimensions:

1.  **Technical Intelligence:** Verifiable depth in core programming stacks, libraries, and architecture frameworks.
2.  **Leadership Intelligence:** Management experience, mentorship history, team-leading metrics, and ownership signals.
3.  **Trust Intelligence:** Verification indicator assessing career consistency, credentials, and anomaly detection.
4.  **Learning Intelligence:** Adaptability rating reflecting self-taught skills, transition speeds, and stack changes.
5.  **Innovation Intelligence:** Patents, open-source contributions, research publications, and product launch history.
6.  **Behavioural Intelligence:** Interpersonal qualities, collaboration signals, and role communication alignment.
7.  **Career Intelligence:** Progression speed, promotion intervals, and company growth trajectories.
8.  **Execution Intelligence:** Hands-on product delivery, system scaling metrics, and project ownership signals.

---

## 9. Project Execution Workflow

```text
[1. Upload/Paste JD] ──> [2. Parse Requirements & Graph] ──> [3. Setup Weights Sliders]
                                                                     │
                                                                     ▼
[6. Export Excel/PDF] <── [5. View Recalculated Shortlist] <── [4. Execute Scoring Engine]
```

---

## 10. Technologies & Frameworks

| Layer | Technology / Library | Role in Platform |
| :--- | :--- | :--- |
| **Frontend** | Next.js 15 (Turbopack) | Dynamic Single Page UI |
| **Backend** | FastAPI (Python 3.12) | Real-time REST API Server |
| **Database** | SQLite (SQLAlchemy ORM) | Relational candidate data and logs |
| **NLP & Text** | spaCy (`en_core_web_sm`) | Keyword, noun, and skill extraction |
| **Graph Network** | NetworkX | Skill dependency modeling |
| **Data Engine** | Pandas / NumPy | Tabular analysis & scoring matrix transformations |
| **Visual Charts** | Recharts (React) | High-fidelity data visualization |
| **Styling** | TailwindCSS & Shadcn/UI | Modern Glassmorphic Dashboard Design |

---

## 11. Folder Structure

```text
d:\THB/
├── assets/                # README screenshot assets
├── dataset/               # Challenge dataset files & outputs
│   ├── best_candidates.csv     # Validated top 100 ranking outputs (CSV)
│   ├── best_candidates.xlsx    # Excel sheet output format (< 5 MB)
│   └── rank_candidates.py      # Execution ranking script
├── backend/
│   ├── app/
│   │   ├── api/          # Route endpoint controllers (v1/)
│   │   ├── core/         # Settings, cors configurations
│   │   ├── db/           # SQLite database setup and initial seeds
│   │   ├── engines/      # Modular AI engines (NLP, Vector, Graph, Scoring)
│   │   ├── models/       # Database tables (Candidate, JobDescription, etc.)
│   │   └── main.py       # FastAPI application root startup hook
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── app/          # Next.js page routes (dashboard, compare, etc.)
│   │   ├── components/   # Reusable UI widgets and layout modules
│   │   ├── context/      # Color themes management contexts
│   │   ├── lib/          # API fetch wrappers
│   │   └── types/        # TypeScript structural types
│   ├── next.config.ts
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

---

## 12. Local Installation & Setup

### Running with Docker Compose (Recommended)
1.  Clone the repository and run:
    ```bash
    docker compose up --build
    ```
2.  Navigate to `http://localhost:3000` in your web browser.

---

### Manual Dev Execution

#### 1. Setup Backend
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  Launch the FastAPI server:
    ```bash
    uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
    ```

#### 2. Setup Frontend
1.  Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Launch Next.js:
    ```bash
    npm run dev
    ```
4.  Open `http://localhost:3000` in your browser.

---

## 13. Redrob AI Hackathon Challenge Results

We processed the full **100,000+ candidate profile dataset** (`candidates.jsonl`) against the "Senior AI Engineer — Founding Team" Job Description at Redrob AI.

### Execution Metrics:
*   **Total Candidates Scanned:** 100,000 profiles
*   **Processing Time:** 47 seconds (single-threaded CPU parser)
*   **Validation Status:** **`Submission is valid.`** (Successfully passed the official `validate_submission.py` format tests)
*   **Output Files:**
    *   [best_candidates.xlsx](file:///d:/THB/dataset/best_candidates.xlsx) (Format: XLSX Spreadsheet, 8.9 KB)
    *   [best_candidates.csv](file:///d:/THB/dataset/best_candidates.csv) (Format: CSV Table, 18.6 KB)

### Preview: Top 10 Ranked Candidates
Below is the preview of our highest recommended candidates:

| Rank | Candidate ID | Score | Reasoning Summary |
| :--- | :--- | :--- | :--- |
| **1** | `CAND_0061265` | `0.9678` | Recommendation Systems Engineer with 6.6 YOE. Matched 10 critical retrieval/ranking and 3 secondary ML skills. Highly active GitHub profile (score 79.8). Recruiter response rate is 94%. |
| **2** | `CAND_0077337` | `0.9580` | Staff Machine Learning Engineer with 7.0 YOE. Matched 11 critical retrieval/ranking and 4 secondary ML skills. Highly active GitHub profile (score 68.0). Recruiter response rate is 95%. |
| **3** | `CAND_0002025` | `0.9569` | Senior AI Engineer with 5.9 YOE. Matched 8 critical retrieval/ranking and 6 secondary ML skills. Highly active GitHub profile (score 96.9). Recruiter response rate is 80%. |
| **4** | `CAND_0011687` | `0.9543` | Senior NLP Engineer with 7.8 YOE. Matched 10 critical retrieval/ranking and 5 secondary ML skills. Highly active GitHub profile (score 76.3). Recruiter response rate is 89%. |
| **5** | `CAND_0076163` | `0.9526` | NLP Engineer with 6.9 YOE. Matched 6 critical retrieval/ranking and 3 secondary ML skills. Highly active GitHub profile (score 84.6). Recruiter response rate is 84%. |
| **6** | `CAND_0064326` | `0.9494` | Search Engineer with 7.6 YOE. Matched 7 critical retrieval/ranking and 6 secondary ML skills. Highly active GitHub profile (score 61.4). Recruiter response rate is 94%. |
| **7** | `CAND_0096142` | `0.9485` | Applied ML Engineer with 5.0 YOE. Matched 6 critical retrieval/ranking and 5 secondary ML skills. Highly active GitHub profile (score 80.5). Recruiter response rate is 84%. |
| **8** | `CAND_0052682` | `0.9484` | NLP Engineer with 6.6 YOE. Matched 6 critical retrieval/ranking and 4 secondary ML skills. Highly active GitHub profile (score 72.4). Recruiter response rate is 88%. |
| **9** | `CAND_0065195` | `0.9473` | Search Engineer with 5.1 YOE. Matched 7 critical retrieval/ranking and 3 secondary ML skills. Highly active GitHub profile (score 87.3). Recruiter response rate is 80%. |
| **10** | `CAND_0024990` | `0.9460` | Junior ML Engineer with 5.2 YOE. Matched 5 critical retrieval/ranking and 7 secondary ML skills. Highly active GitHub profile (score 80.0). Recruiter response rate is 83%. |

---

## 14. Research & Engineering Innovation

Instead of relying on standard wrapper APIs, THB leverages custom, modular pipeline components:
*   **Requirement Intelligence Engine:** Uses NetworkX to build a skill dependency graph, assigning weights based on context and priority tags.
*   **Skill Inference Engine:** Extends raw profile listings by scanning professional summaries semantically using spaCy tokenization.
*   **Career Evolution Analysis:** Models promotion paths and YOE ratios to weigh candidates who progress faster.
*   **Trust Validator:** Analyzes employment timelines, matching consistency checks against credentials to verify experience integrity.

---

## 15. Scale & Production Roadmap

```text
Hackathon Phase (Dev Mode) ──> Beta Testing ──> Production SaaS ──> Enterprise Integration
   [SQLite DB, Local Files]      [PostgreSQL,    [Docker Compose,   [Single Sign-On (SSO),
                                  Redis Cache]    Vector Indexes]    Enterprise Integrations]
```

*   **Dev Mode:** Light SQLite relational files for fast local execution.
*   **Production:** PostgreSQL backend with Redis caching clusters and pgvector indexes to accelerate candidate vector matches.

---

## 16. Engineering Decisions

We designed TrustHireBrain around clean engineering decisions rather than coincidental hacks:

| Decision | Why We Chose It |
| :--- | :--- |
| **Modular Engine Architecture** | Allows independent enhancement of NLP, vector, graph, and scoring engines. |
| **Explainable Scoring System** | Recruiters need clear evidence reports, not just black-box scores. |
| **Requirement Graph Mapping** | Captures structured relationship matrices between adjacent technologies. |
| **Confidence Estimation** | Quantifies matches to flag candidates with insufficient evidence. |
| **Next.js 15 + Turbopack** | Provides sub-second hot reloading speeds and modern Server Components structure. |

---

## 17. Deployment Instructions

To make TrustHireBrain accessible to anyone over the web, you can deploy the Backend and Frontend to cloud hosting platforms for free:

### 1. Deploy Backend (FastAPI) on Render
1.  Go to [Render](https://render.com) and click **New > Web Service**.
2.  Connect your GitHub repository.
3.  Configure the settings:
    *   **Name:** `thb-backend`
    *   **Root Directory:** `backend`
    *   **Environment:** `Docker` (Render will automatically read `backend/Dockerfile` and compile the image)
    *   **Instance Type:** `Free`
4.  Click **Deploy Web Service**.
*Note: Render will build the container, create the SQLite database, and seed initial candidate data automatically on startup. Copy your public Web Service URL (e.g., `https://thb-backend.onrender.com`).*

### 2. Deploy Frontend (Next.js) on Vercel
1.  Go to [Vercel](https://vercel.com) and click **Add New > Project**.
2.  Connect your GitHub repository.
3.  Configure the settings:
    *   **Framework Preset:** `Next.js`
    *   **Root Directory:** `frontend`
    *   **Environment Variables:**
        *   Add a new environment variable `NEXT_PUBLIC_API_URL` with the value of your Render URL + `/api/v1` (e.g., `https://thb-backend.onrender.com/api/v1`).
4.  Click **Deploy**.
*Vercel will compile the pages statically and host it publicly. Share the link with anyone to review the platform!*

---

## 👥 The Team
*   **Gurleen** — Principal Software Architect & AI Engineer
    *   [GitHub Profile](https://github.com/Gurleen12star)

---

## 📄 License
This project is licensed under the MIT License.
