# WebMovilTaller2

### Grupo 6

### Integrantes:
- Felipe Blanco Pizarro | 21.301.314-9
- Guillermo Bustamante Rodríguez | 20.460.106-2
- Maira Cortés Araya | 21.324.438-8
- Francisco Plaza Pizarro | 20.007.355-K

### Api
- Videojuegos (RAWG Video Games Database API)
- Música (TheAudioDB)
- Películas (OMDb API) o Reseñas (TMDB)
- Libros (Google API)

---
## Instrucciones de instalación:
1. Abrir carpeta api-nestjs
```
cd api-nestjs
```
2. Ejecutar:
```
docker-compose up -d
```
3. Instalar paquetes de Nest:
```
npm install
```
4. Correr backend de Nest:
```
npm run start:dev
```
5. Abrir nueva terminal y entrar a api-express
```
cd api-express
```
6. Instalar paquetes para Express:
```
npm install
```
7. Ejecutar consulta de libros.sql en gestionador de bases de datos o con comando si se tiene PostgreSQL instalado:
```
psql -U myuser -d musicdb -h localhost -p 5434 -f libros.sql
```
8. Correr backend de Express:
```
npm start
```
9. Abrir nueva terminal y entrar a Backend (api-python):
```
cd Backend
```
10. Crear nuevo entorno virtual de Python:
```
python -m venv venv
```
11. Activar entorno virtual de Python (venv):
```
.\venv\Scripts\activate
```
12. Instalar paquetes:
```
pip install fastapi uvicorn[standard] sqlalchemy psycopg2-binary python-dotenv httpx
```
13. Correr backend de Python:
```
uvicorn app.main:app --reload
```
14. Ejecutar endpoints que llenan la base de datos con datos de las APIs:
```
POST http://localhost:3000/musica/fetch-and-save
GET http://localhost:3001/guardar-libros
POST http://localhost:8000/movies/populate
```
15. Interactuar con la página ubicada en frontend-movil\app-movil\www\index.html

---
**Las secciones que cuentan con API externa son:
- Libros
- Películas
- Música

**Se utilizó como base de datos PostgreSQL. Los datos de acceso a la base de datos se encuentran en api-nest\docker-compose.yml.
**La aplicación (apk) se generó con con la versión que obtenía los datos directamente desde la API en el frontend. De esta forma se evita la dependencia de las bases de datos locales y servidores locales generados para el Taller 2.