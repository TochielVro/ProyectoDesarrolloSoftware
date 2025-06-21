const express = require('express');
const router = express.Router();
const {
  crearReporte,
  listarReportes,
  resolverReporte
} = require('../Controllers/reportes.controller');

// POST /api/reportes (Crear reporte)
router.post('/', crearReporte);

// GET /api/reportes (Listar todos - solo admin)
router.get('/', listarReportes);

// PUT /api/reportes/:id/resolver (Resolver reporte - solo admin)
router.put('/:id/resolver', resolverReporte);

module.exports = router;