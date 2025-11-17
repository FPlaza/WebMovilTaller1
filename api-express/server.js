import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    host: 'localhost',
    port: 5434,
    user: 'myuser',
    password: 'mypassword',
    database: 'musicdb',
});

const libros = [
    "El Quijote", "Cien años de soledad", "1984", "Orgullo y prejuicio",
    "Matar a un ruiseñor", "El gran Gatsby", "Ulises", "Don Quijote",
    "Divina comedia", "Hamlet", "Crimen y castigo", "Lolita"
];

app.get('/guardar-libros', async (req, res) => {
    try {
        for (const nombre of libros) {

            const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(nombre)}&limit=1`;
            const respuesta = await fetch(url);
            const data = await respuesta.json();

            const libro = data.docs?.[0];
            if (!libro) continue;

            const titulo = libro.title;
            const autor = libro.author_name ? libro.author_name[0] : "Desconocido";
            const anio = libro.first_publish_year || null;

            const existe = await pool.query(
                "SELECT * FROM libros WHERE titulo = $1",
                [titulo]
            );
            if (existe.rows.length > 0) continue;

            await pool.query(
                "INSERT INTO libros (titulo, autor, anio) VALUES ($1, $2, $3)",
                [titulo, autor, anio]
            );
        }

        return res.json({ mensaje: "Libros guardados correctamente en PostgreSQL" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error guardando libros" });
    }
});

app.get('/libros', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM libros ORDER BY id");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error obteniendo libros");
    }
});

app.get('/libro/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query("SELECT * FROM libros WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: "Libro no encontrado" });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).send("Error buscando libro por ID");
    }
});

app.get('/libros-busqueda', async (req, res) => {
    const search = req.query.search || '';

    try {
        const result = await pool.query(
            "SELECT * FROM libros WHERE titulo ILIKE $1 OR autor ILIKE $1",
            [`%${search}%`]
        );

        res.json(result.rows);
    } catch (error) {
        console.error("ERROR EN BUSQUEDA:", error);
        res.status(500).json({ error: "Error realizando búsqueda" });
    }
});

app.listen(3001, () => {
    console.log("Servidor Express corriendo en http://localhost:3001");
});
