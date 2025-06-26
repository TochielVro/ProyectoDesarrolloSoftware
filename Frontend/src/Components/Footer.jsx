import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer-custom py-3 mt-auto">
      <Container className="text-center">
        <span>© {new Date().getFullYear()} LocaLink - Conectando con emprendimientos locales</span>
      </Container>
    </footer>
  );
};

export default Footer;