import React, { useEffect, useState } from 'react';
import { Table, Button, Badge, Alert, Container } from 'react-bootstrap';
import api from '../../services/api';

const ReportesAdmin = () => {
  const [reportes, setReportes] = useState([]);
  const [error, setError] = useState('');

  const cargarReportes = async () => {
    try {
      const response = await api.get('/reportes');
      setReportes(response.data);
    } catch (err) {
      setError('Error al cargar reportes');
    }
  };

  const resolverReporte = async (id, estado) => {
    try {
      await api.patch('/reportes/resolver', { id_reporte: id, estado });
      cargarReportes(); // Recargar lista
    } catch (err) {
      setError('Error al resolver reporte');
    }
  };

  useEffect(() => {
    cargarReportes();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Reportes Pendientes</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Emprendimiento</th>
            <th>Reportador</th>
            <th>Motivo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reportes.map((reporte) => (
            <tr key={reporte.id_reporte}>
              <td>{reporte.id_reporte}</td>
              <td>{reporte.nombre_emprendimiento}</td>
              <td>{reporte.nombre_reportador}</td>
              <td>{reporte.motivo}</td>
              <td>
                <Badge bg="warning">{reporte.estado}</Badge>
              </td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => resolverReporte(reporte.id_reporte, 'resuelto')}
                  className="me-2"
                >
                  Resolver
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => resolverReporte(reporte.id_reporte, 'rechazado')}
                >
                  Rechazar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ReportesAdmin;