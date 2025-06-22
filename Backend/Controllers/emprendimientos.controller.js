const Emprendimiento = require('../Models/Emprendimiento');
const upload = require('../Middlewares/upload');

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

module.exports = {
  crearEmprendimiento,
  listarEmprendimientos
};