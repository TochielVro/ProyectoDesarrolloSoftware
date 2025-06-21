const db = require('../Database/connection');

class Reporte {
  // Crear un reporte
  static async crear(id_emprendimiento, id_usuario_reportador, motivo) {
    const [result] = await db.query(
      'INSERT INTO reportes (id_emprendimiento, id_usuario_reportador, motivo) VALUES (?, ?, ?)',
      [id_emprendimiento, id_usuario_reportador, motivo]
    );
    return result;
  }

  // Obtener todos los reportes
  static async obtenerTodos() {
    const [rows] = await db.query(
      `SELECT r.*, e.nombre AS nombre_emprendimiento, u.nombre AS nombre_reportador
       FROM reportes r
       JOIN emprendimientos e ON r.id_emprendimiento = e.id_emprendimiento
       JOIN usuarios u ON r.id_usuario_reportador = u.id_usuario`
    );
    return rows;
  }

  // Actualizar estado de un reporte
  static async actualizarEstado(id_reporte, estado, id_admin_resolutor) {
    const [result] = await db.query(
      `UPDATE reportes 
       SET estado = ?, id_admin_resolutor = ?, fecha_resolucion = CURRENT_TIMESTAMP
       WHERE id_reporte = ?`,
      [estado, id_admin_resolutor, id_reporte]
    );
    return result;
  }
}

module.exports = Reporte;