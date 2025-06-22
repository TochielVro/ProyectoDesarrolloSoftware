const express = require('express');
const router = express.Router();
const { verificarToken } = require('../Middlewares/auth');
const upload = require('../Middlewares/upload');
const {
  crearEmprendimiento,
  listarEmprendimientos
} = require('../Controllers/emprendimientos.controller');

// GET /api/emprendimientos (público)
router.get('/', listarEmprendimientos);

// POST /api/emprendimientos (protegido)
router.post('/', verificarToken, upload.single('imagen'), crearEmprendimiento);

module.exports = router;