# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from app.core.config import settings
from app.api.v1.endpoints import dashboard, jobs
from app.db.session import engine, Base, SessionLocal
from app.db.seed import seed_db
from app.models.database import Candidate

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(dashboard.router, prefix=f"{settings.API_V1_STR}/dashboard", tags=["dashboard"])
app.include_router(dashboard.router, prefix=f"{settings.API_V1_STR}", tags=["candidates"])
app.include_router(jobs.router, prefix=f"{settings.API_V1_STR}/jobs", tags=["jobs"])

@app.on_event("startup")
def on_startup():
    # Automatically create tables and seed if database is new or empty
    db_file = "thb_dev.db"
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    # Check if database has candidates, if not, seed it
    db = SessionLocal()
    try:
        candidate_count = db.query(Candidate).count()
        if candidate_count == 0:
            print("No data found in database. Seeding initial data...")
            seed_db()
    except Exception as e:
        print(f"Error checking/seeding database: {e}")
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to the TrustHireBrain (THB) AI Hiring Intelligence Platform Backend!"}
