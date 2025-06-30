// Importación de React y hooks para estado y efecto secundario
import React, { useState, useEffect } from 'react';
// Importación de componentes de Bootstrap para diseño y funcionalidad
import { Card, Container, Row, Col, Button, Spinner, Alert, Modal } from 'react-bootstrap';
// Importación de componentes de React Router para navegación y enlaces
import { Link, useNavigate } from 'react-router-dom';
// Cliente API personalizado para llamadas al backend
import api from '../services/api';

// Definición del componente principal
const MisEmprendimientos = () => {
  // Estado para almacenar la lista de emprendimientos
  const [emprendimientos, setEmprendimientos] = useState([]);
  // Estado para controlar si los datos están cargando
  const [loading, setLoading] = useState(true);
  // Estado para manejar mensajes de error
  const [error, setError] = useState('');
  // Estado para almacenar el emprendimiento seleccionado para eliminar (si hay alguno)
  const [emprendimientoAEliminar, setEmprendimientoAEliminar] = useState(null);
  // Hook para redireccionar a otras páginas
  const navigate = useNavigate();

  // Hook que se ejecuta al cargar el componente
  useEffect(() => {
    // Función asíncrona para obtener los emprendimientos del usuario actual
    const fetchEmprendimientos = async () => {
      try {
        // Obtener usuario desde localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        // Llamada al backend para obtener emprendimientos del usuario
        const response = await api.get(`/emprendimientos/usuario/${user.id}`);
        // Guardar datos obtenidos en el estado
        setEmprendimientos(response.data);
      } catch (err) {
        // Capturar y mostrar error si ocurre
        setError(err.response?.data?.error || 'Error al cargar emprendimientos');
      } finally {
        // Ocultar el spinner
        setLoading(false);
      }
    };

    // Llamar a la función cuando se monta el componente
    fetchEmprendimientos();
  }, []);

  // Función que se ejecuta cuando el usuario confirma la eliminación
  const handleDelete = async () => {
    try {
      // Llamar al endpoint DELETE del backend con el ID del emprendimiento
      await api.delete(`/emprendimientos/${emprendimientoAEliminar.id_emprendimiento}`);
      // Actualizar el estado eliminando el emprendimiento de la lista
      setEmprendimientos(
        emprendimientos.filter(emp => emp.id_emprendimiento !== emprendimientoAEliminar.id_emprendimiento)
      );
      // Cerrar el modal
      setEmprendimientoAEliminar(null);
    } catch (err) {
      // Mostrar mensaje si falla la eliminación
      setError('Error al eliminar emprendimiento');
    }
  };

  // Función para cerrar el modal de confirmación sin eliminar
  const handleCloseModal = () => setEmprendimientoAEliminar(null);

  // Mostrar spinner si está cargando
  if (loading) return <Spinner animation="border" />;

  // Render del componente
  return (
    <Container className="py-4">
      {/* Título de la sección y botón para crear nuevo emprendimiento */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Mis Emprendimientos</h2>
        <Button as={Link} to="/crear-emprendimiento" variant="primary">
          + Nuevo Emprendimiento
        </Button>
      </div>

      {/* Mostrar mensaje de error si existe */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Si no hay emprendimientos registrados */}
      {emprendimientos.length === 0 ? (
        <Card className="text-center p-4">
          <p>Aún no tienes emprendimientos registrados</p>
          <Button as={Link} to="/crear-emprendimiento" variant="primary">
            Crear mi primer emprendimiento
          </Button>
        </Card>
      ) : (
        // Mostrar los emprendimientos en formato de grilla
        <Row xs={1} md={2} lg={3} className="g-4">
          {emprendimientos.map((emp) => (
            <Col key={emp.id_emprendimiento}>
              <Card className="h-100">
                {/* Mostrar imagen si existe */}
                {emp.imagen_url && (
                  <Card.Img 
                    variant="top" 
                    src={`http://localhost:3001${emp.imagen_url}`} 
                    alt={emp.nombre}
                  />
                )}
                {/* Cuerpo de la tarjeta con nombre y descripción */}
                <Card.Body>
                  <Card.Title>{emp.nombre}</Card.Title>
                  <Card.Text>{emp.descripcion.substring(0, 100)}...</Card.Text>
                </Card.Body>
                {/* Pie con botones de acción: editar y eliminar */}
                <Card.Footer className="bg-white">
                  <div className="d-flex justify-content-between">
                    {/* Botón para navegar a la pantalla de edición */}
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => navigate(`/editar-emprendimiento/${emp.id_emprendimiento}`)}
                    >
                      Editar
                    </Button>
                    {/* Botón para activar el modal de confirmación */}
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => setEmprendimientoAEliminar(emp)}
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

      {/* Modal de confirmación de eliminación */}
      <Modal show={!!emprendimientoAEliminar} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Mensaje personalizado con nombre del emprendimiento */}
          ¿Estás seguro de que deseas eliminar <strong>{emprendimientoAEliminar?.nombre}</strong>?
          Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          {/* Botón para cancelar y cerrar el modal */}
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          {/* Botón para confirmar la eliminación */}
          <Button variant="danger" onClick={handleDelete}>
            Sí, eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

// Exportar componente para su uso en otras partes de la app
export default MisEmprendimientos;


// import React, { useState, useEffect } from 'react';
// import { Card, Container, Row, Col, Button, Spinner, Alert, Modal } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import api from '../services/api';

// const MisEmprendimientos = () => {
//   const [emprendimientos, setEmprendimientos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [emprendimientoAEliminar, setEmprendimientoAEliminar] = useState(null); // 👈
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEmprendimientos = async () => {
//       try {
//         const user = JSON.parse(localStorage.getItem('user'));
//         const response = await api.get(`/emprendimientos/usuario/${user.id}`);
//         setEmprendimientos(response.data);
//       } catch (err) {
//         setError(err.response?.data?.error || 'Error al cargar emprendimientos');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmprendimientos();
//   }, []);

//   const handleDelete = async () => {
//     try {
//       await api.delete(`/emprendimientos/${emprendimientoAEliminar.id_emprendimiento}`);
//       setEmprendimientos(emprendimientos.filter(emp => emp.id_emprendimiento !== emprendimientoAEliminar.id_emprendimiento));
//       setEmprendimientoAEliminar(null); // cerrar modal
//     } catch (err) {
//       setError('Error al eliminar emprendimiento');
//     }
//   };

//   const handleCloseModal = () => setEmprendimientoAEliminar(null);

//   if (loading) return <Spinner animation="border" />;

//   return (
//     <Container className="py-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Mis Emprendimientos</h2>
//         <Button as={Link} to="/crear-emprendimiento" variant="primary">
//           + Nuevo Emprendimiento
//         </Button>
//       </div>

//       {error && <Alert variant="danger">{error}</Alert>}

//       {emprendimientos.length === 0 ? (
//         <Card className="text-center p-4">
//           <p>Aún no tienes emprendimientos registrados</p>
//           <Button as={Link} to="/crear-emprendimiento" variant="primary">
//             Crear mi primer emprendimiento
//           </Button>
//         </Card>
//       ) : (
//         <Row xs={1} md={2} lg={3} className="g-4">
//           {emprendimientos.map((emp) => (
//             <Col key={emp.id_emprendimiento}>
//               <Card className="h-100">
//                 {emp.imagen_url && (
//                   <Card.Img 
//                     variant="top" 
//                     src={`http://localhost:3001${emp.imagen_url}`} 
//                     alt={emp.nombre}
//                   />
//                 )}
//                 <Card.Body>
//                   <Card.Title>{emp.nombre}</Card.Title>
//                   <Card.Text>{emp.descripcion.substring(0, 100)}...</Card.Text>
//                 </Card.Body>
//                 <Card.Footer className="bg-white">
//                   <div className="d-flex justify-content-between">
//                     <Button 
//                       variant="outline-primary" 
//                       size="sm"
//                       onClick={() => navigate(`/editar-emprendimiento/${emp.id_emprendimiento}`)}
//                     >
//                       Editar
//                     </Button>
//                     <Button 
//                       variant="outline-danger" 
//                       size="sm"
//                       onClick={() => setEmprendimientoAEliminar(emp)}
//                     >
//                       Eliminar
//                     </Button>
//                   </div>
//                 </Card.Footer>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}

//       {/* Modal de confirmación */}
//       <Modal show={!!emprendimientoAEliminar} onHide={handleCloseModal} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirmar eliminación</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           ¿Estás seguro de que deseas eliminar <strong>{emprendimientoAEliminar?.nombre}</strong>?
//           Esta acción no se puede deshacer.
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Cancelar
//           </Button>
//           <Button variant="danger" onClick={handleDelete}>
//             Sí, eliminar
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default MisEmprendimientos;

// import React, { useState, useEffect } from 'react';
// import { Card, Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import api from '../services/api';

// const MisEmprendimientos = () => {
//   const [emprendimientos, setEmprendimientos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEmprendimientos = async () => {
//       try {
//         const user = JSON.parse(localStorage.getItem('user'));
//         // Opción 1: Usando endpoint específico
//         const response = await api.get(`/emprendimientos/usuario/${user.id}`);
//         setEmprendimientos(response.data);
        
//         // Opción 2: Filtrar en frontend (si el endpoint no existe)
//         // const allResponse = await api.get('/emprendimientos');
//         // setEmprendimientos(allResponse.data.filter(emp => emp.id_usuario === user.id));
//       } catch (err) {
//         setError(err.response?.data?.error || 'Error al cargar emprendimientos');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmprendimientos();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await api.delete(`/emprendimientos/${id}`);
//       setEmprendimientos(emprendimientos.filter(emp => emp.id_emprendimiento !== id));
//     } catch (err) {
//       setError('Error al eliminar emprendimiento');
//     }
//   };

//   if (loading) return <Spinner animation="border" />;

//   return (
//     <Container className="py-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Mis Emprendimientos</h2>
//         <Button as={Link} to="/crear-emprendimiento" variant="primary">
//           + Nuevo Emprendimiento
//         </Button>
//       </div>

//       {error && <Alert variant="danger">{error}</Alert>}

//       {emprendimientos.length === 0 ? (
//         <Card className="text-center p-4">
//           <p>Aún no tienes emprendimientos registrados</p>
//           <Button as={Link} to="/crear-emprendimiento" variant="primary">
//             Crear mi primer emprendimiento
//           </Button>
//         </Card>
//       ) : (
//         <Row xs={1} md={2} lg={3} className="g-4">
//           {emprendimientos.map((emp) => (
//             <Col key={emp.id_emprendimiento}>
//               <Card className="h-100">
//                 {emp.imagen_url && (
//                   <Card.Img 
//                     variant="top" 
//                     src={`http://localhost:3001${emp.imagen_url}`} 
//                     alt={emp.nombre}
//                   />
//                 )}
//                 <Card.Body>
//                   <Card.Title>{emp.nombre}</Card.Title>
//                   <Card.Text>{emp.descripcion.substring(0, 100)}...</Card.Text>
//                 </Card.Body>
//                 <Card.Footer className="bg-white">
//                   <div className="d-flex justify-content-between">
//                     <Button 
//                       variant="outline-primary" 
//                       size="sm"
//                       onClick={() => navigate(`/editar-emprendimiento/${emp.id_emprendimiento}`)}
//                     >
//                       Editar
//                     </Button>
//                     <Button 
//                       variant="outline-danger" 
//                       size="sm"
//                       onClick={() => handleDelete(emp.id_emprendimiento)}
//                     >
//                       Eliminar
//                     </Button>
//                   </div>
//                 </Card.Footer>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default MisEmprendimientos;