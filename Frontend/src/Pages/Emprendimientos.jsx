import React, { useEffect, useState } from 'react';
import { 
  Container, Row, Col, Card, 
  Spinner, Button, Pagination, Alert
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';
import api from '../services/api';
import '../index.css';

const Emprendimientos = () => {
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/emprendimientos');
        const totalItems = response.data.length;
        setTotalPages(Math.ceil(totalItems / itemsPerPage));
        
        const paginated = response.data.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );
        setEmprendimientos(paginated);
      } catch (err) {
        setError('Error al cargar emprendimientos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">Todos los Emprendimientos</h2>
      <p className="text-center text-muted mb-4">
        Explora nuestra comunidad de emprendedores
      </p>

      <Row xs={1} md={2} lg={3} className="g-4">
        {emprendimientos.map((emprendimiento) => (
          <Col key={emprendimiento.id_emprendimiento}>
            <Card className="card-custom h-100">
              <Card.Img
                variant="top"
                src={`http://localhost:3001${emprendimiento.imagen_url}`}
                className="card-img-custom"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{emprendimiento.nombre}</Card.Title>
                <Card.Text className="flex-grow-1">
                  {emprendimiento.descripcion.substring(0, 100)}...
                </Card.Text>
                <Button
                  variant="outline-primary"
                  onClick={() => navigate(`/emprendimiento/${emprendimiento.id_emprendimiento}`)}
                >
                  Ver más
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.Prev 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(p => p - 1)} 
            />
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage(p => p + 1)} 
            />
          </Pagination>
        </div>
      )}
    </Container>
  );
};

export default Emprendimientos;