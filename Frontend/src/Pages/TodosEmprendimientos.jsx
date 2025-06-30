import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import api from '../Services/api';
import { useNavigate } from 'react-router-dom';

const TodosEmprendimientos = () => {
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/emprendimientos');
        setEmprendimientos(res.data);
      } catch (err) {
        console.error('Error al cargar emprendimientos', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Container className="text-center my-5"><Spinner animation="border" /></Container>;

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Todos los Emprendimientos</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {emprendimientos.map((e) => (
          <Col key={e.id_emprendimiento}>
            <Card className="h-100">
              <Card.Img variant="top" src={`http://localhost:3001${e.imagen_url}`} />
              <Card.Body>
                <Card.Title>{e.nombre}</Card.Title>
                <Card.Text>{e.descripcion.substring(0, 100)}...</Card.Text>
                <button className="btn btn-outline-primary btn-sm" onClick={() => navigate(`/emprendimiento/${e.id_emprendimiento}`)}>
                  Ver más
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TodosEmprendimientos;
