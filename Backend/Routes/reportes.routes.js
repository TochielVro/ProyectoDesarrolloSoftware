const express = require('express');
const router = express.Router();
const { verificarToken, esAdmin } = require('../Middlewares/auth');
const {
  crearReporte,
  resolverReporte
} = require('../Controllers/reportes.controller');

// POST /api/reportes (protegido)
router.post('/', verificarToken, crearReporte);

// PATCH /api/reportes/resolver (solo admin)
router.patch('/resolver', verificarToken, esAdmin, resolverReporte);

module.exports = router;