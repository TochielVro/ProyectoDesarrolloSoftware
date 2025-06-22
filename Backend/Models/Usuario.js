const db = require('../Database/connection');

class Usuario {
    static async crear(nombre, email, contrasena) {
        const [result] = await db.query(
            'INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)',
            [nombre, email, contrasena]
        );
        return result.insertId;
    }

    static async obtenerPorEmail(email) {
        const [rows] = await db.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );
        return rows[0];
    }

    static async obtenerPorId(id) {
        const [rows] = await db.query(
            'SELECT * FROM usuarios WHERE id_usuario = ?',
            [id]
        );
        return rows[0];
    }

    static async marcarComoAdmin(id) {
        await db.query(
            'UPDATE usuarios SET es_admin = TRUE WHERE id_usuario = ?',
            [id]
        );
    }
}

module.exports = Usuario;