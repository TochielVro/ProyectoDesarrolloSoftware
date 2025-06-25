const Emprendimiento = require('../Models/Emprendimiento');
const upload = require('../Middlewares/upload');
const db = require('../Database/connection');
const fs = require('fs');

const crearEmprendimiento = async (req, res) => {
  try {
    const { id_usuario, nombre, descripcion, celular } = req.body;
    const imagenUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const emprendimiento = await Emprendimiento.crear(
      id_usuario,
      nombre,
      descripcion,
      imagenUrl,
      celular,
      req.body.facebook_url,
      req.body.instagram_url,
      req.body.otra_red_social
    );

    res.status(201).json(emprendimiento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarEmprendimientos = async (req, res) => {
  try {
    const emprendimientos = await Emprendimiento.listar();
    res.json(emprendimientos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Actualizar emprendimiento (nuevo)
const actualizarEmprendimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, celular } = req.body;
    const imagenUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    // Validar propiedad
    const [emprendimiento] = await db.query(
      'SELECT id_usuario FROM emprendimientos WHERE id_emprendimiento = ?',
      [id]
    );
    if (!emprendimiento) {
      return res.status(404).json({ error: 'Emprendimiento no encontrado' });
    }
    if (emprendimiento.id_usuario !== req.user.id && !req.user.esAdmin) {
      return res.status(403).json({ error: 'No tienes permiso para editar este emprendimiento' });
    }

    // Eliminar imagen anterior si se sube una nueva
    if (imagenUrl) {
      const [oldEmprendimiento] = await db.query(
        'SELECT imagen_url FROM emprendimientos WHERE id_emprendimiento = ?',
        [id]
      );
      if (oldEmprendimiento.imagen_url) {
        fs.unlinkSync(path.join(__dirname, '../Public', oldEmprendimiento.imagen_url));
      }
    }

    await Emprendimiento.actualizar(
      id,
      nombre,
      descripcion,
      imagenUrl,
      celular,
      req.body.facebook_url,
      req.body.instagram_url,
      req.body.otra_red_social
    );

    res.json({ mensaje: 'Emprendimiento actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar emprendimiento (nuevo)
const eliminarEmprendimiento = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar propiedad
    const [emprendimiento] = await db.query(
      'SELECT id_usuario, imagen_url FROM emprendimientos WHERE id_emprendimiento = ?',
      [id]
    );
    if (!emprendimiento) {
      return res.status(404).json({ error: 'Emprendimiento no encontrado' });
    }
    if (emprendimiento.id_usuario !== req.user.id && !req.user.esAdmin) {
      return res.status(403).json({ error: 'No tienes permiso para eliminar este emprendimiento' });
    }

    // Eliminar imagen asociada
    if (emprendimiento.imagen_url) {
      fs.unlinkSync(path.join(__dirname, '../Public', emprendimiento.imagen_url));
    }

    await Emprendimiento.eliminar(id);
    res.json({ mensaje: 'Emprendimiento eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearEmprendimiento,
  listarEmprendimientos,
  actualizarEmprendimiento,
  eliminarEmprendimiento
};