from fastapi import FastAPI
from .database import engine, Base
from .routers import movies
from .models import Movie 
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Movie Importer API")

app.include_router(movies.router)

@app.get("/")
def read_root():
    return {"message": "Bienvenido a la Movie Importer API"}