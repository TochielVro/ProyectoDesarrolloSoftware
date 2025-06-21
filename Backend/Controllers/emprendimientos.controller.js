const Emprendimiento = require('../Models/Emprendimiento');

// Crear emprendimiento
const crearEmprendimiento = async (req, res) => {
  const { id_usuario, nombre, descripcion, celular } = req.body;
  
  try {
    const result = await Emprendimiento.crear(id_usuario, nombre, descripcion, celular);
    res.status(201).json({ 
      mensaje: 'Emprendimiento creado',
      id: result.insertId 
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear emprendimiento' });
  }
};

// Listar todos los emprendimientos
const listarEmprendimientos = async (req, res) => {
  try {
    const emprendimientos = await Emprendimiento.obtenerTodos();
    res.json(emprendimientos);
  } catch (err) {
    res.status(500).json({ error: 'Error al listar emprendimientos' });
  }
};

// Obtener un emprendimiento por ID
const obtenerEmprendimiento = async (req, res) => {
  try {
    const emprendimiento = await Emprendimiento.obtenerPorId(req.params.id);
    if (!emprendimiento) {
      return res.status(404).json({ error: 'Emprendimiento no encontrado' });
    }
    res.json(emprendimiento);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener emprendimiento' });
  }
};

// Eliminar emprendimiento (solo admin o dueño)
const eliminarEmprendimiento = async (req, res) => {
  try {
    const result = await Emprendimiento.eliminar(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Emprendimiento no encontrado' });
    }
    res.json({ mensaje: 'Emprendimiento eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar emprendimiento' });
  }
};

module.exports = {
  crearEmprendimiento,
  listarEmprendimientos,
  obtenerEmprendimiento,
  eliminarEmprendimiento,
};