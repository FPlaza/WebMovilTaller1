from pydantic import BaseModel
from datetime import date
from typing import Optional

class MovieBase(BaseModel):
    external_id: int
    title: str
    release_date: Optional[date] = None
    director: Optional[str] = None
    genre: Optional[str] = None
    overview: Optional[str] = None
    rating: Optional[float] = None
    poster_url: Optional[str] = None

class MovieResponse(MovieBase):
    id: int

    class Config:
        orm_mode = True