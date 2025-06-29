import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const Contacto = () => {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías enviar a backend o correo, por ahora simulamos:
    setEnviado(true);
    setNombre('');
    setMensaje('');
  };

  return (
    <Container className="my-5">
      <h2>Contacto</h2>
      <p>¿Tienes preguntas, sugerencias o necesitas ayuda? ¡Escríbenos!</p>

      {enviado && <Alert variant="success">Mensaje enviado con éxito.</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit">Enviar</Button>
      </Form>
    </Container>
  );
};

export default Contacto;
