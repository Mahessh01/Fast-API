from fastapi import FastAPI
from app.database import Base, engine

from app.routers import auth, candidates, scores

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router)
app.include_router(candidates.router)
app.include_router(scores.router)


@app.get("/")
def home():
    return {"msg": "Backend running"}