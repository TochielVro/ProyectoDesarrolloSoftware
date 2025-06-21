const db = require('../Database/connection');

class Usuario {
  // Crear un nuevo usuario
  static async crear(nombre, email, contrasena) {
    const [result] = await db.query(
      'INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)',
      [nombre, email, contrasena]
    );
    return result;
  }

  // Obtener usuario por email
  static async obtenerPorEmail(email) {
    const [rows] = await db.query(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  // Obtener usuario por ID
  static async obtenerPorId(id) {
    const [rows] = await db.query(
      'SELECT * FROM usuarios WHERE id_usuario = ?',
      [id]
    );
    return rows[0];
  }
}

module.exports = Usuario;