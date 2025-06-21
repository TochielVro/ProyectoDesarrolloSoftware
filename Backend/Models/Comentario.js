const db = require('../Database/connection');

class Comentario {
  // Crear un comentario
  static async crear(id_emprendimiento, id_usuario, contenido, puntuacion) {
    const [result] = await db.query(
      'INSERT INTO comentarios (id_emprendimiento, id_usuario, contenido, puntuacion) VALUES (?, ?, ?, ?)',
      [id_emprendimiento, id_usuario, contenido, puntuacion]
    );
    return result;
  }

  // Obtener comentarios por emprendimiento
  static async obtenerPorEmprendimiento(id_emprendimiento) {
    const [rows] = await db.query(
      `SELECT c.*, u.nombre AS nombre_usuario 
       FROM comentarios c
       JOIN usuarios u ON c.id_usuario = u.id_usuario
       WHERE c.id_emprendimiento = ?`,
      [id_emprendimiento]
    );
    return rows;
  }
}

module.exports = Comentario;