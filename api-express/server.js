const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/books', async (req, res) => {
  const { search } = req.query;
  const defaultBooks = ["El Quijote", "Cien años de soledad", "1984", "Orgullo y prejuicio"];

  try {
    if (search) {
      // Buscar libro específico
      const response = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(search)}&limit=12`);
      return res.json(response.data.docs.slice(0, 12));
    }

    // Devolver libros por defecto
    const booksData = [];
    for (const book of defaultBooks) {
      try {
        const response = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(book)}&limit=1`);
        if (response.data.docs[0]) {
          booksData.push(response.data.docs[0]);
        }
      } catch (error) {
        console.log(`Error con ${book}:`, error);
      }
    }
    res.json(booksData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books' });
  }
});

app.listen(3001, () => {
  console.log('Express API running on port 3001');
});