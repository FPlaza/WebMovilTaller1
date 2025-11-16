import os
import httpx
from typing import Optional, Dict, Any

MOVIE_API_KEY = os.getenv("MOVIE_API_KEY")
MOVIE_API_BASE_URL = os.getenv("MOVIE_API_BASE_URL")

IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

async def fetch_movie_details(movie_id: int) -> Optional[Dict[str, Any]]:
    
    if not MOVIE_API_KEY or not MOVIE_API_BASE_URL:
        return None

    details_url = f"{MOVIE_API_BASE_URL}{movie_id}"
    credits_url = f"{MOVIE_API_BASE_URL}{movie_id}/credits"
    
    params = {
        'api_key': MOVIE_API_KEY,
        'language': 'es-ES'
    }

    async with httpx.AsyncClient() as client:
        try:
            details_response = await client.get(details_url, params=params)
            
            if details_response.status_code == 404:
                return None
            details_response.raise_for_status()
            
            data = details_response.json()

            credits_response = await client.get(credits_url, params=params)
            credits_response.raise_for_status()
            
            credits_data = credits_response.json()

            genres = data.get('genres', [])
            genre_names = [g['name'] for g in genres]
            
            poster_path = data.get('poster_path')
            full_poster_url = f"{IMAGE_BASE_URL}{poster_path}" if poster_path else None

            director_name = None
            crew = credits_data.get('crew', [])
            
            for person in crew:
                if person.get('job') == 'Director':
                    director_name = person.get('name')
                    break

            processed_data = {
                "id": data.get("id"),
                "title": data.get("title"),
                "overview": data.get("overview"),
                "release_date": data.get("release_date"),
                "vote_average": data.get("vote_average"),
                "poster_url": full_poster_url,
                "genre": ", ".join(genre_names),
                "director": director_name
            }

            return processed_data

        except httpx.RequestError as exc:
            print(f"Error al llamar a la API de TMDB: {exc}")
            return None