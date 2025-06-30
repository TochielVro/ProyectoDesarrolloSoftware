import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Spinner, Form, Button, Alert } from 'react-bootstrap';
import api from '../services/api';

const DetalleEmprendimiento = () => {
  const { id } = useParams();
  const [emprendimiento, setEmprendimiento] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [puntuacion, setPuntuacion] = useState(0);
  const [contenido, setContenido] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchComentarios = async () => {
    try {
      const res = await api.get(`/comentarios/${id}`);
      setComentarios(res.data);
    } catch (err) {
      console.error('Error al cargar comentarios', err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/emprendimientos/${id}`);
        setEmprendimiento(res.data);
        await fetchComentarios();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleEnviar = async () => {
  if (puntuacion < 1 || puntuacion > 5) {
    setMensaje('La puntuación debe estar entre 1 y 5');
    return;
  }

  if (contenido.trim().length < 5) {
    setMensaje('El comentario debe tener al menos 5 caracteres');
    return;
  }

  try {
    await api.post('/comentarios', {
      id_emprendimiento: id,
      contenido,
      puntuacion,
      // id_usuario: 1,
    });

    setMensaje('¡Comentario enviado!');
    setContenido('');
    setPuntuacion(0);
    fetchComentarios();
  } catch (err) {
    console.error('Error al enviar comentario', err.response?.data || err.message);
    setMensaje(err.response?.data?.error || 'Error al enviar comentario');
  }
};

if (loading) return <Spinner animation="border" />;

  return (
    <Container className="my-4">
      <Card>
        <Card.Img variant="top" src={`http://localhost:3001${emprendimiento.imagen_url}`} />
        <Card.Body>
          <Card.Title>{emprendimiento.nombre}</Card.Title>
          <Card.Text>{emprendimiento.descripcion}</Card.Text>

          <hr />
          <h5>Deja tu valoración</h5>
          <Form.Group>
            <Form.Label>Estrellas (1 a 5)</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="5"
              value={puntuacion}
              onChange={(e) => setPuntuacion(Number(e.target.value))}
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Comentario</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
            />
          </Form.Group>
          <Button className="mt-2" onClick={handleEnviar}>Enviar</Button>
          {mensaje && <Alert className="mt-3" variant="info">{mensaje}</Alert>}

          <hr />
          <h5>Comentarios</h5>
          {comentarios.length === 0 ? (
            <p className="text-muted">Aún no hay comentarios</p>
          ) : (
            comentarios.map((c, i) => (
              <div key={i} className="mb-2">
                <strong>⭐ {c.puntuacion}</strong> — {c.contenido}
              </div>
            ))
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DetalleEmprendimiento;