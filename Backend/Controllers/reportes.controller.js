const Reporte = require('../Models/Reporte');
const db = require('../Database/connection');

const crearReporte = async (req, res) => {
  try {
    const { id_emprendimiento, motivo } = req.body;
    const id_usuario_reportador = req.user.id; // Obtenemos el ID del usuario del token

    // Validaciones
    if (!id_emprendimiento || !motivo) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }
    if (motivo.length < 10) {
      return res.status(400).json({ error: "El motivo debe tener al menos 10 caracteres" });
    }

    // Verificar si el emprendimiento existe
    const [emprendimiento] = await db.query(
      "SELECT id_emprendimiento FROM emprendimientos WHERE id_emprendimiento = ?",
      [id_emprendimiento]
    );
    if (!emprendimiento) {
      return res.status(404).json({ error: "Emprendimiento no encontrado" });
    }

    const reporteId = await Reporte.crear(id_emprendimiento, id_usuario_reportador, motivo);
    res.status(201).json({ id_reporte: reporteId, mensaje: "Reporte creado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resolverReporte = async (req, res) => {
  try {
    const { id_reporte, estado } = req.body;
    const id_admin_resolutor = req.user.id;

    // Validar estado
    const estadosValidos = ["pendiente", "resuelto", "rechazado"];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ error: "Estado no válido" });
    }

    const reporteActualizado = await Reporte.actualizarEstado(
      id_reporte, 
      estado, 
      id_admin_resolutor
    );
    
    res.json(reporteActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarReportesPendientes = async (req, res) => {
  try {
    const reportes = await Reporte.listarPendientes();
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { crearReporte, resolverReporte, listarReportesPendientes };