const ComentarioModel = require('../Models/Comentario');

// Agregar comentario
const addComentario = async (req, res) => {
  try {
    const { id_emprendimiento, id_usuario, contenido, puntuacion } = req.body;
    const comentario = await ComentarioModel.create({ id_emprendimiento, id_usuario, contenido, puntuacion });
    res.status(201).json(comentario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addComentario };const Comentario = require('../Models/Comentario');

// Añadir comentario
const crearComentario = async (req, res) => {
  const { id_emprendimiento, id_usuario, contenido, puntuacion } = req.body;
  
  try {
    // Validar puntuación (1-5)
    if (puntuacion < 1 || puntuacion > 5) {
      return res.status(400).json({ error: 'La puntuación debe ser entre 1 y 5' });
    }

    await Comentario.crear(id_emprendimiento, id_usuario, contenido, puntuacion);
    res.status(201).json({ mensaje: 'Comentario añadido' });
  } catch (err) {
    res.status(500).json({ error: 'Error al añadir comentario' });
  }
};

// Listar comentarios de un emprendimiento
const listarComentarios = async (req, res) => {
  try {
    const comentarios = await Comentario.obtenerPorEmprendimiento(req.params.id);
    res.json(comentarios);
  } catch (err) {
    res.status(500).json({ error: 'Error al listar comentarios' });
  }
};

module.exports = {
  crearComentario,
  listarComentarios,
};