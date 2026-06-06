from sqlalchemy import Column, Integer, String, ForeignKey
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String, unique=True)
    hashed_password = Column(String)
    role = Column(String, default="reviewer")


class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    phone = Column(String)
    skills = Column(String)
    experience = Column(Integer)
    status = Column(String, default="new")


class Score(Base):
    __tablename__ = "scores"

    id = Column(Integer, primary_key=True)
    candidate_id = Column(Integer)
    reviewer_id = Column(Integer)
    category = Column(String)
    score = Column(Integer)
    note = Column(String)