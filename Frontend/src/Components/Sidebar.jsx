import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const Sidebar = () => {
  const isLoggedIn = localStorage.getItem('token');

  return (
    <div className="sidebar">
      <Card className="border-0 shadow-sm">
        <Card.Body className="text-center">
          {isLoggedIn ? (
            <>
              <h5>¡Bienvenido a LocaLink!</h5>
              <p>Explora los emprendimientos locales</p>
              <Button 
                as={Link} 
                to="/" 
                variant="outline-primary" 
                className="w-100 mb-2"
              >
                Ver emprendimientos
              </Button>
            </>
          ) : (
            <>
              <h5>Únete a LocaLink</h5>
              <p>Descubre y apoya emprendimientos locales</p>
              <Button 
                as={Link} 
                to="/register" 
                variant="primary" 
                className="w-100 mb-2"
              >
                Registrarse
              </Button>
              <Button 
                as={Link} 
                to="/login" 
                variant="outline-primary" 
                className="w-100"
              >
                Iniciar Sesión
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
      
      {/* Sección adicional del sidebar */}
      <Card className="border-0 shadow-sm mt-3">
        <Card.Body>
          <h6>¿Qué es LocaLink?</h6>
          <p className="small">
            Una plataforma para descubrir y apoyar emprendimientos locales en tu comunidad.
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Sidebar;