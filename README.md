# TrustHireBrain (THB) — AI Hiring Intelligence Platform

TrustHireBrain (THB) is a production-quality, explainable AI hiring intelligence platform built on Next.js 15, FastAPI, and SQLite. 

Instead of simple keyword matching, THB calculates candidate matching potentials using semantic skill graph taxonomies, verifications checks (trust score metrics), and provides clear, explainable summaries for hiring managers.

---

## Technical Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, TailwindCSS v4, Recharts, Framer Motion, Lucide Icons.
- **Backend:** FastAPI, Python 3.12, SQLite.
- **AI/Data Libraries:** spaCy, scikit-learn, NetworkX, Pandas, NumPy, Sentence Transformers.

---

## Directory Structure

```text
d:\THB/
├── backend/
│   ├── app/
│   │   ├── api/          # Route handlers (v1 candidates, jobs, analytics)
│   │   ├── core/         # Config, security, logging
│   │   ├── db/           # SQLite session & db seeds
│   │   ├── engines/      # AI engine modular stubs (NLP, Vector, Graph, Scoring)
│   │   ├── models/       # Database SQLAlchemy models
│   │   └── main.py       # FastAPI Entrypoint
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── app/          # Next.js 15 routing pages and styles
│   │   ├── components/   # Reusable UI widgets (Sidebar, Header, Skeletons)
│   │   ├── context/      # Theme context (Light/Dark mode)
│   │   ├── lib/          # API fetch wrapper & utils
│   │   └── types/        # TypeScript Interfaces
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## Getting Started

### Method 1: Using Docker Compose (Recommended)

1. Make sure you have Docker installed.
2. Run the following command in the root folder:
   ```bash
   docker compose up --build
   ```
3. Open `http://localhost:3000` in your browser.

---

### Method 2: Running Locally

#### 1. Setup Backend
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```
   *Note: On first startup, the database `thb_dev.db` is automatically created and seeded with candidate profiles, JDs, analysis stepper progress logs, and Recharts charts data.*

#### 2. Setup Frontend
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install packages:
   ```bash
   npm install
   ```
3. Launch Next.js dev server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000` in your browser.

---

## Deployment Instructions

To make TrustHireBrain accessible to anyone over the web, you can deploy the Backend and Frontend to cloud hosting platforms for free:

### 1. Deploy Backend (FastAPI) on Render
1. Go to [Render](https://render.com) and click **New > Web Service**.
2. Connect your GitHub repository.
3. Configure the settings:
   - **Name:** `thb-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Docker` (Render will automatically read `backend/Dockerfile` and compile the image)
   - **Instance Type:** `Free`
4. Click **Deploy Web Service**.
*Note: Render will build the container, create the SQLite database, and seed initial candidate data automatically on startup. Copy your public Web Service URL (e.g., `https://thb-backend.onrender.com`).*

### 2. Deploy Frontend (Next.js) on Vercel
1. Go to [Vercel](https://vercel.com) and click **Add New > Project**.
2. Connect your GitHub repository.
3. Configure the settings:
   - **Framework Preset:** `Next.js`
   - **Root Directory:** `frontend`
   - **Environment Variables:**
     - Add a new environment variable `NEXT_PUBLIC_API_URL` with the value of your Render URL + `/api/v1` (e.g., `https://thb-backend.onrender.com/api/v1`).
4. Click **Deploy**.
*Vercel will compile the pages statically and host it publicly. Share the link with anyone to review the platform!*
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

## 13. Research & Engineering Innovation

Instead of relying on standard wrapper APIs, THB leverages custom, modular pipeline components:
*   **Requirement Intelligence Engine:** Uses NetworkX to build a skill dependency graph, assigning weights based on context and priority tags.
*   **Skill Inference Engine:** Extends raw profile listings by scanning professional summaries semantically using spaCy tokenization.
*   **Career Evolution Analysis:** Models promotion paths and YOE ratios to weigh candidates who progress faster.
*   **Trust Validator:** Analyzes employment timelines, matching consistency checks against credentials to verify experience integrity.

---

## 14. Scale & Production Roadmap

```text
Hackathon Phase (Dev Mode) ──> Beta Testing ──> Production SaaS ──> Enterprise Integration
   [SQLite DB, Local Files]      [PostgreSQL,    [Docker Compose,   [Single Sign-On (SSO),
                                  Redis Cache]    Vector Indexes]    Enterprise Integrations]
```

*   **Dev Mode:** Light SQLite relational files for fast local execution.
*   **Production:** PostgreSQL backend with Redis caching clusters and pgvector indexes to accelerate candidate vector matches.

---

## 15. Engineering Decisions

We designed TrustHireBrain around clean engineering decisions rather than coincidental hacks:

| Decision | Why We Chose It |
| :--- | :--- |
| **Modular Engine Architecture** | Allows independent enhancement of NLP, vector, graph, and scoring engines. |
| **Explainable Scoring System** | Recruiters need clear evidence reports, not just black-box scores. |
| **Requirement Graph Mapping** | Captures structured relationship matrices between adjacent technologies. |
| **Confidence Estimation** | Quantifies matches to flag candidates with insufficient evidence. |
| **Next.js 15 + Turbopack** | Provides sub-second hot reloading speeds and modern Server Components structure. |

---

## 👥 The Team
*   **Gurleen** — Principal Software Architect & AI Engineer
    *   [GitHub Profile](https://github.com/Gurleen12star)

---

## 📄 License
This project is licensed under the MIT License.
