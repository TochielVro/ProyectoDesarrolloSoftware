const db = require('../Database/connection');

class Emprendimiento {
  // Crear un emprendimiento
  static async crear(id_usuario, nombre, descripcion, celular) {
    const [result] = await db.query(
      'INSERT INTO emprendimientos (id_usuario, nombre, descripcion, celular) VALUES (?, ?, ?, ?)',
      [id_usuario, nombre, descripcion, celular]
    );
    return result;
  }

  // Obtener todos los emprendimientos
  static async obtenerTodos() {
    const [rows] = await db.query(
      'SELECT * FROM emprendimientos WHERE esta_activo = TRUE'
    );
    return rows;
  }

  // Obtener emprendimiento por ID
  static async obtenerPorId(id) {
    const [rows] = await db.query(
      'SELECT * FROM emprendimientos WHERE id_emprendimiento = ?',
      [id]
    );
    return rows[0];
  }

  // Eliminar emprendimiento (marcar como inactivo)
  static async eliminar(id) {
    const [result] = await db.query(
      'UPDATE emprendimientos SET esta_activo = FALSE WHERE id_emprendimiento = ?',
      [id]
    );
    return result;
  }
}

module.exports = Emprendimiento;