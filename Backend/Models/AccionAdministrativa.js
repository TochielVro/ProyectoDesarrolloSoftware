const db = require('../Database/connection');

class AccionAdministrativa {
  static async registrar(id_admin, id_usuario_afectado, tipo_accion, descripcion) {
    const [result] = await db.query(
      'INSERT INTO acciones_administrativas (id_admin, id_usuario_afectado, tipo_accion, descripcion) VALUES (?, ?, ?, ?)',
      [id_admin, id_usuario_afectado, tipo_accion, descripcion]
    );
    return result;
  }
}

module.exports = AccionAdministrativa;