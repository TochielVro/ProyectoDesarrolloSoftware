const express = require('express');
const router = express.Router();
const { verificarToken } = require('../Middlewares/auth');
const { crearComentario } = require('../Controllers/comentarios.controller');

// POST /api/comentarios (protegido)
router.post('/', verificarToken, crearComentario);

module.exports = router;