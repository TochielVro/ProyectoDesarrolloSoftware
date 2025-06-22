const Usuario = require('../Models/Usuario');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { nombre, email, contrasena } = req.body;
    
    // Validación básica
    if (!nombre || !email || !contrasena) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const usuarioExistente = await Usuario.obtenerPorEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    await Usuario.crear(nombre, email, contrasena);
    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, contrasena } = req.body;
    const usuario = await Usuario.obtenerPorEmail(email);

    if (!usuario || usuario.contrasena !== contrasena) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: usuario.id_usuario, esAdmin: usuario.es_admin },
      'secreto', // Cambia esto por una clave secreta segura
      { expiresIn: '1h' }
    );

    res.json({ 
      token,
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        esAdmin: usuario.es_admin
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };