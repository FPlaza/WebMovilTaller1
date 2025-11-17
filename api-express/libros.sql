CREATE TABLE IF NOT EXISTS libros (
    id SERIAL PRIMARY KEY,
    titulo TEXT UNIQUE,
    autor TEXT,
    anio INT
);
