const express = require("express");
const { buscarLibro, obtenerLibros } = require("../controllers/libros.controller");

const router = express.Router();

router.get("/buscar", buscarLibro);
router.get("/", obtenerLibros);

module.exports = router;
