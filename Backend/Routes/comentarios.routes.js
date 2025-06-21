const express = require('express');
const router = express.Router();
const {
  crearComentario,
  listarComentarios
} = require('../Controllers/comentarios.controller');

// POST /api/comentarios (Crear comentario)
router.post('/', crearComentario);

// GET /api/comentarios/:emprendimiento_id (Listar por emprendimiento)
router.get('/:emprendimiento_id', listarComentarios);

module.exports = router;