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
