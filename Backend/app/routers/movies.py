import os
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List

from ..database import get_db
from ..models import Movie
from ..schemas import MovieResponse
from ..api_consumer import fetch_movie_details 

router = APIRouter(prefix="/movies", tags=["Movies"])

PREDEFINED_MOVIE_IDS = [
    550, 680, 13, 27205, 155, 238, 496243, 769, 122,
    634649, 438631, 572802, 872585, 315162, 346698
]

@router.post("/populate", status_code=status.HTTP_201_CREATED, summary="Poblar la BD con 15 películas predefinidas")
async def populate_database(db: Session = Depends(get_db)):
    
    movies_added_titles = []
    movies_skipped_titles = []

    for movie_id in PREDEFINED_MOVIE_IDS:
        
        exists = db.query(Movie).filter(Movie.external_id == movie_id).first()
        if exists:
            movies_skipped_titles.append(exists.title)
            continue

        data = await fetch_movie_details(movie_id)
        
        if data is None:
            continue

        db_movie = Movie(
            external_id=data.get("id"),
            title=data.get("title"),
            release_date=data.get("release_date"),
            director=data.get("director"),
            genre=data.get("genre"),
            overview=data.get("overview"),
            rating=data.get("rating"),
            poster_url=data.get("poster_url")
        )
        db.add(db_movie)
        movies_added_titles.append(data.get("title"))

    db.commit()

    return {
        "message": f"Poblado completado. {len(movies_added_titles)} películas añadidas, {len(movies_skipped_titles)} ya existían.",
        "peliculas_añadidas": movies_added_titles,
        "peliculas_omitidas": movies_skipped_titles
    }

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