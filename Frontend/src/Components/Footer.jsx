import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const Footer = () => {
  return (
    <Navbar bg="dark" variant="dark" className="mt-5">
      <Container className="justify-content-center">
        <Navbar.Text>
          © {new Date().getFullYear()} Emprendimientos - Todos los derechos reservados
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default Footer;