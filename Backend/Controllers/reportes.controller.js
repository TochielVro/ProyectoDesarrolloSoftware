const Reporte = require('../Models/Reporte');

const crearReporte = async (req, res) => {
  try {
    const { id_emprendimiento, id_usuario_reportador, motivo } = req.body;
    
    const reporte = await Reporte.crear(
      id_emprendimiento,
      id_usuario_reportador,
      motivo
    );

    res.status(201).json(reporte);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resolverReporte = async (req, res) => {
  try {
    const { id_reporte, estado, id_admin_resolutor } = req.body;
    
    const reporte = await Reporte.actualizarEstado(
      id_reporte,
      estado,
      id_admin_resolutor
    );

    res.json(reporte);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { crearReporte, resolverReporte };