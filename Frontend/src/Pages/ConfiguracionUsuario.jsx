import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ConfiguracionUsuario = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ nombre: '', correo: '' });

  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoCorreo, setNuevoCorreo] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [contrasenaActual, setContrasenaActual] = useState('');

  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('success');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUsuario(user);
      setNuevoNombre(user.nombre);
      setNuevoCorreo(user.correo);
    }
  }, []);

const handleActualizar = async () => {
  try {
    const cambios = [];
    const body = {
      nombre: nuevoNombre,
      correo: nuevoCorreo,
      contrasena_actual: contrasenaActual,
      nueva_contrasena: nuevaContrasena,
    };

    if (nuevoNombre !== usuario.nombre) cambios.push('nombre');
    if (nuevoCorreo !== usuario.correo) cambios.push('correo electrónico');
    if (nuevaContrasena) cambios.push('contraseña');

    await api.put('/auth/configuracion', body);

    // Guardar nuevo user en localStorage
    const userActualizado = { ...usuario, nombre: nuevoNombre, correo: nuevoCorreo };
    localStorage.setItem('user', JSON.stringify(userActualizado));
    setUsuario(userActualizado);

    const mensajeFinal = cambios.length
      ? `${cambios.join(' y ')} actualizado${cambios.length > 1 ? 's' : ''} correctamente`
      : 'Datos actualizados';

    setMensaje(mensajeFinal);
    setTipoMensaje('success');

    // Limpiar campos
    setContrasenaActual('');
    setNuevaContrasena('');
  } catch (error) {
    setMensaje(error.response?.data?.error || 'Error al actualizar');
    setTipoMensaje('danger');
  }
};


//   const handleActualizar = async () => {
//     try {
//       const body = {
//         nombre: nuevoNombre,
//         correo: nuevoCorreo,
//         contrasena_actual: contrasenaActual,
//         nueva_contrasena: nuevaContrasena,
//       };

//       await api.put('/auth/configuracion', body);
//       setMensaje('Datos actualizados correctamente');
//       setTipoMensaje('success');

//       // Actualizar localStorage si se cambió el nombre
//       const userActualizado = { ...usuario, nombre: nuevoNombre, correo: nuevoCorreo };
//       localStorage.setItem('user', JSON.stringify(userActualizado));
//     } catch (error) {
//       setMensaje(error.response?.data?.error || 'Error al actualizar');
//       setTipoMensaje('danger');
//     }
//   };

// const handleEliminarCuenta = async () => {
//   const confirmacion = window.confirm(
//     '¿Estás seguro de que deseas eliminar tu cuenta?\n\n⚠️ Esto también eliminará todos tus emprendimientos de forma permanente.'
//   );

//   if (!confirmacion) return;

//   try {
//     await api.delete('/auth/eliminar-cuenta');
//     localStorage.clear();
//     navigate('/login');
//   } catch (error) {
//     setMensaje('Error al eliminar cuenta');
//     setTipoMensaje('danger');
//   }
// };

const handleEliminarCuenta = async () => {
  const resultado = await Swal.fire({
    title: '¿Eliminar cuenta?',
    text: 'Esto también eliminará todos tus emprendimientos. Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true,
  });

  if (resultado.isConfirmed) {
    try {
      await api.delete('/auth/eliminar-cuenta');
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      Swal.fire('Error', 'No se pudo eliminar la cuenta.', 'error');
    }
  }
};


// const handleEliminarCuenta = async () => {
//     if (!window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esto también eliminará todos tus emprendimientos.')) return;

//     try {
//       await api.delete('/auth/eliminar-cuenta');
//       localStorage.clear();
//       navigate('/login');
//     } catch (error) {
//       setMensaje('Error al eliminar cuenta');
//       setTipoMensaje('danger');
//     }
//   };

  return (
    <Container className="my-5" style={{ maxWidth: 600 }}>
      <h2>Configuración de Cuenta</h2>

      {mensaje && <Alert variant={tipoMensaje}>{mensaje}</Alert>}

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            value={nuevoCorreo}
            onChange={(e) => setNuevoCorreo(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña actual</Form.Label>
          <Form.Control
            type="password"
            value={contrasenaActual}
            onChange={(e) => setContrasenaActual(e.target.value)}
            placeholder="Necesaria si deseas cambiar la contraseña"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nueva contraseña (opcional)</Form.Label>
          <Form.Control
            type="password"
            value={nuevaContrasena}
            onChange={(e) => setNuevaContrasena(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleActualizar}>
          Guardar Cambios
        </Button>

        <hr />

        <Button variant="danger" onClick={handleEliminarCuenta}>
          Eliminar cuenta
        </Button>
      </Form>
    </Container>
  );
};

export default ConfiguracionUsuario;
