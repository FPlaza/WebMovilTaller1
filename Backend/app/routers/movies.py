import os
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime

from ..database import get_db
from ..models import Movie
from ..schemas import MovieResponse
from ..api_consumer import fetch_movie_details 

router = APIRouter(prefix="/movies", tags=["Movies"])

@router.post("/import/{movie_id}", response_model=MovieResponse, status_code=status.HTTP_201_CREATED)
async def import_and_save_movie(movie_id: int, db: Session = Depends(get_db)):
    
    if db.query(Movie).filter(Movie.external_id == movie_id).first():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Película ya existe.")

    data = await fetch_movie_details(movie_id)
    
    if not data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Película no encontrada en API externa.")

    db_movie = Movie(
        external_id=data.get("id"),
        title=data.get("title"),
        release_date=datetime.strptime(data["release_date"], '%Y-%m-%d').date() if data.get("release_date") else None,
        director=data.get("director"),
        genre=data.get("genre"),
        overview=data.get("overview"),
        rating=data.get("vote_average"),
        poster_url=data.get("poster_url")
    )

    db.add(db_movie)
    db.commit()
    db.refresh(db_movie)

    return db_movie


@router.get("/", response_model=List[MovieResponse])
def read_all_movies(db: Session = Depends(get_db)):
    movies = db.query(Movie).all()
    return movies    