import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import { getEmprendimientos } from '../services/api';
import { useNavigate } from 'react-router-dom'; // ✅ IMPORT NECESARIO

const Home = () => {
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ NECESARIO PARA REDIRIGIR

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
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">Emprendimientos Destacados</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {emprendimientos.map((emprendimiento) => (
          <Col key={emprendimiento.id_emprendimiento}>
            <Card className="card-custom">
              <Card.Img
                variant="top"
                src={`http://localhost:3001${emprendimiento.imagen_url}`}
                className="card-img-custom"
              />
              <Card.Body>
                <Card.Title>{emprendimiento.nombre}</Card.Title>
                <Card.Text>
                  {emprendimiento.descripcion.substring(0, 100)}...
                </Card.Text>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => navigate(`/emprendimiento/${emprendimiento.id_emprendimiento}`)} // ✅ NAVEGACIÓN
                >
                  Ver más
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;

// import React, { useEffect, useState } from 'react';
// import { Card, Container, Row, Col, Spinner, Button } from 'react-bootstrap';
// import { getEmprendimientos } from '../services/api';
// //import { useNavigate } from 'react-router-dom'; // nuevo import

// const Home = () => {
//   const [emprendimientos, setEmprendimientos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // const navigate = useNavigate(); // hook para redirigir

//   // // ...
//   // <Button
//   //   variant="outline-primary"
//   //   size="sm"
//   //   onClick={() => navigate(`/emprendimiento/${emprendimiento.id_emprendimiento}`)}
//   // >
//   //   Ver más
//   // </Button>

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getEmprendimientos();
//         setEmprendimientos(response.data);
//       } catch (error) {
//         console.error('Error fetching emprendimientos:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <Container className="text-center mt-5">
//         <Spinner animation="border" variant="primary" />
//       </Container>
//     );
//   }

//   return (
//     <Container className="my-4">
//       <h2 className="mb-4 text-center">Emprendimientos Destacados</h2>
//       <Row xs={1} md={2} lg={3} className="g-4">
//         {emprendimientos.map((emprendimiento) => (
//           <Col key={emprendimiento.id_emprendimiento}>
//             <Card className="card-custom">
//               <Card.Img
//                 variant="top"
//                 src={`http://localhost:3001${emprendimiento.imagen_url}`}
//                 className="card-img-custom"
//               />
//               <Card.Body>
//                 <Card.Title>{emprendimiento.nombre}</Card.Title>
//                 <Card.Text>
//                   {emprendimiento.descripcion.substring(0, 100)}...
//                 </Card.Text>
//                 <Button variant="outline-primary" size="sm">
//                   Ver más
//                 </Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default Home;