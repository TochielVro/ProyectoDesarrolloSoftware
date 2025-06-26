import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import logo from '../assets/Localink.png';

const CustomNavbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');
  const user = isLoggedIn ? JSON.parse(localStorage.getItem('user')) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="navbar-custom" style={{ minHeight: '80px' }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="p-0 d-flex align-items-center" style={{ height: '80px' }}>
          <img
            src={logo}
            style={{ 
              height: '225px', // Controla el tamaño aquí
              width: 'auto',
              objectFit: 'contain'
            }}
            alt="LocaLink Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/mis-emprendimientos" className="text-white">
                  Mis Emprendimientos
                </Nav.Link>
                
                <Dropdown as={Nav.Item} className="ms-2">
                  <Dropdown.Toggle as={Nav.Link} className="text-white">
                    {user?.nombre || 'Mi Cuenta'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/perfil">
                      Mi Perfil
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/crear-emprendimiento">
                      Crear Emprendimiento
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      Cerrar Sesión
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="text-white">
                  Iniciar Sesión
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="text-white">
                  Registrarse
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;