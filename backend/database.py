import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, Column, Integer, String, JSON, Text
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv()

# Example Supabase PosgreSQL URL format: postgresql://user:password@hostname:5432/dbname
DB_URL = os.getenv("DATABASE_URL", "sqlite:///./local_test.db")

engine = create_engine(DB_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class AnalysisRecord(Base):
    __tablename__ = "analyses"
    
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, index=True)
    job_description_snippet = Column(Text)
    analysis = Column(JSON)

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
