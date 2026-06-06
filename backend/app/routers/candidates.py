from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import SessionLocal
from app import models, schemas
from app.deps import get_current_user

router = APIRouter(prefix="/candidates", tags=["Candidates"])


# ---------------------------
# DB Dependency
# ---------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------------------------
# GET ALL CANDIDATES
# ---------------------------
@router.get("/all")
def get_all_candidates(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    candidates = db.query(models.Candidate).all()
    return candidates


# ---------------------------
# GET SINGLE CANDIDATE
# ---------------------------
@router.get("/{candidate_id}")
def get_candidate(
    candidate_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    candidate = db.query(models.Candidate).filter(
        models.Candidate.id == candidate_id
    ).first()

    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")

    return candidate


# ---------------------------
# CREATE CANDIDATE
# ---------------------------
@router.post("/")
def create_candidate(
    candidate: schemas.CandidateCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    new_candidate = models.Candidate(**candidate.dict())

    db.add(new_candidate)
    db.commit()
    db.refresh(new_candidate)

    return new_candidate


# ---------------------------
# UPDATE CANDIDATE
# ---------------------------
@router.put("/{candidate_id}")
def update_candidate(
    candidate_id: int,
    updated: schemas.CandidateUpdate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    candidate = db.query(models.Candidate).filter(
        models.Candidate.id == candidate_id
    ).first()

    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")

    for key, value in updated.dict(exclude_unset=True).items():
        setattr(candidate, key, value)

    db.commit()
    db.refresh(candidate)

    return candidate


# ---------------------------
# DELETE CANDIDATE (SAFE)
# ---------------------------
@router.delete("/{candidate_id}")
def delete_candidate(
    candidate_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    candidate = db.query(models.Candidate).filter(
        models.Candidate.id == candidate_id
    ).first()

    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")

    db.delete(candidate)
    db.commit()

    return {"message": "Candidate deleted successfully"}