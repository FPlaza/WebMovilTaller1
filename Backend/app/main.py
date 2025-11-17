from fastapi import FastAPI
from .database import engine, Base
from .routers import movies
from .models import Movie
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Movie Importer API")

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(movies.router)

@app.get("/")
def read_root():
    return {"message": "Bienvenido a la Movie Importer API"}