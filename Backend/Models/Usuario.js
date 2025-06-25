const db = require('../Database/connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class Usuario {
    // Crear usuario con contraseña encriptada
    static async crear(nombre, email, contrasena) {
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);
        const [result] = await db.query(
            'INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)',
            [nombre, email, hashedPassword]
        );
        return result.insertId;
    }

    // Obtener usuario por email (para login)
    static async obtenerPorEmail(email) {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0];
    }

    // Actualizar nombre de usuario
    static async actualizarNombre(id, nuevoNombre) {
        await db.query('UPDATE usuarios SET nombre = ? WHERE id_usuario = ?', [nuevoNombre, id]);
    }

    // Eliminar cuenta
    static async eliminar(id) {
        await db.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
    }

    // Verificar contraseña (para login)
    static async verificarContrasena(email, contrasena) {
        const usuario = await this.obtenerPorEmail(email);
        if (!usuario) return false;
        return bcrypt.compare(contrasena, usuario.contrasena);
    }
}

module.exports = Usuario;