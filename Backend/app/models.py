# app/models.py
from sqlalchemy import Column, Integer, String, Date, Float
from .database import Base

class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    external_id = Column(Integer, unique=True, index=True, nullable=False) 
    title = Column(String, index=True)
    release_date = Column(Date, nullable=True)
    director = Column(String, nullable=True)
    genre = Column(String, nullable=True)
    overview = Column(String, nullable=True)
    rating = Column(Float, nullable=True)
    poster_url = Column(String, nullable=True) 
