from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class CandidateCreate(BaseModel):
    name: str
    email: str
    phone: str
    skills: str
    experience: int


class ScoreCreate(BaseModel):
    category: str
    score: int
    note: str | None = None