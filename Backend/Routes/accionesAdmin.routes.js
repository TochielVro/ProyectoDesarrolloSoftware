const express = require('express');
const router = express.Router();
const { banUser } = require('../Controllers/accionesAdmin.controller');
const { authenticate, isAdmin } = require('../Middlewares/authMiddleware');

// POST /api/acciones-admin/ban (banear usuario - solo admin)
router.post('/ban', authenticate, isAdmin, banUser);

module.exports = router;