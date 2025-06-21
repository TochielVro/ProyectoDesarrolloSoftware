const express = require('express');
const router = express.Router();
const {
  crearEmprendimiento,
  listarEmprendimientos,
  obtenerEmprendimiento,
  eliminarEmprendimiento
} = require('../Controllers/emprendimientos.controller');

// GET /api/emprendimientos (Listar todos)
router.get('/', listarEmprendimientos);

// GET /api/emprendimientos/:id (Obtener uno)
router.get('/:id', obtenerEmprendimiento);

// POST /api/emprendimientos (Crear)
router.post('/', crearEmprendimiento);

// DELETE /api/emprendimientos/:id (Eliminar)
router.delete('/:id', eliminarEmprendimiento);

module.exports = router;