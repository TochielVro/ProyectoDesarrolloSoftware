import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import { getEmprendimientos } from '../Services/api';

const Home = () => {
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEmprendimientos();
        setEmprendimientos(response.data);
      } catch (error) {
        console.error('Error fetching emprendimientos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Emprendimientos Destacados</h2>
      <Row>
        {emprendimientos.map((emprendimiento) => (
          <Col key={emprendimiento.id_emprendimiento} md={4} className="mb-4">
            <Card>
              {emprendimiento.imagen_url && (
                <Card.Img 
                  variant="top" 
                  src={`http://localhost:3001${emprendimiento.imagen_url}`} 
                  alt={emprendimiento.nombre}
                />
              )}
              <Card.Body>
                <Card.Title>{emprendimiento.nombre}</Card.Title>
                <Card.Text>{emprendimiento.descripcion}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;