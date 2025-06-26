const express = require('express');
const router = express.Router();
const { verificarToken, esAdmin } = require('../Middlewares/auth');
const {
  crearReporte,
  resolverReporte,
  listarReportesPendientes
} = require('../Controllers/reportes.controller');
const { obtenerMasValorados, obtenerUltimo } = require('../Models/Emprendimiento');

// POST /api/reportes (cualquier usuario autenticado)
router.post('/', verificarToken, crearReporte);

// GET /api/reportes (solo admin - lista reportes pendientes)
router.get('/', verificarToken, esAdmin, listarReportesPendientes);

// PATCH /api/reportes/resolver (solo admin)
router.patch('/resolver', verificarToken, esAdmin, resolverReporte);


// Endpoints para obtener los emprendimientos más valorados
router.get('/mas-valorados', obtenerMasValorados);


// Endpoints para obtener el ultimo emprendimiento creado y por usuario
router.get('/ultimo', obtenerUltimo);

module.exports = router;