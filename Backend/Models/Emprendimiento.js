const db = require('../Database/connection');

class Emprendimiento {
    static async crear(id_usuario, nombre, descripcion, imagen_url, celular, facebook_url, instagram_url, otra_red_social) {
        const [result] = await db.query(
            `INSERT INTO emprendimientos 
            (id_usuario, nombre, descripcion, imagen_url, celular, facebook_url, instagram_url, otra_red_social) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [id_usuario, nombre, descripcion, imagen_url, celular, facebook_url, instagram_url, otra_red_social]
        );
        return result.insertId;
    }

    static async listar() {
        const [rows] = await db.query(
            'SELECT * FROM emprendimientos WHERE esta_activo = TRUE'
        );
        return rows;
    }

    static async obtenerPorId(id) {
        const [rows] = await db.query(
            'SELECT * FROM emprendimientos WHERE id_emprendimiento = ?',
            [id]
        );
        return rows[0];
    }

    static async desactivar(id) {
        await db.query(
            'UPDATE emprendimientos SET esta_activo = FALSE WHERE id_emprendimiento = ?',
            [id]
        );
    }
        static async actualizar(
        id,
        nombre,
        descripcion,
        imagen_url,
        celular,
        facebook_url,
        instagram_url,
        otra_red_social
    ) {
        await db.query(
            `UPDATE emprendimientos SET
                nombre = ?,
                descripcion = ?,
                imagen_url = COALESCE(?, imagen_url),
                celular = ?,
                facebook_url = ?,
                instagram_url = ?,
                otra_red_social = ?
            WHERE id_emprendimiento = ?`,
            [nombre, descripcion, imagen_url, celular, facebook_url, instagram_url, otra_red_social, id]
        );
    }

    static async eliminar(id) {
        await db.query(
            'DELETE FROM emprendimientos WHERE id_emprendimiento = ?',
            [id]
        );
    }
}

module.exports = Emprendimiento;