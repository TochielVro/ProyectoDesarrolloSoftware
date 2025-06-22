const Comentario = require('../Models/Comentario');

const crearComentario = async (req, res) => {
  try {
    const { id_emprendimiento, id_usuario, contenido, puntuacion } = req.body;
    
    if (puntuacion < 1 || puntuacion > 5) {
      return res.status(400).json({ error: 'La puntuación debe ser entre 1 y 5' });
    }

    const comentario = await Comentario.crear(
      id_emprendimiento,
      id_usuario,
      contenido,
      puntuacion
    );

    res.status(201).json(comentario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { crearComentario };