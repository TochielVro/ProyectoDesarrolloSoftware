import React, { useState } from 'react';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../Services/api';

const CrearEmprendimiento = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [celular, setCelular] = useState('');
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id_usuario', JSON.parse(localStorage.getItem('user')).id);
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('celular', celular);
    if (imagen) formData.append('imagen', imagen);

    try {
      await api.post('/emprendimientos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/mis-emprendimientos');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear emprendimiento');
    }
  };

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="mb-4">Crear Emprendimiento</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Emprendimiento</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Número de Contacto</Form.Label>
              <Form.Control
                type="tel"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Imagen (Opcional)</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setImagen(e.target.files[0])}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Crear Emprendimiento
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CrearEmprendimiento;