const Usuario = require('../Models/Usuario');

// Registro de usuario
const register = async (req, res) => {
  const { nombre, email, contrasena } = req.body;
  
  try {
    // Validación básica (puedes añadir más)
    if (!nombre || !email || !contrasena) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    await Usuario.crearUsuario(nombre, email, contrasena);
    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Login de usuario
const login = async (req, res) => {
  const { email, contrasena } = req.body;
  try {
    const usuario = await Usuario.obtenerPorEmail(email);
    
    if (!usuario || usuario.contrasena !== contrasena) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    res.json({ 
      mensaje: 'Login exitoso',
      usuario: { id: usuario.id_usuario, nombre: usuario.nombre, esAdmin: usuario.es_admin }
    });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = { register, login };