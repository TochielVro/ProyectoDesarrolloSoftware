import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../Services/api';

const MisEmprendimientos = () => {
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmprendimientos = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        // Opción 1: Usando endpoint específico
        const response = await api.get(`/emprendimientos/usuario/${user.id}`);
        setEmprendimientos(response.data);
        
        // Opción 2: Filtrar en frontend (si el endpoint no existe)
        // const allResponse = await api.get('/emprendimientos');
        // setEmprendimientos(allResponse.data.filter(emp => emp.id_usuario === user.id));
      } catch (err) {
        setError(err.response?.data?.error || 'Error al cargar emprendimientos');
      } finally {
        setLoading(false);
      }
    };

    fetchEmprendimientos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/emprendimientos/${id}`);
      setEmprendimientos(emprendimientos.filter(emp => emp.id_emprendimiento !== id));
    } catch (err) {
      setError('Error al eliminar emprendimiento');
    }
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Mis Emprendimientos</h2>
        <Button as={Link} to="/crear-emprendimiento" variant="primary">
          + Nuevo Emprendimiento
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {emprendimientos.length === 0 ? (
        <Card className="text-center p-4">
          <p>Aún no tienes emprendimientos registrados</p>
          <Button as={Link} to="/crear-emprendimiento" variant="primary">
            Crear mi primer emprendimiento
          </Button>
        </Card>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {emprendimientos.map((emp) => (
            <Col key={emp.id_emprendimiento}>
              <Card className="h-100">
                {emp.imagen_url && (
                  <Card.Img 
                    variant="top" 
                    src={`http://localhost:3001${emp.imagen_url}`} 
                    alt={emp.nombre}
                  />
                )}
                <Card.Body>
                  <Card.Title>{emp.nombre}</Card.Title>
                  <Card.Text>{emp.descripcion.substring(0, 100)}...</Card.Text>
                </Card.Body>
                <Card.Footer className="bg-white">
                  <div className="d-flex justify-content-between">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => navigate(`/editar-emprendimiento/${emp.id_emprendimiento}`)}
                    >
                      Editar
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleDelete(emp.id_emprendimiento)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MisEmprendimientos;