const express = require('express');
const router = express.Router();
const UsuarioController = require('../Controllers/usuarios.controller');

// GET /api/usuarios (Listar usuarios - solo admin)
router.get('/', UsuarioController.listarUsuarios);

// GET /api/usuarios/:id (Obtener perfil)
router.get('/:id', UsuarioController.obtenerPerfil);

module.exports = router;