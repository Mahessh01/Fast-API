from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app import models, schemas
from app.deps import get_current_user

router = APIRouter(prefix="/scores", tags=["scores"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/{candidate_id}")
def add_score(candidate_id: int,
              score: schemas.ScoreCreate,
              db: Session = Depends(get_db),
              user=Depends(get_current_user)):

    new = models.Score(
        candidate_id=candidate_id,
        reviewer_id=user["user_id"],
        category=score.category,
        score=score.score,
        note=score.note
    )

    db.add(new)
    db.commit()
    return new