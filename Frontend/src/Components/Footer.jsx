import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer-custom">
      <Container className="text-center">
        <span>© {new Date().getFullYear()} LocaLink - Conectando emprendimientos locales</span>
      </Container>
    </footer>
  );
};

export default Footer;