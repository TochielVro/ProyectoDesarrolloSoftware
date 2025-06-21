const Reporte = require('../Models/Reporte');

// Crear reporte
const crearReporte = async (req, res) => {
  const { id_emprendimiento, id_usuario_reportador, motivo } = req.body;
  
  try {
    await Reporte.crear(id_emprendimiento, id_usuario_reportador, motivo);
    res.status(201).json({ mensaje: 'Reporte enviado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear reporte' });
  }
};

// Listar reportes (solo admin)
const listarReportes = async (req, res) => {
  try {
    const reportes = await Reporte.obtenerTodos();
    res.json(reportes);
  } catch (err) {
    res.status(500).json({ error: 'Error al listar reportes' });
  }
};

// Resolver reporte (solo admin)
const resolverReporte = async (req, res) => {
  const { id } = req.params;
  const { estado, id_admin_resolutor } = req.body;
  
  try {
    await Reporte.actualizarEstado(id, estado, id_admin_resolutor);
    res.json({ mensaje: 'Reporte actualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al resolver reporte' });
  }
};

module.exports = {
  crearReporte,
  listarReportes,
  resolverReporte,
};