const fetch = require("node-fetch");
const pool = require("../db");

async function buscarLibro(req, res) {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ error: "Debes enviar ?q=nombre" });
    }

    const apiURL = `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=1`;

    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        if (!data.docs || data.docs.length === 0) {
            return res.json({ mensaje: "No se encontraron libros" });
        }

        const libro = data.docs[0];

        await pool.query(
            `INSERT INTO libros (titulo, autor, anio)
             VALUES ($1, $2, $3)
             ON CONFLICT (titulo) DO NOTHING`,
            [
                libro.title,
                libro.author_name ? libro.author_name[0] : null,
                libro.first_publish_year || null
            ]
        );

        res.json({
            titulo: libro.title,
            autor: libro.author_name ? libro.author_name[0] : "N/A",
            anio: libro.first_publish_year || "Desconocido",
            mensaje: "Guardado en PostgreSQL"
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error buscando libro" });
    }
}

async function obtenerLibros(req, res) {
    const result = await pool.query("SELECT * FROM libros");
    res.json(result.rows);
}

module.exports = { buscarLibro, obtenerLibros };
